# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/ru/index.mdx
- Validation: deferred
- Runtime seconds: 24.20
- Input tokens: 21145
- Output tokens: 7595
- Thinking tokens: unknown
- Cached input tokens: 5248
- Cache write tokens: 0
- Estimated cost: $0.002192
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Ландшафт генеративного UI на базе LLM
subTitle: >-
  От рендеринга инструмента в компонент до открытой генерации — карта всех
  подходов и когда каждый оправдывает свою сложность.
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
Chat был тренировочным колесом.

Первая генерация LLM‑приложений в основном выглядела как текстовое поле, приклеенное к продукту. Модель возвращала прозу. Фронтенд рендерил markdown. Если пользователю нужно было выполнить действие, помощник описывал кнопку, которую пользователь должен нажать где‑то ещё.

Для демонстраций этого было достаточно. Но это не конечная цель.

Следующий полезный шаг — **генеративный UI**: модель больше не отвечает только текстом; она помогает решить, какой интерфейс нужен пользователю в данный момент. Иногда это означает вызов инструмента и отображение готовой карточки. Иногда — заполнение известного компонента рабочего процесса свежими данными. Иногда — составление временной панели мониторинга, формы, сравнительной таблицы, графика или интерактивного виджета.

К сожалению, «генеративный UI» превратилось в одну из тех фраз, которые к утру означают уже пять разных вещей.

Люди используют её, чтобы описать:

- модель выбирает из заранее определённых разработчиком React‑компонентов  
- JSON‑спецификация, которую фронтенд рендерит в нативные компоненты  
- iframe‑приложение, возвращаемое инструментом MCP  
- библиотека чат‑интерфейса, поддерживающая вызовы инструментов  
- протокол агента, передающий состояние между бэкендом и фронтендом в режиме стрима  
- генератор кода на этапе проектирования, такой как v0, Lovable, Bolt или Cursor  
- модель, буквально пишущая HTML, SVG, Canvas или React во время выполнения  

Это связанные вещи, но они находятся на разных уровнях. Если их смешать, каждый разговор об архитектуре превращается в кашу.

Это карта, которой я хотел бы обладать, когда впервые начал сравнивать существующий стек.

![Картографическое представление многослойного ландшафта генеративного UI LLM](../landscape-map.webp)

## Основное недоразумение

Самая большая ошибка — рассматривать «генеративный UI» как единый технологический выбор.

Лучше разбить задачу на четыре уровня:

1. **Оболочка продукта**: то, с чем взаимодействует пользователь. Это может быть чат, боковая панель‑копилот, дашборд, конструктор рабочих процессов, панель IDE, приложение ChatGPT, мобильный экран или консоль поддержки.
2. **Модель композиции UI**: грамматика, на которой разрешено говорить модели. Это могут быть вызовы инструментов, JSON, A2UI, json‑render, OpenUI Lang, выбор компонентов Hashbrown или изолированный HTML.
3. **Среда выполнения и транспорт**: как сообщения, вызовы инструментов, дельты состояния, действия пользователя и артефакты UI перемещаются между агентом и фронтендом. Здесь находятся AG‑UI, MCP Apps, Apps SDK, A2A, SSE, WebSockets и обычный HTTP.
4. **Бэкенд агента и инструментов**: LangGraph, Google ADK, CrewAI, Mastra, LlamaIndex, Pydantic AI, Agno, OpenAI Agents SDK, пользовательские функции, базы данных, поиск и вся скучная бизнес‑логика, которая всё равно должна работать корректно.

