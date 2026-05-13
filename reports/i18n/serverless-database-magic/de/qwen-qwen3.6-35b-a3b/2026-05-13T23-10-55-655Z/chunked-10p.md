# Chunked Translation Report

- **Model**: qwen/qwen3.6-35b-a3b
- **Chunk size**: 10p
- **Total chunks**: 2
- **Total input tokens**: 4662
- **Total output tokens**: 14652
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 64185ms
- **Estimated cost**: $0.015351 (local-openrouter-estimate)

## Article Summary
This pragmatic analysis argues that traditional databases are often overkill for read-heavy, rebuildable workloads, advocating instead for object-storage databases that index files and serve data over HTTP. The author evaluates five specific tools—Pagefind, Orama, Chroma, LanceDB, and DuckDB-WASM—demonstrating how they shift architectural complexity from runtime infrastructure to build pipelines, index freshness, and cache management. Written with a skeptical, hype-aware tone toward the prevailing "vector database" trend, the article employs framing devices like "S3 cosplay" and "database by any other name" to categorize these serverless, CDN-capable datastores. The piece is intended for developers and technical architects evaluating lightweight, AI-ready search and analytics solutions for mid-scale, file-centric applications.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1361 | 0 | 0 | 6257 | 27053 | $0.006461 |
| 2 | 3301 | 0 | 0 | 8395 | 37132 | $0.008890 |
