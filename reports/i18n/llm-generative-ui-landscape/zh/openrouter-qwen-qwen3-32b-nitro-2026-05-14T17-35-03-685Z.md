# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/zh/index.mdx
- Validation: deferred
- Runtime seconds: 23.10
- Input tokens: 11816
- Output tokens: 9075
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.003123
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 大型语言模型生成式用户界面全景
subTitle: 从工具到组件的渲染，到开放式生成——全面解析每种方法及其复杂度值得的场景。
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
Chat是训练轮。

第一代LLM应用大多看起来像是一个文本框被钉在产品上。模型返回散文。前端渲染markdown。如果用户需要采取行动，助手会描述用户应该去点击的按钮。

这对演示来说没问题。但那不是发展的方向。

下一步有用的是**生成式UI**：模型不仅用文本回答，还帮助决定用户现在需要哪个界面。有时这意味着调用工具并渲染预构建的卡片。有时这意味着用新数据填充已知的工作流组件。有时这意味着组合一个临时的仪表板、表单、比较表、图表或交互式小部件。

不幸的是，“生成式UI”已成为一个在早餐前就包含五种不同含义的短语。

人们用它来描述：

- 模型从开发者定义的React组件中选择
- 前端将JSON规范渲染为原生组件
- 从MCP工具返回的iframe应用
- 支持工具调用的聊天UI库
- 在前后端之间流式传输状态的代理协议
- 设计时代码生成器，如v0、Lovable、Bolt或Cursor
- 模型在运行时直接编写HTML、SVG、Canvas或React

这些相关但不在同一层。如果你将它们混为一谈，每次架构讨论都会变成一锅粥。

这是我最初比较当前堆栈时希望拥有的地图。

![LLM生成式UI生态系统的分层地图](../landscape-map.webp)

## 核心误解

最大的错误是将“生成式UI”视为一种技术选择。

最好将其拆分为四个层次：

1. **产品外壳**：用户接触的界面。这可能是聊天窗口、侧边栏协作者、仪表板、工作流构建器、IDE面板、ChatGPT应用、移动屏幕或支持控制台。
2. **UI组合模型**：模型允许使用的语法。这可能是工具调用、JSON、A2UI、json-render、OpenUI Lang、Hashbrown组件选择或沙箱HTML。
3. **运行时和传输**：消息、工具调用、状态增量、用户操作和UI工件在代理和前端之间如何传输。AG-UI、MCP Apps、Apps SDK、A2A、SSE、WebSockets和普通的HTTP都属于这一层。
4. **代理和工具后端**：LangGraph、Google ADK、CrewAI、Mastra、LlamaIndex、Pydantic AI、Agno、OpenAI Agents SDK、自定义函数、数据库、检索以及所有仍必须正确的无聊业务逻辑。

