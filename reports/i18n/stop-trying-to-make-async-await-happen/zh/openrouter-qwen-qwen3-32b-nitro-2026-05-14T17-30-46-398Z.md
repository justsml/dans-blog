# Translation Candidate
- Slug: stop-trying-to-make-async-await-happen
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/zh/index.mdx
- Validation: deferred
- Runtime seconds: 58.53
- Input tokens: 5903
- Output tokens: 4470
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001545
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 不要强行使用 async/await
subTitle: Promise 与 fetch 的当下主流
date: '2018-10-03'
modified: '2024-08-03'
category: Guides
subCategory: promises
tags:
  - promises
  - async
  - await
  - async-await
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - you-may-not-need-axios
cover: ../matt-nelson-414464-unsplash.webp
cover_mobile: ../w300_matt-nelson-414464-unsplash.webp
cover_icon: ../icon_matt-nelson-414464-unsplash.webp
---
自时间的开端以来，开发者们就一直在为许多无聊的事情争论不休。从经典的「Tab vs. Space」之争到永恒的「Mac vs. PC」辩论，我们很擅长找到分散注意力的争论点。

<br />
<small>_答案：Linux 与空格。</small>

## 这场争论...？

### Promises 与 Async/Await 之争！

等等，这是一场争论吗？这难道不是显而易见的吗？我们似乎不再讨论回调函数了？

不，这并不是一场争论。归根结底，这只是你工具箱中的另一个潜在工具。然而，由于 `async`/`await` 并不能替代所有 Promise 功能（特别是 `Promise.all`、`.race`），**将其作为替代品来介绍是具有误导性的。**

