# Translation Candidate
- Slug: are-promises-broken
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-06--are-promises-broken/zh/index.mdx
- Validation: deferred
- Runtime seconds: 1.94
- Input tokens: 4800
- Output tokens: 2474
- Thinking tokens: unknown
- Cached input tokens: 1280
- Cache write tokens: 0
- Estimated cost: $0.000633
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 失信？
unlisted: true
subTitle: 抛弃错误，丢失结果…
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

### 过去的时代

关于 Promise 最常见的误解之一是它 **所谓的** 错误处理缺陷。

**很多年前** Promise 在错误处理上确实糟透了。**大量工作投入到了修复它**。

> 于是，**它被修复了**，甚至 **被广泛部署**。

#### 人们欢呼

可悲的是，有些人并没有注意到。

### 当下的时代

这个误解仍然存在，我到处都能看到：[Medium 上的热门文章](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9)、[在 DZone 上](../#redacted)、以及 [许多其他来源](https://medium.com/@avaq/broken-promises-2ae92780f33)。

我承认，即使是 “官方” 资源和文档也大多提供了 [薄弱的示例和不良习惯](/promise-gotchas/)。这些通常被用来 “证明” 对 Promise 的反对意见。甚至还有人建议 “治愈” 方法，却让情况更糟。（注：链接已移除）

<!-- One such tip I've seen multiple times: is to never use `.catch`, and instead use an `"unhandledRejection"` global event. **NEVER** do this. unhandledRejection is designed for cleanup of global references, like database connections, before an impending shutdown.) -->

<br />
<br />

## 避免麻烦的规则

1. [Promise 需要有东西可以挂住](../#1-promises-need-something-to-hang-on-to)
    * **始终** `return` 你的函数。
1. [使用真实的 `Error` 实例](../#2-use-real-error-instances)
    * **始终** 使用 `Error` 实例。
1. [在合理的地方处理错误](../#3-handle-errors-where-it-makes-sense)
    * **始终** 使用 `.catch()`，至少一次。
1. [用具名函数提升可读性 🦄✨](../#4-add-clarity-with-named-functions-)
    * __倾向__ 使用具名函数。

-------------------------------------------

#### #1 Promise 需要有东西可以挂住

关键是你 **始终 `return`** 你的函数。

Promise 回调函数在 `.then(callback)` 和 `.catch(callback)` 中遵循特定模式。

每个返回的值都会传递给下一个 `.then()` 的回调。

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

> “始终返回”的额外好处：代码更容易单元测试。

**问题：** 在上述代码中创建了多少个不同的 Promise 状态（已解决 & 已拒绝）？

**问题：** 上例中创建了多少个 Promise 实例？

#### #2 使用真实的 `Error` 实例

JavaScript 对错误的处理方式颇为特殊（既适用于异步 **也** 同步代码）。

<a href="https://repl.it/@justsml/throwing-errors-in-javascript" target="_blank">[<i>在 repl.it 中查看示例：`throwing errors in javascript`</i>]</a>
<img alt="throwing errors in javascript" src="../throwing-errors-in-javascript.webp" />

为了 **获取行号和调用栈的有用细节**，必须使用 `Error` 实例。抛出字符串并不像在 Python 或 Ruby 中那样工作。

虽然 JavaScript **似乎** 能处理 `throw "string"`，但在你的 `catch` 处理器里只能看到该字符串本身。除此之外，*不会看到任何先前的[栈帧](https://en.wikipedia.org/wiki/Call_stack#Stack_and_frame_pointers)*。

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

#### #3 在合适的位置处理错误

Promise 提供了一种简洁的错误处理方式，使用 `.catch()`。它本质上是一种特殊的 `.then()`——会捕获前面所有 `.then()` 中抛出的错误。来看一个例子……

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('will not get hit'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('WILL get hit'))
```

虽然 `.catch()` 看起来像 DOM 事件处理器（例如 `click`、`keypress`），但它的位置至关重要，因为它只能捕获 **它上方** 抛出的错误。

**覆盖错误相对简单**：在 `.catch()` 回调中返回一个非错误值，Promise 链会切换回顺序执行 `.then()` 回调。（实际上就是这样。）

尝试按照下面的顺序执行：

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(num => num + 1)
  .then(console.log) // expected output: 100
```

**关键在于理解整个序列的执行顺序。**

虽然是个傻瓜示例，但它旨在 **说明 Promise 中错误与数据的流向**。

下面是执行顺序的概览：

1. `42` 是初始值。  
2. `hello` 始终由下一个方法返回。  
3. 我们忽略前面的值，并抛出带有 `'totes fail'` 信息的错误。  
4. `.catch()` 拦截错误，改为返回 `99`，随后任何 `.then()` 都会处理它。  
5. 对 `num` 进行自增，返回 `100`。  
6. 方法 `console.log` 接收到 `100` 并打印它！ :tada:

**问题：** 当连续出现两个 `.catch()` 时会怎样？第二个 `.catch()` 能运行吗？你能想到它的使用场景吗？

**问题：** `.catch()` 如何忽略错误？如何防止错误导致 `Promise.all` 提前退出？

#### #4 用具名函数提升可读性 🦄✨

比较以下两段代码的 **可读性**：

**匿名：** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // expected output: "25.00"
```

**具名：** ✅

```js
Promise.resolve(10) // 10
  .then(double)     // 20
  .then(quarter)    // 5
  .then(square)     // 25
  .then(format)     // "25.00"
  .then(log)        // expected output: "25.00"

const double = x => x * 2
const quarter = x => x / 4
const square = x => x * x
const format = x => x.toFixed(2)
const log = x => console.log(x)

```

**额外奖励：** ✅

> 与数组方法兼容!!!

你可以把具名函数复用于 `Array.prototype` 系列方法，包括 `.map()`、`.filter()`、`.every()`、`.some()`、`.find()`！

集合管道 #FTW：

```js
// IT'S LIKE THE SAME THING :mindblown:

[10, 20]           // [ 10, 20 ]
  .map(double)     // [ 20, 40 ]
  .map(quarter)    // [ 5, 10 ]
  .map(square)     // [ 25, 100 ]
  .map(format)     // [ "25.00", "100.00" ]
  .map(log)        // expected 2 lines of output: "25.00", "100.00"

```

如果你不想写这种线性风格的代码…… 那就直接使用简单函数吧！

你可以根据需要随意组合它们：

```js
// 嵌套模式
// ❌ 请不要这么写，除非万不得已

const result = format(square(quarter(double(10))))

log(result)
// expected output: "25.00"
```

**为什么嵌套函数是反模式？**

1. 对多数人来说可读性差  
2. `git diff` 难以直接看出是谁改了哪部分  
3. 在嵌套函数的中间调试或记录日志非常困难
````
