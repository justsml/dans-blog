# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/zh/index.mdx
- Validation: deferred
- Runtime seconds: 44.14
- Input tokens: 11552
- Output tokens: 7022
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.026842
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 语义向量搜索，以及其他助你赢取友谊与爱慕的话题
subTitle: 搜索技术全景：精确、模糊、语义与混合搜索，以及何时进行多层叠加。
date: '2026-05-01'
modified: '2026-05-04'
tags:
  - postgres
  - postgresql
  - pgvector
  - vector-search
  - semantic-search
  - hybrid-search
  - rag
  - ai
  - databases
  - search
  - embeddings
category: Code
subCategory: Databases
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
搜索不是一回事，语义搜索也不是其他搜索方式的替代品。

“查找邮箱为 `dan@example.com` 的用户”和“帮我找找关于新手工程师如何调试的文章”都被称为搜索，但作为工程问题，它们几乎没有任何共同点。前者有唯一正确答案，只需一个 `O(log n)` 的索引查找。后者没有标准答案——只有相关性——并且需要理解语言、意图和含义。

在搜索决策中最具说服力的工程师——那些能赢得争论并交付正确系统的工程师——对整个领域了如指掌。他们知道该选用哪种工具以及原因，并且能清晰地解释。

本文涵盖了语义层：向量搜索究竟在做什么，它在什么时候胜出，以及它在什么时候应该靠边站。实用的版本不是“把一切都向量化”，而是知道在混合架构中，向量何时应该与词法（lexical）、模糊（fuzzy）和精确匹配搜索并存。

关于词法和模糊搜索的另一半内容——`tsvector`、`pg_trgm`、`pg_search`——请参阅 [Postgres 文本搜索指南 2026](../postgres-text-search-guide)。

---

## 术语一览

**Embedding（嵌入）** — 由模型生成的稠密浮点数列表，将一段文本（或图像、音频等）表示为高维空间中的一个点。语义相关的内容落点较近；不相关的内容落点较远。

**Lexical search（词法搜索）** — 基于精确单词和 Token 匹配的搜索。速度快、确定性强，对于已知术语非常准确。无法理解同义词、转述或跨语言的等价表达。

**Semantic search（语义搜索）** — 基于含义而非 Token 的搜索。查询“如何处理超时”可以匹配到标题为“配置重试策略”的文档，即使两者没有共同词汇，因为它们的 Embedding 在几何空间上很接近。

**Vector（向量）** — 一组数字列表。在搜索场景中，指 Embedding 模型的输出。“向量搜索”通过几何距离查找与查询向量最接近的向量。

**FTS (Full-Text Search，全文搜索)** — Postgres 内置的词法搜索，由 `tsvector` / `tsquery` 驱动。对文本进行分词、提取词干并建立索引以供关键词查询。擅长处理散文和精确术语查找；对含义视而不见。

**BM25** — 一种用于词法搜索的排序算法（被 Elasticsearch、Qdrant 等使用）。它根据词频进行评分，并结合该词在整个语料库中的稀有程度进行加权。优于原始关键词匹配；但仍属于词法搜索。

**HNSW (Hierarchical Navigable Small World)** — 向量搜索的标准近似最近邻（ANN）索引。它构建了一个分层的邻近图，用于实现快速、高召回率的相似度查询。pgvector、Qdrant、Weaviate 以及大多数其他工具都在使用它。

**RRF (Reciprocal Rank Fusion)** — 一种用于合并来自多个检索系统的排序结果列表的算法。仅使用排名位置——无需分数归一化。在 FTS 和向量列表中排名都靠前的结果，其综合得分会高于仅在其中一个列表中占优的结果。

---

## 语义搜索究竟在做什么

向量 Embedding 将文本（或图像、音频等）转换为一组数字列表——即高维空间中的一个点。Embedding 模型经过训练，使得语义相关的文本在该空间中落点相近。“狗”和“犬科动物”会靠得很近。而“跑马拉松”和“运行 Python 脚本”尽管共享一个动词，但在空间上会离得很远。

在该空间中的相似度搜索能找到与查询*含义*最接近的文档，而不管单词是否精确重合。

