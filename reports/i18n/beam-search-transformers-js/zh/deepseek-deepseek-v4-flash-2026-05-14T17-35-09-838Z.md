# Translation Candidate
- Slug: beam-search-transformers-js
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-04-16--beam-search-transformers-js/zh/index.mdx
- Validation: deferred
- Runtime seconds: 22.52
- Input tokens: 6140
- Output tokens: 3119
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.001575
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 在 Transformers.js 中实现束搜索
subTitle: 千行代码，数月等待，深入文本生成的内部机制
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
> CW：本文包含技术术语。如果你一听到 `softmax` 或 `log probs` 就想让 `Max` 别再说他的 `probs` 了，那这篇可能不适合你。

---

## 问题：`num_beams` 是个谎言

在 `transformers.js` 的生成循环深处，有一个存在已久的注释：

```js
// TODO: Support beam search
```

而就在它下面，有一个 `break` 语句，在第一个 token 之后悄悄退出了循环。每个配置了 `num_beams > 1` 的模型——T5、BART、Whisper——都在悄无声息地执行贪心解码。没有警告。没有错误。只是……输出不对。

我在测试一个摘要流水线时发现了这个问题，当时我正纳闷为什么我的输出比 Python 参考实现差那么多。一路追踪到 `modeling_utils.js`，看到了那个 TODO，然后犯了个错误，心想“这能有多难？”

答案是：相当难，但有趣的地方也不少。

---

## 束搜索到底是什么

谁还没

贪心解码每一步都选概率最高的 token。简单、快速、经常次优——你脱口而出的第一个词并不总是句子的最佳开头。

束搜索则同时保留 `num_beams` 个候选序列，每一步用整个词汇表扩展每个候选，然后根据累积对数概率裁剪回前 `num_beams` 个。这就像在 token 空间中进行有界的广度优先搜索。

结果是全局更优的序列，代价是 `num_beams` 倍的计算量。

有三种变体：

- **标准束搜索** —— 确定性，取 argmax 候选，输出全局最佳序列
- **多样束搜索** —— 将束分成组，惩罚已被前面组选中的 token，这样你的输出候选就不会都说同一件事
- **束采样** —— 随机性，在束框架内应用 top-k + softmax + 随机采样

这三种现在都在 PR 里了。

---

## 我真正纠结的架构决策

## 我真正纠结的架构决策

现有代码库中有一个 `BeamSearchSampler` 类。它看起来相关。但有一个微妙的陷阱：它只返回每个束的前 `num_beams` 个 token。这听起来没问题，直到你意识到这对于真正的束搜索来说远远不够。

正确的束搜索需要考虑**每个批次项的所有 `num_beams × vocab_size` 个候选**，以找到全局最优的延续。你不能孤立地只看每个束的前几个 token——你需要跨所有束一起排序。

所以我完全绕过了现有的采样器。直接在处理后的 logits 上计算 `log_softmax`，加上累积束分数，并在合并的候选空间上做两级排序。数学更干净，语义正确。

`BeamSearchSampler` 类仍然存在，未被修改，仍然对其原始用途有用。这是一个“明显”的复用路径会把你引向错误方向的典型案例。

---

## 最烦人的 Bug：KV 缓存重排序

当束搜索剪枝序列时，它不仅仅截断 token——它还会*重新排序*哪些束存活下来。束 3 可能产生最佳延续并被克隆；束 0 和束 2 可能被丢弃。

问题在于，Transformer 注意力机制中的键值缓存是按束沿批次维度索引的。如果你重新排序输出序列而不重新排序缓存，状态就会不匹配。模型会关注错误的过去。

修复方法是 `_reorder_cache()`——一个对每个过去的键值张量调用 `index_select` 以根据新束顺序重新索引它们，然后丢弃过时张量的方法。

对于 CPU，这很简单：按行切片类型化数组。对于 GPU 张量，这更烦人——你必须异步下载数据（`ort_tensor.getData(true)`），重新排序，然后重新上传。我在 `tensor.js` 中添加了 `index_select`（同步，CPU）和 `index_select_async` 来处理两种路径。

编码器-解码器模型（T5、BART）有*两个*缓存：编码器和解码器。编码器 PKV 在解码过程中不会改变，因此它们保持不变。只有解码器 PKV 需要重新排序。搞错这个区别会产生非常糟糕的输出，而且是那种微妙的错误——看起来几乎正确，直到你与参考结果对比。

---

## 多样束搜索：有趣的那个

多样束搜索添加了一个 `diversity_penalty`，阻止后面的束组选择前面组已经选过的 token。直觉是：如果你所有的束都收敛到同一个输出，那你并没有真正探索假设空间。

实现上，组必须在每个解码步骤内*顺序*处理，而不是并行，因为每个组需要看到前面组选择了什么，然后才能计算自己的分数。

我最终采用的结构：

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

