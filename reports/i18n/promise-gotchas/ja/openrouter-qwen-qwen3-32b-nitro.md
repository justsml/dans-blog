# Translation Candidate
- Slug: promise-gotchas
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-26--promise-gotchas/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 5.81
- Input tokens: 2694
- Output tokens: 1976
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000690
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-09-26--promise-gotchas/ja/index.mdx reports/i18n/promise-gotchas/ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promiseの落とし穴
subTitle: 一般的なミスの回避
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

ほとんどの値のように値を出力できません:

```js
// Promiseではこの書き方は意味を持たない:
console.log(Promise.resolve(42));

// `.then`インターフェースを使う必要がある:
Promise.resolve(42).then(value => console.log(value));
```

### Promiseはミスを指摘しない

まあ、ありそうなミスです。

さまざまな理由から、TC39は`.then`と`.catch`に`null`を渡すことを許容することを決めました。例えば、`.then(null, null)`は有効であり、チェーン内のそのステップをスキップする動作が規定されています。

この結果として、非常に簡単にミスを引き起こすことが可能になります。

##### 例による説明

簡単なチャレンジを見てみましょう。以下のどのオプションが `console.log` で 42 を出力するでしょうか？

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

##### 正解

正解はオプション #2、#3、#4 です。

なぜか？ `.then()` に渡された引数の**型**を確認しましょう：

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

4番目のオプションの動作がまだよく分からない場合は？

これは実質的に以下のように実行されます：

```js
// オプション #4 - 実質的に
Promise.resolve(42)
  .then(undefined) // これは値に影響を与えません。次の `.then(fn)` に渡されます
  .then(console.log);
```
````
