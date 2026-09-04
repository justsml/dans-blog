# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: zh
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/zh/index.mdx
- Validation: deferred
- Runtime seconds: 87.11
- Input tokens: 4240
- Output tokens: 13641
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004413
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
modified: '2026-09-04'
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
大多数工程团队会选定一个语言模型，然后一直用下去。一个供应商、一个模型、所有任务。这就像因为某人在第一轮面试中表现不错，就让他一个人包办编码、文案和报税。

在任何一个时间点，总有一个模型更擅长写代码，另一个更擅长处理冗长混乱的上下文，还有一个是最便宜、最无聊但能干粗活的分类模型。模型的名字一直在变，问题的结构却从未改变。把一个模型当成全能选手，意味着你要么为简单任务多付钱，要么在专业任务上得到平庸的结果。

我见过一个团队把几千美元烧在情感分析上——他们用的是一个每百万 token 30 美元的模型，而一个 0.5 美元的模型完全能胜任同样的工作。简单的 JSON 格式化、基础的分类任务，全都走他们的高端供应商。唯一在升温的是他们的 AWS 账单。

有更好的做法，而且并不复杂。

## 委派优于专一

如果你能把请求路由到真正适合该任务的模型呢？让昂贵的强力模型处理难题，把简单的解析和格式化丢给更便宜的模型。享受多供应商的好处，却不必在代码库里手动切换它们。

Mastra 可以让你构建这样的系统。你为不同类型的工作设置专家 agent，然后创建一个 supervisor agent 来决定每个请求该交给哪个专家。下面的模型 ID 使用 Mastra 当前的 `provider/model` 字符串格式；它们只是示例，不是排行榜。请换成当前在你评估中胜出且符合预算的模型。

可以这样理解：你的团队里有三位专家。

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core/mastra';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  description: 'Handles implementation, refactoring, and code review tasks.',
  instructions: 'You are an expert engineer. Write bugs? You are fired.',
  model: process.env.CODE_MODEL ?? 'anthropic/claude-sonnet-4-6',
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  description: 'Handles long-context synthesis and messy document analysis.',
  instructions: 'You are a creative writer. Be weird.',
  model: process.env.LONG_CONTEXT_MODEL ?? 'google/gemini-2.5-pro',
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  description: 'Handles routine classification, formatting, and general Q&A.',
  instructions: 'You are a helpful assistant. Be boring.',
  model: process.env.GENERAL_MODEL ?? 'openai/gpt-5-mini',
});
```

每个 agent 都有自己的职责，`description` 字段是路由判断的依据之一。你的代码 agent 应该是那个能通过针对你仓库的编码评估的模型。你的长上下文 agent 应该是在处理你的真实文档时不会把中间内容搅成一锅粥的那个。你的通用 agent 应该便宜、可靠，并且无聊得恰到好处。

接下来就有意思了。你添加一个轻量级 supervisor，充当智能代理：

```typescript
export const supervisorAgent = new Agent({
  id: 'supervisor-agent',
  name: 'The Boss',
  instructions: `You route work to the right specialist.
  Delegate coding work to claude-agent.
  Delegate long-context document work to gemini-agent.
  Delegate routine classification and formatting to gpt-agent.
  Do not do specialist work yourself unless delegation is unnecessary.`,
  model: process.env.ROUTER_MODEL ?? 'openai/gpt-5-mini',
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
  memory: new Memory({
    storage: new LibSQLStore({ id: 'router-memory', url: 'file:mastra.db' }),
  }),
});

export const mastra = new Mastra({
  agents: { supervisorAgent, claudeAgent, geminiAgent, gptAgent },
});
```

supervisor 本身可以跑在轻量模型上，因为它的主要工作就是决定流量往哪走。你不需要花高价去判断该用哪个高价模型。这一点也要纳入评估；一个糟糕的路由层会悄悄把节省变成错误路由。

当有人要求实现冒泡排序时，路由器会识别出这是编码任务，交给你的代码专家。创意写作提示？交给那个你在风格和广度上选定的模型。关于历史事件的客观问题？路由到通用 agent，在需要时效性或引用时最好带上检索。

## 实际收益

**成本效率的重要性超乎你的想象。** 一个做委派决策的小型路由模型，其成本只是让每个请求都经过最贵供应商所需成本的一小部分。随着时间推移，尤其是在规模放大之后，这会累积成真金白银。你只在真正需要时才为重型智能付费。

**当模型与任务匹配时，质量会提升。** 赢家每个月、每个任务、每种提示词形态都在变。这就是为什么路由层应该依赖你的评估，而不是你写集成那一周在 Twitter 上最火的模型。

**韧性是可能的，但不是自动的。** 上面的 supervisor 不会在某个供应商失败时通过另一个 agent 重试，而且路由决策本身依赖 OpenAI。如果供应商故障转移对你很重要，请在应用代码中显式添加重试/回退策略，把回退路由器放在不同的供应商上，并测试失败路径。一袋子 agent 不会因为模型 logo 不同就变成熔断器。

这不是为了炫技而炫技。这是为了构建在财务和技术上都说得通的系统。你不会用同一把锤子去干所有建筑活，大概也不应该用同一个语言模型去处理所有 AI 任务。

这种方法的美妙之处在于，你的应用代码不需要一个分支迷宫。你仍然只调用一个 agent。决定哪个模型处理哪个任务的复杂性集中在一个地方，配置一次，而不是散落在代码库各处的一堆条件逻辑里。

### 资源

- [Mastra.ai 文档](https://mastra.ai/docs)
- [Mastra GitHub 仓库](https://github.com/mastra-ai/mastra)

## 阅读本系列

1. **LLM 路由**（本文）
2. [安全与护栏](../mastra-security-guardrails)
3. [MCP 与工具集成](../mastra-mcp-tool-integrations)
4. [工作流与记忆](../mastra-workflows-memory)
````
