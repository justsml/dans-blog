# Translation Candidate
- Slug: javascript-scope-magic
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.30
- Input tokens: 1533
- Output tokens: 1382
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000454
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: JavaScript 技术揭秘
subTitle: 命令式与递归式与函数式
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
## 命令式 vs 递归式 vs 函数式

> [ 在开发中 ]

```javascript
// 命令式：最快（+ 非常简单，没有新指针或多余分配）：
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

// 递归式：（仅 FIREFOX 或 BABELJS）使用 ES6 函数定义和
// 参数默认值设置初始（内部/递归）值
function fib(n, current = 0, a = 1, b = 1, c = 0) {
  current++;
  c = a + b;
  a = b;
  b = c;
  return current >= n ? b : fib(n, current, a, b, c);
}

// 教科书级差示例 - 函数作用域差，使用多个可变外部值
function fib(n) {
  if (!arr) {
    var arr = [1, 1];
    n = n - 2;
  } // 差
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
    // 差：不需要内部递归函数，提示：使用的变量来自父函数作用域
  };
  var ans = proc();
  return ans[ans.length - 1];
}
```

## Promise：太棒了！

```js
// 示例使用 bluebird Promise 和其
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// Bluebird 让这样的操作变得过于简单和简洁：
fs.readFileAsync("./style.less") // 调用 promise 化的 readFile()
  .then(less.renderAsync) // 传递给 less.render
  .then(writeFileData); // 接收 css 内容的函数（第一个参数）
```

1. 虽然原生 ES6 Promise 很棒，但我更喜欢强大的 [Bluebird Promise 库](https://github.com/petkaantonov/bluebird/blob/master/API.md)。
2. 无论是否使用库，现代浏览器都支持 Promise 多年了。
3. Promise 可以不用疯狂模式使用 - 隐式 `deferred` 更可取。
4. **$q 就是垃圾** 直接用 bluebird，见上文。
5. 值得一提：Bluebird 的基准测试是最佳情况测试，如果做复杂的 promise 链请注意这一点

## Java vs JavaScript

### 速率限制 / 防抖 / 节流

1. 在 JavaScript 中 [David Walsh 用不到 20 行代码实现了防抖](http://davidwalsh.name/essential-javascript-functions)！
2. 在 Java 中，JDebounce 这个库要复杂得多，约 500+ 行代码。
3. _ 两者对比：_
4. JavaScript 快速且使用一等函数实现惊人的简洁性。
5. 而 Java 则有更多移动部件，使用注解在编译时应用行为，并且有很多 XML，纯粹是为了好玩！

<!-- 
## 控制反转技术

开发中 
-->

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
