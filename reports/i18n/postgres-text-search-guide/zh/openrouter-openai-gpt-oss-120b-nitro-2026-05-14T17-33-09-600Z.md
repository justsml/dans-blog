# Translation Candidate
- Slug: postgres-text-search-guide
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-02--postgres-text-search-guide/zh/index.mdx
- Validation: deferred
- Runtime seconds: 19.82
- Input tokens: 10728
- Output tokens: 7542
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.001776
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Postgres 文本搜索指南 2026
subTitle: 数据库中已有的搜索工具，以及它们各自何时发挥作用。
date: '2026-05-02'
modified: '2026-05-03'
tags:
  - postgres
  - postgresql
  - full-text-search
  - trigrams
  - pg_trgm
  - databases
  - search
  - sql
  - pg_search
category: Code
subCategory: Databases
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
大多数团队只使用一种 Postgres 搜索工具。了解全部三种工具的团队能够以更少的复杂度交付更好的搜索——并且避免走上尚未真正需要的专用搜索服务这条昂贵的弯路。

本指南覆盖了全部 Postgres 原生选项：每种工具的功能、适用场景以及如何层叠使用。

---

## 三种工具

**全文搜索**（`tsvector` / `GIN` 索引）是词法层面的。它把文本切分为词元，进行词干提取，并在索引上匹配查询。“Running” 与 “runs” 会归为同一词元，“dog” 与 “dogs” 亦然。排序函数（`ts_rank`）会提升那些查询词出现频繁或位置突出的文档。

**三元组**（`pg_trgm`）把字符串拆分为重叠的 3 字符切片，并衡量两个字符串共享多少切片。“Dan” → `" da"`、`"dan"`、`"an "`。“Micheal” 与 “Michael” 共享大多数三元组，因此相似度很高。这使得 `pg_trgm` 在模糊人名匹配、容错拼写和自动补全方面表现出色——正是全文搜索薄弱的地方。

**精确匹配索引**（B‑tree、hash）处理主键、电子邮件、ID、SKU 等二元答案：要么匹配，要么不匹配。这类索引看起来不像“搜索”，但它们必须被纳入讨论，因为最糟糕的模式是把模糊或语义搜索用于本应有唯一正确答案的问题。

