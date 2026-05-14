# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/zh/index.mdx
- Validation: deferred
- Runtime seconds: 20.38
- Input tokens: 12124
- Output tokens: 6924
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.001719
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: LLM 生成式 UI 生态
subTitle: 从工具到组件的渲染到开放式生成——每种方法的全景图及其适用复杂度。
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
Chat 是训练轮。

第一代 LLM 应用大多看起来像是一个贴在产品上的文本框。模型返回 prose，前端渲染 markdown。如果用户需要执行操作，助手会描述用户应该去点击的按钮位置。

这对演示来说够用了，但不是未来的方向。

下一个有价值的步骤是 **生成式 UI**：模型不仅仅用文字回答，它帮助决定用户当前需要的界面。有时这意味着调用工具并渲染预构建的卡片；有时是用新数据填充已知的工作流组件；有时是组合临时的仪表盘、表单、对比表、图表或交互部件。

不幸的是，“生成式 UI”已经变成了早餐前就能涵盖五种不同含义的词。

人们用它来描述：

- 模型从开发者定义的 React 组件中挑选
- 前端将 JSON 规范渲染为原生组件
- 从 MCP 工具返回的 iframe 应用
- 支持工具调用的聊天 UI 库
- 在后端和前端之间流式传递状态的代理协议
- 如 v0、Lovable、Bolt、Cursor 等设计时代码生成器
- 模型在运行时直接写 HTML、SVG、Canvas 或 React

这些确实有关联，但并非同一层。如果把它们混在一起，每次架构讨论都会沦为一锅乱炖。

这就是我在首次比较当前技术栈时希望拥有的地图。

![LLM 生成式 UI 生态的分层地图](../landscape-map.webp)

## 核心误解

最大的问题是把 “生成式 UI” 当作单一技术选项来对待。

更好的做法是把问题拆分为四层：

1.  **产品外壳**：用户触碰的东西。可能是聊天窗口、侧边栏 copilot、仪表盘、工作流构建器、IDE 面板、ChatGPT 应用、移动屏幕或支持控制台。
2.  **UI 组合模型**：模型被允许使用的语法。可能是工具调用、JSON、A2UI、json‑render、OpenUI Lang、Hashbrown 组件选择，或受限的 HTML。
3.  **运行时与传输层**：消息、工具调用、状态增量、用户操作和 UI 产物在代理与前端之间的流转方式。AG‑UI、MCP Apps、Apps SDK、A2A、SSE、WebSockets 以及老式 HTTP 都属于这一层。
4.  **代理与工具后端**：LangGraph、Google ADK、CrewAI、Mastra、LlamaIndex、Pydantic AI、Agno、OpenAI Agents SDK、自定义函数、数据库、检索以及所有仍需正确实现的业务逻辑。

把层级拆开后，生态就不再神秘。

