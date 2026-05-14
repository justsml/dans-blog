# Translation Candidate
- Slug: you-may-not-need-axios
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2018-11-15--you-may-not-need-axios/zh/index.mdx
- Validation: deferred
- Runtime seconds: 33.78
- Input tokens: 7105
- Output tokens: 2400
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.010752
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 你可能不需要 Axios
subTitle: Fetch API 救场了！
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



import Gist from '../ ../../components/Gist/index.astro'

## 你可能不需要 Axios

<p class="breakout call-to-action">这**不是在攻击** [Axios](https://www.npmjs.com/package/axios)。<br />

相反，这是在**为已经变得非常强大的 `fetch` API 站台。** 🦄</p>

### 概览

本文是我整理的一系列“缺失”的 `fetch` 代码片段和常见用例，我希望这些内容能更容易被开发者搜到。

- [概览](#overview)
- [特性对比](#feature-comparison)
- [Fetch 秘籍](#fetch-recipes)
  - [从 URL 获取 JSON](#get-json-from-a-url)
  - [自定义 Header](#custom-headers)
  - [HTTP 错误处理](#http-error-handling)
  - [CORS 示例](#cors-example)
  - [发送 JSON Post 请求](#posting-json)
  - [提交 HTML `<form>`](#posting-an-html-form)
  - [Form 编码数据](#form-encoded-data)
  - [上传文件](#uploading-a-file)
  - [上传多个文件](#uploading-multiple-files)
  - [超时设置](#timeouts)
  - [下载进度辅助函数](#download-progress-helper)
  - [递归重试辅助函数](#recursive-retry-helper)
  - [处理 HTTP 重定向](#handling-http-redirects)
  - [取消 fetch 请求](#canceling-a-fetch-request) ✨新增✨
- [兼容性](#compatibility)

> 你的用例没在列表里？[告诉我 ✉️](../contact/)

<br />

### 特性对比

|                                                 | fetch    | axios    | request |
|-------------------------------------------------|:--------:|:--------:|:-------:|
| 拦截请求和响应                                  |✅        |✅         |✅       |
| 转换请求和响应数据                              |✅        |✅         |✅       |
| 取消请求                                        |✅        |✅         |❌       |
| JSON 数据自动转换                               |手动辅助函数 |✅         |✅       |
| 客户端防御 XSRF                                 |✅        |✅         |✅       |
| 进度监控                                        |✅        |✅         |✅       |
| 流处理 (Streaming)                              |✅        |✅         |✅       |
| 重定向处理                                      |✅        |✅         |✅       |

<br /><br />

在开始写这篇文章时（2018 年底开始，2024 年更新），我原以为最后会得到一张布满差异的对比表。肯定会有某些特殊的*用例*能证明 [`axios`](https://www.npmjs.com/package/axios)、[`request`](https://www.npmjs.com/package/request)、[`r2`](https://www.npmjs.com/package/r2)、[`superagent`](https://www.npmjs.com/package/superagent)、[`got`](https://www.npmjs.com/package/got) 等库存在的必要性。

结果证明，**我高估了对第三方 HTTP 库的需求。**

尽管我已经使用了好几年 `fetch`（包括处理文件上传和错误重试等非琐碎任务），但我对 `fetch` 的能力和限制仍然存在误解。

原生 `fetch` 不会自动解析 JSON 响应，也不会自动将请求体序列化为 JSON 字符串。你需要在接收时调用 `response.json()`，在发送时调用 `JSON.stringify()`。在易用性上，Axios 确实略胜一筹；但支持 `fetch` 的论据是：一个微小的辅助函数通常就能填补这个差距。

那么，让我们来看看 `fetch` 到底能做什么……

## Fetch 秘籍

### 从 URL 获取 JSON

<Gist path='justsml/de941bd61cc86e30beedbb8a3a646f81'></Gist>

### 自定义 Header

<Gist path='justsml/fca7cd72ec1ebc07d994eac13a665ddf' />

### HTTP 错误处理

<Gist path='justsml/81919a72897ebc503c6b34a556a9bde2' />

### CORS 示例

CORS 主要在服务端进行校验 —— 因此请确保你的服务端配置正确。

`credentials` 选项控制是否自动包含 Cookie。

<Gist path='justsml/3ddd9ed8705f48cdf45d313d1e57aa2a' />

### Post JSON 数据

<Gist path='justsml/13915347d6c8413c73f4bd7240c68e51' />

### Post HTML `<form>` 表单

<Gist path='justsml/ef2e356bec0ef7c6e528d84a5f75ba7e' />

### 表单编码数据

要以 `application/x-www-form-urlencoded` 的 Content-Type 发送数据，我们需要使用 `URLSearchParams` 将数据编码为查询字符串格式。

例如，`new URLSearchParams({a: 1, b: 2})` 会生成 `a=1&b=2`。

<Gist path='justsml/716c4534ef4afb22f65d4fc4367c7136' />

### 上传文件

<Gist path='justsml/301f22aa37df565ba3051bd5f95b4df1' />

### 上传多个文件

首先设置一个带有 `multiple` 属性的文件上传元素：

<Gist path='justsml/37836357041d8ca4d1b32e12638cb0ba' />

然后配合如下代码使用：

<Gist path='justsml/d17f50c36a5ddb70f584c0aa6de94237' />

### 超时处理 (Timeouts)

这是一个通用的 Promise 超时实现，采用了“偏函数应用 (Partial Application)”模式。它适用于任何 Promise 接口。注意不要在提供的 Promise 链中执行过多操作，因为即使超时，它仍会继续运行——任何处理不当的失败都可能导致长期的内存泄漏。

<Gist path='justsml/f93b2ef6457b3e52eb995831b67cab85' />

下面是一个更复杂的例子，包含一个 `__timeout` 追踪标记，以便你可以**拦截任何高开销的操作。**

<Gist path='justsml/5e492db8997a4f7e22e61b7486cbf273' />

### 下载进度辅助函数

目前，上传进度在 Chrome 之外的浏览器中还存在一些 Bug。

下面展示的进度处理器[技术方案](#source-progress-helper)避免了将 `fetch` 调用封装在闭包中。👍

`progressHelper` 的接口如下（源码见下文）：

<Gist path='justsml/db5ccc55ffb93c75e04e014d1f553cfb' />

来看一个使用示例：

<Gist path='justsml/9bec219590ff50688972c1caff67c14b' />

一个可复用的图片下载器 `getBlob()` 大致如下：

<Gist path='justsml/bef2dd7e630eb7642beb3e2be29489b2' />

顺便提一下，`Blob` 代表二进制大对象（Binary Large Object）。

在以下两种使用模式中选择其一至关重要（它们在功能上是等效的）：

<Gist path='justsml/6ad9e37a96ad1f3a75ca509038510a5b' />

我个人倾向于 `选项 #1`。不过，你的作用域设计可能会迫使你使用 `选项 #2`。

最后，这是该方案的最后一部分，即我们的 `progressHelper`：

##### 源码：进度辅助函数（Progress Helper）

<Gist path='justsml/a8ffd810fc7e5a5295dfc898302ddbfc' />

_致谢：_ 特别感谢 Anthum Chris 以及他[在此展示的优秀 Progress+Fetch 概念验证](https://github.com/AnthumChris/fetch-progress-indicators)。

### 递归重试辅助函数

<Gist path='justsml/7e52521a0af50fa590be57d5b4593120' />

### 处理 HTTP 重定向

<Gist path='justsml/3dd0a799ada8da7cd15943ff254266de' />

### 取消 fetch 请求

<Gist path='justsml/7f257ac3de3c7792db8485588c54e938' />

### 兼容性

截至 2022 年，`fetch` API 已在所有现代浏览器以及 NodeJS v18+ 的较新版本中获得[广泛支持](https://caniuse.com/#feat=fetch)。

如果你必须支持 IE，可以使用 `github/fetch` 包（由 GitHub 的优秀团队维护）来 [polyfill fetch](https://github.com/github/fetch#browser-support)。甚至可以追溯支持到 [IE8](https://github.com/camsong/fetch-ie8) —— 当然，实际效果因人而异。

早期版本的 NodeJS 可以通过 [`node-fetch`](https://www.npmjs.com/package/node-fetch) 包来利用 `fetch` API：

```sh
npm install node-fetch
```

_在使用 polyfill 和 node-fetch 后：兼容性达到 99.99%_ ✅

> 如果你有其他想要了解的“用例”，请[在 Twitter/X 上联系我](https://x.com/justsml)。❤️
````
