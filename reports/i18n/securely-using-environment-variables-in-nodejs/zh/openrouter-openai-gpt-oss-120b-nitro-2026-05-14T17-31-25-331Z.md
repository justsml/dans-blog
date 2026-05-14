# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/zh/index.mdx
- Validation: deferred
- Runtime seconds: 3.52
- Input tokens: 2766
- Output tokens: 1113
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000308
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 在 NodeJS 中使用环境变量
subTitle: 使用 `dotenv`
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
## 安全处理机密与 API 令牌

### 相关文章: [保护你的令牌](../protect-your-tokens/)

先快速回顾一下 `secret` 与 `non-secret` 的区别。

* 🔒 `机密密钥` 必须通过自建服务器（例如 Node/Express/Heroku）来隐藏（代理）对第三方 API 服务的请求。  
* 🌍 `非机密密钥` 指可以直接发送到浏览器的密钥。

<br />

---------------------------------------------

> 本文聚焦于使用 **环境变量** 处理 🔒 `机密密钥`。

[代码示例见下方。](#️-code-example)

#### 概览

要 **在 NodeJS 代码中安全访问机密**：

1. 用环境变量替换硬编码的密钥，例如 `process.env.API_SECRET`  
2. 使用 [`dotenv`](https://github.com/motdotla/dotenv) 并配合 `.env` 文件。将之前硬编码的机密写入 `.env`。  
3. 确认在 `.gitignore` 中加入 `.env` 行！

> **不要** 在部署的服务器上创建 `.env` 文件。请使用托管服务提供的环境变量管理工具（例如 [Heroku](../devcenter.heroku.com/articles/config-vars)、Netlify、AWS EC2）：通过 **仪表盘或命令行** 设置。

### 代码示例

我们将定义几个文件。

1. `.env`  
2. `./db/connection.js`  
3. `./api/users.js`

<!-- 示例配置对象，使用 `process.env.PG*`

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

`db/config.js` 仅演示机密应如何在代码中统一存取。
-->

首先，安装 [`dotenv`](../www.npmjs.com/package/dotenv) 包。

```bash
npm install dotenv
```

接下来，在项目根目录创建一个 `.env` 文件。

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **绝不** 将 `.env` 文件提交到代码库。

❌ 避免在服务器上创建 `.env`。

查阅你的托管服务商文档，了解如何设置 _环境变量_。

为了确保 `.gitignore` 中已经包含 `.env` 行，可以这样操作。

```bash
# 自动更新 .gitignore
# 在终端运行：
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# 注意：不会有任何输出
```

`./db/connection.js` 提供了一个共享的 `pg.Pool` 实例，供后续查询数据库使用。

```js
// ./db/connection.js
require('dotenv').config(); // ✅ 加载 .env 文件
const pg = require('pg');
const {PGUSER, PGHOST, PGPORT} = process.env;

if (process.env.NODE_ENV === 'development')
  console.log(`Connecting to ${PGUSER} @ ${PGHOST}:${PGHOST}`);
// ^^ 仅用于显示调试连接变量

// pg 会自动使用 PG* 环境变量
module.exports = new pg.Pool();
```

`./api` 目录下存放了对表/视图的接口。

下面是针对 `users` 表的示例 `./api/users.js`。

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

- 绝不要把 `.env` 中的机密提交到 git！
- 不要在团队内部共享 `.env` 文件。 *

\* 每台新开发用的笔记本或台式机都应 **生成新的访问密钥和令牌**。如果无法做到，请在共享 `.env` 时格外小心（例如服务可能会使旧密钥失效，或你使用的是付费 API 的受限访问令牌）。

#### ⚠️ 重要提示：如有必要，务必使用安全的消息服务（最好支持消息过期功能）。

祝顺利，有任何问题随时提问！ 🎉
````
