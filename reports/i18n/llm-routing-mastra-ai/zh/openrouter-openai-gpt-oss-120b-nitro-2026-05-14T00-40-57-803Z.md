# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.50
- Input tokens: 4205
- Output tokens: 1656
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000462
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 别和模型结婚
subTitle: "LLM 路由，热度正高 \U0001F680"
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
大多数工程团队会挑选一个语言模型并一直使用它。单一供应商、单一模型，处理所有任务。这就像雇一个人同时负责你的代码编写、文案写作和报税，因为他在第一次面试时表现不错。

在任何时刻，某个模型在代码上更强，另一个在处理冗长混乱的上下文上更好，还有一个是最便宜的普通工作马，专门做分类。模型的名字会变，但问题的本质不会。把唯一的模型当作全能选手使用，要么在简单任务上付出过高费用，要么在专业任务上得到次等结果。

我曾看到一个团队在情感分析上花费了数千美元，使用每百万 token 30 美元的模型，而 0.5 美元的模型完全可以胜任。简单的 JSON 格式化、基础分类任务，都走了他们的高价供应商。唯一“升温”的只有他们的 AWS 账单。

其实有更好的办法，而且并不复杂。

## 委派胜于盲目依赖

如果可以把请求路由到最适合该任务的模型会怎样？把昂贵的强力模型留给难题，而把简单的解析和格式化交给更便宜的模型。这样既能享受多供应商的优势，又无需在代码库里手动切换。

Mastra 正是为此而生。你可以为不同类型的工作定义专用代理，然后创建一个路由代理，让它判断每个请求该交给哪个专员。下面的模型 ID 仅作示例，并非排行榜。请用当前评估中表现最佳且符合预算的模型替换它们。

可以把它想象成团队里有三位专家：

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

每个代理都有自己的职责。代码代理应该是通过你仓库特定编码评估的模型；长上下文代理要能够在不把中间部分弄得一团糟的情况下处理真实文档；通用代理则需要便宜、可靠，并且以最“无聊”的方式稳定工作。

接下来就有意思了。你可以添加一个路由器，让它充当智能代理：

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

路由本身运行在轻量模型上，因为它只负责决定流量该发往何处。你并没有为挑选其他高价模型而支付溢价。也要对这块进行度量；一个糟糕的路由器会悄悄把节省的成本变成错误的分配。

当有人请求冒泡排序实现时，路由器会识别这是代码工作并交给你的代码专家。创意写作提示？则交给你为文风和表达范围挑选的模型。关于历史事件的事实性问题？则路由到通用代理，最好在需要新鲜度或引用时配合检索。

## 实际收益

**成本效率比想象中更重要。** 一个小型路由模型只负责委派决策，其费用仅是把每个请求都跑最贵提供商的零头。随着规模扩大，这会累计成真实的费用。只有在真正需要重型智能时才付费。

**质量随任务匹配而提升。** 胜出模型会随月份、任务和提示形态变化。这就是路由层应依据你的评估结果，而不是依据你写集成时 Twitter 上流行的模型。

**弹性成为副产品。** 当 OpenAI 遭遇周期性宕机（它们确实会出现）时，你的路由器可以把流量转向其他提供商。你不会因为等单一 API 恢复而陷入停滞。

这并不是为了炫技，而是构建在财务和技术上都合理的系统。你不会在所有建筑任务上都用同一把锤子，同理也不该在所有 AI 任务上使用同一个语言模型。

这种做法的美妙之处在于你的应用代码无需改动。你仍然只调用路由代理。决定哪个模型处理哪个任务的复杂性集中在一个位置，配置一次即可，而不是在代码库中散布大量条件逻辑。

### 资源

- [Mastra.ai Documentation](https://mastra.ai/docs)
- [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)

## 阅读系列

1. **LLM 路由**（本篇）
2. [安全与防护栏](../mastra-security-guardrails)
3. [MCP 与工具集成](../mastra-mcp-tool-integrations)
4. [工作流与记忆](../mastra-workflows-memory)
````
