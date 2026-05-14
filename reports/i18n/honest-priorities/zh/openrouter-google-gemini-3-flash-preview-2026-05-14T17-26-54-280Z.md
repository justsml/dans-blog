# Translation Candidate
- Slug: honest-priorities
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2024-10-23--honest-priorities/zh/index.mdx
- Validation: deferred
- Runtime seconds: 14.29
- Input tokens: 4214
- Output tokens: 1504
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.006619
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 优先级陷阱
subTitle: 多选题真的是最优解吗？
category: Thoughts
subCategory: Agile
date: '2024-10-23'
modified: '2024-10-24'
tags:
  - agile
  - leadership
  - priority
  - backlog
  - jira
cover: ../new-priority-city.webp
cover_full_width: ../new-priority-city.webp
cover_mobile: ../new-priority-city-w300.webp
cover_icon: ../new-priority-city-w200.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@mroz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Filip
  Mroz</a> on <a
  href="https://unsplash.com/photos/photo-of-tram-beside-waiting-station-during-nighttime-023T4jyCRqA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
## `Priority` 下拉框陷阱

<aside className="breakout">
💡 随着组织规模的扩大，待办事项（Backlog）必然会急剧膨胀。最终，列表的规模将“迫使”你不得不进行优先级排序。
</aside>

## 一个创业公司的故事

不出所料，你的 Jira 管理员总能给出一套方案：看好了，这就是 `Priority` 下拉框字段！（大厂开发者专业提示：它可能被命名为 `Priority2` 或 `P-level`。）

奇怪的是，100% 的公司都会在 `P1, P2, P3, P4` 或 `Low, Med, High, Critical` 之间做选择——显然，世界上不存在其他选项。

一个硬编码的四项列表？行吧。让我们试运行几周看看……

### 两天后

在一个意料之中的转折中，组织发现了一个具有更高优先级的新工单，于是不得不进行了一次小规模的“黑客行为”：增加一个 `P0`，或者叫 `Critical Max+`！

### 又过了三天

*我们无畏的老板在会议上有了些令人兴奋的发现！*

不知怎的，他们发现了一个比 `P0` 还要高的优先级！

从那时起，团队就开始埋头研究如何标记这个新的优先级。

也许是 `-1`？不，不。那太容易混淆了（`P-1` 对比 `P1`）。好吧，那 `P0.5` 怎么样？也不行。

<p className="breakout">在一次“灵光乍现”的时刻，团队发明了一个更高的优先级：双零！<br />也就是现在众所周知的 `P00` 优先级。</p>

{/* *Finally, we can neatly label everything in the world into our Priorities dropdown! (…evil laugh…)* */}

### 洪水来临前

在所有人意识到之前，你的团队不知为何已经淹没在 `P00` 工单中了！

<b>我们该如何避免这场愚蠢的“工程演戏”（Engineering Theater）游戏？</b>

## 如果优先级不再是多选题会怎样？

我们该如何更好地表达“优先级”这种不断变化、流动的感性概念？

- 在现实世界中，优先级会根据新信息、市场变化和组织目标不断平移和演变。
- 紧急程度、重要性、资源可用性以及成本/风险分析之间往往存在复杂的相互作用，简单的下拉菜单无法捕捉这些维度，尤其是在考虑到时间跨度时（即工单腐烂问题）。
- 不同的利益相关者对“高优先级”的定义可能存在冲突，导致“一刀切”的方法完全失效。

## 那么，接下来该怎么办？

有几种替代方案值得探索，按实施成本从低到高排列：

- 为了提供更多的缓冲和扩展空间，选择一个“中性”的起始值，比如 100 或 1,000。你可以随时增加或减少这个数值。
    - 或者从零开始，数值越高优先级越高。
- 实施多维优先级体系，综合考虑业务价值、紧急程度和所需工作量等因素。（创建一个 `composite` 综合评分，使排序和过滤更简单。）
- 采用动态优先级方法，例如 [MoSCoW 技术](https://en.wikipedia.org/wiki/MoSCoW_method)（必须有、应该有、可以有、不会有），允许定期重新评估。（另请参阅 [Kano 模型](https://en.wikipedia.org/wiki/Kano_model)。）

## 总结

尽管优先级的衰减速度极快，但人们还是赋予了它过重的负担。昨天的 `CRITICAL`（紧急）工单很可能不是下个季度的 `CRITICAL` 工单。

随着时间的推移，旧的高优先级工单会变得难以清理和维护。毕竟，谁愿意去降低一个曾经被宣布为***必不可少***的任务的“优先级”呢？更不用说删除那些已经无关紧要的工单了……（天哪！想想那积压的工作量！）

我见过多家公司混淆了 `Severity`（严重程度）和 `Priority`（优先级）。`Severity` 描述的是***紧急程度***（或时间敏感性）。

`Priority ≠ Severity`。定义 3-5 个严重程度级别是有意义的（通常用于维护服务水平协议 SLA）。

紧急程度级别有助于沟通从“零客户影响”到“部分/完全服务中断”的各种情况。

## 一点警告

部署一个无限制的优先级字段需要一定的规划和纪律！

如果你熟悉前端开发，可能经历过 `z-index` 大战。

本质上，`z-index` 允许开发者设置*任何*正整数，以确保他们的组件显示在其他低 `z-index` 内容“之上”。

即使是一个微小的组件更新，也可能改变其 `<Dialog />` 的 z-index，导致它突然不可见。当第三方组件、功能开发和其他团队的贡献试图在 `z-index` 上互相压制时，情况就会变得一团糟。

`Z-index` 曾经被限制在 ~32,000 左右。然而，我最近看到一段代码，其 `z-index` 竟然达到了十亿：`z-index: 1000000000`！

看来通货膨胀对 `z-index` 的打击确实不轻。

## 讨论

- 这是一个值得尝试的思想实验吗？
- 优先级数值不断增长的想法是否令人恐惧？或者诱发焦虑？
- 这种方法最终是否不可避免地会超过 64 位整数的限制？
- 除了“严重程度”或“紧急程度”，还有其他维度能加入讨论吗？
- Jira 应该承担多少责任？或者说，它有多少功劳？

我们可以对着互联网呐喊：“谁来清理这些 `P00` 工单？”

或者，你可以对你的待办事项列表（Backlog）坦诚一些：

- 接受你那 1,000 个工单中有 90% 永远不会被完成。这没关系。
- 归档那些数月未动的工单。任何初始的优先级或紧急程度都已经失效了。反正，归档的问题通常还能找回来。
- 当一个问题再次出现时，这挺好；说明它的优先级自然提升了。
- 从经验来看，我发现丢弃那些陈旧且未完成的工单没有任何坏处。
- 无休止地向“作为数据库的 Backlog”添加内容，会让你错失让团队和组织专注于核心事务的机会。（重要的事在前方，而 Backlog 本质上是向后看的。）
- 一个深不见底的 Backlog 最终会变成一个“怪诞陈列室”，展示着那些你永远不会发布的垃圾。
````
