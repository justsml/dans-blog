# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 13573
- **Total output tokens**: 8035
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 23247ms
- **Estimated cost**: $0.001976 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL already provides three complementary search primitives—full‑text search (lexical tsvector + GIN), trigram similarity (pg_trgm), and exact‑match indexes (B‑tree/hash)—and that teams should combine them rather than defaulting to a single tool or an external search service. It explains when each primitive is the right fit: full‑text for long prose with stemming and ranking, trigram for fuzzy name or typo‑tolerant look‑ups, and exact indexes for binary matches such as IDs or emails. The guide is written as a practical tutorial for developers and DBAs who design search features, using a visual “search‑tool map” metaphor that frames the choice as matching the shape of the query to the appropriate primitive.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2903 | 512 | 0 | 2286 | 8435 | $0.000525 |
| 2 | 1363 | 512 | 0 | 618 | 1547 | $0.000164 |
| 3 | 1562 | 512 | 0 | 659 | 1588 | $0.000180 |
| 4 | 1286 | 0 | 0 | 473 | 1199 | $0.000135 |
| 5 | 1747 | 0 | 0 | 921 | 2431 | $0.000234 |
| 6 | 3304 | 0 | 0 | 2587 | 6184 | $0.000595 |
| 7 | 1408 | 512 | 0 | 491 | 1863 | $0.000143 |