这意味着：
- “如何配置请求超时？”可以匹配到标题为“设置连接限制与重试策略”的文章——没有重叠关键词，但概念相关性极高。
- “适合夏日夜晚的清爽之选”可以匹配到红酒推荐，即便产品描述中没有出现这些关键词。
- 如果 Embedding 模型经过多语言训练，英文查询可以匹配到法语、西班牙语或日语的相关文档。

词法搜索（`tsvector`、`pg_trgm`）做不到这些。它处理的是单词和字符，而非含义。这两类工具不可互换——它们解决的是不同的问题。

---

## pgvector 的胜出场景

**构建 RAG。** 检索增强生成（Retrieval-Augmented Generation）会检索出含义与用户问题最接近的文档块，然后将其作为上下文传递给语言模型。这个检索步骤是一个向量操作。全文检索（FTS）会漏掉释义、同义词以及那些表达方式不同但概念一致的相关内容。相比独立向量数据库，pgvector 的优势在于：它运行在现有的 Postgres 实例中——无需部署、运维额外的服务，也不需要同步数据。

**用户描述需求，而非搜索词。** “关于建立新任经理自信心的文章”中没有哪个关键词能稳定出现在相关帖子中。“用于处理副作用的轻量级框架”在文档中可能并不会使用这些精确的词汇。向量搜索匹配的是意图，而非拼写。

**寻找相似项。** 相关产品、相似的支持工单、重复的 Bug 报告、你可能喜欢的文章。“查找与此类似的工单”本质上是最近邻搜索——对该项进行 Embedding，然后找到它在几何空间上的邻居。一个重要的警示：向量搜索总是会返回结果，即使没有任何真正相似的内容。对于去重和推荐场景，请通过最小相似度阈值（例如余弦相似度 ≥ 0.80）进行过滤，以避免将低置信度的匹配项误当作有意义的结果。

**语义去重。** 在为 RAG 或搜索索引内容之前，你通常需要识别语料库中的近重复项——多次修订的文章、提交了两次的支持工单、大幅重叠的知识库条目。对文档进行 Embedding 并通过余弦相似度进行阈值过滤，可以在这些内容污染索引之前对其进行标记或合并。这能防止检索返回多个近乎相同的块，从而稀释上下文窗口。

**多语言搜索。** 多语言 Embedding 模型将不同语言中语义等价的内容映射到相近的向量。用西班牙语查询“perder peso”可以匹配到关于“sustainable weight loss habits”的英文文章——没有共享 Token，但底层含义相同。FTS 需要针对每种语言配置字典，且处理跨语言查询的效果很差。`pg_trgm` 与语言无关，但它是基于字形的，而非语义。

### 配置 pgvector

从安装扩展到相似度查询，整个设置只需几条 SQL 语句：

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- 对于中等规模的数据集，HNSW 通常是首选的索引类型
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- 语义搜索查询
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` 表示余弦距离。`1 - cosine_distance` 得到余弦相似度（1.0 = 完全相同，0.0 = 正交）。对于 `ivfflat`（较旧、构建速度较快的替代方案），初始设置建议使用 `lists = sqrt(row_count)`。

### pgvector 处理不佳的场景

- 精确 Token 匹配——产品 SKU、错误代码、函数名。`ORD-12345` 在语义上不与任何东西相似。基于 Embedding 的搜索可能会返回 `ORD-12344` 或完全无关的内容。这种情况请使用 FTS 或 B-tree 索引。
- 姓名和专有名词。Embedding 空间按含义组织，而非拼写。用户记录中的 “Micheal Jordan” 在向量空间中不一定落在 “Michael Jordan” 附近。
- 字符级相似度比含义更重要的短字符串。`pg_trgm` 更擅长处理此类情况。
- 要求精确术语必须出现的查询。对于已知术语的匹配，BM25 和 FTS 更可靠。

---

## 混合搜索：两者并行的理由

技术文档是证明单一工具不足以应对需求的最典型例子。

用户搜索“如何配置超时”时需要概念匹配：一篇标题为《设置重试策略和连接限制》的文章虽然没有重叠的关键词，但正是他们需要的。

同样是这些用户，也会搜索 `withRetry()`、`ECONNRESET` 和 `ERR_SOCKET_TIMEOUT`。这些精确字符串必须出现——语义匹配可能无法可靠地找到它们，而误报（概念上相似但并非正确的 API）会产生严重的误导。

向量搜索处理概念查询。全文检索（FTS）处理精确术语。两者单独使用都无法完美兼顾。

解决方案是混合搜索：同时运行两者并融合结果。

### 倒数排名融合 (RRF)

**倒数排名融合 (Reciprocal Rank Fusion, RRF)** 是合并来自不同检索系统的排名列表的标准算法。它不需要在系统之间进行分值归一化——它只使用排名位置。在*两个*列表中排名都靠前的结果，其合并得分会高于仅在某一个列表中占据主导地位的结果。

```sql
WITH fts_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM documents, to_tsquery('english', $1) query
  WHERE search_vector @@ query
  LIMIT 50
),
vector_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(f.id, v.id) AS id,
    COALESCE(1.0 / (60 + f.rank), 0) +
    COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM fts_results f
  FULL OUTER JOIN vector_results v ON f.id = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

