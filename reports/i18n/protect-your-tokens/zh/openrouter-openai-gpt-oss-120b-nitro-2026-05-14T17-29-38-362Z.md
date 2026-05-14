# Translation Candidate
- Slug: protect-your-tokens
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/zh/index.mdx
- Validation: deferred
- Runtime seconds: 3.48
- Input tokens: 4024
- Output tokens: 1303
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000391
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 保护令牌、API 密钥和机密
subTitle: 公开？私有？啥？
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
## 何时需要保护你的令牌？

<!--  为了本文的目的，我们将以下术语视为相关： . **它们并不等价**，尽管大多数文档和 [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) 的答案把它们混用。 -->

<!-- (Google Maps 凭证、AWS S3 密钥、地理编码服务等)  -->

> 保护 API 密钥和令牌 **至关重要**！

一次失误就可能导致服务器和数据被黑客夺取！

即使依据官方文档，也不应该难以判断某个特定令牌是否必须隐藏！

更糟的是，你会遇到一堆相关术语的混杂：_tokens_、_keys_、_credentials_、_secrets_、_private_ 和 _public_。

我们把它们重新框定为 `secret` 与 `non-secret` 两类。

* 🔒 [`Secret keys`](#-secret-keys) 必须保持隐藏。通常它们绝不能离开你的私有服务器（或类似 Heroku、Netlify、Travis‑CI 的服务）。
* 🌍 [`Non-secret keys`](#-non-secret-keys) 指可以自由共享并直接放入浏览器请求的字符串。

<br />

---------------------------------------------

## 🔒 `Secret keys`

** ‼️ 重要提示：** `Secret keys` **必须** 被 Git 忽略 _并且_ 在所有浏览器代码中省略。[_如何安全使用 dotenv_](#-how-to-handle-secrets-safely)

<br />

_如何判断自己正在处理的是 `Secret key`？_

<br />

**👍 经验法则：** 返回 `CORS errors` 的服务器缺乏浏览器支持。这强烈表明你 **必须** 通过代理访问该服务，视其为 `secret`。

**👍 经验法则：** 高成本服务几乎总是需要通过代理或隐藏。

**👍 经验法则：** 如果你执行写操作（**文件上传、插入数据库行**），很可能在处理 `secret keys`。

<br />

**_使用场景与特性：_** `Secret` 密钥

- 长期授权（凭证、访问令牌、JSON Web Tokens）
- 短期授权（OAuth 令牌、会话存储）
- 访问付费/高成本服务（用于身份验证、地理编码、文件存储等）
- 公私钥对的私密部分（RECAPTCHA、Stripe、Auth0）
- 服务凭证（Email/SMTP、LDAP/目录服务）
- 数据加密与完整性校验

### 检查清单：安全处理 Secrets

#### 快速概览

完成以下步骤以 **从代码中消除 secrets**：

- [ ] 用环境变量替换硬编码的密钥。例如 `process.env.API_SECRET`
- [ ] 使用类似 [`dotenv`](https://github.com/motdotla/dotenv#dotenv) 的库并配合 `.env` 文件。将之前硬编码的 secrets 添加到 `.env` 文件中。
- [ ] 在 `.gitignore` 中加入 `.env` 行！

> **不要** 在部署的服务器上创建 `.env` 文件。使用托管服务提供的环境变量管理工具（例如 [Heroku](https://devcenter.heroku.com/articles/config-vars)、Netlify、AWS EC2）：如 **仪表盘或命令行**。

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">相关文章： <a href="../securely-using-environment-variables-in-nodejs/">在 NodeJS 中安全使用 dotenv</a></h2></blockquote>

-----------------------------------

## 🌍 `Non-secret keys`

**👍 经验法则：** 只要密钥必须以代码或内联方式发送到浏览器（例如通过 `<script src="https://my-api/?apiKey=123-abc-456">` 标签），**它一定是 `non-secret`**。常见例子是 Google Maps。

<br />

**_使用场景与特性：_** `Non-secret` 密钥

- 短期访问（用户会话 ID、JSON Web Tokens）
- 通过应用/开发者限制 API 访问（用于身份验证、地理编码等）
- 公私钥对的公共部分（RECAPTCHA、Stripe、Auth0）
- 分析 ID

#### ✅ 处理 Non-secrets：

> **可以安全地硬编码非秘密（公共）密钥！**

让长期维护更轻松，可以为你的应用使用共享的 `config.js`。

**示例：**

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

**注意：** 环境变量还有其他 _使用场景_。我未覆盖的包括：CI/CD/测试、功能标记，以及特殊环境的运行时配置！
````
