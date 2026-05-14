# Translation Candidate
- Slug: beam-search-transformers-js
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-04-16--beam-search-transformers-js/zh/index.mdx
- Validation: deferred
- Runtime seconds: 11.71
- Input tokens: 5976
- Output tokens: 5009
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.001680
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 在 Transformers.js 中实现波束搜索
subTitle: 千行代码，数月等待，深入解析文本生成内部机制。
date: '2026-04-16'
modified: '2026-04-16'
tags:
  - ai
  - transformers
  - javascript
  - open-source
  - nlp
  - beam-search
  - machine-learning
category: AI
subCategory: Open Source
draft: true
hidden: true
publish: false
popularity: 0.7
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
> CW：本文包含技术术语。如果你一听到 `softmax` 或 `log probs` 就想告诉 Max 别再搞他的 `probs` 了，也许可以跳过本文。

---

## 问题：`num_beams` 是个谎言

在 `transformers.js` 的生成循环深处，有一条长期存在的注释：

```js
// TODO: Support beam search
```

而它下方紧跟着一个 `break` 语句，这个语句会在生成第一个 token 后静默地跳出循环。所有配置了 `num_beams > 1` 的模型（如 T5、BART、Whisper）实际上都变成了贪心解码。没有警告，没有错误，只有……错误的输出。

我在测试一个摘要流水线时发现了这个问题，困惑为什么输出质量比 Python 参考实现差这么多。追溯到 `modeling_utils.js`，看到这个 TODO，然后犯下了一个错误的决定——“这能有多难？”

答案是：确实很难，但以有趣的方式。

---

## Beam Search 究竟是什么

谁没

贪心解码在每一步都选择概率最高的 token。简单、快速，但通常效果不佳——你脱口而出的第一个词未必是句子的最佳开头。

Beam Search 则同时维护 `num_beams` 个候选序列，每一步都通过完整词表扩展每个候选，再根据累积对数概率裁剪回前 `num_beams` 个。这就像在 token 空间中进行有限的广度优先搜索。

其结果是全局更优的序列，代价是 `num_beams` 倍的计算量。

存在三种变体：

- **标准 Beam Search** —— 确定性，选择 argmax 候选，输出整体最优序列
- **多样 Beam Search** —— 将 beam 分组，惩罚已被前组选择的 token，确保输出候选不重复
- **随机 Beam Search** —— 随机性，在 beam 框架内应用 top-k + softmax + 随机采样

这三种实现现已提交到 PR 中。

---

## 我真正权衡的架构决策

现有的代码库中有一个 `BeamSearchSampler` 类。它看起来相关。但存在一个微妙的陷阱：它只返回每个 beam 的 top `num_beams` 个 token。这听起来合理，直到你意识到这实际上不足以进行真正的 beam search。

正确的 beam search 需要**考虑每个批次项的所有 `num_beams × vocab_size` 候选**，才能找到全局最优的延续。你不能只孤立地查看每个 beam 的前几个 token —— 你需要跨所有 beam 进行整体排序。

所以我完全绕过了现有的采样器。直接对处理后的 logits 计算 `log_softmax`，加上累积的 beam 分数，然后在合并的候选空间中进行两级排序。数学更简洁，语义更正确。

`BeamSearchSampler` 类仍然存在，未做任何修改，仍可用于其原始用途。这是那些“显而易见”的复用路径会把你带错方向的典型案例。

---

## 最令人头疼的bug：KV缓存重新排序

当 beam search 剪枝序列时，它不仅会截断 token —— 它会*重新排序*哪些 beam 存活。3号 beam 可能产生最佳延续并被克隆；0号和2号 beam 可能被丢弃。

问题是，transformer 注意力机制的键值缓存是按 beam 在 batch 维度上索引的。如果你在不重新排序缓存的情况下重新排序输出序列，就会出现状态不匹配。模型会关注错误的过去。

修复方法是 `_reorder_cache()` —— 一个方法，它对每个过去的键值张量调用 `index_select` 以根据新的 beam 顺序重新索引它们，然后释放过期的张量。

对于 CPU 来说这很简单：按行切片类型数组。对于 GPU 张量则更麻烦 —— 你必须异步下载数据（`ort_tensor.getData(true)`），重新排序，然后重新上传。我在 `tensor.js` 中同时添加了 `index_select`（同步，CPU）和 `index_select_async` 来处理这两种路径。

编码器-解码器模型（T5、BART）有*两个*缓存：编码器和解码器。编码器的 PKV 在解码过程中不会改变，因此保持不变。只有解码器的 PKV 需要重新排序。搞混这两者的区别会产生非常糟糕的输出，但错误很隐蔽 —— 那种看起来几乎正确直到与参考答案对比才显现的错误。

---

## 多样化 Beam Search：有趣的那个

多样化 beam search 添加了一个 `diversity_penalty`，它会惩罚后续 beam 组选择已被前序组选中的 token。直觉是：如果所有 beam 都收敛到相同的输出，你实际上没有探索假设空间。

实现上，组必须在每个解码步骤中*顺序处理*，而不是并行处理，因为每个组在计算自己的分数前需要看到前面组选择的内容。

最终的结构如下：

