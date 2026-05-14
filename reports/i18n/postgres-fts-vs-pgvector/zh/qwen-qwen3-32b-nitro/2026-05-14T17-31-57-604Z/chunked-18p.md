# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 18p
- **Total chunks**: 6
- **Total input tokens**: 12828
- **Total output tokens**: 9077
- **Cache read tokens**: 1536
- **Cache write tokens**: 0
- **Total duration**: 22706ms
- **Estimated cost**: $0.003205 (local-openrouter-estimate)

## Article Summary
The article argues that teams often prematurely adopt dedicated vector databases (e.g., Pinecone, Weaviate) for AI-driven search, creating unnecessary complexity, when PostgreSQL's built-in tools—full-text search (FTS), trigrams (pg_trgm), and pgvector—can often suffice. It analyzes when each tool excels: FTS for exact term/keyword searches (e.g., SKUs, legal clauses), trigrams for fuzzy matching of short strings (e.g., names, typos), and pgvector for semantic similarity (e.g., "dog" vs. "canine"). The tone is analytical and pragmatic, framing the choice as a matter of text shape and query intent rather than "old vs. new" tech. Key metaphors include the "search tool map" and "sources of truth" to emphasize avoiding synchronization bugs from redundant systems. Intended for developers evaluating search infrastructure, the article advocates leveraging PostgreSQL's native capabilities before scaling to specialized solutions.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1460 | 0 | 0 | 1412 | 3172 | $0.000456 |
| 2 | 2243 | 512 | 0 | 1695 | 3399 | $0.000586 |
| 3 | 2064 | 0 | 0 | 1467 | 6008 | $0.000517 |
| 4 | 2573 | 0 | 0 | 2212 | 4525 | $0.000737 |
| 5 | 3311 | 512 | 0 | 1519 | 3791 | $0.000629 |
| 6 | 1177 | 512 | 0 | 772 | 1811 | $0.000279 |