Разделив уровни, экосистема перестаёт выглядеть мистически.

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) на самом деле не конкурент [A2UI](https://github.com/google/A2UI). AG‑UI — это протокол событий для взаимодействия агент‑приложение. A2UI — это декларативный формат UI, который агент может отправлять. Вы можете накладывать A2UI поверх AG‑UI. Также можно размещать пользовательские компоненты, отрисованные инструментом, поверх AG‑UI.

[json-render](https://github.com/vercel-labs/json-render) не является чат‑продуктом. Это каталог компонентов и архитектура рендерера: вы определяете компоненты, которые модель может использовать, модель выдаёт корректное дерево JSON, а система безопасно отрисовывает это дерево.

[CopilotKit](https://github.com/CopilotKit/CopilotKit) — это не просто «пузырёк чата». Это стек фронтенда для приложений с нативными агентами: чат‑интерфейс, генеративный UI, общий стейт, фронтенд‑инструменты и потоки с участием человека.

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) и [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) — это не инструменты «сделать моё React‑приложение динамичным». Это модели интеграции хоста для рендеринга виджетов внутри ChatGPT или других совместимых с MCP хостов.

Названия вводят в заблуждение, потому что область ещё молода. Слои — это то, что остаётся полезным.

## Спектр управления

Генеративный UI — это компромисс между **контролем разработчика** и **свободой агента**.

Слишком много контроля, и помощник выглядит как палитра команд в костюме. Слишком много свободы, и модель начинает придумывать странные раскладки, расплывчатые кнопки, сломанную визуальную иерархию, невозможные состояния и проблемы с безопасностью, улыбаясь уверенно.

Хитрость — выбрать минимальный объём свободы, который решает задачу пользователя.

![A spectrum from tool-rendered components to open-ended generated HTML](../control-spectrum.webp)

Я представляю этот спектр так:

**От рендеринга инструмента к компоненту** — самый безопасный вариант по умолчанию. Модель вызывает `get_weather`, `search_products`, `compare_plans` или `draft_invoice`. Приложение сопоставляет результат инструмента с уже существующим компонентом: `WeatherCard`, `ProductGrid`, `PlanComparison`, `InvoiceReview`. Модель решает, *когда* UI нужен. Разработчики по‑прежнему отвечают за раскладку, стили, доступность, состояния загрузки, пустые состояния и опасные действия.

Это паттерн, описанный в [руководстве по генеративному UI Vercel AI SDK](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces): модель вызывает инструмент, инструмент возвращает данные, а UI рендерит компонент на их основе. Он же лежит в основе многих реализаций CopilotKit и assistant‑ui.

**Декларативные каталоги компонентов** дают модели больше свободы. Вместо выбора одного компонента модель собирает дерево из разрешённых частей. Каталог может включать `Metric`, `Table`, `Chart`, `FilterBar`, `ApprovalPanel` и `Timeline`. Модель может собрать дашборд или шаг рабочего процесса, но не может выполнять произвольный код. Здесь находятся [A2UI](https://github.com/google/A2UI), [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown) и [OpenUI](https://github.com/thesysdev/openui).

**Мини‑приложения в iframe** имеют смысл, когда UI требует более богатой функциональности, чем дерево компонентов, или когда удалённый провайдер инструмента владеет опытом. MCP Apps и OpenAI Apps SDK позволяют инструменту вернуть структурированные данные плюс ресурс виджета, который хост рендерит в iframe. Это удобно для карт, корзин покупок, процессов бронирования, графиков и внешних продуктовых поверхностей. При этом создаётся более жёсткая граница между хост‑приложением и виджетом.

**Open-ended generation** — это самый «дальний» уровень: агент выводит HTML, SVG, Canvas, WebGL или другие кодоподобные артефакты в песочницу. [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) — лучший текущий пример: агент может генерировать визуализации алгоритмов, 3D‑сцены, диаграммы и симуляции внутри изолированных iframe. Это удобно для разовых визуальных объяснений, но не то, с чего я бы начал построение корпоративного процесса согласования.

Полезно чётко назвать ключевое различие: **iframe HTML** (модель пишет код в песочницу) против **JSON‑каталога** (модель выдаёт структурированную спецификацию, а ваш рендерер сопоставляет её с заранее построенными компонентами). Эти подходы звучат схоже, но имеют совершенно разные профили риска и сложности. Iframe HTML максимально выразителен; граница iframe берёт на себя большую часть безопасности. JSON‑каталог не даёт модели исполняемой свободы — она может лишь ссылаться на типы компонентов, определённые вами заранее. Большинство фреймворков в этой области явно относятся к одному из этих лагерей.

**За пределами песочницы**: очень свежие демонстрации намекают на формирование четвертого режима — LLM управляют игровыми или иммерсивными опытами, контролируя визуальный вывод более напрямую, чем любой каталог компонентов. Проекты, генерирующие исследуемые 3D‑миры по подсказкам, LLM‑управляемое поведение NPC в реальном времени и инференс моделей в браузере через WebGPU ([WebLLM](https://mlc.ai/web-llm/)) — первые признаки. Пока нет стабильных фреймворков для построения продакшн‑решений в этом направлении. Я расскажу об этом в отдельной статье, когда появятся надёжные инструменты.

## High-Level Components vs Granular Components

Это самое важное дизайнерское решение.

Если ваш каталог слишком гранулирован, модели придётся выступать в роли фронтенд‑инженера:

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

Это выглядит гибко, но теперь модели придётся решать вопросы отступов, иерархии, группировки, состояний пустоты, надписей кнопок, обработки ошибок и адаптивного поведения. Вы также увеличили запрос и сделали вывод более подверженным ошибкам.

Если ваш каталог слишком абстрактен, модель оказывается в ловушке:

```tsx
WeatherCard
StockCard
HotelCard
```

Это безопасно, но работает только для известных сценариев. Модель не сможет построить матрицу сравнения, запросить недостающие данные или изменить информационную архитектуру, когда меняется вопрос пользователя.

Полезным средним вариантом являются **компоненты уровня домена с ограниченными слотами**:

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

Эти компоненты фиксируют вкусовые и бизнес‑ограничения продукта. Модель решает, *что показывать*, но не каждый CSS‑деталь.

Например, туристическому агенту не нужны `div`, `span` и `button`. Ему нужны:

- `TripSummary`
- `FlightOptionList`
- `HotelComparison`
- `TravelerForm`
- `PolicyNotice`
- `BookingConfirmation`

Финансовому агенту не нужен универсальный набор для построения графиков. Ему нужны:

- `PortfolioSnapshot`
- `TransactionTable`
- `RiskBreakdown`
- `ScenarioComparison`
- `ApprovalGate`

Каталог должен звучать как ваш продукт, а не как HTML.

## Таблица функций

Эта таблица преднамеренно субъективна. Она рассматривает каждый проект как инструмент в стеке, а не как платформу «один победитель».

| Technology | Layer | Best fit | UI model | Streaming / state | Notes and examples |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | Runtime protocol | Connecting agent backends to frontend apps | Events for messages, tools, state, activity, interrupts | Yes; event stream plus state snapshots/deltas | Use when you need a standard agent-to-app pipe. It complements MCP and A2A rather than replacing them. |
| [A2UI](https://github.com/google/A2UI) | Declarative UI protocol | Cross-platform, agent-generated native UI | JSON payload describing components, data model, and updates | Designed for incremental updates | Strong choice for remote agents and trust boundaries. Early public preview, but conceptually clean. |
| [json-render](https://github.com/vercel-labs/json-render) | Component catalog and renderer | Letting the model compose approved components | JSON tree constrained by a typed catalog | Supports progressive rendering | Good for React, Vue, Svelte, Solid, React Native, email, PDF, Remotion, terminal, and more. |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | Product shell and agent UI framework | In-app copilots, shared state, frontend tools, HITL | Tool rendering, AG-UI, A2UI, MCP Apps patterns | Yes | One of the broadest "build agent-native apps" stacks. See [generative-ui examples](https://github.com/CopilotKit/generative-ui). |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | Open-ended UI generation showcase | Visual explanations, diagrams, simulations, charts | Agent emits HTML / SVG / Canvas into sandboxed iframes | Progressive visual rendering | Use for dynamic artifacts where a fixed component catalog is too limiting. |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | Host/widget standard | Tool providers returning interactive UI over MCP | HTML resource linked from tool metadata | Host bridge and widget actions | Best when the UI belongs to a tool provider or needs iframe isolation. |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | ChatGPT app host integration | Building custom ChatGPT app widgets | MCP server tools plus iframe UI components | Tool input/result, widget state, follow-up messages | New ChatGPT apps should prefer MCP Apps fields and the `ui/*` bridge, with `window.openai` for compatibility/extensions. |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | App SDK and chat state | Custom app chat, tool calls, streaming message parts | Render tool results as React components | Yes, via `useChat` and UI message streams | Great baseline if you already own the app and want lower-level control. Pair with [AI Elements](https://elements.ai-sdk.dev/) for UI primitives. |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | React chat primitives | Production chat UX with custom rendering | Composable chat primitives, tool call rendering, JSON as components | Yes | Strong if you need polished chat ergonomics but want to bring your own backend. |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | Agent platform integration | Co-locating UI components with graph code | Graph emits named UI messages rendered by React components | Yes, including custom stream events | Natural fit for LangGraph deployments and graph-owned UI components. |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | Frontend GenUI framework | React/Angular apps that expose components and client-side tools | LLM selects and renders allowed app components | Supports streaming patterns | Good for embedding intelligence directly into product surfaces, not only chat. |
| [OpenUI](https://github.com/thesysdev/openui) | Compact UI language and runtime | Streamable model-generated UI with fewer tokens than JSON | OpenUI Lang plus React runtime and component libraries | Designed for token streaming | Interesting when JSON verbosity becomes a bottleneck. Still young, but worth watching. |
| [Tambo](https://github.com/tambo-ai/tambo) | React generative UI SDK | Component selection, stateful components, client-side tool execution | AI selects components and interacts with client tools | State-oriented | Popular OSS React option focused on automatic component orchestration. |
| [llm-ui](https://llm-ui.com/) | Output renderer | Smoother LLM text output with custom inline components | Parses model output strings into React rendering | Smooth token rendering | Useful for light custom components inside text streams; not a full agent UI protocol. |
| AI SDK RSC / React Server Components | Older pattern / framework feature | Server-rendered component streams in Next.js | Model/tool flow returns server-rendered UI | Yes, but framework-specific | Development paused in Oct 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)); not the recommended path. Migrate to `useObject` or json-render. |

## Что использовать для какого продукта

Ниже представлена матрица рекомендаций, которой я бы реально пользовался вместе с командой.

**Вы добавляете помощника в уже существующее SaaS‑приложение.**

Начните с рендеринга «инструмент‑компонент». Возьмите [Vercel AI SDK UI](../ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces), [assistant-ui](../github.com/assistant-ui/assistant-ui) или [CopilotKit](../github.com/CopilotKit/CopilotKit) — в зависимости от того, насколько вам нужен общий агентный стейт и интеграция фронтенд‑инструментов. Сначала держите каталог компонентов минимальным и рендерьте те элементы продукта, которым уже доверяете.

**Вы строите серьёзного встроенного copilota, которому нужен общий стейт.**

Тщательно изучите CopilotKit вместе с AG‑UI. Главное здесь — не «чат», а общий стейт и двунаправленное взаимодействие: агент может запросить ввод, отрисовать UI, обновить состояние и приостановиться в ожидании подтверждения.

**У вас есть удалённые агенты, которым нужно передавать UI через границу.**

Используйте A2UI или аналогичный декларативный протокол. Суть в том, что удалённый агент описывает UI в виде данных, а хост сохраняет контроль над нативным рендерингом, безопасностью и стилем. Если требуется живое взаимодействие агент/приложение, передавайте его через AG‑UI или любой другой транспорт, принятый в вашей среде.

**Вы разрабатываете внутри ChatGPT или совместимого с MCP хоста.**

Применяйте MCP‑приложения и путь через Apps SDK. Текущая документация OpenAI советует использовать мост `ui/*` MCP‑Apps для новых проектов, оставляя `window.openai` в качестве совместимого слоя и необязательной расширяемой поверхности. Также скопируйте их разделение между инструментами данных и инструментами рендеринга: позвольте модели получать и анализировать данные, прежде чем она решит отрисовать виджет.

**Вы хотите естественно‑языковые дашборды, отчёты или формы в своём приложении.**

Попробуйте json‑render, Hashbrown или OpenUI. Ключ — каталог. Если вы раскрываете `LineChart`, `DataTable`, `MetricGroup`, `FilterControl` и `InsightCallout`, модель сможет собрать полезные отчётные поверхности, не приближаясь к произвольному коду.

**Вы хотите образовательные, визуальные или сильно кастомизированные артефакты.**

Используйте открытый песочничный подход, например OpenGenerativeUI. Позвольте модели генерировать SVG, Canvas, WebGL или автономный HTML, но рассматривайте вывод как недоверенный пользовательский контент. Песочите его, ограничьте размер, уберите лишние разрешения и держите подальше от привилегированного состояния приложения.

**В основном вам нужен красивый потоковый markdown с несколькими встроенными возможностями.**

Не переусердствуйте. Достаточно может быть рендеринга через llm‑ui или assistant‑ui.

## Ошибки, которых я бы избегал

**Ошибка 1: Позволять модели писать production‑React во время выполнения.**

Есть исключения, но для пользовательского интерфейса продукта это обычно неправильный выбор по умолчанию. Генерация кода в рантайме сложна в плане безопасности, тестирования, темизации и доступности. Если модель может выполнить задачу, выбирая из проверенных компонентов, делайте так.

**Ошибка 2: Экспонирование примитивов дизайна вместо примитивов продукта.**

Когда вы даёте модели `Row`, `Column`, `Text` и `Button`, вы заставляете её стать вашей дизайн‑системой. Она получится посредственной. Дайте ей более высокоуровневые продуктовые сущности.

**Ошибка 3: Считать, что корректный JSON гарантирует безопасный UI.**

Полезная нагрузка может пройти валидацию схемы и всё равно быть манипулятивной или опасной. Метка может гласить «Просмотреть счёт», а действие — архивировать аккаунт. Рассматривайте спецификации UI как поведение, а не лишь оформление. Их нужно проверять политиками, проводить семантические проверки и требовать подтверждения человеком для действий с последствиями.

**Ошибка 4: Помещение бизнес‑логики в инструменты рендеринга.**

Инструменты рендеринга должны только рендерить. Инструменты данных — получать, вычислять, изменять и валидировать. В документации OpenAI Apps SDK явно разделяют эти роли: если каждый инструмент данных тянет за собой виджет, модели не хватает места для рассуждений перед тем, как что‑то показать.

**Ошибка 5: Оптимизация под новизну вместо выполнения задачи.**

Суть не в том, чтобы каждый ответ превращался в снежинку‑интерфейс. Суть — уменьшить трение. Стабильная, скучная панель одобрения, экономящая пользователю четыре минуты, лучше ослепляющей сгенерированной панели мониторинга, которой нельзя доверять дважды.

## Практическая архитектура

Если бы я запускал новый продукт сегодня, я бы применил поэтапный подход:

1.  **Сначала выпускайте управляемый UI инструмента.** Сопоставьте известные инструменты с известными компонентами. Логируйте каждый вызов инструмента, рендер UI и действие пользователя.  
2.  **Добавьте каталог домена.** Как только паттерны повторятся, откройте `ComparisonTable`, `DecisionPanel`, `DataCollectionForm`, `Timeline` и другие специфичные для продукта компоненты.  
3.  **Стандартизируйте транспорт только при необходимости.** Если вы контролируете и фронтенд, и бэкенд, простое стриминг‑соединение может быть достаточным. Если у вас несколько фреймворков агентов, используйте AG‑UI. Если инструменты пересекают границы продукта, применяйте MCP. Если агенты пересекают организационные границы, следите за A2A и A2UI.  
4.  **Используйте iframe‑виджеты для чужих или сложных поверхностей.** Карты, корзины, потоки бронирования и сторонние мини‑приложения должны находиться за границей.  
5.  **Оставьте открытое генерирование для артефактов.** Диаграммы, симуляции, временные объяснители и визуальные «черновики» отлично подходят. Ядровые рабочие процессы — нет.

Архитектура в итоге выглядит так:

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

Этот цикл — реальный продукт. Чат‑окно — лишь один из возможных способов ввода.

## Оценка должна включать UI

Команды, работающие с LLM, постепенно учатся оценивать подсказки и выводы моделей. Генеративный UI добавляет ещё одну поверхность: сам интерфейс может быть ошибочным.

Как минимум, сохраняйте следующие артефакты для каждого сгенерированного UI:

- контекст подсказки и инструмента  
- вызовы инструмента и результаты инструмента  
- сгенерированная спецификация UI или выбор компонента  
- имя отрисованного компонента и его свойства  
- метки, видимые пользователю  
- действия, привязанные к кнопкам/формам  
- обновления состояния, видимые модели, исходящие из UI  
- история действий пользователя  

Затем проверьте следующее:

- каждое разрушительное действие должно иметь компонент подтверждения  
- подписи кнопок должны соответствовать семантике действия  
- спецификации рендеринга могут ссылаться только на разрешённые компоненты  
- видимые пользователю итоги должны совпадать с итогами, полученными от инструмента  
- формы не могут запрашивать поля, выходящие за рамки задачи  
- виджеты не должны получать секреты, необходимые только модели  
- скрытые метаданные не должны противоречить видимым меткам  

Это выглядит утомительно. Именно здесь формируется доверие к продакшн‑системе.

## Ссылки, с которых я бы начал

Если хотите перейти от статьи к коду, эти ресурсы оказались лучшими отправными точками.

- [AG-UI repo](https://github.com/ag-ui-protocol/ag-ui) и [AG-UI docs](https://docs.ag-ui.com/introduction) — модель событий выполнения.
- [A2UI repo](https://github.com/google/A2UI) и [A2UI spec](https://a2ui.org/specification/v0.9-a2ui/) — декларативные payload‑ы агент‑UI.
- [json-render repo](https://github.com/vercel-labs/json-render) и [json-render docs](https://json-render.dev/) — генерация UI из каталога JSON.
- [CopilotKit repo](https://github.com/CopilotKit/CopilotKit) и [generative-ui examples](https://github.com/CopilotKit/generative-ui) — паттерны AG-UI, A2UI, Open-JSON-UI и MCP Apps.
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) — изолированные HTML/SVG/Canvas‑артефакты.
- [MCP-UI / MCP Apps SDK](https://github.com/MCP-UI-Org/mcp-ui) — UI‑ресурсы поверх MCP.
- [OpenAI Apps SDK docs](https://developers.openai.com/apps-sdk) и [Apps SDK examples](https://github.com/openai/openai-apps-sdk-examples) — виджеты приложений ChatGPT.
- [Vercel AI SDK generative UI guide](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) и [AI Elements](https://elements.ai-sdk.dev/) — рендеринг чата/инструментов, принадлежащих приложению.
- [assistant-ui](https://github.com/assistant-ui/assistant-ui) — составные React‑примитивы чата.
- [LangGraph generative UI docs](https://docs.langchain.com/langgraph-platform/generative-ui-react) — UI‑компоненты, генерируемые графом.
- [Hashbrown](https://github.com/liveloveapp/hashbrown) — выбор компонентов React/Angular и клиентские инструменты.
- [OpenUI](https://github.com/thesysdev/openui) — компактный, ориентированный на поток модель‑генерируемый UI.
- [Tambo](https://github.com/tambo-ai/tambo) — React‑генеративный UI со stateful‑компонентами.
- [llm-ui](https://llm-ui.com/) — плавные текстовые потоки с пользовательскими inline‑компонентами.

## Примечание о стабильности проектов

Все крупные протоколы в этой области находятся в статусе pre‑1.0. Последняя проверка — 8 мая 2026; планируйте изменения и проверяйте актуальную документацию перед тем, как делать ставку на платформу.

**Vercel AI SDK RSC** — оригинальная «Generative UI»‑фича — приостановила разработку в октябре 2024 года ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) из‑за архитектурных ограничений, которые не имели ближайшего решения. **json-render** (Vercel Labs) стал заменой: каталог‑ориентированный, независимый от фреймворка, без привязки к RSC. Он быстро привлёк внимание веб‑разработчиков после запуска в начале 2026 года. Вероятная причина — DX: json-render работает сразу в обычном проекте React; у A2UI более широкая кросс‑платформенная цель, но требует дополнительной настройки.

**A2UI** (Google) находится в pre‑1.0, между минорными версиями бывают ломающие изменения и коммуникация дорожной карты непоследовательна. Преимущество — истинный кросс‑платформенный охват (web, Flutter, SwiftUI), чего нет у json-render. Для чисто веб‑сценариев сегодня json-render предлагает более полное покрытие инструментов; для кросс‑платформенных или удалённых агентных сценариев более уместен дизайн A2UI. Конвергенция между двумя спецификациями возможна — Vercel экспериментировал с выводом, совместимым с A2UI, из json-render.

**AG-UI** (CopilotKit) также pre‑1.0. Наиболее частая путаница — название: AG-UI — это транспортный протокол, а не UI‑фреймворк. Он определяет *как* события передаются между агентом и фронтендом; что именно рендерить, остаётся на вашей ответственности. Концепция устойчивая и получила широкое признание. Спецификация всё ещё развивается.

## Моя позиция

Generative UI не заменит тщательно продуманные продуктовые интерфейсы. Он заменит ленивое предположение, что чат‑транскрипт — универсальный интерфейс для ИИ.

Лучшие системы не позволят модели импровизировать всё подряд. Они предоставят ей небольшой, чётко определённый набор нативных строительных блоков продукта, надёжное соединение рантайма, ясные границы безопасности и достаточную свободу, чтобы адаптировать интерфейс под задачу.

Будущее — это не «модель пишет ваш фронтенд».

Будущее ближе к такому: **ваш фронтенд становится инструментом, которым агент может управлять, но вы всё равно решаете, каким звуком этот инструмент может издавать.**
````
