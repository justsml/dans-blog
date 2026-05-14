# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/zh/index.mdx
- Validation: deferred
- Runtime seconds: 2.90
- Input tokens: 1310
- Output tokens: 1191
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000391
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise 文档中的陷阱
subTitle: 避免热门文档中的问题
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
> 在谷歌搜索结果和流行库中识别 Promise 反模式

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

让我先坦白：我曾经写过下文批评的那些"反模式"，我相信许多 JS 开发者也做过同样的事。我列出的内容并非针对原作者，更不是人身攻击。我只是在对常见模式进行代码审查——希望借此传递我的优先级判断和批判性思维过程。

> 希望你通过理解本项目后，能够识别出糟糕 Promise 的警告信号。

1. [CallbackHell.com](#callbackhellcom)  
1. [StrongLoop](#strongloop)  
1. [RisingStack](#risingstack)  
1. [Q Library](#qlibrary)  

--------------------------  
### CallbackHell.com  
> **来源**：http://callbackhell.com/  
![CallbackHell.com](../callbackhell.webp)  

----------------------  
### StrongLoop  
> **来源**：`https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`  
![strong loop](../strongloop.webp)  

----------------  
### RisingStack  
> **来源**：https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/  
这是一篇相当扎实的文章。我只有一个担忧：

![Rising Stack](../risingstack.webp)  

------------------------  
### Q Library  
> **来源**：https://github.com/kriskowal/q  

Q 库是与"Promise"关联最深、使用最广泛的库之一。因此它饱受过时示例和向后兼容性的困扰。  
**我说"与'Promise'关联"是因为我认为 Q 实际上是围绕 `deferred` 模式展开的**。  

它可能看起来像 Promise，但我坚持认为它根本不是。它暴露了太多不必要的 API 表面积，命名规范也不一致，导致接口难以记忆。`when` 和 `done` 这类方法完全没必要存在。  

结论：`deferred` 模式是一种痛苦的反模式——它几乎没有任何改进，反而比传统回调方式更糟糕。  

![q first example](../qlibrary-1.webp)  

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)  

> 请查看（并星标）本文的配套 GitHub 项目，[Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)  

> 项目目标：研究并开发 JavaScript 中更优的函数式编程模式。
````
