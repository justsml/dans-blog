# Translation Candidate
- Slug: securely-using-environment-variables-in-nodejs
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/zh/index.mdx
- Validation: deferred
- Runtime seconds: 8.28
- Input tokens: 2767
- Output tokens: 1050
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004534
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
## 安全地处理密钥与 API 令牌

### 相关文章：[保护你的令牌](../protect-your-tokens/)

让我们快速回顾一下“密钥”与“非密钥”的区别。

* 🔒 `密钥 (Secret keys)` 必须通过自定义服务器（如 Node/Express/Heroku）来处理，以便向第三方 API 服务隐藏（代理）请求。
* 🌍 `非密钥 (Non-secret keys)` 指的是可以直接发送到浏览器的密钥。

<br />

---------------------------------------------

> 本文将重点讨论如何使用**环境变量**来处理 🔒 `密钥`。

[下方包含代码示例。](#️-code-example)

#### 概览

要在 **NodeJS 代码中安全地访问密钥：**

1. 将硬编码的密钥替换为环境变量。例如：`process.env.API_SECRET`
1. 使用 [`dotenv`](https://github.com/motdotla/dotenv) 等库配合 `.env` 文件。将之前硬编码的密钥添加到 `.env` 文件中。
1. 务必检查 `.gitignore` 文件中是否包含 `.env` 行！

> **不要**在已部署的服务器上创建 `.env` 文件。请使用托管服务（如 [Heroku](https://devcenter.heroku.com/articles/config-vars)、Netlify、AWS EC2）提供的环境变量管理工具：例如**控制台面板或命令行。**

### 代码示例

我们将定义几个文件。

1. `.env`
1. `./db/connection.js`
1. `./api/users.js`

<!-- 使用 `process.env.PG*` 的配置对象示例

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

`db/config.js` 文件只是一个示例，展示了如何在代码中存储密钥以便复用。
-->

首先，安装 [`dotenv`](https://www.npmjs.com/package/dotenv) 包。

```bash
npm install dotenv
```

接下来，在项目根目录下创建一个 `.env` 文件。

```
# .env
PGDATABASE="postgres"
PGHOST="localhost"
PGPORT=5234
PGUSER="postgres"
PGPASSWORD="password"
```

❌ **严禁**提交 `.env` 文件。

❌ 避免在服务器上手动创建 `.env` 文件。

请查阅你的托管服务商文档来设置“环境变量（environment variables）”。

为了确保你的 `.gitignore` 中包含 `.env` 行，可以运行以下命令：

```bash
# 自动更新 .gitignore
# 在终端运行：
[ "$(grep '^.env' .gitignore)" == "" ] && echo '.env' >> .gitignore
# 注意：该命令不会产生输出
```

`./db/connection.js` 提供了一个共享的 `pg.Pool` 实例，用于执行数据库查询。

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

`./api` 文件夹包含与表/视图交互的接口。

以下是针对 `users` 表的 `./api/users.js` 示例。

```js
// ./api/users.js
const db = require('../db/connection.js');

module.exports = {
  findUsername: function(username) {
    return db.query('SELECT * FROM users WHERE username=$1', username);
  }
};
```

- 永远不要把 `.env` 中的密钥提交到 git！
- 不要在团队中共享 `.env` 文件。*

\* 每一台新的开发笔记本或台式机都应该**生成新的访问密钥和 Token。**
如果无法做到这一点，在共享 `.env` 时务必极度小心（例如某些服务可能会使旧密钥失效，或者你使用的是有额度限制的付费 API Token）。

#### ⚠️ 重要提示：如果必须传输密钥，请务必使用加密即时通讯服务（最好支持阅后即焚）。

祝你好运，有任何问题随时沟通！ 🎉
````
