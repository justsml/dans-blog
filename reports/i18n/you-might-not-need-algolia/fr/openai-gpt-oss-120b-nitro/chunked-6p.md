# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6012
- **Total output tokens**: 1594
- **Cache read tokens**: 3328
- **Cache write tokens**: 0
- **Total duration**: 2303ms
- **Estimated cost**: $0.000521 (local-openrouter-estimate)

## Article Summary
The articleargues that most teams consider Algolia ™ too late, without first asking whether their search needs can be satisfied by a static‑site index. It presents Pagefind—a tool that builds a search index directly from the HTML generated at build time—as the default choice for content‑driven sites (blogs, docs, marketing pages, internal handbooks, etc.), because it eliminates a separate search service, sync headaches, and operational overhead. The piece contrasts the two approaches: Algolia (or other live search services) is appropriate only when the index must change independently of deployments—e.g., live inventory, per‑user permissions, custom ranking, or analytics—while Pagefind excels when the searchable content is static and rebuildable from the deployed pages. Written in an analytical, tutorial‑style tone with a recurring “first‑ask‑if‑the‑index‑can‑be‑rebuilt” framing, the article targets developers and product teams deciding on site‑search architecture.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 956 | 384 | 0 | 326 | 431 | $0.000096 |
| 2 | 1026 | 640 | 0 | 297 | 332 | $0.000093 |
| 3 | 1039 | 384 | 0 | 261 | 314 | $0.000088 |
| 4 | 1067 | 640 | 0 | 307 | 403 | $0.000097 |
| 5 | 989 | 640 | 0 | 214 | 558 | $0.000077 |
| 6 | 935 | 640 | 0 | 189 | 265 | $0.000070 |