[AG‑UI](https://github.com/ag-ui-protocol/ag-ui) 并不是 [A2UI](https://github.com/google/A2UI) 的竞争对手。AG‑UI 是一种面向代理‑到‑应用交互的事件协议。A2UI 是代理可以发送的声明式 UI 格式。你可以在 AG‑UI 上层叠加 A2UI，也可以在 AG‑UI 上层叠加自定义的工具渲染组件。

[json‑render](https://github.com/vercel-labs/json-render) 不是聊天产品。它是组件目录和渲染器架构：定义模型可使用的组件，让模型输出合法的 JSON 树，然后安全地渲染该树。

[CopilotKit](https://github.com/CopilotKit/CopilotKit) 不仅仅是聊天气泡。它是面向代理原生应用的前端栈：聊天 UI、生成式 UI、共享状态、前端工具以及人机交互流程。

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) 和 [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) 并不是 “让我的 React 应用动态化” 的工具。它们是用于在 ChatGPT 或其他兼容 MCP 的宿主中渲染小部件的宿主集成模型。

名称之所以让人困惑，是因为这个领域还很年轻。层次结构才是长期有用的部分。

## 控制光谱

生成式 UI 本质上是 **开发者控制** 与 **代理自由度** 之间的权衡。

控制太多，助手就像穿着戏服的命令面板。自由度太高，模型会随意编排奇怪的布局、模糊的按钮、破碎的视觉层级、不可实现的状态，并且自信地露出安全隐患的笑容。

关键在于挑选能够解决用户问题的最小自由度。

![从工具渲染组件到开放式生成 HTML 的光谱](../control-spectrum.webp)

我对这条光谱的理解如下：

**工具到组件的渲染** 是最安全的默认方式。模型调用 `get_weather`、`search_products`、`compare_plans` 或 `draft_invoice`。应用把这些工具返回的结果映射到你已经拥有的组件：`WeatherCard`、`ProductGrid`、`PlanComparison`、`InvoiceReview`。模型决定 *何时* 显示 UI。开发者仍然掌控布局、样式、可访问性、加载状态、空状态以及危险操作。

这正是 [Vercel AI SDK 的生成式 UI 指南](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) 中记录的模式：模型调用工具，工具返回数据，UI 根据结果渲染组件。这也是许多 CopilotKit 和 assistant‑ui 实现背后的思路。

**声明式组件目录** 为模型提供了更多空间。模型不再只能选一个组件，而是可以从允许的部件中组合成一棵树。目录可能包含 `Metric`、`Table`、`Chart`、`FilterBar`、`ApprovalPanel`、`Timeline` 等。模型可以组装出仪表盘或工作流步骤，但不能执行任意代码。这正是 [A2UI](https://github.com/google/A2UI)、[json‑render](https://github.com/vercel-labs/json-render)、[Hashbrown](https://github.com/liveloveapp/hashbrown) 和 [OpenUI](https://github.com/thesysdev/openui) 所处的位置。

**Iframe 小程序** 适用于 UI 需要比组件树更丰富，或远程工具提供方拥有完整体验的场景。MCP Apps 和 OpenAI Apps SDK 让工具返回结构化数据加上一个小部件资源，宿主在 iframe 中渲染它们。这对地图、购物车、预订流程、图表以及外部产品界面非常有力，同时也在宿主应用与小部件之间建立了更硬的边界。

**开放式生成** 位于光谱的最远端：代理在沙箱中输出 HTML、SVG、Canvas、WebGL 或其他类似代码的产物。[OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) 是目前最好的示例：代理可以在受限的 iframe 中生成算法可视化、3D 场景、图示和仿真。这对一次性视觉解释非常有用，但并不是我会为企业审批流程首选的起点。

这里的关键区分是：**iframe HTML**（模型在沙箱中写代码） 与 **JSON 目录**（模型输出结构化规范，由渲染器映射到预构建组件）。两者听起来相似，却拥有截然不同的风险和复杂度特征。iframe HTML 表达力最大，安全工作由 iframe 边界承担。JSON 目录则不给模型可执行的自由度——它只能引用你事先定义好的组件类型。该领域的大多数框架显然落在这两类之一。

**超出沙箱**：最近的演示暗示正在形成第四种模式——LLM 通过直接控制视觉输出，驱动类似游戏或沉浸式体验，超出任何组件目录的限制。项目包括从提示生成可探索的 3D 世界、运行时由 LLM 指导的 NPC 行为，以及通过 WebGPU 在浏览器中进行模型推理的 [WebLLM](https://mlc.ai/web-llm/)。目前尚无成熟框架可用于生产环境，我将在后续专文中详细讨论这一方向。

## 高层组件 vs 细粒度组件

这是最关键的设计决策。

如果你的目录过于细粒，模型就必须充当前端工程师：

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

看起来很灵活，但此时模型必须自行决定间距、层级、分组、空状态、按钮标签、错误处理以及响应式行为。这样会让提示变得更长，输出也更容易被截断。

如果你的目录层次过于抽象，模型就会被限制：

```tsx
WeatherCard
StockCard
HotelCard
```

安全性更高，但只能应对已知场景。模型无法生成对比矩阵、请求缺失输入，或在用户问题变化时调整信息架构。

最实用的中间层是 **带受限插槽的领域级组件**：

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

这些组件编码了产品口味和业务约束。模型可以决定 *展示什么*，但不必处理每一个 CSS 细节。

例如，旅行代理不需要 `div`、`span`、`button`，它需要：

- `TripSummary`
- `FlightOptionList`
- `HotelComparison`
- `TravelerForm`
- `PolicyNotice`
- `BookingConfirmation`

金融代理不需要通用的图表 playground，它需要：

- `PortfolioSnapshot`
- `TransactionTable`
- `RiskBreakdown`
- `ScenarioComparison`
- `ApprovalGate`

目录的命名应当像你的产品，而不是 HTML。

## 功能表

此表刻意带有主观色彩。它把每个项目视作技术栈中的一个工具，而非“一统天下”的平台。

| 技术 | 层级 | 最佳适配 | UI 模型 | 流式 / 状态 | 备注与示例 |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | 运行时协议 | 将代理后端连接到前端应用 | 消息、工具、状态、活动、打断的事件 | 是；事件流 + 状态快照/增量 | 需要标准的代理‑到‑应用管道时使用。它是 MCP 与 A2A 的补充，而非替代。 |
| [A2UI](https://github.com/google/A2UI) | 声明式 UI 协议 | 跨平台、代理生成的原生 UI | 描述组件、数据模型和更新的 JSON 负载 | 为增量更新而设计 | 适合远程代理和信任边界。公开预览阶段，概念上相当干净。 |
| [json-render](https://github.com/vercel-labs/json-render) | 组件目录与渲染器 | 让模型组合已批准的组件 | 受类型化目录约束的 JSON 树 | 支持渐进渲染 | 兼容 React、Vue、Svelte、Solid、React Native、邮件、PDF、Remotion、终端等。 |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | 产品外壳与代理 UI 框架 | 应用内 copilots、共享状态、前端工具、HITL | 工具渲染、AG-UI、A2UI、MCP Apps 模式 | 是 | 最全的 “构建代理原生应用” 栈之一。参见 [generative‑ui 示例](https://github.com/CopilotKit/generative-ui)。 |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | 开放式 UI 生成展示 | 可视化解释、图表、模拟、图形 | 代理向沙箱 iframe 中输出 HTML / SVG / Canvas | 渐进视觉渲染 | 当固定组件目录过于受限时用于动态产物。 |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | 主机/小部件标准 | 工具提供者通过 MCP 返回交互式 UI | 从工具元数据链接的 HTML 资源 | 主机桥接与小部件动作 | 当 UI 属于工具提供者或需要 iframe 隔离时最佳。 |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | ChatGPT 应用宿主集成 | 构建自定义 ChatGPT 小部件 | MCP 服务器工具 + iframe UI 组件 | 工具输入/结果、部件状态、后续消息 | 新的 ChatGPT 应用应优先使用 MCP Apps 字段和 `ui/*` 桥接，并通过 `window.openai` 保持兼容/扩展。 |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | 应用 SDK 与聊天状态 | 自定义应用聊天、工具调用、流式消息片段 | 将工具结果渲染为 React 组件 | 是，使用 `useChat` 与 UI 消息流 | 若已有自建应用且想要更底层控制，这是很好的基线。可配合 [AI Elements](https://elements.ai-sdk.dev/) 使用 UI 基元。 |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | React 聊天原语 | 生产级聊天体验与自定义渲染 | 可组合的聊天原语、工具调用渲染、JSON 组件化 | 是 | 若需要精致的聊天交互且自行提供后端，这是强力选项。 |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | 代理平台集成 | 将 UI 组件与图谱代码共置 | 图谱发出命名 UI 消息，由 React 组件渲染 | 是，支持自定义流事件 | 与 LangGraph 部署以及图谱拥有的 UI 组件天然匹配。 |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | 前端 GenUI 框架 | 在 React/Angular 应用中暴露组件与客户端工具 | LLM 选择并渲染允许的应用组件 | 支持流式模式 | 适合将智能直接嵌入产品表面，而非仅限聊天。 |
| [OpenUI](https://github.com/thesysdev/openui) | 紧凑 UI 语言与运行时 | 使用比 JSON 更少 token 的可流式模型生成 UI | OpenUI 语言 + React 运行时与组件库 | 为 token 流式设计 | 当 JSON 冗余成为瓶颈时值得关注。仍在早期阶段，但值得观察。 |
| [Tambo](https://github.com/tambo-ai/tambo) | React 生成式 UI SDK | 组件选择、状态化组件、客户端工具执行 | AI 选择组件并与客户端工具交互 | 面向状态 | 受欢迎的 OSS React 方案，专注自动化组件编排。 |
| [llm-ui](https://llm-ui.com/) | 输出渲染器 | 使用自定义内联组件平滑 LLM 文本输出 | 将模型输出字符串解析为 React 渲染 | 平滑 token 渲染 | 适用于文本流中轻量级自定义组件；不是完整的代理 UI 协议。 |
| AI SDK RSC / React Server Components | 旧模式 / 框架特性 | Next.js 中的服务器渲染组件流 | 模型/工具流返回服务器渲染 UI | 是，但仅限框架 | 2024 年 10 月已暂停开发（[讨论 #3251](https://github.com/vercel/ai/discussions/3251)），不推荐。迁移至 `useObject` 或 json-render。 |

## 各类产品的选型建议

以下是我在实际团队中会使用的推荐矩阵。

**你要在已有 SaaS 应用中加入助手。**

先从工具‑到‑组件渲染入手。根据所需的代理状态和前端工具集成程度，选用 [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)、[assistant‑ui](https://github.com/assistant-ui/assistant-ui) 或 [CopilotKit](https://github.com/CopilotKit/CopilotKit)。一开始保持目录极小，只渲染已经可信的产品组件。

**你在构建需要共享状态的严肃应用内 copilots。**

仔细观察 CopilotKit 与 AG-UI 的组合。关键特性并不是“聊天”。而是共享状态和双向交互：代理可以请求输入、渲染 UI、更新状态，并在获得批准前暂停。

**你有需要跨边界发送 UI 的远程代理。**

使用 A2UI 或类似 A2UI 的声明式协议。核心在于远程代理可以把 UI 描述为数据，而宿主仍然掌控原生渲染、安全和样式。如果还需要实时的代理/应用交互，则在 AG-UI 或你所在环境标准化的传输层上运行。

**你在 ChatGPT 或兼容 MCP 的宿主内部构建。**

使用 MCP Apps 与 Apps SDK 路径。OpenAI 当前文档建议在新项目中使用 MCP Apps 的 `ui/*` 桥接，同时保留 `window.openai` 作为兼容层和可选的扩展入口。还要沿用它们在数据工具与渲染工具之间的划分：让模型先获取并推理数据，再决定渲染哪个部件。

**你想在自己的应用中提供自然语言仪表盘、报告或表单。**

尝试 json‑render、Hashbrown 或 OpenUI。关键在于组件目录。如果向模型公开 `LineChart`、`DataTable`、`MetricGroup`、`FilterControl`、`InsightCallout` 等组件，模型就能组装出有用的报告界面，而无需触及任意代码。

**你需要教育类、可视化或高度定制的产出。**

使用类似 OpenGenerativeUI 的开放式沙箱。允许模型生成 SVG、Canvas、WebGL 或自包含的 HTML，但要把输出当作不可信的用户内容来处理。对其进行沙箱隔离、尺寸限制、权限剥离，并且远离特权应用状态。

**你主要只需要更好看的流式 Markdown，偶尔带点内联交互。**

不要过度构建。llm‑ui 或 assistant‑ui 的工具渲染可能已经足够。

## 我会避免的错误

**错误 1：让模型在运行时生成生产级 React。**

有例外情况，但对产品 UI 来说，这通常不是合适的默认方案。运行时代码生成难以保证安全、难以测试、难以主题化，也难以保持可访问性。如果模型能够通过选择受信任的组件完成任务，就采用这种方式。

**错误 2：暴露设计原语而不是产品原语。**

当你给模型 `Row`、`Column`、`Text`、`Button` 时，你实际上让它充当你的设计系统，结果往往只能得到一个平庸的系统。应提供更高层次的产品级名词。

**错误 3：认为有效的 JSON 就等同安全的 UI。**

一个负载即使通过了模式校验，也可能具有操纵性或危险性。标签可以写成 “查看发票”，但对应的动作却是归档账户。把 UI 规范视为行为而非装饰，需要进行策略测试、语义检查，并对关键操作进行人工确认。

**错误 4：在渲染工具中放置业务逻辑。**

渲染工具只负责渲染。数据工具负责获取、计算、变更和校验。OpenAI 的 Apps SDK 文档之所以强调这种划分，是因为如果每个数据工具都拖着一个 widget，一旦模型在呈现之前就被占满，就失去了推理空间。

**错误 5：为新奇感优化，而非任务完成。**

重点不是让每个答案都变成雪花式界面，而是降低摩擦。一个稳定、乏味的审批面板能为用户节省四分钟，胜过一个炫目的生成仪表盘——后者往往难以获得两次信任。

## 实用架构

如果今天要启动一个新产品，我会采用分阶段的方式：

1.  **先交付受控的工具 UI。** 将已知工具映射到已知组件。记录每一次工具调用、UI 渲染和用户操作。
2.  **加入领域目录。** 当模式重复出现时，公开 `ComparisonTable`、`DecisionPanel`、`DataCollectionForm`、`Timeline` 等产品专属组件。
3.  **仅在需要时标准化传输层。** 若前后端同属一体，普通流式传输即可。若使用多个代理框架，采用 AG-UI。若工具跨产品边界，使用 MCP。若代理跨组织边界，关注 A2A 与 A2UI。
4.  **对外部或复杂表面使用 iframe 小部件。** 地图、购物车、预订流程以及第三方小程序都应置于边界之后。
5.  **将开放式生成保留给产出物。** 图表、仿真、临时说明和可视化草稿板非常适合。核心工作流则不宜如此。

该架构的示意如下：

```txt
User intent
  -> agent runtime
  -> tool/data calls
  -> structured result
  -> UI decision
  -> trusted component, declarative spec, or sandboxed widget
  -> user action
  -> state/event stream back to the agent
```

这条循环才是真正的产品，聊天框仅是可能的输入方式之一。

## 评估必须覆盖 UI

LLM 团队正逐步学会评估提示和模型输出。生成式 UI 额外引入了一个评估面：界面本身也可能出错。

至少要为每一次生成的 UI 保存以下工件：

- 提示词及工具上下文
- 工具调用及其返回结果
- 生成的 UI 规范或组件选择
- 渲染的组件名称和属性
- 面向用户的标签
- 按钮/表单绑定的动作
- 模型可见的 UI 状态更新
- 用户操作历史

随后编写检查规则，例如：

- 每个破坏性操作必须配备确认组件
- 按钮标签必须与动作语义相匹配
- 渲染规范只能引用允许的组件
- 面向用户的总计必须与工具返回的总计一致
- 表单不得请求任务范围之外的字段
- 小部件不得接收仅模型需要的机密信息
- 隐藏的元数据不得与可见标签相冲突

听起来繁琐，但正是这里决定了生产环境的可信度。

## 我会先看的链接

如果你想从文章直接跳到代码实现，以下是我找到的最佳起点：

- [AG-UI 仓库](https://github.com/ag-ui-protocol/ag-ui) 与 [AG-UI 文档](https://docs.ag-ui.com/introduction) —— 用于运行时事件模型。  
- [A2UI 仓库](https://github.com/google/A2UI) 与 [A2UI 规范](https://a2ui.org/specification/v0.9-a2ui/) —— 用于声明式 agent‑to‑UI 负载。  
- [json‑render 仓库](https://github.com/vercel-labs/json-render) 与 [json‑render 文档](https://json-render.dev/) —— 用于目录驱动的 JSON UI 生成。  
- [CopilotKit 仓库](https://github.com/CopilotKit/CopilotKit) 与 [generative‑ui 示例](https://github.com/CopilotKit/generative-ui) —— 展示 AG‑UI、A2UI、Open‑JSON‑UI 与 MCP Apps 模式。  
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) —— 用于沙箱化的 HTML/SVG/Canvas 可视化产物。  
- [MCP‑UI / MCP Apps SDK](https://github.com/MCP-UI-Org/mcp-ui) —— 用于在 MCP 上提供 UI 资源。  
- [OpenAI Apps SDK 文档](https://developers.openai.com/apps-sdk) 与 [Apps SDK 示例](https://github.com/openai/openai-apps-sdk-examples) —— 用于 ChatGPT 应用小部件。  
- [Vercel AI SDK 生成式 UI 指南](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) 与 [AI Elements](https://elements.ai-sdk.dev/) —— 用于应用自有的聊天/工具渲染。  
- [assistant‑ui](https://github.com/assistant-ui/assistant-ui) —— 用于可组合的 React 聊天原语。  
- [LangGraph 生成式 UI 文档](https://docs.langchain.com/langgraph-platform/generative-ui-react) —— 用于图生成的 UI 组件。  
- [Hashbrown](https://github.com/liveloveapp/hashbrown) —— 用于 React/Angular 组件选择和客户端工具。  
- [OpenUI](https://github.com/thesysdev/openui) —— 用于紧凑、流式优先的模型生成 UI。  
- [Tambo](https://github.com/tambo-ai/tambo) —— 用于带状态组件的 React 生成式 UI。  
- [llm‑ui](https://llm-ui.com/) —— 用于带自定义内联组件的平滑文本流。

## 项目稳定性说明

该领域的每个主要协议都仍处于 1.0 之前。最近一次验证时间为 2026 年 5 月 8 日；请预留变更空间，并在做平台决策前检查最新文档。

**Vercel AI SDK RSC** —— 最初的 “Generative UI” 头条特性 —— 已于 2024 年 10 月暂停开发（[讨论 #3251](https://github.com/vercel/ai/discussions/3251)），原因是架构限制且近期暂无解决方案。**json‑render**（Vercel Labs）随之成为替代方向：基于目录、框架无关、无 RSC 绑定。自 2026 年初发布以来，它迅速获得 Web 开发者关注。主要原因在于开发者体验：json‑render 可直接在标准 React 项目中使用；而 A2UI 的跨平台范围会增加设置摩擦。

**A2UI**（Google）仍在 1.0 之前，次版本之间会有破坏性变更，路线图沟通也不够一致。它的优势在于真正的跨平台覆盖（Web、Flutter、SwiftUI），这是 json‑render 所不具备的。对于纯 Web 场景，json‑render 的工具链更成熟；而在跨平台或远程 agent 场景下，A2UI 的设计更合适。两者规范的趋同是可能的——Vercel 已尝试让 json‑render 输出兼容 A2UI。

**AG‑UI**（CopilotKit）同样处于 1.0 之前。最常见的混淆在于名称：AG‑UI 是一种传输协议，而非 UI 框架。它定义了 *事件在 agent 与前端之间如何流动*；具体渲染仍由开发者决定。概念扎实且被广泛采用，规范仍在演进中。

## 我的观点

生成式 UI 不会取代精心设计的产品界面。它会取代那种认为聊天记录是 AI 通用界面的懒散假设。

最好的系统不会让模型随意发挥一切，而是给它一套小而锋利的、产品原生的构建块；一个可靠的运行时连接；明确的安全边界；以及足够的自由度来让界面适配具体任务。

未来不是 “模型直接写你的前端”。  
未来更像是：**你的前端成为 agent 可以演奏的乐器，而你仍然决定这件乐器可以发出什么声音。**
````
