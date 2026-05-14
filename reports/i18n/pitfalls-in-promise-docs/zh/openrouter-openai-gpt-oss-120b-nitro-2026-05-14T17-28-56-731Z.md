# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/zh/index.mdx
- Validation: deferred
- Runtime seconds: 1.63
- Input tokens: 1338
- Output tokens: 664
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000172
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise 文档中的陷阱
subTitle: 避免流行文档中的问题
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
> 在 Google 搜索结果和流行库中发现 Promise 反模式。

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

先坦白一下：我也写过文中批评的那些“反模式”，我相信很多 JS 开发者也一样。这里的内容并非针对个人或原作者，只是对常见模式进行一次代码审查——希望能传达我的优先级和批判性思考过程。

> 希望你在阅读完这个项目后，能够辨认出糟糕 Promise 的警示信号。

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
这是一篇相当扎实的文章。我只有一点担忧：

![Rising Stack](../risingstack.webp)

------------------------
### Q Library
> **来源：** https://github.com/kriskowal/q

Q 库是最早、使用最广的 “Promise” 相关实现之一。因此它的示例老旧，且需要保持向后兼容。  
**我之所以说 “与 ‘Promises’ 关联”，是因为我觉得 Q 实际上是围绕 `deferred` 模式实现的。**

它看起来像 Promise，但我坚持它并不是。它的表面过于庞大，且原因全是负面的。命名约定不统一，缩写随意，导致接口难以记忆。像 `when`、`done` 之类的方法并非必需。

底线：`deferred` 模式是一个痛苦的反模式——相较于传统回调几乎没有任何提升。

![q first example](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> 请查看并给这篇文章的配套 Github 项目点星，[Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)

> 项目目标：在 JavaScript 中研究并开发更好的函数式语言模式。
````
