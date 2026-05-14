# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 13585
- **Total output tokens**: 7878
- **Cache read tokens**: 3072
- **Cache write tokens**: 0
- **Total duration**: 21567ms
- **Estimated cost**: $0.001948 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL already provides three distinct, native search primitives—full‑text search (lexical tsvector + GIN), trigram similarity (pg_trgm), and exact‑match indexes (B‑tree/hash)—and that teams should combine them rather than defaulting to a single tool or an external search service. It explains each technology, shows when to use it (e.g., fuzzy name matching for pg_trgm, stemming‑based document search for full‑text, and binary lookups for exact indexes), and frames the decision as “match the tool to the shape of the query.” The guide is written as a practical tutorial for developers and DBAs who design search features in PostgreSQL‑backed applications, using a consistent “tool‑by‑input‑shape” metaphor and a visual map to reinforce the comparison.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2913 | 512 | 0 | 2349 | 7727 | $0.000536 |
| 2 | 1401 | 512 | 0 | 561 | 1579 | $0.000156 |
| 3 | 1546 | 0 | 0 | 644 | 1562 | $0.000176 |
| 4 | 1291 | 512 | 0 | 433 | 1157 | $0.000128 |
| 5 | 1744 | 512 | 0 | 904 | 2418 | $0.000231 |
| 6 | 3289 | 512 | 0 | 2488 | 5737 | $0.000576 |
| 7 | 1401 | 512 | 0 | 499 | 1387 | $0.000144 |
