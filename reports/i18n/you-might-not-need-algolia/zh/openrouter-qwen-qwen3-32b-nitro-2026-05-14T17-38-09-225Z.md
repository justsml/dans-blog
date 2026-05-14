# Translation Candidate
- Slug: you-might-not-need-algolia
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-03-01--you-might-not-need-algolia/zh/index.mdx
- Validation: deferred
- Runtime seconds: 5.28
- Input tokens: 2801
- Output tokens: 2126
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000734
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 你也许不需要Algolia™
social_image: ../desktop-social.webp
subTitle: 静态网站可能不需要托管搜索
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
大多数网站搜索决策都开始得太晚。

当有人提出"我们应该使用Algolia"时，团队通常已经跳过了一个关键问题：我们搜索的内容是什么类型？

如果答案是"我们已经构建的HTML页面"，[Pagefind](https://pagefind.app/)应该是你首先尝试的方案。这并非因为Algolia不好，Algolia在解决许多复杂问题方面非常出色。但如果你的搜索索引在网站部署时发生变化，托管搜索服务可能只是基础设施角色扮演。

<p class="inset">当可搜索内容在构建时生成时使用Pagefind。当搜索需要接受实时写入、业务规则、用户特定排序或静态构建无法提供的运营保证时，才考虑Algolia。</p>

这个规则涵盖的网站比人们想象的更多：博客、文档、营销网站、内部手册、产品指南、课程目录，以及大量"主要发布页面"的"应用"。

## 问题的形状

Algolia为你提供一个外部搜索系统。你需要创建记录、推送到索引、配置排序、连接用户界面，并保持这个系统与你的数据源同步。

Pagefind则观察你已经部署的HTML，并在其旁边构建静态搜索索引。

这种区别听起来很无聊，直到你维护这个集成时才会意识到。

使用Algolia时，你的网站会有内容的第二份拷贝。现在你需要回答这些问题：

- 部署完成了但索引更新失败了吗？
- 哪些字段是权威的：CMS字段、渲染页面还是搜索记录？
- 当排序调整不再匹配页面时，谁负责？
- 当免费层级无法匹配真实流量模式时怎么办？

有时这些问题值得付出代价。对于市场平台、支持门户或大型电商目录来说确实如此。但对于静态文档网站，这些问题往往是自我施加的复杂性。

## Pagefind有效是因为它拒绝额外系统

Pagefind的诀窍不是魔法，而是品味。

它等待页面生成完毕后，对最终HTML进行索引，并生成一组静态资源，这些资源可以和网站其他内容一起部署到CDN。浏览器只会下载需要的片段。不需要保持搜索服务器运行，不需要监控爬虫配额，也不需要维护试图记住变更内容的webhook管道。

这让故障模式更容易理解：

- 如果页面已部署，索引内容就来自该页面。
- 如果页面未部署，用户根本看不到它。
- 如果搜索出错，问题通常出在你的渲染标记或Pagefind配置，而不是某个远程同步任务。

这就是为什么我喜欢它用于内容网站。索引跟随部署的产物。

## 实际的设置流程是什么样的

对于一个普通的静态网站，工作流程相当简单：

- **CLI**：扫描网站的HTML文件，生成索引，并将其部署到全球CDN——所有操作可在几分钟内完成。
- **静态网站生成器**：使用PageFind为Astro或Hugo提供的插件，自动化索引流程。
- **定制解决方案**：利用PageFind的API构建符合特定需求的搜索体验。

<figure>
  <figcaption>使用PageFind CLI为我的网站生成索引</figcaption>
  ![使用PageFind为我的网站生成索引](../PageFind-Cleaner-better-15fps-720p2.webp "使用PageFind为我的网站生成索引")
</figure>

[入门指南](https://pagefind.app/docs/)足以让你快速上手。更严格的测试在于操作层面：你能否在CI中重建索引、部署输出，并通过检查生成的HTML解释每一个搜索失败的情况？

## Algolia仍具优势的领域

Pagefind并不是穿着连帽衫的微型Algolia。它是另一种解决方案。

当你的搜索索引需要独立于网站部署进行变更时，使用Algolia、OpenSearch、Postgres搜索或其他实时系统。这包括：

- 每几分钟更新一次的库存数量
- 用户级权限或私有结果
- 由收入、新鲜度、流行度或实验驱动的自定义排序
- 跨多个系统（无法整合为单一静态网站）的联邦搜索
- 企业期望从托管服务中获得的分析和运维支持

这些是真实存在的需求。声称Pagefind能通过速度处理这些问题，就陷入了另一种供应商博客的套路。

## 我的决策标准

首先提出一个问题：

> 搜索索引能否从用户浏览的静态输出中重新生成？

如果可以，从Pagefind开始。你将获得默认私有的搜索功能、CDN友好的资源，以及少一个带有主观意见的服务账户。

如果不行，请明确导致索引动态变化的因素：库存、权限、个性化、分析、排序或写入频率。然后选择明确负责该任务的数据库或搜索服务。

此处Algolia并非反派。真正的反派是在证明首个产物不足之前，就引入了第二个系统。
````
