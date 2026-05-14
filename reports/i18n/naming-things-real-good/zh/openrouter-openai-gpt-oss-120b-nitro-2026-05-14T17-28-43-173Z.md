# Translation Candidate
- Slug: naming-things-real-good
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2016-06-01--naming-things-real-good/zh/index.mdx
- Validation: deferred
- Runtime seconds: 3.80
- Input tokens: 2840
- Output tokens: 1174
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000322
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 好的命名
subTitle: 命名：面向对象基础
date: '2016-06-01'
modified: '2024-08-10'
category: Guides
subCategory: programming
tags:
  - programming
  - patterns
  - naming
  - source-code
  - organization
cover: ../rawpixel-652639-unsplash.webp
cover_mobile: ../w300_rawpixel-652639-unsplash.webp
cover_icon: ../icon_rawpixel-652639-unsplash.webp
---
## 命名事宜：面向对象基础

让我们通过示例来看看对象/类的设计…

### 情境

你是否曾经设计过 `data model`（代码中、SQL 或 Excel 表格）？下面的例子看起来熟悉吗？

```
*** anti-pattern - don't copy-paste ***
* User
  - id
  - avatarUrl
  - name
  - email
  - password

* Agent
  - id
  - primaryPhoto
  - name
  - email
  - agentEmail
  - agentPhoneMain
  - agentEmailPrimary
  - agentPhonePrimary
  - agentAddressFull
  - agentCompanyName
  - agentCompanyAddress
  - *userEmail* - 'Pointer' to User table ^^^
```

### 问题出在哪里？

技术上说并没有 bug，只是数据需要重新组织。

**下面的情况你是否熟悉？**

1.  对应用的任何改动都要花上数小时进行艰苦的调试。  
2.  需求的任何变更都会导致：

![schema refactor][schema_refactor]

为什么把字段命名为 `agentEmailPrimary` **这么糟糕**？

首先，你并没有在宇宙中创造全新的概念。过度具体化会带来以下陷阱：

1.  “锁定”在高度具体的名称上，意味着 `agentEmailPrimary` 很可能让你的视图和相关代码 **0% 可复用**，并且会出现恼人的重复 bug，例如：

- 表之间的数据不同步（不明显是 `user.email` 需要同步到 `agent.agentEmail` 还是反过来——更别提手动实现何时何地强制这类“逻辑”的复杂性…）  
- 验证规则/逻辑可能被复制且不一致。  
- 项目逐渐像一座摇摇欲坠的 Jenga 塔。  
- 随着每新增一个文件，脆弱性叠加，因为即使是微小的改动也需要极高的细节关注。

1.  `agentEmailPrimary` 可能有多种含义。使用 **更短的名称** 来避免歧义。

- 当心无意义的冗余词汇。`Primary`？只会引出更多疑问：还有 Secondary 吗？它是指主要的亲属吗？

够了，Dan，应该怎么写才更好？

### 解决方案

```
// Consolidated Schema:

User
  - id
  - role: ['agent', 'lead', 'admin']
  - name
  - phone
  - address
  - email
  - password
  - company
    - name
    - address
```

我移除了 `Agent` 表，因为它并没有包含只有代理才有的字段。`User.company` 对象（包含 `.name`、`.address`）在清理命名后自然出现。

一些指导原则：

1. 删除不必要的表。真的需要一个 `statuses` 表吗？完全可以在 `User` 表上直接加一个 `status::VARCHAR(8)` 字段。多占几个字节也无妨。
2. 尝试合并相关表。**Data**
3. 删除冗余的数据收集（例如如果已经由分析解决方案取代，就移除 `ActivityLogs` 表）。
4. 尽量让 **所有字段名** 保持 **单词/名词/代词**。可以依赖表名提供的上下文。（例如 `PersonalAccount.email` 与 `BusinessAccount.email`——上下文由表名决定。）
5. 没有 `Agent.agentEmail` 或 `Agent.agentPhonePrimary` 这种说法。句点。跟我一起说：“就叫 `email` 和 `phone`。”
6. 使用高度具体的名称等于把特定层级的 `code‑reusability` 与 `durability` **锁死**，实际上是 **0 %**。
7. 用 `User.profileSummaryEmail` 这种垃圾命名对自己一点好处也没有。 💞

**推荐阅读：**

1. [Maybe Normalizing Isn't Normal](https://blog.codinghorror.com/maybe-normalizing-isnt-normal/)
2. [The Trade-offs Between Database Normalization and Denormalization](https://dev.to/er_dward/the-trade-offs-between-database-normalization-and-denormalization-4kdo)
3. [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
4. [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)

[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
````