分母中的 `60` 是 RRF 常数。较高的值会淡化排名位置的差异；较低的值则会放大差异。默认值 60 在大多数内容类型中表现良好。

RRF 避开了将 `ts_rank`（基于对数频率的分值）与余弦距离（几何度量）进行归一化的难题。这两者不具备可比性。RRF 只问一个问题：“这个结果在每个列表中的排名有多高？”

### 同时包含 Trigram 的混合搜索

对于面向用户的混合内容搜索——用户可能在同一个会话中搜索人名、概念或精确术语——三路融合可以处理所有情况：

```sql
WITH trgm_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY similarity(title, $1) DESC) AS rank
  FROM documents
  WHERE title % $1
  LIMIT 50
),
fts_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, to_tsquery('english', $1)) DESC) AS rank
  FROM documents
  WHERE search_vector @@ to_tsquery('english', $1)
  LIMIT 50
),
vector_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(t.id, f.id, v.id) AS id,
    COALESCE(1.0 / (60 + t.rank), 0) +
    COALESCE(1.0 / (60 + f.rank), 0) +
    COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM trgm_results t
  FULL OUTER JOIN fts_results f ON t.id = f.id
  FULL OUTER JOIN vector_results v ON COALESCE(t.id, f.id) = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

这涵盖了：模糊名称匹配（trigrams）、精确关键词匹配（FTS）以及概念查询（vector）。一个搜索框即可满足三种用户意图。

---

## 多层混合架构

实际应用中很少只有一个搜索入口。通常有多个入口，每个入口的需求各异：

| 搜索场景 | 用户查询内容 | 推荐层级 |
|---|---|---|
| 博客 / 文档搜索 | 关键词 + 概念 | FTS + pgvector (RRF) |
| 用户/客户名称查找 | 带有拼写错误的名称 | `pg_trgm` |
| 产品搜索 | 名称、描述、“相似产品” | `pg_trgm` + FTS + pgvector |
| 支持工单去重 | “与此类似的问题” | 仅 pgvector |
| 内部 SKU/订单搜索 | 精确标识符 | B-tree 索引 |
| 大规模知识库 RAG | 自然语言问题 | pgvector (分块文档) |
| 电商“猜你喜欢” | 行为 + 语义相似度 | pgvector |
| 自动补全 | 前缀、容错拼写 | `pg_trgm` |

这些并非假设。大多数内容密集型应用至少需要两个具有不同查询形态的独立搜索入口。人们往往倾向于选择一种方法并到处套用——现在通常是向量搜索，因为它是流行之选。这会导致在明明使用 trigram 索引会更快、更便宜且更准确的问题上，浪费昂贵的 Embedding 成本。

### 经验法则

当出现当前层级无法解决的失效模式时，再增加一层：

- 用户抱怨拼写错误导致匹配失败 → 增加 `pg_trgm`
- 用户按概念搜索却漏掉了相关结果 → 增加 pgvector
- 用户搜索精确的符号或代码，却得到了概念性的结果 → 增加 FTS，或检查是否过度依赖向量搜索
- 延迟成为瓶颈 → 评估预过滤（pre-filtering）、近似索引（approximate indexes）或专用存储

---

## 如果你确实需要专用向量数据库

在需要切换数据库之前，pgvector 已经能处理大量的应用搜索需求。粗略的临界点取决于向量数量、索引设置、写入频率、过滤条件、硬件和并发量。因此，请将“1000 万向量以下”这条规则视为压测的起点假设，而非产品上限。当你真正遇到瓶颈时——例如极高的并发、极低的 p99 延迟要求、数十亿级别的向量，或严苛的多租户隔离需求——专用向量数据库的版图非常广阔，值得深入了解。

### 矩阵列的真实含义

**混合搜索（Hybrid search）** 意味着 BM25 关键词搜索和向量相似度在同一个查询中运行，并通过 RRF（倒数排名融合）合并。如果没有它，你要么只能选一种搜索模式，要么得自己手动融合两个查询的结果。

**稀疏向量（Sparse vectors）** 比 BM25 更进一步。一个 SPLADE 稀疏向量拥有约 30,000 个维度（每个词表项一个维度），其中约 98% 为零。非零位置告诉你哪些词项重要以及权重是多少。搜索“dogs”也会给“canine”和“pet”加权——这是在向量索引内部实现了 BM25 级别的精确度加上词项扩展。如果此列为 false，你通常需要一个独立的 FTS 层来处理精确词项查询。

```python
# SPLADE: 约 30,000 维，约 60 个非零值 —— 仅相关的词表位置被激活
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / 类 SQL** 核心在于过滤。没有过滤的向量搜索只是个 Demo。你仍然需要租户范围、日期区间、权限控制和分类过滤。全功能 SQL（如 pgvector, LanceDB）可以在现有的 join 操作旁直接表达这些逻辑。专用数据库则使用 JSON 过滤对象（Qdrant, Pinecone）、查询 DSL（Elasticsearch, Milvus）或 GraphQL（Weaviate）。它们都能用，但随着过滤逻辑变得复杂，SQL 的吸引力会直线上升。

