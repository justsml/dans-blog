# Translation Candidate
- Slug: postgres-fts-vs-pgvector
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/zh/index.mdx
- Validation: deferred
- Runtime seconds: 49.22
- Input tokens: 13034
- Output tokens: 7177
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.028048
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Postgres 搜索：FTS、Trigrams 与 pgvector
subTitle: 工具已在手，按查询需求选择即可。
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
很多团队在增加 AI 功能时，往往会首选专门的向量数据库。

Pinecone、Weaviate、Qdrant、Chroma。这意味着新的服务、新的依赖、新的连接池、新的账单，以及现在必须保证两个真相来源（sources of truth）的一致性。

与此同时，他们其实已经有了 PostgreSQL。PostgreSQL 已经拥有了 `pgvector`。而且自 2008 年以来，它就内置了出色的全文搜索（Full-Text Search）功能。

专门的向量存储在大规模和高查询量下确实物有所值。但大多数应用在还没把第一个搜索系统压榨到极限之前，就急于引入第二个。这就是为什么未来的扩展性问题会演变成今天的同步 Bug。

那么：什么时候用 FTS，什么时候用 pgvector，又该什么时候两者并用？

---

## 它们究竟在做什么

全文搜索（`tsvector` / `GIN` 索引）是词法层面的。它将文本标记为词素（lexemes），提取词干，并将查询与索引进行匹配。“Running” 和 “runs” 会折叠成同一个词素。“dog” 和 “dogs” 也是如此。排名函数（`ts_rank`）会奖励那些查询词出现频率高或位置显著的文档。

pgvector 是语义层面的。它存储一个稠密向量——一组数字——代表嵌入模型（embedding model）所理解的一段内容的“含义”。相似性搜索是在高维空间中寻找附近的向量。“Dog” 和 “canine” 会靠在一起。但作为运动的 “running” 和作为进程的 “running” 可能不会。

实际区别在于：FTS 回答的是“哪些文档包含这些单词？”向量搜索回答的是“哪些文档大致表达了这个意思？”

![一张搜索工具地图，展示了用于短模糊字符串的 pg_trgm、用于精确正文查询的全文搜索、用于语义匹配的 pgvector，以及用于需要同时具备精确和语义信号的长内容的混合搜索。](../search-tool-map.svg)

_首要的区别不是“传统搜索 vs. AI 搜索”，而是文本的形态以及什么样的答案才是正确的。_

---

## 全文搜索胜出的场景

**你正在搜索必须精确匹配的术语。** 产品 SKU、错误代码、型号、用户名、法律条款引用。`SKU-AX-44192` 在语义上不与任何东西相似。它要么匹配，要么不匹配。向量搜索可能会自信地返回 `SKU-AX-44193`。但这并不是你想要的。

**你的查询是基于关键词的。** 用户在搜索框中输入内容、按标签筛选或按关键词搜索博客文章。FTS 就是为这种意图形态而生的。

**你需要在没有 GPU 或嵌入基础设施的情况下获得排名结果。** FTS 索引速度快、具有确定性，且不需要外部 API 调用。增加一个 `tsvector` 列，构建一个 GIN 索引，大功告成。

**你在进行搜索的同时还需要布尔过滤。** `WHERE to_tsvector(body) @@ to_tsquery('postgres') AND category = 'tutorial' AND published_at > NOW() - INTERVAL '6 months'` —— 这可以自然地与你现有的查询逻辑组合。

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

`GENERATED ALWAYS AS` 列会自动保持索引更新。`setweight` 确保标题匹配的权重高于正文。这就是全部配置。

---

## 什么时候该用 Trigrams (pg_trgm)

Postgres 还有第三个经常被忽略的工具：`pg_trgm`。它既不是全文检索，也不是向量搜索。它是模糊字符串匹配，专门处理这两者都表现不佳的尴尬中间地带。

**使用场景：姓名、地址、标识符以及带有拼写错误的短字符串。**

FTS 将文本拆分为词位（lexemes）并进行词干提取（stemming）。这适用于散文，但不适合以下场景：
- 人名（"Dan Levy" → 词干提取为 "dan levi"、"leiv"，取决于语言配置）
- 公司名称、地址、产品名称等拼写至关重要的场景
- 带有拼写错误的查询 —— "Micheal Jordan"、"Amaon"、"javascipt"
- 自动补全 / 前缀搜索
- 部分字符串匹配（"son" 匹配 "Johnson"、"Anderson"）

