# Translation Candidate
- Slug: serverless-database-magic
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-09-15--serverless-database-magic/zh/index.mdx
- Validation: deferred
- Runtime seconds: 11.30
- Input tokens: 4442
- Output tokens: 5463
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001666
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 2025年数据库创新浪潮
subTitle: 感谢AI
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
## 又一篇关于向量数据库的文章

这是我希望自己更早使用的决策规则：

<p class="inset">如果数据可以从文件重建且用户主要进行读取操作，请首先尝试对象存储数据库。如果用户全天都在写入数据，请从真正的数据库开始，停止试图让S3伪装成数据库。</p>

这才是有用的结论。不是“无服务器是未来”。不是“向量数据库改变了所有”。这些句子已经被印在了太多会议胸牌上。

AI确实改变了大量搜索问题的形态。突然之间，小团队想要语义搜索、混合排序、文档聊天、多模态查找以及针对对象存储中文件的分析。旧答案是“运行带pgvector的Postgres”或“操作OpenSearch/Elasticsearch”或“购买托管搜索服务”。当工作负载值得时，这些仍然是好答案。

但许多工作负载并不需要。它们是读取密集型的、可重建的，并能容忍内容更改与搜索更新之间的短延迟。文档、目录快照、静态导出、内部知识库、本地分析、原型RAG系统。对于这些场景，一类新工具让原本枯燥的架构异常强大：构建索引，将其存储为文件，通过HTTP提供服务。

快照说明：生态系统发展迅速。下方的星标数、功能标签和性能数据是2025年9月的快照，而非永恒的排行榜。请将其视为参考，部署生产迁移前请查阅最新文档。

## 名为数据库的数据库

这些无服务器和CDN兼容的数据存储适用于中等规模场景，大约1,000到1,000,000条记录或几GB数据，传统数据库基础设施在此场景下可能比价值更像仪式：

- **Pagefind**（2022，约4.5K ⭐）：纯静态方案——一次编译，永久搜索，零后端需求  
- **Orama**（2023，约8K ⭐）：通用解决方案，可运行于从浏览器到无服务器函数的任何环境  
- **Chroma**（2022，约14K ⭐）：AI原生，专为RAG应用设计  
- **LanceDB**（2023，约4K ⭐）：基于磁盘架构的企业级多模态能力  
- **DuckDB-WASM**（2019，约23K ⭐）：通过WebAssembly在浏览器中运行的完整SQL分析数据库  

常见策略很简单：将持久化数据存储在文件或对象存储中，然后从浏览器、边缘函数、工作线程或轻量级服务中查询。这并未消除复杂性，而是将复杂性转移到构建流水线、索引新鲜度、缓存失效和客户端能力中。当读取占主导时，这是一笔完全合理的交易。

### 复选框之战

