# Translation Candidate
- Slug: promise-gotchas
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-09-26--promise-gotchas/zh/index.mdx
- Validation: deferred
- Runtime seconds: 1.52
- Input tokens: 1196
- Output tokens: 432
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000124
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise 陷阱
subTitle: 避免常见错误
date: '2018-09-26'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - debugging
  - errors
  - javascript
  - composition
related:
  - intro-to-promises
  - visualizing-promises
  - are-promises-broken
  - javascript-promises-quiz
cover: ../michal-parzuchowski-224092-unsplash.webp
cover_mobile: ../w300_michal-parzuchowski-224092-unsplash.webp
cover_icon: ../icon_michal-parzuchowski-224092-unsplash.webp
---
### Promise 并不像其他值那样工作

你不能像对待普通值那样直接打印它们的值：

```js
// 这在 Promise 上没有意义:
console.log(Promise.resolve(42));

// 必须使用 `.then` 接口:
Promise.resolve(42).then(value => console.log(value));
```

### Promise 不会在你犯错时提醒你

好吧，这是一种常见的错误。

出于各种原因，TC39 决定 `.then` 和 `.catch` 可以接受 `null`。例如，`.then(null, null)` 是合法的，所需行为是跳过链中的那一步。

这带来的不幸后果是：很容易把事情弄错。

##### 示例说明

来看一个小挑战：以下哪个选项会 `console.log` 出 42？

```js
// 选项 #1:
Promise.resolve(42).then(console.log());

// 选项 #2:
Promise.resolve(42).then(console.log);

// 选项 #3:
Promise.resolve(42).then(value => console.log(value));

// 选项 #4:
Promise.resolve(42)
  .then(console.log())
  .then(console.log);
```

##### 答案

答案是 #2、#3 和 #4。

为什么？我们来看传给 `.then()` 的 **类型**：

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

仍然想知道第 4 个选项是怎么工作的？

它实际上是这样运行的：

```js
// 选项 #4 - 实际效果
Promise.resolve(42)
  .then(undefined) // 这对值没有影响，会把值传给后面的 `.then(fn)`
  .then(console.log);
```
````
