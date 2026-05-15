# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 11866
- **Total output tokens**: 7881
- **Cache read tokens**: 3584
- **Cache write tokens**: 0
- **Total duration**: 5059ms
- **Estimated cost**: $0.001881 (local-openrouter-estimate)

## Article Summary
The article argues that modern PostgreSQL teams should deliberately combine the three native search primitives—full‑text search (`tsvector` + GIN), trigram indexes (`pg_trgm`), and exact‑match indexes (B‑tree/hash)—instead of defaulting to a single tool or an external search service. It explains each technology’s core mechanics (lexical tokenization and stemming for FTS, three‑character slice similarity for trigrams, binary matching for exact indexes) and maps them to concrete use‑cases such as fuzzy name lookup, typo‑tolerant autocomplete, semantic similarity via embeddings, and precise key lookups. The guide is written as a practical tutorial for developers and DBAs who design search features in PostgreSQL, using a recurring “tool‑by‑input‑shape” metaphor and visual map to reinforce the idea of matching the query shape to the appropriate primitive.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 3642 | 768 | 0 | 2811 | 1481 | $0.000648 |
| 2 | 2051 | 1024 | 0 | 1070 | 1032 | $0.000273 |
| 3 | 2525 | 768 | 0 | 1469 | 1133 | $0.000363 |
| 4 | 3648 | 1024 | 0 | 2531 | 1413 | $0.000598 |