pgvector 在这里也不是好选择。你可以嵌入 "Micheal Jordan" 并找到最近的向量，但嵌入空间是按语义而非拼写来组织名称的。最近邻可能是 "basketball legend" 或 "Michael B. Jordan"，而不是那个带拼写错误的用户记录。

`pg_trgm` 将字符串分解为重叠的 3 字符切片（trigrams），并衡量两个字符串共享多少个 trigram。"Dan" -> `" da"`, `"dan"`, `"an "`。"Micheal" 和 "Michael" 共享大部分 trigram，因此相似度很高。

```sql
-- 启用扩展（通常已内置）
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 在名称列上创建 GIN 索引 — 支持快速的 trigram 相似度搜索
CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- 模糊名称搜索：搜索 "Michael Jordan" 时能找到 "Micheal Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % 运算符 = 相似度阈值（默认 0.3）
ORDER BY score DESC
LIMIT 10;

-- 或者使用支持 trigram 索引的 ILIKE 进行包含匹配
SELECT id, name
FROM users
WHERE name ILIKE '%johnson%'   -- GIN 索引让这种查询飞快
LIMIT 10;
```

`%` 运算符使用 `pg_trgm.similarity_threshold`（默认 0.3，范围 0-1）。值越高要求匹配越精确。对于姓名搜索，0.3-0.4 通常比较合适：既能捕获拼写错误，又足够严格以避免噪音。

**Trigrams 还有助于前缀搜索和自动补全，尤其是当自动补全需要容错或包含匹配时：**

```sql
-- 自动补全：前缀匹配。对于纯左锚定前缀，
-- 可以对比 trigram GIN 与数据上的 B-tree pattern 索引。
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- 更精细的控制：word_similarity 用于长字符串中的部分匹配
-- （在搜索 "Andrew Johnson III" 中的 "Johnson" 时很有用）
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name          -- <% 运算符 = word_similarity 阈值
ORDER BY score DESC
LIMIT 10;
```

**何时选择 `pg_trgm` 而非 FTS：**

| 场景 | 推荐工具 |
|---|---|
| 带有拼写错误的人名/公司名搜索 | `pg_trgm` |
| 自动补全 / 前缀搜索 | `pg_trgm` (或 FTS 前缀查询) |
| 搜索短字符串、代码、标识符 | `pg_trgm` |
| 搜索散文文章、文档 | FTS |
| 在日志消息中搜索关键词 | FTS |
| 多语言名称搜索 | `pg_trgm` (与语言无关) |

`pg_trgm` 也可以与 FTS 配合使用。利用 trigram 进行模糊预过滤并使用 `ts_rank` 排序，或者将 trigram 相似度与向量评分结合。

---

## 什么时候该用 pgvector

**你正在构建 RAG。** RAG 依赖于语义检索：寻找含义与用户问题最接近的文档 *分块（chunks）*，即使措辞完全不同。向量搜索是为此量身定制的。FTS 会漏掉改写、同义词和概念性匹配。

**用户描述的是需求，而不是搜索词。** “适合夏夜的清淡饮品” 并没有明显的葡萄酒关键词。“关于如何建立新任经理自信心的文章” 需要 FTS 无法提供的语义理解。

**你正在寻找相似项。** 相关产品、类似的工单、重复的 Bug 报告。“帮我找找和这个类似的 issue” 是典型的向量操作。你嵌入新的 issue 并找到它的最近邻。

**多语言内容。** 在多语言数据上训练的向量嵌入（Vector embeddings）可以实现跨语言匹配。而 FTS 需要针对特定语言进行配置，且处理跨语言查询的效果很差。

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

注意：`ivfflat` 是近似索引 —— 它速度很快，但以牺牲部分召回率（recall）为代价。对于较小的数据集（约 100 万行以下），`hnsw` 通常是更好的选择：

```sql
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);
```

---

## 当你需要两者兼顾时

技术文档是这种简单分类失效的地方。用户会搜索“如何配置超时（how to configure timeouts）”，但他们也会搜索像 `withRetry()` 这样的函数名和像 `ECONNRESET` 这样的错误代码。

