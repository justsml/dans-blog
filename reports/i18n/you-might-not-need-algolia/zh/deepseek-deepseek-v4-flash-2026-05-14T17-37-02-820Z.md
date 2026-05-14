# Translation Candidate
- Slug: you-might-not-need-algolia
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-03-01--you-might-not-need-algolia/zh/index.mdx
- Validation: deferred
- Runtime seconds: 12.26
- Input tokens: 2798
- Output tokens: 1367
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000774
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 你或许并不需要Algolia™
social_image: ../desktop-social.webp
subTitle: 静态网站大概不需要托管搜索
tags:
  - search
  - algolia
  - pagefind
  - cdn
date: '2025-03-01'
modified: '2025-03-05'
category: Search
cover_full_width: ../synth-wave-city-wide.webp
cover_mobile: ../synth-wave-city-200-square.webp
cover_icon: ../synth-wave-city-200-square.webp
cover_credit: Image by Dan Levy
---
大多数站点搜索的决策都来得太晚。

等到有人说“我们应该用 Algolia”的时候，团队通常已经跳过了那个关键问题：我们要搜索的内容是什么？

如果答案是“我们已经构建好的 HTML 页面”，那么 [Pagefind](https://pagefind.app/) 应该是你首先尝试的方案。不是因为 Algolia 不好。Algolia 在解决一堆棘手问题上非常出色。但如果你的搜索索引随着站点部署而变化，那么使用托管搜索服务可能只是在搞基础设施角色扮演。

<p class="inset">当你的可搜索内容是在构建时生成时，使用 Pagefind。当搜索需要接受实时写入、业务规则、用户特定的排序或静态构建无法提供的运维保障时，再考虑 Algolia。</p>

这条规则覆盖的站点比人们想象的要多：博客、文档、营销网站、内部手册、产品指南、课程目录，以及大量主要发布页面的“应用”。

## 问题的形态

Algolia 提供了一个外部搜索系统。你创建记录，推送到索引中，配置排序规则，搭建 UI，然后保持它与数据源同步。

Pagefind 则直接查看你已经部署的 HTML，并在其旁边构建一个静态搜索索引。

这个区别听起来很无聊，直到你需要维护集成。

使用 Algolia，你的站点就有了内容的第二份副本。现在你需要回答这些问题：

- 部署完成了但索引更新失败了怎么办？
- 哪些字段是权威的：CMS 字段、渲染后的页面，还是搜索记录？
- 当排序调整不再匹配页面时，谁负责？
- 当免费套餐无法承载你实际的流量规模时怎么办？

有时这些问题是值得的。对于市场平台、支持门户或大型电商目录，它们很可能值得。但对于一个静态文档站点，它们往往是自找的复杂性。

## Pagefind 之所以有效，是因为它拒绝了额外的系统

Pagefind 的诀窍不是魔法，而是品味。

它等到你的页面存在后，索引最终的 HTML，然后生成一组静态资源，你可以把它们放到与站点其余部分相同的 CDN 上。浏览器只下载它需要的分片。没有需要保持热度的搜索服务器，没有需要监控的爬虫配额，也没有试图记住哪些内容发生了变化的 webhook 流水线。

这使得故障模式更容易理解：

- 如果页面部署了，那么索引的内容就来自那个页面。
- 如果页面没有部署，用户反正也看不到它。
- 如果搜索出了问题，问题通常出在你的渲染标记或 Pagefind 配置上，而不是某个遥远的同步任务。

这就是为什么我喜欢把它用于内容站点。索引跟随制品。

## 实际设置是什么样的

对于一个纯静态站点，工作流程平淡得令人愉悦：

- **CLI**：扫描站点的 HTML 文件，生成索引，然后部署到全球 CDN——全部在几分钟内完成。
- **静态站点生成器**：使用 PageFind 的 Astro 或 Hugo 插件来自动化索引过程。
- **自定义方案**：利用 PageFind 的 API 构建符合你独特需求的定制搜索体验。

<figure>
  <figcaption>使用 PageFind CLI 索引我的站点</figcaption>
  ![使用 PageFind 索引我的站点](PageFind-Cleaner-better-15fps-720p2.webp "使用 PageFind 索引我的站点")
</figure>

[入门指南](https://pagefind.app/docs/)足以让你上手。更好的检验标准是操作层面：你能否在 CI 中重建索引、部署输出，并通过检查渲染后的 HTML 来解释每一次搜索未命中？

## Algolia 仍然胜出的场景

Pagefind 并不是披着风衣的迷你版 Algolia。它是另一种答案。

当你的搜索索引需要独立于站点部署而变更时，请使用 Algolia、OpenSearch、Postgres 搜索或其他实时系统。

这包括：

- 每隔几分钟就会变化的库存数量
- 按用户划分的权限或私有结果
- 由收入、新鲜度、流行度或实验驱动的自定义排名
- 跨多个系统的联合搜索，这些系统并不渲染成一个静态站点
- 企业期望从托管供应商获得的分析和运维支持

这些都是真实需求。假装 Pagefind 因为速度快就能处理这些，那将是另一种供应商博客腔调。

## 我使用的决策方法

先问一个问题：

> 搜索索引能否从用户正在浏览的同一静态输出中重建？

如果能，从 Pagefind 开始。你将获得默认私有的搜索、CDN 友好的资源，以及少一个带有自己主张的服务账户。

如果不能，说出让索引变实时的东西：库存、权限、个性化、分析、排名或写入频率。然后选择明确负责该任务的数据库或搜索服务。

Algolia 在这里不是反派。反派是在证明第一个制品不足之前就引入第二个系统。
````
