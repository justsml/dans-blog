# Translation Candidate
- Slug: javascript-scope-magic
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/zh/index.mdx
- Validation: deferred
- Runtime seconds: 2.40
- Input tokens: 1663
- Output tokens: 932
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000233
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: JavaScript 魔法
subTitle: 命令式 vs 递归式 vs 函数式
date: '2015-06-06'
modified: '2024-07-30'
category: Code
subCategory: javascript
draft: true
publish: true
tags:
  - javascript
  - programming
  - performance
  - patterns
cover: ../markus-spiske-197281-unsplash.webp
cover_mobile: ../w300_markus-spiske-197281-unsplash.webp
cover_icon: ../icon_markus-spiske-197281-unsplash.webp
---
## 命令式 vs. 递归 vs. 函数式

> [ 正在编写 ]

```javascript
// 命令式：最快（+ 非常简洁，没有新指针或额外分配）：
function fib(n) {
  var a = 1,
    b = 1,
    c = 0;
  for (var i = 1; i < n - 1; ++i) {
    c = a + b;
    a = b;
    b = c;
  }
  return b;
}

// 递归：（仅限 FIREFOX 或 BABELJS）使用参数默认值的 ES6 函数定义，设置初始（内部/递归）值
function fib(n, current = 0, a = 1, b = 1, c = 0) {
  current++;
  c = a + b;
  a = b;
  b = c;
  return current >= n ? b : fib(n, current, a, b, c);
}

// 教科书式的坏例子——函数作用域混乱，外部可变值太多
function fib(n) {
  if (!arr) {
    var arr = [1, 1];
    n = n - 2;
  } // Bad
  if (n === -1) {
    return [arr[0]];
  }
  if (n === 0) {
    return arr;
  }
  var proc = function() {
    --n;
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    return n === 0 ? arr : proc();
    // Bad: inner recursive function not needed, hint: variables used are from parent function scope
  };
  var ans = proc();
  return ans[ans.length - 1];
}
```

## Promise：太棒了！

```js
// 使用 bluebird Promise 的示例
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// Bluebird 让下面的代码异常简洁：
fs.readFileAsync("./style.less") // 调用已 promisify 的 readFile()
  .then(less.renderAsync) // 交给 less.render
  .then(writeFileData); // 接收 CSS 内容的函数（第一个参数）
```

1.  虽然原生 ES6 Promise 已经很好，我更倾向于成熟的 [Bluebird Promise 库](https://github.com/petkaantonov/bluebird/blob/master/API.md)。
2.  不管用不用库，现代浏览器已经支持 Promise 多年。
3.  Promise 完全可以在不使用疯狂模式的情况下使用——隐式 `deferred` 更可取。
4.  **$q 简直糟透了**，直接用 bluebird，见上文。
5.  值得一提：Bluebird 的基准测试是最佳情况，所以在写复杂链式 Promise 时要留意。

## Java vs JavaScript

### 限流 / 防抖 / 节流

1.  在 JavaScript 中，[David Walsh 用不到 20 行实现了防抖](http://davidwalsh.name/essential-javascript-functions)！
2.  在 Java 中，JDebounce 是一个约 500 行的库，复杂得多。
3.  _ 对比两者： _
4.  JavaScript 速度快，利用一等函数实现了极致简洁。
5.  而 Java 则有更多移动部件，注解在编译时注入行为，甚至还有大量 XML，纯粹是为了“好玩”。

<!--
## 反转控制技术

正在编写
-->

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
