# Translation Candidate
- Slug: postgres-fts-vs-pgvector
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/zh/index.mdx
- Validation: deferred
- Runtime seconds: 52.41
- Input tokens: 12735
- Output tokens: 9163
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.004243
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Postgres 搜索：FTS、三元组与 pgvector
subTitle: 你已有工具，选匹配查询的那个。
date: '2026-05-08'
modified: '2026-05-08'
tags:
  - postgres
  - postgresql
  - pgvector
  - full-text-search
  - vector-search
  - trigrams
  - pg_trgm
  - databases
  - ai
  - search
category: Code
subCategory: Databases
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
添加AI功能的团队往往首先选择专用的向量数据库。

Pinecone、Weaviate、Qdrant、Chroma。新的服务、新的依赖、新的连接池、新的账单，现在还要维护两个数据源的一致性。

与此同时，他们已经有PostgreSQL了。PostgreSQL已经内置了`pgvector`。自2008年起，它还内置了出色的全文搜索。

专用向量存储在大规模和高查询量下才值得投入。但大多数应用在第一个搜索系统还没被充分压榨之前，就引入了第二个搜索系统。这就是未来的扩展问题如何变成今天的同步错误。

那么：什么时候用FTS，什么时候用pgvector，什么时候两者都用？

---

## 各自的实际作用

全文搜索（`tsvector` / `GIN`索引）是词法层面的。它将文本分词为词素，进行词干化，并在索引中匹配查询。"Running"和"runs"归并为同一个词素。"dog"和"dogs"也是如此。排序函数（`ts_rank`）会奖励查询词出现频繁或位置突出的文档。

pgvector是语义层面的。它存储一个稠密向量——一个数字列表——表示一个文本块被嵌入模型理解的*含义*。相似性搜索在高维空间中找到邻近的向量。"Dog"和"canine"会彼此靠近。而作为运动的"Running"和作为进程的"running"可能不会。

实际区别：FTS回答"哪些文档包含这些词？"向量搜索回答"哪些文档大致表示这个意思？"

![一张搜索工具地图，展示了用于短模糊字符串的pg_trgm、用于精确散文查询的全文搜索、用于语义匹配的pgvector，以及用于需要精确和语义信号的长内容的混合搜索。](../search-tool-map.svg)

_首要的分界线不是"旧搜索 vs. AI搜索"。而是文本的形状以及什么样的答案才是正确的。_

---

## 全文搜索何时胜出

**你搜索的是必须精确匹配的术语。** 产品SKU、错误代码、型号、用户名、法律条款引用。`SKU-AX-44192`与任何内容都没有语义相似性。它要么匹配要么不匹配。向量搜索可能会自信地返回`SKU-AX-44193`。那不是你想要的。

**你的查询是基于关键词的。** 用户在搜索框中输入，按标签过滤，或按关键词搜索博客文章。FTS正是为这种意图形态而构建的。

**你需要在没有GPU或嵌入基础设施的情况下获得排序结果。** FTS索引快速、确定，且无需外部API调用。添加一个`tsvector`列，构建一个GIN索引，就完成了。

**你在搜索的同时进行布尔过滤。** `WHERE to_tsvector(body) @@ to_tsquery('postgres') AND category = 'tutorial' AND published_at > NOW() - INTERVAL '6 months'` —— 这与你现有的查询逻辑自然组合。

