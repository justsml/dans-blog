# Translation Candidate
- Slug: intro-to-promises
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.15
- Input tokens: 2318
- Output tokens: 1549
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000557
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise简介
subTitle: JavaScript Promise 很有趣！
date: '2018-08-01'
modified: '2024-07-31'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - javascript
  - composition
related:
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
cover: ../joe-yates-480485-unsplash.webp
cover_mobile: ../w300_joe-yates-480485-unsplash.webp
cover_icon: ../icon_joe-yates-480485-unsplash.webp
---
## Promise……它们到底有什么特别？

每当您执行任何计算机代码时，都有两种可能的结果：**成功**或**失败**。

如果该代码是异步的，那么可靠地依赖该结果会更加困难。

**`Promise`** 提供了一种便捷的方式来处理这种情况。

```
                        +--Promise---+
                        |            |
                        | <-either-> |
                        |            |
                <-------+            +-------->
                |Failure?             Success?|
                |                             |
                v                             v
                (Rejected)           (Resolved)
```

> 旁注：虽然 Promise 应该解析或拒绝，但它们可能无法执行任一操作。这会导致应用程序挂起，并且可能非常难以调试。

### Promise 从何而来？

很多时候您不需要自己创建 Promise。原生 API 如 `fetch` 和流行库如 `axios` 已经返回 Promise。

但是如果您必须创建一个 Promise，有两种方法可以实现：

### 创建 Promise #1/2：

最简单的创建 Promise 的方法是使用辅助方法：`Promise.resolve()`。

您可以使用 `Promise.resolve(value)` 将任何值（或“转换”）包装成 Promise。

```js
// 不使用 Promise：
function add10(num) {
  return num + 10
}

// 使用 Promise：
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### 创建 Promise #2/2：

另一种更灵活的方法：使用 `Promise` 构造函数。

`new Promise(callback)` 接受一个带有以下接口的 `callback` 函数：

```js
new Promise(function(resolve, reject) {
  // 参数 `resolve` 和 `reject` 都是函数。
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // 当 Promise 被履行时，必须执行 `resolve(result)`
  // 如果 Promise 被拒绝，必须执行 `reject(Error)`
})
```

### Promise API

Promise API 实际上只包含少量方法。

2 个实例方法和 4 个静态/工具方法。

#### Promise 实例方法

无法通过常规方法（例如 `console.log(promise)`）访问 Promise 的值。

所有 Promise 都通过以下方式处理结果：
- 成功时通过 `.then(fn)`
- 失败时通过 `.catch(fn)`

#### Promise 工具方法

* `Promise.resolve(value)` - 将任意值转换为 Promise
* `Promise.reject(Error)` - 创建失败状态的 Promise，触发后续的 `.catch()`
* `Promise.all([...promises])` - 等待一组 Promise 全部完成
* `Promise.race([...promises])` - 当首个 Promise 完成时即返回结果
````
