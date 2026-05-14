# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/zh/index.mdx
- Validation: deferred
- Runtime seconds: 18.52
- Input tokens: 4599
- Output tokens: 2726
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.010478
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 缺少这个，你的 AI Agent 毫无用处
subTitle: 为什么说 MCP 是人工智能领域的 USB-C。
date: '2026-01-04'
modified: '2026-01-08'
tags:
  - ai
  - mcp
  - tools
  - integrations
  - mastra
  - salesforce
  - apis
category: AI
subCategory: Integration
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
你已经构建了一个 AI Agent。也许它表现还不错：提示词（Prompts）写得很扎实，模型响应飞快，对话感也很自然。

但接着，有人让它去 Salesforce 查一条客户记录，或者抓取最新的 Jira 工单，再或者搜索你的内部文档。

然后，你那完美的 Agent 就……哑火了。

这是每个 AI 平台最终都会撞上的集成难题。你的 Agent 需要“手”，需要能看清你实际业务系统的“眼睛”。没有这些，你运行的不过是一个昂贵的聊天机器人。

传统的解决方案？为你想连接的每一个服务编写自定义 API 封装。读文档、搞定鉴权、处理频率限制，还得祈祷他们下个月别改接口。然后针对下一个服务再来一遍。周而复始。

Model Context Protocol（MCP）彻底改变了这种博弈。

---

## MCP 到底解决了什么

想想 USB-C 普及之前的 USB 接口。你有 Mini-USB、Micro-USB、苹果的私有接口，还有一抽屉只能适配特定设备的线缆。USB-C 不仅仅是增加了一个新接口，它建立了一个标准，意味着任何线缆都能连接任何设备。

MCP 正在为 AI 工具集成做同样的事情。

你不再需要编写自定义代码来连接 Salesforce、HubSpot、GitHub 或任何其他服务，你只需实现一次协议（或者下载一个现成的服务端），任何兼容 MCP 的 Agent 就能立即与之通信。

该协议负责处理通信层。你只需要定义你的工具能做什么，以及它们需要什么数据。

---

## 设置多个集成

Mastra 通过其 [`MCPClient`](../mastra.ai/docs/mcp/overview) 提供了原生的 MCP 支持。你可以连接本地工具（作为子进程运行）和远程服务（运行在各自的基础设施上）。

这是一个连接 Google Maps 路由、天气服务和本地维基百科搜索的生产级配置示例：

```typescript
// src/mastra/mcp/index.ts
import { MCPClient } from '@mastra/mcp';

export const mcpClient = new MCPClient({
  servers: {
    // 本地工具 (Stdio)
    wikipedia: {
      command: 'npx',
      args: ['-y', 'wikipedia-mcp'],
    },
    // 地图与导航 (远程/HTTP)
    googleMaps: {
      url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
      requestInit: {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      },
    },
    // 天气服务集成
    weather: {
      url: new URL('https://mcp.weatherapi.dev/v1'),
      requestInit: {
        headers: {
          'X-API-Key': process.env.WEATHER_API_KEY!,
        },
      },
    },
  },
});
```

该客户端管理连接生命周期，处理本地工具的进程派生，并维护远程服务器的 HTTP 连接。你不需要直接处理 sockets 或 stdio。

---

## 将工具连接到智能体

配置好 MCP 客户端后，将这些工具交给智能体就变得非常简单：

```typescript
// src/mastra/agents/navigation-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { mcpClient } from '../mcp';

export const navigationDirectionsAgent = new Agent({
  id: 'navigation-directions-agent',
  name: 'Navigation & Directions Assistant',
  instructions: `You are a helpful navigation assistant that provides route planning and travel advice.
    - Always confirm the start and destination locations
    - Use Google Maps tools to find optimal routes
    - Check weather conditions along the route
    - Provide estimated travel times and suggest alternatives if weather is poor
    - Include relevant details like traffic, road conditions, and points of interest
    - Keep responses clear and actionable`,
  model: openai('gpt-5'),
  tools: await mcpClient.getTools(), // <--- 这行就是魔法所在
});
```

当用户询问：*“从旧金山到太浩湖的最佳路线是什么，我需要担心天气吗？”*