```
for each step:
  token_counts = {}
  for each group in groups:
    extract this group's beams and logits
    for each token selected by previous groups:
      logits[token] -= diversity_penalty * token_counts[token]
    score candidates, select top 2×group_size
    group_scorer.process(...)
    record newly selected tokens into token_counts
```

这里的顺序依赖是真实的。如果你尝试并行化它，就会失去多样性保证。我曾短暂考虑过强行批量处理，那会是个错误。

## `BeamHypotheses` 优先队列

当某个束在达到 `max_length` 之前遇到 EOS 标记时，它就"完成了"——但你不能直接丢弃它或立即返回。你需要将其添加到一个称为 `BeamHypotheses` 的有界优先队列中。

该队列为每个批次项目保留最多 `num_beams` 个已完成序列，评分方式为：

```
score = sum_logprobs / (length ^ length_penalty)
```

`length_penalty > 1.0` 会奖励更长的输出；`< 1.0` 会奖励更短的输出。`early_stopping` 标志控制何时将束视为完成：当队列已满时（`true`）、在达到 `max_length` 之前永不（`"never"`），或者当剩余的束不可能超越最差已完成假设时（`false`）。

`false` 情况最有趣——它需要跟踪是否有活动束在最大可能剩余得分下仍能超越当前最差假设。这是一种剪枝优化，可以避免在已有良好假设的情况下运行到 `max_length`。

这部分代码位于 `beam_search.js` 中，新文件，总计约240行。还导出 `BeamSearchScorer`，它管理批次中所有 `BeamHypotheses` 实例并处理 `finalize()`。

---

## 与 Python 参考实现的测试

此处每个非平凡的实现细节在 HuggingFace 的 `transformers` 库中都有对应的 Python 实现。我大量依赖了这一点。

我添加的测试套件覆盖了：

- 编码器-解码器（T5）和仅解码器（LLaMA类）的标准束搜索
- `num_beam_groups=2, diversity_penalty=0.5` 的多样化束搜索
- `do_sample=true, top_k=10` 的束采样
- `num_return_sequences > 1` —— 验证输出形状为 `[N, seq_len]`
- 不兼容组合的正确错误抛出：CFG + 束搜索、流式传输 + 束搜索、`num_return_sequences > num_beams`

"正确错误抛出"测试常被低估。它们记录了有意的限制，并防止用户在尝试组合无法组合的功能时静默得到错误输出。（我知道这一点是因为我在开发中尝试过组合 CFG 和束搜索。数学上行不通。现在它会抛出错误。）

---

## 仍缺失的部分

一些我明确留下的未实现功能，用 `throws` 标记：

- **多样化束采样**（`num_beam_groups > 1` + `do_sample`）：这里的数学变得真正复杂。标准多样化束搜索是按组顺序进行的；在其中添加采样需要仔细思考如何在随机模式下应用多样性惩罚。这是可行的，但尚未完成。
- **流式传输 + 束搜索**：流式传输在生成时立即输出标记。束搜索本质上在多个步骤之后才能知道哪个序列最佳。这两者本质上存在冲突。你可以流式传输当前最佳束，但这是一种具有自己设计问题的不同功能。

---

## 没人谈论的部分：开源延迟

代码可以运行。测试通过。现有的测试套件是干净的。它已经在评审中搁置数月了。

这就是大型热门开源项目的常态。Hugging Face 团队迭代速度很快，问题队列巨大，一个约1000行、涉及核心生成循环的功能PR本质上是项非同小可的评审承诺。他们在评论中积极回应，每次查看时也确实认真参与讨论。我并非抱怨——我只是在记录事实。

如果你正在为一个主要的开源项目做贡献，并期待快速合并：请调整预期。对于这种规模的改动，数月的等待是正常的。整个过程中，代码在你的分支上始终是可用的。

---

## 我真正获得的收获

一些此前我没有的东西：

1. **对束搜索的完整心智模型**——不仅是教科书版本，而是包含边界情况的版本。键值缓存为何会失效。为什么双层排序至关重要。`length_penalty`实际上如何影响得分。

2. **对JavaScript类型化数组数学的新认知**——在CPU类型化数组上实现`index_select`的底层程度，是你在Web代码中很少触及的。这没问题，但这并非JavaScript设计的初衷，你也能明显感受到这种局限性。

3. **对Python参考实现的重新尊重**。HuggingFace的`transformers`库庞大且有时复杂，但束搜索的逻辑注释清晰，设计决策都明确有据。阅读它是我理解"真正需要构建什么"的最快方式。

4. **一个真实存在的补丁**——即使尚未合并，它已经存在、能正常运行，人们可以直接从PR分支使用。这就足够了。

启动这一切的TODO注释已从我的分支中消失。这种安静而极客的满足感难以言表。

如果你正在JavaScript中进行序列到序列的工作，并希望今天就能使用正确的束搜索，[PR已公开](https://github.com/huggingface/transformers.js/pull/1539)。

---

¹ 是的，我知道`num_beams=1`就是贪心搜索。退化情况是明确定义的。

² 仅编码器模型（如BERT等）根本不会生成token，因此这些内容与它们无关。它们只是氛围组。
````
