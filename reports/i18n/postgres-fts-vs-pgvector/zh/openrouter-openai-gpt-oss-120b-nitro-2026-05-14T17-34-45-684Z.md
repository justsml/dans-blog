# Translation Candidate
- Slug: postgres-fts-vs-pgvector
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/zh/index.mdx
- Validation: deferred
- Runtime seconds: 22.25
- Input tokens: 12836
- Output tokens: 7540
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.001858
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Postgres 搜索：FTS、Trigrams 与 pgvector
subTitle: 你已经拥有工具，挑选最匹配查询的即可。
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
团队在添加 AI 功能时，往往首先会选用专门的向量数据库。

Pinecone、Weaviate、Qdrant、Chroma。新服务、新依赖、新连接池、新账单，同时还要维护两个真相源。

与此同时，他们已经拥有 PostgreSQL。PostgreSQL 已经内置了 `pgvector`。自 2008 年起，它还提供了出色的全文搜索功能。

专用向量存储在大规模和高查询量的场景下才显得必要。但大多数应用在第一套搜索系统被强力驱动之前，就已经去使用第二套系统。这就是未来的扩展问题如何演变成今天的同步 bug。

所以：什么时候使用 FTS，什么时候使用 pgvector，什么时候两者一起用？

## 各自到底做了什么

全文搜索（`tsvector` / `GIN` 索引）是词法层面的。它把文本切分为词元，进行词干提取，并在索引上匹配查询。“Running” 与 “runs” 会归为同一词元，“dog” 与 “dogs” 亦然。排序函数（`ts_rank`）会提升那些查询词出现频繁或位置突出的文档。

pgvector 是语义层面的。它存储一个密集向量——一串数字——代表块的*含义*，由嵌入模型生成。相似度搜索在高维空间中寻找相邻向量。“Dog” 与 “canine” 会彼此靠近，而 “Running” 作为运动和 “running” 作为进程可能并不相近。

实际区别在于：FTS 回答“哪些文档包含这些词？” 向量搜索回答“哪些文档的意义大致相同？”

![搜索工具地图显示 pg_trgm 用于短模糊字符串，全文搜索用于精确的散文查询，pgvector 用于语义匹配，混合搜索用于需要同时提供精确和语义信号的长内容。](../search-tool-map.svg)

_第一层划分并不是“旧搜索 vs. AI 搜索”。而是文本的形态以及正确答案的类型。_

## 全文搜索何时占优

**你在搜索必须完全匹配的词。** 产品 SKU、错误码、型号、用户名、法律条款引用。`SKU-AX-44192` 在语义上并不等同于任何其他内容，要么匹配，要么不匹配。向量搜索可能会自信地返回 `SKU-AX-44193`，这显然不是你想要的。

**你的查询基于关键字。** 用户在搜索框中输入、按标签过滤，或按关键字检索博客文章。FTS 正是为这种意图设计的。

**你需要在没有 GPU 或嵌入基础设施的情况下获得排序结果。** FTS 索引快速、确定性，并且不需要外部 API 调用。添加一个 `tsvector` 列，构建 GIN 索引，工作就完成了。

**你在搜索的同时需要布尔过滤。** `WHERE to_tsvector(body) @@ to_tsquery('postgres') AND category = 'tutorial' AND published_at > NOW() - INTERVAL '6 months'` ——这可以自然地与现有查询逻辑组合。

