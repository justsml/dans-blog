# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 16504
- **Total output tokens**: 16106
- **Cache read tokens**: 2560
- **Cache write tokens**: 0
- **Total duration**: 36880ms
- **Estimated cost**: $0.005186 (local-openrouter-estimate)

## Article Summary
The article argues that Postgres teams often overlook its native search capabilities, leading to unnecessary complexity or reliance on external search services. It systematically compares three core tools—**full-text search** (lexical analysis with stemming and ranking), **pg_trgm** (fuzzy matching via trigrams for typos/autocompletion), and **exact-match indexes** (binary matches for structured data)—emphasizing that the "right tool" depends on query intent and input structure (e.g., exact vs. semantic vs. fuzzy). The tone is analytical and tutorial, framing search as a spectrum of "input shape" and "query intent" rather than a hierarchy of sophistication. A recurring metaphor is the "tool map," visualizing how each method fits specific use cases (e.g., `pg_trgm` for names, full-text for prose). Intended for developers and architects designing search systems in PostgreSQL.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 951 | 0 | 0 | 1196 | 3061 | $0.000363 |
| 2 | 3087 | 0 | 0 | 3267 | 6784 | $0.001031 |
| 3 | 1168 | 512 | 0 | 987 | 2391 | $0.000330 |
| 4 | 996 | 512 | 0 | 1061 | 2525 | $0.000334 |
| 5 | 1298 | 0 | 0 | 1249 | 2820 | $0.000404 |
| 6 | 1031 | 0 | 0 | 1043 | 2465 | $0.000333 |
| 7 | 1051 | 0 | 0 | 1022 | 2459 | $0.000329 |
| 8 | 1263 | 512 | 0 | 1093 | 2772 | $0.000363 |
| 9 | 1362 | 0 | 0 | 1391 | 3372 | $0.000443 |
| 10 | 3082 | 512 | 0 | 2735 | 5757 | $0.000903 |
| 11 | 1215 | 512 | 0 | 1062 | 2474 | $0.000352 |
