# Translation Candidate
- Slug: visualizing-promises
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2018-09-30--visualizing-promises/zh/index.mdx
- Validation: deferred
- Runtime seconds: 8.47
- Input tokens: 2586
- Output tokens: 1009
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004320
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise 可视化
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
为了直观地展示 Promise 的执行过程，我们先定义一个 `delay(millisecs)` 方法。

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

这是一个工具方法，它会在超时后完成 resolve。

延迟的毫秒数将传递给 `.then` 的回调函数。

让我们看 4 个例子（附带动画时间线）。

## 示例 #1/4

展示 `console.log()` 的执行如何被 `delay(msec)` 延迟。

```js
delay(1000).then(() => console.log("done"));
```

![Timeline showing delay 1000 then console log running after one second](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## 示例 #2/4

*这是一个常见错误。*

`console.log` 在 `delay(1000)` **开始**时就立即触发了。而不是像你预期的那样在延迟**之后**触发。

因为 `console.log` 返回 `undefined`，我们的 `.then()` 被静默忽略了。

注意 `typeof console.log === 'function'` 与 `typeof console.log() === undefined` 之间的区别。

通常 `console.log` 的正确用法如示例 #1 所示。请确保向 `.then` 和 `.catch` 中传递的是函数。

```js
delay(1000).then(console.log("done"));
```

![Timeline showing console log running immediately before the delay finishes](../N_1000ms_!log.webp)

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

![Timeline showing three delay promises resolving after one two and three seconds](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## 示例 #4/4

包含 3 个 `delay` Promise 的 `Promise.all`。它们将并发执行。

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Timeline showing Promise all waiting for all three delay promises](../N_3000ms_PromiseAll.webp)

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
> - 异步动画图表由 [Patrick Biffle](https://github.com/Piglacquer) 制作
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
