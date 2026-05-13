# Translation Candidate
- Slug: promise-gotchas
- Locale: ja
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-09-26--promise-gotchas/ja/index.mdx
- Validation: deferred
- Runtime seconds: 13.77
- Input tokens: 2057
- Output tokens: 2227
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000912
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promiseの落とし穴
subTitle: よくある間違いを避ける
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
### Promiseは他の値のように動作しない

他の値のように値を出力することはできません：

```js
// This doesn't make sense w/ promises:
console.log(Promise.resolve(42));

// We must use the `.then` interface:
Promise.resolve(42).then(value => console.log(value));
```

### Promiseはミスをしても警告しない

まあ、よくあるミスです。

様々な理由から、TC39は `.then` と `.catch` に null を渡せるように決定しました。例えば、`.then(null, null)` は有効であり、チェーン内のその「ステップ」をスキップする動作が要求されます。

この不幸な結果として、簡単に失敗してしまうのです。

##### 例で見る

ミニチャレンジを見てみましょう：次の選択肢のうち、`console.log` が 42 を出力するのはどれですか？

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

なぜでしょうか？`.then()` に渡されたものの **型** を見てみましょう：

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

まだ4番目の選択肢がどう動くのか疑問に思っていますか？

実際には次のように動作します：

```js
// Option #4 - effectively
Promise.resolve(42)
  .then(undefined) // this has no affect on the value, it will be handed to following `.then(fn)`
  .then(console.log);
```
````
