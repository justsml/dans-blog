# Translation Candidate
- Slug: beam-search-transformers-js
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2026-04-16--beam-search-transformers-js/zh/index.mdx
- Validation: deferred
- Runtime seconds: 21.38
- Input tokens: 6236
- Output tokens: 2560
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.010798
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 在 Transformers.js 中实现束搜索
subTitle: 千行代码，数月等待，深度剖析文本生成的底层机理。
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
> CW：本文包含大量技术术语。如果你听到 `softmax` 或 `log probs` 就想让 `Max` 闭嘴，那最好跳过这篇。

---

## 问题所在：`num_beams` 是个谎言

在 `transformers.js` 生成循环的深处，有一个存在已久的注释：

```js
// TODO: Support beam search
```

紧随其后的是一个 `break` 语句，它会在第一个 token 之后静默退出循环。所有随附 `num_beams > 1` 配置的模型——T5、BART、Whisper——都在悄无声息地执行贪婪解码（greedy decoding）。没有警告，没有错误。只是……输出不对。

我在测试一个摘要生成流水线（summarization pipeline）时发现了这个问题，当时很纳闷为什么输出效果比 Python 参考实现差这么多。追踪到 `modeling_utils.js` 后看到了那个 TODO，然后犯了那个经典的错误，心想：“这能有多难？”

答案是：相当难，但难得很有趣。

---

## 束搜索（Beam Search）到底是什么

贪婪解码在每一步都选择概率最高的 token。简单、快速，但通常不是最优解——你嘴里蹦出的第一个词并不总是句子的最佳开头。

相比之下，束搜索同时保留 `num_beams` 个候选序列，每一步都针对整个词表扩展这些序列，然后根据累积对数概率（cumulative log-probability）剪枝，只保留前 `num_beams` 个。这就像是在 token 空间中进行有界限的广度优先搜索。

结果是得到了全局更优的序列，代价是 `num_beams` 倍的计算量。

它有三种变体：

- **标准束搜索（Standard beam search）** —— 确定性的，选取 argmax 候选，追求全局最佳序列。
- **多样化束搜索（Diverse beam search）** —— 将束分成组，惩罚已被前一组选中的 token，这样你的候选输出就不会千篇一律。
- **束采样（Beam sampling）** —— 随机性的，在束框架内应用 top-k + softmax + 随机采样。

这三种现在都已包含在 PR 中。

---

## 我真正纠结的架构决策

现有代码库中有一个 `BeamSearchSampler` 类。看起来挺相关的，但这里有个微妙的陷阱：它每条束（beam）只返回前 `num_beams` 个 token。听起来没问题，直到你意识到这对于真正的束搜索来说根本不够。

真正的束搜索需要考虑**每个 batch 条目中所有的 `num_beams × vocab_size` 个候选者**，才能找到全局最优的后续。你不能孤立地只看每条束的前几个 token —— 你必须跨所有束进行统一排序。

所以我完全绕过了现有的 sampler。直接在处理后的 logits 上计算 `log_softmax`，加上累积束分数，然后在合并后的候选空间中进行两级排序。数学逻辑更清晰，语义也正确。

`BeamSearchSampler` 类依然保留原样，没动它，它在原来的用途上可能还有价值。这就是那种“显而易见”的复用路径会把你带进坑里的典型案例。

---

## 最烦人的 Bug：KV Cache 重排

当束搜索剪枝序列时，它不只是截断 token —— 它会*重排*哪些束存活下来。比如束 3 产生了最好的后续并被克隆；而束 0 和束 2 可能被丢弃。

问题在于，Transformer 注意力机制中的键值缓存（KV Cache）是按 batch 维度（即束）索引的。如果你重排了输出序列而不重排缓存，状态就会错位。模型就会关注到错误的过去。

解决方法是 `_reorder_cache()` —— 这个方法对每个过去的键值张量调用 `index_select`，根据新的束顺序重新索引，然后销毁旧张量。

对于 CPU 来说这很直接：按行切分类型化数组（typed arrays）。对于 GPU 张量就更麻烦了 —— 你必须异步下载数据（`ort_tensor.getData(true)`），重排，然后再重新上传。我在 `tensor.js` 中同时添加了 `index_select`（同步，CPU）和 `index_select_async` 来处理这两条路径。

Encoder-decoder 模型（如 T5, BART）有*两套*缓存：编码器和解码器。编码器的 PKV 在解码过程中不会改变，所以直接透传。只有解码器的 PKV 需要重排。搞错这个区别会导致非常糟糕的输出，而且很微妙 —— 这种错误看起来“几乎正确”，直到你拿它和参考实现对比。

---

## 多样化束搜索：有趣的部分

多样化束搜索（Diverse beam search）增加了一个 `diversity_penalty`（多样性惩罚），旨在阻止后面的束组选择前面组已经选过的 token。直觉是：如果你的所有束都收敛到同一个输出，那你并没有真正探索假设空间。

在实现上，每一组必须在每个解码步骤中*顺序*处理，而不是并行处理，因为每一组在计算自己的分数之前，需要看到前面组选了什么。

我最终采用的结构如下：

```
for each step:
  token_counts = {}
  for each group in groups:
    提取当前组的束和 logits
    for each token selected by previous groups:
      logits[token] -= diversity_penalty * token_counts[token]
    对候选者评分，选择前 2×group_size 个
    group_scorer.process(...)
    将新选中的 token 记录到 token_counts 中
```

