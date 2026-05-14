# Translation Candidate
- Slug: llm-connection-strings
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-30--llm-connection-strings/zh/index.mdx
- Validation: deferred
- Runtime seconds: 5.46
- Input tokens: 2756
- Output tokens: 2447
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000808
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: '是时候 llm:// 连接字符串 了'
subTitle: '使用 `llm://` URL 简化模型和服务提供商配置'
date: '2026-01-30'
modified: '2026-02-26'
tags:
  - ai
  - llm
  - api
  - developer-experience
  - standards
category: AI
draft: false
popularity: 1
social_image: ../desktop-social.webp
cover_full_width: ../hero-wide.webp
cover_mobile: ../square-200.webp
cover_icon: ../square-200.webp
---
<blockquote class="inset">
**更新：** 本文促使了 [llm:// URI 方案的互联网草案](https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/) 的诞生。
</blockquote>

还记得连接数据库时需要在各种杂乱的环境变量之间来回切换的糟糕旧时光吗？

那是一套脆弱的配置体系。`DB_HOST`、`DB_PORT`、`DB_USER`、`DB_PASSWORD`、`DB_NAME`... 或者等一下，是不是应该用 `DB_USERNAME`？是 `DB_PASS` 还是 `DB_PWD`？这次是否需要 `PG_*` 前缀？超时设置又该放在哪里？

这种脆弱的纸牌屋随时可能因为你忘记大写 `HOST` 而让生产环境崩溃。

直到有人提出了使用 URL¹ 的绝妙主意：

```bash
postgres://user:pass@host:5432/dbname
```

一个字符串。你所需的一切。通用可解析。可移植。我敢说... 简直优雅？

为什么我们对待大语言模型时还像停留在1999年？

## 环境变量爆炸危机

目前我的 `.env` 文件看起来像一堆废弃的 API 密钥坟场。`OPENAI_API_KEY`、`ANTHROPIC_API_KEY`、`MISTRAL_API_KEY`、`GROQ_API_KEY`。更别提 Azure——你只需要说个“你好”，就得准备端点地址、部署名称、API 版本和密钥。

这不只是丑陋；这是摩擦。每次我想切换模型或测试新供应商时，都要重写初始化代码，查找特定参数名的文档，然后在环境配置中添加三行新内容。

我们为什么不... ~~偷用~~ 借鉴数据库 URL 的思路？

## 引入 LLM 连接字符串

想象一下用单行代码配置整个模型接口：

```bash
llm://api.openai.com/gpt-5.2?reasoning_effort=none&temp=0.7&max_tokens=1500
llm://api.z.ai/glm-4.7?top_p=0.9&cache=true
```

---

<br />

### LLM 连接字符串的结构解析

![LLM 连接字符串的组成部分](../inline-url-diagram-dark.svg)

方案是 `llm://`。主机是供应商的 API 基础 URL。路径是模型名称。查询参数处理所有通常会弄乱代码的运行时选项。

## 需要认证？没问题，直接加上

就像 `postgres://` 一样，我们也可以直接在连接字符串中嵌入认证信息：

```bash
llm://app-name:sk-proj-123456@api.openai.com/gpt-5.2?reasoning_effort=none&temp=0.7
```

*注意：是的，将凭证直接写入 URL 可能会带来安全风险，如果你不小心把它们贴到公共日志里。但现代日志服务在清理这些模式方面已经做得相当不错，而且说实话，你对 `.env` 文件的处理方式真的更好吗？请验证、清理并谨慎使用。*

## 高可用性？为什么不行？

许多数据库库都支持通过指定多个主机实现轮询故障转移。为什么我们的 AI 代理不能拥有同样的可靠性？

```bash
llms://primary.gpt,backup.gpt/gpt-6?temp=0.9
```

那个 `llms://` 中的 `s` 并不是拼写错误。它是复数形式。如果 `primary.gpt` 挂了，客户端会自动重试 `backup.gpt`。不需要复杂的路由逻辑。

<blockquote class="inset">一个字符串，包含从你的 **认证** 到 **端点** 再到 **超参数** 的所有内容。</blockquote>

## 替代格式

我对 `llm://` 并不执着。具体方案的语法不如标准本身重要。

我想象过一个世界，我们可以使用更简洁的供应商特定方案，同时保持标准结构：

```bash
ollama://localhost:11434/llama3
vercel://anthropic/sonnet-4.5?temp=0.8&web_search={"maxUses":3}
bedrock://us-west-2.aws/anthropic/sonnet-4.5?temp=0.8&cacheControl=ephemeral
```

无论具体语法如何，核心优势是显而易见的：

1. **可移植性：** 将整个配置从本地脚本复制到云工作节点。
2. **CLI 友好：** 向脚本传递单个参数。`my-agent --model "llm://..."` 比 `my-agent --model gpt-4 --temp 0.7 --key $KEY --host ...` 更简洁。
3. **语言无关：** 每种编程语言都有强大的 URL 解析器。我们免费获得验证、解析和清理功能。

<blockquote class="ai-response inset">数据库领域花了数十年才弄明白这一点。<br /><b>好消息是，在 AI 时间尺度上，这不过是半年前的事。</b></blockquote>

## 结论

我们不需要另一个复杂的配置标准或新的 YAML 清单文件。我们只需要使用过去 30 年互联网其他部分一直在使用的工具。

让我们停止重复造轮子，开始以对待数据库的同样尊重来对待 LLM 连接。你的 `.env` 文件（以及你的理智）会感谢你的。

![杂乱的环境变量抽屉](../hero-concept-8-drawers.webp)

{/* ¹ 是的，我知道 `URI` 比 `URL` 更准确。如果你真的在意这个区别，请去摸摸草。 */}
````
