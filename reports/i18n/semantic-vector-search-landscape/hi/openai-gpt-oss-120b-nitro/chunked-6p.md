# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 15
- **Total input tokens**: 19345
- **Total output tokens**: 9452
- **Cache read tokens**: 7424
- **Cache write tokens**: 0
- **Total duration**: 13163ms
- **Estimated cost**: $0.002456 (local-openrouter-estimate)

## Article Summary
The article argues that semantic (vector) search is a complementary layer, not a universal replacement for lexical, fuzzy, or exact‑match techniques. It explains how embeddings turn text into high‑dimensional vectors, how HNSW indexes enable fast nearest‑neighbor lookup, and why hybrid pipelines—often merged with Reciprocal Rank Fusion—are needed for tasks like Retrieval‑Augmented Generation, recommendation, deduplication, and multilingual retrieval. The tone is a pragmatic tutorial aimed at engineers and architects who design search systems, especially those working with PostgreSQL (pgvector, tsvector, pg_trgm) and need to decide when to embed data versus rely on traditional full‑text search. Recurring metaphors compare search “layers” to a toolbox, emphasizing that the right tool must be chosen for each problem.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 925 | 384 | 0 | 357 | 500 | $0.000100 |
| 2 | 1116 | 512 | 0 | 382 | 592 | $0.000112 |
| 3 | 1167 | 512 | 0 | 416 | 474 | $0.000120 |
| 4 | 1212 | 512 | 0 | 476 | 921 | $0.000133 |
| 5 | 1334 | 512 | 0 | 690 | 856 | $0.000176 |
| 6 | 1214 | 512 | 0 | 480 | 2350 | $0.000134 |
| 7 | 1067 | 384 | 0 | 345 | 497 | $0.000104 |
| 8 | 1606 | 512 | 0 | 871 | 655 | $0.000219 |
| 9 | 1202 | 512 | 0 | 461 | 1944 | $0.000130 |
| 10 | 1165 | 512 | 0 | 429 | 547 | $0.000123 |
| 11 | 1761 | 512 | 0 | 1262 | 902 | $0.000296 |
| 12 | 2202 | 512 | 0 | 1891 | 1225 | $0.000426 |
| 13 | 1315 | 512 | 0 | 737 | 708 | $0.000184 |
| 14 | 1072 | 512 | 0 | 353 | 606 | $0.000105 |
| 15 | 987 | 512 | 0 | 302 | 386 | $0.000093 |
