# Translation Candidate
- Slug: you-might-not-need-algolia
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2025-03-01--you-might-not-need-algolia/zh/index.mdx
- Validation: deferred
- Runtime seconds: 15.76
- Input tokens: 2891
- Output tokens: 1114
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004788
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 你可能不需要 Algolia™
social_image: ../desktop-social.webp
subTitle: 静态网站大概率不需要托管搜索
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
大多数网站搜索的决策都做得太晚了。

当有人提议“我们应该用 Algolia”时，团队通常已经跳过了一个核心问题：我们要搜索的内容到底是什么类型的？

如果答案是“我们已经构建好的 HTML 页面”，那么 [Pagefind](https://pagefind.app/) 应该是你的首选。这并不是因为 Algolia 不好。Algolia 在解决一系列硬核问题上表现卓越。但如果你的搜索索引是随网站部署而变化的，那么使用托管搜索服务可能只是一种“基础设施角色扮演（infrastructure cosplay）”。

<p class="inset">当你的搜索内容是在构建时生成时，请使用 Pagefind。当搜索需要接收实时写入、复杂的业务规则、用户特定的排名或静态构建无法提供的运维保证时，再考虑 Algolia。</p>

这条规则涵盖的网站范围比人们预想的要广：博客、文档、营销网站、内部手册、产品指南、课程目录，以及惊人数量的、本质上只是在发布页面的“应用”。

## 问题的本质

Algolia 提供的是一个外部搜索系统。你需要创建记录、将其推送到索引中、配置排名、连接 UI，并保持该系统与你的真相源同步。

而 Pagefind 则是查看你已经发布的 HTML，并在其旁边构建一个静态搜索索引。

这种区别听起来很枯燥，直到你开始维护这种集成。

使用 Algolia，你的网站就有了内容的第二份副本。现在你需要回答以下问题：

- 部署完成了但索引更新失败了怎么办？
- 哪些字段是权威的：是 CMS 字段、渲染后的页面，还是搜索记录？
- 当排名微调与页面内容不匹配时，谁来负责？
- 当免费额度无法承载你的真实流量时，会发生什么？

有时这些问题是值得去解决的。对于市场平台、支持门户或大型电子商务目录，通常确实值得。但对于一个静态文档网站，这些往往是自找的复杂性。

## Pagefind 之所以奏效，是因为它拒绝了额外系统

Pagefind 的诀窍并非魔法，而是品味。

它会等到你的页面生成后，对最终的 HTML 进行索引，并写入一组静态资源，你可以将这些资源与网站的其他部分一起放在同一个 CDN 上。浏览器只下载它需要的块。没有需要保持热启动的搜索服务器，没有需要盯着的爬虫配额，也没有试图记录变更的 Webhook 流水线。

这使得故障模式变得非常容易理解：

- 如果页面部署了，索引内容就来自该页面。
- 如果页面没有部署，用户反正也看不到它。
- 如果搜索结果有误，问题通常出在你的渲染标记或 Pagefind 配置中，而不是远端的同步任务。

这就是我喜欢它用于内容型网站的原因。索引紧随产物。

## 实际配置流程

对于一个纯静态网站，其工作流枯燥得令人愉悦：

- **CLI**：扫描网站的 HTML 文件，生成索引，并将其部署到全球 CDN——全程只需几分钟。
- **静态网站生成器 (SSG)**：使用 Pagefind 的 Astro 或 Hugo 插件来自动化索引过程。
- **自定义方案**：利用 Pagefind 的 API 构建符合你特定需求的定制化搜索体验。

<figure>
  <figcaption>使用 Pagefind CLI 索引我的网站</figcaption>
  ![Indexing my site with Pagefind](../PageFind-Cleaner-better-15fps-720p2.webp "Indexing my site with Pagefind")
</figure>

[入门指南](https://pagefind.app/docs/)足以让你跑起来。更好的测试是操作层面的：你是否能在 CI 中重建索引，部署产物，并通过检查渲染后的 HTML 来解释每一次搜索未命中？

## Algolia 依然胜出的场景

Pagefind 并不是披着风衣的迷你版 Algolia。它是另一种答案。

当你的搜索索引需要独立于网站部署进行变更时，请使用 Algolia、OpenSearch、Postgres 搜索或其他实时系统。

这包括：

- 每隔几分钟就会变动的库存数量
- 针对每个用户的权限控制或私有结果
- 由收入、新鲜度、流行度或实验驱动的自定义排名
- 跨越多个未渲染成单一静态网站的系统的联邦搜索
- 企业期望从托管供应商那里获得的分析和运营支持

这些都是真实需求。如果因为 Pagefind 速度快就假装它能处理这些，那就是另一种形式的“供应商博客腔”了。

## 我的决策准则

首先问一个问题：

> 搜索索引是否可以从用户正在浏览的同一份静态产物中重建？

如果是，从 Pagefind 开始。你会得到默认私有的搜索、对 CDN 友好的资源，以及少了一个有自己“想法”的服务账号。

如果不是，请指明让索引必须实时化的因素：库存、权限、个性化、分析、排名或写入频率。然后选择明确负责该任务的数据库或搜索服务。

Algolia 在这里不是反派。真正的反派是在证明第一份产物不足以支撑需求之前，就盲目引入第二个系统。
````
