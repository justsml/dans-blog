# Translation Candidate
- Slug: mastra-workflows-memory
- Locale: zh
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-05--mastra-workflows-memory/zh/index.mdx
- Validation: deferred
- Runtime seconds: 38.08
- Input tokens: 6679
- Output tokens: 4072
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.001689
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 停止构建脆弱代理：使用工作流和记忆
subTitle: 非确定性模型的确定性模式。
modified: '2026-09-04'
tags:
  - ai
  - workflows
  - memory
  - mastra
  - supervisor-agents
  - orchestration
category: AI
subCategory: Architecture
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
LLM 有个诡异的性质：它们擅长理解微妙之处，却极不擅长照章办事。给一个强模型一个模糊的问题，它会推理各种可能性。给它一串精确的执行步骤，它却可能跳过步骤3，因为步骤5 "感觉更相关"。

这不是模型的缺陷。这是概率系统试图解决确定性问题时的根本特性。

我见过很多团队在与这种错配作斗争。他们构建一个处理客户退款的 Agent，给它十几个工具，期望它能可靠地执行一套业务流程。有时它完美运行。有时它凭空杜撰出从未发生过的审批。有时它卡住，三次询问同一个信息。

解决方案不是更好的提示词。而是知道什么时候让 LLM "思考"、什么时候告诉它 "服从"。

---

## 当确定性胜过创造性

想想当你需要处理一个支持工单时会发生什么。真实的业务逻辑大概像这样：

1. 从数据库获取工单详情
2. 检查用户是否符合退款条件（策略规则）
3. 验证交易是否存在且尚未被退款
4. 计算退款金额
5. 执行支付冲正
6. 更新工单状态
7. 发送确认邮件

你可以把这个流程交给 LLM 作为一个工具调用练习。以我的经验，那是在自找麻烦。模型可能会认为步骤2和步骤3 "本质上是一回事" 而跳过其中一个。或者因为用户看起来着急，它在检查资格之前就处理了退款。

工作流恰好就是为此场景而生的。它们不令人兴奋，但这正是关键。

### 构建一个天气活动规划器

这里有一个实际例子，展示了这种模式。我们需要硬性的、事实性的天气数据，配合创造性的活动建议。获取天气永远不应该是创造性的，但建议却应该是。

```typescript
// src/mastra/workflows/activity-planner.ts
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { Agent } from '@mastra/core/agent';
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
    const coordinates = await geocodeCity(inputData.city);
    const params = new URLSearchParams({
      latitude: String(coordinates.latitude),
      longitude: String(coordinates.longitude),
      current: 'temperature_2m,weather_code',
      daily: 'precipitation_probability_mean',
      timezone: 'auto',
    });

    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
      .then(r => r.json());
    
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
  model: 'openai/gpt-5.5',
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
  .then(planActivities)
  .commit();
```

`geocodeCity()` 是普通的应用代码或 Maps API 调用；不是模型决策。LLM 从不接触天气 API。它接收真实数据作为输入，然后做它真正擅长的事：提出上下文相关的建议。如果你反过来，让 Agent 自己去取天气数据，最终你会得到一份晴天的预报，而实际上正在下雨。

**什么时候考虑用工作流：**
- 你有一个已知的、必须按顺序执行的步骤序列
- 你需要在每个阶段都有可观测性（日志、指标、计时）
- 你需要为不稳定的外部 API 添加重试逻辑
- 业务规则不能被 "解释" —— 它们必须被精确执行

---

## 那个没人谈论的上下文窗口问题

我不断看到这种模式。有人构建了一个聊天机器人。测试时它表现很好。上线后，用户进行了更长的对话，突然机器人就迷路了。

开发者查看日志，发现他们每次请求都发送了完整的对话历史。所有 47 条消息。他们正在消耗巨量的 token 和上下文空间，来传递大多无关的信息。

更糟糕的是，研究人员发现一种称为“中间迷路”的现象——当相关信息被埋藏在长上下文中时，模型表现会更差。模型 literally 会“只见树木，不见森林”。

发送完整的对话历史感觉上很安全。你给了模型“所有信息”。但实际上你让模型更难聚焦在重要内容上。

### 最近消息、工作记忆与语义回忆

Mastra 的记忆系统将团队经常混在一起做的几件事拆分开来。`lastMessages` 提供最近几轮的消息历史。工作记忆存储持久的结构化事实，比如用户偏好、目标和项目状态。语义回忆在当前查询似乎相关时，按含义搜索较早的消息。观察记忆则更进一步，针对长对话将旧原始历史压缩成密集的观察摘要，用于长期运行。

```typescript
// src/mastra/agents/memory-agent.ts
import { Agent } from '@mastra/core/agent';
import { ModelRouterEmbeddingModel } from '@mastra/core/llm';
import { Memory } from '@mastra/memory';
import { LibSQLStore, LibSQLVector } from '@mastra/libsql';

export const memoryAgent = new Agent({
  id: 'memory-agent',
  name: 'Memory Agent',
  instructions: 'You are a helpful assistant with perfect recall of our conversations.',
  model: 'openai/gpt-5.5',
  memory: new Memory({
    storage: new LibSQLStore({
      id: 'memory-agent-store',
      url: 'file:./mastra.db',
    }),
    vector: new LibSQLVector({
      id: 'memory-agent-vector',
      url: 'file:./mastra.db',
    }),
    embedder: new ModelRouterEmbeddingModel('openai/text-embedding-3-small'),
    options: {
      lastMessages: 20,
      workingMemory: {
        enabled: true,
      },
      semanticRecall: {
        topK: 5,
        messageRange: 2,
        scope: 'resource',
      },
      observationalMemory: true,
    },
  }),
});
```