```sql
-- Create the index
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- Query
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

`GENERATED ALWAYS AS` 列会自动保持索引同步。`setweight` 让标题匹配的权重高于正文匹配。这就是全部配置。

---

## 当 Trigram 更合适 (pg_trgm)

还有第三个 Postgres 工具常被忽视：`pg_trgm`。它既不是全文搜索，也不是向量搜索，而是模糊字符串匹配，弥补了前两者在尴尬中间地带的不足。

**使用场景：姓名、地址、标识符以及带有错别字的短字符串。**

FTS 会把文本切分为词元并做词干提取。这对自然语言段落有效，但不适合：
- 人名（"Dan Levy" → 词干化后可能是 "dan levi"、"leiv"，取决于语言配置）
- 公司名、地址、产品标题等对拼写要求严格的场景
- 含错别字的查询——"Micheal Jordan"、"Amaon"、"javascipt"
- 自动完成 / 前缀搜索
- 部分字符串匹配（"son" 匹配 "Johnson"、"Anderson"）

pgvector 在这里同样不理想。你可以为 "Micheal Jordan" 生成向量并找最近邻，但向量空间按语义组织名称，而不是按拼写。最近邻可能是 "basketball legend" 或 "Michael B. Jordan"，而不是带错别字的用户记录。

`pg_trgm` 将字符串拆分为重叠的 3‑字符片段，并计算两个字符串共享多少 trigram。例如 "Dan" → `" da"`、`"dan"`、`"an "`。"Micheal" 与 "Michael" 共享大多数 trigram，因而相似度很高。

```sql
-- Enable the extension (usually already available)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- GIN index on names column — enables fast trigram similarity search
CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- Fuzzy name search: finds "Micheal Jordan" when searching "Michael Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % operator = similarity threshold (default 0.3)
ORDER BY score DESC
LIMIT 10;

-- Or use ILIKE with trigram index support for contains matching
SELECT id, name
FROM users
WHERE name ILIKE '%johnson%'   -- GIN index makes this fast
LIMIT 10;
```

`%` 运算符使用 `pg_trgm.similarity_threshold`（默认 0.3，取值范围 0‑1）。阈值越高，匹配越严格。对姓名搜索来说，0.3‑0.4 通常是合适的：足够宽容以捕捉错别字，又能避免噪声。

**Trigram 还能帮助前缀搜索和自动完成，尤其是需要容错或包含匹配的场景：**

```sql
-- Autocomplete: prefix matching. For pure left-anchored prefixes,
-- compare trigram GIN against a B-tree pattern index on your data.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- More control: word_similarity for partial matches within longer strings
-- (useful when searching "Johnson" within "Andrew Johnson III")
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name          -- <% operator = word_similarity threshold
ORDER BY score DESC
LIMIT 10;
```

**何时优先使用 `pg_trgm` 而非 FTS：**

| 场景 | 选择 |
|---|---|
| 带错别字的个人/公司名称搜索 | `pg_trgm` |
| 自动完成 / 前缀搜索 | `pg_trgm`（或使用前缀查询的 FTS） |
| 短字符串、代码、标识符搜索 | `pg_trgm` |
| 文章、文档等正文搜索 | FTS |
| 日志消息关键词搜索 | FTS |
| 多语言姓名搜索 | `pg_trgm`（语言无关） |

`pg_trgm` 也可以与 FTS 组合使用。先用 trigram 做模糊预过滤，再用 `ts_rank` 排序，或把 trigram 相似度与向量得分混合。

---

## 当 pgvector 更合适

**你在构建 RAG。** RAG 依赖语义检索：找到意义最接近用户问题的文档 *块*，即使措辞不同。向量搜索正是为此而生。FTS 会漏掉同义词、改写和概念层面的匹配。

**用户描述的是需求，而不是搜索关键词。** “适合夏夜的轻盈酒”没有明显的葡萄酒关键词。 “关于新经理如何建立自信的文章”需要语义理解，FTS 无法提供。

**你在寻找相似项。** 关联产品、相似工单、重复的 bug 报告。 “找出与此问题相似的工单”是向量操作。先把新问题嵌入向量，再寻找最近邻即可。

**多语言内容。** 在多语言数据上训练的向量嵌入可以跨语言匹配。FTS 需要针对每种语言的配置，跨语言查询的表现很差。

```sql
-- Setup
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);
CREATE INDEX documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Query: semantic search
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

注意：`ivfflat` 是近似的——速度快，但会为召回率做出一定牺牲。对于较小的数据集（约 100 万行以下），`hnsw` 往往更合适：

```sql
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);
```

---

## 当你需要两者兼顾