| 功能 | [Pagefind](https://pagefind.app) | [Orama](https://orama.com) | [Chroma](https://www.trychroma.com/) | [LanceDB](https://lancedb.com) | [DuckDB-WASM](https://duckdb.org/docs/api/wasm) |
|------|----------|--------|---------|----------|----------|
| **全文搜索** | ✅ 高级词干提取 | ✅ BM25，30种语言 | ✅ SQLite FTS | ✅ Tantivy | ✅ 完整SQL |
| **向量搜索** | ❌ | ✅ 余弦相似度 | ✅ HNSW | ✅ IVF_PQ, HNSW, GPU | ⚠️ 扩展 |
| **AI/RAG集成** | 无 | ✅ 内置流水线 | ✅ LangChain, LlamaIndex | ✅ 高级重排序 | ⚠️ 手动设置 |
| **存储** | 静态JSON/WASM | 内存 + S3插件 | 基于服务器* | S3兼容Lance | WASM + S3/HTTP |
| **写入支持** | 仅构建时 | 完整CRUD | 完整CRUD | 完整CRUD | 完整SQL CRUD |
| **性能** | 低于100ms | 0.0001ms - 100ms | 低于100ms | 向量3-5ms，FTS 50ms | 10ms-1s（复杂SQL） |

*2025年9月快照：Chroma需要服务器运行时，且不支持对象文件工具那种直接的S3对象存储方式（[问题#1736](https://github.com/chroma-core/chroma/issues/1736)）。

### 实现示例

语法差异揭示了真正的分野：构建时搜索、内存搜索、向量原生存储、多模态表和浏览器SQL并非同一产品类别，尽管它们都出现在AI演示中。

#### 使用Pagefind的静态站点搜索

```html
```

<link href="../pagefind/pagefind-ui.css" rel="stylesheet">
<script src="../pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>new PagefindUI({ element: "#search" });</script>

#### 基于LanceDB的企业级多模态应用

**创建带自动OpenAI嵌入的LanceDB表的代码：**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
import { LanceSchema, getRegistry } from "@lancedb/lancedb/embedding";
import { Utf8 } from "apache-arrow";

const db = await lancedb.connect("data/multimodal-db");
const func = getRegistry()
  .get("openai")
  ?.create({ model: "text-embedding-ada-002" });

// 自动嵌入生成的Schema
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

**查询LanceDB表的示例：**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
// "连接"到URL路径
const db = await lancedb.connect("data/multimodal-db");
const table = db.getTable("documents");

// SQL + 向量搜索组合
const results = await table.search("machine learning concepts")
  .where("category = 'research'")
  .limit(10)
  .toArray();

console.log(results);
```


#### 基于Orama的通用搜索
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
  mode: 'hybrid' // 组合文本+向量搜索
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
// 可选的全文检索：
await conn.query(`install fts; load fts; select * from t where match_bm25(txt, 'hybrid');`);
```

#### 基于Chroma的AI原生搜索  
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

**选择Pagefind的场景：**
- 构建文档、博客或知识库
- 内容每周或更少更新
- 需要零运维开销和完美的CDN缓存
- *示例：每月更新10K+页面的公司文档*

**选择Orama的场景：**
- 构建仪表盘、电商或动态应用
- 需要实时更新和亚100ms性能
- 部署灵活性从浏览器到边缘函数
- *示例：动态产品目录的SaaS*

**选择Chroma的场景：**
- 构建RAG应用或AI知识库
- 需要LangChain/LlamaIndex集成
- 语义搜索是核心功能
- *示例：AI客服机器人*

**选择LanceDB的场景：**
- 处理多模态数据（图像、音频、视频）
- 需要大规模企业级性能
- 复杂分析和重排序需求
- *示例：带语义视频搜索的媒体平台*

**选择DuckDB-WASM的场景：**
- 需要在浏览器或边缘函数中使用完整SQL
- 处理分析型工作负载和复杂查询
- 直接从S3处理CSV/Parquet文件
- *示例：带即席SQL查询的商业智能仪表盘*

## 决策规则

实际的问题不是"哪个数据库最好？"

实际的问题是：系统需要吸收什么类型的变化？

- **可重建内容：** Pagefind、Orama快照、Lance文件、DuckDB over Parquet。保持静态直到产生痛苦。
- **频繁写入：** Postgres、Chroma服务、托管搜索服务或队列驱动的索引流水线。你需要协调，而不是氛围。
- **用户特定结果：** 使用真实后端。对象存储不是授权模型。
- **文件分析：** DuckDB异常有用。让SQL做SQL该做的事。
- **多模态或向量密集型搜索：** LanceDB和Chroma值得用实际数据测试，而非README基准。

廉价路径是简单的。边缘情况决定架构。

## 更宏观的视角

这些工具降低了有用搜索的最小可行基础设施。这很重要。2020年，"语义搜索"通常意味着一堆服务、大量胶水代码，以及在午餐时间会议中向半数人解释向量索引的人。2025年，小团队可以在周末用文件、嵌入和原型化相同的产品想法。

这并不意味着每个搜索框都应变成RAG系统。这意味着第一个版本不再需要继承生产基础设施，直到有生产证据。

就连AWS也在向这个方向发展，其S3邻近的向量搜索工作是一个有用的信号：对象存储不再是旧文件的阁楼。它正在成为查询表面。

## 开始实验

1. **首先确定更新模式**：构建时、小时级批量、实时写入或按用户结果。
2. **用最小诚实工具原型化**：静态HTML用Pagefind，分析文件用DuckDB，轻量应用搜索用Orama，向量密集型工作用LanceDB或Chroma。
3. **测量丑陋的部分**：索引时间、新鲜度、包大小、权限和冷启动后的首次查询。
4. **仅在痛苦真实时升级**：当文件版本展示出具体弯曲点后，托管数据库更容易证明其合理性。

*查看我的[实践Pagefind指南][1]获取动手实现，或探索重塑大规模数据的边缘原生数据库生态系统。*

> **免责声明：** 我已使用Pagefind多年，并于2025年成为贡献者。我曾用Orama和Chroma进行过小项目实验，并正在用LanceDB探索更大规模的AI应用。与这些项目无财务关联，只是对不断演进的数据库格局保持浓厚兴趣。

[1]: https://danlevy.net/you-might-not-need-algolia/
````
