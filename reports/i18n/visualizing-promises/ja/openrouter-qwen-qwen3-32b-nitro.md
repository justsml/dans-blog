# Translation Candidate
- Slug: visualizing-promises
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 10.15
- Input tokens: 4603
- Output tokens: 4034
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001336
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug visualizing-promises --locale ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: プロミスの可視化
subTitle: ''
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
Promiseの実行方法を視覚化するため、新しい関数`delay(millisecs)`を定義しましょう。

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

これはタイムアウトが経過した後に解決するユーティリティ関数です。

ミリ秒単位の遅延は`.then`のコールバックに渡されます。

4つの例（アニメーション付きタイムラインを用いて）を見てみましょう。

## 例 #1/4

これは`console.log()`の実行が`delay(msec)`によって遅延されることを示しています。

```js
delay(1000).then(() => console.log("done"));
```

![タイムライン: 1000msの遅延後にコンソールログが実行される](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## 例 #2/4

_これはよくある間違いを示しています。_

`console.log`は`delay(1000)`の**開始時**に実行されます。おそらく**1秒後**に実行させたかったでしょう。

`console.log`が`undefined`を返すため、`.then()`が静かに無視されています。

`typeof console.log === 'function'` と `typeof console.log() === undefined` の違いに注意してください。

一般的に、`console.log` の使用方法としては例 #1 が適切です。`.then` や `.catch` に関数を渡すことを確認してください。

```js
delay(1000).then(console.log("done"));
```

![`console.log` が `delay` が完了する前に即座に実行されるタイムライン](../N_1000ms_!log.webp)

<!-- ```
delay(1000) --------|.then(null)
console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## 例 #3/4

3つのPromiseが同時に実行されます。

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![1秒、2秒、3秒後に解決する3つの遅延Promiseを示すタイムライン](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1秒                 2秒                 3秒
``` -->

## 例 #4/4

3つの`delay` Promiseを含む`Promise.all`。これらは同時に実行されます。

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![3つの遅延Promiseを待つPromise.allのタイムライン](../N_3000ms_PromiseAll.webp)

<!-- ``` 
--- CHUNK END ---
``` -->

```
delay(1000) ---| [解決済み]------------------v
delay(2000) ---|--------------| [解決済み]---v
delay(3000) ---|--------------|--------------v [解決済み]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0ミリ秒        1秒            2秒            3秒
```

>
> 出典:
>
> - 非同期図解アニメーション: [Patrick Biffle](https://github.com/Piglacquer)
> - この記事のインスピレーション: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="質問 #1: 人生の意味とは？">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">人生の意味とは何ですか？</div>

</div> -->
```
````
