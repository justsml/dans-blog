# Translation Candidate
- Slug: lancedb-wasm-browser-client
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-04-16--lancedb-wasm-browser-client/zh/index.mdx
- Validation: deferred
- Runtime seconds: 5.74
- Input tokens: 5115
- Output tokens: 2192
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000594
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 无服务器向量搜索
subTitle: 使用 Rust、WASM 与 TypeScript 构建向量搜索浏览器客户端
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
## 问题：浏览器无法搜索 Lance 表

LanceDB 是一个出色的向量数据库。它比传统数据库简洁得多，成本也更低。你可以发布包含向量列、全文搜索（FTS）列的表，将文件托管在 S3 或 CDN 上，并直接从 Node.js 服务器通过 S3 查询数据。无需守护进程。

在此 PR 之前，你*无法*直接在浏览器中打开该表并执行搜索。必须在中间加一层服务器：Lambda、容器，或*能够运行* Rust、Node.js/WASM 或 Python 的*某种东西*。

目标虽然宏大，却聚焦于一个有意义的最终结果：**可直接搜索、只读、通过 HTTP 托管的向量索引**。

---

## 架构

实现分为三层：

### 1. Rust 发布产物（`web_publish.rs`）

在浏览器能够搜索 Lance 表之前，需要知道哪些内容是安全可搜索的。Lance 的内部格式包含一些浏览器不可移植的特性——增量文件、外部基准、WASM 运行时无法执行的索引类型。与其让浏览器在搜索时自行发现这些（糟糕），发布步骤会生成明确的 sidecar 文件：

- `_web.json` — 声明 schema 以及哪些列可在浏览器中搜索（支持的距离类型的向量列、FTS 列）
- `_snapshot.json` — 数据集的某一时点视图，浏览器客户端可以消费而无需理解完整的数据演进协议
- `_latest.manifest` / `_latest.version` — 稳定指针，浏览器轮询以检测陈旧

`snapshot` 中的 `isComplete` 标志是安全阀。如果数据集依赖外部基准或浏览器路径无法安全读取的数据文件，`isComplete=false`，浏览器会提前以明确错误拒绝，而不是产生细微错误的结果。

这部分我最庆幸的是把它实现到了 Rust 而不是 JavaScript。关于什么是浏览器安全的判断，放在表元数据实际所在的地方最合适。

### 2. `lancedb-wasm` Rust crate

这就是 WebAssembly 运行时：一个基于 `fetch` 的对象存储、浏览器端搜索引擎，以及用于过滤谓词的表达式求值器。

`fetch` 对象存储（`fetch_object_store.rs`）在 HTTP 范围请求上实现了 Lance 的 `ObjectStore` trait。Lance 的内部读取已经组织为范围字节请求，能够直接映射到 `Range: bytes=N-M` 头。这是项目中最让人满意的部分——现有架构几乎完美匹配，我只需把它接通即可。

浏览器引擎（`browser.rs`）负责搜索：向量最近邻、全文搜索以及混合搜索（向量 + FTS，使用 RRF 融合）。过滤表达式（`browser_expr.rs`）在纯 Rust 中客户端求值，编译为 WASM。

特性拒绝严格且刻意。`hamming` 距离？立即以明确消息拒绝——不悄悄出错，也不触发运行时 panic。对不完整快照执行 `fastSearch`？拒绝。不支持的基路径布局？拒绝。目标是“失败即关闭”：如果浏览器路径无法满足合约，就直接说明。

### 3. `@lancedb/lancedb-web` TypeScript 包

公共 API 表面故意保持简洁：

```typescript
import { searchTable } from "@lancedb/lancedb-web";

const results = await searchTable("https://my-cdn.example.com/my-table", "semantic search query", {
  select: ["title", "url", "score"],
  limit: 10,
});
```

在内部，`searchTable()` 更倾向于使用 Worker 支持的执行路径，以免搜索阻塞主线程。WASM 模块在 Worker 中运行，结果通过类型化协议（`worker_protocol.ts`）回传。还有一个可选的 `./transformers` 导出，它包装了 `@xenova/transformers`，在客户端生成查询嵌入——因此可以直接从原始文本查询得到向量搜索结果，而无需离开浏览器。

---

## 难点