```sql
-- 创建索引
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- 查询
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

`GENERATED ALWAYS AS` 列会自动更新索引。`setweight` 让标题匹配的权重高于正文匹配。整个配置就这么简单。

---

## 何时使用 Trigrams（pg_trgm）

Postgres 还有第三个工具常被忽略：`pg_trgm`。它既不是全文搜索也不是向量搜索。它是模糊字符串匹配，恰好覆盖了前两者都处理不好的尴尬中间地带。

**适用场景：姓名、地址、标识符以及带拼写错误的短字符串。**

FTS 将文本切分成词位并进行词干化。这对散文有效，但在以下场景表现不佳：
- 人名（"Dan Levy" → 词干化为 "dan levi"、"leiv"，取决于语言配置）
- 公司名、地址、产品标题——这些地方精确拼写很重要
- 带拼写错误的查询——"Micheal Jordan"、"Amaon"、"javascipt"
- 自动补全 / 前缀搜索
- 部分字符串匹配（"son" 匹配 "Johnson"、"Anderson"）

pgvector 在这里也不是好选择。你可以嵌入 "Micheal Jordan" 并找到最近的向量，但嵌入空间按含义组织姓名，而非拼写。最近邻可能是 "basketball legend" 或 "Michael B. Jordan"，而不是那个拼写错误的用户记录。

`pg_trgm` 将字符串拆分成重叠的3字符片段，并计算两个字符串共享的三元组数量。"Dan" -> `" da"`、`"dan"`、`"an "`。"Micheal" 和 "Michael" 共享大部分三元组，因此相似度很高。

```sql
-- 启用扩展（通常已可用）
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 在 name 列上创建 GIN 索引——支持快速三元组相似度搜索
CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- 模糊姓名搜索：搜索 "Michael Jordan" 时能找到 "Micheal Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % 运算符 = 相似度阈值（默认 0.3）
ORDER BY score DESC
LIMIT 10;

-- 或者使用 ILIKE 配合三元组索引进行包含匹配
SELECT id, name
FROM users
WHERE name ILIKE '%johnson%'   -- GIN 索引让这变得很快
LIMIT 10;
```

`%` 运算符使用 `pg_trgm.similarity_threshold`（默认 0.3，范围 0-1）。值越高要求匹配越精确。对于姓名搜索，0.3-0.4 通常合适：足够宽松以捕捉拼写错误，又足够严格以避免噪声。

**三元组也有助于前缀搜索和自动补全，特别是当自动补全需要容忍拼写错误或包含匹配时：**

```sql
-- 自动补全：前缀匹配。对于纯左锚定前缀，
-- 请将三元组 GIN 与数据上的 B-tree 模式索引进行比较。
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- 更灵活：word_similarity 用于在较长字符串中匹配部分内容
-- （在 "Andrew Johnson III" 中搜索 "Johnson" 时很有用）
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name          -- <% 运算符 = word_similarity 阈值
ORDER BY score DESC
LIMIT 10;
```

**何时使用 `pg_trgm` 而非 FTS：**

| 场景 | 使用 |
|---|---|
| 带拼写错误的人名/公司名搜索 | `pg_trgm` |
| 自动补全 / 前缀搜索 | `pg_trgm`（或带前缀查询的 FTS） |
| 搜索短字符串、代码、标识符 | `pg_trgm` |
| 搜索散文文章、文档 | FTS |
| 搜索日志消息中的关键词 | FTS |
| 多语言名称搜索 | `pg_trgm`（语言无关） |

`pg_trgm` 也能与 FTS 组合使用。用三元组做模糊预过滤，再用 `ts_rank` 排序，或者将三元组相似度与向量分数结合。

---

## 何时使用 pgvector

**你在构建 RAG。** RAG 依赖语义检索：找到与用户问题含义最接近的文档*块*，即使措辞不同。向量搜索正是为此而生。FTS 会遗漏释义、同义词和概念匹配。

**用户描述的是他们想要什么，而不是要搜索什么。** "适合夏夜的清淡饮品" 没有明显的葡萄酒关键词。"关于如何建立新经理自信的文章" 需要 FTS 无法提供的语义理解。

**你在寻找相似项。** 相关产品、相似的支持工单、重复的 bug 报告。"找到与这个问题相似的问题" 是一个向量操作。你嵌入新问题并找到其最近邻。

**多语言内容。** 在多语言数据上训练的向量嵌入可以跨语言匹配。FTS 需要特定语言的配置，且跨语言查询效果很差。

```sql
-- 设置
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);
CREATE INDEX documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- 查询：语义搜索
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

注意：`ivfflat` 是近似索引——速度快，但会牺牲部分召回率。对于较小的数据集（约 100 万行以下），`hnsw` 通常更好：

```sql
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);
```

---

## 何时两者都需要

技术文档就是简单二分法失效的地方。用户既会搜索“如何配置超时”，也会搜索函数名如 `withRetry()` 和错误码如 `ECONNRESET`。

向量搜索处理概念性查询。FTS 处理精确术语。两者单独都无法很好地处理两种需求。

