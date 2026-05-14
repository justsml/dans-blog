# Translation Candidate
- Slug: protect-your-tokens
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-10-27--protect-your-tokens/zh/index.mdx
- Validation: deferred
- Runtime seconds: 14.26
- Input tokens: 3783
- Output tokens: 1944
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001021
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 保护您的令牌、API密钥和机密
subTitle: 公有？私有？啥？
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
## 何时保护你的令牌？

<!--  For the purpose of this article we'll treat the following terms as related: . **They are not interchangable** despite most documentation and [StackOverflow](https://stackoverflow.com/questions/51698672/how-to-secure-my-api-key) answers using them as such. -->

<!-- (Google Maps Credentials, AWS S3 Keys, Geocoding Service, etc.)  -->

> 保护 API 密钥和令牌**至关重要**！

一个失误就可能导致服务器和数据落入黑客之手！

即便参考官方文档，判断某个令牌是否需要隐藏也不该如此困难。

更糟的是，你还会遇到一堆相关术语：_令牌_、_密钥_、_凭证_、_机密_、_私有_ 和 _公开_。

我们将其重新定义为 `secret`（秘密）和 `non-secret`（非秘密）两类。

* 🔒 [`Secret keys`（秘密密钥）](#-secret-keys) 必须保持隐藏。通常它们绝不应离开你的私有服务器（或服务，如 Heroku、Netlify 或 Travis CI）。
* 🌍 [`Non-secret keys`（非秘密密钥）](#-non-secret-keys) 指的是可以自由共享并包含在浏览器请求中的字符串。

<br />

---------------------------------------------

## 🔒 `Secret keys`（秘密密钥）

** ‼️ 重要：** `Secret keys`（秘密密钥）**必须**被 Git 忽略，并且不得出现在任何浏览器代码中。[_如何使用 dotenv_](#-how-to-handle-secrets-safely)

<br />

_如何判断你正在处理的是 `Secret key`（秘密密钥）？_

<br />

**👍 经验法则：** 返回 `CORS 错误` 的服务器缺乏浏览器支持。这强烈表明你**必须**代理该服务，将其视为 `secret`（秘密）。

**👍 经验法则：** 高成本的服务（几乎）总是应该被代理或隐藏。

**👍 经验法则：** 如果你执行写操作（**文件上传、插入数据库行**），你很可能在处理 `secret keys`（秘密密钥）。

<br />

**_使用场景与特性：_** `Secret` 密钥

- 长期授权（凭证、访问令牌、JSON Web 令牌）
- 短期授权（OAuth 令牌、会话存储）
- 访问付费/昂贵服务（用于认证、地理编码、文件存储等）
- 公钥/私钥对中的私钥部分（RECAPTCHA、Stripe、Auth0）
- 服务凭证（Email/SMTP、LDAP/目录服务）
- 数据加密与完整性校验

### 检查清单：安全处理秘密

#### 快速概览

完成以下步骤，**从代码中消除秘密：**

- [ ] 将硬编码的密钥替换为环境变量，例如 `process.env.API_SECRET`
- [ ] 使用类似 [`dotenv`](https://github.com/motdotla/dotenv#dotenv) 的库配合 `.env` 文件。将之前硬编码的秘密添加到 `.env` 文件中。
- [ ] 在 `.gitignore` 文件中添加一行 `.env`！

> **不要**在部署的服务器上创建 `.env` 文件。请使用托管服务（例如 [Heroku](https://devcenter.heroku.com/articles/config-vars)、Netlify、AWS EC2）提供的环境变量管理工具：例如**仪表盘或命令行。**

<blockquote><h2 style="margin: 0.125em 0; text-align: center;">相关文章：<a href="../securely-using-environment-variables-in-nodejs/">在 NodeJS 中安全使用 dotenv</a></h2></blockquote>

-----------------------------------

## 🌍 `Non-secret keys`（非秘密密钥）

**👍 经验法则：** 只要密钥必须通过代码或内联方式发送到浏览器（例如通过 `<script src="https://my-api/?apiKey=123-abc-456">` 标签），**那它肯定是 `non-secret`（非秘密）**。一个常见的例子是 Google Maps。

<br />

**_使用场景与特性：_** `Non-secret` 密钥

- 短期访问（用户会话 ID、JSON Web 令牌）
- 按应用/开发者限制 API 访问（用于认证、地理编码等）
- 公钥/私钥对中的公钥部分（RECAPTCHA、Stripe、Auth0）
- 分析 ID

#### ✅ 处理非秘密密钥：

> **硬编码非秘密（公开）密钥是安全的！**

使用共享的 `config.js` 文件来长期管理会更方便。

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

**注意：** 环境变量还有其他**使用场景**。我没有涵盖的部分包括：CI/CD/测试、功能开关以及特殊环境下的运行时配置！
````
