# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 18261
- **Total output tokens**: 8714
- **Cache read tokens**: 2560
- **Cache write tokens**: 0
- **Total duration**: 17594ms
- **Estimated cost**: $0.002281 (local-openrouter-estimate)

## Article Summary
The article argues that modern development teams should deliberately combine all three native PostgreSQL search primitives—full‑text search (`tsvector`/GIN), trigram indexes (`pg_trgm`), and exact‑match indexes (B‑tree/hash)—instead of defaulting to a single tool or an external search service. It explains each technology’s core mechanics (lexical tokenization and stemming for FTS, three‑character slice similarity for trigrams, and binary matching for exact indexes) and maps them to the shapes of typical queries (long prose, short structured strings, typo‑tolerant lookups, and exact key lookups). The guide is written as a practical tutorial for engineers and database architects, using a “tool‑by‑input‑shape” metaphor and a visual map to reinforce the idea of matching the right primitive to the query rather than chasing sophistication.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1079 | 0 | 0 | 439 | 1235 | $0.000121 |
| 2 | 3062 | 0 | 0 | 2212 | 1201 | $0.000518 |
| 3 | 1426 | 640 | 0 | 461 | 575 | $0.000139 |
| 4 | 1157 | 640 | 0 | 338 | 647 | $0.000106 |
| 5 | 1544 | 0 | 0 | 539 | 2603 | $0.000157 |
| 6 | 1211 | 0 | 0 | 357 | 1115 | $0.000111 |
| 7 | 1299 | 0 | 0 | 350 | 1939 | $0.000114 |
| 8 | 1428 | 0 | 0 | 564 | 1510 | $0.000157 |
| 9 | 1609 | 640 | 0 | 723 | 646 | $0.000193 |
| 10 | 3027 | 0 | 0 | 2180 | 5506 | $0.000510 |
| 11 | 1419 | 640 | 0 | 551 | 617 | $0.000155 |
