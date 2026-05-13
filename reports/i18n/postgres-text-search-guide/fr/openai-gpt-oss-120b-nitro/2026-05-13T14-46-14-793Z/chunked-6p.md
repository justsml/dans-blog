# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 16187
- **Total output tokens**: 7924
- **Cache read tokens**: 2688
- **Cache write tokens**: 0
- **Total duration**: 24806ms
- **Estimated cost**: $0.002058 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL already provides three distinct, native search primitives—full‑text search (lexical tsvector + GIN), trigram similarity (pg_trgm), and exact‑match indexes (B‑tree/hash)—and that teams should deliberately combine them rather than defaulting to a single tool or an external search service. It explains each technology, shows the query shapes they excel at (exact keys, fuzzy typo‑tolerant strings, and semantic‑aware prose), and frames the decision as a matter of matching the tool to the “shape of the query.” The guide is written as a practical tutorial for developers and DBAs who design search features in PostgreSQL‑backed applications, using a recurring metaphor of a “tool map” that plots input type versus intent.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 983 | 384 | 0 | 360 | 564 | $0.000103 |
| 2 | 2825 | 512 | 0 | 2025 | 3350 | $0.000475 |
| 3 | 1200 | 512 | 0 | 417 | 524 | $0.000122 |
| 4 | 1023 | 256 | 0 | 306 | 1326 | $0.000095 |
| 5 | 1332 | 512 | 0 | 469 | 564 | $0.000136 |
| 6 | 1046 | 0 | 0 | 322 | 2201 | $0.000099 |
| 7 | 1064 | 0 | 0 | 298 | 1429 | $0.000095 |
| 8 | 1297 | 0 | 0 | 498 | 1772 | $0.000140 |
| 9 | 1367 | 256 | 0 | 717 | 1915 | $0.000182 |
| 10 | 2829 | 0 | 0 | 2045 | 9831 | $0.000478 |
| 11 | 1221 | 256 | 0 | 467 | 1330 | $0.000132 |
