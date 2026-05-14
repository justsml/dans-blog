# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/zh/index.mdx
- Validation: deferred
- Runtime seconds: 75.41
- Input tokens: 17916
- Output tokens: 10737
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.005198
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: LLM生成式UI概览v2
subTitle: 从工具到组件的渲染，再到开放式生成——一张地图，展示每种方法及其复杂性在何时物有所值。
date: '2026-05-10'
modified: '2026-05-10'
tags:
  - ai
  - llm
  - generative-ui
  - agents
  - frontend
  - protocols
  - react
  - ag-ui
  - a2ui
  - copilotkit
  - json-render
  - mcp
category: AI
subCategory: Frontend
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.9
---
"生成式 UI"这个词，不同的人说出来至少指代五种截然不同的东西。

- 嵌入产品卡片的聊天界面，来自模型工具调用
- 运行时 JSON 规范，前端将其渲染为组件树
- MCP 工具返回的沙箱化 iframe，嵌入到宿主应用中（从票务订购、酒店预订到地图渲染、结账小部件）
- 将智能体状态流式传输到前端的事件协议
- v0、Lovable 和 Bolt：在设计时编写 React 的 AI 工具

这些概念相互关联，但它们位于技术栈的不同层级，具有不同的风险特征、不同的实现成本以及不同的适用场景。将它们混为一谈，会让每一次架构讨论都变成一团乱麻。

当我在决定应该在技术栈的哪个层级下手时，这就是我想要的路线图。

---

## 生成式 UI 不是什么

在定义它是什么之前，先排除三件事：

**设计时代码生成**——v0、Lovable、Bolt、Cursor 组合 React 组件。这些工具生成代码，由开发者审查并提交。AI 在开发时运行。从用户角度看，最终交付的内容是静态的。这是一类很棒的工具体系。但它不是“运行时生成式 UI”的含义。

**AI 辅助表单自动填充**——模型根据上下文填写字段值。界面的结构仍然是固定的；只有内容在变化。这是一个有用的模式。但它不是生成式 UI。

**AI 将原始 HTML 写入页面**——模型输出 `<div>` 和 `<button>` 字符串，通过 `innerHTML` 或 `dangerouslySetInnerHTML` 注入。从最技术性的意义上说，这*是*运行时生成式 UI。但它也是最危险的版本，也是这个领域中每个成熟框架都在努力避免的。AI 生成的原始标记意味着 XSS 风险、不可访问的属性、不一致的样式以及幻觉结构。本文的其余部分将讨论如何做得比这更好。

---

## 一个可用的定义

运行时生成式 UI 意味着：**模型根据对话或任务的状态，决定用户看到什么界面组件或组件组合。**

不是文字。是界面。

最简单的例子：你的航班预订助手调用了一个 `search_flights` 工具。它没有返回纯文本（“这里有三个选项……”），而是渲染了一个 `<FlightResultsCard>` 组件，其中包含可选择的航班、舱位切换按钮和一个“预订”按钮。模型决定在这里使用一个结构化卡片是合适的响应。开发者决定了那张卡片长什么样，以及“预订”按钮做什么。

更复杂的例子：一个财务分析智能体收到一个关于投资组合的问题，并决定组合一个响应，包含一个显示关键数字的 `MetricGroup`、一个 `RiskBreakdown` 图表、一个 `ScenarioComparison` 表格以及一个 `PolicyNotice`。模型从一个预批准的组件目录中组装了那个布局。开发者定义了每一个组件。模型选择了使用哪些组件以及向它们填入什么数据。

这两种情况都是生成式 UI。它们的区别在于模型拥有多少组合自由度，这决定了可能输出的丰富程度以及可能出错的复杂性。

## 三种模式

整个空间可归纳为三种模式，每种模式对应不同的输出语法。

![频谱图展示三种模式：左侧仅工具调用（最安全），中间为组件目录，右侧为开放式生成（最具表现力）。](../output-grammar-spectrum.svg)

