# Translation Candidate
- Slug: protect-your-tokens
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx
- Validation: passed
- Runtime seconds: 4.74
- Input tokens: 7109
- Output tokens: 1715
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.000586
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: トークン・APIキー・シークレットの保護
subTitle: 公開？非公開？何？
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
## トークンを保護すべきタイミングは？

> API キーとトークンの保護は **極めて重要** です！

1 つのミスでサーバーとデータの制御がハッカーに奪われる可能性があります！

公式ドキュメントを参照すれば、特定のトークンを隠すべきかどうかを判断するのはそれほど難しくありません。

しばしば、目にするさまざまな用語――`tokens`、`keys`、`credentials`、`secrets`、`private`、`public`――が混乱を招きます。

これらを **`secret`** と **`non‑secret`** の二分に置き換えて考えましょう。

* 🔒 [`Secret keys`](#-secret-keys) は必ず隠す必要があります。基本的に、プライベートサーバー（または Heroku、Netlify、Travis‑CI などのサービス）から決して外部に出してはいけません。
* 🌍 [`Non-secret keys`](#-non-secret-keys) は、自由に共有でき、ブラウザからのリクエストに組み込んでも問題ない文字列を指します。

<br />

---------------------------------------------

## 🔒 `Secret keys`

** ‼️ Important:** `Secret keys` **MUST** be ignored by Git _AND_ omitted in all browser code. [_How to use dotenv_](../#-how-to-handle-secrets-safely)

<br />

_Secret key を扱っているかどうかは、どうやって判断しますか？_

<br />

**👍 Rule-of-thumb:** `CORS errors` を返すサーバーはブラウザから直接呼び出せません。これは **MUST** プロキシを経由させ、`secret` と同様に扱うべきであることを強く示しています。

**👍 Rule-of-thumb:** コストがかかるサービスは (ほぼ) 常にプロキシ経由または隠蔽すべきです。

**👍 Rule-of-thumb:** 書き込み操作（**ファイルアップロード、DB 行の挿入**）を行う場合、`secret keys` を扱っている可能性があります。

<br />

**_使用例と機能:_** `Secret` キー

- 長期的な認可（認証情報、アクセストークン、JSON Web Token）
- 短期的な認可（OAuth トークン、セッションストア）
- 有料／高コストサービスへのアクセス（認証、ジオコーディング、ファイルストレージなど）
- 公開/非公開ペアのプライベート側（RECAPTCHA、Stripe、Auth0）
- サービス認証情報（Email/SMTP、LDAP/ディレクトリサービス）
- データ暗号化および整合性チェック

### Checklist: Handling Secrets Safely

#### Quick Overview

以下の手順で **コードからシークレットを排除** してください。

- [ ] ハードコードされたキーを環境変数に置き換える。例: `process.env.API_SECRET`
- [ ] [`dotenv`](https://github.com/motdotla/dotenv#dotenv) のようなライブラリと `.env` ファイルを併用し、以前ハードコードしていたシークレットを `.env` に移す。
- [ ] `.gitignore` に `.env` 行を追加する！

> **DON'T** デプロイ先サーバーで `.env` ファイルを作成しないこと。ホスティングサービス（例: [Heroku](https://devcenter.heroku.com/articles/config-vars)、Netlify、AWS EC2）が提供する環境変数管理ツール（ダッシュボードまたは CLI）を利用する。

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">Related Article: <a href="../securely-using-environment-variables-in-nodejs/">Using dotenv securely in NodeJS</a></h2></blockquote>

-----------------------------------

## 🌍 `Non-secret keys`

**👍 目安:** キーをブラウザ側のコードやインラインで送る必要がある場合（例: `<script src="https://my-api/?apiKey=123-abc-456">` タグで埋め込む）**、それは確実に `non-secret` です。典型的な例として Google Maps が挙げられます。

<br />

**_利用ケースと特徴:_** `Non-secret` キー

- 短期的なアクセス（ユーザーセッション ID、JSON Web Token）
- アプリ／開発者単位で API アクセスを制限（認証、ジオコーディングなど）
- 公開/非公開ペアの公開側（RECAPTCHA、Stripe、Auth0 など）
- アナリティクス ID

#### ✅ 非シークレットの取り扱い:

> **非シークレット（公開）キーはハードコードしても安全です！**

長期的に管理しやすくするには、アプリ全体で共有する `config.js` を用意します。

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

**注:** 環境変数には他にも _ユースケース_ があります。ここで触れなかった例としては、CI/CD/テスト、機能フラグ、特定環境向けのランタイム設定などがあります。
````
