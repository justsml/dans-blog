# Translation Candidate
- Slug: intro-to-promises
- Locale: ja
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-08-01--intro-to-promises/ja/index.mdx
- Validation: deferred
- Runtime seconds: 73.36
- Input tokens: 3838
- Output tokens: 3841
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001613
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise入門
subTitle: JavaScriptのPromiseは楽しい！
date: '2018-08-01'
modified: '2024-07-31'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - javascript
  - composition
related:
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
cover: ../joe-yates-480485-unsplash.webp
cover_mobile: ../w300_joe-yates-480485-unsplash.webp
cover_icon: ../icon_joe-yates-480485-unsplash.webp
---
## Promises... 何がすごいのか？

どんなコードを実行するときも、結果は **成功** か **失敗** の2つしかない。

そのコードが非同期処理なら、結果に確実に依存するのはさらに難しくなる。

**`Promises`** はこれを扱う便利な方法を提供する。

```
                        +--Promise---+
                        |            |
                        | <-either-> |
                        |            |
                <-------+            +-------->
                |Failure?             Success?|
                |                             |
                v                             v
                (Rejected)           (Resolved)
```

> 余談: Promise は解決 (resolve) または拒否 (reject) されるべきだが、どちらも行われないことがある。これによりアプリがハングし、デバッグが非常に困難になる。

### Promise はどこから来るのか？

多くの場合、自分でPromiseを作成する必要はありません。`fetch`のようなネイティブAPIや、`axios`のような人気ライブラリは、すでにPromiseを返します。

ただし、どうしてもPromiseを作成する必要がある場合、2つの方法があります：

### Promiseの作成 #1/2:

Promiseを作成する最も簡単な方法は、ヘルパーメソッド `Promise.resolve()` を使うことです。

`Promise.resolve(value)` を使えば、任意の値をPromiseでラップ（または「変換」）できます。

```js
// Without Promises:
function add10(num) {
  return num + 10
}

// With Promises:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Promiseの作成 #2/2:

もう一つのより柔軟な方法: `Promise` コンストラクタを使う。

`new Promise(callback)` は以下のインターフェースを持つ `callback` 関数を受け取る。

```js
new Promise(function(resolve, reject) {
  // The arguments `resolve` and `reject` are both functions.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` must get executed when the promise is fulfilled
  // `reject(Error)` must get executed if the promise is rejected
})
```

### Promises API

Promises APIは実際には少数のメソッドで構成されている。

2つのインスタンス関数と、4つの静的/ユーティリティ関数である。

#### Promiseインスタンスメソッド

Promiseから値を取得するのに、通常の方法（`console.log(promise)`など）は使えない。

すべてのPromiseは、成功（`.then(fn)`経由）または失敗（`.catch(fn)`経由）のいずれかを返す。

#### Promiseユーティリティメソッド

* `Promise.resolve(value)` - 任意の値をPromiseに変換する
* `Promise.reject(Error)` - 失敗のPromise値を作成し、後続の`.catch()`をトリガーする
* `Promise.all([...promises])` - Promiseの配列がすべて完了するのを待つ
* `Promise.race([...promises])` - 最初のPromiseが解決した時点で解決する
````