有很多有影响力的人在推广这种误解，即 `async`/`await` 是 Promise 的 [替代品](https://developers.google.com/web/fundamentals/primers/async-functions) [每个人](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) [都](https://x.com/umaar/status/1045655069478334464) [在等](http://2ality.com/2017/08/promise-try.html#why-not-just-use-async-functions) [着](https://dzone.com/articles/javascript-promises-and-why-asyncawait-wins-the-ba)。

> **提示：不，完全不，甚至一点都不。**

VS Code 最近新增的功能强化了这种偏见。正如 [@umaar](https://x.com/umaar) 推文所述：

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Visual Studio Code 现在可以将你的长串 Promise.then() 转换为 async/await！🎉 在 JavaScript 和 TypeScript 文件中都能很好地工作。.catch() 也会正确转换为 try/catch ✅ <a href="https://t.co/xb39Lsp84V">pic.x.com/xb39Lsp84V</a></p>&mdash; Umar Hansa (@umaar) <a href="https://x.com/umaar/status/1045655069478334464?ref_src=twsrc%5Etfw">2018年9月28日</a></blockquote>

如果讨厌 Promises 并且想要这个重构功能，我不会责怪你。

<br />

_我感同身受。我理解。_

<br />

我曾经也这样。🤗

我曾经讨厌 Promises。今天，我完全改变了看法。**Promises 非常棒。** 它们可以让你**充分利用函数组合的优势**。

要提升你的 Promise 技巧，我建议首先关注两个领域：

1. [命名函数（不要匿名）](#rule-1)
1. [单一职责函数](#rule-2)

<h2 id="rule-1">#1: 命名函数！</h2>

消灭你的匿名方法。使用**命名函数**可以让代码读起来像你需求的诗篇。

让我们看一个常见示例：

使用 `fetch` 进行 HTTP GET 请求：

### 反模式

```js
// ❌ 使用匿名内联函数 💩
fetch(url)
  .then(response => response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus)))
  .then(response => response.text())
```

### 解决方案：命名方法

```js
// ✅ 清晰度提升：命名函数
fetch(url)
  .then(checkResponse)
  .then(getText)


// 可复用的通用函数
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
function getText(response) {
  return response.text()
}
```

> 随着代码变得越来越 DRY，这种做法的好处会越来越明显。

**附加资源：** 查看我使用此技术制作的**1分钟视频**：[基础日志记录](https://youtu.be/xR_MZE1SIkk) 和 [高级调试](https://youtu.be/P_tghqW.72M)。

<h2 id="rule-2">#2: 单一职责（函数）</h2>

这听起来_看似精确_：单一职责。

但它的主观性很强，随意性也很强，有时甚至毫无意义。

<!-- 不要争论某个函数是否足够专注。

我提出了一个粗略的衡量标准：`Purpose Cost`。分数越高，越可能表示函数做了太多事情。 -->

```js
// 1 分：return 和三元运算符本质上是一行代码
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
// 1 分：return 和表达式也是一行代码
function getText(response) {
  return response.text()
}
```

给函数代码评分：每行包含以下任意内容加 1 分：`if`、`return`、三元运算符、`for`、`const`、`let`、`var`、`switch`、`while`、`[].map/filter/reduce/等`。每个指令加 1 分（忽略空白行）。链式表达式或方法仅计 1 分。

呼，刚才那堆术语有点多。
 -->

有趣的是，大多数开发者报告他们_相当擅长_**单一职责**地编写代码。这并不奇怪：他们还报告自己是优秀的司机！

<!-- 这**不是Promise特有的问题**，数组方法和其他所有基于高阶函数（HoF）的API都有相同的可用性问题。 -->

让我们看一个（极有才华的）[Jake Archibald](https://x.com/jaffathecake)在他为Google Developers网站撰写的async/await文章中的示例（注：2024年，链接已移除）。

<!--
让我们看一个所谓的“❌ 不推荐”的Promise示例。（描述是“假设我们想按顺序获取一系列URL并尽快按正确顺序记录它们。”） -->

```js
// 来源：https://developers.google.com/web/fundamentals/primers/async-functions
function logInOrder(urls) {
  // 获取所有URL
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // 按顺序记录
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

### 单一职责？

我认为不是。`logInOrder`在做什么？

1. 遍历`urls`列表
1. 对每个URL执行内联HTTP GET：
  1. HTTP `fetch`
  1. 返回响应文本正文
1. 在每个`textPromise`的Promise后追加`.then(text => console.log(text))`
  1. 串行打印结果

这个单一函数中定义了5个匿名方法。正如Jake指出的，`.reduce`太复杂了。我们不应该在代码中到处手动编写复杂的机制。换句话说，我们不会用无尽的`document.createElement()`、`element.setAttribute()`等手动编写DOM创建代码。相反，我们会选择最佳工具：辅助/实用函数、库或框架。

<!-- 我们需要隔离每个正在进行的“步骤”：有一个HTTP请求，将URL列表转换为结果列表的转换。还需要`console.log`。 -->

<!-- > 🤔 为什么`Promises`会让开发者放弃其他地方使用的实践？ -->

<!-- **注意：** 如果意图是_按顺序发起请求_，而不仅仅是按顺序打印结果，这段代码实际上并没有做到。我们将据此重构。 -->

#### 解决方案：单一职责函数

### 首先**提取方法**...

![VS Code重构从Promise代码中提取异步方法](../async-refactor-google-extract-methods-resized-75.webp "提取方法")

### 接着用`Promise.all`和`..map()`替换`.reduce()`和`logPromise()`...

![使用Promise all和map重构Promise链以提高可读性](../async-refactor-google-chain-methods-resized-75.webp "提高可读性")

### 总结

尝试将这些技术应用到你自己的代码中！然后[发推文给我](https://x.com/justsml)并告诉我结果。或者如果你有任何问题或评论，也可以联系我！

帮助传播#PromiseTruth并分享这篇文章。❤️

![credit: matt-nelson-414464-unsplash.webp](../matt-nelson-414464-unsplash.webp)

#### 相关阅读

* [Daniel Brain](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
* [Eric Elliott](https://x.com/_ericelliott?lang=en)
````
