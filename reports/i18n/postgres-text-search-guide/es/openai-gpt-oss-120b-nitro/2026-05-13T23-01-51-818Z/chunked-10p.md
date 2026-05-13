# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 13392
- **Total output tokens**: 7657
- **Cache read tokens**: 2900
- **Cache write tokens**: 0
- **Total duration**: 12228ms
- **Estimated cost**: $0.001901 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL already provides three complementary search primitives—full‑text search (`tsvector`/GIN), trigram similarity (`pg_trgm`), and exact‑match indexes (B‑tree/Hash)—and that teams should combine them rather than default to a single tool or an external search service. It explains the technical differences: lexical tokenization and ranking for FTS, orthographic similarity for trigrams (ideal for fuzzy name matching and autocomplete), and binary matching for exact indexes (IDs, emails, SKUs), and shows how to map query shapes to the appropriate primitive. The guide is written as a practical tutorial for developers and DBAs who design search features in PostgreSQL, using a recurring “tool‑by‑input‑shape” metaphor illustrated with a quadrant diagram. The tone is instructional, emphasizing clear decision‑making over “sophistication” and encouraging a layered approach to achieve robust, low‑complexity search.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2917 | 0 | 0 | 2306 | 5266 | $0.000529 |
| 2 | 1372 | 512 | 0 | 519 | 368 | $0.000147 |
| 3 | 1514 | 70 | 0 | 602 | 2430 | $0.000167 |
| 4 | 1266 | 782 | 0 | 390 | 1717 | $0.000120 |
| 5 | 1714 | 768 | 0 | 841 | 781 | $0.000218 |
| 6 | 3244 | 0 | 0 | 2458 | 1138 | $0.000569 |
| 7 | 1365 | 768 | 0 | 541 | 528 | $0.000151 |
