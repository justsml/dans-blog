# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 13303
- **Total output tokens**: 7842
- **Cache read tokens**: 3072
- **Cache write tokens**: 0
- **Total duration**: 11548ms
- **Estimated cost**: $0.001930 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL already provides three distinct, native search primitives—full‑text search (`tsvector`/GIN), trigram similarity (`pg_trgm`), and exact‑match indexes (B‑tree/hash)—and that teams should combine them rather than default to a single tool or an external search service. It explains each technology’s mechanics (lexical tokenization and ranking, three‑character slice similarity for fuzzy matching, and binary exact matches), shows when each is the right fit (long prose, typo‑tolerant names, or strict key lookups), and frames the decision as “matching the tool to the shape of the query.” The guide is written as a practical tutorial for developers and DBAs who design search features in PostgreSQL, using a recurring map‑like metaphor that plots tools against input length and semantic versus exact‑word importance.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2900 | 0 | 0 | 2373 | 1176 | $0.000540 |
| 2 | 1366 | 640 | 0 | 574 | 483 | $0.000157 |
| 3 | 1506 | 640 | 0 | 646 | 940 | $0.000175 |
| 4 | 1253 | 640 | 0 | 435 | 415 | $0.000127 |
| 5 | 1696 | 640 | 0 | 879 | 1235 | $0.000224 |
| 6 | 3233 | 512 | 0 | 2471 | 6046 | $0.000571 |
| 7 | 1349 | 0 | 0 | 464 | 1253 | $0.000136 |
