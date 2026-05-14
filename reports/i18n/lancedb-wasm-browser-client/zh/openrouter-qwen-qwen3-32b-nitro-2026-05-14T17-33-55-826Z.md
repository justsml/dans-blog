# Translation Candidate
- Slug: lancedb-wasm-browser-client
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-04-16--lancedb-wasm-browser-client/zh/index.mdx
- Validation: deferred
- Runtime seconds: 8.70
- Input tokens: 4822
- Output tokens: 3416
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001206
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 无服务器向量搜索
subTitle: 构建一个使用 Rust、WASM 和 TypeScript 的向量搜索浏览器客户端
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
## 问题：你无法在浏览器中搜索Lance表

LanceDB是一个出色的向量数据库。相比传统数据库，它简单得多且成本更低。你可以发布包含向量列、全文搜索（FTS）列的表，将文件托管在S3或CDN上，并通过S3直接从Node.js服务器查询数据。不需要守护进程。

在本次PR之前，你无法直接在浏览器中打开该表并执行搜索。你需要一个中间服务器：Lambda、容器，或者任何能运行Rust、Node.js/WASM或Python的东西。

目标是雄心勃勃但聚焦于有意义的结果：**直接可搜索的、只读的、通过HTTP托管的向量索引**。

---

## 架构

实现包含三个层级：

### 1. Rust发布工件（`web_publish.rs`）

在浏览器能够搜索Lance表之前，它需要知道哪些内容是安全可搜索的。Lance的内部格式包含一些浏览器不可移植的特性——增量文件、外部基表、WASM运行时无法执行的索引类型。我们不能让浏览器在搜索时才发现这些问题（这很糟糕），因此发布步骤会生成显式的旁车文件：

- `_web.json` — 声明模式并标明哪些列是浏览器可搜索的（支持距离类型的向量列、FTS列）
- `_snapshot.json` — 数据集的时点视图，浏览器客户端无需理解完整数据集演进协议即可消费
- `_latest.manifest` / `_latest.version` — 浏览器轮询以检测数据陈旧的稳定指针

快照中的`isComplete`标志是安全阀门。如果数据集依赖浏览器路径无法安全读取的外部基表或数据文件，`isComplete=false`，浏览器会以明确错误拒绝访问，而不是产生细微的错误结果。

这是我最庆幸用Rust而非JavaScript实现的部分。关于哪些内容是浏览器安全的判断逻辑，直接存在于表元数据的存储位置。

### 2. `lancedb-wasm` Rust crate

这是WebAssembly运行时：基于`fetch`的对象存储、浏览器端搜索引擎、过滤谓词的表达式求值器。

`fetch`对象存储（`fetch_object_store.rs`）通过HTTP范围请求实现Lance的`ObjectStore`特性。Lance的内部读取本就以范围字节请求的形式组织，这与`Range: bytes=N-M`头部完美匹配。这是项目中最令人满意的部分——现有架构几乎完美适配此需求，我只需将其连接起来。

浏览器引擎（`browser.rs`）处理搜索：向量最近邻搜索、全文搜索、混合搜索（向量+FTS+RRF融合）。过滤表达式（`browser_expr.rs`）在纯Rust中求值，编译为WASM后在客户端执行。

功能拒绝是严格且有意为之的。`hamming`距离？明确拒绝并给出清晰提示——不会静默错误，也不会运行时panic。在不完整快照上执行`fastSearch`？拒绝。不支持的基路径布局？拒绝。目标是严格失败：如果浏览器路径无法满足契约，它会明确声明这一点。

### 3. `@lancedb/lancedb-web` TypeScript包

公共API表面有意保持小巧：

```typescript
import { searchTable } from "@lancedb/lancedb-web";

const results = await searchTable("https://my-cdn.example.com/my-table", "semantic search query", {
  select: ["title", "url", "score"],
  limit: 10,
});
```

在底层，`searchTable()`优先使用Worker支持的执行路径，以避免搜索阻塞主线程。WASM模块在Worker中运行；结果通过类型化协议（`worker_protocol.ts`）返回。还有一个可选的`./transformers`导出，它封装了`@xenova/transformers`以在客户端生成查询嵌入向量——这意味着你可以从原始文本查询直接获得向量搜索结果，而无需离开浏览器。

