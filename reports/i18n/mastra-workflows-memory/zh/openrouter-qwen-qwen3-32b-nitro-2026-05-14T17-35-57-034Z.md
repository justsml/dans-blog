# Translation Candidate
- Slug: mastra-workflows-memory
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-05--mastra-workflows-memory/zh/index.mdx
- Validation: deferred
- Runtime seconds: 10.96
- Input tokens: 5213
- Output tokens: 4242
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001435
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 停止构建不稳定代理：使用工作流和记忆
subTitle: 非确定性模型的确定性模式
date: '2026-01-05'
modified: '2026-01-08'
tags:
  - ai
  - workflows
  - memory
  - mastra
  - agent-networks
  - orchestration
category: AI
subCategory: Architecture
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
LLM 有一个奇怪的特性：它们擅长理解细微差别，但不擅长遵循既定流程。给 GPT-4 一个模糊的问题，它会推导出各种可能性。给它一个精确的步骤序列，它可能会跳过第3步，因为第5步"看起来更相关"。

这不是模型的缺陷。这是概率系统试图解决确定性问题的根本特征。

我曾目睹团队在处理这种不匹配时的挣扎。他们构建了一个处理客户退款的代理，配备了十几个工具，期望它能可靠地执行业务流程。有时它完美运行，有时它会编造从未发生的审批，有时它会反复询问相同的信息。

解决方案不是更好的提示词。而是要知道何时停止要求 LLM "思考"，开始要求它"服从"。

---

## 确定性胜过创造力的场景

设想你需要处理一个客服工单。现实世界的业务逻辑大致如下：

1. 从数据库获取工单详情
2. 检查用户是否符合退款条件（政策规则）
3. 验证交易是否存在且未被退款
4. 计算退款金额
5. 处理支付撤销
6. 更新工单状态
7. 发送确认邮件

你可以将这个流程交给 LLM 作为工具调用练习。但根据我的经验，这是在自找麻烦。模型可能会认为步骤2和3"本质上是同一件事"并跳过其中一个。或者它可能在未检查资格的情况下直接处理退款，因为用户看起来很沮丧。

工作流系统正是为这种场景而生。它们可能不那么炫酷，但这就是重点。

### 构建天气活动规划器

这是一个展示该模式的实用示例。我们需要准确的天气数据配合创造性的活动建议。天气获取必须严格，但建议可以有创意。

```typescript
// src/mastra/workflows/activity-planner.ts
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// 步骤1：获取天气数据（确定性）
const fetchWeather = createStep({
  id: 'fetch-weather',
  description: '获取指定城市的天气预报',
  inputSchema: z.object({
    city: z.string(),
  }),
  outputSchema: z.object({
    location: z.string(),
    temperature: z.number(),
    conditions: z.string(),
    precipitationChance: z.number(),
  }),
  execute: async ({ inputData }) => {
    // ... (获取逻辑) ...
    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code&daily=precipitation_probability_mean`).then(r => r.json());
    
    return {
      location: inputData.city,
      temperature: weather.current.temperature_2m,
      conditions: getWeatherCondition(weather.current.weather_code),
      precipitationChance: weather.daily.precipitation_probability_mean[0],
    };
  },
});

// 步骤2：代理建议活动（创造性）
const activityPlanner = new Agent({
  id: 'activity-planner-agent',
  name: '活动规划器',
  instructions: `你是一个本地活动专家。根据天气条件，建议3-5个合适的活动。
    - 下雨时（>50%降水概率），优先推荐室内活动
    - 极端温度时，考虑气候适应性选项
    - 始终包含一个冒险活动和一个放松活动`,
  model: openai('gpt-5'),
});

const planActivities = createStep({
  id: 'plan-activities',
  description: '根据天气使用AI建议活动',
  inputSchema: z.object({
    location: z.string(),
    temperature: z.number(),
    conditions: z.string(),
    precipitationChance: z.number(),
  }),
  outputSchema: z.object({
    activities: z.string(),
  }),
  execute: async ({ inputData }) => {
    const prompt = `天气在 ${inputData.location}: ${inputData.temperature}°C...`;
    const response = await activityPlanner.generate(prompt);
    return { activities: response.text };
  },
});

// 管道
export const activityPlannerWorkflow = createWorkflow({
  id: 'activity-planner',
  inputSchema: z.object({ city: z.string() }),
  outputSchema: z.object({ activities: z.string() }),
})
  .then(fetchWeather)
  .then(planActivities);

