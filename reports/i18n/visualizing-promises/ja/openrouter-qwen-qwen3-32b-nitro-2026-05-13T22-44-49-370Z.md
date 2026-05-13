# Translation Candidate
- Slug: visualizing-promises
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/ja/index.mdx
- Validation: deferred
- Runtime seconds: 5.99
- Input tokens: 3406
- Output tokens: 2521
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000878
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promiseの可視化
subTitle: 障壁を突破せよ…
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
Promiseの実行を可視化するため、新しいメソッド`delay(millisecs)`を定義します。

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

これはタイムアウトが経過した時点で解決するユーティリティメソッドです。

ミリ秒単位の遅延は`.then`のコールバックに渡されます。

4つの例（アニメーションされたタイムライン付き）を見てみましょう。

## 例 #1/4

これは`console.log()`の実行が`delay(msec)`によって遅延されることを示しています。

```js
delay(1000).then(() => console.log("done"));
```

![1秒後にconsole logが実行されるdelay 1000のタイムライン](N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## 例 #2/4

_これはよくある間違いを示しています。_

`console.log` は `delay(1000)` が **開始した瞬間**に実行されます。おそらく **1秒後に実行される**ことを期待していたでしょうが、実際はそうなりません。

これは `console.log` が `undefined` を返すため、`.then()` が無視されてしまいます。

`typeof console.log === 'function'` と `typeof console.log() === undefined` の違いに注意してください。

一般的に `console.log` の正しい使い方は例1に示されています。`.then` や `.catch` に**関数を渡す**ことを確認してください。

```js
delay(1000).then(console.log("done"));
```

![タイムライン：console logがdelay完了前に即座に実行される](N_1000ms_!log.webp)

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

![タイムライン：1秒、2秒、3秒後に解決する3つのdelay Promise](N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## 例 #4/4

`Promise.all` で 3 つの `delay` Promise を使用します。これらは同時に実行されます。

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Promise.all が3つのdelayプロミスのすべてを待つことを示すタイムライン](../N_3000ms_PromiseAll.webp)

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

> 謝辞:
>
> - アニメーション非同期図表は [Patrick Biffle](https://github.com/Piglacquer) による
> - この記事のインスピレーション: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="質問 #1: 人生の意味:">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">人生の意味とは何ですか？</div>

</div> -->
````
