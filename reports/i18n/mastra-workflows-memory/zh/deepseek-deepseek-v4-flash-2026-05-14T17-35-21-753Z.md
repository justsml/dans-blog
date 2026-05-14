# Translation Candidate
- Slug: mastra-workflows-memory
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-05--mastra-workflows-memory/zh/index.mdx
- Validation: deferred
- Runtime seconds: 20.89
- Input tokens: 5212
- Output tokens: 2657
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001421
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 别再构建不稳定的智能体：使用工作流与记忆
subTitle: 非确定性模型的确定性模式。
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
LLM 有一个奇怪的特点：它们擅长理解细微差别，但在遵循固定流程上表现糟糕。给 GPT-4 一个模糊的问题，它会推理各种可能性。给它一个精确的步骤序列，它可能会跳过第 3 步，因为第 5 步“感觉更相关”。

这不是模型本身的缺陷。这是概率系统试图解决确定性问题时的根本特征。

我见过很多团队在这个矛盾上挣扎。他们构建一个处理客户退款的智能体，给它十几个工具，期望它能可靠地执行业务流程。有时它完美运行。有时它幻觉出从未发生过的审批。有时它卡住，反复询问同样的信息三次。

解决方案不是更好的提示词。而是知道什么时候停止让 LLM“思考”，开始让它“服从”。

---

## 当确定性胜过创造性

想想处理一个支持工单时会发生什么。现实世界的业务逻辑大致如下：

1. 从数据库获取工单详情
2. 检查用户是否有资格退款（策略规则）
3. 验证交易存在且尚未退款
4. 计算退款金额
5. 处理支付撤销
6. 更新工单状态
7. 发送确认邮件

你可以把这个交给 LLM 作为工具调用练习。根据我的经验，这是自找麻烦。模型可能认为步骤 2 和 3“基本上是同一件事”而跳过其中一个。或者它可能在检查资格之前就处理退款，因为用户看起来很着急。

工作流正是为这种场景而存在的。它们并不令人兴奋，但这正是关键所在。

### 构建一个天气活动规划器

这里有一个实际例子展示了这种模式。我们需要硬性的、事实性的天气数据，配合创造性的活动建议。天气获取永远不应有创造性，但建议应该如此。

```typescript
// src/mastra/workflows/activity-planner.ts
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Step 1: Fetch weather data (Deterministic)
const fetchWeather = createStep({
  id: 'fetch-weather',
  description: 'Fetches weather forecast for a given city',
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
    // ... (fetch logic) ...
    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code&daily=precipitation_probability_mean`).then(r => r.json());
    
    return {
      location: inputData.city,
      temperature: weather.current.temperature_2m,
      conditions: getWeatherCondition(weather.current.weather_code),
      precipitationChance: weather.daily.precipitation_probability_mean[0],
    };
  },
});

// Step 2: Agent suggests activities (Creative)
const activityPlanner = new Agent({
  id: 'activity-planner-agent',
  name: 'Activity Planner',
  instructions: `You are a local activities expert. Based on weather conditions, suggest 3-5 appropriate activities.
    - For rain (>50% precipitation), prioritize indoor activities
    - For extreme temperatures, consider climate-appropriate options
    - Always include one adventurous and one relaxing option`,
  model: openai('gpt-5'),
});

const planActivities = createStep({
  id: 'plan-activities',
  description: 'Uses AI to suggest activities based on weather',
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
    const prompt = `Weather in ${inputData.location}: ${inputData.temperature}°C...`;
    const response = await activityPlanner.generate(prompt);
    return { activities: response.text };
  },
});

// The Pipeline
export const activityPlannerWorkflow = createWorkflow({
  id: 'activity-planner',
  inputSchema: z.object({ city: z.string() }),
  outputSchema: z.object({ activities: z.string() }),
})
  .then(fetchWeather)
  .then(planActivities);

