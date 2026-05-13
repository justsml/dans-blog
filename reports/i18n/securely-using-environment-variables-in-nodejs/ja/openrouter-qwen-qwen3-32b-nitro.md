# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/ja/index.mdx
- Validation: deferred
- Runtime seconds: 9.03
- Input tokens: 4785
- Output tokens: 3421
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001204
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: NodeJSで環境変数を使う
subTitle: '`dotenv`の使用'
date: '2018-11-13'
modified: '2020-07-30'
tags:
  - dotenv
  - api-keys
  - secrets
  - tokens
  - security
  - nodejs
category: Code
subCategory: howto
cover: ../john-salvino-417565-unsplash.webp
cover_mobile: ../w300_john-salvino-417565-unsplash.webp
cover_icon: ../icon_john-salvino-417565-unsplash.webp
---
## シークレットとAPIトークンの安全な取り扱い

### 関連記事: [トークンの保護](../protect-your-tokens/)

「シークレット」と「ノンシークレット」の違いをすばやく振り返ります。

* 🔒 `シークレットキー`は、3rdパーティAPIサービスへのリクエストを隠す（プロキシ）ために、カスタムサーバー（例: Node/Express/Heroku）の使用が必須です。
* 🌍 `ノンシークレットキー`は、ブラウザに送信しても構わないキーを指します。

<br />

---------------------------------------------

> 🔒 `シークレットキー`を**環境変数**で安全に扱う方法に焦点を当てます。

[コード例は以下に含まれます。](#️-code-example)

#### 概要

NodeJSコードで**シークレットに安全にアクセスするには**:

1. ハードコードされたキーを環境変数に置き換える。例: `process.env.API_SECRET`
1. [`dotenv`](https://github.com/motdotla/dotenv)のようなライブラリと`.env`ファイルを使用する。以前ハードコードされていたシークレットを`.env`ファイルに追加する。
1. `.gitignore`ファイルに`.env`行が含まれていることを確認！

> **絶対に**デプロイされたサーバーで`.env`ファイルを作成しないでください。ホスティングサービス（例: [Heroku](https://devcenter.heroku.com/articles/config-vars)、Netlify、AWS EC2）が提供する環境変数管理ツール（例: **ダッシュボードまたはコマンドライン**）を使用してください。

### コード例

いくつかのファイルを定義していきます。

1. `.env`
1. `./db/connection.js`
1. `./api/users.js`

<!-- `process.env.PG*` を使用する例としての設定オブジェクト

```js
// ./db/config.js
module.exports = {
  postgres: {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5234,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'password',
    database: process.env.PGDATABASE || 'postgres',
  }
};
```

`db/config.js` ファイルは、コード内でシークレットを再利用するための保存方法の例です。
-->

まず、[`dotenv`](https://www.npmjs.com/package/dotenv) パッケージをインストールします。

```bash
npm install dotenv
```

次に、プロジェクトのルートに `.env` ファイルを作成します。

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **決して** `.env` ファイルをコミットしないでください。

❌ サーバー上で `.env` ファイルを作成しないでください。

ホスティングプロバイダーのドキュメントを確認し、_環境変数_を設定してください。

`.gitignore` に `.env` 行が含まれていることを簡単に確認するには:

```bash
# .gitignore を自動更新
# ターミナルで実行:
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# 注: 何も出力されません
```

`./db/connection.js` は共有された `pg.Pool` インスタンスを提供します。データベースクエリに使用されます。

```js
// ./db/connection.js
require('dotenv').config(); // ✅ .env ファイルをロード
const pg = require('pg');
const {PGUSER, PGHOST, PGPORT} = process.env;

if (process.env.NODE_ENV === 'development')
  console.log(`Connecting to ${PGUSER} @ ${PGHOST}:${PGHOST}`);
// ^^ デバッグ用接続変数の表示のみ

// pg は自動的に PG* 環境変数を使用
module.exports = new pg.Pool();
```

`./api` フォルダにはテーブル/ビューのインターフェースが含まれます。

`users` テーブル用の例として `./api/users.js` があります。

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

-  `.env` のシークレットを git にコミットしないでください！
-  チーム内で `.env` ファイルを共有しないでください。*

\* 新しい開発用ノートPCやデスクトップでは必ず**新しいアクセストークンとキーを生成**してください。
不可能な場合は、サービスが古いキーを無効化する可能性や有料APIの制限付きトークンがある場合を除き、`.env` の共有には十分注意してください。

#### ⚠️ 必要な場合は常に**セキュアメッセージングサービス**（好ましくはメッセージの有効期限付きサービス）を使用してください。

成功をお祈りします。質問があればいつでもお知らせください！🎉
````
