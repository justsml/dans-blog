# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 10
- **Total input tokens**: 16503
- **Total output tokens**: 8491
- **Cache read tokens**: 5632
- **Cache write tokens**: 0
- **Total duration**: 22296ms
- **Estimated cost**: $0.002172 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that PostgreSQL already provides three complementary search tools—full‑text search (`tsvector`/GIN), trigram matching (`pg_trgm`), and semantic vector search (`pgvector`)—so teams should evaluate them before adding a separate vector database. It explains that full‑text search is lexical, ideal for exact‑term queries, keyword filters, and deterministic ranking without extra infrastructure; `pg_trgm` handles fuzzy matching of short strings, typos, and autocomplete; and `pgvector` offers semantic similarity for meaning‑based retrieval. The piece is written as a practical tutorial for developers and DBAs who are building search features in PostgreSQL‑based applications, using clear code snippets and a “search‑tool map” metaphor to frame the three techniques as points on a continuum rather than competing technologies.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1194 | 512 | 0 | 512 | 1321 | $0.000139 |
| 2 | 1461 | 512 | 0 | 656 | 1843 | $0.000175 |
| 3 | 1770 | 512 | 0 | 1029 | 2417 | $0.000254 |
| 4 | 1512 | 512 | 0 | 544 | 1767 | $0.000157 |
| 5 | 1520 | 512 | 0 | 703 | 1703 | $0.000186 |
| 6 | 1516 | 512 | 0 | 741 | 2261 | $0.000193 |
| 7 | 1932 | 768 | 0 | 1025 | 2454 | $0.000260 |
| 8 | 2844 | 512 | 0 | 2270 | 5397 | $0.000520 |
| 9 | 1630 | 512 | 0 | 766 | 1987 | $0.000201 |
| 10 | 1124 | 768 | 0 | 245 | 1146 | $0.000088 |
