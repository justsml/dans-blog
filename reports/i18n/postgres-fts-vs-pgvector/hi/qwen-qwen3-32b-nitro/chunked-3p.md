# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 3p
- **Total chunks**: 31
- **Total input tokens**: 36527
- **Total output tokens**: 40318
- **Cache read tokens**: 9216
- **Cache write tokens**: 0
- **Total duration**: 86191ms
- **Estimated cost**: $0.012598 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL's built-in search tools—full-text search (FTS), trigrams (pg_trgm), and pgvector—often outperform the need for external vector databases in many applications. It compares their distinct use cases: FTS excels for exact term searches (e.g., SKUs, keywords) and ranked results without embeddings, trigrams handle fuzzy matching for names/addresses with typos, and pgvector enables semantic similarity for meaning-based queries. The core thesis is that teams should evaluate these

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 709 | 0 | 0 | 735 | 1767 | $0.000233 |
| 2 | 998 | 512 | 0 | 1054 | 2386 | $0.000333 |
| 3 | 1089 | 0 | 0 | 1248 | 2706 | $0.000387 |
| 4 | 1113 | 0 | 0 | 990 | 2311 | $0.000327 |
| 5 | 1087 | 0 | 0 | 877 | 1845 | $0.000297 |
| 6 | 1132 | 512 | 0 | 1549 | 3050 | $0.000462 |
| 7 | 1154 | 0 | 0 | 933 | 2273 | $0.000316 |
| 8 | 1049 | 0 | 0 | 1862 | 3650 | $0.000531 |
| 9 | 1423 | 512 | 0 | 1533 | 3136 | $0.000482 |
| 10 | 1259 | 512 | 0 | 1179 | 2586 | $0.000384 |
| 11 | 1113 | 512 | 0 | 741 | 1636 | $0.000267 |
| 12 | 946 | 512 | 0 | 1370 | 2752 | $0.000404 |
| 13 | 1205 | 512 | 0 | 1281 | 2523 | $0.000404 |
| 14 | 891 | 512 | 0 | 623 | 1639 | $0.000221 |
| 15 | 1329 | 0 | 0 | 953 | 2370 | $0.000335 |
| 16 | 975 | 0 | 0 | 1045 | 2120 | $0.000329 |
| 17 | 1088 | 512 | 0 | 829 | 1858 | $0.000286 |
| 18 | 1146 | 512 | 0 | 1678 | 3380 | $0.000494 |
| 19 | 1184 | 512 | 0 | 931 | 1953 | $0.000318 |
| 20 | 1208 | 512 | 0 | 1343 | 3268 | $0.000419 |
| 21 | 1122 | 0 | 0 | 773 | 1842 | $0.000275 |
| 22 | 1032 | 512 | 0 | 676 | 1697 | $0.000245 |
| 23 | 1310 | 0 | 0 | 2170 | 4554 | $0.000626 |
| 24 | 1676 | 512 | 0 | 2455 | 5390 | $0.000723 |
| 25 | 2320 | 512 | 0 | 3132 | 5897 | $0.000937 |
| 26 | 1104 | 0 | 0 | 1221 | 2683 | $0.000381 |
| 27 | 1274 | 512 | 0 | 1731 | 3844 | $0.000517 |
| 28 | 1253 | 512 | 0 | 2105 | 3792 | $0.000605 |
| 29 | 1276 | 0 | 0 | 1444 | 3318 | $0.000449 |
| 30 | 1175 | 512 | 0 | 661 | 1612 | $0.000253 |
| 31 | 887 | 0 | 0 | 1196 | 2353 | $0.000358 |