技术文档是单一划分失效的典型场景。用户既会搜索 “how to configure timeouts”，也会搜索函数名如 `withRetry()` 或错误码 `ECONNRESET`。

向量搜索处理概念性查询，FTS 处理精确词汇，两者单独使用都难以兼顾全部需求。

解决方案是混合搜索：同时执行两种搜索并融合结果。

**Reciprocal Rank Fusion (RRF)** 是常用算法。它不要求对两个系统的分数进行归一化，只合并排名位置。

```sql
-- Hybrid search with Reciprocal Rank Fusion
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

分母中的 `60` 是 RRF 常数——数值越大，排名差异的影响越小，数值越小则放大差异。默认 60 在大多数场景下表现良好。

这条语句在一次查询中完成两种搜索、融合排名，并对关键字与语义信号同时出现的结果给予更高奖励。

![A hybrid search pipeline where one query fans out to full-text search and pgvector, each produces ranked results, and Reciprocal Rank Fusion combines the two lists.](../hybrid-rrf-pipeline.svg)

_RRF 有价值的原因在于它避免了把 `ts_rank` 与余弦距离当作可比的原始分数，只关心“每个结果在各自列表中出现的排名有多高”。_

---

## 实际决策树

选择搜索策略时，先看 **输入的形态**，再判断 **用户的查询意图**。 “带拼写变体的短字符串” 与 “需要精确词汇的长篇正文” 并不是同一问题，两者也不同于 “针对文档块的提问”。

![A decision tree that chooses pg_trgm, full-text search, pgvector, hybrid search, or a dedicated vector database based on the shape of the text and the way users query it.](../search-decision-tree.svg)

文字版决策树：

- **姓名、地址、标题、自动完成或易拼写错误的短字符串** → `pg_trgm`
- **已知词、错误码、SKU、函数名、标签、分类、过滤条件** → FTS
- **问题、改写、推荐、相关项、多语言匹配、RAG 块** → pgvector
- **技术内容需要同时匹配精确符号和概念答案** → 使用 RRF 的混合搜索
- **主键、精确 ID、权限过滤、日期范围、排序列表** → 常规 SQL 索引
- **向量规模巨大、并发极高或延迟要求 Postgres 达不到** → 考虑专用向量数据库

### FTS 与语义：简短版

“我应该使用 FTS 还是向量搜索？”这个问题通常归结为：**你是否知道相关文档中会出现哪些词？**

- 如果知道——用户搜索已知的术语、类别、函数名、产品代码——FTS 更快、更便宜且更可预测。它还能告诉你为什么匹配到了某个结果。
- 如果不知道——用户描述概念、提问，或使用不同语言——向量搜索才是合适的工具。它匹配的是意义，而不是字面词汇。

中间的棘手情况是对技术内容的自然语言查询。比如有人搜索 “how do I handle connection drops”，可能需要一篇标题为 “implementing retry logic for network failures” 的文章——词汇几乎不重叠，却语义高度相关。这正是向量搜索发挥价值的地方。

另一个棘手案例是 **人名和专有名词**。FTS 与向量搜索都不擅长处理它们：
- FTS 在搜索 “Michael” 时会错过 “Micheal”——因为分词不同
- 向量搜索如果训练数据中出现频率低，可能根本找不到该名字
- `pg_trgm` 能正确处理：基于正字法相似度，而非语义或词汇匹配

实际使用中，大多数内容丰富的搜索框需要 FTS 来保证速度和关键词匹配，是否需要混合或 `pg_trgm` 则取决于用户是否会搜索人名。真正的语义搜索功能通常意味着使用 pgvector。RAG 场景始终使用 pgvector。

---

## 如果真的需要专用向量存储

有些系统的需求会超出 pgvector 的承载范围。此时市场上选择繁多，关键在于以下维度。

### 功能矩阵

在表格有意义之前，需要先解释几列的含义。

**混合搜索** 指在同一查询中同时运行 BM25 关键字搜索和向量相似度，并通过 Reciprocal Rank Fusion 合并结果。比如 “withRetry timeout” 可以同时精确匹配函数名 *以及* 语义上与 “retry logic for network failures” 相关的文档。若不使用混合搜索，你只能选择单一搜索模式，或自行在两次查询后融合。pgvector 的 “Manual (RRF via SQL)” 正是[上文示例](#when-you-need-both) 中的做法：可行，但需要自行实现。

**稀疏向量** 超越了 BM25。SPLADE 稀疏向量大约有 30,000 维（每个词汇项一维），约 98% 为零。非零位置指示哪些词重要以及权重多少。查询 “dogs” 时，同样会加权 “canine” 与 “pet”：相当于 BM25 级别的关键字精度加上向量索引内部的词项扩展。如果此列为 false，则需要外部 FTS 层来处理精确词查询。

```python
# SPLADE: ~30,000 dims total, ~60 non-zero — only the relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / 类 SQL** 实际上是指过滤能力。没有过滤的向量搜索只能算演示，无法直接用于生产：仍需租户范围、日期区间、权限和分类等条件。Full SQL（pgvector）可以在现有 JOIN 旁边直接表达这些约束。专用数据库则使用 JSON 过滤对象（Qdrant、Pinecone）、查询 DSL（Elasticsearch、Milvus）或 GraphQL（Weaviate）。它们都能工作；当过滤逻辑变得错综复杂时，SQL 的吸引力会提升。

