# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 15
- **Total input tokens**: 18913
- **Total output tokens**: 8418
- **Cache read tokens**: 4864
- **Cache write tokens**: 0
- **Total duration**: 25014ms
- **Estimated cost**: $0.002253 (local-openrouter-estimate)

## Article Summary
The article argues that semantic (vector) search is a complementary layer, not a universal replacement for lexical, fuzzy, or exact‑match techniques. It explains how embeddings turn text into high‑dimensional vectors, how HNSW indexes enable fast nearest‑neighbor lookup, and why hybrid pipelines—often merged with Reciprocal Rank Fusion—are needed for tasks like Retrieval‑Augmented Generation, similarity‑based recommendation, deduplication, and multilingual retrieval. The tone is a pragmatic tutorial aimed at engineers and architects who design search systems, especially those working with PostgreSQL (pgvector, tsvector, pg_trgm) and need guidance on when to deploy a vector layer versus traditional full‑text search. Recurring metaphors compare search “tools” to a toolbox, emphasizing the importance of choosing the right instrument for each problem.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 928 | 384 | 0 | 473 | 686 | $0.000121 |
| 2 | 1082 | 512 | 0 | 331 | 302 | $0.000102 |
| 3 | 1132 | 0 | 0 | 395 | 994 | $0.000115 |
| 4 | 1197 | 640 | 0 | 413 | 590 | $0.000121 |
| 5 | 1303 | 640 | 0 | 568 | 455 | $0.000153 |
| 6 | 1178 | 640 | 0 | 439 | 453 | $0.000125 |
| 7 | 1035 | 512 | 0 | 294 | 3992 | $0.000093 |
| 8 | 1594 | 256 | 0 | 830 | 2470 | $0.000212 |
| 9 | 1173 | 0 | 0 | 426 | 1097 | $0.000122 |
| 10 | 1131 | 256 | 0 | 367 | 1358 | $0.000110 |
| 11 | 1721 | 0 | 0 | 1117 | 3285 | $0.000268 |
| 12 | 2183 | 256 | 0 | 1558 | 4608 | $0.000366 |
| 13 | 1261 | 256 | 0 | 597 | 1887 | $0.000157 |
| 14 | 1032 | 0 | 0 | 341 | 949 | $0.000102 |
| 15 | 963 | 512 | 0 | 269 | 1888 | $0.000086 |
