# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 16
- **Total input tokens**: 19612
- **Total output tokens**: 20115
- **Cache read tokens**: 4096
- **Cache write tokens**: 0
- **Total duration**: 44074ms
- **Estimated cost**: $0.006397 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL's built-in full-text search (FTS), trigram matching (pg_trgm), and vector search (pgvector) offer robust, integrated solutions for most search needs, reducing reliance on external vector databases. It compares their use cases: FTS excels for exact term searches and keyword-based queries, pg_trgm handles fuzzy matching for names/addresses with typos, and pgvector enables semantic similarity via embeddings. The author critiques premature adoption of standalone vector databases, framing the choice as a "search tool map" rather than an "old vs. AI" dichotomy. Targeting developers and architects, the tone is analytical with practical SQL examples, emphasizing cost, simplicity, and avoiding data synchronization complexity. Recurring metaphors include "sources of truth" and "search shape" to frame technical decisions.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 786 | 0 | 0 | 728 | 1664 | $0.000238 |
| 2 | 993 | 0 | 0 | 951 | 2644 | $0.000308 |
| 3 | 1027 | 512 | 0 | 744 | 1730 | $0.000261 |
| 4 | 1211 | 0 | 0 | 1041 | 2569 | $0.000347 |
| 5 | 1521 | 0 | 0 | 1615 | 3567 | $0.000509 |
| 6 | 1091 | 0 | 0 | 989 | 2570 | $0.000325 |
| 7 | 1056 | 0 | 0 | 1247 | 2658 | $0.000384 |
| 8 | 1201 | 512 | 0 | 1557 | 3024 | $0.000470 |
| 9 | 1056 | 512 | 0 | 907 | 1906 | $0.000302 |
| 10 | 1182 | 0 | 0 | 1083 | 2452 | $0.000354 |
| 11 | 1047 | 0 | 0 | 1055 | 2345 | $0.000337 |
| 12 | 1805 | 512 | 0 | 2034 | 3935 | $0.000633 |
| 13 | 2319 | 512 | 0 | 2799 | 5399 | $0.000857 |
| 14 | 1230 | 512 | 0 | 1329 | 3056 | $0.000417 |
| 15 | 1158 | 512 | 0 | 1088 | 2511 | $0.000354 |
| 16 | 929 | 512 | 0 | 948 | 2044 | $0.000302 |