_每个生成式 UI 决策都是这个频谱上的一个点。从左侧开始。_

### 模式 1：工具到组件渲染

模型调用一个命名工具。你的应用程序有一个从工具名称到组件的映射。工具调用触发组件渲染。

```tsx
// 模型调用：{ name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

这是最安全的模式，因为布局永远不会来自模型。模型决定*何时*显示组件以及*用什么数据*填充它。你的开发者仍然拥有组件代码、视觉设计、无障碍实现以及渲染逻辑中的每一个边界情况。

Vercel AI SDK 的 `useChat` 配合 `tool` 处理器就是这样做的。assistant-ui 的工具渲染也是如此。CopilotKit 的“静态生成式 UI”就是这种模式。大多数在生产中可靠运行的 copilot UI 都在使用它。

**适用场景**：你可能会想展示的内容集在开发时是可预知的。预订确认、搜索结果、账户摘要、审批小部件。如果你能枚举出这些场景，这种模式就能覆盖它们。

### 模式 2：组件目录组合

模型发出一个类型化的 JSON 树，引用开发者定义的目录中的组件。你的前端有一个渲染器，遍历该树并实例化每个组件。

```json
[
  { "type": "metric_group", "metrics": [
    { "label": "MRR", "value": "$82,400", "delta": "+12%" },
    { "label": "Churn", "value": "2.1%", "delta": "-0.4%" }
  ]},
  { "type": "line_chart", "title": "30-day growth", "data_ref": "mrr_series" },
  { "type": "insight_callout", "text": "Expansion revenue driving the delta — avg seat count up 18%." }
]
```

模型组合了那个布局。一个 `MetricGroup`、一个 `LineChart`、一个 `InsightCallout`。但你定义了每个组件类型意味着什么、它接受什么 props 以及它如何渲染。如果模型试图发出 `{ "type": "custom_untested_thing" }`，你的 schema 验证会捕获它，渲染器会忽略或拒绝它。

这是 `json-render`、`A2UI`、`Hashbrown`、`OpenUI` 和 `Tambo` 背后的模式。关键的工程工作是**目录设计**——决定存在哪些组件类型、它们的 schema 是什么、以及模型允许和不允许组合什么。

**适用场景**：你想要展示的内容结构确实会根据数据或用户请求而变化。根据数字中值得注意的内容自适应调整的仪表盘。根据上下文显示不同部分的报告。根据智能体所处的步骤而改变的工作流面板。

### 模式 3：开放式生成

模型编写 HTML、SVG、Canvas 或 WebGL，这些内容在具有严格内容安全策略的沙箱 iframe 中渲染。

这适用于任何固定组件目录都无法满足的场景：算法可视化、架构图、临时图表、生成式艺术、教育模拟。iframe 边界在这里承担安全职责；去掉它，你就回到了本文开头提到的原始 HTML 注入问题。

`CopilotKit/OpenGenerativeUI` 是目前这种模式的最佳参考实现。沙箱会剥离脚本、限制消息传递，并将生成的工件与应用程序的特权状态隔离开来。

**适用场景**：你确实需要任意视觉输出——一次性解释性图表、动态模拟、创意工件。不要将其用于事务性UI。结账确认不需要沙箱iframe。

### 超越三种模式：LLM直接驱动像素

有一种新兴的第四方向，不完全符合上述任何模式：LLM通过比沙箱iframe更直接地控制视觉输出，驱动**沉浸式、游戏化体验**。

生成式UI中的经典区分是**iframe HTML 与 JSON 目录**：

- **iframe HTML**——模型编写HTML、SVG、Canvas或WebGL，在隔离沙箱中渲染。最大表达自由度；安全性完全依赖iframe边界。示例：Anthropic Artifacts、OpenGenerativeUI。
- **JSON目录**——模型输出受开发者定义组件目录约束的结构化负载；你的渲染器根据该规范实例化可信的、预构建的组件。模型决定*展示什么*；你决定*如何渲染*。示例：json-render、A2UI。

除此之外，最近的演示暗示了第三种模式：模型不是选择组件或编写沙箱HTML，而是更直接地驱动画布。像[腾讯的混元世界](https://arxiv.org/abs/2502.01999)（从单张图像生成可探索3D环境）和游戏架构（LLM在运行时生成地图、NPC和任务，而非调用组件目录）这样的项目，暗示了一个未来：模型更像游戏导演而非表单渲染器。通过WebGPU在浏览器内进行LLM推理（[WebLLM](https://mlc.ai/web-llm/)）也在本地推动同一前沿。

这个领域确实令人兴奋，也确实处于早期阶段。目前还没有稳定的框架可用于构建生产产品。一旦情况发生变化，我会在专门的文章中介绍这种方法。

---

## 完整生态系统

![四层图，映射所有主要生成式UI工具：协议层（AG-UI、A2UI、MCP Apps）位于顶部，JavaScript应用壳层（CopilotKit、Vercel AI SDK、assistant-ui、LangGraph）其次，JavaScript目录工具层（json-render、Hashbrown、OpenUI、Tambo）再次，Python工具层（Gradio、Streamlit、LangChain、Haystack）位于底部。](../full-stack-map.svg)

_四层。协议定义线缆格式。应用壳管理状态和渲染。目录工具约束模型可生成的内容。Python工具是数据和ML工作流的并行轨道。_

---

## 协议：AG-UI 与 A2UI

AG-UI 和 A2UI 是协议层的两个主要标准。它们解决不同的问题，并非竞争对手。

### AG-UI

**GitHub**：[ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)

AG-UI 是一种基于事件的协议，用于AI智能体与前端应用之间的通信。它定义了约16种事件类型：`TEXT_MESSAGE_START`、`TEXT_MESSAGE_CONTENT`、`TOOL_CALL_START`、`TOOL_CALL_END`、`STATE_SNAPSHOT`、`STATE_DELTA` 等。传输方式由你决定——SSE、WebSocket、webhook均可。格式有意宽松，以促进广泛采用。

AG-UI 不定义你的UI长什么样。它定义智能体如何*与*你的前端通信。可以把它看作线缆协议层，让你的React应用能够像订阅CrewAI智能体一样订阅LangGraph智能体，而无需更改前端代码。

CopilotKit 基于他们在 LangGraph 和 CrewAI 上的工作创建了 AG-UI。该协议已被 LangChain、Mastra、PydanticAI 等采用。微软已发布 AG-UI 集成指南。如果你正在构建多智能体前端，并且需要将后端框架与前端代码解耦，AG-UI 就是答案。

**一个常让人困惑的澄清**：AG-UI 不是 UI 框架。它不告诉你渲染什么。它只告诉你*智能体说了什么、调用了哪个工具、或者更新了共享状态。你响应时渲染什么，仍然由你决定。

### A2UI

**GitHub**：[google/A2UI](https://github.com/google/A2UI) · 规范：[a2ui.org](https://a2ui.org/)

A2UI 是 Google 的声明式规范，定义了智能体想要展示 UI 时发送的内容。如果说 AG-UI 回答的是“智能体如何通信？”，那么 A2UI 回答的是“智能体用什么格式描述组件布局？”。

A2UI 使用扁平的 JSONL 格式：每行一个组件描述符，包含 ID、类型和数据。扁平是刻意的。嵌套树要求模型在开始流式传输之前就知道完整结构。扁平列表让模型可以在“思考”每个组件时立即发出它，这意味着你的前端可以在模型还在决定是否添加图表时，就开始渲染第一个指标卡片。

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI 注重安全性：规范是数据格式，而非可执行代码。组件目录由开发者预定义；智能体只能引用该目录中的类型。收到未知类型名称的 A2UI 渲染器会忽略它。

CopilotKit 的“Open-JSON-UI”格式与 A2UI 兼容。如果你今天要为组件目录选择一种规范格式，A2UI 是跨平台支持最广泛的那个。

**关于稳定性的说明**：A2UI 尚未达到 1.0 版本——上次检查（2026 年 5 月 8 日）时为 v0.9——并且在次要版本之间已经发布了破坏性规范变更。Google 关于路线图的沟通时断时续，一些渲染器（Lit、Flutter）的更新落后于规范更新。如果今天基于它构建，请为规范漂移预留时间。对于纯 Web 用例，json-render 目前似乎拥有更完整的工具链。A2UI 的长期优势在于跨平台覆盖（Web、Flutter、SwiftUI、Android），这是 json-render 所不具备的。

### MCP Apps

**GitHub**：[modelcontextprotocol](https://github.com/modelcontextprotocol) · 相关：[mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP 最初是用于将 LLM 连接到工具和数据的协议。Apps 扩展让 MCP 工具不仅能返回数据，还能返回交互式 UI 工件：React 组件、表单、仪表盘、地图。

安全模型很严格，这正是关键所在：所有内容都在权限受限的沙箱 iframe 中渲染，模板预先声明以便宿主应用审查，所有通信都是可审计的 JSON-RPC。对于工具提供商来说，这是正确的模型——Shopify MCP 服务器可以返回一个结账小部件；地图服务可以返回一个可嵌入的地图。宿主应用不拥有也不信任该小部件的代码。

当 UI *属于工具提供商*而非你的应用时，MCP Apps 是正确的选择。对于位于你应用领域内的 UI，请坚持使用模式 1 或模式 2。

---

## JavaScript/TypeScript 框架

### CopilotKit

**GitHub**：[CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · 示例：[CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit 是构建智能体原生前端应用最完整的框架。它处理完整生命周期：通过 AG-UI 连接智能体后端、管理双向对话状态、渲染生成式 UI 组件，并提供共享状态管道，让智能体和用户能修改同一份数据。

三种模式与 CopilotKit 的 API 清晰对应：
- `useCopilotAction` 配合 `render` 回调 → 模式 1
- A2UI/Open-JSON-UI 渲染 → 模式 2
- `OpenGenerativeUI` 沙箱化产物 → 模式 3

CopilotKit 一个常被低估的重要特性是**共享状态与人机协同**：智能体可以读写应用状态，用户也可以读写，变更双向流动。这正是让 Copilot 风格 UI 感觉像真正协作、而非聊天框贴在产品上的关键。

### Vercel AI SDK

**GitHub**：[vercel/ai](https://github.com/vercel/ai) · 文档：[ai-sdk.dev](https://ai-sdk.dev/)

Vercel AI SDK 是 AI 应用的事实标准 TypeScript 基础库。针对生成式 UI 而言：

**`useObject`** 将服务器生成的 JSON 对象以流式方式传输。你定义 Zod schema；SDK 解析部分 JSON，并在字段到达时触发重新渲染。这是在 Next.js 应用中实现模式 2 最顺畅的路径。

```tsx
const { object: dashboard } = useObject({
  api: "/api/generate-dashboard",
  schema: z.object({
    title: z.string(),
    metrics: z.array(z.object({ label: z.string(), value: z.number() })),
    insights: z.array(z.string()),
  }),
});
```

**`useChat` 配合工具处理器** → 模式 1。模型调用工具；你将工具名称映射到组件。

**AI Elements**（[elements.ai-sdk.dev](https://elements.ai-sdk.dev/)）提供了现成的 UI 原语与 SDK 配合使用。

**关于此处令人困惑的演进轨迹**：2024 年 10 月，Vercel 在 [GitHub Discussion #3251](https://github.com/vercel/ai/discussions/3251) 中宣布，AI SDK RSC——作为 SDK 3.0 中主打“生成式 UI”特性的 React Server Components 流式模式——因“若干长期存在的限制”且短期内无良好解决方案而被无限期暂停。那些围绕 RSC 流式构建产品策略的团队措手不及。`generateObject`/`streamObject` API 后来也在 SDK 6.0 中被弃用。从 AI SDK RSC 迁移的推荐方案是上述 `useObject` 模式，或使用 json-render 进行基于目录的生成。

### assistant-ui

**GitHub**：[assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

assistant-ui 是一组可组合的 React 原语，用于构建生产级聊天界面。当你需要精致的聊天 UX——消息气泡、流式 token、复制/编辑/重新生成操作、思考状态——并且希望自带后端和工具渲染时，它是正确的选择。

它能很好地与任何后端（OpenAI、Anthropic、本地模型、自定义端点）配合使用，并通过熟悉的插槽/渲染属性模型处理工具调用渲染。

### json-render

**GitHub**：[vercel-labs/json-render](https://github.com/vercel-labs/json-render) · 文档：[json-render.dev](https://json-render.dev/)

json-render 以意见明确、开箱即用的方式实现了模式 2。你获得一个预构建的组件目录（带 Zod schema 的 shadcn/ui 组件）、一个渲染器，以及一个紧密的生成循环——模型通过 schema 被约束在该目录内。

其显著特性包括：
- **多目标渲染**：同一 JSON 规范可渲染为 React Web 应用、React Native 移动应用、PDF、HTML 邮件或 Remotion 视频。这对报告场景非常实用。
- **渐进式渲染**：组件在模型流式传输时即出现，而非等待完整规范到达。
- **严格的 schema 约束**：目录设计使得模型无法幻觉出有效但未知的组件类型。

如果你正在构建一个仪表盘或报告生成功能，并且希望跳过自行设计组件目录的基础设施工作，那么 json-render 是 Web 应用最快的路径。

**关于势头**：json-render 于 2026 年初从 Vercel Labs 推出，似乎迅速吸引了 Web 开发者的关注，因为它能立即在标准的 React/Next.js 项目中发挥作用。不过，json-render 仍处于 1.0 版本之前，它与 A2UI 之间的关系仍在梳理中——Vercel 已经尝试过兼容 A2UI 的输出，因此两者有可能融合。对于跨平台（原生移动端、多框架）场景，A2UI 是更长期的稳妥选择。

### Hashbrown

**GitHub**：[liveloveapp/hashbrown](https://github.com/liveloveapp/hashbrown)

Hashbrown 采用了一种独特的方式：它不构建独立的 AI 界面层，而是将 AI 组件选择直接嵌入到你现有的 React 或 Angular 应用中。你将应用的组件暴露给 LLM；LLM 选择渲染哪些组件，并且可以调用客户端工具。

当你希望将智能注入到非“聊天”形态的产品界面时——比如自适应布局的产品页面、自动呈现合适选项的设置面板、建议下一步操作的工作流编辑器——这个工具正合适。

### OpenUI

**GitHub**：[thesysdev/openui](https://github.com/thesysdev/openui) · 文档：[openui.com](https://www.openui.com/)

OpenUI 用面向行的类代码格式（“OpenUI Lang”）取代了 JSON，这种格式专为渐进式渲染和 token 效率而设计。据称，对于复杂布局，其 token 消耗比等效 JSON 减少约 67%。

代价是生态成熟度——OpenUI 较新，工具链也比基于 JSON 的方案更薄弱。但如果 token 成本是一个重要约束，并且你以高频率生成复杂布局，那么格式效率是实实在在的。

### Tambo

**GitHub**：[tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo 专注于有状态的组件选择：AI 选择组件，并可以通过客户端工具与之交互，在对话过程中保持组件状态。适用于 UI 元素跨轮次持续存在的场景——比如一个筛选组件，用户调整它，同时 AI 继续对筛选后的数据进行推理。

---

## Python 层

Python 生态处理 AI 界面的方式不同。这些工具针对 ML 模型演示、数据应用和内部工具进行了优化——而非面向代理驱动布局组合的生产级消费者应用。

这并非贬低。对于合适的用例，Gradio 和 Streamlit 就是你需要的全部工具。

### Gradio

**GitHub**：[gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI：`gradio`

Gradio 的核心价值：你写一个 Python 函数，Gradio 将其包装成 Web UI。`Interface` 类三行代码就能搞定一个图像分类器。`ChatInterface` 十行代码就能做一个聊天机器人。`Blocks` 在你需要精细布局控制时提供细粒度能力。

Gradio 中的“生成式 UI”由 Python 开发者定义，而非模型。组件可见性和配置可以根据模型输出动态变化，但组件目录是静态的——你并不会让模型去组合布局。

Gradio 是 HuggingFace Spaces 和 ML 演示生态的默认选择。它每月有数百万次下载，支撑着 AI 演示领域很大一部分应用。

**何时选用 Gradio**：你是 Python 开发者，正在构建 ML 模型演示、研究原型或内部工具，并且不想碰 JavaScript。

### Streamlit

**GitHub**：[streamlit/streamlit](https://github.com/streamlit/streamlit)

Streamlit 的模式更偏执：每次交互时，Python 脚本从头到尾重新执行。你调用 `st.chat_message()`、`st.dataframe()`、`st.plotly_chart()`。框架处理布局。

全脚本重跑的模式听起来低效，但对于积累对话历史的 AI 聊天机器人来说却出奇地符合人体工学——整个脚本重跑，聊天历史在会话状态中，输出是确定性的。Streamlit 现在对大多数主流 LLM 提供商提供一等支持，并与 Snowflake Cortex 原生集成。

**何时选用 Streamlit**：你在 Python 中构建 AI 驱动的数据应用、内部报告工具或 ML 支持的数据面板，并且想要最简单的部署路径。

### LangChain 和 Haystack

这些是后端编排框架，而非 UI 框架。它们出现在任何诚实的生成式 UI 栈图谱中，是因为它们通常是结构化输出生成后再发送到前端的那个层。

**LangChain**（[langchain-ai/langchain](https://github.com/langchain-ai/langchain)）：在任何 LLM 上使用 `.with_structured_output()` 即可获得 Pydantic 约束的 JSON 生成。`@tool` 装饰器配合自动 schema 生成是定义模型可调用工具的最简洁方式。LangChain 将结构化结果向上传递给任何你使用的前端层。

**Haystack**（[deepset-ai/haystack](https://github.com/deepset-ai/haystack)）：模块化管道架构，支持强大的 RAG。Hayhooks 将 Haystack 管道包装为 HTTP 端点——包括兼容 MCP 的端点。如果你的生成式 UI 需要检索骨架，Haystack 的管道架构能干净地处理。

这两个框架都不拥有 UI 层。它们生成数据，由你的前端（模式 1、2 或 3）渲染。

---

## 功能参考

将上面的目录用作方向指引，而非购物清单。栈通常会在每一层收敛到一个选择：

| 需求 | 从这里开始 |
|------|------------|
| Agent 到前端的实时事件流 | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |
| 跨越信任边界的声明式 UI 负载 | [A2UI](https://github.com/google/A2UI) 或 [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |
| 应用自有的聊天/工具渲染 | [Vercel AI SDK](https://github.com/vercel/ai)、[assistant-ui](https://github.com/assistant-ui/assistant-ui) 或 [CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| 基于目录组合的仪表盘、报表和表单 | [json-render](https://github.com/vercel-labs/json-render)、[Hashbrown](https://github.com/liveloveapp/hashbrown)、[OpenUI](https://github.com/thesysdev/openui) 或 [Tambo](https://github.com/tambo-ai/tambo) |
| 沙箱化的可视化制品 | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |
| Python 演示与数据应用 | [Gradio](https://github.com/gradio-app/gradio) 或 [Streamlit](https://github.com/streamlit/streamlit) |

---

## 生态系统的迭代速度与不稳定地带

这个领域发展极快，多个项目在发布代码的同时也发出了令人困惑的沟通信息。最后验证时间：2026 年 5 月 8 日；请将此处关于项目状态的说明视为一个时间戳快照，而非永久性结论。

**Vercel AI SDK RSC** 曾是 SDK 3.0 发布时标志性的 Generative UI 功能。Vercel 于 2024 年 10 月暂停了其开发（[讨论 #3251](https://github.com/vercel/ai/discussions/3251)），理由是 React Server Components 存在架构限制且短期内无解。那些基于它构建的团队自然感到沮丧。该功能仍在文档中，但已不再是推荐路径；`useObject` 才是。

**json-render**（Vercel Labs）是新的方向——一种基于目录、框架无关的替代方案，避免了 RSC 耦合问题。它处于 pre-1.0 阶段，在 React/Web 开发者中似乎已有强烈的早期兴趣。可能的 DX 原因：json-render 在标准 React/Next.js 项目中立即可用，而 A2UI 的跨平台范围带来了额外的设置摩擦。随着两个规范逐渐成熟，最终走向如何尚不明朗。Vercel 已在 json-render 中试探了 A2UI 兼容性，表明两者存在融合可能。

**A2UI**（Google）处于 pre-1.0 阶段（上次检查时为 v0.9），次要版本之间存在破坏性变更，且 Google 关于其路线图的沟通不一致。对于 json-render 无法覆盖的跨平台需求（Web + Flutter + SwiftUI），它是正确的选择，并且拥有有意义的企业支持。对于纯 Web 项目而言，目前其 DX 体验较为粗糙。

**AG-UI**（CopilotKit）同样处于 pre-1.0 阶段。最常见的混淆点：名称听起来像是一个 UI 框架，但它不是——它是一个传输协议。AG-UI 定义了事件如何在 Agent 后端与你的前端之间流动；你最终渲染什么仍然是你的决定。这个心智模型是扎实且被广泛采用的，但 pre-1.0 的规范意味着边界情况仍在解决中。

实际结论：**这里每个主要参与者都处于 pre-1.0 阶段**。请为 API 变更做好准备。这些模式——工具到组件、目录组合、沙箱化生成——已经足够稳定，可以在此基础上构建。但具体的协议选择则不然。

---

## 组件目录设计：真正的工程工作

模式 2 中大部分有趣的复杂性并不在渲染器里——而是在目录中。

目录是一个**编码为 schema 的产品决策**。它回答的问题是：这个领域中有意义的 UI 对象是什么？不是“存在哪些 React 组件？”，而是“用户在这个上下文中实际需要看到和交互什么？”

**粒度过细的失败模式**：你暴露了 `Row`、`Column`、`Text`、`Button`、`Icon`。现在模型必须成为前端工程师。它会生成不符合你设计系统的平庸布局，会遗漏空状态，会产生不可访问的标记，并且会因为目录中没有任何东西约束输出符合你产品的视觉语言，而在每次响应中改变其方法。

**粒度过粗的失败模式**：你暴露了 `WeatherCard`、`FlightCard`、`HotelCard`。当用户提出无法映射到预制卡片的需求时，模型无法适应，只能回退到文本。

**有用的中间地带**：带有约束插槽的领域级组件。

一个旅行应用的目录可能看起来像：

```
TripSummary         — 行程概览
FlightOptionList    — 可选航班列表及价格
HotelComparison     — 并排酒店卡片
TravelerForm        — 收集旅客信息
PolicyNotice        — 法规/票价规则提示
BookingConfirmation — 最终确认及操作按钮
```

一个金融应用的目录可能看起来像：

```
PortfolioSnapshot   — 关键持仓与盈亏
TransactionTable    — 可筛选、分页的交易记录
RiskBreakdown       — 配置与波动率指标
ScenarioComparison  — 并排情景建模
ApprovalGate        — 需要人工确认的操作
```

这个目录听起来就像你产品的词汇表。它将你的UX决策、无障碍要求、空状态处理以及危险操作模式都编码在组件代码中。模型负责排列这些组件，而你仍然决定每个组件长什么样、能做什么。

**减少幻觉的Schema设计规则**：

1. 保持枚举值简短且直观。用 `"type": "bar_chart"`，而不是 `"type": "data-visualization-bar-type-vertical"`。
2. 让无效组合不可能出现。如果 `PolicyNotice` 只能出现在布局末尾，就不要把它和可以出现在任何位置的组件放在同一个schema层级。
3. 多用必填字段。可选字段意味着模型可能省略它，而你的渲染器必须处理null值。
4. 在发布前用真实提示词测试目录。保存生成的规格，检查schema违规、幻觉字段值，以及技术上有效但语义错误的组合。

---

## 常见陷阱

**陷阱：把有效的JSON当成安全行为。** Schema验证只确认结构，它不说明按钮的操作是否匹配其标签、合计是否与数据一致、或者UI组件是否做了用户预期之外的事。生成的UI规格需要语义审查，而不仅仅是schema验证。至少，破坏性操作应该要求确认组件，并且这些组件上的标签应该对照它们触发的操作进行测试。

**陷阱：暴露设计原语而非产品原语。** 如果模型需要决定用16px还是20px的内边距，你就给了它错误的抽象层级。领域组件应该编码产品品味。模型应该组合行为，而不是管理展示细节。

**陷阱：在静态UI足够的地方使用生成式UI。** 如果你在开发时就能知道要展示的结构——通常如此——那么模式1（预构建组件）更快、更安全、更一致。生成式UI只有在结构确实因数据或任务上下文而变化时才值得引入复杂性。

**陷阱：忽略无障碍。** LLM会幻觉出WCAG违规。它们会在交互元素上添加 `role="region"`，生成缺少标签的表单，以及产生不满足WCAG AA标准的对比度。你的组件库可能完全无障碍，但AI生成的组件组合并不自动无障碍。测试完整的渲染路径，而不仅仅是孤立的组件。

**陷阱：混淆协议和框架。** AG-UI不是前端框架。A2UI不是React库。它们是线格式和事件协议。你仍然需要一个前端框架来实现它们。CopilotKit实现了AG-UI和A2UI。json-render实现了A2UI/Open-JSON-UI目录模式。这些是不同的层级。

---

## 按使用场景推荐

**为现有SaaS应用添加Copilot**：从模式1（工具到组件）开始。使用Vercel AI SDK的`useChat`或CopilotKit。将前5-10个代理操作映射到预构建组件。发布、测量，只有当用户明确需要更丰富的组合时才扩展目录。

**从自然语言生成仪表盘**：使用模式2，配合json-render或自定义A2UI目录。定义包含8-15种组件类型的目录，涵盖图表类型、指标卡片和表格变体。将schema提供给模型，让它组合布局。构建验证逻辑，在未知类型到达渲染器之前捕获它们。

**多代理前端**：使用CopilotKit配合AG-UI。事件流处理跨代理后端的实时流式传输；共享状态处理代理之间的交接；HITL模式处理审批门。

**在ChatGPT或其他MCP主机内构建**：使用MCP Apps。将你的工具定义为数据工具（负责获取和推理）和独立的渲染工具（负责请求widget）。将业务逻辑保留在widget模板之外。

**ML模型演示和数据应用（Python团队）**：使用Gradio做演示和HuggingFace Spaces。使用Streamlit做交互更复杂的数据应用。两者都不需要JavaScript。

**视觉制品、模拟、图表**：使用模式3（OpenGenerativeUI或等效方案）。建立严格的iframe CSP。从安全角度将输出视为不受信任的用户内容。

---

框架正在快速成熟。协议趋同（用于流式传输的AG-UI、用于目录规范的A2UI/Open-JSON-UI）仍在进行中，但形态已足够清晰，可以在此基础上构建。

当前最重要的工程挑战并非框架选择。而是目录设计——决定模型被允许表达什么，这更需要产品清晰度而非技术能力。是语义验证——测试生成的UI是否如其声称的那样工作，而不仅仅是通过模式验证。还有可访问性差距——构建目录时，每个组件以及每个组件组合都必须达到你对手写UI所要求的可访问性标准。

模型会在你赋予它的语法范围内执行你的指令。请精心设计这个语法。
````