一旦拆分层次，生态系统就不再神秘。

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) 并不是 [A2UI](https://github.com/google/A2UI) 的竞争对手。AG-UI是代理与应用交互的事件协议。A2UI是代理可以发送的声明式UI格式。你可以将A2UI放在AG-UI之上。你也可以将自定义工具渲染的组件放在AG-UI之上。

[json-render](https://github.com/vercel-labs/json-render) 不是一个聊天产品。它是一个组件目录和渲染架构：定义模型可以使用的组件，让模型生成有效的JSON树，并安全地渲染该树。

[CopilotKit](https://github.com/CopilotKit/CopilotKit) 不仅仅是一个聊天气泡。它是代理原生应用的前端栈：聊天UI、生成式UI、共享状态、前端工具和人机交互流程。

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) 和 [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) 并不是"让我的React应用动态化"的工具。它们是用于在ChatGPT或其他MCP兼容宿主中渲染小部件的宿主集成模型。

这个领域名称混乱是因为它还很年轻。真正有价值的是这些层级结构。

## 控制光谱

生成式UI是**开发者控制**与**代理自由度**之间的权衡。

控制过多时，助手就像披着戏服的命令调色板。自由度过高时，模型会自信地发明奇怪的布局、模糊的按钮、破碎的视觉层级、不可能的状态以及安全问题。

关键在于选择解决用户问题所需的最小自由度。

![从工具渲染组件到开放生成HTML的光谱](../control-spectrum.webp)

我这样理解这个光谱：

**工具到组件渲染**是最安全的默认方案。模型调用`get_weather`、`search_products`、`compare_plans`或`draft_invoice`。应用将工具结果映射到你已有的组件：`WeatherCard`、`ProductGrid`、`PlanComparison`、`InvoiceReview`。模型决定UI何时有用。开发者仍然掌控布局、样式、可访问性、加载状态、空状态和危险操作。

这正是[Vercel AI SDK生成式UI指南](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)中记录的模式：模型调用工具，工具返回数据，UI根据结果渲染组件。这也是许多CopilotKit和assistant-ui实现背后的思维模型。

**声明式组件目录**给模型更多空间。模型不再选择单个组件，而是从允许的组件中组合树结构。目录可能包含`Metric`、`Table`、`Chart`、`FilterBar`、`ApprovalPanel`和`Timeline`。模型可以组装仪表板或工作流步骤，但不能执行任意代码。这正是[A2UI](https://github.com/google/A2UI)、[json-render](https://github.com/vercel-labs/json-render)、[Hashbrown](https://github.com/liveloveapp/hashbrown)和[OpenUI](https://github.com/thesysdev/openui)所处的位置。

**iframe迷你应用**在UI需要比组件树更丰富时，或远程工具提供方拥有体验时有意义。MCP Apps和OpenAI Apps SDK允许工具返回结构化数据加小部件资源，宿主在iframe中渲染。这对地图、购物车、预订流程、图表和外部产品界面非常强大。这也创造了宿主应用与小部件之间的更硬边界。

**开放生成**是光谱的远端：代理在沙箱中生成HTML、SVG、Canvas、WebGL或其他代码类工件。[OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI)是当前最好的例子：代理可以在沙箱iframe中生成算法可视化、3D场景、图表和模拟。这对一次性视觉解释很有用。这不是我为企业审批流程的起点。

明确区分关键区别很重要：**iframe HTML**（模型在沙箱中编写代码）与**JSON目录**（模型生成结构化规范，你的渲染器将其映射到预定义组件）。这些看似相关但风险和复杂度差异很大。iframe HTML表达力最强；iframe边界承担安全工作。JSON目录不给模型任何可执行自由——它只能引用你预先定义的组件类型。这个领域的大多数框架都明确属于其中一派。

**超越沙箱**：最新的演示表明正在形成第四种模式——LLM通过比任何组件目录更直接的方式控制视觉输出，驱动游戏式或沉浸式体验。从提示生成可探索的3D世界、运行时LLM指导NPC行为、通过WebGPU进行浏览器内模型推理（[WebLLM](https://mlc.ai/web-llm/)）是早期标志。目前还没有稳定的框架可用于生产工作。一旦情况改变，我会在专门的文章中探讨这个方向。

## 高级组件与细粒度组件

这是最重要的设计决策。

如果目录过于细粒度，模型就必须成为前端工程师：

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

这看起来灵活，但模型现在必须决定间距、层级、分组、空状态、按钮标签、错误处理和响应式行为。你同时也让提示词更大，输出更容易出错。

如果组件目录过于高级，模型就会被限制：

```tsx
WeatherCard
StockCard
HotelCard
```

这很安全，但只适用于已知场景。当用户的问题发生变化时，模型无法生成对比矩阵、请求缺失输入或调整信息架构。

有用的中间方案是**领域级组件与受限插槽**：

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

这些组件封装了产品品味和业务约束。模型可以决定*展示什么内容*，但不需要处理每个CSS决策。

例如，旅行代理不需要`div`、`span`和`button`。它需要：

- `TripSummary`
- `FlightOptionList`
- `HotelComparison`
- `TravelerForm`
- `PolicyNotice`
- `BookingConfirmation`

金融代理不需要通用图表工具。它需要：

- `PortfolioSnapshot`
- `TransactionTable`
- `RiskBreakdown`
- `ScenarioComparison`
- `ApprovalGate`

组件目录应该像你的产品，而不是像HTML。

## 功能对比表

这张表是有意带有主观判断的。它将每个项目视为堆栈中的工具，而非赢家通吃的平台。

| 技术 | 层级 | 最佳适用场景 | UI模型 | 流式传输/状态管理 | 备注和示例 |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](../ag-ui-protocol/ag-ui) | 运行时协议 | 连接代理后端与前端应用 | 消息、工具、状态、活动、中断的事件 | 是；事件流加状态快照/增量 | 需要标准代理到应用管道时使用。它与MCP和A2A互补而非替代。 |
| [A2UI](../google/A2UI) | 声明式UI协议 | 跨平台、代理生成的原生UI | 描述组件、数据模型和更新的JSON负载 | 专为增量更新设计 | 远程代理和信任边界的强选项。早期公开预览，但概念清晰。 |
| [json-render](../vercel-labs/json-render) | 组件目录和渲染器 | 让模型组合批准的组件 | 由类型化目录约束的JSON树 | 支持渐进式渲染 | 适用于React、Vue、Svelte、Solid、React Native、邮件、PDF、Remotion、终端等。 |
| [CopilotKit](../CopilotKit/CopilotKit) | 产品外壳和代理UI框架 | 应用内协作者、共享状态、前端工具、HITL | 工具渲染、AG-UI、A2UI、MCP Apps模式 | 是 | 最广泛的“构建代理原生应用”堆栈之一。参见[生成式UI示例](../CopilotKit/generative-ui)。 |
| [OpenGenerativeUI](../CopilotKit/OpenGenerativeUI) | 开放式UI生成展示 | 可视化解释、图表、模拟、图表 | 代理在沙箱iframe中生成HTML/SVG/Canvas | 渐进式可视化渲染 | 用于动态工件，当固定组件目录过于限制时使用。 |
| [MCP Apps / mcp-ui](../MCP-UI-Org/mcp-ui) | 主机/小部件标准 | 工具提供者通过MCP返回交互式UI | 从工具元数据链接的HTML资源 | 主机桥接和小部件操作 | 当UI属于工具提供者或需要iframe隔离时最佳。 |
| [OpenAI Apps SDK](../openai/apps-sdk) | ChatGPT应用主机集成 | 构建自定义ChatGPT应用小部件 | MCP服务器工具加iframe UI组件 | 工具输入/结果、小部件状态、后续消息 | 新ChatGPT应用应优先使用MCP Apps字段和`ui/*`桥接，`window.openai`用于兼容/扩展。 |
| [Vercel AI SDK UI](../ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | 应用SDK和聊天状态 | 自定义应用聊天、工具调用、流式消息部分 | 作为React组件渲染工具结果 | 是，通过`useChat`和UI消息流 | 如果你已拥有应用并需要更底层的控制，这是很好的基线。与[AI Elements](../elements.ai-sdk.dev/)配对使用UI原语。 |
| [assistant-ui](../assistant-ui/assistant-ui) | React聊天原语 | 生产级聊天UX与自定义渲染 | 可组合的聊天原语、工具调用渲染、JSON作为组件 | 是 | 如果你需要精致的聊天交互但想自建后端，这是强选项。 |
| [LangGraph Generative UI](../langchain.com/langgraph-platform/generative-ui-react) | 代理平台集成 | 将UI组件与图代码共置 | 图生成命名UI消息，由React组件渲染 | 是，包括自定义流事件 | 与LangGraph部署和图拥有UI组件自然契合。 |
| [Hashbrown](../liveloveapp/hashbrown) | 前端GenUI框架 | 暴露组件和客户端工具的React/Angular应用 | LLM选择并渲染允许的应用组件 | 支持流式模式 | 适用于将智能直接嵌入产品界面，而不仅仅是聊天。 |
| [OpenUI](../thesysdev/openui) | 紧凑的UI语言和运行时 | 比JSON更少token的流式模型生成UI | OpenUI语言加React运行时和组件库 | 专为token流设计 | 当JSON冗长成为瓶颈时有趣。仍处于早期，但值得关注。 |
| [Tambo](../tambo-ai/tambo) | React生成式UI SDK | 组件选择、有状态组件、客户端工具执行 | AI选择组件并与客户端工具交互 | 状态导向 | 流行的OSS React选项，专注于自动组件编排。 |
| [llm-ui](../llm-ui.com/) | 输出渲染器 | 带自定义内联组件的LLM文本输出 | 将模型输出字符串解析为React渲染 | 平滑的token渲染 | 适用于文本流中的轻量自定义组件；不是完整的代理UI协议。 |
| AI SDK RSC / React Server Components | 旧模式/框架特性 | Next.js中的服务器渲染组件流 | 模型/工具流返回服务器渲染的UI | 是，但框架特定 | 2024年10月开发暂停([讨论#3251](../vercel/ai/discussions/3251))；非推荐路径。迁移到`useObject`或json-render。 |

## 不同产品应使用什么

以下是我在团队中实际使用的推荐矩阵。

**你正在向现有SaaS应用添加助手。**

从工具到组件渲染开始。使用[Vercel AI SDK UI](../ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)、[assistant-ui](../assistant-ui/assistant-ui)或[CopilotKit](../CopilotKit/CopilotKit)，根据所需的代理状态和前端工具集成程度选择。初始阶段保持目录极小。渲染你已经信任的产品组件。

**你正在构建需要共享状态的严肃应用内协作者。**

仔细考虑CopilotKit配合AG-UI的组合。其关键特性并非"聊天"，而是共享状态和双向交互：代理可以请求输入、渲染UI、更新状态，并暂停等待批准。

**您需要将UI跨边界传输给远程代理时**

使用A2UI或类似A2UI的声明式协议。其核心价值在于远程代理可以将UI描述为数据，而宿主环境仍能掌控原生渲染、安全性和样式。如果还需要实时代理/应用交互，可通过AG-UI或您环境标准化的传输协议实现。

**您在ChatGPT或MCP兼容宿主内开发时**

使用MCP Apps和Apps SDK路径。OpenAI当前文档推荐新项目使用MCP Apps的`ui/*`桥接，同时保留`window.openai`作为兼容层和可选扩展面。同样采用其数据工具与渲染工具的分离策略：让模型先获取数据并进行推理，再决定渲染组件。

**您需要在自有应用中实现自然语言仪表盘、报告或表单时**

尝试json-render、Hashbrown或OpenUI。关键是组件目录。若暴露`LineChart`、`DataTable`、`MetricGroup`、`FilterControl`和`InsightCallout`，模型就能组装出有用的报告界面，而无需接触任意代码。

**您需要教育类、可视化或高度定制的UI组件时**

使用开放沙箱如OpenGenerativeUI。允许模型生成SVG、Canvas、WebGL或独立HTML，但需将输出视为不可信内容。进行沙箱隔离、尺寸限制、权限剥离，并与特权应用状态隔离。

**您主要需要更美观的流式Markdown和少量内联交互时**

不要过度设计。llm-ui或assistant-ui的工具渲染可能已足够。

## 需要避免的典型错误

**错误1：允许模型在运行时生成生产环境React代码**

存在特例，但对产品UI这通常是错误默认。运行时代码生成难以保障安全、难以测试、难以主题化、难以保持可访问性。若模型能通过可信组件组合完成任务，应优先采用该方案。

**错误2：暴露设计原语而非产品原语**

当您给模型提供`Row`、`Column`、`Text`和`Button`时，等于要求它成为您的设计系统。最终只会得到平庸的设计。应提供更高层次的产品概念组件。

**错误3：认为有效JSON就等于安全UI**

数据包可能通过模式验证，但仍可能具有操控性或危险性。标签显示"查看发票"时，操作可能实际在归档账户。应将UI规范视为行为而非装饰，关键操作需要策略测试、语义校验和人工确认。

**错误4：将业务逻辑放入渲染工具中。**

渲染工具应负责渲染。数据工具应负责获取、计算、修改和验证。OpenAI的Apps SDK文档之所以强调这种分离是有原因的：如果每个数据工具都自带控件，模型在展示结果前将失去推理的空间。

**错误5：优化新奇性而非任务完成。**

目标不是让每个答案都变成独特的界面。关键是减少摩擦。一个稳定、普通但能节省用户四分钟的审批面板，胜过一个炫目却无法信任两次的生成式仪表盘。

## 实用架构方案

如果我现在要启动一个新产品，我会采用分阶段方法：

1. **优先交付受控工具UI**。将已知工具映射到已知组件。记录每次工具调用、UI渲染和用户操作。
2. **添加领域组件库**。当模式重复出现时，暴露`ComparisonTable`、`DecisionPanel`、`DataCollectionForm`、`Timeline`等产品专用组件。
3. **仅在需要时添加传输标准化**。若同时掌控前后端，普通流式传输可能足够；若存在多个代理框架，使用AG-UI；若工具跨产品边界，使用MCP；若代理跨组织边界，关注A2A和A2UI。
4. **用iframe控件处理外部或复杂界面**。地图、购物车、预订流程和第三方小程序应隔离在边界后。
5. **将开放式生成保留给辅助内容**。图表、模拟、临时说明和可视化草稿非常适合。核心工作流则不适用。

最终架构将呈现如下结构：

```txt
用户意图
  -> 代理运行时
  -> 工具/数据调用
  -> 结构化结果
  -> UI决策
  -> 可信组件、声明式规范或沙箱控件
  -> 用户操作
  -> 状态/事件流返回代理
```

这才是真正的产品。聊天框只是可能的输入设备之一。

## 评估应包含UI本身

LLM团队正在逐步学习评估提示词和模型输出。生成式UI增加了新的评估维度：界面本身可能出错。

对每个生成的UI至少保存以下工件：
- 提示词和工具上下文
- 工具调用和结果
- 生成的UI规范或组件选择
- 渲染组件名称和属性
- 用户可见标签
- 按钮/表单绑定的操作
- UI向模型可见的状态更新
- 用户操作历史

然后编写检查规则：
- 每个破坏性操作必须有确认组件
- 按钮标签必须匹配操作语义
- 渲染规范只能引用允许的组件
- 用户可见总计必须与工具结果一致
- 表单不得请求任务范围外的字段
- 控件不得接收仅模型需要的密钥
- 隐藏元数据不得与可见标签矛盾

这听起来繁琐。但这也是生产环境信任的来源。

## 我会优先参考的链接

若要从文章过渡到代码，以下是我发现的最佳起点：

- [AG-UI 仓库](https://github.com/ag-ui-protocol/ag-ui) 和 [AG-UI 文档](https://docs.ag-ui.com/introduction) 用于运行时事件模型。
- [A2UI 仓库](https://github.com/google/A2UI) 和 [A2UI 规范](https://a2ui.org/specification/v0.9-a2ui/) 用于声明式代理到UI的负载。
- [json-render 仓库](https://github.com/vercel-labs/json-render) 和 [json-render 文档](https://json-render.dev/) 用于目录驱动的JSON UI生成。
- [CopilotKit 仓库](https://github.com/CopilotKit/CopilotKit) 和 [生成式UI示例](https://github.com/CopilotKit/generative-ui) 用于AG-UI、A2UI、Open-JSON-UI和MCP Apps模式。
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) 用于沙箱化的HTML/SVG/Canvas可视化组件。
- [MCP-UI / MCP Apps SDK](https://github.com/MCP-UI-Org/mcp-ui) 用于通过MCP传输UI资源。
- [OpenAI Apps SDK 文档](https://developers.openai.com/apps-sdk) 和 [Apps SDK 示例](https://github.com/openai/openai-apps-sdk-examples) 用于ChatGPT应用小部件。
- [Vercel AI SDK 生成式UI指南](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) 和 [AI Elements](https://elements.ai-sdk.dev/) 用于应用拥有的聊天/工具渲染。
- [assistant-ui](https://github.com/assistant-ui/assistant-ui) 用于可组合的React聊天原语。
- [LangGraph 生成式UI文档](https://docs.langchain.com/langgraph-platform/generative-ui-react) 用于图生成的UI组件。
- [Hashbrown](https://github.com/liveloveapp/hashbrown) 用于React/Angular组件选择和客户端工具。
- [OpenUI](https://github.com/thesysdev/openui) 用于紧凑的、以流优先的模型生成UI。
- [Tambo](https://github.com/tambo-ai/tambo) 用于带有状态组件的React生成式UI。
- [llm-ui](https://llm-ui.com/) 用于平滑的文本流和自定义内联组件。

## 关于项目稳定性的说明

该领域所有主要协议均处于1.0版本之前。最后验证时间为2026年5月8日；在进行平台选择前请预期变更并查阅最新文档。

**Vercel AI SDK RSC** —— 原始的"生成式UI"核心功能 —— 由于架构限制在2024年10月暂停开发 ([讨论#3251](https://github.com/vercel/ai/discussions/3251))，这些限制短期内无法解决。**json-render**（Vercel Labs）作为替代方案出现：基于目录、框架无关、不依赖RSC。自2026年初发布以来，它迅速获得了Web开发者的关注。很可能的原因是开发者体验：json-render可立即在标准React项目中运行；而A2UI的跨平台范围增加了设置摩擦。

**A2UI**（Google）处于1.0版本之前，次要版本之间存在破坏性变更且路线图沟通不一致。其优势在于真正的跨平台覆盖（Web、Flutter、SwiftUI），这是json-render未覆盖的领域。对于当前纯Web用例，json-render的工具链更完善；对于跨平台或远程代理场景，A2UI的设计更合适。两者规范可能收敛 —— Vercel已尝试从json-render输出A2UI兼容内容。

**AG-UI**（CopilotKit）同样处于1.0版本之前。最常见的混淆来自名称：AG-UI是传输协议，不是UI框架。它定义代理与前端之间事件流动的方式；具体渲染仍由开发者决定。该概念已被广泛采用，规范仍在演进中。

## 我的观点

生成式UI不会取代精心设计的产品界面。它将取代那种认为聊天记录是AI通用界面的懒惰假设。

最佳系统不会让模型自由发挥所有内容。它们会提供一组精炼的产品原生构建块、可靠的运行时连接、清晰的安全边界，以及足够的自由度以适应任务需求。

未来不是"模型编写你的前端"。

未来更接近于：**你的前端成为代理可操作的乐器，但你仍决定乐器允许发出的声音类型。**
````
