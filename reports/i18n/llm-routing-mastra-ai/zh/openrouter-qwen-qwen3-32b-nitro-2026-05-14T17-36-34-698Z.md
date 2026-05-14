# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/zh/index.mdx
- Validation: deferred
- Runtime seconds: 6.13
- Input tokens: 3075
- Output tokens: 2434
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000830
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 不要过度绑定模型
subTitle: LLM路由，如今非常热门
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
大多数工程团队会选择一个语言模型并一直使用它。一个供应商，一个模型，所有任务。这就像因为某人第一次面试表现不错，就雇佣他来为你编写代码、撰写文案并处理税务。

在任何时刻，某个模型可能在代码处理上表现最佳，另一个模型可能擅长处理长文本，第三个模型可能是分类任务中最便宜的工具。供应商名称会变化，但问题的本质不会改变。如果将一个模型视为全能型选手，意味着你要么为简单任务支付过高费用，要么在专业任务上得到次优结果。

我曾目睹一个团队在情感分析任务中使用每百万个token收费30美元的模型，而一个每百万个token仅0.5美元的模型就能同样完成任务。简单的JSON格式化、基础分类任务，全都通过他们的高端供应商处理。唯一不断上升的是他们的AWS账单。

有更好的方法，而且并不复杂。

## 委派优于忠诚

假设你可以将请求路由到最适合该任务的模型？将复杂任务交给昂贵的高性能模型，而将简单解析和格式化交给更便宜的模型。无需手动在代码库中切换多个供应商，即可享受多模型的优势。

Mastra让你构建这样的系统。你可以为不同类型的工作设置专业代理，然后创建一个路由代理来决定哪个专业代理处理每个请求。下方的模型ID仅为示例，不是排行榜。请根据当前通过你的评估并符合预算的模型进行替换。

想象这样：你的团队有三个专业成员。

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

每个代理都有明确职责。你的代码代理应是通过你仓库特定编码评估的模型。你的长文本代理应能处理实际文档而不会在中间段落中崩溃。你的通用代理应具备便宜、可靠且在最佳状态下无趣的特性。

有趣的是，你添加一个作为智能代理的路由器：

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

路由器本身运行在轻量模型上，因为它只需决定流量去向。你不需要为确定使用哪个高端模型而支付溢价。也要衡量这一点：糟糕的路由器会悄悄将节省转化为错误路由。

当有人请求冒泡排序实现时，路由器识别为代码任务并交给代码专家。创意写作提示？交给你为风格和范围选择的模型。关于历史事件的事实问题？路由到通用代理，最好在需要新鲜度或引用时结合检索。

## 实用优势

**成本效率比你想象的更重要。** 使用轻量路由模型进行决策，成本远低于将每个请求都通过最昂贵供应商处理。随着时间推移，尤其是在大规模场景下，这会积累成可观的节省。你只在真正需要时支付重型智能的费用。

**匹配模型与任务可提升质量。** 每月、每个任务、每个提示形状的优胜者都在变化。这就是为什么路由层应依赖你的评估，而不是某个模型在你集成时恰好在Twitter上流行。

**弹性成为附带收益。** 当OpenAI出现周期性宕机时（这确实会发生），你的路由器可以将流量重定向到其他供应商。你不必等待特定API恢复才能继续工作。

这并非为了聪明而聪明。这是构建在财务和技术上都合理的系统。你不会用同一把锤子处理所有建筑任务，也不应将同一语言模型用于所有AI任务。

这种方法的妙处在于你的应用代码无需修改。你仍然只需调用路由代理。决定使用哪个模型处理哪个任务的复杂性集中在一个配置点，而不是分散在代码库中的各种条件逻辑中。

### 资源

- [Mastra.ai 文档](https://mastra.ai/docs)
- [Mastra GitHub 仓库](https://github.com/mastra-ai/mastra)

## 阅读系列文章

1. **LLM 路由**（本文）
2. [安全与防护栏](../mastra-security-guardrails)
3. [MCP 与工具集成](../mastra-mcp-tool-integrations)
4. [工作流与记忆](../mastra-workflows-memory)
````