```sql
-- pgvector: 向量相似度只是另一个表达式
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2
  AND category = ANY($3::text[])
  AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1
LIMIT 10;
```

```python
# Qdrant: 作为 Python 对象的等效过滤器 —— 结果相同，但更有仪式感
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

**原生多模态（Multimodal native）** 意味着数据库内置了非文本内容的 Embedding 模型。你只需给它一个原始图片 URL，它负责向量化。大多数数据库是 Embedding 无关的——你需要自己维护 Embedding 流水线。Marqo 和 Weaviate（通过 CLIP/ImageBind 模块）实现了这一闭环。

```python
# Marqo: 提交原始图片，用文本查询 —— 无需外部 Embedding 步骤
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# 尽管关键词零重合，仍返回 shoe-001 —— CLIP 处理了跨模态匹配
```

**基于磁盘的索引（Disk-based index）** 是成本杠杆。一旦计入原始向量、图开销和元数据，常驻内存的 HNSW 索引每百万个 1536 维向量可能需要数 GB 内存。磁盘原生方案（如 Milvus DiskANN、Elasticsearch DiskBBQ、LanceDB 的 Lance 格式、Turbopuffer 的对象存储层）通常以牺牲部分查询延迟为代价，换取更低的基础设施成本。对于模型延迟已占主导地位的 RAG 工作负载，这种权衡通常值得压测。

**最大维度（Max dimensions）** 是隐藏在架构中的迁移隐患。`text-embedding-3-large` 使用 3072 维，Jina v3 可以生成更大的 Embedding，研究模型也在不断推高维度。一些托管服务发布了硬性的维度上限；另一些则记录了极高的上限或对典型模型没有实际限制。在投入使用前请检查最新文档。选择留有余地的方案；因为触及维度天花板而被迫迁移向量索引是一场痛苦的突击战。

*最后校验于 2026 年 5 月 8 日，参考了公开项目文档和产品页面。请将下表视为决策辅助，而非替代对当前限制、定价和托管服务功能开关的检查。*

### 行业版图

| 数据库 | 部署方式 | 许可证 | 混合搜索 | 稀疏向量 | SQL / 类 SQL | 多模态 | 磁盘索引 | 最大维度 | 适用场景 |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | 自建 / 托管 (Supabase, Neon, RDS) | OSS (PostgreSQL) | 手动 (通过 SQL 实现 RRF) | ❌ | ✅ 全功能 SQL | ❌ | ✅ HNSW 支持磁盘 | 16,000 存储; 2,000 索引 `vector` | 已在使用 Postgres；中等向量规模 |
| **[Qdrant](https://github.com/qdrant/qdrant)** | 自建 / 云端 | Apache 2.0 | ✅ 原生 BM25 | ✅ 成熟支持 | ❌ (REST/gRPC) | ❌ | ✅ | 65,535 | 大规模过滤查询；复杂元数据 |
| **[Weaviate](https://github.com/weaviate/weaviate)** | 自建 / 云端 | BSD 3 | ✅ 原生 BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ 通过模块支持 | ✅ | 65,535 | GraphQL 访问模式；内置向量化 |
| **[Pinecone](https://www.pinecone.io/)** | 仅限云端 | 商业闭源 | ✅ (2024年新增) | ✅ | ❌ | ❌ | ✅ (Serverless) | 20,000 | 托管的便捷性；无运维团队 |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | 自建 / 云端 (Zilliz) | Apache 2.0 | ✅ 原生支持 | ✅ | ✅ 类 SQL (Milvus Query Language) | ✅ | ✅ DiskANN | 32,768 | 十亿级规模；企业级私有化部署 |
| **[Chroma](https://github.com/chroma-core/chroma)** | 嵌入式 / 自建 | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | 仅限本地开发和原型制作 |
| **[LanceDB](https://github.com/lancedb/lancedb)** | 嵌入式 / 云端 | Apache 2.0 | ✅ | ❌ | ✅ 通过 DataFusion 支持 SQL | ✅ 原生支持 | ✅ (Lance 格式) | 无限制 | 边缘计算 / Serverless；多模态湖仓 |
| **[Orama](https://github.com/oramasearch/orama)** | 嵌入式 / 云端 | Apache 2.0 | ✅ 全文 + 向量 | ❌ | ❌ | ❌ | ❌ | 视情况而定 | JS/边缘应用；轻量级站点/应用搜索 |
| **[Turbopuffer](https://turbopuffer.com/)** | 仅限云端 (Serverless) | 商业闭源 | ✅ BM25 + 向量 | ❌ | ❌ | ❌ | ✅ (对象存储) | 16,000 | 多租户 SaaS；数百万个命名空间 |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | 自建 / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER 稀疏 | ✅ (ELSER) | ✅ 查询 DSL | ❌ | ✅ DiskBBQ | 4,096 | 已在使用 Elastic 栈；企业级混合搜索 |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | 自建 / AWS 托管 | Apache 2.0 | ✅ RRF + 神经搜索 | ✅ | ✅ 查询 DSL | ❌ | ✅ FAISS + HNSW | 16,000 | AWS 原生；开源版 Elastic 替代方案 |
| **[Vespa](https://github.com/vespa-engine/vespa)** | 自建 / 云端 | Apache 2.0 | ✅ 原生支持 | ✅ 张量 / 词法排序 | ✅ YQL | ✅ 张量支持 | ✅ | 理论无限制 | 搜索 + 排序 + 推荐系统 |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | 自建 / 云端 | Apache 2.0 | 手动 | ❌ | ✅ 全功能 SQL | ❌ | ✅ 列式 + HNSW | 视情况而定 | OLAP 旁路向量搜索的分析/日志场景 |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | 云端 / 自建 | SSPL | ✅ 内置支持 | ❌ | ✅ MQL + 聚合 | ❌ | ✅ HNSW | 8,192 | 已在使用 MongoDB；文档 + 向量合一 |
| **[Redis (VSS)](https://github.com/redis/redis)** | 自建 / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ 仅限内存 | 32,768 | 极低延迟；缓存层向量搜索 |
| **[Marqo](https://github.com/marqo-ai/marqo)** | 云端 / 自建 | Apache 2.0 | ✅ | ❌ | ❌ | ✅ 原生聚焦 | ✅ | 视情况而定 | 端到端多模态：图片 + 文本 + 视频 |

### 表格之外的补充

**Turbopuffer 的多租户能力**是围绕极高数量的命名空间构建的。其公开定位和客户案例强调了像 Notion 这样庞大且命名空间密集型的语料库。如果每个用户或组织都需要隔离的向量搜索，这种架构可以改变经济效益，但仍需根据你自己的租户形态进行压测。

**LanceDB 嵌入式模式**是最接近“向量搜索界的 SQLite”的东西。它在进程内运行，无需服务器，并可在 Lambda、Cloudflare Workers 和边缘环境中工作。Lance 列式格式使得嵌入式操作在实际规模下具有可行性。

**Chroma 在开发/测试和小型应用部署中表现最强。** 如果你的目标是非常大规模的语料库、高可用性、重度磁盘操作或一流的混合搜索，在将原型转为基础设施之前，请评估更偏向生产环境的存储方案。

**Vespa 适用于检索仅占产品功能一半的场景。** 它集成了词法检索、最近邻搜索、张量运算、排名表达式、分组以及在线服务。这种能力非常强大，但运维和建模的复杂度也同样惊人。它更适合专门的搜索/推荐团队，而不是那些只想“给 CRUD 应用加个语义搜索”的开发者。

**当搜索与分析挂钩时，ClickHouse 值得关注。** 如果你的真相来源是事件、日志、追踪（traces）或指标，ClickHouse 可以在同一个 SQL 引擎中处理向量距离、过滤、聚合以及严肃的全文索引。它不是专门的向量数据库，但通常是分析型检索中那个“无聊但正确”的答案。

**稀疏向量（Sparse vectors）是你在向量索引中获得 BM25 级别关键词匹配的方法** —— 且无需运行独立的全文引擎。Qdrant 和 Elasticsearch 在这方面有非常成熟的实现。如果混合搜索至关重要，且你无法接受双系统架构，那么支持稀疏向量就是核心需求。

### 当 pgvector 触及瓶颈时的选择

- **需要按租户隔离的 SaaS 产品** → Turbopuffer
- **大规模下的复杂元数据过滤** → Qdrant
- **已在使用 Elastic/ELK 栈** → 带有 DiskBBQ 的 Elasticsearch
- **倾向开源方案的 AWS 拥趸** → OpenSearch
- **有深度排名需求的搜索/推荐平台** → Vespa
- **分析、可观测性、日志/事件搜索** → ClickHouse
- **十亿级规模的本地部署 / 私有化部署** → Milvus
- **边缘计算 / Serverless / 多模态** → LanceDB
- **小型 JS 应用、文档网站或边缘原生搜索体验** → Orama
- **零运维需求，成本次要** → Pinecone
- **多模态优先（图片、视频、音频）** → Marqo
- **已在使用 MongoDB** → Atlas Vector Search
- **已在使用 Postgres，需要更高上限** → Supabase Vector 或 Neon（均为 pgvector 托管版，工具链更完善）

---

## 绝对不要做的一件事

不要将向量搜索当作针对“有正确答案”的数据的模糊文本搜索。

“查找邮箱为 `dan@example.com` 的用户”不是向量搜索能解决的问题。“查找 ID 为 `ORD-12345` 的订单”也不是。对 `ORD-12345` 进行嵌入（embedding）并按余弦相似度搜索肯定会返回*某些东西* —— 但它可能是错的。标识符（Identifier）有且只有一个正确答案。对标识符进行近似匹配就是一个 Bug。

向量搜索会返回数据集中*最相似*的内容，即使没有任何内容真正相关。它不知道什么时候“没有好答案”。这对于相关文档搜索没问题，但对于精确记录查找则是严重问题，因为一个“自信的错误答案”比空结果更糟糕。

反之亦然：不要将全文搜索（FTS）用于用户描述概念的查询。“关于在不确定性下做艰难决定的文章”不包含可靠的关键词。FTS 要么返回噪音，要么空手而归。请根据查询的形态选择正确的工具。

---

## 全景图

大多数生产环境的搜索系统都需要不止一层：

- **`pg_trgm`**：用于姓名、拼写纠错、自动补全。
- **FTS / `pg_search`**：用于基于关键词的文本搜索。
- **pgvector**：用于语义和概念查询。
- **RRF 融合（fusion）**：用于用户混合查询类型的场景。
- **普通索引**：用于精确标识符、过滤器和排序列表。

这些工具不是竞争关系，而是互补关系。一个构建良好的搜索系统会为每种查询形态选择合适的层 —— 当查询形态重叠时，它会运行多个层并融合结果。

能交付优秀搜索功能的团队理解整个技术栈。而那些做不到的团队，只会盲目引入向量数据库，把所有东西都嵌入进去，然后纳闷为什么精确查找有时会返回错误的记录。
````
