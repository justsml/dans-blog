# Translation Candidate
- Slug: lancedb-wasm-browser-client
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-04-16--lancedb-wasm-browser-client/zh/index.mdx
- Validation: deferred
- Runtime seconds: 26.19
- Input tokens: 4830
- Output tokens: 3892
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001713
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 无服务器向量搜索
subTitle: 使用 Rust、WASM 和 TypeScript 构建向量搜索浏览器客户端
date: '2026-04-16'
modified: '2026-04-16'
tags:
  - rust
  - wasm
  - lancedb
  - vector-search
  - open-source
  - webassembly
  - typescript
  - ai
category: AI
subCategory: Open Source
draft: false
hidden: true
publish: false
popularity: 0.75
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
## 问题：无法从浏览器搜索 Lance 表

LanceDB 是一款出色的向量数据库。它比传统数据库简单得多，成本也低得多。你可以发布包含向量列、全文搜索（FTS）列的表，将文件托管在 S3 或 CDN 上，并直接从 Node.js 服务器通过 S3 查询数据。无需守护进程。

在这个 PR 之前，你*无法*直接从浏览器打开该表并运行搜索。你需要一个中间服务器：Lambda、容器，或者任何能运行 Rust、Node.js/WASM 或 Python 的东西。

目标雄心勃勃，但聚焦于一个有意义的最终结果：**可直接搜索、只读、HTTP 托管的向量索引。**

---

## 架构

实现分为三层：

### 1. Rust 发布产物（`web_publish.rs`）

在浏览器可以搜索 Lance 表之前，它需要知道哪些内容是安全的。Lance 的内部格式有一些无法移植到浏览器的特性——增量文件、外部基表、WASM 运行时无法执行的索引类型。与其让浏览器在搜索时才发现这些问题（糟糕的做法），发布步骤会生成明确的伴生文件：

- `_web.json` — 声明模式以及哪些列是浏览器可搜索的（支持的距离类型的向量列、FTS 列）
- `_snapshot.json` — 数据集的时间点快照，浏览器客户端无需理解完整的数据集演化协议即可使用
- `_latest.manifest` / `_latest.version` — 浏览器轮询以检测过时的稳定指针

快照中的 `isComplete` 标志是安全阀。如果数据集依赖于浏览器路径无法安全读取的外部基表或数据文件，则 `isComplete=false`，浏览器会提前拒绝并给出明确的错误，而不是产生微妙的错误结果。

这是我最庆幸用 Rust 而非 JavaScript 实现的部分。关于哪些内容对浏览器安全的判断，存在于表元数据实际所在的位置。

### 2. `lancedb-wasm` Rust crate

这是 WebAssembly 运行时：一个基于 `fetch` 的对象存储、一个浏览器端搜索引擎，以及一个用于过滤谓词的表达式求值器。

基于 fetch 的对象存储（`fetch_object_store.rs`）通过 HTTP 范围请求实现了 Lance 的 `ObjectStore` trait。Lance 的内部读取已经结构化为范围字节获取，这可以干净地映射到 `Range: bytes=N-M` 头部。这是项目中最令人满意的部分——现有架构几乎完美地为此设计，我只需要将其连接起来。

浏览器引擎（`browser.rs`）处理搜索：向量最近邻、全文搜索以及混合搜索（向量 + FTS 与 RRF 融合）。过滤表达式（`browser_expr.rs`）在客户端用纯 Rust 评估 Lance 过滤谓词，编译为 WASM。

功能拒绝是严格且有意的。`hamming` 距离？提前拒绝并给出明确信息——不是静默错误，也不是运行时恐慌。在不完整的快照上执行 `fastSearch`？拒绝。不支持的基路径布局？拒绝。目标是失败关闭：如果浏览器路径无法履行契约，它会明确告知。

### 3. `@lancedb/lancedb-web` TypeScript 包

### 3. `@lancedb/lancedb-web` TypeScript 包

公开 API 表面刻意保持小巧：

```typescript
import { searchTable } from "@lancedb/lancedb-web";

const results = await searchTable("https://my-cdn.example.com/my-table", "semantic search query", {
  select: ["title", "url", "score"],
  limit: 10,
});
```

在底层，`searchTable()` 优先采用基于 Worker 的执行路径，这样搜索不会阻塞主线程。WASM 模块在 Worker 中运行；结果通过类型化协议（`worker_protocol.ts`）传回。此外还有一个可选的 `./transformers` 导出，它封装了 `@xenova/transformers`，用于在客户端生成查询嵌入——这样你就可以从原始文本查询直接得到向量搜索结果，全程无需离开浏览器。