一个操作层面的注释：`observationalMemory: true` 目前默认使用 `google/gemini-2.5-flash` 作为观察模型。这意味着这个本来由 OpenAI 支撑的 agent 还需要 Google 模型访问权限，会产生独立的模型调用费用，并可能将对话历史发送给第二个提供商。在生产环境中，请明确配置观察记忆模型，并对该选择进行与主 agent 模型相同的凭证、成本、数据驻留和数据保留审查。

下面看看实际效果。用户问：“上个月你推荐的那家意大利餐厅叫什么来着？”

如果没有语义回忆或观察记录，agent 只能看到最近 20 条消息。那条餐厅推荐是第 487 条消息（总共 506 条），已经丢失了。Agent 回答：“我没有那个信息。”

启用语义回忆后：
1. 查询被嵌入成向量：`[0.234, -0.567, 0.891, ...]`
2. 该嵌入与历史消息进行相似度比较
3. 第 487 条消息（“我推荐 Trattoria Bella——他们的 carbonara 非常棒”）的相似度得分 0.89
4. 该消息被注入到当前上下文中
5. Agent 回答：“我推荐过 Trattoria Bella。他们的 carbonara 让我印象深刻。”

Agent 看起来拥有完美的记忆，却只用了上下文窗口的一小部分。这不仅仅是巧妙的工程——当对话超过几十条消息时，这在功能上是必需的。

---

## 通过监督 Agent 进行协调

有时你需要同时拥有结构和灵活性。纯工作流太死板。纯 agent 太不可预测。

监督 Agent 为你提供一个协调器，决定哪个专门的 agent、工作流或工具应该执行下一步。可以把它想象成 AI 能力的智能负载均衡器。

```typescript
const researchAgent = new Agent({
  id: 'research-agent',
  description: 'Gathers facts and returns sourced research notes.',
  model: 'openai/gpt-5-mini',
});

const writingAgent = new Agent({
  id: 'writing-agent',
  description: 'Turns research notes into clear, structured prose.',
  model: 'openai/gpt-5-mini',
});

export const coordinatorAgent = new Agent({
  id: 'coordinator-agent',
  name: 'Research Coordinator',
  instructions: `You coordinate researchers, writers, tools, and workflows.
    - Delegate fact gathering to research-agent
    - Delegate final prose to writing-agent
    - Use weatherTool for current weather data
    - Use activityPlannerWorkflow for location-based planning
    
    Always produce comprehensive, well-structured responses.`,
  model: 'openai/gpt-5.5',
  
  // Available primitives
  agents: { researchAgent, writingAgent },
  workflows: { activityPlannerWorkflow },
  tools: { weatherTool },
  
  // Supervisor state and delegation traces need somewhere durable to land.
  memory: new Memory({
    storage: new LibSQLStore({ id: 'supervisor-store', url: 'file:./supervisor.db' }),
  }),
});
```

当你向这个监督者发起查询时，它会分析请求并相应路由：
- “我需要关于 X 的事实” -> 触发研究 agent
- “规划一个西雅图的周末” -> 运行活动规划工作流
- “写一份关于 Y 的报告” -> 调用写作 agent

这种模式比试图把所有东西塞进一个巨型 agent 要好扩展得多。专门的 agent 会发展出专注的专业知识。协调器负责路由。每个部分都做自己擅长的事。

---

## 整合在一起

真正的生产级 AI 系统需要架构，而不仅仅是提示词。你正在构建分布式系统，其中某些节点恰好是 LLM。

工作流在需要事情精确执行时给你保证。内存在不烧掉你的 token 预算的情况下提供上下文。监督者 agent 让你从简单的部分组合出复杂性。

这些都不炫酷。但看过足够多的“完全自主 agent”在生产中失败后，我开始欣赏无聊的可靠性胜过刺激的不可预测性。

你的体验可能不同，但根据我的经验，真正交付并持续运行的系统是那些把 LLM 视为更大架构中的组件，而非解决一切的魔法盒子的系统。

### 资源

- [Mastra 工作流文档](https://mastra.ai/docs/workflows/overview)
- [Mastra 记忆文档](https://mastra.ai/docs/memory/overview)
- [Mastra 监督者 Agent](https://mastra.ai/docs/agents/supervisor-agents)
- [Mastra 语义召回](https://mastra.ai/docs/memory/semantic-recall)

## 阅读系列

1. [LLM 路由](/llm-routing-mastra-ai)
2. [安全与护栏](/mastra-security-guardrails)
3. [MCP 与工具集成](/mastra-mcp-tool-integrations)
4. **工作流与记忆**（本文）
````
