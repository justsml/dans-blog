# Translation Candidate
- Slug: intro-to-promises
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2018-08-01--intro-to-promises/zh/index.mdx
- Validation: deferred
- Runtime seconds: 10.38
- Input tokens: 2201
- Output tokens: 1350
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.005150
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise 入门
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
## Promise... 到底是怎么回事？

无论你执行什么计算机代码，结果只有两种可能：**成功**或**失败**。

如果代码是异步的，想要可靠地依赖该结果就会变得更加困难。

**`Promises`** 提供了一种处理这种局面的便捷方式。

```
                        +--Promise---+
                        |            |
                        | <-二选一->  |
                        |            |
                <-------+            +-------->
                |失败?                成功?   |
                |                             |
                v                             v
                (Rejected)           (Resolved)
```

> 顺带一提：虽然 Promise 应该要么 resolve（解决）要么 reject（拒绝），但它们也可能两者都不执行。这会导致应用挂起，而且调试起来非常困难。

### Promise 从哪里来？

很多时候你不需要自己创建 Promise。像 `fetch` 这种原生 API 以及 `axios` 等流行库都会直接返回 Promise。

但如果你必须手动创建一个 Promise，通常有两种方法：

### 创建 Promise 方法 1/2：

创建 Promise 最简单的方法是使用辅助方法：`Promise.resolve()`。

你可以使用 `Promise.resolve(value)` 将任何值包装（或“转换”）为 Promise。

```js
// 不使用 Promise:
function add10(num) {
  return num + 10
}

// 使用 Promise:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### 创建 Promise 方法 2/2：

另一种更灵活的方法：使用 `Promise` 构造函数。

`new Promise(callback)` 接收一个具有以下接口的 `callback`（回调）函数：

```js
new Promise(function(resolve, reject) {
  // 参数 `resolve` 和 `reject` 都是函数。
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // 当 Promise 完成时，必须执行 `resolve(result)`
  // 如果 Promise 被拒绝，则必须执行 `reject(Error)`
})
```

### Promises API

Promises API 实际上只包含少量的几个方法。

包括 2 个实例方法和 4 个静态/工具方法。

#### Promise 实例方法

想从 promise 中获取值，用常规手段（比如 `console.log(promise)`）是行不通的。

所有 Promise 都会返回成功（通过 `.then(fn)`）或失败（通过 `.catch(fn)`）。

#### Promise 工具方法

* `Promise.resolve(value)` - 将任何值转换为 Promise
* `Promise.reject(Error)` - 创建一个失败状态的 Promise，触发后续的 `.catch()`
* `Promise.all([...promises])` - 等待数组中所有的 Promise 全部完成
* `Promise.race([...promises])` - 只要数组中第一个 Promise 完成，即返回结果
````
