# Translation Candidate
- Slug: the-jsonb-seduction
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--the-jsonb-seduction/zh/index.mdx
- Validation: deferred
- Runtime seconds: 3.20
- Input tokens: 8775
- Output tokens: 2665
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.000822
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: JSONB：毁掉数据库的最佳方式
subTitle: JSONB 功能强大、用途广泛，但如果把 blob 当成真实模式使用，就很容易被误用。
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
PostgreSQL 添加了 JSONB，让你在不预先定义严格模式的情况下存储半结构化数据。这个想法本身是合理的：有时候你真的不知道数据会是什么样子，或者它变化得太频繁，以至于传统列无法胜任。

这点很重要，因为 JSONB 并不是错误。在很多系统里，它是对问题空间最干净的表达。如果你在存储第三方 webhook 负载、版本化事件体、特性标记，或者 LLM 配置对象——每个提供商和模型都暴露出稍有不同且不断变化的选项集合——把所有东西强行塞进一等列往往比帮助更尴尬。

问题在于 JSONB 也是最容易在不承认自己在推迟的情况下推迟模式决策的手段。在意图和实现之间的某个环节，它成了数据库界的 “我以后再收拾房间”。那段六个月前临时凑的方案？它仍然在，而且现在生产环境已经依赖它。

我不断看到同样的模式。一个团队因为不确定需求而添加了 JSONB 列。他们承诺等情况稳定后再把它规范化。三年后，这列里已经出现了四十个不同版本的本应是用户档案的数据，被十五个服务查询，而每个服务对内部内容都有不同的假设。

技术债务并不是 JSONB 本身，而是你对自己说要构建的东西与实际构建的东西之间的差距：一个未记录的 schema‑on‑read 系统。

## 通常会发生什么

