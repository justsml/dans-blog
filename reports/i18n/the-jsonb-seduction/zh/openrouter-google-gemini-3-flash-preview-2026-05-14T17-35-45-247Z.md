# Translation Candidate
- Slug: the-jsonb-seduction
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2025-12-29--the-jsonb-seduction/zh/index.mdx
- Validation: deferred
- Runtime seconds: 23.66
- Input tokens: 6238
- Output tokens: 2332
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.010115
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: JSONB：搞垮数据库的最佳方式
subTitle: JSONB 强大且实用，但如果任由 Blob 沦为事实上的 Schema，极
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - postgres
  - postgresql
  - databases
  - jsonb
  - json
  - schema-design
  - technical-debt
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
PostgreSQL 引入 JSONB 是为了让你在存储半结构化数据时，无需预先定义死板的模式（Schema）。这个初衷是合理的：有时候你确实不知道数据会长什么样，或者数据变化太快，传统的列定义根本跟不上节奏。

这一点很重要，因为 JSONB 本身并不是一个错误。在许多系统中，它是解决问题的最简洁方案。如果你在存储第三方 webhook 的 payload、带版本的事件体（event bodies）、功能开关（feature flags），或者是 LLM 的配置对象（每个供应商和模型都有一套略有不同且不断变化的选项），那么强行将所有内容塞进一级列（first-class columns）反而会显得笨拙且毫无必要。

问题在于，JSONB 也成了推迟模式决策最简单的方式，而且你还不用承认自己在推迟。在设计初衷与落地实现之间，它变成了数据库层面的“我回头再收拾房间”。你六个月前采用的那个临时方案？它还在那儿，而且现在生产环境正依赖着它。

我反复看到同样的模式。一个团队因为不确定需求而添加了一个 JSONB 列。他们对自己承诺，等情况稳定下来就进行规范化。三年后，那个列包含了四十个不同版本的所谓“用户画像”，被十五个服务查询，而每个服务对其中的内容都有不同的假设。

技术债不在于 JSONB 本身。而在于你告诉自己正在构建的东西与你实际构建的东西之间的差距：一个毫无文档记录的“读时模式”（schema-on-read）系统。

## 通常会发生什么

