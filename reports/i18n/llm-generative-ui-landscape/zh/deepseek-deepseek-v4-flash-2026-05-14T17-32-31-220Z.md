# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/zh/index.mdx
- Validation: deferred
- Runtime seconds: 72.25
- Input tokens: 11835
- Output tokens: 9694
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.004319
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: LLM生成式UI全景
subTitle: 从工具到组件渲染，再到开放式生成——一张涵盖每种方法及其复杂性合理时机的图谱。
date: '2026-05-06'
modified: '2026-05-06'
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
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
聊天是辅助轮。

第一代 LLM 应用大多看起来像是一个文本框贴在某个产品上。模型返回散文，前端渲染 Markdown。如果用户需要执行操作，助手会描述用户应该去别处点击的按钮。

这对演示来说还行。但这并非未来的方向。

下一个有用的步骤是**生成式 UI**：模型不仅用文本回答，还帮助决定用户当前需要哪个界面。有时意味着调用工具并渲染预构建的卡片。有时意味着用新数据填充已知的工作流组件。有时意味着组合一个临时的仪表盘、表单、对比表、图表或交互式小部件。

不幸的是，“生成式 UI”已经变成了一个早餐前能代表五种不同含义的短语。

人们用它来描述：

- 模型从开发者定义的 React 组件中选择
- 前端渲染成原生组件的 JSON 规范
- 从 MCP 工具返回的 iframe 应用
- 支持工具调用的聊天 UI 库
- 在后端和前端之间流式传输状态的智能体协议
- 像 v0、Lovable、Bolt 或 Cursor 这样的设计时代码生成器
- 模型在运行时直接编写 HTML、SVG、Canvas 或 React

这些是相关的，但它们不在同一层。如果你把它们混为一谈，每个架构讨论都会变成一锅粥。

这是我刚开始比较当前技术栈时希望拥有的地图。

![LLM 生成式 UI 的分层地图](../landscape-map.webp)

## 核心误解

最大的错误是将“生成式 UI”视为单一的技术选择。

更好的做法是将问题分为四个层次：

1.  **产品外壳**：用户接触的东西。可能是聊天、侧边栏副驾驶、仪表盘、工作流构建器、IDE 面板、ChatGPT 应用、移动屏幕或支持控制台。
2.  **UI 组合模型**：模型被允许使用的语法。可能是工具调用、JSON、A2UI、json-render、OpenUI Lang、Hashbrown 组件选择或沙盒 HTML。
3.  **运行时与传输**：消息、工具调用、状态增量、用户操作和 UI 产物如何在智能体和前端之间移动。AG-UI、MCP Apps、Apps SDK、A2A、SSE、WebSocket 和普通的 HTTP 都在这个层面。
4.  **智能体与工具后端**：LangGraph、Google ADK、CrewAI、Mastra、LlamaIndex、Pydantic AI、Agno、OpenAI Agents SDK、自定义函数、数据库、检索以及所有仍然必须正确的无聊业务逻辑。