activityPlannerWorkflow.commit();
```

LLM 从不直接调用天气API。它接收真实天气数据作为输入，然后专注于自己真正擅长的事情：提供情境化建议。如果你反过来让代理获取天气数据，最终会得到错误的晴天预报，而实际上正在下雨。

**考虑使用工作流的场景：**
- 你有必须按顺序执行的已知步骤序列
- 需要每个阶段的可观测性（日志、指标、耗时）
- 需要处理不可靠的外部API的重试逻辑
- 业务规则不能被"解释" - 必须严格遵循

---

## 没有人讨论的上下文窗口问题

我经常看到这种模式。有人构建了一个聊天机器人。测试时表现良好。但上线后，用户对话变长，机器人突然迷失了。

开发人员查看日志后发现，他们每次请求都发送了完整的对话历史。全部47条消息。他们消耗了大量token和上下文空间，而这些信息大多无关紧要。

更糟糕的是，研究人员称之为"迷失在中间"的现象：当相关信息被埋藏在长上下文中时，模型的表现会变差。模型实际上无法在长上下文中看到关键信息。

发送完整对话历史看似安全。你是在给模型"所有信息"。但你实际上让模型更难专注于真正重要的内容。

### 工作记忆 vs 长期存储

Mastra的记忆系统提供了这两种能力。工作记忆将最近的消息保留在上下文窗口中。语义回忆则在当前查询与历史消息相关时进行搜索。

```typescript
// src/mastra/agents/memory-agent.ts
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const memoryAgent = new Agent({
  id: 'memory-agent',
  name: 'Memory Agent',
  instructions: 'You are a helpful assistant with perfect recall of our conversations.',
  model: openai('gpt-5'),
  memory: new Memory({
    storage: new LibSQLStore({
      id: 'memory-agent-store',
      url: 'file:../mastra.db',
    }),
    options: {
      lastMessages: 20,  // Keep last 20 messages in context
      semanticRecall: {
        enabled: true,  // Use embeddings to find old stuff
        topK: 5,
        threshold: 0.7,
      },
    },
  }),
});
```

这种设计在实际中如何运作？用户提问："上个月你推荐的那家意大利餐厅叫什么？"

没有语义回忆时，代理只能看到最近的20条消息。餐厅推荐是506条消息中的第487条。信息丢失了。代理会回答"我没有这些信息"。

启用语义回忆后：
1. 查询被嵌入：`[0.234, -0.567, 0.891, ...]`
2. 嵌入向量与历史消息比较
3. 第487条消息（"我推荐Trattoria Bella - 他们的Carbonara非常棒"）相似度得分为0.89
4. 该消息被注入当前上下文
5. 代理回复："我推荐了Trattoria Bella。他们的Carbonara让我印象深刻"

代理在仅使用部分上下文窗口的情况下展现出完美记忆。这不是简单的工程技巧 - 一旦对话超过几十条消息，这种设计就成为功能上的必要条件。

---

## 通过代理网络进行协调

有时你需要结构与灵活性的结合。纯工作流太僵硬。纯代理又太不可预测。

代理网络为你提供协调器，根据任务决定调用哪个专用代理或工作流。可以将其视为AI能力的智能负载均衡器。

```typescript
export const coordinatorAgent = new Agent({
  id: 'coordinator-agent',
  name: 'Research Coordinator',
  instructions: `You are a network of researchers and writers.
    - Use researchAgent for gathering facts
    - Use writingAgent for producing final content
    - Use weatherTool for current weather data
    - Use activityPlannerWorkflow for location-based planning
    
    Always produce comprehensive, well-structured responses.`,
  model: openai('gpt-5'),
  
  // Available primitives
  agents: { researchAgent, writingAgent },
  workflows: { activityPlannerWorkflow },
  tools: { weatherTool },
  
  // Network requires memory
  memory: new Memory({
    storage: new LibSQLStore({ id: 'network-store', url: 'file:../network.db' }),
  }),
});
```

当你查询这个网络时，协调器会分析请求并进行路由：
- "我需要关于X的事实" 触发研究代理
- "计划在西雅图度过周末" 运行活动规划工作流
- "撰写关于Y的报告" 启动写作代理

这种模式比试图将所有功能塞进单个巨型代理更具扩展性。专用代理发展出专注的专业能力。协调器处理路由。每个组件都做自己最擅长的事。

---

## 组合实践

真正的生产级AI系统需要架构，而不仅仅是提示词。你正在构建分布式系统，其中某些节点恰好是LLM。

工作流在需要精确执行时提供保证。记忆系统在不消耗token预算的情况下提供上下文。代理网络让你能从简单组件组合出复杂系统。

这些都不够炫酷。但目睹了足够多“完全自主的代理”在生产环境中失败后，我开始欣赏枯燥的可靠性胜过令人兴奋的不可预测性。

你的具体情况可能不同，但就我的经验而言，真正能够落地并持续运行的系统，是那些将LLM视为更大架构中的组件，而非能解决一切问题的魔法黑盒的系统。

### 资源

- [Mastra 工作流文档](https://mastra.ai/docs/workflows/overview)
- [Mastra 记忆系统文档](https://mastra.ai/docs/memory/overview)
- [完整演示代码](https://github.com/justsml/mastra-examples)

## 阅读系列文章

1. [LLM 路由](../llm-routing-mastra-ai)
2. [安全与防护措施](../mastra-security-guardrails)
3. [MCP 与工具集成](../mastra-mcp-tool-integrations)
4. **工作流与记忆系统**（本文）
````
