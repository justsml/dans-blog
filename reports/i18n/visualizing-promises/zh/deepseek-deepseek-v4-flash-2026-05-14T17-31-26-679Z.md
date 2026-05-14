# Translation Candidate
- Slug: visualizing-promises
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-09-30--visualizing-promises/zh/index.mdx
- Validation: deferred
- Runtime seconds: 19.39
- Input tokens: 2509
- Output tokens: 2583
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001022
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 可视化Promise
subTitle: 突破...
date: '2018-09-30'
modified: '2024-07-30'
category: Guides
subCategory: promises
cover: ../junior-ferreira-735237-unsplash.webp
cover_mobile: ../w300_junior-ferreira-735237-unsplash.webp
cover_icon: ../icon_junior-ferreira-735237-unsplash.webp
tags:
  - promises
  - async
  - visualizing
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
---
为了可视化 Promise 的执行过程，我们先定义一个工具方法 `delay(millisecs)`。

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

这是一个工具方法，会在超时结束后 resolve。

延迟的毫秒数会被传入 `.then` 的回调。

我们来看 4 个例子（附带动画时间线）。

## 示例 #1/4

这个例子展示了 `console.log()` 的执行如何被 `delay(msec)` 延迟。

```js
delay(1000).then(() => console.log("done"));
```

![时间线：delay 1000 后 console.log 在一秒后执行](N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## 示例 #2/4

_这个例子展示了一个常见错误。_

`console.log` 在 `delay(1000)` **开始** 时立即触发，而不是像你期望的那样在延迟 **之后** 触发。

因为 `console.log` 返回 `undefined`，我们的 `.then()` 被静默忽略了。

注意 `typeof console.log === 'function'` 与 `typeof console.log() === undefined` 的区别。

通常 `console.log` 的期望用法如示例 #1 所示。确保你把函数传入 `.then` 和 `.catch`。

```js
delay(1000).then(console.log("done"));
```

![时间线：console.log 在延迟完成前立即执行](N_1000ms_!log.webp)

<!-- ```
delay(1000) --------|.then(null)
console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## 示例 #3/4

3 个 Promise 同时执行。

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![时间线：三个延迟 Promise 分别在 1 秒、2 秒和 3 秒后解决](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## 示例 #4/4

`Promise.all` 与 3 个 `delay` Promise。它们将同时执行。

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![时间线：Promise.all 等待所有三个延迟 Promise](../N_3000ms_PromiseAll.webp)

<!--

```
delay(1000) ---| [resolved]------------------v
delay(2000) ---|--------------| [resolved]---v
delay(3000) ---|--------------|--------------v [resolved]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1sec           2sec           3sec
```

-->

> 致谢：
>
> - 异步动画图由 [Patrick Biffle](https://github.com/Piglacquer) 制作
> - 本文灵感来源：https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="问题 #1：生命的意义：">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">生命的意义是什么？</div>

</div> -->
````
