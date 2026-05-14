# Translation Candidate
- Slug: promise-gotchas
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2018-09-26--promise-gotchas/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.20
- Input tokens: 1092
- Output tokens: 471
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001959
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
### Promise 的运作方式不同于其他值

你不能像打印普通变量那样直接打印它们的值：

```js
// 对 Promise 这样做毫无意义：
console.log(Promise.resolve(42));

// 我们必须使用 `.then` 接口：
Promise.resolve(42).then(value => console.log(value));
```

### Promise 在你犯错时不会发出警告

准确说是那些“显而易见”的错误。

出于各种原因，TC39 规定可以向 `.then` 和 `.catch` 传递 null。例如，`.then(null, null)` 是合法的，且规范要求的行为是跳过链条中的这一“步骤”。

这种设计带来的不幸后果是，开发者非常容易把事情搞砸。

##### 举个例子

来看一个微型挑战：以下哪些选项会执行 `console.log` 并输出 42？

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

为什么？让我们看看传递给 `.then()` 的参数**类型**：

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

还在疑惑第 4 个选项是怎么运行的吗？

它的实际运行逻辑如下：

```js
// 选项 #4 - 实际效果
Promise.resolve(42)
  .then(undefined) // 这对值没有任何影响，它会被直接传递给后续的 `.then(fn)`
  .then(console.log);
```
````
