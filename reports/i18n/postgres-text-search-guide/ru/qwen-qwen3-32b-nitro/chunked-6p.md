# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 16618
- **Total output tokens**: 15916
- **Cache read tokens**: 5120
- **Cache write tokens**: 0
- **Total duration**: 31741ms
- **Estimated cost**: $0.005149 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL teams often underutilize its native search capabilities by relying on a single tool, leading to unnecessary complexity or reliance on external services. It presents three core tools—**full-text search** (`tsvector`, `GIN`), **trigrams** (`pg_trgm`), and **exact-match indexes** (B-tree, hash)—each optimized for distinct query patterns: lexical search (e.g., articles), fuzzy matching (e.g., names, typos), and binary exact matches (e.g., IDs). The thesis emphasizes selecting tools based on the *shape of the query* (e.g., structured vs. unstructured text) rather than sophistication, with a tutorial tone and a visual "tool map" framing device to guide decisions. Targeted at developers and architects, it advocates layering these tools to build efficient, cost-effective search systems without overengineering.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 948 | 0 | 0 | 1136 | 2599 | $0.000348 |
| 2 | 3101 | 512 | 0 | 2958 | 5011 | $0.000958 |
| 3 | 1190 | 512 | 0 | 1135 | 2412 | $0.000368 |
| 4 | 997 | 512 | 0 | 761 | 2100 | $0.000262 |
| 5 | 1321 | 512 | 0 | 1155 | 2655 | $0.000383 |
| 6 | 1022 | 512 | 0 | 948 | 2045 | $0.000309 |
| 7 | 1066 | 512 | 0 | 852 | 1855 | $0.000290 |
| 8 | 1261 | 512 | 0 | 1180 | 2408 | $0.000384 |
| 9 | 1379 | 512 | 0 | 1222 | 2376 | $0.000404 |
| 10 | 3109 | 512 | 0 | 3227 | 5562 | $0.001023 |
| 11 | 1224 | 512 | 0 | 1342 | 2718 | $0.000420 |