你正在添加一个功能，但不确定用户需要的是 `twitter_handle` 还是 `bluesky_handle`，或者其他什么东西。你没有仔细思考模式，而是这样做了：

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);
```

它奏效了。你交付了功能，接着开发下一个，再下一个。JSONB 列在后台悄无声息地增长。

这就是分叉路口。如果 `profile` 始终是一个通过 `user.id` 获取的不透明 Blob，你可能没问题。但如果它开始成为业务数据的主要存放地，权衡利弊的情况就会迅速改变。

产品经理问：*“纽约有多少用户？”*

你写下：

```sql
SELECT count(*) FROM users WHERE profile->>'location' = 'New York';
```

Postgres 执行了全表扫描。每一行都没放过。

于是你添加了一个 GIN 索引。也许这还能接受。有时确实如此。但现在你正在支付真实的技术复杂度和存储成本，因为一个表现得像一级关系数据的字段，却从未成为一个一级列。

### 第一年：模式漂移（Schema Drift）

在同一个列中，你有三个版本的数据。

*   第 1 行：`{"city": "NYC"}`
*   第 1000 行：`{"location": "NYC"}`
*   第 5000 行：`{"address": {"city": "New York"}}`

你的应用代码现在变成了这样：

```javascript
const city = user.location || user.city || user.address?.city || "Unknown";
```

你并没有消除模式。你只是把校验和一致性检查从数据库移到了零散的应用代码中。

---

## 什么时候该真正使用 JSONB

JSONB 有其合理的用例。很多时候它表现得非常出色，有时它甚至是唯一的最佳选择。

关键的区别不在于“结构化就是好，JSON 就是坏”，而在于以下几点：

- 数据是否主要是通过稳定的主键进行整体获取？
- 键值（Keys）是否在不同供应商、版本、租户或时间维度上存在实质性差异？
- 你是在查询几个已知的字段，还是每个迭代都在发明新的路径查询？
- 应用层是有意识地负责版本控制和校验，还是仅仅在“走一步看一步”？

### 合理的 JSONB 使用场景

1.  **Webhook 负载（Payloads）**：你接收来自 Stripe、Slack 或 GitHub 的数据。你对模式完全没有控制权。你可能永远不会查询它，只是为了调试或重放而存储。**这是 JSONB 的完美场景。**

2.  **日志与事件流**：应用日志、审计追踪、错误上下文。这些数据写多读少，极少通过特定字段查询，通常是批量分析或导出到分析平台。**在这里用 JSONB 没问题。**

3.  **用户偏好与设置**：设置对象中包含 100 多个布尔开关，且大多数为 false，你总是通过用户 ID 获取整个 Blob。你不会运行 `WHERE preferences->>'theme' = 'dark'` 这种查询。**JSONB 适用。**

4.  **LLM 供应商 / 模型配置**：这是现代开发中最清晰的例子之一。OpenAI、Anthropic、Gemini、开源本地模型以及供应商特定的网关，它们提供的参数既有重叠又各不相同。即使是同一个供应商，模型能力和选项名称也在不断演进。使用 JSONB 配置块通常比假装 `temperature`、`top_p`、`reasoning_effort`、`json_schema`、`tool_choice` 以及其他二十个旋钮都应该是通用列要诚实得多。**在这里，JSONB 通常是正确的抽象。**

5.  **API 响应缓存**：你在缓存整个 API 响应。数据库此时只是一个更快的 Redis。你通过缓存键获取数据，从不通过嵌套属性查询。**JSONB 很合适。**

6.  **事件溯源（Event Sourcing）**：你存储的是不可变的事件负载。你的查询永远是“按时间顺序给我聚合 X 的所有事件”。你从不在事件属性上运行 `WHERE` 子句。**JSONB 契合这种模式。**

7.  **扩展性接口**：集成、插件设置、按租户覆盖、市场元数据、供应商能力或“额外”字段，在这些场景下你明确预期数据形状会随子类型而变化。**JSONB 可以是正确的契约，而非一种妥协。**

经验法则：如果应用通过已知键获取文档，并懂得如何校验和处理版本，JSONB 会非常出色。如果业务层不断针对嵌套键提出关系型问题，那么这些字段就在试图进化成列。

## 最佳模式通常是混合模式

许多成熟的系统最终会演化成这样：

```sql
CREATE TABLE llm_requests (
  id UUID PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  config JSONB NOT NULL
);
```

这通常比任何一种极端都要好。

- `provider`、`model`、`status` 和 `created_at` 是以及列，因为你会对它们进行过滤、连接、聚合和索引。
- `config` 保持 JSONB 格式，因为具体的选项范围取决于模型和供应商，且极有可能发生变化。

这并不是“规范化失败”，而是在正确的地方划清了界限。

### 规模化场景：对象版本化优于规范化

这里有个很有意思的现象。在足够大的规模下，“正确”的解决方案往往不是规范化，而是对象版本化（Object Versioning）。

如果你拥有数十亿行数据且模式演进频繁，迁移列的成本会变得极其高昂。像 Stripe、GitHub 和 Netflix 这样的公司并不会规范化所有数据。相反，他们会这样做：

```sql
CREATE TABLE entities (
  id UUID PRIMARY KEY,
  version INT NOT NULL,
  data JSONB NOT NULL
);
```

你的应用程序知道如何读取 `version: 1`、`version: 2` 或 `version: 3`。新增字段无需进行数据库迁移，由代码来处理向后兼容性。

这是一种架构决策，而非偷懒。它用应用程序的复杂性交换了数据库的复杂性。有时这正是正确的权衡，尤其是当文档天然具有版本属性，且应用层是唯一的权威解释器时。

失败的模式并不是“使用 JSONB”，而是在没有版本控制、没有校验、没有晋升规则，且文档数据与关系数据边界模糊的情况下盲目使用 JSONB。

## 真正重要的问题

在添加 JSONB 列之前，请先问自己：

1. 我们是否会经常在 `WHERE`、`JOIN`、`GROUP BY` 或 `ORDER BY` 中查询嵌套字段？
2. 这个模式是由我们控制，还是由外部定义且多变的？
3. 不同记录之间的数据形状是否刻意保持异构？
4. 我们是否有应用层的校验和版本控制？
5. 哪些字段以后可能演变为业务操作的维度？

如果问题 1 的答案是“是的，经常”，那么这就是需要转换为列的强烈信号。

如果问题 2 和 3 的答案是“是的”，那么 JSONB 可能确实在为你解决实际问题。

---
## 逃离陷阱

如果你已经深陷泥潭，请停止挖掘。

1. **审计**：运行 `jsonb_object_keys` 来检查实际的数据形状漂移，而不是凭空假设。
2. **晋升**：识别出那些你最常用于过滤、连接、排序或报表的字段。将它们转换为真正的列。
3. **校验**：为 JSONB 中保留的内容添加应用层或数据库层的校验。
4. **版本化**：如果这个 Blob 是真正的领域数据，请显式地对其进行版本化。
5. **清理**：一旦晋升列稳定后，从 Blob 中删除重复的键。

不要告诉自己每个 Blob 都必须规范化，但也别自欺欺人地认为一个带有永久业务语义的 Blob 只是“临时”的。

当文档确实是文档形状时，JSONB 非常出色。但如果它只是一个贴着假胡子的关系模式，那它就很危险。

## 资源

- [PostgreSQL JSONB 官方文档](https://www.postgresql.org/docs/current/datatype-json.html)
- [JSONB 索引策略](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)
- [何时使用 JSONB 还是关系型列](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)
- [PostgreSQL 模式设计最佳实践](https://www.postgresql.org/docs/current/ddl.html)
````
