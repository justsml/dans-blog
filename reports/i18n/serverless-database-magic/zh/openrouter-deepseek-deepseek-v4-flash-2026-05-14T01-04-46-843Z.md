# Translation Candidate
- Slug: serverless-database-magic
- Locale: zh
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-09-15--serverless-database-magic/zh/index.mdx
- Validation: deferred
- Runtime seconds: 19.16
- Input tokens: 4717
- Output tokens: 3663
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001633
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 2025年数据库创新浪潮
subTitle: 你可以感谢AI。
date: '2025-09-10'
modified: '2025-09-17'
tags:
  - serverless
  - databases
  - ai
  - innovation
  - chroma
  - lancedb
  - pagefind
  - orama
  - duckdb
category: Search
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../data-city-wide.webp
cover_mobile: ../data-city-square-200.webp
cover_icon: ../data-city-square-200.webp
cover_credit: ©️ 2025 Dan Levy
---
## 不是又一篇向量数据库文章

以下是我希望自己早些知道的决策规则：

<p class="inset">如果你的数据可以从文件重建，且用户主要是读取，那么优先尝试对象存储数据库。如果用户整天都在写入，那就从真正的数据库开始，别再试图让 S3 扮演数据库的角色。</p>

这才是那条有用的分界线。不是“无服务器是未来”，也不是“向量数据库改变了一切”——这些话已经印在足够多的会议挂绳上了。

AI 确实改变了许多搜索问题的形态。突然间，小团队想要语义搜索、混合排序、文档对话、多模态查询，以及对对象存储中的文件进行分析。过去的答案是“跑 Postgres 加 pgvector”、“运维 OpenSearch/Elasticsearch”或“购买托管搜索服务”。当工作负载配得上时，这些仍然是好答案。

但很多工作负载并不配。它们是读密集、可重建、且能容忍内容变更到搜索更新之间短暂延迟的。文档、目录快照、静态导出、内部知识库、本地分析、原型 RAG 系统。对于这些场景，一类新工具让原本乏味的架构变得异常强大：构建索引，存为文件，通过 HTTP 提供服务。

快照说明：这个生态发展很快。下面的星标数、功能标签和性能数据是 2025 年 9 月的快照，不是永恒的记分牌。请把它们当作方向参考，在将生产迁移押注到某个具体方案之前，务必查阅最新文档。

## 换个名字的数据库

这些无服务器且支持 CDN 的数据存储适用于中等规模场景——大约 1,000 到 1,000,000 条记录或几个 GB——在这些场景中，传统数据库基础设施往往仪式感大于实际价值：

- **Pagefind**（2022 年，约 4.5K ⭐）：纯静态方案——编译一次，永久搜索，零后端需求
- **Orama**（2023 年，约 8K ⭐）：通用解决方案，从浏览器到无服务器函数随处运行
- **Chroma**（2022 年，约 14K ⭐）：AI 原生，专为 RAG 应用构建
- **LanceDB**（2023 年，约 4K ⭐）：企业级多模态能力，基于磁盘架构
- **DuckDB-WASM**（2019 年，约 23K ⭐）：通过 WebAssembly 在浏览器中运行的完整 SQL 分析数据库

常见的做法很简单：将持久化数据放在文件或对象存储中，然后从浏览器、边缘函数、Worker 或轻量级服务中查询。这并没有消除复杂性，而是将复杂性转移到了构建管道、索引新鲜度、缓存失效和客户端能力上。当读取占主导时，这是一个非常划算的权衡。

### 功能对比