activityPlannerWorkflow.commit();
```

LLM 从不接触天气 API。它获得真实数据作为输入，然后做它真正擅长的事情：给出上下文相关的建议。如果你反过来，让智能体自己去获取天气数据，你最终会在下雨天得到晴天预报。

**何时考虑使用工作流：**
- 你有一个已知的步骤序列，必须按顺序执行
- 你需要在每个阶段有可观测性（日志、指标、时序）
- 你需要对不稳定的外部 API 进行重试逻辑
- 业务规则不能被“解释”——它们必须被精确遵循

---

## 没人谈论的上下文窗口问题

我经常看到这种模式。有人构建了一个聊天机器人。测试时运行得很好。但在生产环境中，用户进行更长的对话，机器人突然就迷失了。

开发者查看日志，发现他们每次请求都发送了整个对话历史。全部 47 条消息。他们在浪费 token 和上下文空间，用于大部分无关的信息。

更糟糕的是，研究人员称之为“中间迷失”的现象：当相关信息被埋藏在长上下文中时，模型表现更差。模型简直是“只见树木，不见森林”。

发送完整对话历史看似安全——你给了模型“所有信息”。但实际上，你让模型更难聚焦于真正重要的内容。

### 工作记忆 vs. 长期存储

Mastra 的记忆系统同时提供了两种能力。工作记忆在上下文窗口中保留最近的消息。语义召回则在当前查询看似相关时，搜索历史消息。

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
      lastMessages: 20,  // 在上下文中保留最近20条消息
      semanticRecall: {
        enabled: true,  // 使用嵌入向量查找旧内容
        topK: 5,
        threshold: 0.7,
      },
    },
  }),
});
```

实际运行效果如下。用户问：“你上个月推荐的那家意大利餐厅叫什么来着？”

如果没有语义召回，智能体只能看到最近20条消息。那条餐厅推荐是第487条消息，总共506条。它已经丢失了。智能体回答：“我没有那个信息。”

有了语义召回：
1. 查询被嵌入为向量：`[0.234, -0.567, 0.891, ...]`
2. 该嵌入向量与历史消息进行比对
3. 第487条消息（“我推荐Trattoria Bella——他们的carbonara意面棒极了”）相似度得分0.89
4. 这条消息被注入当前上下文
5. 智能体回答：“我推荐了Trattoria Bella。他们的carbonara意面让我印象深刻。”

智能体看起来拥有完美的记忆，却只用了上下文窗口的一小部分。这不仅仅是巧妙的工程——一旦对话超过几十条消息，这实际上是功能上的必需品。

---

## 通过智能体网络进行协调

有时你需要同时具备结构性和灵活性。纯工作流太死板。纯智能体太不可预测。

智能体网络提供了一个协调者，它根据任务决定调用哪个专门的智能体或工作流。可以把它看作AI能力的智能负载均衡器。

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
  
  // 可用的原语
  agents: { researchAgent, writingAgent },
  workflows: { activityPlannerWorkflow },
  tools: { weatherTool },
  
  // 网络需要记忆
  memory: new Memory({
    storage: new LibSQLStore({ id: 'network-store', url: 'file:../network.db' }),
  }),
});
```

当你查询这个网络时，协调者分析请求并相应路由：
- “我需要关于X的事实” → 触发研究智能体
- “规划一个西雅图周末” → 运行活动规划工作流
- “写一份关于Y的报告” → 调用写作智能体

这种模式比试图把所有东西塞进一个巨型智能体更具可扩展性。专门的智能体发展出专注的专业知识。协调者负责路由。每个部分做自己擅长的事。

---

## 整合起来

真正的生产级AI系统需要架构，而不仅仅是提示词。你正在构建分布式系统，其中某些节点恰好是LLM。

工作流在你需要事情精确执行时提供保证。记忆让你在不烧光token预算的情况下保持上下文。智能体网络让你从简单的部件组合出复杂性。

这些都不光鲜亮丽。但在目睹了太多“全自主智能体”在生产环境中翻车之后，我愈发珍视无聊的可靠性，而非刺激的不可预测性。

你的情况可能不同，但根据我的经验，那些真正能上线并持续运行的系统，都是把LLM当作更大架构中的组件来对待，而不是能解决一切的魔法黑箱。

### 资源

- [Mastra 工作流文档](https://mastra.ai/docs/workflows/overview)
- [Mastra 记忆文档](https://mastra.ai/docs/memory/overview)
- [完整演示代码](https://github.com/justsml/mastra-examples)

## 阅读本系列

1. [LLM 路由](/llm-routing-mastra-ai)
2. [安全与护栏](/mastra-security-guardrails)
3. [MCP 与工具集成](/mastra-mcp-tool-integrations)
4. **工作流与记忆**（本文）
````
