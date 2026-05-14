# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.68
- Input tokens: 1221
- Output tokens: 577
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002342
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise 文档中的陷阱
subTitle: 避开流行文档中的坑
date: '2017-05-10'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - programming
  - patterns
  - promises
  - functional-programming
cover: ../craig-whitehead-433328-unsplash.webp
cover_mobile: ../w300_craig-whitehead-433328-unsplash.webp
cover_icon: ../icon_craig-whitehead-433328-unsplash.webp
---
> 识别 Google 搜索结果和流行库中常见的 Promise 反模式。

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

先交待一下：我也写过下面要批判的这些“反模式”，我相信很多 JS 开发者都写过。我所列出的内容并非针对个人或原作者。我只是在对常见模式进行代码审查——希望能分享我的优先级判断和批判性思维过程。

> 希望在读完本项目后，你能识别出烂 Promise 的预兆。

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Q Library](#qlibrary)

--------------------------
### CallbackHell.com
> **来源：** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

----------------------
### StrongLoop
> **来源：** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![strong loop](../strongloop.webp)

----------------
### RisingStack
> **来源：** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
这是一篇相当扎实的文章。我只有一个疑虑：

![Rising Stack](../risingstack.webp)

------------------------
### Q Library
> **来源：** https://github.com/kriskowal/q

Q 库是与“Promises”相关的最常用且最古老的库之一。因此，它深受陈旧示例和向后兼容性需求的困扰。
**我之所以说“与 'Promises' 相关”，是因为我觉得 Q 本质上是关于 `deferred` 模式的。**

它可能看起来像 Promise，但我坚持认为它不是。它的 API 暴露面太大，而且理由都不对。此外，命名约定不一致地缩写名称，导致接口很难记忆。像 `when` 和 `done` 这样的方法根本没有必要。

底线是：`deferred` 模式是一个痛苦的反模式——相比传统的回调方式，它几乎没有任何改进。

![q first example](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> 请查看（并点赞）本文的配套 Github 项目：[Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)

> 项目目标：研究并开发 JavaScript 中更好的函数式语言模式。
````
