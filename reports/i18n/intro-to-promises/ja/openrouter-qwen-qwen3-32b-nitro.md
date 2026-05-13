# Translation Candidate
- Slug: intro-to-promises
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 8.17
- Input tokens: 3565
- Output tokens: 2728
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000940
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-08-01--intro-to-promises/ja/index.mdx reports/i18n/intro-to-promises/ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: プロミス入門
subTitle: ジャバスクリプトのプロミスは楽しい！
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
## Promiseとは？その真価とは

コンピュータコードを実行する際、2つの可能性がある：**成功**または**失敗**。

コードが非同期である場合、その結果を信頼して扱うのはさらに難しくなる。

**`Promise`** はこれを扱うための便利な仕組みである。

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

> 傍注：Promiseは解決または拒否されるべきだが、どちらにも失敗する可能性がある。これによりアプリがフリーズし、デバッグが非常に困難になる。

### Promiseはどこから来るのか

多くの場合、自分でPromiseを作成する必要はありません。ネイティブAPI（`fetch`など）や人気のあるライブラリ（`axios`など）はすでにPromiseを返しています。

ただし、Promiseを作成しなければならない場合は、以下の2つの方法があります。

### Promiseの作成方法 #1/2

Promiseを作成する最も簡単な方法は、ヘルパーメソッド`Promise.resolve()`を使用することです。

`Promise.resolve(value)`を使って、任意の値をPromiseにラップ（または「変換」）できます。

```js
// Promiseなし：
function add10(num) {
  return num + 10
}

// Promiseあり：
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Promiseの作成方法 #2/2：

### Promiseの作成方法 #2/2:  
もう1つの柔軟な方法: `Promise`コンストラクタを使用する。  

`new Promise(callback)`は、次のインターフェースを持つ`callback`関数を受け取ります:  

```js
new Promise(function(resolve, reject) {
  // 引数`resolve`と`reject`はどちらも関数です。
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // Promiseが履行されたときに`resolve(result)`を実行しなければなりません
  // Promiseが拒否された場合に`reject(Error)`を実行しなければなりません
})
```

### Promise API  
Promise APIは実際には少数のメソッドのみで構成されています。  

- 2つのインスタンスメソッド  
- 4つのスタティック/ユーティリティ関数  

#### Promiseインスタンスメソッド

Promiseから値を取得するには通常の方法（例: `console.log(promise)`）は動作しません。  

すべてのPromiseは、`.then(fn)`を介して成功を返すか、`.catch(fn)`を介して失敗を返します。  

#### Promiseユーティリティ関数  

* `Promise.resolve(value)` - 任意の値をPromiseに変換  
* `Promise.reject(Error)` - 失敗するPromiseを作成し、その後の`.catch()`をトリガーします  
* `Promise.all([...promises])` - Promiseの配列がすべて完了するのを待ちます  
* `Promise.race([...promises])` - 最初に解決したPromiseに応じて解決します
````