```sql
-- pgvector: vector similarity is just another expression in WHERE
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2 AND category = ANY($3::text[]) AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1 LIMIT 10;
```

```python
# Qdrant: equivalent filter as a Python object — functional, more ceremony
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

**多模态原生** 并不等同于 “能存储图像嵌入”；所有数据库都能存放浮点数组。这里指的是数据库自带非文本内容的嵌入模型，你只需提供原始图像 URL，数据库会自行完成向量化。大多数数据库仍是模型无关的，需要自行构建管道。Marqo 与 Weaviate（通过 CLIP/ImageBind 模块）实现了闭环。

```python
# Marqo: POST raw images, query with text — no external embedding step needed
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**磁盘索引** 是成本问题。每百万条 1536 维向量的 RAM‑resident HNSW 可能需要数 GB 内存（原始向量、图结构开销和元数据一起算）。磁盘原生方案（Milvus DiskANN、Elasticsearch DiskBBQ、LanceDB 的 Lance 格式、Turbopuffer 的对象存储层）通常以稍高的查询延迟换取更低的基础设施费用。对于模型延迟已是主要瓶颈的 RAG 工作负载，这种权衡往往值得基准测试。Redis VSS 则是硬性限制：仅支持 RAM，暂无磁盘路径。

**最大维度** 隐含了未来迁移的风险。`text-embedding-3-large` 使用 3072 维，Jina v3 可输出更大维度，研究模型仍在不断提升。部分托管服务会公布硬性维度上限；其他则只给出高上限或声称对常见嵌入模型没有实际限制。使用前务必查阅最新文档，选择留有余量的方案；因为一旦碰到维度上限而迁移向量索引，将是一场痛苦的冲刺。

_Last verified against public project docs and product pages on May 8, 2026. Treat the matrix as a snapshot: managed‑service limits, pricing, hybrid‑search features, and disk‑index options change quickly._

