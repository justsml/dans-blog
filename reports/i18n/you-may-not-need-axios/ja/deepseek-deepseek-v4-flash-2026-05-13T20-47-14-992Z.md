# Translation Candidate
- Slug: you-may-not-need-axios
- Locale: ja
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-11-15--you-may-not-need-axios/ja/index.mdx
- Validation: deferred
- Runtime seconds: 541.57
- Input tokens: 41683
- Output tokens: 27822
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.013626
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Axiosは不要かもしれない
subTitle: Fetch APIで救出！
date: '2018-11-14'
modified: '2024-08-21'
tags:
  - programming
  - patterns
  - examples
  - nodejs
  - javascript
  - promises
  - axios
  - fetch
category: Guides
subCategory: fetch
cover: ../brock-dupont-575648-unsplash.webp
cover_mobile: ../w300_brock-dupont-575648-unsplash.webp
cover_icon: ../icon_brock-dupont-575648-unsplash.webp
---
import Gist from '../../../../components/Gist/index.astro'

## Axiosは不要かもしれません

<p class="breakout call-to-action">これは[Axios](https://www.npmjs.com/package/axios)への攻撃ではありません。<br />
むしろ、非常に高性能になった`fetch` APIを推奨するものです。🦄</p>

### 概要

この記事は、私がもっと簡単に見つけられればよかったと思う、`fetch`の「欠けている」コードスニペットと一般的なユースケースを集めたものです。

- [概要](#overview)
- [機能比較](#feature-comparison)
- [Fetchレシピ](#fetch-recipes)
  - [URLからJSONを取得](#get-json-from-a-url)
  - [カスタムヘッダー](#custom-headers)
  - [HTTPエラーハンドリング](#http-error-handling)
  - [CORSの例](#cors-example)
  - [JSONの送信](#posting-json)
  - [HTMLフォームの送信](#posting-an-html-form)
  - [フォームエンコードデータ](#form-encoded-data)
  - [ファイルのアップロード](#uploading-a-file)
  - [複数ファイルのアップロード](#uploading-multiple-files)
  - [タイムアウト](#timeouts)
  - [ダウンロード進捗ヘルパー](#download-progress-helper)
  - [再帰リトライヘルパー](#recursive-retry-helper)
  - [HTTPリダイレクトの処理](#handling-http-redirects)
  - [fetchリクエストのキャンセル](#canceling-a-fetch-request) ✨新機能✨
- [互換性](#compatibility)

> あなたのユースケースがリストにありませんか？ [お知らせください ✉️](../contact/)

<br />

### 機能比較

|                                                 | fetch    | axios    | request |
|-------------------------------------------------|:--------:|:--------:|:-------:|
| リクエストとレスポンスのインターセプト           |✅        |✅         |✅       |
| リクエスト・レスポンスデータの変換               |✅        |✅         |✅       |
| リクエストのキャンセル                           |✅        |✅         |❌       |
| JSONデータの自動変換                             |手動ヘルパー |✅         |✅       |
| XSRF対策のクライアントサイドサポート             |✅        |✅         |✅       |
| 進捗状況                                        |✅        |✅         |✅       |
| ストリーミング                                  |✅        |✅         |✅       |
| リダイレクト                                    |✅        |✅         |✅       |

<br /><br />

この記事を書き始めたとき（2018年末、2024年更新）、私はチェックボックスが混在した表で締めくくるだろうと想定していました。確かに、[`axios`](https://www.npmjs.com/package/axios)、[`request`](https://www.npmjs.com/package/request)、[`r2`](https://www.npmjs.com/package/r2)、[`superagent`](https://www.npmjs.com/package/superagent)、[`got`](https://www.npmjs.com/package/got) などを正当化する特別な _ユースケース_ があるはずです。

ところが、**サードパーティのHTTPライブラリの必要性を過大評価していた**ことが判明しました。

数年にわたり `fetch` を使用してきたにもかかわらず（ファイルアップロードやエラー/リトライ対応といった非自明なタスクを含む）、`fetch` の能力と限界について誤解を抱えていました。

ネイティブの `fetch` はJSONレスポンスを自動解析したり、JSONリクエストボディを自動シリアライズしたりしません。戻り値で `response.json()` を呼び、送信時に `JSON.stringify()` を呼びます。その点ではAxiosの方がまだ優れています。`fetch` の主張は、小さなヘルパーでそのギャップを埋められることが多いという点です。

では、`fetch` で何ができるか見てみましょう…

## Fetchレシピ

### URLからJSONを取得

<Gist path='justsml/de941bd61cc86e30beedbb8a3a646f81'></Gist>

### カスタムヘッダー

<Gist path='justsml/fca7cd72ec1ebc07d994eac13a665ddf' />

### HTTPエラーハンドリング

<Gist path='justsml/81919a72897ebc503c6b34a556a9bde2' />

### CORSの例

CORSは主にサーバー側でチェックされるため、サーバー側の設定が正しいことを確認してください。`credentials`オプションは、クッキーが自動的に含まれるかどうかを制御します。

<Gist path='justsml/3ddd9ed8705f48cdf45d313d1e57aa2a' />

### JSONの送信

<Gist path='justsml/13915347d6c8413c73f4bd7240c68e51' />

### HTML `<form>`の送信

<Gist path='justsml/ef2e356bec0ef7c6e528d84a5f75ba7e' />

### フォームエンコードデータ

`application/x-www-form-urlencoded`のContent-Typeでデータを送信するには、`URLSearchParams`を使用してクエリ文字列のようにデータをエンコードします。

例えば、`new URLSearchParams({a: 1, b: 2})`は`a=1&b=2`になります。

<Gist path='justsml/716c4534ef4afb22f65d4fc4367c7136' />

### ファイルのアップロード

<Gist path='justsml/301f22aa37df565ba3051bd5f95b4df1' />

### 複数ファイルのアップロード

`multiple`属性を持つファイルアップロード要素を設定します:

<Gist path='justsml/37836357041d8ca4d1b32e12638cb0ba' />

次に、以下のように使用します：

<Gist path='justsml/d17f50c36a5ddb70f584c0aa6de94237' />

### タイムアウト

「部分適用」パターンを使用した汎用的なPromiseタイムアウトです。どのPromiseインターフェースでも動作します。指定されたPromiseチェーン内で過度な処理を行わないでください。実行され続けますし、失敗は長期的なメモリリークを引き起こす可能性があります。

<Gist path='justsml/f93b2ef6457b3e52eb995831b67cab85' />

さらに複雑な例として、追跡フラグ `__timeout` を導入し、**高コストな処理をインターセプト**できるようにしたものです。

<Gist path='justsml/5e492db8997a4f7e22e61b7486cbf273' />

### ダウンロード進捗ヘルパー

アップロードの進捗は、現在Chrome以外ではやや不安定です。

進捗ハンドラは、[以下に示す手法で](#source-progress-helper) `fetch` 呼び出しをクロージャでラップすることを避けています。👍

`progressHelper` は以下のインターフェースを持ちます（ソースは以下にあります）

<Gist path='justsml/db5ccc55ffb93c75e04e014d1f553cfb' />

使用例を見てみましょう：

<Gist path='justsml/9bec219590ff50688972c1caff67c14b' />

再利用可能な画像ダウンローダは、`getBlob()` のように見えるかもしれません：

<Gist path='justsml/bef2dd7e630eb7642beb3e2be29489b2' />

ちなみに、`Blob` は Binary Large Object（バイナリラージオブジェクト）のことです。

以下の2つの使用パターンから1つを選ぶことが重要です（機能的には同等です）：

<Gist path='justsml/6ad9e37a96ad1f3a75ca509038510a5b' />

私の好みは `Option #1` です。ただし、スコープの設計によっては `Option #2` を使用せざるを得ない場合もあります。

最後に、このレシピの最後の部分である `progressHelper` を紹介します。

##### ソース: Progress Helper

<Gist path='justsml/a8ffd810fc7e5a5295dfc898302ddbfc' />

_クレジット:_ Anthum Chris 氏と彼の [素晴らしい Progress+Fetch PoC](https://github.com/AnthumChris/fetch-progress-indicators) に特別な感謝を捧げます。

### 再帰的リトライヘルパー

<Gist path='justsml/7e52521a0af50fa590be57d5b4593120' />

### HTTPリダイレクトの処理

<Gist path='justsml/3dd0a799ada8da7cd15943ff254266de' />

### fetchリクエストのキャンセル

<Gist path='justsml/7f257ac3de3c7792db8485588c54e938' />

### 互換性

2022年現在、`fetch` APIはすべてのモダンブラウザおよびNodeJS v18以降のバージョンで[広くサポートされています](https://caniuse.com/#feat=fetch)。

IEをサポートする必要がある場合は、`github/fetch`パッケージ（GitHubの素晴らしいチームがメンテナンス）を使って[polyfill fetch](https://github.com/github/fetch#browser-support)できます。[IE8](https://github.com/camsong/fetch-ie8)まで遡ることも可能です。ただし、結果は保証できません。

古いNodeJSでは、[`node-fetch`](https://www.npmjs.com/package/node-fetch)パッケージを使用して`fetch` APIを利用できます：

```sh
npm install node-fetch
```

_polyfill + node-fetch後: 99.99%互換_ ✅

> 他のユースケースをご希望の場合は、[私にツイート](https://x.com/justsml)してください。❤️
````
