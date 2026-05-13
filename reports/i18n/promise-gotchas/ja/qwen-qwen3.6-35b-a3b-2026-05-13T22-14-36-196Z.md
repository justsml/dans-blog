# Translation Candidate
- Slug: promise-gotchas
- Locale: ja
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2018-09-26--promise-gotchas/ja/index.mdx
- Validation: deferred
- Runtime seconds: 27.22
- Input tokens: 2090
- Output tokens: 5801
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.006115
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise の落とし穴
subTitle: 陥りやすいミスを避ける
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
### プロミスは他の値とは異なる動作をする

ほとんどの値とは異なり、その値をそのまま出力することはできません：

```js
// This doesn't make sense w/ promises:
console.log(Promise.resolve(42));

// We must use the `.then` interface:
Promise.resolve(42).then(value => console.log(value));
```

### 間違いを犯してもプロミスは警告してくれない

いや、ありそうな間違いですが。

TC39 は複数の理由から、`.then` と `.catch` に `null` を渡すことを許可する仕様決定を行いました。例えば `.then(null, null)` は有効な呼び出しであり、その場合の必須動作はチェーン内の該当「ステップ」をスキップすることです。

この仕様の不運な結果は、非常に簡単に処理を壊してしまう点です。

##### 具体例

ミニチャレンジを見てみましょう：以下のオプションのうち、どれが `42` を `console.log` するでしょうか？

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

##### 正解

正解は #2、#3、#4 です。

なぜか？ `.then()` に渡された引数の**型**を確認すれば一目瞭然だ。

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

なぜ第4のオプションが機能するのか、まだ疑問に思っているか？

実際には以下のように動作している。

```js
// Option #4 - effectively
Promise.resolve(42)
  .then(undefined) // this has no affect on the value, it will be handed to following `.then(fn)`
  .then(console.log);
```
````
