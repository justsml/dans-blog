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
###Promises don't work like other values

You cannot print their value like most values:

```js
// This doesn't make sense w/ promises:
console.log(Promise.resolve(42));

// We must use the `.then` interface:
Promise.resolve(42).then(value => console.log(value));
```

### Promises don't warn you when making a mistake

Well, a likely mistake.

For a variety of reasons, it was decided by TC39 that `.then` and `.catch` may be passed null. For example, `.then(null, null)` is valid and the required behavior is to skip that 'step' in the chain.

The unfortunate consequence of this is it's very easy to screw things up。

##### 例で見てみる

次のミニチャレンジを見てみましょう: 以下のどのオプションが `console.log` に 42 を出力しますか？

```js
// Option #1:
Promise.resolve(42).then(console.log());

// Option #2:
Promise.resolve(42).then(console.log);

// Option #3:
Promise.resolve(42).then(value => console.log(value));

// Option #4:
Promise.resolve(42)
  .then(console.log())
  .then(console.log);
```

##### 答え

答えは #2、#3、#4 です。

なぜでしょうか？ `.then()` に渡された **型** を見てみます:

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

4番目のオプションがどう動くのか、まだ気になりますか？

実際には次のように実行されます:

```js
// Option #4 - 実際の挙動
Promise.resolve(42)
  .then(undefined) // 値に影響を与えず、次の `.then(fn)` にそのまま渡される
  .then(console.log);
```
````
