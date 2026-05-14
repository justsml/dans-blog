# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: zh
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/zh/index.mdx
- Validation: deferred
- Runtime seconds: 16.29
- Input tokens: 4042
- Output tokens: 2874
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.001265
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 不要绑定你的模型
subTitle: LLM 路由，当下正热
date: '2026-01-02'
modified: '2026-01-08'
tags:
  - ai
  - llm
  - typescript
  - mastra
  - agent-orchestration
category: AI
subCategory: Engineering
social_image: ../mobile-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
大多数工程团队会选定一个语言模型，然后一直用下去。一个供应商、一个模型、所有任务。这就像因为某人在第一次面试时表现不错，就让他同时负责编码、文案和税务。

在任何时候，总有一个模型更擅长代码，另一个更擅长处理冗长混乱的上下文，还有一个是最便宜的、适合分类的枯燥工作马。模型的名字会变，但问题的本质不会变。把一个模型当作万能工具，意味着你要么在简单任务上多花钱，要么在专业任务上得到次优结果。

我见过一个团队在情感分析上烧掉数千美元，用的是每百万token 30美元的模型，而一个0.5美元的模型就能完成同样的工作。简单的JSON格式化、基础分类任务，全都走他们的高级供应商。唯一升温的是他们的AWS账单。

有更好的办法，而且并不复杂。

## 委托而非专一

如果你能把请求路由到真正最适合该特定任务的模型呢？把昂贵的强力模型留给困难任务，把简单的解析和格式化交给更便宜的模型。享受多个供应商的好处，而无需在代码库中手动切换。

Mastra 让你能构建这样的系统。你为不同类型的工作设置专门的智能体，然后创建一个路由智能体，由它决定哪个专家来处理每个请求。下面的模型ID只是示例，不是排行榜。把它们换成当前在你评估中胜出且符合预算的模型。

可以这样理解：你的团队里有三位专家。

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  instructions: 'You are an expert engineer. Write bugs? You are fired.',
  model: anthropic(process.env.CODE_MODEL ?? 'claude-sonnet-4-5'),
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  instructions: 'You are a creative writer. Be weird.',
  model: google(process.env.LONG_CONTEXT_MODEL ?? 'gemini-3-pro-preview'),
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  instructions: 'You are a helpful assistant. Be boring.',
  model: openai(process.env.GENERAL_MODEL ?? 'gpt-5.2'),
});
```

每个都有其职责。你的代码智能体应该是在你仓库特定的编码评估中表现最好的模型。你的长上下文智能体应该是在处理实际文档时不会把中间内容搅成一团的模型。你的通用智能体应该便宜、可靠，并且以最好的方式保持枯燥。

接下来是重点。你添加一个路由器，它充当智能代理：

```typescript
export const routerAgent = new Agent({
  id: 'router-agent',
  name: 'The Boss',
  instructions: `You are an intelligent router.
  - Coding -> Claude
  - Poetry -> Gemini
  - Facts -> GPT

  Do not do the work yourself. Delegate.`,
  model: openai(process.env.ROUTER_MODEL ?? 'gpt-5-mini'), // Use a cheap model for routing!
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
});

export const mastra = new Mastra({
  agents: { routerAgent, claudeAgent, geminiAgent, gptAgent },
});
```

路由器本身运行在一个轻量级模型上，因为它只需要决定将流量发送到哪里。你不需要支付溢价来搞清楚该用哪个高级模型。这一点也要测量；一个糟糕的路由器会悄无声息地把节省变成错误路由。

当有人要求实现冒泡排序时，路由器识别出这是编码工作，并将其交给你的代码专家。创意写作提示？那就交给你在文风和广度方面选定的模型。关于历史事件的事实性问题？路由到通用智能体，理想情况下在需要新鲜度或引用时启用检索。

## 实际收益

**成本效率比你想象的重要得多。** 一个做委托决策的小型路由模型，其成本只是每次请求都通过最贵供应商运行的一小部分。随着时间推移，尤其是在规模扩大后，这会累积成真金白银。你只在真正需要时才为重型智能付费。

**当你将模型与任务匹配时，质量会提高。** 胜出者每月、每项任务、每种提示形态都在变化。这就是为什么路由层应该依赖你的评估，而不是你写集成那周在 Twitter 上流行的模型。

**弹性成为一个附带好处。** 当 OpenAI 发生周期性宕机时（确实会发生），你的路由器可以将流量重定向到其他供应商。你不会因为等待某个特定 API 恢复而陷入困境。

这不是为了聪明而聪明。而是为了构建在财务和技术上都合理的系统。你不会对每项建筑任务都用同一把锤子，同样，你也不应该对每项 AI 任务都用同一个语言模型。

这种方法的美妙之处在于你的应用程序代码不需要改变。你仍然只需调用你的路由器智能体。决定哪个模型用于哪个任务的复杂性集中在一个地方，一次配置完成，而不是分散在整个代码库的大量条件逻辑中。

### 资源

- [Mastra.ai 文档](https://mastra.ai/docs)
- [Mastra GitHub 仓库](https://github.com/mastra-ai/mastra)

## 阅读系列

1. **LLM 路由**（本文）
2. [安全与护栏](../mastra-security-guardrails)
3. [MCP 与工具集成](../mastra-mcp-tool-integrations)
4. [工作流与记忆](../mastra-workflows-memory)
````