解决方案是混合搜索：同时运行两者并融合结果。

**倒数排序融合（RRF）** 是这里的标准算法。它不需要你规范化两个系统的分数；它只组合排名位置。

```sql
-- 使用倒数排序融合的混合搜索
WITH fts_results AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM documents, to_tsquery('english', $1) query
  WHERE search_vector @@ query
  LIMIT 50
),
vector_results AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(f.id, v.id) AS id,
    COALESCE(1.0 / (60 + f.rank), 0) + COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM fts_results f
  FULL OUTER JOIN vector_results v ON f.id = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

分母中的 `60` 是 RRF 常数——值越大，排名差异的影响越小；值越小，影响越大。默认值 60 在大多数情况下效果良好。

这个查询在一次查询中运行两个搜索，融合排名，并奖励那些关键词信号和语义信号一致的结果。

![混合搜索管道：一个查询分发给全文搜索和 pgvector，各自产生排序结果，倒数排序融合将两个列表合并。](../hybrid-rrf-pipeline.svg)

_RRF 的价值在于它避免了假装 `ts_rank` 和余弦距离是可比较的原始分数。它只问：“这个结果在每个列表中排得多高？”_

---

## 实用的决策树

选择搜索策略时，从**输入的形状**开始，然后问**用户在进行哪种查询**。“带有拼写变体的短字符串”与“精确术语重要的长文本”不是同一个问题，两者也与“针对文档块的提问”不同。

![决策树：根据文本形状和用户查询方式，选择 pg_trgm、全文搜索、pgvector、混合搜索或专用向量数据库。](../search-decision-tree.svg)

用文字表述的同一棵树：

- **姓名、地址、标题、自动补全或易拼错的短字符串** → `pg_trgm`
- **已知单词、错误码、SKU、函数名、标签、类别、过滤器** → FTS
- **问题、释义、推荐、相关项、多语言匹配、RAG 块** → pgvector
- **用户既需要精确符号又需要概念答案的技术内容** → 混合搜索 + RRF
- **主键、精确 ID、权限过滤器、日期范围、排序列表** → 普通 SQL 索引
- **海量向量、极高并发、或 Postgres 在基准测试中无法达到的延迟目标** → 评估专用向量存储

### 全文搜索 vs. 语义搜索：简版

“该用全文搜索还是向量搜索？”这个问题通常归结为：**你是否知道相关文档中会出现哪些词？**

如果知道——用户搜索已知术语、类别、函数名、产品代码——那么全文搜索更快、更便宜、更可预测。它能告诉你结果匹配的原因。

如果不知道——用户描述一个概念、提出一个问题、或用不同语言搜索——那么向量搜索是合适的工具。它匹配的是含义，而不是词语。

棘手的中间地带是对技术内容的自然语言查询。有人搜索“如何处理连接断开”，可能需要一篇标题为“实现网络故障重试逻辑”的文章——没有重叠的词语，但语义高度相关。这正是向量搜索发挥作用的地方。

另一个棘手的情况是**姓名和专有名词**。全文搜索和向量搜索都不擅长处理它们：
- 全文搜索会漏掉“Micheal”（搜索“Michael”时）——不同的词元
- 向量搜索会完全漏掉这个名字，如果它在训练数据中不频繁出现
- `pg_trgm` 能正确处理：基于拼写相似性，而非语义或词法

实践中，大多数内容密集的搜索框需要全文搜索来保证速度和关键词匹配，并且可能需要混合搜索或 `pg_trgm`，具体取决于用户是否搜索姓名。真正的语义搜索功能通常意味着使用 pgvector。RAG 始终意味着使用 pgvector。

---

## 如果你确实需要专用的向量存储

有些系统确实会超出 pgvector 的能力范围。当这种情况发生时，市场会很嘈杂。以下是顶级选项中的关键点。

### 功能矩阵

在表格变得有意义之前，有几个列需要先解释清楚。

**混合搜索** 意味着 BM25 关键词搜索和向量相似度在同一个查询中运行，通过倒数排名融合（Reciprocal Rank Fusion）合并结果。“withRetry timeout”可以精确匹配函数名，同时语义上匹配关于“网络故障重试逻辑”的文档。没有混合搜索，你只能选择一种搜索模式，或者自己融合两个查询。pgvector 的“手动（通过 SQL 实现 RRF）”就是[前面展示的方法](#when-you-need-both)：它能工作，但需要你自己编写。

**稀疏向量** 比 BM25 更进一步。一个 SPLADE 稀疏向量大约有 30,000 维（每个词汇一个维度），约 98% 为零。非零位置告诉你哪些词重要以及重要程度。查询“dogs”也会加权“canine”和“pet”：BM25 级别的关键词精度加上向量索引内的词扩展。如果这一列为假，你需要一个外部的全文搜索层来处理精确词查询。

```python
# SPLADE：总共约 30,000 维，约 60 个非零——只有相关的词汇位置被激活
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / 类 SQL** 实际上关乎过滤。没有过滤的向量搜索只是一个演示，而不是一个应用：你仍然需要租户范围、日期范围、权限和类别。完整的 SQL（pgvector）可以与你现有的连接一起表达这些。专用数据库使用 JSON 过滤对象（Qdrant、Pinecone）、查询 DSL（Elasticsearch、Milvus）或 GraphQL（Weaviate）。它们都能工作；当过滤逻辑变得复杂时，SQL 更具吸引力。