向量搜索处理概念性查询。FTS 处理精确术语。两者单独使用都无法完美解决问题。

解决方案是**混合搜索（hybrid search）**：同时运行两者并融合结果。

**倒数排名融合（Reciprocal Rank Fusion, RRF）** 是此场景下的标准算法。它不需要你对两个系统的评分进行归一化；它结合的是排名位置。

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

分母中的 `60` 是 RRF 常数 —— 较高的值会降低排名差异的影响，较低的值则会放大影响。默认值 60 在大多数情况下效果良好。

这在一个查询中运行了两次搜索，融合了排名，并奖励那些关键词和语义信号达成一致的结果。

![一个混合搜索流水线，其中一个查询分发到全文搜索和 pgvector，各自产生排序结果，最后通过倒数排名融合（RRF）合并两个列表。](../hybrid-rrf-pipeline.svg)

_RRF 的价值在于它避免了假装 `ts_rank` 和余弦距离是可比的原始评分。它只关注：“这个结果在每个列表中出现的排名有多高？”_

---

## 实践决策树

在选择搜索策略时，先从**输入数据的形态**开始，然后询问**用户正在进行什么样的查询**。“带有拼写变化的短字符串”与“精确术语至关重要的长篇散文”不是同一个问题，而这两者又都不同于“针对文档分块的提问”。

![一个决策树，根据文本形态和用户查询方式，在 pg_trgm、全文搜索、pgvector、混合搜索或专用向量数据库之间做出选择。](../search-decision-tree.svg)

用文字描述同样的决策逻辑：

- **姓名、地址、标题、自动补全或易拼错的短字符串** → `pg_trgm`
- **已知词汇、错误代码、SKU、函数名、标签、分类、过滤器** → FTS
- **提问、改写、推荐、相关项、多语言匹配、RAG 分块** → pgvector
- **用户既需要精确符号又需要概念性回答的技术内容** → 使用 RRF 的混合搜索
- **主键、精确 ID、权限过滤、日期范围、排序列表** → 普通 SQL 索引
- **海量向量数据、极高的并发量，或 Postgres 在你的基准测试中无法达到的延迟目标** → 评估专用向量数据库

### FTS 对比语义搜索：简而言之

“我该用 FTS 还是向量搜索？”这个问题通常可以简化为：**你是否知道相关文档中会出现哪些词汇？**

如果是——用户搜索的是已知术语、分类、函数名、产品代码——那么 FTS 更快、更便宜且更可预测。它能告诉你为什么某个结果匹配。

如果不是——用户在描述一个概念、提出一个问题，或者使用另一种语言搜索——那么向量搜索才是正确的工具。它匹配的是含义，而非词汇。

最棘手的中间地带是对技术内容的自然语言查询。有人搜索“如何处理连接中断”，可能需要一篇标题为“为网络故障实现重试逻辑”的文章——两者没有重叠词汇，但语义相关性极高。这就是向量搜索体现价值的地方。

另一个棘手的情况是**姓名和专有名词**。FTS 和向量搜索在这方面表现都不理想：
- FTS 在搜索“Michael”时会漏掉“Micheal”——因为它们是不同的词元（token）。
- 如果某个名字在训练数据中不经常出现，向量搜索会完全忽略它。
- `pg_trgm` 能正确处理这种情况：它基于拼写相似性，而非语义或词汇。

在实践中，大多数内容密集型的搜索框需要 FTS 来保证速度和关键词匹配，并可能根据用户是否搜索姓名而需要混合搜索或 `pg_trgm`。真正的语义搜索功能通常意味着需要 pgvector。而 RAG（检索增强生成）则必然意味着 pgvector。

---

## 如果你确实需要专用向量数据库

有些系统的规模确实会超出 pgvector 的承载能力。当这种情况发生时，市场上的选择非常嘈杂。以下是各大主流选项中真正核心的考量因素。

### 功能矩阵

在看表之前，有几个列需要详细说明。

