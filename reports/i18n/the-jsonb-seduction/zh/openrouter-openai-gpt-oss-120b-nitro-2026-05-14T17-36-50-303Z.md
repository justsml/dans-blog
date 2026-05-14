# Translation Candidate
- Slug: the-jsonb-seduction
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--the-jsonb-seduction/zh/index.mdx
- Validation: deferred
- Runtime seconds: 10.35
- Input tokens: 6371
- Output tokens: 2548
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000707
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: JSONB：毁掉数据库的最佳方式
subTitle: JSONB 功能强大、用途广泛，但如果把 blob 当作真实模式使用，就很容易被误用。
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
PostgreSQL 添加了 JSONB，让你在不预先定义严格模式的情况下存储半结构化数据。这个想法本身是合理的：有时候你真的不知道数据会是什么样子，或者它变化得太快，以至于传统列不适用。

这点很重要，因为 JSONB 并不是错误。在很多系统中，它是对问题空间最干净的表达。如果你在存储第三方 webhook 负载、版本化事件体、特性标记，或 LLM 配置对象，而每个提供商和模型都暴露出稍有不同且不断变化的选项集合，强行把所有东西塞进一等列往往比帮助更尴尬。

问题在于 JSONB 也是最容易在不承认自己在推迟的情况下推迟模式决策的方式。在意图与实现之间的某个环节，它成了数据库界的 “我以后再收拾房间”。六个月前你临时凑的那个方案？它仍然在，而且现在生产已经依赖它。

我不断看到同样的模式。团队因为不确定需求而添加 JSONB 列。他们承诺等需求稳定后再把它规范化。三年后，这列里已经出现四十个不同版本的本应是用户画像的数据，被十五个服务查询，而每个服务对内部结构都有不同假设。

技术债务并不是 JSONB 本身，而是你对自己说要构建的东西与实际构建的东西之间的差距：一个未记录的 schema‑on‑read 系统。

## 通常会发生什么

