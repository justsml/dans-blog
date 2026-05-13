# Chunked Translation Report

- **Model**: qwen/qwen3.6-35b-a3b
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 13945
- **Total output tokens**: 38853
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 182934ms
- **Estimated cost**: $0.040945 (local-openrouter-estimate)

## Article Summary
Targeted at backend engineers and database administrators, this pragmatic guide argues that leveraging multiple Postgres-native search primitives within a single database reduces architectural complexity and eliminates the need for premature migration to external search services. The article systematically evaluates four core tools—full-text search (`tsvector`/GIN), trigram matching (`pg_trgm`), exact-match indexes, and vector similarity (`pgvector`)—framing the selection process around matching each primitive to the specific "shape" and intent of the query. Rather than treating search as a monolithic feature, the author advocates layering these techniques based on whether queries require lexical matching, fuzzy/typo tolerance, exact binary hits, or semantic similarity. The tone is instructional and engineering-focused, using a 2D decision matrix to map input structure against query meaning for clear, actionable implementation guidance.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 3225 | 0 | 0 | 8869 | 37602 | $0.009353 |
| 2 | 1359 | 0 | 0 | 3960 | 18351 | $0.004164 |
| 3 | 1499 | 0 | 0 | 4187 | 19120 | $0.004412 |
| 4 | 1248 | 0 | 0 | 4323 | 22953 | $0.004510 |
| 5 | 1693 | 0 | 0 | 4514 | 24706 | $0.004768 |
| 6 | 3581 | 0 | 0 | 8844 | 40196 | $0.009381 |
| 7 | 1340 | 0 | 0 | 4156 | 20006 | $0.004357 |