一旦你拆开这些层次，整个生态就变得不那么神秘了。

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) 实际上并不是 [A2UI](https://github.com/google/A2UI) 的竞争对手。AG-UI 是一个用于智能体与应用程序交互的事件协议。A2UI 是智能体可以发送的声明式 UI 格式。你可以在 AG-UI 之上使用 A2UI。你也可以在 AG-UI 之上使用自定义工具渲染的组件。

[json-render](https://github.com/vercel-labs/json-render) 不是一个聊天产品。它是一个组件目录和渲染器架构：定义模型可以使用的组件，让模型输出有效的 JSON 树，并安全地渲染该树。

[CopilotKit](https://github.com/CopilotKit/CopilotKit) 不仅仅是一个聊天气泡。它是一个用于智能体原生应用的前端技术栈：聊天 UI、生成式 UI、共享状态、前端工具和人机协同流程。

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) 和 [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) 不是“让我的 React 应用动态化”的工具。它们是宿主集成模型，用于在 ChatGPT 或其他兼容 MCP 的宿主中渲染小部件。

这些名称之所以令人困惑，是因为这个领域还很年轻。而“分层”才是真正持久有用的部分。

## 控制光谱

生成式 UI 的本质是 **开发者控制** 与 **智能体自由度** 之间的权衡。

控制过多，助手就会像穿了戏服的命令面板。自由度过多，模型就会开始编造奇怪的布局、模糊的按钮、破碎的视觉层次、不可能的状态，以及带着自信微笑的安全问题。

诀窍在于选择解决用户问题所需的最小自由度。

![从工具渲染组件到开放式生成 HTML 的光谱](../control-spectrum.webp)

我是这样理解这个光谱的：

**工具到组件渲染** 是最安全的默认选项。模型调用 `get_weather`、`search_products`、`compare_plans` 或 `draft_invoice`。应用将该工具结果映射到你已有的组件：`WeatherCard`、`ProductGrid`、`PlanComparison`、`InvoiceReview`。模型决定 *何时* UI 有用。开发者仍然掌控布局、样式、可访问性、加载状态、空状态和危险操作。

这是 [Vercel AI SDK 的生成式 UI 指南](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) 中记录的模式：模型调用工具，工具返回数据，UI 根据结果渲染组件。这也是许多 CopilotKit 和 assistant-ui 实现背后的心智模型。

**声明式组件目录** 给模型更多空间。模型不再只选择一个组件，而是从允许的部件中组合出一棵树。目录可能包含 `Metric`、`Table`、`Chart`、`FilterBar`、`ApprovalPanel` 和 `Timeline`。模型可以组装仪表盘或工作流步骤，但不能执行任意代码。这就是 [A2UI](https://github.com/google/A2UI)、[json-render](https://github.com/vercel-labs/json-render)、[Hashbrown](https://github.com/liveloveapp/hashbrown) 和 [OpenUI](https://github.com/thesysdev/openui) 所处的位置。

**Iframe 迷你应用** 在以下场景中很有意义：UI 需要比组件树更丰富，或者远程工具提供者拥有体验的所有权。MCP Apps 和 OpenAI Apps SDK 允许工具返回结构化数据以及一个小部件资源，宿主在 iframe 中渲染该资源。这对于地图、购物车、预订流程、图表和外部产品界面非常强大。它也在宿主应用和小部件之间创建了更清晰的边界。

**开放式生成** 是另一端：智能体将 HTML、SVG、Canvas、WebGL 或其他类似代码的工件发射到沙箱中。[OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) 是目前最好的例子：智能体可以在沙箱化的 iframe 中生成算法可视化、3D 场景、图表和模拟。这对于一次性视觉解释非常有用。但我不建议在企业审批流程中从它开始。

这里有必要指出关键区别：**iframe HTML**（模型将代码写入沙箱）与 **JSON 目录**（模型发出结构化规范，你的渲染器将其映射到预构建组件）。它们听起来相似，但风险和复杂性特征截然不同。Iframe HTML 具有最大表达能力；iframe 边界负责安全工作。JSON 目录不给模型任何可执行自由度——它只能引用你预先定义的组件类型。这个领域的大多数框架都明确属于其中一类。

**超越沙箱**：最近的演示表明，第四种模式正在形成——LLM 通过比任何组件目录都更直接地控制视觉输出来驱动游戏化或沉浸式体验。从提示生成可探索的 3D 世界、LLM 在运行时指导 NPC 行为、以及通过 WebGPU 在浏览器中进行模型推理（[WebLLM](https://mlc.ai/web-llm/)）都是早期标志。目前还没有稳定的框架可以用来构建生产级作品。一旦情况发生变化，我会在一篇专门的文章中介绍这个方向。

## 高层组件 vs 细粒度组件

这是最重要的设计决策。

如果你的目录过于细粒度，模型就必须成为前端工程师：

```tsx
Container
Row
Column
Text
Button
Icon
Spacer
Divider
```

这看起来很灵活，但现在模型必须决定间距、层级、分组、空状态、按钮标签、错误处理和响应式行为。你还让提示词变得更大，输出更容易出错。

如果你的目录过于高层，模型就会被困住：

```tsx
WeatherCard
StockCard
HotelCard
```

这很安全，但只适用于已知场景。模型无法创建对比矩阵、询问缺失输入，或在用户问题变化时调整信息架构。

有用的中间地带是**带有受限插槽的领域级组件**：

```tsx
SearchResults
ComparisonTable
MetricGroup
EditablePlan
ApprovalRequest
Timeline
DataCollectionForm
CheckoutReview
```

这些组件编码了产品品味和业务约束。模型可以决定*应该显示什么*，但不必做每一个CSS决策。

例如，旅行代理不需要 `div`、`span` 和 `button`。它需要：

```tsx
TripSummary
FlightOptionList
HotelComparison
TravelerForm
PolicyNotice
BookingConfirmation
```

金融代理不需要通用的图表游乐场。它需要：

```tsx
PortfolioSnapshot
TransactionTable
RiskBreakdown
ScenarioComparison
ApprovalGate
```

目录应该听起来像你的产品，而不是像HTML。

## 功能对比表

这张表有意带有主观倾向。它将每个项目视为栈中的一个工具，而不是赢家通吃的平台。

| 技术 | 层级 | 最佳适用场景 | UI模型 | 流式/状态 | 备注与示例 |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | 运行时协议 | 连接代理后端与前端应用 | 用于消息、工具、状态、活动、中断的事件 | 是；事件流加状态快照/增量 | 当你需要标准的代理到应用管道时使用。它补充MCP和A2A，而非替代它们。 |
| [A2UI](https://github.com/google/A2UI) | 声明式UI协议 | 跨平台、代理生成的原生UI | 描述组件、数据模型和更新的JSON负载 | 设计用于增量更新 | 远程代理和信任边界的强选择。早期公开预览，但概念清晰。 |
| [json-render](https://github.com/vercel-labs/json-render) | 组件目录与渲染器 | 让模型组合已批准的组件 | 受类型化目录约束的JSON树 | 支持渐进式渲染 | 适用于React、Vue、Svelte、Solid、React Native、邮件、PDF、Remotion、终端等。 |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | 产品外壳与代理UI框架 | 应用内副驾驶、共享状态、前端工具、人在回路 | 工具渲染、AG-UI、A2UI、MCP Apps模式 | 是 | 最广泛的“构建代理原生应用”栈之一。参见[generative-ui示例](https://github.com/CopilotKit/generative-ui)。 |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | 开放式UI生成展示 | 视觉解释、图表、模拟、图表 | 代理将HTML/SVG/Canvas发射到沙箱iframe中 | 渐进式视觉渲染 | 用于固定组件目录过于受限的动态工件。 |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | 宿主/小部件标准 | 工具提供者通过MCP返回交互式UI | 从工具元数据链接的HTML资源 | 宿主桥接和小部件操作 | 当UI属于工具提供者或需要iframe隔离时最佳。 |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | ChatGPT应用宿主集成 | 构建自定义ChatGPT应用小部件 | MCP服务器工具加iframe UI组件 | 工具输入/结果、小部件状态、后续消息 | 新的ChatGPT应用应优先使用MCP Apps字段和`ui/*`桥接，配合`window.openai`用于兼容性/扩展。 |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | 应用SDK与聊天状态 | 自定义应用聊天、工具调用、流式消息片段 | 将工具结果渲染为React组件 | 是，通过`useChat`和UI消息流 | 如果你已经拥有应用并想要更底层控制，这是很好的基线。配合[AI Elements](https://elements.ai-sdk.dev/)获取UI原语。 |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | React聊天原语 | 生产级聊天UX与自定义渲染 | 可组合的聊天原语、工具调用渲染、JSON作为组件 | 是 | 如果你需要精致的聊天人体工学但想自带后端，这是强选择。 |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | 代理平台集成 | 将UI组件与图代码共置 | 图发出命名UI消息，由React组件渲染 | 是，包括自定义流事件 | 自然适合LangGraph部署和图拥有的UI组件。 |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | 前端GenUI框架 | 暴露组件和客户端工具的React/Angular应用 | LLM选择并渲染允许的应用组件 | 支持流式模式 | 适合将智能直接嵌入产品表面，而不仅仅是聊天。 |
| [OpenUI](https://github.com/thesysdev/openui) | 紧凑UI语言与运行时 | 可流式传输的模型生成UI，比JSON使用更少token | OpenUI语言加React运行时和组件库 | 设计用于token流式传输 | 当JSON冗长成为瓶颈时有趣。仍年轻，但值得关注。 |
| [Tambo](https://github.com/tambo-ai/tambo) | React生成式UI SDK | 组件选择、有状态组件、客户端工具执行 | AI选择组件并与客户端工具交互 | 面向状态 | 流行的开源React选项，专注于自动组件编排。 |
| [llm-ui](https://llm-ui.com/) | 输出渲染器 | 更平滑的LLM文本输出与自定义内联组件 | 将模型输出字符串解析为React渲染 | 平滑token渲染 | 用于文本流中的轻量自定义组件；不是完整的代理UI协议。 |
| AI SDK RSC / React Server Components | 旧模式/框架特性 | Next.js中的服务端渲染组件流 | 模型/工具流返回服务端渲染UI | 是，但框架特定 | 开发于2024年10月暂停（[讨论#3251](https://github.com/vercel/ai/discussions/3251)）；不是推荐路径。迁移到`useObject`或json-render。 |

## 针对不同产品该用什么

以下是我实际会与团队使用的推荐矩阵。

**你正在为现有SaaS应用添加助手。**

从工具到组件渲染开始。根据你需要的代理状态和前端工具集成程度，使用[Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)、[assistant-ui](https://github.com/assistant-ui/assistant-ui)或[CopilotKit](https://github.com/CopilotKit/CopilotKit)。一开始保持目录很小。渲染你已经信任的产品组件。

**你正在构建一个需要共享状态的严肃应用内副驾驶。**

**你正在构建一个需要共享状态的严肃应用内副驾驶。**

仔细研究 CopilotKit 加 AG-UI。重要的特性不是“聊天”，而是共享状态和双向交互：代理可以请求输入、渲染 UI、更新状态并暂停等待确认。

**你有远程代理需要跨边界发送 UI。**

使用 A2UI 或类似 A2UI 的声明式协议。关键在于，远程代理可以将 UI 描述为数据，而宿主保持对原生渲染、安全性和样式的控制。如果你还需要实时代理/应用交互，可以通过 AG-UI 或你环境标准化的任何传输层来运行。

**你在 ChatGPT 或 MCP 兼容的宿主内构建。**

使用 MCP Apps 和 Apps SDK 路径。OpenAI 当前的文档建议对新工作使用 MCP Apps `ui/*` 桥接，同时保留 `window.openai` 作为兼容层和可选的扩展面。还要复制他们的数据工具与渲染工具分离的做法：让模型在决定渲染小部件之前先获取数据并推理。

**你想在自己的应用中实现自然语言驱动的仪表盘、报告或表单。**

尝试 json-render、Hashbrown 或 OpenUI。关键在于目录。如果你暴露 `LineChart`、`DataTable`、`MetricGroup`、`FilterControl` 和 `InsightCallout`，模型就能组装出有用的报告界面，而无需接近任意代码。

**你想要教育性、视觉性或高度定制的人工制品。**

使用像 OpenGenerativeUI 这样的开放式沙箱。让模型编写 SVG、Canvas、WebGL 或自包含的 HTML，但将输出视为不受信任的用户内容。沙箱化、限制大小、剥离权限，并使其远离特权应用状态。

**你主要需要更美观的流式 Markdown，附带少量内联交互。**

不要过度构建。llm-ui 或 assistant-ui 的工具渲染可能就足够了。

## 我会避免的错误

**错误 1：让模型在运行时编写生产级 React。**

存在例外，但对于产品 UI，这通常是一个错误的默认选择。运行时代码生成难以保证安全、难以测试、难以主题化、难以保持可访问性。如果模型可以通过从受信任组件中选择来完成任务，那就这样做。

**错误 2：暴露设计原语而非产品原语。**

当你给模型 `Row`、`Column`、`Text` 和 `Button` 时，你是在要求它成为你的设计系统。它会成为一个平庸的设计系统。给它更高级别的产品名词。

**错误 3：认为有效的 JSON 就意味着安全的 UI。**

一个负载可以通过模式验证，但仍然可能具有操纵性或危险性。标签可以显示“查看发票”，而实际动作却是归档账户。将 UI 规范视为行为，而非装饰。它们需要策略测试、语义检查，以及对重要操作的人工确认。

**错误 4：将业务逻辑放在渲染工具中。**

渲染工具应该负责渲染。数据工具应该负责获取、计算、变更和验证。OpenAI 的 Apps SDK 文档明确指出这种分离是有原因的：如果每个数据工具都附带一个小部件，模型在呈现之前就失去了推理空间。

**错误 5：为新颖性而非任务完成度进行优化。**

重点不是让每个答案都变成雪花般的独特界面。重点是减少摩擦。一个稳定、无趣的审批面板，能为用户节省四分钟，比一个令人眼花缭乱但无法被信任两次的生成式仪表盘要好得多。

## 一个实用的架构

如果今天我要启动一个新产品，我会采用分阶段的方法：

1.  **先交付受控的工具 UI。** 将已知工具映射到已知组件。记录每一次工具调用、UI 渲染和用户操作。
2.  **添加领域目录。** 一旦模式重复出现，就暴露 `ComparisonTable`、`DecisionPanel`、`DataCollectionForm`、`Timeline` 以及其他产品特定的组件。
3.  **仅在需要时添加传输标准化。** 如果你同时拥有前端和后端，普通的流式传输可能就足够了。如果你有多个智能体框架，使用 AG-UI。如果工具跨越产品边界，使用 MCP。如果智能体跨越组织边界，关注 A2A 和 A2UI。
4.  **对外部或复杂的界面使用 iframe 小部件。** 地图、购物车、预订流程和第三方迷你应用应该放在边界之后。
5.  **将开放式生成保留给工件。** 图表、模拟、临时解释器和可视化草稿板非常适合。核心工作流则不然。

最终架构看起来像这样：

```txt
用户意图
  -> 智能体运行时
  -> 工具/数据调用
  -> 结构化结果
  -> UI 决策
  -> 受信任的组件、声明式规范或沙盒化小部件
  -> 用户操作
  -> 状态/事件流返回智能体
```

这个循环才是真正的产品。聊天框只是其中一种输入设备。

## 评估应该包含 UI

LLM 团队正在慢慢学会评估提示词和模型输出。生成式 UI 增加了另一个表面积：界面本身也可能出错。

至少，为每个生成的 UI 保存以下工件：

- 提示词和工具上下文
- 工具调用和工具结果
- 生成的 UI 规范或组件选择
- 渲染的组件名称和属性
- 用户可见的标签
- 附加到按钮/表单上的操作
- 来自 UI 的模型可见状态更新
- 用户操作历史

然后编写如下检查：

- 每个破坏性操作必须有一个确认组件
- 按钮标签必须与操作语义匹配
- 渲染规范只能引用允许的组件
- 用户可见的总数必须与工具结果的总数匹配
- 表单不得请求任务范围之外的字段
- 小部件不得接收仅模型需要的秘密
- 隐藏的元数据不得与可见标签矛盾

这听起来很繁琐。但生产环境的信任正是由此而来。

## 我会从这些链接开始

如果你想从文章转向代码，以下是我找到的最佳起点：

- [AG-UI 仓库](https://github.com/ag-ui-protocol/ag-ui) 和 [AG-UI 文档](https://docs.ag-ui.com/introduction) 了解运行时事件模型。
- [A2UI 仓库](https://github.com/google/A2UI) 和 [A2UI 规范](https://a2ui.org/specification/v0.9-a2ui/) 了解声明式 agent 到 UI 的负载。
- [json-render 仓库](https://github.com/vercel-labs/json-render) 和 [json-render 文档](https://json-render.dev/) 了解基于目录的 JSON UI 生成。
- [CopilotKit 仓库](https://github.com/CopilotKit/CopilotKit) 和 [generative-ui 示例](https://github.com/CopilotKit/generative-ui) 了解 AG-UI、A2UI、Open-JSON-UI 和 MCP Apps 模式。
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) 了解沙箱化的 HTML/SVG/Canvas 视觉产物。
- [MCP-UI / MCP Apps SDK](https://github.com/MCP-UI-Org/mcp-ui) 了解基于 MCP 的 UI 资源。
- [OpenAI Apps SDK 文档](https://developers.openai.com/apps-sdk) 和 [Apps SDK 示例](https://github.com/openai/openai-apps-sdk-examples) 了解 ChatGPT 应用小部件。
- [Vercel AI SDK 生成式 UI 指南](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) 和 [AI Elements](https://elements.ai-sdk.dev/) 了解应用自有的聊天/工具渲染。
- [assistant-ui](https://github.com/assistant-ui/assistant-ui) 了解可组合的 React 聊天原语。
- [LangGraph 生成式 UI 文档](https://docs.langchain.com/langgraph-platform/generative-ui-react) 了解图发出的 UI 组件。
- [Hashbrown](https://github.com/liveloveapp/hashbrown) 了解 React/Angular 组件选择和客户端工具。
- [OpenUI](https://github.com/thesysdev/openui) 了解紧凑、流优先的模型生成 UI。
- [Tambo](https://github.com/tambo-ai/tambo) 了解带状态组件的 React 生成式 UI。
- [llm-ui](https://llm-ui.com/) 了解带自定义内联组件的平滑文本流。

## 关于项目稳定性的说明

该领域的每个主要协议都处于 1.0 版本之前。最后验证于 2026 年 5 月 8 日；请为变更做好计划，并在做出平台决策前查看当前文档。

**Vercel AI SDK RSC**——最初的“生成式 UI”头条功能——于 2024 年 10 月暂停开发（[讨论 #3251](https://github.com/vercel/ai/discussions/3251)），原因是架构限制且短期内无法修复。**json-render**（Vercel Labs）作为替代方向出现：基于目录、框架无关、无 RSC 耦合。自 2026 年初发布以来，它似乎迅速吸引了 Web 开发者的关注。可能的原因是开发者体验：json-render 在标准 React 项目中立即可用；而 A2UI 的跨平台范围增加了设置摩擦。

**A2UI**（Google）处于 1.0 版本之前，次要版本之间存在破坏性变更，且路线图沟通不一致。其优势在于真正的跨平台覆盖（Web、Flutter、SwiftUI），这是 json-render 未解决的。对于纯 Web 用例，目前 json-render 似乎拥有更好的工具覆盖；对于跨平台或远程 agent 场景，A2UI 的设计更为合适。两个规范之间有可能趋同——Vercel 已尝试从 json-render 生成兼容 A2UI 的输出。

**AG-UI**（CopilotKit）同样处于 1.0 版本之前。最常见的混淆是名称：AG-UI 是一个传输协议，而非 UI 框架。它定义了 agent 与前端之间*如何*流动事件；渲染什么仍由你决定。这个概念很扎实，且被广泛采用。规范仍在演进中。

## 我的看法

生成式 UI 不会取代精心设计的产品界面。它会取代那种懒惰的假设：聊天记录就是 AI 的通用界面。

最好的系统不会让模型随意发挥。它们会给模型一套小巧、锐利的产品原生构建块；一个可靠的运行时连接；清晰的安全边界；以及足够的自由度来根据任务调整界面。

未来不是“模型编写你的前端。”

未来更接近：**你的前端变成 agent 可以演奏的乐器，但你仍然决定这个乐器允许发出什么样的声音。**
````