---

## 棘手之处

### 通过 HTTP 的范围读取并非免费

Lance 的读取模式假设对象存储能高效处理大量小范围读取。S3 和 GCS 为此而设计。浏览器……大部分也能做到，但使用 `Range` 头部的 `fetch` 有一些古怪之处，是现有 Rust 对象存储抽象层无需关心的。

主要问题是浏览器有时会激进地缓冲或重新请求，而且你无法像在原生进程中那样控制 TCP 连接池。对于大型向量索引，这很重要。当前实现是正确的；但对于大型表的生产环境使用是否足够快，这将在审查过程中见分晓。

### 侧车文件生成问题

PR 明确将此作为问题提给维护者，因为存在一个真实的设计权衡：浏览器侧车文件（`_web.json`、`_snapshot.json`）应该在每次表提交时*自动*生成，还是应该有一个显式的 `publish()` 调用？

自动生成更符合人体工程学——你免费获得浏览器支持。但这意味着每次本地写入都有一些额外开销，并且将浏览器契约与核心提交路径耦合在一起，可能使未来对任一方的修改复杂化。

显式发布从契约角度来看更正确——你在说“这个版本已为浏览器就绪”——但很容易忘记，导致本应可浏览器搜索的表静默地不可搜索。

我倾向于自动生成，侧车失败时记录警告而不是使提交失败。但我确实不确定，并在 PR 中标记了这一点。

### 什么算作“浏览器安全”？

`isComplete` 标志和 `web_publish.rs` 中的列过滤逻辑编码了对浏览器能处理什么的判断。这个判断必须与 WASM 运行时的实际能力保持同步。如果有人向 Lance 添加了浏览器无法执行的新索引类型，发布代码需要知道排除它——否则你会宣传一个浏览器在搜索时无法兑现的能力。

正确的修复方法可能是一个在发布路径和运行时之间共享的能力注册表，这样它们就不会漂移。我目前将其实现为并行常量，这虽然权宜但脆弱。这大概是我接下来想改进的地方。

---

## Transformers 封装困境

`./transformers` 导出是一个生活质量特性：它接受文本查询，通过 `@xenova/transformers` 在本地嵌入模型上运行，然后将得到的向量交给 LanceDB 搜索引擎。从静态 HTML 页面实现零服务器语义搜索。

它也是我最不确定是否应该包含在这个 PR 中的东西。它确实有用，而且已经实现了，但它是一个依赖项和一个 API 表面，与核心的浏览器搜索问题无关。维护者完全有理由先合并基础的 `searchTable()` API，然后单独迭代嵌入功能。

我问了。等着看吧。

---

## 我会做得不同的地方

**更早地划定范围。** 这个 PR 有 14,500 行。一次性审查量很大。我本可以先提交发布产物格式，然后是 WASM 运行时，再然后是 TypeScript 包。三个较小的 PR 会更容易合并。我没有这样做，因为我想在提出任何部分之前先验证完整的端到端故事——这对信心有好处，但增加了审查负担。

**先编写能力注册表。** `web_publish.rs` 和 `browser.rs` 之间的漂移风险是真实存在的。从一个双方都引用的共享能力类型开始，会比需要我记住保持同步的并行常量列表更干净。

**命名不要那么取巧。** `_web.json` 对于内部格式来说是个不错的名称。但一旦有人缓存它或围绕它构建工具，它就成了一个承重名称。我应该在提交之前花更多时间在命名上——在其他人依赖它之前修改成本要低得多。

---

## 更广泛的意义

让这个项目变得可行的是，Lance 的内部架构已经为范围读取做好了充分准备。对象存储抽象很干净。元数据格式是显式的。快照概念给了我一个自然的位置来表达“这是该数据集的浏览器安全视图”。

良好的抽象边界不仅让内部代码更容易推理——还让像我这样的外部人员能够在不触及核心的情况下插入一个新的执行环境。这是一种真正的设计美德，它让那 14,000 行代码感觉更像是填充一个形状，而不是与代码库搏斗。

PR 在[这里](https://github.com/lancedb/lancedb/pull/3247)，如果你想看细节。仍在等待审查。维护者一直很热情，我持谨慎乐观态度。
````