智能体会读取可用的工具定义，意识到它可以访问 Google Maps 路线规划和天气预报工具，然后使用正确的参数执行它们，并给出包含最佳路线及沿途当前天气状况的回答。

你一行 Google Maps API 代码或天气服务集成代码都没写。

---

## 针对每个用户的身份验证

这里很容易犯一个安全错误：硬编码凭据。

如果你在环境变量中只放一个 Google Maps API 密钥就完事了，那么所有用户都会共享同一个配额和速率限制。更重要的是，如果你使用的服务存储了用户偏好（如保存的地点或收藏的路线），所有人都会看到相同的数据。这在演示时没问题，但在生产环境中就是个隐患。

Mastra 通过允许你使用用户特定的凭据动态创建 MCP 客户端来解决这个问题：

```typescript
async function handleUserRequest(userPrompt: string, userCredentials: UserCreds) {
  // 为这个特定用户创建一个客户端
  const userMcp = new MCPClient({
    servers: {
      googleMaps: {
        url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
        requestInit: {
          headers: {
            // 用户特定的 API 密钥或令牌
            Authorization: `Bearer ${userCredentials.mapsApiKey}`,
            'X-User-ID': userCredentials.userId,
          },
        },
      },
    },
  });

  const agent = mastra.getAgent('navigationDirectionsAgent');
  
  // 在运行时注入工具
  const response = await agent.generate(userPrompt, {
    toolsets: await userMcp.getToolsets(),
  });

  return response;
}
```

每个用户都会获得自己独立的工具集，拥有自己的 API 配额和偏好设置。用户 A 保存的地点保持私有，用户 B 的路线历史记录相互隔离。这就是多租户 SaaS 智能体在实践中的运作方式。

---

## 构建复合工具

有时你需要将多个 MCP 工具组合成一个操作。例如，你可能想规划一条同时考虑实时路况和沿途天气状况的路线。

你可以将 MCP 工具封装在自定义工具定义中：

```typescript
export const smartRouteTool = createTool({
  id: 'smart-route-planner',
  description: 'Plans optimal route considering traffic and weather conditions',
  execute: async ({ context, mastra }) => {
    // 获取原始工具
    const tools = await mcpClient.getTools();
    
    // 1. 从 Google Maps 获取基础路线
    const routeData = await tools.googleMaps_getDirections.execute({ 
      context: { 
        origin: context.origin,
        destination: context.destination 
      } 
    });
    
    // 2. 检查沿途天气
    const weatherData = await tools.weather_getForecast.execute({
      context: { coordinates: routeData.waypoints }
    });
    
    // 3. 返回带有天气警报的增强路线
    return { 
      ...routeData, 
      weatherAlerts: weatherData.alerts,
      recommendation: weatherData.severe ? 'Consider delaying trip' : 'Safe to travel'
    };
  },
});
```

这让你能够精细控制工具之间的交互方式，同时仍然利用 MCP 协议来处理繁重的底层工作。

---

## 发展方向

为每个 AI Agent 需要对接的服务编写自定义 API 客户端从来都不是长久之计。这种做法扩展性极差，维护成本高，且会让你的平台被特定的实现细节深度绑定。

MCP 并非万灵药——身份验证依然复杂，频率限制（Rate Limiting）依然是必须考虑的问题，而且目前并非所有服务都提供了 MCP 服务端。但它建立了一个标准化的基础，显著降低了构建 Agent 平台的痛苦程度。

如果你正在架构一个需要与外部服务交互的 AI 系统，花时间深入理解 MCP 是非常值得的。

### 资源

- [Mastra MCP 文档](https://mastra.ai/docs/mcp/overview)
- [MCP 注册表](https://registry.modelcontextprotocol.io)
- [Klavis AI (企业级 MCP)](https://klavis.ai)
- [Mastra GitHub 仓库](https://github.com/mastra-ai/mastra)

## 阅读系列文章

1. [LLM 路由](../llm-routing-mastra-ai)
2. [安全与护栏](../mastra-security-guardrails)
3. **MCP 与工具集成** (本文)
4. [工作流与记忆](../mastra-workflows-memory)
````