---

## 关键难点

### HTTP范围读取并非免费

Lance的读取模式假设对象存储能高效处理大量小范围获取请求。S3和GCS正是为此设计的。浏览器...基本也是如此，但使用`fetch`配合`Range`头部存在一些浏览器特有的特性，而现有的Rust对象存储抽象层无需处理这些问题。

主要问题是浏览器有时会激进地缓冲或重新请求，且无法像原生进程那样控制TCP连接池。对于大型向量索引而言这会带来显著影响。当前实现是正确的；是否足够快以支持生产环境中的大型表，还有待审查阶段验证。

### 侧边文件生成问题

该PR明确将其作为维护者需要考虑的问题提出，因为存在真实的设计权衡：浏览器侧边文件（`_web.json`、`_snapshot.json`）应该在每次表提交时自动生成，还是应该使用显式的`publish()`调用？

自动生成功能更易用——你可免费获得浏览器支持。但这意味着每次本地写入都会带来额外开销，并将浏览器契约与核心提交路径耦合，这可能使未来任一方的修改变得复杂。

显式发布在契约层面更严谨——你明确声明"此版本已准备好浏览器使用"，但容易被遗忘，导致本应支持浏览器搜索的表静默失效。

我倾向于自动发布，将侧边文件生成失败记录为警告而非阻断提交。但对此我确实存在疑虑，并已在PR中标记了这个问题。

### 何为"浏览器安全"

`web_publish.rs`中的`isComplete`标志和列过滤逻辑体现了对浏览器处理能力的判断。这种判断必须与WASM运行时的实际能力保持同步。如果有人向Lance添加了浏览器无法执行的新索引类型，发布代码需要知道排除它——否则会宣传浏览器实际上无法兑现的搜索能力。

正确的解决方案可能是共享发布路径和运行时之间的能力注册表，以防止两者漂移。目前我实现为并行常量，这虽然快速但脆弱。这可能是我接下来最想改进的部分。

---

## Transformers包装器困境

`./transformers`导出是一个提升用户体验的功能：它接收文本查询，通过`@xenova/transformers`运行本地嵌入模型，然后将生成的向量交给LanceDB搜索引擎。从静态HTML页面实现零服务器语义搜索。

这也是我最不确定是否应包含在此PR中的部分。它确实有用且已实现，但它是一个与核心浏览器搜索问题无关的依赖项和API表面。维护者可能希望先落地基础的`searchTable()` API，再单独迭代嵌入模型。

我问过他们。结果如何拭目以待。

---

## 我会如何改进

**更早划定范围。** 这个PR有14,500行。一次性审查这么多代码量很大。我可以先落地发布工件格式，再实现WASM运行时，最后开发TypeScript包。三个较小的PR更容易合并。我没有这样做是因为想先验证完整的端到端流程——这对建立信心是合理的，但增加了审查负担。

**优先编写能力注册表。** `web_publish.rs`和`browser.rs`之间的漂移风险是真实的。如果一开始就共享一个双方都引用的能力类型，比现在需要手动维护的并行常量列表会更清晰。

**不要取太巧妙的名字。** `_web.json`作为内部格式的名字是合适的。但一旦有人缓存它或围绕它构建工具，它就成为关键依赖。我应该在提交前花更多时间考虑命名——这是那种在其他人依赖之前修改成本更低的事情。

---

## 更宏观的视角

让这个项目可行的关键在于Lance的内部架构已经很好地支持了范围读取。对象存储抽象很干净，元数据格式明确，快照概念自然地提供了"这是数据集的浏览器安全视图"的表达方式。

良好的抽象边界不仅让内部代码更容易理解——它们让像我这样的外部人员能够不修改核心代码就接入新的执行环境。这是一种真正的设计美德，这让14,000行代码感觉更像是在填充形状而非对抗代码库。

如果你想查看细节，PR在[这里](../https://github.com/lancedb/lancedb/pull/3247)。仍在等待审查。维护者们很友好，我谨慎乐观。
````
