# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 18690
- **Total output tokens**: 22908
- **Cache read tokens**: 512
- **Cache write tokens**: 0
- **Total duration**: 193861ms
- **Estimated cost**: $0.006993 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL teams should master all three native search tools—**full-text search** (`tsvector`/`GIN`), **trigrams** (`pg_trgm`), and **exact-match indexes**—to avoid overcomplicating search logic and unnecessary reliance on external services. It frames search as a matter of *matching the tool to the query shape*: full-text search for semantic content, trigrams for fuzzy/typo-tolerant matching, and exact indexes for binary matches. The tone is analytical and tutorial, emphasizing practical guidance over theoretical debate, with recurring metaphors like "input shape" and "query

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 992 | 0 | 0 | 1625 | 3734 | $0.000469 |
| 2 | 3340 | 0 | 0 | 3999 | 76703 | $0.001227 |
| 3 | 1456 | 0 | 0 | 1664 | 3332 | $0.000516 |
| 4 | 1150 | 0 | 0 | 3086 | 6159 | $0.000833 |
| 5 | 1529 | 0 | 0 | 1377 | 25337 | $0.000453 |
| 6 | 1184 | 0 | 0 | 1353 | 29190 | $0.000419 |
| 7 | 1321 | 0 | 0 | 1220 | 2746 | $0.000398 |
| 8 | 1345 | 512 | 0 | 1569 | 3368 | $0.000484 |
| 9 | 1630 | 0 | 0 | 1837 | 33394 | $0.000571 |
| 10 | 3302 | 0 | 0 | 3790 | 6872 | $0.001174 |
| 11 | 1441 | 0 | 0 | 1388 | 3026 | $0.000448 |
