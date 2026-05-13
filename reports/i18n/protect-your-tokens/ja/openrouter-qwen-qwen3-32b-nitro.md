# Translation Candidate
- Slug: protect-your-tokens
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx
- Validation: passed
- Runtime seconds: 11.96
- Input tokens: 6848
- Output tokens: 4514
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001631
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: ''
date: '2018-10-27'
modified: '2024-07-30'
tags:
  - tokens
  - api-keys
  - secrets
  - security
  - nodejs
  - json-web-tokens
category: Guides
subCategory: security
cover: ../dayne-topkin-78982-unsplash.webp
cover_mobile: ../w300_dayne-topkin-78982-unsplash.webp
cover_icon: ../icon_dayne-topkin-78982-unsplash.webp
---
## トークンを保護するタイミング

<!--  For the purpose of this article we'll treat the following terms as related: . **They are not interchangable** despite most documentation and [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) answers using them as such. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.)  -->

> APIキーとトークンの保護は**極めて重要**です！

1つのミスで、サーバーやデータの制御をハッカーに奪われてしまう可能性があります！

公式ドキュメントを見ても、特定のトークンを隠す必要があるかどうかを判断するのがなぜこれほど難しくなければいけないのかわかりません！

関連する用語（_トークン_、_キー_、_資格情報_、_シークレット_、_プライベート_、_パブリック_）の混乱がさらに状況を悪化させます。

この問題を「シークレット」と「ノンシークレット」の2分法で再定義しましょう。

* 🔒 [`シークレットキー`](#-secret-keys) は**絶対に隠す必要があります**。通常、これらはプライベートサーバー（またはHeroku、Netlify、Travis CIなどのサービス）の外に出るべきではありません。
* 🌍 [`ノンシークレットキー`](#-non-secret-keys) は、自由に共有可能でブラウザリクエストに含めても問題ない文字列を指します。

<br />

---------------------------------------------

## 🔒 `シークレットキー`

**‼️ 重要:** `シークレットキー` は **Gitで無視する必要があります** _かつ_ ブラウザコードから**絶対に除外する必要があります**。[dotenvの使用方法](#-how-to-handle-secrets-safely)

<br />

`Secret key`を扱っているかを判断するには？

<br />

**👍 覚え方:** CORSエラーを返すサーバーはブラウザサポートがない。これはサービスを**必ず**プロキシとして扱い、シークレットとして扱うことを強く示唆します。

**👍 覚え方:** 高額なサービスは（ほぼ）常にプロキシ化または隠蔽する必要があります。

**👍 覚え方:** 書き込み操作（**ファイルアップロード、DB行挿入**）を行う場合、`シークレットキー`を扱っている可能性があります。

<br />

**_使用ケースと機能:_** `シークレットキー`

- 長期認可（資格情報、アクセストークン、JSON Web トークン）
- 短期認可（OAuth トークン、セッションストア）
- 有料/高コストサービスへのアクセス（認証、ジオコーディング、ファイルストレージなど）
- 公開/秘密鍵ペアの秘密部分（RECAPTCHA、Stripe、Auth0）
- サービス資格情報（メール/SMTP、LDAP/ディレクトリサービス）
- データ暗号化と整合性チェック

### チェックリスト: シークレットの安全な取り扱い

#### クイック概要

コードから**シークレットを完全に排除**するには、以下の手順を完了してください:

- [ ] 固定されたキーを環境変数に置き換える。例: `process.env.API_SECRET`
- [ ] [`dotenv`](https://github.com/motdotla/dotenv#dotenv)のようなライブラリと`.env`ファイルを併用する。以前はハードコードしていたシークレットを`.env`ファイルに追加する。
- [ ] `.gitignore`ファイルに`.env`行を追加する！

> **やってはいけないこと**: 配置済みサーバーで`.env`ファイルを作成しないこと。ホスティングサービス（例: [Heroku](https://devcenter.heroku.com/articles/config-vars)、Netlify、AWS EC2）が提供する環境変数管理ツール（例: **ダッシュボードまたはコマンドライン**）を使用すること。

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">関連記事: <a href="/securely-using-environment-variables-in-nodejs/">NodeJSでdotenvを安全に使用する方法</a></h2></blockquote>

-----------------------------------

## 🌍 `非シークレットキー`

**👍 考え方ルール:** キーがブラウザにコードまたはインラインで送信される必要がある場合（例: `<script src="https://my-api/?apiKey=123-abc-456">` タグ経由）、**それは間違いなく `非シークレット` です**。一般的な例は Google Maps です。

<br />

**_使用ケースと特徴:_** `非シークレット` キー

- 短期間のアクセス（ユーザーセッションID、JSON Web Token）
- アプリ/開発者ごとのAPIアクセス制限（認証、ジオコーディングなど）
- 公開鍵/秘密鍵ペアの公開部分（RECAPTCHA、Stripe、Auth0）
- 分析用ID

#### ✅ 非シークレットの取り扱い:

> **非シークレット（公開用）キーはハードコードしても安全です！**

長期的に管理しやすくするために、アプリケーショントップで共有する`config.js`ファイルを活用しましょう。

**例:**

```js
// config.js
module.exports = {
  googleMapsKey: '123-abc'
};
```

```js
// load-map.js
const config = require('./config.js');
const key = config.googleMapsKey;
const src = `//maps.googleapis.com/maps/api/js?key=${key}`;
// ...
```

-----------------------------------

**注意:** 環境変数の_使用ケース_は他にもあります。今回は取り上げていないケースがいくつかあります: CI/CD/テスト、機能フラグ、特殊環境用のランタイム設定！
````