选择的关键不在于技术的高级程度，而在于让工具匹配查询的形状。

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" role="img" aria-labelledby="stm-title stm-desc">
  <title id="stm-title">Postgres 搜索工具地图</title>
  <desc id="stm-desc">按输入形状和查询意图比较 pg_trgm、全文搜索、pgvector 与混合搜索。</desc>
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#111827" flood-opacity="0.14"/>
    </filter>
    <linearGradient id="header" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#25324a"/>
    </linearGradient>
    <style>{`
      .stm-bg { fill: #f7f3ea; }
      .stm-card { fill: #fffdf8; stroke: #d9cdb6; stroke-width: 2; filter: url(#shadow); }
      .stm-title-text { font: 800 34px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; }
      .stm-subtitle { font: 500 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #4b5563; }
      .stm-label { font: 800 14px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing: .08em; text-transform: uppercase; fill: #ffffff; }
      .stm-tool { font: 800 27px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; }
      .stm-body { font: 500 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #374151; }
      .stm-small { font: 600 15px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #4b5563; }
      .stm-axis { font: 800 15px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; letter-spacing: .06em; text-transform: uppercase; }
      .stm-chip { font: 800 14px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #ffffff; }
      .stm-line { stroke: #9ca3af; stroke-width: 2; stroke-dasharray: 8 8; }
    `}</style>
  </defs>

  <rect class="stm-bg" width="1120" height="720" rx="0"/>
  <text class="stm-title-text" x="64" y="70">按输入形状挑选搜索原语</text>
  <text class="stm-subtitle" x="64" y="103">同一张 Postgres 表可以同时支撑全部四种。关键是把查询匹配到合适的文本。</text>

  <line class="stm-line" x1="560" y1="150" x2="560" y2="640"/>
  <line class="stm-line" x1="76" y1="395" x2="1044" y2="395"/>

  <text class="stm-axis" x="360" y="142">精确词汇重要</text>
  <text class="stm-axis" x="650" y="142">意义重要</text>
  <text class="stm-axis" x="78" y="388" transform="rotate(-90 78 388)">短/结构化文本</text>
  <text class="stm-axis" x="78" y="628" transform="rotate(-90 78 628)">长篇/块状文本</text>

  <rect class="stm-card" x="112" y="168" width="408" height="186" rx="20"/>
  <rect x="136" y="192" width="100" height="28" rx="14" fill="#f59e0b"/>
  <text class="stm-label" x="154" y="212">模糊</text>
  <text class="stm-tool" x="136" y="256">pg_trgm</text>
  <text class="stm-body" x="136" y="294">姓名、地址、标题、错别字、</text>
  <text class="stm-body" x="136" y="320">自动补全、部分字符串。</text>
  <text class="stm-small" x="136" y="344">正字相似度：拼写距离。</text>

  <rect class="stm-card" x="600" y="168" width="408" height="186" rx="20"/>
  <rect x="624" y="192" width="116" height="28" rx="14" fill="#22c55e"/>
  <text class="stm-label" x="644" y="212">相似</text>
  <text class="stm-tool" x="624" y="256">pgvector</text>
  <text class="stm-body" x="624" y="294">相关条目、重复工单、</text>
  <text class="stm-body" x="624" y="320">基于短描述的推荐。</text>
  <text class="stm-small" x="624" y="344">向量相似度：语义距离。</text>

  <rect class="stm-card" x="112" y="436" width="408" height="186" rx="20"/>
  <rect x="136" y="460" width="102" height="28" rx="14" fill="#38bdf8"/>
  <text class="stm-label" x="158" y="480">词法</text>
  <text class="stm-tool" x="136" y="524">全文搜索</text>
  <text class="stm-body" x="136" y="562">文章、文档、日志、支持内容</text>
  <text class="stm-body" x="136" y="588">其中查询词应出现。</text>
  <text class="stm-small" x="136" y="612">词元、词干、排序、布尔过滤。</text>

  <rect class="stm-card" x="600" y="436" width="408" height="186" rx="20"/>
  <rect x="624" y="460" width="102" height="28" rx="14" fill="#f472b6"/>
  <text class="stm-label" x="645" y="480">混合</text>
  <text class="stm-tool" x="624" y="524">FTS + pgvector</text>
  <text class="stm-body" x="624" y="562">技术文档和 RAG 场景，用户提问</text>
  <text class="stm-body" x="624" y="588">概念性问题并附带精确符号。</text>
  <text class="stm-small" x="624" y="612">同时运行，使用 RRF 融合排序。</text>

  <rect x="396" y="658" width="328" height="36" rx="18" fill="url(#header)"/>
  <text class="stm-chip" x="429" y="681">先从查询意图出发，再检查文本形状</text>
</svg>
<figcaption>四种 Postgres 搜索原语按查询意图（精确 vs. 语义）和文本形状（结构化 vs. 散文）映射。同一张表可以携带全部四种索引——选择依据是每个查询，而不是每张表。</figcaption>
</figure>

---

## 全文搜索何时占优

**在长篇文本中搜索关键词。** 博客、文档、产品描述、支持工单、法律文档。全文搜索正是为这种内容形态设计的：对自然语言文本进行索引、排序检索。

**基于关键词的用户查询。** 用户输入搜索词、按标签过滤或按关键词浏览。全文搜索能够原生处理此类意图，无需任何向量基础设施。

**无需外部依赖的排序结果。** 全文搜索索引快速、确定性强，且不需要 API 调用。相关性信号来源于词频并加权字段位置。

**布尔过滤与搜索并行。** 全文搜索可以自然地与现有查询逻辑组合：

```sql
SELECT * FROM posts
WHERE search_vector @@ to_tsquery('english', 'postgres & performance')
  AND category = 'tutorial'
  AND published_at > NOW() - INTERVAL '6 months';
```

