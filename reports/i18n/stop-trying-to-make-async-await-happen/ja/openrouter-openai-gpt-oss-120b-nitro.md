# Translation Candidate
- Slug: stop-trying-to-make-async-await-happen
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/ja/index.mdx
- Validation: deferred
- Runtime seconds: 11.10
- Input tokens: 10969
- Output tokens: 3132
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.000992
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 非同期/await を無理に実装しようとしない
subTitle: 約束は今や主流です。
date: '2018-10-03'
modified: '2024-08-03'
category: Guides
subCategory: promises
tags:
  - promises
  - async
  - await
  - async-await
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - you-may-not-need-axios
cover: ../matt-nelson-414464-unsplash.webp
cover_mobile: ../w300_matt-nelson-414464-unsplash.webp
cover_icon: ../icon_matt-nelson-414464-unsplash.webp
---
Since the beginning of time, developers have fought many silly fights. From the classic _"Tabs vs. Spaces"_ to the timeless _"Mac vs. PC"_ debate, we're good at finding distracting arguments.

<br />
<small>_Answers:_ Linux & Spaces.</small>

## 戦い...?

### Promises vs. Async/Await!

待て、これは戦いなのか？ そうでなければならないのか？ もうコールバックについて話さなくなったみたいだね。

いいえ、戦いではありません。結局のところ、ツールボックスに入れるもう一つの潜在的なツールにすぎません。ただし、`async`/`await` はすべての Promise 機能（具体的には `Promise.all` や `.race`）を置き換えるわけではないので、**それを置き換えだと提示するのは誤解を招きます**。

