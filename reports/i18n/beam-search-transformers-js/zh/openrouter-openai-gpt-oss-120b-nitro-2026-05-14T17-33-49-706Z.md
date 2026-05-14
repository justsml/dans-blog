# Translation Candidate
- Slug: beam-search-transformers-js
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-04-16--beam-search-transformers-js/zh/index.mdx
- Validation: deferred
- Runtime seconds: 6.85
- Input tokens: 6478
- Output tokens: 2404
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000685
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 在 Transformers.js 中实现束搜索
subTitle: 一千行代码、数月等待，深入文本生成内部机制
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
> CW: 本文包含技术术语。如果你一听到 `softmax` 或 `log probs` 就想叫 `Max` 停止他的 `probs`，可以跳过此文。

---

## 问题：`num_beams` 是个谎言

在 `transformers.js` 的生成循环深处，长期存在这样一行注释：

```js
// TODO: Support beam search
```

紧接其下的是一个 `break` 语句，悄悄在第一个 token 后退出循环。所有随 `num_beams > 1` 出厂的模型配置——T5、BART、Whisper——都被静默地强制使用贪婪解码。没有警告。没有错误。只有……错误的输出。



现有代码库中有一个 `BeamSearchSampler` 类。看起来很相关。但有一个微妙的陷阱：它只返回每条 beam 的前 `num_beams` 个 token。听起来合理，直到你意识到这不足以完成真正的束搜索。

完整的束搜索必须在每个 batch 项上考虑 **所有 `num_beams × vocab_size` 候选项**，才能找到全局最优的续写。不能仅仅在每条 beam 内部挑选前 few token——必须在所有 beam 之间统一排序。

于是我直接绕过了现有的 sampler。对处理后的 logits 直接计算 `log_softmax`，加入累计的 beam 分数，并在合并后的候选空间上做两层排序。数学更简洁，语义也更准确。

`BeamSearchSampler` 类仍然保留，未动，仍然对它原本的用途有价值。这是那种“显而易见”复用路径反而把你带入歧途的典型案例。

---

## 最烦人的 Bug：KV 缓存重新排序

在束搜索剪枝序列时，它不仅仅是截断 token——它会 **重新排序** 哪些 beam 被保留。比如 beam 3 产生了最佳续写并被克隆，而 beam 0 和 2 可能被丢弃。

问题在于，Transformer 注意力机制的键值缓存是按 batch 维度（即 beam）索引的。如果在重新排序输出序列时没有同步重新排序缓存，就会出现状态错位。模型会对错误的历史进行注意。

解决办法是实现 `_reorder_cache()`——该方法对每个过去的键值张量调用 `index_select`，按照新的 beam 顺序重新索引，然后释放旧张量。

CPU 上这很直接：按行切片 TypedArray。GPU 张量则更麻烦——需要异步下载数据 (`ort_tensor.getData(true)`)，重新排序后再上传。我在 `tensor.js` 中分别加入了 `index_select`（同步、CPU）和 `index_select_async`（异步）来兼顾两条路径。

Encoder‑decoder 模型（T5、BART）拥有 **两个** 缓存：encoder 和 decoder。Encoder 的 PKV 在解码期间保持不变，直接透传。只有 decoder 的 PKV 需要重新排序。若把这一区别弄错，会产生非常糟糕且微妙的错误——看起来几乎正确，直到与参考对比才发现问题。

---

## 多样化束搜索：好玩的一环

多样化束搜索引入了 `diversity_penalty`，用于抑制后续 beam 组选择已经被前面组选过的 token。直观上讲：如果所有 beam 都收敛到同一个输出，你根本没有真正探索假设空间。

在实现上，必须在每一步解码时 **顺序** 处理各组，而不是并行，因为每组在计算自身分数前需要看到前面组的选择。

我最终采用的结构如下：

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

这里的顺序依赖是真实存在的。如果并行化，就会失去多样性保证。我曾一度想把它批处理，但那显然是个错误。

## `BeamHypotheses` 优先队列

当一个 beam 在达到 `max_length` 之前遇到 EOS token 时，它算是“完成”——但不能直接丢弃或立刻返回。需要把它加入一个有界的优先队列，叫做 `BeamHypotheses`。

队列会为每个 batch 项保留最多 `num_beams` 条已完成的序列，评分方式为：

```
score = sum_logprobs / (length ^ length_penalty)
```

