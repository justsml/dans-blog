# Translation Candidate
- Slug: llm-connection-strings
- Locale: zh
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-30--llm-connection-strings/zh/index.mdx
- Validation: deferred
- Runtime seconds: 27.83
- Input tokens: 3891
- Output tokens: 3267
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000426
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: '是时候使用 llm:// 连接字符串了'
subTitle: '使用 `llm://` URL 简化模型和提供者配置'
modified: '2026-06-30'
tags:
  - ai
  - llm
  - api
  - developer-experience
  - standards
category: AI
social_image: ../desktop-social.webp
cover_full_width: ../hero-wide.webp
cover_mobile: ../square-200.webp
cover_icon: ../square-200.webp
sourceHash: 88892a247d5c
---
<blockquote class="inset">
**更新：** 本文促成了 [`llm://` URI 方案的互联网草案](https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/) 以及一个支持性的 [`llm-strings` npm 包](https://www.npmjs.com/package/llm-strings)。该实现也已 [在 GitHub 上开源](https://github.com/justsml/llm-strings)。
</blockquote>

还记得那些糟糕的旧时光吗？那时连接数据库需要摆弄一堆杂七杂八的环境变量？

那是一个脆弱的配置塔。`DB_HOST`、`DB_PORT`、`DB_USER`、`DB_PASSWORD`、`DB_NAME`……或者等等，是 `DB_USERNAME`？是 `DB_PASS` 还是 `DB_PWD`？这次需要 `PG_*` 前缀吗？超时设置又该放哪儿？

它就像一座脆弱的纸牌屋，随时可能因为你忘了大写 `HOST` 而让你的生产构建崩溃。

然后，有人想出了一个绝妙的主意——直接用 URL¹：

```bash
postgres://user:pass@host:5432/dbname
```

一个字符串，万事俱备。通用解析，随处可用。我敢说……简直优雅？

那么，为什么我们对待大语言模型还像在 1999 年？

## 环境变量爆炸

现在，我的 `.env` 文件看起来就像一堆废弃 API 密钥的坟场。`OPENAI_API_KEY`、`ANTHROPIC_API_KEY`、`MISTRAL_API_KEY`、`GROQ_API_KEY`。更别提 Azure 了——你需要一个端点、一个部署名、一个 API 版本和一个密钥，就为了说个“你好”。

这不仅仅是丑陋，更是摩擦。每次我想换模型或测试新供应商时，都要重写初始化代码，翻文档找特定参数名，再给环境配置多加三行。

如果我们……~~偷~~借来数据库 URL 的想法呢？

## 介绍 LLM 连接字符串

想象一下，用一行代码配置整个模型接口：

```bash
llm://api.openai.com/gpt-5.2?reasoning_effort=none&temp=0.7&max_tokens=1500
llm://api.z.ai/glm-4.7?top_p=0.9&cache=true
```

---

<br />

### LLM 连接字符串的解剖

![LLM 连接字符串的组成部分](../inline-url-diagram-dark.svg)

方案是 `llm://`。主机是提供商的 API 基础 URL。路径是模型名称。查询参数则处理那些通常塞满你代码的所有运行时选项。

## 需要认证？没问题，加进去就行。

就像 `postgres://` 一样，我们可以把认证信息直接写进 URL：

```bash
llm://app-name:sk-proj-123456@api.openai.com/gpt-5.2?reasoning_effort=none&temp=0.7
```

*注意：把凭据放在 URL 里的确存在安全风险——如果你把它们粘贴到公开日志里的话。但现代日志服务很擅长清理这类模式，而且说实话，你对待 `.env` 文件的方式能好到哪去？做好验证、清理，再谨慎使用。*

## 容错？为什么不行。

许多数据库库通过指定多个主机来实现轮询故障转移。我们的 AI 代理凭什么就不能有同样的可靠性？

```bash
llms://primary.gpt,backup.gpt/gpt-6?temp=0.9
```

`llms://` 里的那个 `s` 不是笔误。它是复数。如果 `primary.gpt` 挂掉，客户端会自动重试 `backup.gpt`。不需要复杂的路由逻辑。

<blockquote class="inset">一行字符串，囊括从 **认证** 到 **端点** 再到 **超参数** 的所有东西。</blockquote>

## 其他格式

我并不执着于 `llm://`。具体的 scheme 本身不如标准重要。

我可以想象一个世界，我们使用供给者特定的 scheme 来保持简洁，同时保留标准结构：

```bash
ollama://localhost:11434/llama3
vercel://anthropic/sonnet-4.5?temp=0.8&web_search={"maxUses":3}
bedrock://us-west-2.aws/anthropic/sonnet-4.5?temp=0.8&cacheControl=ephemeral
```

无论具体语法如何，核心好处是无可争议的：

1.  **可移植性：** 从本地脚本复制粘贴整个配置到云 Worker。
2.  **CLI 友好：** 向脚本传递一个单独参数。`my-agent --model "llm://..."` 比 `my-agent --model gpt-4 --temp 0.7 --key $KEY --host ...` 好用多了。
3.  **语言无关：** 每种编程语言都有牢靠的 URL 解析器。免费获得验证、解析和清理功能。

<blockquote class="ai-response ins et">数据库世界花了几十年才搞明白这个。<br /><b>好消息是，按 AI 时间线来算，那大概也就半个“潮流年”前的事。</b></blockquote>

## 结论

我们不需要另一个复杂的配置标准，或者一个新的基于 YAML 的清单文件。我们只需要使用一个已经在互联网上用了 30 年的工具。

让我们停止重新发明轮子，开始像对待数据库那样尊重我们的 LLM 连接。你的 `.env` 文件（以及你的理智）会感谢你的。

！[一个杂乱的环境变量抽屉](./../hero-concept-8-drawers.webp)

{/* ¹ 是的，我知道 "URI" 比 "URL" 更准确。如果你真的挑剔到在意这种区别，请去摸一摸草地。 */}
````