这里的顺序依赖是实打实的。如果你把它并行化，就会失去多样性保证。我曾一度想尝试强行 batch 化处理，但这显然会是个错误。

---

## `BeamHypotheses` 优先队列

当某个束在达到 `max_length` 之前撞上 EOS 标记时，它就“完成”了——但你不能直接丢弃它或立即返回。你需要把它加入到一个名为 `BeamHypotheses` 的有界优先队列中。

该队列为每个 batch 条目保留最多 `num_beams` 个已完成序列，评分公式如下：

```
score = sum_logprobs / (length ^ length_penalty)
```

`length_penalty > 1.0` 奖励长输出；`< 1.0` 奖励短输出。`early_stopping` 标志控制停止逻辑：是队列满时立即停止（`true`），还是不到 `max_length` 绝不停止（`"never"`），亦或是当剩余的束都不可能超过已完成的最差假设时停止（`false`）。

`false` 的情况最有趣——它需要追踪在给定最大可能剩余分数的情况下，是否有活跃的束仍能击败当前最差的假设。这是一种剪枝优化，防止在已经获得优质假设时一路跑满 `max_length`。

这部分逻辑位于 `beam_search.js`，这是一个约 240 行的新文件。它还导出了 `BeamSearchScorer`，用于管理整个 batch 的 `BeamHypotheses` 实例并处理 `finalize()`。

---

## 对标 Python 参考实现

这里的每一个非琐碎实现细节在 HuggingFace 的 `transformers` 库中都有对应的 Python 实现。我重度参考了那些代码。

我添加的测试套件涵盖了：

- 在编码器-解码器（T5）和仅解码器（类 LLaMA）上的标准束搜索
- 带有 `num_beam_groups=2, diversity_penalty=0.5` 的多样化束搜索
- 带有 `do_sample=true, top_k=10` 的束采样
- `num_return_sequences > 1` —— 验证输出形状为 `[N, seq_len]`
- 针对不兼容组合的正确错误抛出：CFG + 束搜索、流式传输 + 束搜索、`num_return_sequences > num_beams`

“正确错误抛出”的测试往往被低估。它们记录了设计上的限制，防止用户在尝试组合无法并存的功能时，静默地得到错误输出。（我之所以知道，是因为我在开发过程中尝试过组合 CFG 和束搜索。数学上行不通。现在它会报错。）

---

## 遗漏的部分

我明确排除了一些功能，并标记了 `throws`：

- **多样化束采样** (`num_beam_groups > 1` + `do_sample`)：这里的数学逻辑变得非常复杂。标准的多样化束搜索在各组之间是顺序进行的；在此基础上加入采样，需要仔细考虑如何在随机模式下应用多样性惩罚。这并非不可行，只是还没做。
- **流式传输 + 束搜索**：流式传输在 token 生成时即产出。而束搜索从定义上来说，在多步之后才能确定哪个序列是最好的。这两者本质上是冲突的。你可以流式传输当前表现最好的束，但那是另一个功能，有其独立的设计问题。

---

## 没人谈论的部分：开源延迟

代码能跑通。测试通过了。现有的测试套件表现正常。但它已经在评审（review）队列里躺了好几个月了。

这就是大型、热门开源项目的常态。Hugging Face 团队发布速度很快，但 Issue 队列堆积如山，而一个涉及核心生成循环、长达约 1,000 行的功能 PR，是一项非同小可的评审任务。他们在评论区响应很积极，真正介入查看时也非常投入。我不是在抱怨——我只是在记录事实。

如果你正在向大型开源项目贡献代码并期望快速合并：请调整你的预期。对于这种规模的改动，几个月是正常现象。在此期间，代码在你的 fork 分支上一直是可以正常工作的。

---

## 我到底从中得到了什么

一些我以前不具备的东西：

1. **一个真实的束搜索心理模型**——不是教科书版本，而是带有各种边界情况的版本。KV 缓存是如何崩溃的。为什么两级排序很重要。`length_penalty` 到底对评分做了什么。

2. **对 JS 中类型化数组（Typed Array）数学运算有了更深的体会**——在 CPU 类型化数组上实现 `index_select` 是一种你在 Web 开发中很少触及的底层操作。它能跑通，但这不是 JavaScript 的设计初衷，你能感觉到那种违和感。

3. **对 Python 参考实现的重新致敬。** HuggingFace 的 `transformers` 库虽然庞大且有时显得杂乱，但束搜索逻辑的注释非常详尽，设计决策的意图也非常明确。阅读它是理解我到底该构建什么的捷径。

4. **一个发布在外的补丁**——即使它还没被合并，它也确实存在、可用，而且人们可以直接从 PR 分支使用它。这就足够了。

那个引发这一切的 TODO 注释已经从我的 fork 中消失了。这带来了一种安静而极客的满足感。

如果你正在使用 JavaScript 进行 seq2seq 开发，并且现在就想要完善的束搜索功能，[这个 PR 是公开的](https://github.com/huggingface/transformers.js/pull/1539)。

---

¹ 是的，我知道 `num_beams=1` 就是贪婪搜索。这种退化情况在定义上是明确的。

² 仅编码器（Encoder-only）模型（如 BERT 等）根本不生成 token，所以这一切都不适用于它们。它们只负责提供语义特征。
````
