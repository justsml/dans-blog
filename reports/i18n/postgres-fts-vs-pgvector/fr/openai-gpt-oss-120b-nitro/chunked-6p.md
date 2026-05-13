# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 16
- **Total input tokens**: 21202
- **Total output tokens**: 8881
- **Cache read tokens**: 3456
- **Cache write tokens**: 0
- **Total duration**: 20747ms
- **Estimated cost**: $0.002425 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that PostgreSQL’s built‑in search tools—full‑text search (FTS), trigram matching (`pg_trgm`), and the newer `pgvector` extension—can often replace a separate vector database for many AI‑augmented applications, and that choosing the right tool depends on the shape of the query rather than on “old vs. new” technology. It explains that FTS (`tsvector` + GIN) is lexical, ideal for exact‑term, keyword‑driven queries, boolean filters, and deterministic ranking without any embedding infrastructure. `pg_trgm` provides fuzzy string matching for short strings, typos, autocomplete, and partial matches where lexical stemming fails. `pgvector` stores dense embeddings for semantic similarity, useful when the goal is to find documents that “mean” something rather than contain specific words. The tone is a practical tutorial aimed at developers and DBAs who are building search features in PostgreSQL‑centric stacks, using concrete SQL examples and a recurring metaphor of a “search tool map” that positions each technology by the type of text and desired answer.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 904 | 0 | 0 | 214 | 880 | $0.000074 |
| 2 | 1109 | 256 | 0 | 432 | 803 | $0.000121 |
| 3 | 1137 | 0 | 0 | 303 | 829 | $0.000099 |
| 4 | 1325 | 0 | 0 | 467 | 628 | $0.000136 |
| 5 | 1638 | 640 | 0 | 777 | 619 | $0.000204 |
| 6 | 1199 | 640 | 0 | 290 | 276 | $0.000099 |
| 7 | 1164 | 640 | 0 | 356 | 400 | $0.000109 |
| 8 | 1300 | 0 | 0 | 571 | 3267 | $0.000153 |
| 9 | 1165 | 0 | 0 | 386 | 2293 | $0.000115 |
| 10 | 1289 | 0 | 0 | 380 | 1753 | $0.000119 |
| 11 | 1154 | 0 | 0 | 166 | 908 | $0.000075 |
| 12 | 1871 | 640 | 0 | 1259 | 832 | $0.000300 |
| 13 | 2321 | 640 | 0 | 2057 | 1186 | $0.000461 |
| 14 | 1338 | 0 | 0 | 579 | 1464 | $0.000156 |
| 15 | 1257 | 0 | 0 | 407 | 1150 | $0.000122 |
| 16 | 1031 | 0 | 0 | 237 | 3459 | $0.000083 |
