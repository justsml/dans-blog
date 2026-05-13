# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 16
- **Total input tokens**: 21345
- **Total output tokens**: 8179
- **Cache read tokens**: 4736
- **Cache write tokens**: 0
- **Total duration**: 16303ms
- **Estimated cost**: $0.002305 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that PostgreSQL’s built‑in search tools—full‑text search (FTS), trigram matching (`pg_trgm`), and the newer `pgvector` extension—can often replace a separate vector database for many AI‑enabled applications, and that choosing the right tool depends on the shape of the query rather than on “old vs. new” technology. It explains that FTS (`tsvector` + GIN) is lexical, ideal for exact‑term, keyword‑driven queries, Boolean filtering, and deterministic ranking without extra infrastructure. `pg_trgm` provides fuzzy string matching for short strings, typos, autocomplete, and partial matches where neither pure lexical nor semantic search works well. `pgvector` stores dense embeddings for semantic similarity, useful when the intent is “what does this mean?” rather than “what words appear?” The tone is a practical tutorial aimed at developers and DBAs who are already using PostgreSQL and are considering whether to add an external vector store. The article repeatedly frames the decision as a “search tool map” that matches query shape to the appropriate PostgreSQL extension.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 908 | 0 | 0 | 207 | 439 | $0.000073 |
| 2 | 1114 | 640 | 0 | 404 | 858 | $0.000116 |
| 3 | 1144 | 640 | 0 | 303 | 572 | $0.000099 |
| 4 | 1331 | 640 | 0 | 426 | 678 | $0.000129 |
| 5 | 1637 | 640 | 0 | 724 | 481 | $0.000194 |
| 6 | 1214 | 640 | 0 | 277 | 488 | $0.000097 |
| 7 | 1177 | 0 | 0 | 359 | 1064 | $0.000111 |
| 8 | 1314 | 640 | 0 | 563 | 562 | $0.000153 |
| 9 | 1168 | 0 | 0 | 394 | 1049 | $0.000116 |
| 10 | 1304 | 0 | 0 | 342 | 1046 | $0.000112 |
| 11 | 1155 | 256 | 0 | 139 | 1019 | $0.000070 |
| 12 | 1879 | 0 | 0 | 1204 | 3029 | $0.000290 |
| 13 | 2332 | 640 | 0 | 1608 | 841 | $0.000380 |
| 14 | 1353 | 0 | 0 | 551 | 1514 | $0.000152 |
| 15 | 1272 | 0 | 0 | 415 | 1538 | $0.000124 |
| 16 | 1043 | 0 | 0 | 263 | 1125 | $0.000088 |