### 部署全文搜索

```sql
-- 生成列会自动保持索引最新
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body,  '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- 查询
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

`setweight` 用来分配重要性：`A`（标题）优于 `B`（正文）。这几乎就是大多数内容搜索用例的全部相关性模型。

### 全文搜索的局限性

- 查询中的拼写错误 — “javascipt” 无法匹配 “javascript”
- 人名、地址、专有名词的词干化不确定
- 前缀/自动补全在未做特殊配置时无法工作
- 用户描述概念而非直接命名的查询

---

## 当 Trigram 起效时 (`pg_trgm`)

`pg_trgm` 填补了全文搜索（FTS）始终处理不好的尴尬中间层。

FTS 会把文本切分为词元并进行词干化。对自然语言段落来说这很合适，但对人名和短标识符往往不适用：

- 人名（“Dan Levy” → 根据词典和语言配置的不同会得到不同的词干）
- 公司名、地址、产品标题等对拼写要求严格的场景
- 含有拼写错误的查询 — “Micheal Jordan”、 “Amaon”、 “javascipt”
- 自动补全 / 前缀搜索
- 部分字符串匹配（“son” 匹配 “Johnson”、 “Anderson”）

`pg_trgm` 与语言无关，这对来自多语言背景的姓名尤为重要。FTS 则需要为每种语言单独配置词典。

### 模糊人名搜索

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- 在搜索 “Michael Jordan” 时找到 “Micheal Jordan”
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % 运算符 = 相似度阈值（默认 0.3）
ORDER BY score DESC
LIMIT 10;
```

`%` 运算符使用 `pg_trgm.similarity_threshold`（默认 0.3，取值范围 0–1）。在人名搜索中，0.3–0.4 能捕获拼写错误，同时将噪声控制在较低水平。

### 自动补全、前缀与包含搜索

```sql
-- 自动补全的前缀匹配。Trigram GIN 索引可以提供帮助，
-- 但对纯左侧锚定的前缀，B‑tree 模式索引可能更合适。
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- word_similarity 用于在更长字符串中进行部分匹配
-- （在 “Andrew Johnson III” 中匹配 “Johnson”）
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name
ORDER BY score DESC
LIMIT 10;
```

Trigram GIN 索引对 `ILIKE '%pattern%'` 的包含查询以及容错匹配尤为有用——这些查询在没有 Trigram 索引时通常会导致全表扫描。

### 何时优先选择 pg_trgm 而非 FTS

| 场景 | 选用 |
|---|---|
| 人名/公司名搜索且存在拼写错误 | `pg_trgm` |
| 自动补全 / 前缀搜索 | `pg_trgm`（或使用带前缀查询的 FTS） |
| 短字符串、标识符、代码 | `pg_trgm` |
| 文章、文档、工单等正文 | FTS |
| 日志信息的关键字检索 | FTS |
| 多语言人名搜索 | `pg_trgm`（语言无关） |

---

## 当精确匹配 SQL 更合适时

有些“搜索”问题根本不是搜索。

“查找邮箱为 `dan@example.com` 的用户”是等值判断；“查找订单 `ORD-12345`”是主键查找；“列出 `tutorial` 分类下按日期排序的帖子”是普通过滤查询。这类场景应使用 B‑tree 或 hash 索引。

在这里使用 FTS 或 Trigram 只会增加复杂度，却无法提升正确性——而且对精确标识符来说，模糊匹配甚至会比完全不匹配更糟。

```sql
CREATE INDEX users_email_idx ON users (email);

-- 精确查找：快速且唯一
SELECT id, name FROM users WHERE email = $1;
```

更广的教训：对本应有唯一正确答案的问题使用近似搜索是概念错误。它会返回*某些东西*——可能是自信却错误的结果。

---

## 组合这些工具

这些工具可以干净地组合使用。你不必只选一种。

**FTS + pg_trgm 用于容忍关键字拼写错误的搜索框：**

