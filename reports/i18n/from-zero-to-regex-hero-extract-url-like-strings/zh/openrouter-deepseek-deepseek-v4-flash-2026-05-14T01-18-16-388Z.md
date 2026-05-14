# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: zh
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/zh/index.mdx
- Validation: deferred
- Runtime seconds: 59.28
- Input tokens: 8718
- Output tokens: 9908
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.003837
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 从零到正则高手
subTitle: 使用单个正则表达式提取并解析URL格式字符串
category: Regex
subCategory: Data Extraction
date: '2024-12-29'
modified: '2025-01-06'
tags:
  - regex
  - url
  - data-extraction
  - data-processing
social_image: ../desktop-social.webp
cover_full_width: ../regex-url-parsing-wide.webp
cover_mobile: ../regex-url-parsing-square-200.webp
cover_icon: ../regex-url-parsing-square-200.webp
---
import { CodeTabs } from '../../../../components/CodeTabs';

**目录**

- 🚀 [引言](#-introduction)
- 🔍 [从文本中提取 URL](#-extracting-urls-from-text)
- 🛳️ [120+ 字节的正则表达式](#️-the-120-byte-regex)
- 🧩 [逐步拆解](#-breaking-it-down-step-by-step)
- 🛠️ [解析示例](#-pa)
- ☑️ [下一步](#-next-steps)
- 📝 [总结](#-summary)
- 📚 [进一步学习](#-further-learning)

**TL;DR:** 直接跳到 [120+ 字节的正则表达式](#️-the-120-byte-regex)。

## 🚀 引言

从原始文本中提取 URL 有时就像玩一场令人厌烦的打地鼠游戏。标点符号、括号包裹以及模糊的格式都会合谋挫败你的努力。无论你是在构建网页爬虫、数据分析器还是聊天应用，准确提取 URL 都是必不可少的。

在本文中，我们将采用灵活的两步法来直面这个问题。我们的目标是**首先捕获所有 _可能_ 像 URL 的字符串**，然后在后续过程中处理验证。

> 💡 **注意：** 此模式并非用于 **_验证_** URL！它故意对标点符号和拼写错误保持宽松。

## 🔍 目标：从文本中提取 URL

从原始文本中提取 URL 时，两步法很有效：

1. **捕获所有类似URL的内容**：撒一张大网，抓取所有*可能*是URL的字符串。这正是我们的"120+字节正则表达式"大显身手的地方。
2. **验证**：一旦捕获了这些候选者，使用二次检查（例如DNS解析、与已知域名比较）来剔除无效条目。

### 可视化挑战

像`extract`和`parse`这样的术语经常互换使用，然而它们指的是不同的过程。提取URL涉及从更大的文本中识别并捕获潜在的URL。而解析则是将这些URL分解成其组成部分。

当我提到解析或'URL部分'时，我指的是以下组件：

<figure>
  <figcaption>所有URL的5个部分</figcaption>
![URL结构可视化](../WhatUrlsAreMadeOf-ColorMatched.svg "URL结构可视化")
</figure>

<details class="inset breakout">
  <summary>点击查看RegEx101子串匹配的截图。</summary>

  在深入正则表达式之前，让我们使用一个可视化工具来看看我的模式如何捕获多个匹配项：

  <figure>
    <figcaption>使用[RegEx101.com](https://regex101.com/r/jO8bC4/69)可视化多行匹配</figcaption>
    ![预览'批量'多行匹配](../RegEx101-Matches-Screenshot.webp "预览'批量'多行结果")
  </figure>
</details>

## 120+字节的正则表达式

下面是一个简洁的正则表达式，旨在一次性提取和解析URL。它支持各种协议、域名、路径以及可选的查询/片段部分。

别担心——我们将逐步分解它！

```js title="120+字节URL正则表达式" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Compatibility: ES5+
```

// Same pattern, split on newlines for readability:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0x9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">在下方评论区分享你遇到（或编写）过的最疯狂的正则表达式！🚀</blockquote>

## 🧩 逐步分解

让我们将正则表达式拆解成各个组成部分，以理解其工作原理：

<h3>1. 协议（组1）：<code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**目的：** 匹配URL的协议部分（例如 `http://`、`ftp://`、`custom-scheme://`）。</li>
  <li>
    **解释：**
    <ul>
      <li><code>[-.a-z0-9]+</code>：匹配一个或多个小写字母、数字、连字符或句点（协议方案中常见）。</li>
      <li><code>{`:\/{1,3}`}</code>：匹配一个冒号后跟一到三个斜杠（<code>:/</code>、<code>://</code> 或 <code>:///</code>）。</li>
    </ul>
  </li>
</ul>

<h3>2. 域名（组2）：<code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**目的：** 捕获URL的域名或主机部分。</li>
  <li>
    **解释：**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code>：匹配除指定特殊字符和空白字符之外的任何字符。</li>
      <li><code>[^`\/\s\]?]+</code>：匹配一个或多个除反引号、斜杠、空白字符或右方括号之外的字符。</li>
    </ul>
  </li>
</ul>

<h3>3. 路径（组3）：<code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li><strong>目的：</strong>匹配URL的路径部分。</li>
  <li>
    <strong>解释：</strong>
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code>：匹配零个或多个路径中常见的URL安全字符。</li>
    </ul>
  </li>
</ul>

<h3>4. 查询（组4）：<code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li><strong>目的：</strong>可选地匹配查询字符串，以任意<code>?</code>字符开头。</li>
  <li>
    <strong>解释：</strong>
    <ul>
      <li><code>[?]?</code>：可选地匹配一个<code>?</code>。（方括号并非严格必要，但比极其简洁的双<code>??</code>更清晰。同时，它与下一个相似的匹配组<code>[#]?</code>在视觉上形成对应。）</li>
      <li><code>([^#\s`?]*)</code>：匹配零个或多个不是井号、空白字符、反引号或问号的字符。</li>
    </ul>
  </li>
</ul>

<h3>5. 片段（组5）：<code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li><strong>目的：</strong>可选地匹配以<code>#</code>开头的片段标识符。</li>
  <li>
    <strong>解释：</strong>
    <ul>
      <li><code>[#]?</code>：可选地匹配一个<code>#</code>。</li>
      <li><code>([^#\s'"`\.,!]*)</code>：匹配零个或多个不被禁止的标点符号或空白字符。</li>
    </ul>
  </li>
</ul>

<h2>🛠️ 解析示例</h2>

<p>以下是如何用一点JavaScript让这个庞然大物般的正则表达式发挥作用：</p>

<CodeTabs client:only
 tabs={[
    "代码：提取URL",
    "结果：提取的URL",
    "结果：URL各部分",
  ]} >
```js title="extract-urls.js" frame="code"
const text = `
Check this out: https://example.com/path?query=123#section
And also (ftp://files.server.org/index).
Plus a weird one: custom-scheme://host/param;weird^stuff
`;

const urlRegex =
  /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;

const matches = [
  ...text.matchAll(urlRegex),
].map((match) => match[0]);
console.log("Extracted URLs:", matches);

const parts = [
  ...text.matchAll(urlRegex),
].map((match) => match.slice(1));
console.log("Extracted Parts:", parts);
```

```json title="extracted-urls.json"
[
  "https://example.com/path?query=123#section",
  "ftp://files.server.org/index",
  "custom-scheme://host/param;weird^stuff"
]
```

```json title="urls-parts.json"
[
  [
    "https://",    // Protocol
    "example.com", // Domain
    "/path",       // Path
    "query=123",   // Query
    "section"      // Fragment
  ],
  [
    "ftp://",           // Protocol
    "files.server.org", // Domain
    "/index",           // Path
    "",                 // Query
    ""                  // Fragment
  ],
  [
    "custom-scheme://",   // Protocol
    "host",               // Domain
    "/param;weird^stuff", // Path
    "",                   // Query
    ""                    // Fragment
  ]
]
```

</CodeTabs>

<h2>☑️ 后续步骤</h2>

<p>根据你的使用场景，你可能需要优化这个正则表达式，或添加更多的验证和后处理步骤。</p>

### 不同项目，不同需求

不同项目对需求和安全性的要求各不相同：

1. **网页抓取**：验证 URL 是否可访问且可信。
2. **数据处理**：从用户生成内容中提取 URL，同时确保安全。
3. **数据分析**：过滤重复或无关链接，用于研究或营销目的。
4. **面向用户的应用**：在聊天应用或论坛中自动将 URL 转为超链接。

### 后处理与验证

收集到潜在的 URL 后，应用额外的检查：

- **DNS 查询**：验证域名是否可解析。
- **安全检查**：使用服务检查恶意或钓鱼网站。
- **自定义规则**：应用项目特定的过滤器（例如，允许的顶级域名、最大 URL 长度）。

## 📝 总结

提取半结构化字符串数据，或许正是正则表达式掌握中最令人满足的部分。

以下是关键要点的回顾：

- **使用可视化工具编写、测试**并理解你的[正则表达式模式](https://regex101.com/r/jO8bC4/69)。
- **将挑战分解为多个部分**，分别解决每个部分。从某种意义上说，捕获组为我们提供了正则表达式的象征性“路标”。
- **使用“宽松”的匹配表达式**，在数据摄取时避免严格的规范符合性。
- **在初始提取后应用验证步骤**至关重要——始终考虑项目的安全性和特定需求。

通过遵循这些步骤，你可以有效地提取任何半结构化字符串数据，为进一步的处理和验证奠定基础。

## 📚 进一步学习

- 记得在 [RegEx101.com 上的在线演示](https://regex101.com/r/jO8bC4/69) 中动手试试！
- 原始 StackOverflow 问题，以及[我的答案链接在此](https://stackoverflow.com/a/34669019/369727)。
- [MDN 正则表达式文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [高级正则表达式技巧](https://www.regular-expressions.info/)：探索前瞻、后顾及其他高级模式，以实现更精确的匹配。
- [RFC 3986 - URI 通用语法](https://datatracker.ietf.org/doc/html/rfc3986)
````
