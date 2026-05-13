# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 16503
- **Total output tokens**: 8364
- **Cache read tokens**: 6400
- **Cache write tokens**: 0
- **Total duration**: 6010ms
- **Estimated cost**: $0.002149 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL already provides three distinct, native search primitives—full‑text search (lexical tsvector + GIN), trigram similarity (pg_trgm), and exact‑match indexes (B‑tree/hash)—and that teams should combine them rather than defaulting to a single tool or an external search service. It explains when each primitive fits: full‑text for long prose with stemming and ranking, pg_trgm for fuzzy name or typo‑tolerant matching, and exact indexes for binary‑answer fields like IDs or emails, emphasizing “match the tool to the shape of the query.” The guide is written as a practical tutorial for developers and DBAs who design search features in PostgreSQL, using a recurring “tool‑by‑input‑shape” metaphor illustrated with a quadrant diagram.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 988 | 384 | 0 | 411 | 631 | $0.000113 |
| 2 | 2866 | 512 | 0 | 2042 | 836 | $0.000479 |
| 3 | 1227 | 640 | 0 | 476 | 443 | $0.000134 |
| 4 | 1040 | 640 | 0 | 330 | 361 | $0.000100 |
| 5 | 1354 | 384 | 0 | 496 | 421 | $0.000142 |
| 6 | 1077 | 640 | 0 | 339 | 424 | $0.000103 |
| 7 | 1109 | 640 | 0 | 318 | 366 | $0.000100 |
| 8 | 1311 | 640 | 0 | 528 | 387 | $0.000146 |
| 9 | 1407 | 640 | 0 | 748 | 684 | $0.000190 |
| 10 | 2875 | 640 | 0 | 2143 | 1025 | $0.000498 |
| 11 | 1249 | 640 | 0 | 533 | 432 | $0.000145 |