```sql
-- pgvector：向量相似度只是 WHERE 中的另一个表达式
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2 AND category = ANY($3::text[]) AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1 LIMIT 10;
```

```python
# Qdrant：等效过滤作为 Python 对象——功能上可行，但更繁琐
results = client.query_points(
    collection_name="documents", query=query_embedding,
    query_filter=models.Filter(must=[
        models.FieldCondition(key="tenant_id", match=models.MatchValue(value=tenant_id)),
        models.FieldCondition(key="category",  match=models.MatchAny(any=categories)),
        models.FieldCondition(key="created_at", range=models.DatetimeRange(gte=cutoff)),
    ]),
    limit=10,
)
```

**原生多模态** 并不意味着“可以存储图像嵌入”；每个数据库都能存储浮点数组。它意味着数据库提供了非文本内容的嵌入模型，所以你只需给它一个原始图像 URL，它就能处理向量化。这里的大多数数据库是嵌入无关的，因此你需要自己管理那个管道。Marqo 和 Weaviate（通过 CLIP/ImageBind 模块）实现了闭环。

```python
# Marqo：POST 原始图像，用文本查询——无需外部嵌入步骤
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="轻便的夏季鞋子")
# 返回 shoe-001，尽管关键词零重叠——CLIP 处理跨模态匹配
```

**基于磁盘的索引** 是一个成本问题。内存驻留的 HNSW 在计算原始向量、图开销和元数据后，每百万个 1536 维向量可能需要数 GB 的 RAM。磁盘原生替代方案（Milvus DiskANN、Elasticsearch DiskBBQ、LanceDB 的 Lance 格式、Turbopuffer 的对象存储层）通常以一些查询延迟换取更便宜的基础设施。对于模型延迟已经占主导的 RAG 工作负载，这通常值得进行基准测试。Redis VSS 是硬约束：仅限 RAM，没有磁盘路径。

**最大维度** 是今天的选择中隐藏的明天迁移问题。`text-embedding-3-large` 使用 3072 维，Jina v3 可以产生更大的嵌入，研究模型也在不断提高维度。一些托管服务发布了硬性维度上限；另一些则记录了高上限或对典型嵌入模型没有实际限制。在做出决定前检查当前文档。选择有扩展空间的方案；因为达到维度上限而迁移向量索引是一场痛苦的冲刺。

_最后验证于2026年5月8日，对照公开项目文档和产品页面。请将矩阵视为快照：托管服务限制、定价、混合搜索功能和磁盘索引选项变化很快。_

