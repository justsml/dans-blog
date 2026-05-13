# Translation Candidate
- Slug: promise-gotchas
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-09-26--promise-gotchas/ja/index.mdx
- Validation: deferred
- Runtime seconds: 0.95
- Input tokens: 2604
- Output tokens: 506
- Thinking tokens: unknown
- Cached input tokens: 1408
- Cache write tokens: 0
- Estimated cost: $0.000193
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise の落とし穴
subTitle: 一般的なミスを避ける
date: '2018-09-26'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - debugging
  - errors
  - javascript
  - composition
related:
  - intro-to-promises
  - visualizing-promises
  - are-promises-broken
  - javascript-promises-quiz
cover: ../michal-parzuchowski-224092-unsplash.webp
cover_mobile: ../w300_michal-parzuchowski-224092-unsplash.webp
cover_icon: ../icon_michal-parzuchowski-224092-unsplash.webp
---
### Promise は他の値と同じようには動作しません

ほとんどの値と違い、値をそのまま出力することはできません:

```js
// Promise では意味が通りません:
console.log(Promise.resolve(42));

// `.then` インターフェースを使う必要があります:
Promise.resolve(42).then(value => console.log(value));
```

### Promise はミスを警告しません

典型的なミスです。

様々な理由から、TC39 は `.then` と `.catch` に `null` を渡すことを許可しました。たとえば `.then(null, null)` は有効で、チェーン内のその「ステップ」をスキップするという挙動が求められます。

この結果、ちょっとした手違いで問題が起きやすくなります。

##### 例で確認

次のミニチャレンジを見てみましょう: 以下のどのオプションが `console.log` に 42 を出力しますか？

```js
// オプション #1:
Promise.resolve(42).then(console.log());

// オプション #2:
Promise.resolve(42).then(console.log);

// オプション #3:
Promise.resolve(42).then(value => console.log(value));

// オプション #4:
Promise.resolve(42)
  .then(console.log())
  .then(console.log);
```

##### 答え

正解は #2、#3、そして #4 です。

なぜでしょうか？ `.then()` に渡された **型** を見てみましょう。

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

4番目のオプションがどう動くのかまだ疑問ですか？

実際には次のように実行されています。

```js
// Option #4 - 実際の挙動
Promise.resolve(42)
  .then(undefined) // 値には影響せず、次の `.then(fn)` にそのまま渡される
  .then(console.log);
```
````
