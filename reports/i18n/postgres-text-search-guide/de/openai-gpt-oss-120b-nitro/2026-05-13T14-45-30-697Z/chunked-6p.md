# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 16265
- **Total output tokens**: 7848
- **Cache read tokens**: 3328
- **Cache write tokens**: 0
- **Total duration**: 21941ms
- **Estimated cost**: $0.002047 (local-openrouter-estimate)

## Article Summary
The articleargues that PostgreSQL already provides three distinct, native search primitives—full‑text search (lexical tsvector + GIN), trigram similarity (pg_trgm), and exact‑match indexes (B‑tree/hash)—and that teams should combine them rather than defaulting to a single tool or an external search service. It explains each technology, shows when to use it (e.g., fuzzy name matching for pg_trgm, stemming‑based document search for full‑text, and binary lookups for exact indexes), and frames the decision as “matching the tool to the shape of the query.” The tone is a practical tutorial aimed at developers and DBAs who design search features inside PostgreSQL, using the recurring metaphor of a “tool map” that plots queries by input shape and intent.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 987 | 384 | 0 | 383 | 1429 | $0.000107 |
| 2 | 2843 | 512 | 0 | 2008 | 802 | $0.000472 |
| 3 | 1206 | 640 | 0 | 401 | 1073 | $0.000119 |
| 4 | 1030 | 256 | 0 | 282 | 1658 | $0.000091 |
| 5 | 1334 | 640 | 0 | 449 | 2295 | $0.000133 |
| 6 | 1053 | 0 | 0 | 302 | 2214 | $0.000095 |
| 7 | 1076 | 384 | 0 | 303 | 333 | $0.000097 |
| 8 | 1300 | 0 | 0 | 515 | 1692 | $0.000143 |
| 9 | 1372 | 0 | 0 | 685 | 3566 | $0.000177 |
| 10 | 2840 | 256 | 0 | 2036 | 5352 | $0.000477 |
| 11 | 1224 | 256 | 0 | 484 | 1527 | $0.000135 |
