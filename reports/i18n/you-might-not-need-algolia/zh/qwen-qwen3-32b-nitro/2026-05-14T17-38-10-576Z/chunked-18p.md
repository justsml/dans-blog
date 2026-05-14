# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 2801
- **Total output tokens**: 2126
- **Cache read tokens**: 512
- **Cache write tokens**: 0
- **Total duration**: 5276ms
- **Estimated cost**: $0.000734 (local-openrouter-estimate)

## Article Summary
The article argues that teams often adopt Algolia prematurely for site search without first evaluating whether their content is static or dynamic, leading to unnecessary complexity. It advocates for **Pagefind** as a simpler, cost-effective solution for static sites (e.g., blogs, docs, marketing pages) where search indexes are rebuilt on deployment, contrasting it with Algolia’s hosted, dynamic search infrastructure. The core thesis is that Pagefind eliminates the "extra system" overhead of Algolia by indexing rendered HTML directly, avoiding synchronization challenges and operational debt. The tone is analytical and pragmatic, framing the choice as a trade-off between simplicity (Pagefind) and dynamic requirements (Algolia, OpenSearch, Postgres). Key metaphors include "infrastructure cosplay" (using hosted services unnecessarily) and "the index follows the artifact," emphasizing alignment between deployed content and search. The

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1336 | 0 | 0 | 1063 | 2859 | $0.000362 |
| 2 | 1465 | 512 | 0 | 1063 | 2417 | $0.000372 |