```sql
-- 标题的 Trigram 相似度捕获拼写错误；ts_rank 处理正文相关性
SELECT id, title,
  ts_rank(search_vector, to_tsquery('simple', $1)) AS fts_rank,
  similarity(title, $1) AS trgm_score
FROM posts
WHERE search_vector @@ to_tsquery('simple', $1)
   OR title % $1
ORDER BY (ts_rank(search_vector, to_tsquery('simple', $1)) + similarity(title, $1)) DESC
LIMIT 10;
```

**FTS + `unaccent` 处理国际化内容：**

```sql
-- 去除变音符号，使 “José” 能匹配 “Jose”
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TEXT SEARCH CONFIGURATION public.simple_unaccent (COPY = pg_catalog.simple);

ALTER TEXT SEARCH CONFIGURATION public.simple_unaccent
  ALTER MAPPING FOR hword, hword_part, word
  WITH unaccent, simple;

ALTER TABLE posts ADD COLUMN search_vector tsvector;

CREATE TRIGGER posts_search_vector_refresh
BEFORE INSERT OR UPDATE OF title, body ON posts
FOR EACH ROW EXECUTE FUNCTION
  tsvector_update_trigger(search_vector, 'public.simple_unaccent', title, body);
```

**`unaccent` + `pg_trgm` 用于国际化姓名搜索：**

```sql
ALTER TABLE users ADD COLUMN name_search text;

CREATE FUNCTION users_name_search_refresh()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.name_search := unaccent(coalesce(NEW.name, ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER users_name_search_refresh
BEFORE INSERT OR UPDATE OF name ON users
FOR EACH ROW EXECUTE FUNCTION users_name_search_refresh();

CREATE INDEX users_name_search_trgm_idx
  ON users USING GIN (name_search gin_trgm_ops);

SELECT id, name
FROM users
WHERE name_search % unaccent($1)
ORDER BY similarity(name_search, unaccent($1)) DESC
LIMIT 10;
```

触发器示例避免在生成列或索引表达式中直接使用 `unaccent()`，因为 PostgreSQL 的不可变性规则会受影响。如果你将 `unaccent()` 包装在自定义的不可变函数中，请在文档中说明你接受了升级/配置风险。

---

## 值得关注的扩展

**`pg_trgm`** 随大多数 Postgres 发行版一起提供，但需要显式启用。是 Postgres 中模糊字符串匹配的基石。

**`unaccent`** 在索引和查询前去除变音符号。与 `pg_trgm` 和 FTS 配合使用时，对欧洲语言内容效果显著。随 Postgres 捆绑。

**`pg_bigm`** 将 Trigram 思路扩展到 bigram（2 字符切片），在中文、日文、韩文等 CJK 语言上显著提升效果，因为 `pg_trgm` 在这些语言上表现不佳。需单独安装，未随发行版捆绑。