| 数据库 | 部署方式 | 许可证 | 混合搜索 | 稀疏向量 | SQL / 类SQL | 多模态 | 磁盘索引 | 最大维度 | 适用场景 |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | 自托管 / 托管（Supabase、Neon、RDS） | OSS（PostgreSQL） | 手动（通过SQL实现RRF） | ❌ | ✅ 完整SQL | ❌ | ✅ 磁盘HNSW | 存储16,000；索引`vector`类型2,000 | 已在用Postgres；中等向量规模 |
| **[Qdrant](https://github.com/qdrant/qdrant)** | 自托管 / 云 | Apache 2.0 | ✅ 原生BM25 | ✅ 成熟支持 | ❌（REST/gRPC） | ❌ | ✅ | 65,535 | 大规模过滤查询；复杂元数据 |
| **[Weaviate](https://github.com/weaviate/weaviate)** | 自托管 / 云 | BSD 3 | ✅ 原生BM25 + RRF | ✅ | ❌（GraphQL / gRPC） | ✅ 通过模块 | ✅ | 65,535 | GraphQL访问模式；内置向量化 |
| **[Pinecone](https://www.pinecone.io/)** | 仅云 | 专有 | ✅（2024年新增） | ✅ | ❌ | ❌ | ✅（无服务器） | 20,000 | 托管简化；无运维团队 |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | 自托管 / 云（Zilliz） | Apache 2.0 | ✅ 原生 | ✅ | ✅ 类SQL（Milvus查询语言） | ✅ | ✅ DiskANN | 32,768 | 十亿级；企业本地部署 |
| **[Chroma](https://github.com/chroma-core/chroma)** | 嵌入式 / 自托管 | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | 仅限本地开发和原型 |
| **[LanceDB](https://github.com/lancedb/lancedb)** | 嵌入式 / 云 | Apache 2.0 | ✅ | ❌ | ✅ 通过DataFusion实现SQL | ✅ 原生 | ✅（Lance格式） | 无限制 | 边缘 / 无服务器；多模态数据湖 |
| **[Orama](https://github.com/oramasearch/orama)** | 嵌入式 / 云 | Apache 2.0 | ✅ 全文+向量 | ❌ | ❌ | ❌ | ❌ | 因版本而异 | JS/边缘应用；轻量级站点/应用搜索 |
| **[Turbopuffer](https://turbopuffer.com/)** | 仅云（无服务器） | 专有 | ✅ BM25 + 向量 | ❌ | ❌ | ❌ | ✅（对象存储） | 16,000 | 多租户SaaS；数百万命名空间 |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | 自托管 / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER稀疏 | ✅（ELSER） | ✅ 查询DSL | ❌ | ✅ DiskBBQ | 4,096 | 已在用Elastic栈；混合企业搜索 |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | 自托管 / AWS托管 | Apache 2.0 | ✅ RRF + 神经搜索 | ✅ | ✅ 查询DSL | ❌ | ✅ FAISS + HNSW | 16,000 | AWS原生；开源Elastic替代 |
| **[Vespa](https://github.com/vespa-engine/vespa)** | 自托管 / 云 | Apache 2.0 | ✅ 原生 | ✅ 张量 / 词法排序 | ✅ YQL | ✅ 张量 | ✅ | 实际上无限制 | 搜索 + 排序 + 推荐系统 |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | 自托管 / 云 | Apache 2.0 | 手动 | ❌ | ✅ 完整SQL | ❌ | ✅ 列式 + HNSW | 因版本而异 | 分析/日志 + 向量搜索与OLAP并存 |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | 云 / 自托管 | SSPL | ✅ 内置 | ❌ | ✅ MQL + 聚合 | ❌ | ✅ HNSW | 8,192 | 已在用MongoDB；文档+向量合一 |
| **[Redis (VSS)](https://github.com/redis/redis)** | 自托管 / Redis Cloud | RSALv2 / SSPL | ✅（RediSearch） | ✅ | ❌ | ❌ | ❌ 仅RAM | 32,768 | 超低延迟；缓存层向量搜索 |
| **[Marqo](https://github.com/marqo-ai/marqo)** | 云 / 自托管 | Apache 2.0 | ✅ | ❌ | ❌ | ✅ 原生聚焦 | ✅ | 因版本而异 | 端到端多模态：图像+文本+视频 |

### 解读矩阵

有些东西无法整齐地放进表格：

**稀疏向量** 让你在向量索引内获得BM25级别的关键词匹配，无需单独的全文引擎。Qdrant和Elasticsearch在这方面有特别成熟的实现。Weaviate通过BM25F支持稀疏向量。如果混合搜索至关重要且你无法运行两个系统，请寻找稀疏向量支持。

**基于磁盘的索引** 是一个成本杠杆，而非实现细节。内存驻留的HNSW索引很快，但随着向量数量、维度、元数据和图开销的增长，成本可能变得高昂。基于磁盘的替代方案（Milvus DiskANN、Elasticsearch DiskBBQ、Turbopuffer对象存储、LanceDB的Lance格式）以查询延迟换取更低的基础设施成本。对于大型RAG索引，这种权衡通常值得测试。

**Turbopuffer的多租户** 围绕极高的命名空间计数构建。其公开定位和客户案例强调像Notion那样的大型、命名空间密集的语料库。如果每个用户或组织需要隔离的向量搜索，这种架构可以改变成本结构，但仍需针对自己的租户形态进行基准测试。

**LanceDB嵌入式模式** 是最接近“向量搜索的SQLite”的东西。它在进程中运行，无需服务器，可在Lambda、Cloudflare Workers和边缘环境中工作。Lance列式格式使嵌入式操作在真实规模下变得实用。

**Orama是搜索UX基础设施，而非仓库。** 当你需要在JavaScript应用、边缘或作为托管站点/应用搜索层中使用一个微小的全文/向量/混合搜索引擎时，它非常出色。但它不是我用于十亿向量检索、重型分析或复杂过滤连接的工具。

**Vespa是当你检索只是产品一半时的选择。** 它结合了词法检索、最近邻搜索、张量、排序表达式、分组和在线服务。这种能力是真实的，但操作和建模复杂性也是真实的。它更适合搜索/推荐团队，而不是“为我的CRUD应用添加语义搜索”。

**当搜索与分析绑定在一起时，ClickHouse值得考虑。** 如果你的数据源是事件、日志、追踪、指标或大型事实表，ClickHouse可以将向量距离、过滤、聚合以及现在严肃的全文索引保留在一个SQL引擎中。它不是专用的向量数据库，但对于分析型检索，它可以以最好的方式成为无聊的答案。

**Chroma在开发/测试和小型应用部署中最强。** 如果你的目标是超大型语料库、高可用、磁盘密集型操作或一流的混合搜索，请在将原型升级为基础设施之前评估面向生产的存储。

### 简化决策

如果你确实已经超越了pgvector——通常是因为基准测试显示向量数量、过滤、写入速率或高并发延迟超出了Postgres的承受范围——按约束条件选择：

- **具有每租户隔离的SaaS产品** → Turbopuffer
- **需要Rust级性能 + 复杂元数据过滤** → Qdrant
- **已在用Elastic/ELK栈** → Elasticsearch + DiskBBQ
- **希望使用开源方案的AWS用户** → OpenSearch
- **具有严肃排序需求的搜索/推荐平台** → Vespa
- **分析、可观测性或日志/事件搜索** → ClickHouse
- **十亿级本地/自托管** → Milvus
- **边缘 / 无服务器 / 多模态** → LanceDB
- **小型JS应用、文档站点或边缘原生搜索UX** → Orama
- **零运维、开箱即用、成本次要** → Pinecone
- **多模态优先（图像、视频、音频）** → Marqo
- **已在用MongoDB** → Atlas Vector Search
- **已在用Postgres，需要更多扩展空间** → Supabase Vector 或 Neon（均为托管pgvector，工具更完善）

---

## 一件不该做的事

不要将向量搜索用作有正确答案的模糊文本搜索。

"找到邮箱为 `dan@example.com` 的用户"不是向量搜索问题。"找到订单 ID 为 `ORD-12345` 的订单"也不是。将 `ORD-12345` 嵌入后对订单表做余弦相似度搜索，会返回*某个*结果，但可能是错的。这些是精确匹配问题。请使用主键或普通索引。

向量搜索返回数据集中*最相似*的内容，即使没有任何相关项也是如此。它不知道没有正确答案。这对相关文档检索没问题，但对特定记录查找则是灾难性的——一个错误的近似匹配比空结果更糟糕。

了解每种工具的用途。它们大多已经存在于你的 Postgres 安装中。在合适的地方使用它们。
````
