# Translation Candidate
- Slug: are-promises-broken
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2018-10-06--are-promises-broken/zh/index.mdx
- Validation: deferred
- Runtime seconds: 44.53
- Input tokens: 4843
- Output tokens: 2243
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.009150
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 承诺落空？
unlisted: true
subTitle: 漏掉错误，丢失结果……
date: '2018-10-06'
modified: '2024-12-11'
tags:
  - promises
  - javascript
  - errors
  - programming
category: Code
subCategory: promises
cover: ../lennart-heim-766366-unsplash.webp
cover_mobile: ../w300_lennart-heim-766366-unsplash.webp
cover_icon: ../icon_lennart-heim-766366-unsplash.webp
---
## JavaScript Promise 真的坏了吗？

### 过去式

关于 Promise 最常见的迷思之一，就是它**所谓**的错误处理缺陷。

**很多年前**，Promise 处理错误确实很糟糕。**但后来投入了大量工作来修复它。**

> 于是，**它被修复了**，甚至被**广泛部署**。

#### 众人欢呼

遗憾的是，有些人并没注意到。

### 现代式

这个迷思依然存在，我随处可见：[Medium 上的热门文章](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9)、[DZone 上](#redacted)以及[许多](https://medium.com/@avaq/broken-promises-2ae92780f33)其他来源。

我承认，甚至连“官方”资源和文档提供的也大多是[拙劣的示例和坏习惯](../promise-gotchas/)。这些例子经常被用来“证明” Promise 不好用。有些甚至建议使用会让情况变得更糟的“疗法”。（注：链接已移除）

<!-- 我多次看到的一个建议是：永远不要使用 `.catch`，而是使用 `"unhandledRejection"` 全局事件。**千万别这么做**。unhandledRejection 是为在即将关机前清理全局引用（如数据库连接）而设计的。） -->

<br />
<br />

## 远离麻烦的准则

1. [Promise 需要有所依托](#1-promises-need-something-to-hang-on-to)
    * **务必**从函数中 `return`。
1. [使用真正的 `Error` 实例](#2-use-real-error-instances)
    * **务必**使用 `Error` 实例。
1. [在有意义的地方处理错误](#3-handle-errors-where-it-makes-sense)
    * **务必**至少使用一次 `.catch()`。
1. [通过具名函数增加清晰度 🦄✨](#4-add-clarity-with-named-functions-)
    * **优先使用**具名函数。

-------------------------------------------

#### #1 Promise 需要有所依托

**务必从函数中 `return`**，这一点至关重要。

Promise 回调函数在 `.then(callback)` 和 `.catch(callback)` 中遵循特定的模式。

每个返回值都会被传递给下一个 `.then()` 的回调函数。

```js
function addTen(number) {
  return number + 10;
}

Promise.resolve(10)  // 10
  .then(addTen)      // 20
  .then(addTen)      // 30
  .then(addTen)      // 40
  .then(console.log) // logs "40"
```

> “始终返回”的额外好处：代码更容易进行单元测试。

**问题：** 这里创建了多少个不同的 Promise 状态（已解决和已拒绝）？

**问题：** 在前面的示例中创建了多少个 Promise？

#### #2 使用真正的 `Error` 实例

JavaScript 在错误处理方面有一种有趣的特性（这同时适用于异步**和**同步代码）。

<a href="https://repl.it/@justsml/throwing-errors-in-javascript" target="_blank">[<i>查看 repl.it 示例：`throwing errors in javascript`</i>]</a>
<img alt="throwing errors in javascript" src="../throwing-errors-in-javascript.webp" />

为了**获取有关行号和调用栈的有用细节**，你必须使用 `Error` 实例。像在 Python 或 Ruby 中那样抛出字符串在 JS 里是行不通的。

虽然 JavaScript **看起来**能处理 `throw "string"`，你也能在 `catch` 处理器中看到这个字符串。但是，你看到的*仅仅*是数据本身。它不会包含任何之前的[栈帧（stack frames）](https://en.wikipedia.org/wiki/Call_stack#Stack_and_frame_pointers)。

正确的 `new Error` 示例：

```js
throw new Error('message')           // ✅
Promise.reject(new Error('message')) // ✅
throw Error('message')               // ✅
Promise.reject(Error('message'))     // ✅
```

以下是常见的反模式：

```js
throw 'error message'  // ❌
Promise.reject(-42)    // ❌
```

<iframe height="400px" width="100%" src="https://repl.it/@justsml/throwing-errors-in-javascript?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### #3 在有意义的地方处理错误

Promise 提供了一种优雅的错误处理方式，即使用 `.catch()`。它本质上是一种特殊的 `.then()` —— 专门用来处理前面任何 `.then()` 中抛出的错误。让我们看个例子……

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('will not get hit'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('WILL get hit'))
```

虽然 `.catch()` 看起来像 DOM 事件处理器（比如 `click`、`keypress`），但它的位置至关重要，因为它只能“捕获”在它**上方**抛出的错误。

**覆盖错误其实非常简单**：在 `.catch()` 回调中返回一个非错误值，Promise 链就会切换回按顺序执行 `.then()` 回调。（实际上就是这样。）

尝试理解下面这个例子的执行顺序：

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(num => num + 1)
  .then(console.log) // 预期输出: 100
```

**理解这个执行序列才是关键。**

虽然这个例子很傻，但它的目的是为了**说明 Promise 中错误和数据的流动方式**。

以下是执行序列的简述：

1. 初始值为 42。
1. 下一个方法始终返回 `hello`。
1. 我们忽略之前的值，并抛出一个带有 `'totes fail'` 消息的错误。
1. `.catch()` 拦截了错误，转而返回 `99`，该值将由随后的任何 `.then()` 处理。
1. 递增 `num`，返回 `100`。
1. `console.log` 方法接收到 `100` 并将其打印出来！:tada:

**思考题：** 当两个 `.catch()` 连续出现时会发生什么？第二个会执行吗？你能想到这种用法的场景吗？

**思考题：** `.catch()` 如何忽略错误？你该如何防止错误导致 `Promise.all` 提前退出？

#### #4 使用具名函数增加清晰度 🦄✨

对比以下两个例子的**可读性**：

**匿名函数：** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // 预期输出: "25.00"
```

**具名函数：** ✅

```js
Promise.resolve(10) // 10
  .then(double)     // 20
  .then(quarter)    // 5
  .then(square)     // 25
  .then(format)     // "25.00"
  .then(log)        // 预期输出: "25.00"

const double = x => x * 2
const quarter = x => x / 4
const square = x => x * x
const format = x => x.toFixed(2)
const log = x => console.log(x)

```

**额外红利：** ✅

> 兼容数组方法！！！

你可以将这些具名函数复用到 `Array.prototype` 的方法中，包括 `.map()`、`.filter()`、`.every()`、`.some()`、`.find()`！

集合流水线（Collection pipelines）简直无敌：

```js
// 简直一模一样 :mindblown:

[10, 20]           // [ 10, 20 ]
  .map(double)     // [ 20, 40 ]
  .map(quarter)    // [ 5, 10 ]
  .map(square)     // [ 25, 100 ]
  .map(format)     // [ "25.00", "100.00" ]
  .map(log)        // 预期输出两行: "25.00", "100.00"

```

如果你不想写这种线性风格的代码……既然你已经有了这些简单的函数！

你可以按需使用它们：

```js
// 嵌套模式
// ❌ 但请千万别这么写

const result = format(square(quarter(double(10))))

log(result)
// 预期输出: "25.00"
```

**为什么嵌套函数是一种反模式？**

1. 对大多数人来说可读性极差。
2. git diff 无法直观地显示是谁改动了哪一部分。
3. 很难在嵌套函数的中间环节进行调试或记录日志。
````
