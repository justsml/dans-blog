# Translation Candidate
- Slug: llm-connection-strings
- Locale: zh
- Model: openrouter/openai/gpt-5.6-luna
- Target: src/content/posts/2026-01-30--llm-connection-strings/zh/index.mdx
- Validation: deferred
- Runtime seconds: 13.59
- Input tokens: 3780
- Output tokens: 1460
- Thinking tokens: unknown
- Cached input tokens: 1082
- Cache write tokens: 2692
- Estimated cost: $0.002313
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: '是时候使用 llm:// 连接字符串了'
subTitle: '使用 `llm://` URL 简化模型与提供商配置'
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
**更新：** 本文促成了关于 [`llm://` URI 方案](https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/)的 [Internet-Draft](https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/)，以及配套的 [`llm-strings` npm 包](https://www.npmjs.com/package/llm-strings)。实现也已[发布在 GitHub](https://github.com/justsml/llm-strings)上。
</blockquote>

还记得那些糟糕的旧日子吗？连接数据库意味着要摆弄一堆杂七杂八的环境变量。

那是一座脆弱的配置高塔：`DB_HOST`、`DB_PORT`、`DB_USER`、`DB_PASSWORD`、`DB_NAME`……等等，还是 `DB_USERNAME`？到底是 `DB_PASS` 还是 `DB_PWD`？这次是不是得用 `PG_*` 前缀？超时设置又他妈该放哪儿？

这就是一座摇摇欲坠的纸牌屋，只因为你忘了把 `HOST` 大写，就足以让生产构建当场塌方。

后来，有人提出了一个天才般的想法：直接用 URL¹：

```bash
postgres://user:pass@host:5432/dbname
```

一条字符串。所需的一切。任何地方都能解析。可移植。甚至可以说……漂亮？

那我们为什么还在用 1999 年的方式对待 LLM？

## 环境变量大爆炸

现在，我的 `.env` 文件看起来像一片被遗弃的 API 密钥墓地：`OPENAI_API_KEY`、`ANTHROPIC_API_KEY`、`MISTRAL_API_KEY`、`GROQ_API_KEY`。至于 Azure，还是别提了——光是为了说一句“你好”，你就得准备 endpoint、部署名称、API 版本和密钥。

这不只是难看，更是摩擦。每次我想换个模型或测试一个新提供商，都得重写初始化代码，翻文档确认各家特有的参数名称，然后再往环境配置里塞上三行。

如果我们只是……~~偷~~借鉴一下数据库 URL 的思路呢？

## 引入 LLM 连接字符串

想象一下，用一行配置完整定义你的模型接口：

```bash
llm://api.openai.com/gpt-5.2?reasoning_effort=none&temp=0.7&max_tokens=1500
llm://api.z.ai/glm-4.7?top_p=0.9&cache=true
```

---

<br />

### LLM 连接字符串的构成

![LLM 连接字符串的各个部分](../inline-url-diagram-dark.svg)

方案是 `llm://`。主机是提供商的 API 基础 URL。路径是模型名称。查询参数则负责承载那些通常会把代码弄得乱七八糟的运行时选项。

## 需要身份验证？好，那就加上。

和 `postgres://` 一样，我们可以直接把身份验证信息写进去：

```bash
llm://app-name:sk-proj-123456@api.openai.com/gpt-5.2?reasoning_effort=none&temp=0.7
```

*注意：没错，如果你把凭据粘贴进公开日志，直接放在 URL 里确实可能带来安全风险。不过现在的日志服务通常挺擅长清理这类模式；说实话，你真的有把 `.env` 文件保护得更好吗？请先验证、做好脱敏，并谨慎使用。*

## 要弹性？为什么不呢。

许多数据库库都支持通过指定多个主机来实现轮询故障转移。我们的 AI agent 凭什么不能拥有同样的可靠性？

```bash
llms://primary.gpt,backup.gpt/gpt-6?temp=0.9
```

`llms://` 里的那个 `s` 不是笔误，而是复数。如果 `primary.gpt` 卡住了，客户端会自动重试 `backup.gpt`。不需要复杂的路由逻辑。

<blockquote class="inset">用一个字符串包含从**身份验证**、**端点**到**超参数**的一切。</blockquote>

## 替代格式

我并不执着于 `llm://`。具体使用哪种 scheme，没标准本身那么重要。

我完全可以想象这样一个世界：为了简洁，我们使用提供商专属的 scheme，同时保留标准结构：

```bash
ollama://localhost:11434/llama3
vercel://anthropic/sonnet-4.5?temp=0.8&web_search={"maxUses":3}
bedrock://us-west-2.aws/anthropic/sonnet-4.5?temp=0.8&cacheControl=ephemeral
```

无论具体语法如何，核心收益都毋庸置疑：

1.  **可移植性：**把完整配置从本地脚本复制粘贴到云端 worker。
2.  **CLI 友好：**给脚本传一个参数就够了。`my-agent --model "llm://..."` 总好过 `my-agent --model gpt-4 --temp 0.7 --key $KEY --host ...`。
3.  **语言无关：**每种编程语言都有成熟的 URL 解析器。验证、解析和脱敏，统统免费获得。

<blockquote class="ai-response inset">数据库世界花了几十年才搞明白这件事。<br /><b>好消息是，按 AI 的时间线算，这也就大约半个“氛围年”以前。</b></blockquote>

## 结论

我们不需要又一个复杂的配置标准，也不需要再造一个基于 YAML 的清单文件。我们只需要使用这个已经为互联网其他部分稳定工作了 30 年的工具。

别再重新发明轮子了，开始像尊重数据库那样尊重我们的 LLM 连接吧。你的 `.env` 文件（还有你的理智）会感谢你。

![杂乱的环境变量抽屉](../hero-concept-8-drawers.webp)

{/* ¹ 没错，我知道严格来说 `URI` 比 `URL` 更准确。如果你较真到真的在乎这个区别，那就请你出去接触一下自然。 */}
````
