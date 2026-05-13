# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 16
- **Total input tokens**: 20707
- **Total output tokens**: 7989
- **Cache read tokens**: 9216
- **Cache write tokens**: 0
- **Total duration**: 7094ms
- **Estimated cost**: $0.002246 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that PostgreSQL’s built‑in search tools—full‑text search (FTS), trigram matching (`pg_trgm`), and the newer `pgvector` extension—can often replace external vector databases for many AI‑enhanced applications, and that choosing the right tool depends on the shape of the text and the desired answer. It explains that FTS (lexical `tsvector` + GIN) is ideal for exact‑term queries, keyword filtering, and deterministic ranking without extra infrastructure; `pgvector` provides semantic similarity by storing dense embeddings, useful when “meaning” matters more than literal words; and `pg_trgm` fills the gap for short strings, typos, autocomplete, and fuzzy matching where neither pure lexical nor semantic approaches work well. The tone is a practical tutorial aimed at developers and DBAs who already use PostgreSQL and are considering whether to add a separate vector store, illustrated with concrete SQL snippets and a visual “search tool map”.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 879 | 256 | 0 | 201 | 299 | $0.000070 |
| 2 | 1079 | 640 | 0 | 393 | 361 | $0.000113 |
| 3 | 1105 | 640 | 0 | 266 | 346 | $0.000091 |
| 4 | 1293 | 640 | 0 | 424 | 340 | $0.000127 |
| 5 | 1595 | 640 | 0 | 729 | 448 | $0.000193 |
| 6 | 1171 | 640 | 0 | 262 | 302 | $0.000093 |
| 7 | 1136 | 640 | 0 | 343 | 620 | $0.000106 |
| 8 | 1270 | 640 | 0 | 552 | 639 | $0.000149 |
| 9 | 1135 | 640 | 0 | 374 | 341 | $0.000112 |
| 10 | 1260 | 640 | 0 | 340 | 340 | $0.000110 |
| 11 | 1117 | 640 | 0 | 152 | 253 | $0.000071 |
| 12 | 1841 | 0 | 0 | 1169 | 678 | $0.000282 |
| 13 | 2290 | 640 | 0 | 1666 | 846 | $0.000389 |
| 14 | 1306 | 640 | 0 | 524 | 489 | $0.000145 |
| 15 | 1226 | 640 | 0 | 390 | 509 | $0.000118 |
| 16 | 1004 | 640 | 0 | 204 | 283 | $0.000076 |