**`pg_search`**（来自 [ParadeDB](https://www.paradedb.com/)）用基于 Tantivy 的 BM25 索引取代标准的 `GIN`/`tsvector` 组合。它提供 BM25 评分（通常优于 `ts_rank`）、FTS 查询内的模糊匹配、分面搜索，以及在大表上显著更快的索引速度。当标准 FTS 出现排序或性能瓶颈时，这是直接的升级路径。

```sql
-- pg_search：带模糊匹配的 BM25 全文搜索
CREATE INDEX posts_bm25_idx ON posts
  USING bm25 (id, title, body)
  WITH (key_field = 'id', text_fields = '{"title": {}, "body": {}}');

-- 使用 BM25 评分 + 模糊匹配（捕获 “javascipt”）
SELECT id, title, paradedb.score(id) AS rank
FROM posts
WHERE posts @@@ paradedb.fuzzy_phrase(field => 'title', value => 'postgres performnce')
ORDER BY rank DESC
LIMIT 10;
```

**`pgvector`** 添加密集向量存储和相似度搜索。当用户用描述而非名称来表达需求时——语义搜索、RAG、相关内容推荐、多语言查询——它是合适的工具。详见 [Semantic Vector Search and Hybrid Strategies](../semantic-vector-search-landscape)。

---

## 决策表

| 你要搜索的内容 | 推荐方案 |
|---|---|
| 文章、文档、工单等正文 | FTS |
| 带拼写错误的个人/公司名称 | `pg_trgm` |
| 自动补全、前缀搜索 | `pg_trgm` |
| 短代码、标识符 | `pg_trgm` |
| 日志信息的关键字检索 | FTS |
| 国际化姓名 | `pg_trgm` + `unaccent` |
| 大规模内容、需要更好排序 | `pg_search`（ParadeDB BM25） |
| 主键、精确邮箱、ID | B-tree 索引 |
| 日期、范围、排序列表 | B-tree 索引 |
| 权限、分类、过滤条件 | 常规 WHERE 子句 |
| 问题、同义句、概念 | pgvector（见下一篇） |

当不确定时：拼写有变体的短字符串 → 使用 trigram。长篇正文的关键词查询 → 使用 FTS。结构化标识符 → 使用普通索引。概念性或自然语言查询 → 使用 pgvector。

---

## 混合搜索：两种信号，一个排序

当查询 `"withRetry timeout errors"` 输入搜索框时，蕴含两类意图：用户已知的精确符号名称 (`withRetry`) 和概念性的描述 (`timeout errors`)。单一原语无法同时覆盖两者。将 FTS 与向量搜索并行运行——随后使用 Reciprocal Rank Fusion（RRF）合并它们的排序列表——即可实现。

RRF 在每个列表中对每条结果计分 `1 / (60 + rank)`，并在所有列表上求和。常数 60 抑制了最高排名的优势，因此在两个列表中均排名第二的结果可以击败在某一列表中第一却在另一列表中完全缺失的结果。关键是，RRF 从不对不同方法的原始分数做平均——FTS 排名和余弦距离是不同的计量单位，不能直接相加。

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 660" role="img" aria-labelledby="rrf-title rrf-desc">
  <title id="rrf-title">使用 Reciprocal Rank Fusion 的混合搜索</title>
  <desc id="rrf-desc">查询同时发往全文搜索和向量搜索，各自生成排名列表，RRF 将它们合并为单一结果列表。</desc>
  <defs>
    <marker id="rrf-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
      <path d="M2,2 L10,6 L2,10 Z" fill="#334155"/>
    </marker>
    <filter id="rrf-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="11" flood-color="#0f172a" flood-opacity="0.13"/>
    </filter>
    <style>{`
      .rrf-bg { fill: #f8fafc; }
      .rrf-title-text { font: 800 34px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #0f172a; }
      .rrf-subtitle { font: 500 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #475569; }
      .rrf-box { fill: #ffffff; stroke: #cbd5e1; stroke-width: 2; filter: url(#rrf-shadow); }
      .rrf-query { fill: #fff7ed; stroke: #fdba74; }
      .rrf-fts { fill: #eff6ff; stroke: #60a5fa; }
      .rrf-vector { fill: #f0fdf4; stroke: #86efac; }
      .rrf-merge { fill: #fdf2f8; stroke: #f9a8d4; }
      .rrf-result { fill: #ecfeff; stroke: #67e8f9; }
      .rrf-head { font: 800 24px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; }
      .rrf-body { font: 550 17px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #334155; }
      .rrf-mono { font: 800 17px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; fill: #0f172a; }
      .rrf-rank { font: 800 16px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #475569; }
      .rrf-arrow-line { stroke: #334155; stroke-width: 3; fill: none; marker-end: url(#rrf-arrow); }
      .rrf-thin { stroke: #94a3b8; stroke-width: 2; fill: none; marker-end: url(#rrf-arrow); }
    `}</style>
  </defs>

  <rect class="rrf-bg" width="1120" height="660"/>
  <text class="rrf-title-text" x="64" y="68">混合搜索是两条诚实信号，随后合并为一个排序</text>
  <text class="rrf-subtitle" x="64" y="102">不要对原始分数做平均。FTS 排名和余弦距离是不同的计量单位。</text>

  <rect class="rrf-box rrf-query" x="72" y="238" width="214" height="132" rx="20"/>
  <text class="rrf-head" x="104" y="288">用户查询</text>
  <text class="rrf-mono" x="104" y="324">"withRetry</text>
  <text class="rrf-mono" x="104" y="350">timeout errors"</text>

  <path class="rrf-arrow-line" d="M286 270 C350 270 350 188 418 188"/>
  <path class="rrf-arrow-line" d="M286 338 C350 338 350 440 418 440"/>

  <rect class="rrf-box rrf-fts" x="418" y="142" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="188">FTS / BM25</text>
  <text class="rrf-body" x="450" y="224">精确符号和词汇</text>
  <text class="rrf-rank" x="450" y="256">1. API 参考</text>
  <text class="rrf-rank" x="578" y="256">2. 重试指南</text>

  <rect class="rrf-box rrf-vector" x="418" y="394" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="440">pgvector</text>
  <text class="rrf-body" x="450" y="476">概念相邻项</text>
  <text class="rrf-rank" x="450" y="508">1. 网络故障</text>
  <text class="rrf-rank" x="594" y="508">2. 重试指南</text>

  <path class="rrf-thin" d="M684 214 C734 214 734 294 778 294"/>
  <path class="rrf-thin" d="M684 466 C734 466 734 366 778 366"/>

  <rect class="rrf-box rrf-merge" x="778" y="260" width="258" height="166" rx="22"/>
  <text class="rrf-head" x="810" y="306">RRF 合并</text>
  <text class="rrf-body" x="810" y="342">为每个结果在各列表中的排名赋予分值</text>
  <text class="rrf-body" x="810" y="368">并累计。</text>
  <text class="rrf-mono" x="810" y="402">1 / (60 + rank)</text>

  <path class="rrf-arrow-line" d="M907 426 L907 492"/>

  <rect class="rrf-box rrf-result" x="736" y="492" width="342" height="110" rx="20"/>
  <text class="rrf-head" x="768" y="538">最终结果</text>
  <text class="rrf-body" x="768" y="574">最高命中是精确词汇</text>
  <text class="rrf-body" x="768" y="598">与语义含义相吻合的文档。</text>
</svg>
<figcaption>查询同时发往 FTS 与 pgvector，各自生成排序列表。RRF 根据每个文档在各列表中的位置打分并求和——最终呈现两种信号都认可的文档。</figcaption>
</figure>

```sql
-- Hybrid search: FTS + pgvector merged with RRF
WITH fts AS (
  SELECT id, ts_rank(search_vector, query) AS score,
         ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM docs, to_tsquery('english', 'withRetry & timeout') query
  WHERE search_vector @@ query
  LIMIT 60
),
vec AS (
  SELECT id,
         ROW_NUMBER() OVER (ORDER BY embedding <=> $embedding) AS rank
  FROM docs
  ORDER BY embedding <=> $embedding
  LIMIT 60
)
SELECT COALESCE(fts.id, vec.id) AS id,
       (COALESCE(1.0 / (60 + fts.rank), 0) +
        COALESCE(1.0 / (60 + vec.rank), 0)) AS rrf_score
FROM fts FULL JOIN vec ON fts.id = vec.id
ORDER BY rrf_score DESC
LIMIT 10;
```

每个分支的 60 条候选文档（`LIMIT 60`）是常用的起点。召回率低时可扩大；对速度有要求时可收窄。

---

## 接下来

Postgres 文本搜索已经覆盖了大量场景，但仍有上限。当用户用描述而非名称来表达需求——“帮我在航班上入睡的东西”，“关于新工程师调试信心的文章”——词法和 trigram 搜索都会失效。

这正是向量嵌入、语义搜索以及混合架构的用武之地。相关内容已在 [语义向量搜索与混合策略](/../semantic-vector-search-landscape) 中展开。
````
