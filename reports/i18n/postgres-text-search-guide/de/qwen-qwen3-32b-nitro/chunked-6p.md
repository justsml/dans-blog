# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 16448
- **Total output tokens**: 17103
- **Cache read tokens**: 3072
- **Cache write tokens**: 0
- **Total duration**: 37829ms
- **Estimated cost**: $0.005421 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL's native search tools—**full-text search (tsvector/GIN)**, **trigrams (pg_trgm)**, and **exact-match indexes**—should be used in combination rather than isolation to optimize search functionality. It emphasizes matching tools to query requirements: full-text search for lexical analysis (e.g., articles), trigrams for fuzzy matching (e.g., typos, autocompletion), and exact-match indexes for binary matches (e.g., IDs, emails). The core thesis is that teams often overcomplicate search by relying on a single tool or external services, when layering Postgres-native options reduces complexity and cost. The tone is analytical and tutorial, framed around a visual "tool map" that categorizes use cases by input type and intent. Intended for developers and database engineers seeking to implement efficient, scalable search in PostgreSQL.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 943 | 0 | 0 | 1135 | 2553 | $0.000348 |
| 2 | 3077 | 512 | 0 | 3470 | 6302 | $0.001079 |
| 3 | 1169 | 0 | 0 | 1082 | 4093 | $0.000353 |
| 4 | 992 | 0 | 0 | 1169 | 2846 | $0.000360 |
| 5 | 1295 | 512 | 0 | 1130 | 2359 | $0.000375 |
| 6 | 1023 | 512 | 0 | 978 | 2130 | $0.000317 |
| 7 | 1040 | 0 | 0 | 1021 | 2652 | $0.000328 |
| 8 | 1255 | 512 | 0 | 1105 | 2568 | $0.000366 |
| 9 | 1358 | 0 | 0 | 1317 | 3166 | $0.000425 |
| 10 | 3090 | 512 | 0 | 3358 | 6253 | $0.001053 |
| 11 | 1206 | 512 | 0 | 1338 | 2907 | $0.000418 |