你在添加一个功能，却不确定用户需要 `twitter_handle` 还是 `bluesky_handle`，甚至是别的东西。于是你不去细化模式，而是这样写：

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);
```

它能跑。你交付功能，继续下一个，再下一个。JSONB 列在后台悄悄膨胀。

这就是分叉点。如果 `profile` 仍然是通过 `user.id` 获取的不透明 blob，你可能还算安全。如果它开始成为业务数据的主要存放地，权衡会迅速改变。

产品问：“**有多少用户在纽约？**”

你写：

```sql
SELECT count(*) FROM users WHERE profile->>'location' = 'New York';
```

Postgres 进行全表扫描。每一行都要检查。

于是你加了一个 GIN 索引。也许还能接受。有时确实可以。但现在你为一个本应是一等关系数据的字段付出了真实的复杂度和存储成本，因为它从未成为一等列。

### 第一年：模式漂移

同一列里出现了三种数据版本。

*   第 1 行：`{"city": "NYC"}`
*   第 1000 行：`{"location": "NYC"}`
*   第 5000 行：`{"address": {"city": "New York"}}`

你的应用代码现在是这样：

```javascript
const city = user.location || user.city || user.address?.city || "Unknown";
```

你没有删除模式，只是把验证和一致性检查从数据库搬到了分散的应用代码中。

---

## 实际该何时使用 JSONB

JSONB 确实有合理的使用场景。很多情况下它完全没问题，有时甚至是最佳选择。

关键的区分不是“结构化好，JSON 坏”。更像是下面这些判断：

- 数据是否主要通过稳定的主键一次性整体取出？
- 键名是否在不同提供商、版本、租户或时间维度上有实质性差异？
- 你是只查询少数已知字段，还是每个冲刺都在发明新的路径查询？
- 应用是否有意地负责版本管理和校验，还是随意应付？

### 合法的 JSONB 使用场景

1.  **Webhook 负载**：你从 Stripe、Slack 或 GitHub 接收数据，完全无法控制其模式，可能根本不需要查询，只是为了调试或回放而存储。**JSONB 完美适用。**

2.  **日志与事件流**：应用日志、审计轨迹、错误上下文。这类写入密集、很少按特定字段查询，通常批量分析或导出到分析平台。**JSONB 在这里也没问题。**

3.  **用户偏好与设置**：包含 100+ 布尔标记的设置对象，大多数为 false，且总是通过用户 ID 整体取出。你不会执行 `WHERE preferences->>'theme' = 'dark'`。**JSONB 能胜任。**

4.  **LLM 提供商 / 模型配置**：这是当下最清晰的例子。OpenAI、Anthropic、Gemini、开源本地模型以及各厂商网关都暴露出相互重叠但又不同的参数。即便同一家提供商，模型能力和选项名称也会演进。用 JSONB 保存配置比硬要把 `temperature`、`top_p`、`reasoning_effort`、`json_schema`、`tool_choice` 以及其他二十余个调节项都写成通用列要诚实得多。**JSONB 往往是正确的抽象。**

5.  **API 响应缓存**：你缓存完整的 API 响应，数据库只是更快的 Redis。通过缓存键取出，从不按嵌套属性过滤。**JSONB 合适。**

6.  **事件溯源**：你存储不可变的事件负载。查询总是 “给我聚合 X 的所有事件”，按时间排序，从不在事件属性上使用 `WHERE`。**JSONB 合适。**

7.  **可扩展接口**：集成、插件设置、租户覆盖、市场元数据、提供商能力或 “extras” 字段，这些场景下你明确预期形状会随子类型变化。**JSONB 可以成为正确的契约，而不是妥协。**

经验法则：如果应用通过已知键取出文档并自行负责校验/版本管理，JSONB 往往表现优秀。若业务不断对嵌套键提出关系型查询，那这些字段其实在向列的方向靠拢。

## 最佳模式往往是混合式

很多成熟系统都会这样落地：

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

这通常比两端极端方案更好。

- `provider`、`model`、`status`、`created_at` 作为一等列，因为你会对它们进行过滤、连接、聚合和索引。
- `config` 保持 JSONB，因为具体的选项集合是模型特定、提供商特定且可能演进的。

这并不是“未规范化”。而是把界限划在了恰当的位置。

### 大规模场景：对象版本化 > 规范化

事情在这里变得有意思。达到足够大规模时，“正确”的方案不是规范化——而是对象版本化。

如果你拥有数十亿行且模式经常演进，迁移列的成本会非常高。Stripe、GitHub、Netflix 等公司并不会把所有东西都规范化。相反：

```sql
CREATE TABLE entities (
  id UUID PRIMARY KEY,
  version INT NOT NULL,
  data JSONB NOT NULL
);
```

你的应用知道如何读取 `version: 1`、`version: 2`、`version: 3`。新字段不需要数据库迁移，代码负责向后兼容。

这是一种架构决策，而不是懒惰。它用应用层的复杂度换取数据库的简化。有时这正是最佳权衡，尤其是当文档本身天然带有版本且应用是唯一的解释器时。

失败的根源不是“使用 JSONB”。失败的根源是使用 JSONB 时缺少版本化、校验、提升规则，或没有明确区分文档数据与关系数据的边界。

## 真正重要的问题

在添加 JSONB 列之前，先自问：

1. 我们是否会在 `WHERE`、`JOIN`、`GROUP BY` 或 `ORDER BY` 中经常查询嵌套字段？
2. 这套模式是我们内部控制的，还是外部定义且易变的？
3. 记录之间的结构是否本意上是异构的？
4. 我们是否在应用层实现了校验和版本化？
5. 哪些字段以后可能会演变为运营维度？

如果对 #1 的回答是“是，且频繁”，这强烈指向使用列。

如果对 #2 和 #3 的回答都是“是”，JSONB 可能正为你承担实际工作。

## 摆脱陷阱

如果你已经陷入此坑，别再继续挖掘。

1. **审计**：运行 `jsonb_object_keys`，检查实际的形状漂移，而不是你假设的形状。
2. **提升**：找出最常用于过滤、连接、排序或报表的字段。把这些字段真正做成列。
3. **校验**：为 JSONB 中剩余的内容添加应用层或数据库层的校验。
4. **版本化**：如果该 blob 是真实的业务数据，显式为其添加版本。
5. **裁剪**：在提升的列建立后，删除 blob 中重复的键。

别对自己说每个 blob 必须被规范化，也别对自己说带有永久业务语义的 blob “只是临时的”。

JSONB 在文档本身真正具备文档形态时表现优秀；当它被当作关系模式并披着假胡子时则极具风险。

## 资源

- [PostgreSQL JSONB 文档](https://www.postgresql.org/docs/current/datatype-json.html)
- [JSONB 索引策略](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)
- [何时使用 JSONB 与关系列](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)
- [PostgreSQL 模式设计最佳实践](https://www.postgresql.org/docs/current/ddl.html)
````