这里的顺序依赖是真实的。如果你并行化，就会失去多样性保证。我曾短暂地想过尝试批处理这个，但那会是一个错误。

---

## `BeamHypotheses` 优先级队列

当某个束在到达 `max_length` 之前遇到 EOS 标记时，它就“完成”了——但你不能直接丢弃它或立即返回它。你需要将它添加到一个有界优先级队列中，称为 `BeamHypotheses`。

该队列为每个批次项保留最多 `num_beams` 个已完成的序列，并按以下公式评分：

```
score = sum_logprobs / (length ^ length_penalty)
```

`length_penalty > 1.0` 奖励更长的输出；`< 1.0` 奖励更短的输出。`early_stopping` 标志控制束何时被视为完成：当队列已满时（`true`），永远不到达 `max_length`（`"never"`），或者当没有剩余的束可能超过最差已完成假设的分数时（`false`）。

`false` 的情况很有趣——它需要跟踪在给定最大可能剩余分数的情况下，任何活跃的束是否仍能击败当前最差假设。这是一种剪枝优化，可以防止在你已经拥有良好假设的情况下运行到 `max_length`。

这部分位于新文件 `beam_search.js` 中，总共约 240 行。还导出了 `BeamSearchScorer`，它管理整个批次中的 `BeamHypotheses` 实例并处理 `finalize()`。

---

## 对照 Python 参考实现进行测试

这里的每个非平凡实现细节在 HuggingFace 的 `transformers` 库中都有对应的 Python 实现。我大量依赖了这一点。

我添加的测试套件涵盖：

- 编码器-解码器（T5）和仅解码器（类似 LLaMA）上的标准束搜索
- 使用 `num_beam_groups=2, diversity_penalty=0.5` 的多样束搜索
- 使用 `do_sample=true, top_k=10` 的束采样
- `num_return_sequences > 1`——验证输出形状为 `[N, seq_len]`
- 对不兼容组合的正确错误抛出：CFG + 束搜索、流式 + 束搜索、`num_return_sequences > num_beams`

“正确错误抛出”测试被低估了。它们记录了有意的限制，并防止有人尝试组合无法组合的特性时，默默地得到错误输出。（我知道，因为我在开发过程中尝试过组合 CFG 和束搜索。数学上不成立。现在它会抛出错误。）

---

## 仍然缺失的部分

有几件事我明确省略了，并用 `throws` 标记：

- **多样束采样**（`num_beam_groups > 1` + `do_sample`）：这里的数学变得非常复杂。标准的多样束搜索是按组顺序进行的；在此基础上添加采样需要仔细考虑如何在随机模式下应用多样性惩罚。这是可行的，只是还没做。
- **流式 + 束搜索**：流式会在生成标记时立即产生它们。束搜索的定义决定了它需要多个步骤才能知道哪个序列最好。这两者本质上存在矛盾。你可以流式输出当前最好的束，但那是另一个特性，有其自身的设计问题。

---

## 没人谈论的部分：开源延迟

代码能跑。测试能过。现有测试套件干干净净。但它已经在审查中搁置了几个月。

大型热门开源项目就是这样。Hugging Face 团队交付速度很快，问题队列庞大，而一个改动核心生成循环、约 1000 行的特性 PR 绝非轻松的审查承诺。他们在评论中回复及时，真正看的时候也投入十足。我不是抱怨——我只是在记录。

如果你正在为某个主要 OSS 项目做贡献，并期望快速合并：调整你的预期。对于这种规模的 PR，几个月是正常的。这期间你的 fork 上代码一直能用。

---

## 我实际收获了什么

几样我之前没有的东西：

1. **束搜索的真实心智模型**——不是教科书版本，而是带着各种边界情况的那种。KV 缓存如何崩溃。为什么两级排序很重要。`length_penalty` 对分数到底做了什么。

2. **对 JS 中类型数组数学的更多欣赏**——在 CPU 类型数组上实现 `index_select` 是你在 Web 代码中很少触及的低层操作。没问题，但这并不是 JavaScript 的设计初衷，你能感受到这一点。

3. **对 Python 参考实现重新燃起的敬意。** HuggingFace `transformers` 库庞大且有时棘手，但束搜索逻辑注释充分，设计决策意图明确。阅读它是理解我实际应该构建什么的最快方式。

4. **一个在野的补丁**——即使尚未合并，它存在、能跑，人们可以从 PR 分支使用它。这就够了。

引发这一切的 TODO 注释已经从我的 fork 中消失。这带来一种安静、书呆子式的满足感。

如果你在 JavaScript 中做 seq2seq 工作，并且想要正确的束搜索，[这个 PR 是公开的](https://github.com/huggingface/transformers.js/pull/1539)。

---

¹ 是的，我知道 `num_beams=1` 就是贪心搜索。退化情况定义明确。

² 纯编码器模型（BERT 等）根本不生成 token，所以这些都不适用于它们。它们只是 vibe。
````