**混合搜索（Hybrid search）** 意味着 BM25 关键词搜索和向量相似度在同一个查询中运行，并通过倒数排名融合（RRF）进行合并。搜索 "withRetry timeout" 可以精确匹配函数名，*同时* 在语义上匹配关于“网络故障重试逻辑”的文档。如果没有混合搜索，你只能选择一种搜索模式，或者自己手动融合两个查询的结果。pgvector 的“手动模式（通过 SQL 实现 RRF）”就是[上文展示的方法](#when-you-need-both)：它可行，但需要你自己写代码实现。

**稀疏向量（Sparse vectors）** 比 BM25 更进一步。一个 SPLADE 稀疏向量拥有约 30,000 个维度（每个词汇表术语一个维度），其中约 98% 为零。非零位置告诉你哪些术语重要以及重要程度。查询“dogs”也会给“canine”和“pet”分配权重：这相当于在向量索引内部实现了 BM25 级别的关键词精度加上术语扩展。如果这一列为 false，你通常需要一个外部的 FTS 层来处理精确术语查询。

```python
# SPLADE：总计约 30,000 维，约 60 个非零值 —— 仅触发相关的词汇位置
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / 类 SQL** 核心在于过滤。没有过滤功能的向量搜索只是演示，不是应用：你仍然需要租户隔离、日期范围、权限控制和分类过滤。全功能 SQL (pgvector) 可以在现有的 join 操作旁直接表达这些逻辑。专用数据库则使用 JSON 过滤对象 (Qdrant, Pinecone)、查询 DSL (Elasticsearch, Milvus) 或 GraphQL (Weaviate)。它们也能用，但随着过滤逻辑变得复杂，SQL 会变得更有吸引力。

```sql
-- pgvector：向量相似度只是 WHERE 子句中的另一个表达式
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2 AND category = ANY($3::text[]) AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1 LIMIT 10;
```

```python
# Qdrant：作为 Python 对象的等效过滤器 —— 功能完备，但更繁琐
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

**原生多模态（Multimodal native）** 并不意味着“可以存储图像嵌入”；任何数据库都能存储浮点数组。它的意思是数据库内置了针对非文本内容的嵌入模型，因此你只需提供原始图像 URL，它就会处理向量化。这里的大多数数据库都是嵌入不可知的（embedding-agnostic），所以你需要自己维护那条流水线。Marqo 和 Weaviate（通过 CLIP/ImageBind 模块）则打通了这一环节。

```python
# Marqo：提交原始图像，使用文本查询 —— 无需外部嵌入步骤
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# 尽管关键词零重叠，仍返回 shoe-001 —— CLIP 处理了跨模态匹配
```

**基于磁盘的索引（Disk-based index）** 是一个成本问题。常驻内存的 HNSW 索引在计入原始向量、图开销和元数据后，每百万个 1536 维向量可能需要数 GB 的内存。磁盘原生替代方案（Milvus DiskANN、Elasticsearch DiskBBQ、LanceDB 的 Lance 格式、Turbopuffer 的对象存储层）通常以牺牲一定的查询延迟来换取更便宜的基础设施。对于模型延迟已经占主导地位的 RAG 工作负载，这通常值得进行基准测试。Redis VSS 是一个硬限制：仅限内存，没有磁盘路径。

**最大维度（Max dimensions）** 是隐藏在今日选择中的明日迁移隐患。`text-embedding-3-large` 使用 3072 维，Jina v3 可以生成更大的嵌入，而研究模型还在不断推高维度。一些托管服务发布了硬性的维度上限；另一些则记录了很高的上限或对典型嵌入模型没有实际限制。在投入使用前请检查最新文档。选择一个有余量的方案；因为达到维度上限而不得不迁移向量索引是一场痛苦的突击战。

_最后验证于 2026 年 5 月 8 日，参考了公开项目文档和产品页面。请将此矩阵视为快照：托管服务限制、定价、混合搜索功能和磁盘索引选项变化极快。_

| 数据库 | 部署方式 | 许可证 | 混合搜索 | 稀疏向量 | SQL / 类 SQL | 多模态 | 磁盘索引 | 最大维度 | 核心优势 |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | 自托管 / 托管 (Supabase, Neon, RDS) | OSS (PostgreSQL) | 手动 (通过 SQL 实现 RRF) | ❌ | ✅ 完整 SQL | ❌ | ✅ HNSW 支持磁盘 | 16,000 存储；2,000 索引 `vector` | 已在使用 Postgres；中等规模向量量级 |
| **[Qdrant](https://github.com/qdrant/qdrant)** | 自托管 / 云端 | Apache 2.0 | ✅ 原生 BM25 | ✅ 成熟支持 | ❌ (REST/gRPC) | ❌ | ✅ | 65,535 | 大规模过滤查询；复杂元数据 |
| **[Weaviate](https://github.com/weaviate/weaviate)** | 自托管 / 云端 | BSD 3 | ✅ 原生 BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ 通过模块支持 | ✅ | 65,535 | GraphQL 访问模式；内置向量化 |
| **[Pinecone](https://www.pinecone.io/)** | 仅限云端 | 专有 | ✅ (2024 年新增) | ✅ | ❌ | ❌ | ✅ (Serverless) | 20,000 | 托管的便捷性；无需运维团队 |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | 自托管 / 云端 (Zilliz) | Apache 2.0 | ✅ 原生 | ✅ | ✅ 类 SQL (Milvus Query Language) | ✅ | ✅ DiskANN | 32,768 | 十亿级规模；企业级私有化部署 |
| **[Chroma](https://github.com/chroma-core/chroma)** | 嵌入式 / 自托管 | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | 仅限本地开发和原型制作 |
| **[LanceDB](https://github.com/lancedb/lancedb)** | 嵌入式 / 云端 | Apache 2.0 | ✅ | ❌ | ✅ 通过 DataFusion 支持 SQL | ✅ 原生 | ✅ (Lance 格式) | 无限制 | 边缘计算 / Serverless；多模态湖仓一体 |
| **[Orama](https://github.com/oramasearch/orama)** | 嵌入式 / 云端 | Apache 2.0 | ✅ 全文 + 向量 | ❌ | ❌ | ❌ | ❌ | 视情况而定 | JS/边缘应用；轻量级站点/应用搜索 |
| **[Turbopuffer](https://turbopuffer.com/)** | 仅限云端 (Serverless) | 专有 | ✅ BM25 + 向量 | ❌ | ❌ | ❌ | ✅ (对象存储) | 16,000 | 多租户 SaaS；数百万命名空间 |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | 自托管 / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER 稀疏 | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4,096 | 已在使用 Elastic 栈；企业级混合搜索 |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | 自托管 / AWS 托管 | Apache 2.0 | ✅ RRF + 神经搜索 | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16,000 | AWS 原生；开源版 Elastic 替代方案 |
| **[Vespa](https://github.com/vespa-engine/vespa)** | 自托管 / 云端 | Apache 2.0 | ✅ 原生 | ✅ 张量 / 词法排序 | ✅ YQL | ✅ 张量 | ✅ | 实际上无限制 | 搜索 + 排序 + 推荐系统 |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | 自托管 / 云端 | Apache 2.0 | 手动 | ❌ | ✅ 完整 SQL | ❌ | ✅ 列式 + HNSW | 视情况而定 | 伴随 OLAP 的分析/日志向量搜索 |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | 云端 / 自托管 | SSPL | ✅ 内置 | ❌ | ✅ MQL + 聚合 | ❌ | ✅ HNSW | 8,192 | 已在使用 MongoDB；文档与向量合一 |
| **[Redis (VSS)](https://github.com/redis/redis)** | 自托管 / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ 仅限内存 | 32,768 | 极低延迟；缓存层向量搜索 |
| **[Marqo](https://github.com/marqo-ai/marqo)** | 云端 / 自托管 | Apache 2.0 | ✅ | ❌ | ❌ | ✅ 原生聚焦 | ✅ | 视情况而定 | 端到端多模态：图像 + 文本 + 视频 |

### 矩阵解读

有些特性无法简单地用表格概括：

**稀疏向量（Sparse vectors）** 是在向量索引中实现 BM25 级别关键词匹配的方法，无需独立的全文搜索引擎。Qdrant 和 Elasticsearch 在这方面的实现尤为成熟。Weaviate 通过 BM25F 提供支持。如果混合搜索至关重要且你无法运行两套系统，请寻找支持稀疏向量的方案。

**基于磁盘的索引（Disk-based indexes）** 是一种成本杠杆，而非实现细节。常驻内存的 HNSW 索引速度很快，但随着向量数量、维度、元数据和图开销的增长，成本会变得非常昂贵。磁盘原生替代方案（Milvus DiskANN、Elasticsearch DiskBBQ、Turbopuffer 对象存储、LanceDB 的 Lance 格式）以查询延迟换取更低的基础设施成本。对于大型 RAG 索引，这种权衡通常值得测试。

**Turbopuffer 的多租户能力** 围绕极高数量的命名空间构建。其公开定位和客户案例强调了类似 Notion 那样庞大且命名空间密集的语料库。如果每个用户或组织都需要隔离的向量搜索，这种架构可以改变经济效益，但仍需根据你自己的租户形态进行基准测试。

**LanceDB 嵌入模式** 是最接近“向量搜索界的 SQLite”的东西。它在进程内运行，不需要服务器，并可在 Lambda、Cloudflare Workers 和边缘环境中工作。Lance 列式格式使嵌入式操作在实际规模下具有可行性。

**Orama 是搜索 UX 基础设施，而非仓库。** 当你需要在 JavaScript 应用、边缘侧或作为托管的站点/应用搜索层使用微型全文/向量/混合搜索引擎时，它表现出色。但如果是十亿级向量检索、重度分析或复杂的过滤连接，它不是首选工具。

**Vespa 是当检索只是产品功能的一半时你会选择的工具。** 它结合了词法检索、最近邻搜索、张量、排序表达式、分组和在线服务。这种能力很强大，但运维和建模的复杂度也同样很高。它更适合搜索/推荐团队，而不是“给我的 CRUD 应用加个语义搜索”。

**当搜索与分析挂钩时，ClickHouse 值得讨论。** 如果你的事实来源是事件、日志、追踪、指标或大型事实表，ClickHouse 可以在一个 SQL 引擎中同时处理向量距离、过滤、聚合以及现在的重度全文索引。它不是专门的向量数据库，但对于分析型检索，它可能是最稳妥的选择。

**Chroma 在开发/测试和小规模应用部署中表现最强。** 如果你的目标是超大规模语料库、高可用性、重度磁盘操作或一流的混合搜索，在将原型转为基础设施之前，请评估面向生产环境的存储方案。

### 简化决策建议

如果你确实已经超出了 pgvector 的承载能力——通常是因为基准测试显示向量数量、过滤、写入速率或高并发延迟突破了 Postgres 的极限——请根据约束条件进行选择：

- **具有单租户隔离需求的 SaaS 产品** → Turbopuffer
- **需要 Rust 级性能 + 复杂元数据过滤** → Qdrant
- **已在使用 Elastic/ELK 栈** → 带有 DiskBBQ 的 Elasticsearch
- **倾向开源的 AWS 深度用户** → OpenSearch
- **具有严肃排序需求的搜索/推荐平台** → Vespa
- **分析、可观测性或日志/事件搜索** → ClickHouse
- **十亿级规模的私有化部署 / 自托管** → Milvus
- **边缘侧 / Serverless / 多模态** → LanceDB
- **小型 JS 应用、文档站点或边缘原生搜索 UX** → Orama
- **零运维、即插即用、成本次要** → Pinecone
- **多模态优先（图像、视频、音频）** → Marqo
- **已在使用 MongoDB** → Atlas Vector Search
- **已在使用 Postgres，需要更多余量** → Supabase Vector 或 Neon（均为 pgvector 托管版，工具链更完善）

---

## 绝对不要做的一件事

不要将向量搜索用作那些具有“正确答案”的内容的模糊文本搜索。

“帮我找邮箱为 `dan@example.com` 的用户”不是一个向量搜索问题。同理，“帮我找 ID 为 `ORD-12345` 的订单”也不是。对 `ORD-12345` 进行嵌入（embedding）并对订单表执行余弦相似度计算，确实会返回*某些结果*，但它很可能是错的。这些是精确匹配问题，请直接使用主键或普通索引。

向量搜索返回的是数据集中“最相似”的东西，即便没有任何内容真正相关。它并不知道“没有正确答案”这回事。这在处理相关文档时没问题，但在查找特定记录时则是灾难性的——在这种场景下，一个错误的近似匹配比空结果更糟糕。

搞清楚每个工具的适用场景。它们中的大多数已经存在于你的 Postgres 安装中了。在合适的地方使用它们。
````