`length_penalty > 1.0` 奖励更长的输出；`< 1.0` 奖励更短。`early_stopping` 标志决定 beam 在何时被视为完成：队列满时 (`true`)、永不完成直到 `max_length` (`"never"`)，或当没有剩余的 beam 能够超越当前最差已完成假设时 (`false`)。

`false` 情况才是关键——它需要跟踪是否仍有活跃的 beam 能在最大可能的剩余得分下击败当前最差的假设。这是一种剪枝优化，能够在已经得到足够好的假设时避免继续跑到 `max_length`。

相关实现位于 `beam_search.js`，新文件，约 240 行。同时导出 `BeamSearchScorer`，负责在整个 batch 中管理 `BeamHypotheses` 实例并处理 `finalize()`。

---

## 对标 Python 参考实现的测试

这里的每一个非平凡实现细节在 HuggingFace 的 `transformers` 库中都有对应的 Python 实现，我大量参考了它们。

我新增的测试覆盖了：

- 编码器‑解码器（T5）和仅解码器（类 LLaMA）上的标准 beam search
- 使用 `num_beam_groups=2, diversity_penalty=0.5` 的多样化 beam search
- `do_sample=true, top_k=10` 的 beam 采样
- `num_return_sequences > 1` —— 验证输出形状为 `[N, seq_len]`
- 对不兼容组合的正确错误抛出：CFG + beam search、streaming + beam search、`num_return_sequences > num_beams`

“正确错误抛出”测试常被低估。它们记录了有意的限制，并防止用户在尝试组合不可共存的特性时悄悄得到错误结果。（我自己在开发时就尝试把 CFG 和 beam search 合在一起，数学不成立，现在会抛异常。）

---

## 仍未实现的功能

以下几项我明确留作 `throws`，暂未实现：

- **多样化 beam 采样**（`num_beam_groups > 1` + `do_sample`）：此时的数学真的很复杂。标准多样化 beam search 在组之间是顺序进行的；在此基础上加入采样，需要仔细考虑在随机模式下如何应用多样性惩罚。可行，但尚未完成。
- **Streaming + beam search**：Streaming 会在 token 生成时即时输出。beam search 本质上要等到多步后才能确定哪条序列最佳，这两者天然冲突。可以实时输出当前最好的 beam，但那是另一套设计，涉及不同的实现问题。

---

## 没有人提及的部分：开源延迟

代码可以运行。测试通过。现有的测试套件干净整洁。它已经在审查中搁置了数月。

这正是大型、流行的开源项目的常态。Hugging Face 团队迭代迅速，问题队列庞大，而一个涉及核心生成循环、约 1,000 行代码的特性 PR 需要非 trivial 的审查投入。他们在评论中响应及时，真正投入审阅时也很积极。我并不是在抱怨——只是记录下来。

如果你正在为一个大型 OSS 项目贡献代码，并期望快速合并：请调整你的预期。几个月的等待对这么大的改动来说是正常的。代码在你的 fork 上始终是可用的。

## 我真正收获的东西

几项之前没有的收获：

1. **对 beam search 的真实心智模型**——不是教材上的理想版，而是包含边缘情况的实现。KV 缓存如何失效。为何两层排序至关重要。`length_penalty` 实际上对分数的影响。

2. **对 JS 中 TypedArray 数学的更深体会**——在 CPU TypedArray 上实现 `index_select` 属于底层操作，平时在前端代码里很少碰到。它能工作，但这并非 JavaScript 设计的初衷，使用时会有这种感受。

3. **对 Python 参考实现的重新敬佩**。HuggingFace 的 `transformers` 库庞大且有时相当复杂，但 beam search 的逻辑注释完善，设计决策也十分明确。阅读源码是最快弄清我到底该实现什么的方式。

4. **一个已经在野外的补丁**——即便尚未合并，它已经存在、可用，其他人也可以直接从 PR 分支使用。这已经足够。

最初触发此工作的 TODO 注释已经从我的 fork 中消失。这种安静的、书呆子式的满足感令人愉快。

如果你在 JavaScript 中做 seq2seq 工作并且想要今天就使用正式的 beam search，[该 PR 已公开](https://github.com/huggingface/transformers.js/pull/1539)。

---

¹ 是的，我知道 `num_beams=1` 实际上就是 greedy search。退化情况是明确定义的。

² 仅编码器模型（如 BERT 等）根本不生成 token，因此上述内容不适用于它们。它们只是“氛围”。
````