この誤解を広めている影響力のある人物が多数います。`async`/`await` が Promise の **置き換え** だとする流れです（[Google の解説](https://developers.google.com/web/fundamentals/primers/async-functions) や [Hackernoon の記事](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) など）。  

> **ヒント: いいえ、全くそうではありません。**

VS Code の最近の機能追加がこのバイアスを助長しています。[@umaar](https://x.com/umaar) がツイートしたとおりです:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Visual Studio Code can now convert your long chains of Promise.then()&#39;s into async/await! 🎊 Works very well in both JavaScript and TypeScript files. .catch() is also correctly converted to try/catch ✅ <a href="https://t.co/xb39Lsp84V">pic.x.com/xb39Lsp84V</a></p>&mdash; Umar Hansa (@umaar) <a href="https://x.com/umaar/status/1045655069478334464?ref_src=twsrc%5Etfw">September 28, 2018</a></blockquote>

<!-- Sure, it's an impressive addition to an already amazing list of features. -->

もし Promise が嫌いで、このリファクタリング機能が欲しいのであれば、非難はしません。

<br />

_共感します。理解しています。_

<br />

私も経験があります。🤗

<br />

私はかつて Promise が嫌いでした。今は全く逆に、**Promise は素晴らしい**と感じています。関数合成を**活用**させてくれるからです。

まずは Promise の技術を向上させるために、次の 2 つの領域に注力することを推奨します。

1. [名前付き関数（匿名禁止）](#rule-1)
2. [単一目的関数](#rule-2)

<h2 id="rule-1">#1: 名前付き関数！</h2>

匿名メソッドはやめましょう。**名前付き関数**を使うことで、コードは要件の詩のように読めます。

よくある例を見てみましょう：

HTTP GET リクエストを `fetch` で行う例:

<!-- fetch 仕様では [HTTP ステータスコード](https://http.cat/) が 400 以上や 500 系でも **自動的にエラーにはなりません**。多くの AJAX ライブラリ（jQuery、axios）ではデフォルトでエラーとみなします。 -->

<!-- 解決策を見る前に、一般的な「推奨」実装を見てみましょう: -->

### アンチパターン

```js
// ❌ 匿名インライン関数を使用 💩
fetch(url)
  .then(response => response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus)))
  .then(response => response.text())
```

### 解決策: 名前付きメソッド

```js
// ✅ 明快さが現れる: 名前付き関数
fetch(url)
  .then(checkResponse)
  .then(getText)


// 再利用可能な汎用関数
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
function getText(response) {
  return response.text()
}
```

> このアプローチの利点は、コードが DRY になるにつれてますます明らかになります。

**追加リソース:** この手法を使った[基本的なロギング](https://youtu.be/xR_MZE1SIkk)と[高度なデバッグ](https://youtu.be/P_tghqWj72M)の**1分動画**をご覧ください。

<h2 id="rule-2">#2: 単一目的（関数）</h2>

聞こえは_一見正確に思える_：単一目的。

しかし実際は主観的で恣意的、時には全く意味がないことさえあります。

```js
// 1 point: the return & ternary are effectively a one-liner
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
// 1 point: the return & expression are also effectively a one-liner
function getText(response) {
  return response.text()
}
```

関数のコードを評価するとき、`if`、`return`、三項演算子、`for`、`const`、`let`、`var`、`switch`、`while`、`[].map/filter/reduce/etc` のいずれかが含まれる行が出るたびに 1 点を加算します。余分な空白行は無視し、命令ごとに 1 点を加えます。メソッドチェーンや連続した式は 1 点としてカウントします。

さて、少し専門用語が出ましたね。

興味深いことに、ほとんどの開発者は自分のコードを **単一目的** に保つことが **かなり得意** だと自己評価しています。ちなみに、運転も上手だと報告している人が多いようです。

この点は **Promises に限った問題ではありません**。配列メソッドやその他すべての高階関数（Higher Order Function）ベースの API でも同様の使い勝手の問題が見られます。

例として、（非常に才能ある）[Jake Archibald](https://x.com/jaffathecake) が Google Developers の async/await 記事で取り上げたコードを見てみましょう（注：2024 年版、リンクは削除済み）。

```js
// source: https://developers.google.com/web/fundamentals/primers/async-functions
function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

### 単一目的？

いや、そうは言えません。`logInOrder` は何をしているのでしょうか？

1. `urls` のリストを走査する  
1. インラインの HTTP GET を適用する  
   1. `fetch` で取得  
   1. 応答のテキストボディを返す  
1. 各 `textPromise` に `.then(text => console.log(text))` を付与する  
   1. 結果を順次出力する  

この単一関数内で 5 つの匿名メソッドが定義されています。Jake が指摘しているように、`.reduce` が過度に複雑です。コード全体にわたって微妙な仕組みを手書きするのは意味がありません。たとえば、`document.createElement()`、`element.setAttribute()` といった無限に続く DOM 作成コードを書きません。その代わり、ヘルパー/ユーティリティ関数、ライブラリ、フレームワークなど、複数の選択肢から最適なツールを選びます。

<!-- We need to isolate each 'step' that's going on: there's an HTTP request, a transform for a list of URLs into a list of results. Also a `console.log` is needed. -->

<!-- > 🤔 Why do `Promises` cause developers to abandon practices we use elsewhere? -->

<!-- **注記:** もし意図がリクエストを**順次**開始することであり、単に結果を順番に出力するだけでないなら、このコードは実際にはその動作をしていません。ここでリファクタリングします。 -->

#### 解決策: 単一目的関数

### まず **メソッドを抽出** する...

![VS Code が Promise コードから async メソッドを抽出する様子](../async-refactor-google-extract-methods-resized-75.webp "メソッドの抽出")

### 次に `.reduce()` と `logPromise()` を `Promise.all` と `..map()` に置き換える...

![可読性向上のために Promise.all と map を使ってリファクタリングした Promise チェーン](../async-refactor-google-chain-methods-resized-75.webp "可読性の改善")

### Summary

これらのテクニックを自分のコードに試してみてください！うまくいったら [ツイートで教えてください](https://x.com/justsml)。質問やコメントがあれば、遠慮なく連絡を！

#PromiseTruth を広めてこの記事をシェアしてください。❤️

![credit: matt-nelson-414464-unsplash.webp](../matt-nelson-414464-unsplash.webp)

#### Related Reading

* [Daniel Brain](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
* [Eric Elliott](https://x.com/_ericelliott?lang=en)
````
