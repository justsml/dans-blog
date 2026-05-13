# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 10p
- **Total chunks**: 10
- **Total input tokens**: 16819
- **Total output tokens**: 14847
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 33201ms
- **Estimated cost**: $0.004909 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL's built-in search tools—full-text search (FTS), trigrams (pg_trgm), and pgvector—offer robust, scalable solutions for diverse search needs, often eliminating the need for external vector databases. It frames FTS as ideal for exact lexical matches (e.g., SKUs, keywords), pg_trgm for fuzzy string matching (e.g., typos, names), and pgvector for semantic similarity (e.g., embeddings). The core thesis is that teams should prioritize these native tools before adopting new infrastructure, as premature adoption of vector databases creates unnecessary complexity and synchronization risks. The tone is analytical, using a "search tool map" metaphor to categorize use cases by text shape and required precision. Intended for developers and architects evaluating search strategies, the article emphasizes practical SQL examples and cost-benefit tradeoffs between exactness

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1136 | 0 | 0 | 1170 | 2890 | $0.000372 |
| 2 | 1532 | 0 | 0 | 1142 | 2698 | $0.000397 |
| 3 | 1734 | 0 | 0 | 1676 | 3585 | $0.000541 |
| 4 | 1529 | 0 | 0 | 1227 | 2864 | $0.000417 |
| 5 | 1500 | 0 | 0 | 1254 | 2732 | $0.000421 |
| 6 | 1563 | 512 | 0 | 1296 | 3005 | $0.000436 |
| 7 | 2020 | 512 | 0 | 1732 | 3973 | $0.000577 |
| 8 | 2947 | 512 | 0 | 3139 | 6059 | $0.000989 |
| 9 | 1697 | 0 | 0 | 1491 | 3474 | $0.000494 |
| 10 | 1161 | 512 | 0 | 720 | 1921 | $0.000266 |
