# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 10627
- **Total output tokens**: 10138
- **Cache read tokens**: 384
- **Cache write tokens**: 0
- **Total duration**: 61401ms
- **Estimated cost**: $0.004274 (local-openrouter-estimate)

## Article Summary
The article argues that teams should master all three Postgres-native search tools—full-text search (tsvector/GIN), trigrams (pg_trgm), and exact-match indexes (B-tree/hash)—rather than relying on just one or prematurely adopting a dedicated search service. It presents a decision framework based on query shape: exact words vs. meaning, and short vs. long text. The tone is tutorial and practical, using a "tool map" metaphor to guide readers in matching the right tool to the problem. The intended audience is development teams who want to ship better search with less complexity.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 3361 | 0 | 0 | 2744 | 15523 | $0.001239 |
| 2 | 1681 | 0 | 0 | 1097 | 9374 | $0.000543 |
| 3 | 2240 | 384 | 0 | 1391 | 7308 | $0.000650 |
| 4 | 3345 | 0 | 0 | 4906 | 29196 | $0.001842 |
