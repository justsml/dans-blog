# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 16176
- **Total output tokens**: 7987
- **Cache read tokens**: 5376
- **Cache write tokens**: 0
- **Total duration**: 5671ms
- **Estimated cost**: $0.002069 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL already provides three distinct, native search primitives—full‑text search (lexical tsvector + GIN), trigram similarity (pg_trgm), and exact‑match indexes (B‑tree/hash)—and that teams should combine them rather than defaulting to a single tool or an external search service. It explains when each primitive is the right fit: full‑text for long prose with stemming and ranking, trigrams for fuzzy name or typo‑tolerant matching, and exact indexes for binary‑answer fields like IDs or emails. The guide is written as a practical tutorial for developers and DBAs, using a “tool‑map” metaphor that frames search as choosing the appropriate primitive based on input shape and query intent.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 976 | 384 | 0 | 357 | 397 | $0.000102 |
| 2 | 2827 | 512 | 0 | 2024 | 817 | $0.000475 |
| 3 | 1196 | 512 | 0 | 411 | 374 | $0.000121 |
| 4 | 1018 | 512 | 0 | 292 | 370 | $0.000092 |
| 5 | 1320 | 512 | 0 | 477 | 419 | $0.000137 |
| 6 | 1040 | 384 | 0 | 330 | 639 | $0.000100 |
| 7 | 1074 | 512 | 0 | 313 | 367 | $0.000098 |
| 8 | 1293 | 512 | 0 | 524 | 398 | $0.000145 |
| 9 | 1377 | 512 | 0 | 787 | 520 | $0.000195 |
| 10 | 2836 | 512 | 0 | 2001 | 810 | $0.000471 |
| 11 | 1219 | 512 | 0 | 471 | 560 | $0.000132 |
