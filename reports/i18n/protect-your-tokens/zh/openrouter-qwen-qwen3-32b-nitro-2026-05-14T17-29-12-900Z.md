# Translation Candidate
- Slug: protect-your-tokens
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-27--protect-your-tokens/zh/index.mdx
- Validation: deferred
- Runtime seconds: 6.26
- Input tokens: 3767
- Output tokens: 2412
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000880
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 保护您的令牌、API密钥和机密信息
subTitle: 公有云？私有云？啥？
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

> 保护 API 密钥和令牌是**至关重要的**！

一个错误就可能导致黑客控制你的服务器和数据！

即使根据官方文档，判断某个特定令牌是否必须隐藏也不应该如此困难！

更糟糕的是，你会遇到一连串相关术语：_令牌_、_密钥_、_凭证_、_秘密_、_私有_ 和 _公有_。

让我们重新定义为 `secret` 和 `non-secret`。

* 🔒 [`Secret keys`](#-secret-keys) 必须严格保密。通常它们**绝不能**离开你的私有服务器（或服务——如 heroku、netlify 或 travis-ci）。
* 🌍 [`Non-secret keys`](#-non-secret-keys) 是可以自由共享并在浏览器请求中包含的字符串。

<br />

---------------------------------------------

## 🔒 `Secret keys`

** ‼️ 重要提示：** `Secret keys` **必须**被 Git 忽略，并且**绝不能**出现在所有浏览器代码中。[_如何使用 dotenv_](#-how-to-handle-secrets-safely)

<br />

_如何判断你正在处理的是 `Secret key`？_

<br />

**👍 经验法则：** 返回 `CORS 错误` 的服务器缺乏浏览器支持。这强烈表明你**必须**通过代理访问该服务，并将其视为 `secret`。

**👍 经验法则：** 昂贵的服务应（几乎）始终通过代理或隐藏访问。

**👍 经验法则：** 如果你执行了写操作（**文件上传、插入数据库行**），你可能正在处理 `secret keys`。

<br />

**_使用场景与特性：_** `Secret` keys

- 长期授权（凭证、访问令牌、JSON Web Tokens）
- 短期授权（OAuth 令牌、会话存储）
- 访问付费/昂贵服务（用于身份验证、地理编码、文件存储等）
- 公私密钥对的私钥部分（RECAPTCHA、Stripe、Auth0）
- 服务凭证（电子邮件/SMTP、LDAP/目录服务）
- 数据加密与完整性校验

### 安全处理 Secrets 的检查清单

#### 快速概览

完成以下步骤以 **彻底消除代码中的 secrets：**

- [ ] 用环境变量替换硬编码的密钥。例如：`process.env.API_SECRET`
- [ ] 使用 [`dotenv`](https://github.com/motdotla/dotenv#dotenv) 等库，并配合 `.env` 文件。将之前硬编码的 secrets 添加到 `.env` 文件中。
- [ ] 在 `.gitignore` 文件中添加 `.env` 行！

> **不要**在部署的服务器上创建 `.env` 文件。使用你的托管服务（例如 [Heroku](https://devcenter.heroku.com/articles/config-vars)、Netlify、AWS EC2）提供的环境变量管理工具：例如 **仪表板或命令行。**

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">相关文章： <a href="/securely-using-environment-variables-in-nodejs/">NodeJS 中安全使用 dotenv</a></h2></blockquote>

-----------------------------------

## 🌍 `Non-secret keys`

**👍 经验法则：** 当密钥必须通过代码或内联方式发送到浏览器时（例如通过 `<script src="https://my-api/?apiKey=123-abc-456">` 标签），**它一定是 `non-secret`**。一个常见示例是 Google Maps。

<br />

**_使用场景与特性：_** `Non-secret` keys

- 短期访问（用户会话 ID、JSON Web Tokens）
- 限制按应用/开发者访问 API（用于身份验证、地理编码等）
- 公私密钥对的公钥部分（RECAPTCHA、Stripe、Auth0）
- 分析 ID

#### ✅ 处理 Non-secrets：

> **硬编码非密钥（公钥）是安全的！**

通过共享的`config.js`来更方便地长期管理。

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

**注意：** 环境变量还有其他_使用场景_。我未涵盖的包括：CI/CD/测试、功能标志和特殊环境的运行时配置！
````