你在添加一个功能，却不确定用户是需要 `twitter_handle` 还是 `bluesky_handle`，甚至是别的东西。与其仔细思考模式，你会这么做：

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);
```

它能工作。你交付功能，继续下一个，再下一个。JSONB 列在后台悄悄增长。

这就是分叉口。如果 `profile` 仍然是通过 `user.id` 获取的不透明 blob，你可能还算安全。如果它开始成为业务数据的主要存放地，权衡就会迅速改变。

产品方问：“*纽约有多少用户？*”

你写道：

```sql
SELECT count(*) FROM users WHERE profile->>'location' = 'New York';
```

Postgres 会对整张表进行全表扫描。每一行都要检查。

于是你添加了 GIN 索引。也许还能接受。有时确实可以。但此时你已经为一个本应是一等关系数据的字段付出了额外的复杂度和存储成本，因为它从未成为真正的一等列。

### 第一年：模式漂移

同一列里出现了三种数据版本。

*   第 1 行：`{"city": "NYC"}`
*   第 1000 行：`{"location": "NYC"}`
*   第 5000 行：`{"address": {"city": "New York"}}`

你的应用代码现在看起来像这样：

```javascript
const city = user.location || user.city || user.address?.city || "Unknown";
```

你并没有删除 schema，而是把验证和一致性检查从数据库迁移到了分散的应用代码中。

---

## 何时真正应该使用 JSONB

JSONB 有其合理的使用场景。很多情况下它完全没问题，甚至是最佳选择。

关键的区别不在于“结构化好，JSON 坏”。更接近于以下判断：

- 数据是否主要通过稳定的主键一次性整体取出？
- 键是否会在不同提供商、版本、租户或时间上出现实质性差异？
- 你是查询少数已知字段，还是在每个冲刺都要临时构造新的路径查询？
- 应用是否有意地负责版本管理和校验，还是随意应付？

### 合法的 JSONB 使用场景

1.  **Webhook 负载**：你从 Stripe、Slack 或 GitHub 接收数据。对模式毫无控制权，可能根本不会查询，只是为了调试或回放而存储。**完全适合 JSONB**。

2.  **日志与事件流**：应用日志、审计轨迹、错误上下文。这类写入频繁，几乎不通过特定字段查询，通常批量分析或导出到分析平台。**JSONB 在此场景下没有问题**。

3.  **用户偏好与设置**：设置对象中有 100 多个布尔标记，大多数为 false，且总是通过用户 ID 整体获取整个 blob。不会执行 `WHERE preferences->>'theme' = 'dark'` 之类的查询。**JSONB 能胜任**。

4.  **LLM 提供商 / 模型配置**：这是当下最典型的例子。OpenAI、Anthropic、Gemini、开源本地模型以及各厂商的网关都暴露出相互重叠但又不同的参数。即便在同一家提供商内部，模型能力和选项名称也会演进。使用 JSONB 配置 blob 往往比硬要把 `temperature`、`top_p`、`reasoning_effort`、`json_schema`、`tool_choice` 以及其他二十个调节项都抽象为统一列更为诚实。**JSONB 在这里常常是正确的抽象**。

5.  **API 响应缓存**：你缓存整个 API 响应。数据库仅充当更快的 Redis，按缓存键取回，从不按嵌套属性查询。**JSONB 适用**。

6.  **事件溯源**：你存储不可变的事件负载。查询始终是 “给我聚合 X 的所有事件”，按时间排序。不会在事件属性上使用 `WHERE` 子句。**JSONB 符合需求**。

7.  **可扩展性接口**：集成、插件设置、租户级覆盖、市场元数据、提供商能力，或“extras”字段——在这些场景下你明确预期子类型会有不同的结构。**JSONB 可以成为正确的契约，而不是妥协**。

经验法则：如果应用通过已知键读取整个文档并能够自行验证/版本化，JSONB 可以表现出色。如果业务不断对嵌套键提出关系型查询，这些字段实际上在尝试变成列。

## 最佳模式往往是混合式

许多成熟系统会落到这里：

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

这通常比两端极端更好。

- `provider`、`model`、`status` 和 `created_at` 是一等列，因为你会对它们进行过滤、连接、聚合和索引。
- `config` 保持为 JSONB，因为具体的选项集合是模型特定、提供商特定，并且可能会演进。

这并不是“未规范化”。而是把界限划在了恰当的位置。

### 大规模场景：对象版本化 > 规范化

这里就有意思了。在足够大的规模下，“正确”的方案不是规范化——而是对象版本化。

如果你拥有数十亿行并且模式频繁演进，迁移列的成本会很高。像 Stripe、GitHub、Netflix 这样的公司并不会把所有东西都规范化。相反：

```sql
CREATE TABLE entities (
  id UUID PRIMARY KEY,
  version INT NOT NULL,
  data JSONB NOT NULL
);
```

你的应用知道如何读取 `version: 1`、`version: 2`、`version: 3`。新字段不需要数据库迁移，代码自行处理向后兼容。

这是一种架构决策，而不是懒惰。它把数据库的复杂度换成了应用层的复杂度。有时这正是最佳取舍，尤其当文档本身就带有版本号且应用是唯一的解释器时。

失败的根源并不是“使用 JSONB”。失败的根源是使用 JSONB 时缺少版本控制、验证、提升规则，或者没有明确划分文档数据与关系数据的边界。

## 真正重要的问题

在添加 JSONB 列之前，先问自己：

1. 我们是否会在 `WHERE`、`JOIN`、`GROUP BY` 或 `ORDER BY` 中经常查询嵌套字段？
2. 这套模式是我们自己控制的，还是外部定义且易变的？
3. 记录之间的结构是否故意异构？
4. 我们是否在应用层实现了验证和版本控制？
5. 哪些字段以后可能会演变成运营维度？

如果对 #1 的回答是“是，且频繁”，这强烈指向需要普通列。

如果对 #2 和 #3 的回答都是“是”，那么 JSONB 可能正为你发挥实际作用。

---
## 摆脱陷阱

如果你已经陷入这个坑，赶紧停下手里的活。

1.  审计：运行 `jsonb_object_keys` 并检查实际的形状漂移，而不是你假设的形状。
2.  提升：找出你最常用于过滤、连接、排序或报表的字段。将这些字段转为真实列。
3.  验证：为 JSONB 中剩余的内容添加应用层或数据库层的验证。
4.  版本化：如果该 blob 是真实的业务数据，请显式进行版本管理。
5.  修剪：在提升列建立后，从 blob 中删除重复的键。

不要对自己说每个 blob 都必须规范化。也不要对自己说具有永久业务语义的 blob 是“临时的”。

当文档真正具备文档形态时，JSONB 非常好用；当它只是披着假胡子的关系模式时，就很危险。

## 资源

- [PostgreSQL JSONB 文档](https://www.postgresql.org/docs/current/datatype-json.html)
- [JSONB 索引策略](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)
- [何时使用 JSONB 与关系列](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)
- [PostgreSQL 模式设计最佳实践](https://www.postgresql.org/docs/current/ddl.html)
````