### HTTP 范围读取并非免费

Lance 的读取模式假设对象存储能够高效处理大量小范围的 fetch。S3 与 GCS 正是为此设计的。浏览器…大多数情况下也能做到，但 `fetch` 搭配 `Range` 头时会出现一些怪癖，而现有的 Rust 对象存储抽象并不需要关心这些细节。

主要问题在于浏览器有时会激进地缓冲或重新请求，而且你无法像原生进程那样控制 TCP 连接池。对于大型向量索引，这一点尤为关键。当前实现是正确的；至于在大表生产环境下是否足够快，还需要在评审中进一步验证。

### sidecar 生成的抉择

PR 中明确把这个问题抛给维护者，因为这里存在真实的设计权衡：浏览器 sidecar 文件（`_web.json`、`_snapshot.json`）是应在每次表提交时*自动*生成，还是需要显式调用 `publish()`？

自动生成更符合人机工程学——浏览器支持可免费获得。但这意味着每次本地写入都会有额外开销，并且会把浏览器合约耦合到核心提交路径，可能会让未来的改动变得更复杂。

显式发布在合约层面更严谨——你在声明“此版本已准备好供浏览器使用”。但容易被忘记，从而导致本应可浏览搜索的表悄然失效。

我倾向于自动生成，并在 sidecar 生成失败时记录警告而不是阻塞提交。但我对此仍不确定，并已在 PR 中标记。

### 什么算是“浏览器安全”？

`web_publish.rs` 中的 `isComplete` 标记以及列过滤逻辑对浏览器能处理的内容作出判断。该判断必须与 WASM 运行时的实际能力保持同步。如果有人为 Lance 添加了浏览器无法执行的新索引类型，发布代码必须知道将其排除——否则会在搜索时宣传一种浏览器根本无法兑现的能力。

最合适的修复方式可能是引入一个在发布路径和运行时之间共享的能力注册表，防止两者漂移。我目前采用平行常量实现，虽然快捷但脆弱。这大概是我接下来想要改进的地方。

---

## Transformers 包装器的两难

`./transformers` 导出是一个提升使用体验的特性：它接受文本查询，使用 `@xenova/transformers` 在本地运行嵌入模型，并将生成的向量交给 LanceDB 搜索引擎。实现了从静态 HTML 页面进行零服务器语义搜索。

它也是我在这个 PR 中最不确定是否应该出现的部分。它确实很有用，而且已经实现了，但它是一个依赖项，且 API 表面与核心的浏览器搜索问题是分离的。维护者可能会合理地希望先落地基础的 `searchTable()` API，然后再单独迭代嵌入功能。

我已经询问过了，拭目以待。

---

## 我会做的不同之处

**更早确定范围。** 这个 PR 有 14,500 行代码，一口气审查实在太多。我本可以先提交发布产物格式，然后是 WASM 运行时，最后是 TypeScript 包。三个更小的 PR 会更容易合并。我没有这么做，是因为想在提出任何单独组件之前先验证完整的端到端流程——这对信心有帮助，但也大幅提升了审查负担。

**先编写能力注册表。** `web_publish.rs` 与 `browser.rs` 之间的漂移风险是真实存在的。先定义一个共享的能力类型，让双方都引用，会比我现在使用的平行常量列表更整洁，也更不容易忘记同步。

**少用巧妙的命名。** `_web.json` 作为内部格式的名称本身没问题。但一旦有人缓存它或围绕它构建工具，这个名字就变成了承载负荷的标识。我本应该在提交前花更多时间考虑命名——在别人依赖之前改名要便宜得多。

---

## 更广的意义

让这个项目可行的关键在于 Lance 的内部架构已经为范围读取做好了良好结构。对象存储抽象很干净，元数据格式明确，快照概念为我提供了一个自然的点来表达“这是该数据集的浏览器安全视图”。

良好的抽象边界不仅让内部代码更易于推理——也使得像我这样从项目外部加入新执行环境而无需触碰核心代码成为可能。这是一种真正的设计美德，也让这 14,000 行代码更像是填充形状，而不是与代码库搏斗。

PR 在[这里](https://github.com/lancedb/lancedb/pull/3247)（如果你想查看细节），仍在等待审查。维护者态度友好，我保持谨慎的乐观。
````
