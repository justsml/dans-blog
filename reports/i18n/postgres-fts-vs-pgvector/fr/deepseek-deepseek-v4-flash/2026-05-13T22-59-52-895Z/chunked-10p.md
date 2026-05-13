# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 10
- **Total input tokens**: 15661
- **Total output tokens**: 19640
- **Cache read tokens**: 1920
- **Cache write tokens**: 0
- **Total duration**: 130367ms
- **Estimated cost**: $0.007428 (local-openrouter-estimate)

## Article Summary
The article argues that teams adding AI features often prematurely adopt dedicated vector databases (e.g., Pinecone, Weaviate) when PostgreSQL already provides `pgvector` for semantic search and built-in full-text search (FTS) since 2008. It distinguishes three tools: FTS for lexical keyword matching (product SKUs, error codes), `pg_trgm` for fuzzy string matching (names, typos, autocomplete), and `pgvector` for semantic similarity (meaning-based queries). The tone is a practical tutorial/analysis, using code examples and a "search tool map" to guide decisions based on text shape and query intent. The intended audience is developers evaluating search infrastructure, especially those already using PostgreSQL.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1118 | 0 | 0 | 649 | 17024 | $0.000338 |
| 2 | 1364 | 0 | 0 | 833 | 24795 | $0.000424 |
| 3 | 1712 | 0 | 0 | 2903 | 13389 | $0.001053 |
| 4 | 1411 | 0 | 0 | 1114 | 6041 | $0.000509 |
| 5 | 1439 | 384 | 0 | 1816 | 9506 | $0.000657 |
| 6 | 1406 | 384 | 0 | 1282 | 6608 | $0.000503 |
| 7 | 1871 | 384 | 0 | 1716 | 8380 | $0.000690 |
| 8 | 2750 | 0 | 0 | 5422 | 25274 | $0.001903 |
| 9 | 1547 | 384 | 0 | 2571 | 12545 | $0.000884 |
| 10 | 1043 | 384 | 0 | 1334 | 6805 | $0.000467 |
