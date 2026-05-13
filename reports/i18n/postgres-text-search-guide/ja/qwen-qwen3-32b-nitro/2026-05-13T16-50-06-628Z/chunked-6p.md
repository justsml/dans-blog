# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 17503
- **Total output tokens**: 15261
- **Cache read tokens**: 2560
- **Cache write tokens**: 0
- **Total duration**: 116014ms
- **Estimated cost**: $0.005063 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL's native search tools—**full-text search (`tsvector`/`GIN`), trigrams (`pg_trgm`), and exact-match indexes**—should be used synergistically rather than in isolation, enabling teams to build efficient, scalable search without overcomplicating architectures or adopting external services. It emphasizes matching tools to query intent: full-text search for semantic content analysis, trigrams for fuzzy matching (e.g., typos, autocompletion), and exact indexes for binary matches (e.g., IDs, SKUs). The tone is analytical and tutorial, framing search as a "tool map" where input shape (structured vs. unstructured) and query intent (exactness vs. similarity) dictate the right approach. Intended for developers and architects designing search systems in PostgreSQL, the guide avoids jargon-heavy metaphors, focusing instead on practical use cases and performance trade-offs.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 957 | 0 | 0 | 831 | 2306 | $0.000276 |
| 2 | 3231 | 0 | 0 | 2712 | 87650 | $0.000909 |
| 3 | 1304 | 0 | 0 | 1166 | 2772 | $0.000384 |
| 4 | 1027 | 512 | 0 | 1163 | 2953 | $0.000361 |
| 5 | 1437 | 0 | 0 | 1085 | 2691 | $0.000375 |
| 6 | 1078 | 0 | 0 | 1018 | 2363 | $0.000331 |
| 7 | 1202 | 512 | 0 | 961 | 2458 | $0.000327 |
| 8 | 1296 | 0 | 0 | 1250 | 2745 | $0.000404 |
| 9 | 1465 | 512 | 0 | 1247 | 2646 | $0.000416 |
| 10 | 3196 | 512 | 0 | 2966 | 5165 | $0.000968 |
| 11 | 1310 | 512 | 0 | 862 | 2265 | $0.000312 |
