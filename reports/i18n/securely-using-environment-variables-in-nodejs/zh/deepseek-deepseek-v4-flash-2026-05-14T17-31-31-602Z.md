# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/zh/index.mdx
- Validation: deferred
- Runtime seconds: 8.30
- Input tokens: 2650
- Output tokens: 1257
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000670
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: NodeJS环境变量的使用
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
## 安全处理密钥与 API 令牌

### 相关文章：[保护你的令牌](/protect-your-tokens/)

我们先快速回顾一下 `密钥` 和 `非密钥` 的区别。

* 🔒 `密钥` 必须使用自定义服务器（例如 Node/Express/Heroku）来隐藏（代理）对第三方 API 服务的请求。
* 🌍 `非密钥` 是指可以发送到浏览器的密钥。

<br />

---------------------------------------------

> 本文将重点介绍如何使用 **环境变量** 处理 🔒 `密钥`。

[代码示例见下方。](#️-代码示例)

#### 概述

**在 NodeJS 代码中安全访问密钥的方法：**

1. 将硬编码的密钥替换为环境变量。例如 `process.env.API_SECRET`
1. 使用类似 [`dotenv`](https://github.com/motdotla/dotenv) 的库配合 `.env` 文件。将之前硬编码的密钥添加到 `.env` 文件中。
1. 确认 `.gitignore` 文件中包含 `.env` 这一行！

> **不要** 在部署的服务器上创建 `.env` 文件。请使用托管服务（例如 [Heroku](https://devcenter.heroku.com/articles/config-vars)、Netlify、AWS EC2）提供的环境变量管理工具：例如 **控制台或命令行。**

### 代码示例

我们将定义几个文件。

1. `.env`
1. `./db/connection.js`
1. `./api/users.js`

<!-- 使用 `process.env.PG*` 的示例配置对象

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

`db/config.js` 文件仅作为示例，展示如何在代码中复用密钥。
-->

首先，安装 [`dotenv`](https://www.npmjs.com/package/dotenv) 包。

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

❌ **永远不要** 提交 `.env` 文件。

❌ 避免在服务器上创建 `.env`。

查阅你的托管服务商文档，了解如何设置 _环境变量_。

确保你的 `.gitignore` 中包含 `.env` 这一行。

```bash
# 自动更新 .gitignore
# 在终端中运行：
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# 注意：不会打印输出
```

`./db/connection.js` 提供了一个共享的 `pg.Pool` 实例，用于查询数据库。

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

`./api` 文件夹包含你的表/视图的接口。

以下是 `users` 表的示例 `./api/users.js`。

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

- 永远不要将 `.env` 中的密钥提交到 git！
- 不要在团队中共享 `.env` 文件。*

\* 每台新的开发笔记本电脑或台式机都应 **生成新的访问密钥和令牌。**
如果无法做到，请谨慎共享你的 `.env`（例如，当某个服务可能使所有旧密钥失效，或者你拥有付费 API 的有限访问令牌时）。

#### ⚠️ 重要提示：如有必要，请始终使用安全的即时通讯服务（最好支持消息过期功能）。

祝你好运，如有任何问题请随时联系！🎉
````