| 特性 | [Pagefind](https://pagefind.app) | [Orama](https://orama.com) | [Chroma](https://www.trychroma.com/) | [LanceDB](https://lancedb.com) | [DuckDB-WASM](https://duckdb.org/docs/api/wasm) |
|---------|----------|--------|---------|----------|----------|
| **全文搜索** | ✅ 高级词干提取 | ✅ BM25，30种语言 | ✅ SQLite FTS | ✅ Tantivy | ✅ 完整 SQL |
| **向量搜索** | ❌ | ✅ 余弦相似度 | ✅ HNSW | ✅ IVF_PQ、HNSW、GPU | ⚠️ 扩展 |
| **AI/RAG 集成** | 无 | ✅ 内置管道 | ✅ LangChain、LlamaIndex | ✅ 高级重排序 | ⚠️ 手动配置 |
| **存储** | 静态 JSON/WASM | 内存 + S3 插件 | 基于服务器* | 兼容 S3 的 Lance | WASM + S3/HTTP |
| **写入支持** | 仅构建时 | 完整 CRUD | 完整 CRUD | 完整 CRUD | 完整 SQL CRUD |
| **性能** | <100ms | 0.0001ms - 100ms | <100ms | 向量 3-5ms，FTS 50ms | 10ms-1s（复杂 SQL） |

*2025年9月快照：Chroma 需要服务器运行时，不支持像对象文件工具那样的直接 S3 对象存储（[issue #1736](https://github.com/chroma-core/chroma/issues/1736)）。

### 实现示例

语法差异揭示了真正的分野：构建时搜索、内存搜索、向量原生存储、多模态表和浏览器 SQL 并不是同一类产品，仅仅因为它们都出现在 AI 演示中。

#### 使用 Pagefind 进行静态站点搜索

```html

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>new PagefindUI({ element: "#search" });</script>
```

#### 使用 LanceDB 进行企业级多模态搜索

**创建带有自动 OpenAI 嵌入的 LanceDB 表的代码：**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
import { LanceSchema, getRegistry } from "@lancedb/lancedb/embedding";
import { Utf8 } from "apache-arrow";

const db = await lancedb.connect("data/multimodal-db");
const func = getRegistry()
  .get("openai")
  ?.create({ model: "text-embedding-ada-002" });

// Schema with automatic embedding generation
const documentsSchema = LanceSchema({
  text: func.sourceField(new Utf8()),
  vector: func.vectorField(),
  category: new Utf8()
});

const table = await db.createEmptyTable("documents", documentsSchema);
await table.add([
  { text: "machine learning concepts", category: "research" },
  { text: "deep learning fundamentals", category: "research" }
]);
```

**查询 LanceDB 表的示例：**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
// "Connect" to a URL path
const db = await lancedb.connect("data/multimodal-db");
const table = db.getTable("documents");

// SQL + vector search combination
const results = await table.search("machine learning concepts")
  .where("category = 'research'")
  .limit(10)
  .toArray();

console.log(results);
```


#### 使用 Orama 进行通用搜索
```typescript
import { create, insert, search } from '@orama/orama'

const db = create({
  schema: {
    title: 'string',
    content: 'string', 
    embedding: 'vector[1536]'
  }
})

await insert(db, { 
  title: 'Getting Started',
  content: 'Learn the basics',
  embedding: await generateEmbedding('Learn the basics')
})

const results = await search(db, { 
  term: 'basics',
  mode: 'hybrid' // Combines text + vector search
})
```

**DuckDB-WASM：**
```typescript
import * as duckdb from "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@latest/dist/duckdb-browser.mjs";
const bundle = await duckdb.selectBundle(duckdb.getJsDelivrBundles());
const worker = new Worker(bundle.mainWorker);
const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

const conn = await db.connect();
await conn.query(`create table t as select * from (values (1,'hybrid search'),(2,'edge sql')) as v(id,txt);`);
// Optional full-text:
await conn.query(`install fts; load fts; select * from t where match_bm25(txt, 'hybrid');`);
```

#### 使用 Chroma 进行 AI 原生搜索  
```typescript
import { ChromaClient } from "chromadb";

const client = new ChromaClient();
const collection = await client.createCollection({ name: "knowledge-base" });

await collection.add({
  documents: ["AI will transform software development"],
  metadatas: [{ source: "tech-blog", category: "AI" }],
  ids: ["doc1"]
});

const results = await collection.query({
  queryTexts: ["future of programming"],
  where: { category: "AI" },
  nResults: 5
});
```

## 用例指南

**选择 Pagefind 当：**
- 构建文档、博客或知识库
- 内容每周或更少更新
- 需要零运维开销和完美的 CDN 缓存
- *示例：拥有 10K+ 页面且每月更新的公司文档*

**选择 Orama 当：**
- 构建仪表盘、电商或动态应用
- 需要实时更新和亚 100ms 性能
- 希望从浏览器到边缘函数灵活部署
- *示例：拥有动态产品目录的 SaaS*

**选择 Chroma 当：**
- 构建 RAG 应用或 AI 知识库
- 需要 LangChain/LlamaIndex 集成
- 语义搜索是核心功能
- *示例：AI 客服机器人*

**选择 LanceDB 当：**
- 处理多模态数据（图像、音频、视频）
- 需要大规模企业级性能
- 需要复杂分析和重排序
- *示例：具有语义视频搜索的媒体平台*

**选择 DuckDB-WASM 当：**
- 需要在浏览器或边缘函数中实现完整 SQL 能力
- 处理分析工作负载和复杂查询
- 希望直接从 S3 处理 CSV/Parquet 文件
- *示例：支持临时 SQL 查询的商业智能仪表盘*

## 决策规则

实际的问题不是“哪个数据库最好？”

实际的问题是：系统需要承受什么样的变更？

- **可重建的内容：** Pagefind、Orama 快照、Lance 文件、基于 Parquet 的 DuckDB。保持静态直到它成为瓶颈。
- **频繁写入：** Postgres、Chroma 服务器、托管搜索服务或基于队列的索引管道。你需要协调，而不是感觉。
- **用户特定的结果：** 使用真正的后端。对象存储不是授权模型。
- **基于文件的分析：** DuckDB 极其有用。让 SQL 做 SQL 该做的事。
- **多模态或向量密集型搜索：** LanceDB 和 Chroma 值得用实际数据测试，而不是根据 README 基准测试。

快乐路径很便宜。边缘情况决定架构。

## 更广阔的图景

这些工具降低了实现有用搜索所需的最小基础设施。这很重要。2020 年，“语义搜索”往往意味着一堆服务、大量胶水代码，以及有人在会议上解释向量索引，而一半的人只想吃午饭。2025 年，一个小团队可以用文件、嵌入和一个周末来原型化同样的产品想法。

这并不意味着每个搜索框都应该变成 RAG 系统。这意味着第一个版本不再需要在有生产证据之前就继承生产基础设施。

即使是 AWS 也在朝这个方向推进，在 S3 附近做向量搜索工作，这是一个有用的信号：对象存储不再只是存放旧文件的阁楼。它正在成为一个查询面。

## 开始实验

1. **先选择更新模式**：构建时、每小时批处理、实时写入或按用户结果。
2. **用最小诚实的工具进行原型设计**：静态 HTML 用 Pagefind，分析文件用 DuckDB，轻量级应用搜索用 Orama，向量密集型工作用 LanceDB 或 Chroma。
3. **测量丑陋的部分**：索引时间、新鲜度、包体积、权限以及冷启动后的首次查询。
4. **只在真正痛苦时才升级**：在基于文件的版本明确显示出瓶颈之后，托管数据库才更容易被证明是合理的。

*查看我的[实用 Pagefind 指南][1]以获取动手实现，或探索不断增长的边缘原生数据库生态系统，它们正在重塑大规模数据处理。*

> **免责声明：** 我使用 Pagefind 多年，并于 2025 年成为贡献者。我在较小项目上尝试过 Orama 和 Chroma，并正在为更大的 AI 应用探索 LanceDB。与这些项目没有财务关系——只是对不断发展的数据库格局有浓厚兴趣。

[1]: https://danlevy.net/you-might-not-need-algolia/
````