| 数据库 | 部署方式 | 许可证 | 混合搜索 | 稀疏向量 | SQL / 类SQL | 多模态 | 磁盘索引 | 最大维度 | 适用场景 |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | 自托管 / 托管（Supabase、Neon、RDS） | OSS（PostgreSQL） | 手动（通过 SQL 实现 RRF） | ❌ | ✅ 完整 SQL | ❌ | ✅ 磁盘上的 HNSW | 16,000 存储；2,000 已索引 `vector` | 已在 Postgres 上；向量数量适中 |
| **[Qdrant](https://github.com/qdrant/qdrant)** | 自托管 / 云 | Apache 2.0 | ✅ 原生 BM25 | ✅ 成熟支持 | ❌（REST/gRPC） | ❌ | ✅ | 65,535 | 大规模过滤查询；复杂元数据 |
| **[Weaviate](https://github.com/weaviate/weaviate)** | 自托管 / 云 | BSD 3 | ✅ 原生 BM25 + RRF | ✅ | ❌（GraphQL / gRPC） | ✅ 通过模块 | ✅ | 65,535 | GraphQL 访问模式；内置向量化 |
| **[Pinecone](https://www.pinecone.io/)** | 仅云 | 专有 | ✅（2024 年新增） | ✅ | ❌ | ❌ | ✅（无服务器） | 20,000 | 托管简易；无需运维团队 |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | 自托管 / 云（Zilliz） | Apache 2.0 | ✅ 原生 | ✅ | ✅ 类 SQL（Milvus Query Language） | ✅ | ✅ DiskANN | 32,768 | 十亿级规模；企业本地部署 |
| **[Chroma](https://github.com/chroma-core/chroma)** | 嵌入式 / 自托管 | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | 本地开发与原型验证 |
| **[LanceDB](https://github.com/lancedb/lancedb)** | 嵌入式 / 云 | Apache 2.0 | ✅ | ❌ | ✅ 通过 DataFusion 的 SQL | ✅ 原生 | ✅（Lance 格式） | 无限 | 边缘 / 无服务器；多模态湖仓 |
| **[Orama](https://github.com/oramasearch/orama)** | 嵌入式 / 云 | Apache 2.0 | ✅ 全文 + 向量 | ❌ | ❌ | ❌ | ❌ | 视实现而定 | JS/edge 应用；轻量站点/应用搜索 |
| **[Turbopuffer](https://turbopuffer.com/)** | 仅云（无服务器） | 专有 | ✅ BM25 + 向量 | ❌ | ❌ | ❌ | ✅（对象存储） | 16,000 | 多租户 SaaS；数百万命名空间 |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | 自托管 / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER 稀疏 | ✅（ELSER） | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4,096 | 已在 Elastic 套件中；企业混合搜索 |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | 自托管 / AWS 托管 | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16,000 | AWS 原生；开源 Elastic 替代品 |
| **[Vespa](https://github.com/vespa-engine/vespa)** | 自托管 / 云 | Apache 2.0 | ✅ 原生 | ✅ 张量 / 词汇排名 | ✅ YQL | ✅ 张量 | ✅ | 实际上无限制 | 搜索 + 排名 + 推荐系统 |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | 自托管 / 云 | Apache 2.0 | 手动 | ❌ | ✅ 完整 SQL | ❌ | ✅ 列式 + HNSW | 视实现而定 | 分析/日志场景，向量搜索并行 OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | 云 / 自托管 | SSPL | ✅ 内置 | ❌ | ✅ MQL + 聚合 | ❌ | ✅ HNSW | 8,192 | 已在 MongoDB 上；文档 + 向量合一 |
| **[Redis (VSS)](https://github.com/redis/redis)** | 自托管 / Redis Cloud | RSALv2 / SSPL | ✅（RediSearch） | ✅ | ❌ | ❌ | ❌ 仅 RAM | 32,768 | 超低延迟；缓存层向量搜索 |
| **[Marqo](https://github.com/marqo-ai/marqo)** | 云 / 自托管 | Apache 2.0 | ✅ | ❌ | ❌ | ✅ 原生多模态 | ✅ | 视实现而定 | 端到端多模态：图像 + 文本 + 视频 |

### 阅读矩阵

有些信息难以在表格中完整呈现：

**稀疏向量** 是在向量索引内部实现 BM25 级别关键词匹配的方式，无需额外的全文检索引擎。Qdrant 和 Elasticsearch 在这块实现尤为成熟。Weaviate 通过 BM25F 提供支持。如果混合搜索是关键且不能运行两套系统，请优先寻找稀疏向量支持。

**基于磁盘的索引** 是成本杠杆，而非实现细节。RAM‑resident HNSW 索引查询快，但随着向量数量、维度、元数据和图结构开销增长，成本会迅速上升。磁盘方案（Milvus DiskANN、Elasticsearch DiskBBQ、Turbopuffer 对象存储、LanceDB 的 Lance 格式）以稍高的查询延迟换取更低的基础设施费用。对大规模 RAG 索引，这种权衡常值得测试。

**Turbopuffer 的多租户** 设计围绕极高的命名空间数量。其公开定位和客户案例强调类似 Notion 那样的大型、命名空间密集型语料库。如果每个用户或组织都需要隔离的向量搜索，这种架构会改变经济模型，但仍需自行基准测试租户形态。

**LanceDB 嵌入模式** 是最接近 “SQLite for vector search” 的实现。它在进程内运行，无需服务器，可在 Lambda、Cloudflare Workers 以及边缘环境中使用。Lance 列式格式让嵌入式大规模操作变得可行。

**Orama 是搜索 UX 基础设施，而非数据仓库。** 当你需要在 JavaScript 应用、边缘或托管站点/应用搜索层中嵌入一个极小的全文/向量/混合搜索引擎时，它表现出色。但它并不适合十亿级向量检索、重度分析或复杂过滤关联的场景。

**Vespa 是当检索仅是产品一半时的选择。** 它融合了词汇检索、最近邻搜索、张量、排名表达式、分组以及在线服务。功能强大，但运维和建模复杂度同样高。更适合搜索/推荐团队，而不是 “给我的 CRUD 应用加个语义搜索”。

**ClickHouse 在搜索与分析结合时值得一提。** 如果你的真相来源是事件、日志、追踪、指标或大型事实表，ClickHouse 能在同一个 SQL 引擎里保留向量距离、过滤、聚合，甚至现在的完整全文索引。它不是专门的向量数据库，但在分析检索场景下往往是最稳妥的答案。

**Chroma 在开发/测试和小型应用部署上最强。** 若目标是极大规模语料、HA、磁盘密集型运行或一流的混合搜索，请在将原型提升为基础设施前评估更适合生产的存储方案。

### 简化决策

如果你真的已经超出 pgvector 的承载能力——通常因为基准显示向量数量、过滤、写入速率或高并发延迟已逼近 Postgres 的上限——请按约束选择：

- **SaaS 产品需租户隔离** → Turbopuffer  
- **需要 Rust 级别性能 + 复杂元数据过滤** → Qdrant  
- **已经在 Elastic/ELK 体系** → 带 DiskBBQ 的 Elasticsearch  
- **AWS 环境且想要开源方案** → OpenSearch  
- **搜索/推荐平台需严肃排名** → Vespa  
- **分析、可观测性或日志/事件搜索** → ClickHouse  
- **企业本地/自托管十亿级规模** → Milvus  
- **边缘 / 无服务器 / 多模态** → LanceDB  
- **小型 JS 应用、文档站点或边缘原生搜索 UX** → Orama  
- **零运维、即开即用、成本次要** → Pinecone  
- **多模态优先（图像、视频、音频）** → Marqo  
- **已经在 MongoDB** → Atlas Vector Search  
- **已经在 Postgres，需要更大余量** → Supabase Vector 或 Neon（均为 pgvector 托管版，工具链更完善）

---

## 一件绝不可做的事

不要把向量搜索当作模糊文本搜索来解决那些有唯一正确答案的场景。

“找出电子邮件为 `dan@example.com` 的用户”并不是向量搜索能解决的问题。 “找出订单号为 `ORD-12345` 的订单”同样如此。把 `ORD-12345` 做嵌入并在订单表上进行余弦相似度计算会返回*某个结果*，但它可能是错误的。这类场景需要精确匹配，应该使用主键或普通索引。

向量搜索会返回数据集中*最相似*的条目，即使根本没有相关结果。它并不知道没有合适的答案。这在寻找相关文档时还能接受，但在特定记录查询中就会灾难性——一个错误的近似匹配比空结果更糟。

要清楚每种工具的定位。大多数工具已经随你的 Postgres 安装而来，按需求使用即可。
````
