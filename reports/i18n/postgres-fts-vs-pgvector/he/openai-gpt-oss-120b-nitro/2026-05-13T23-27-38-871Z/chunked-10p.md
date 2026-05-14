# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 10
- **Total input tokens**: 17390
- **Total output tokens**: 9077
- **Cache read tokens**: 4352
- **Cache write tokens**: 0
- **Total duration**: 26149ms
- **Estimated cost**: $0.002312 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that PostgreSQL’s built‑in search tools—full‑text search (FTS), trigram matching (`pg_trgm`), and the newer `pgvector` extension—can often replace a separate vector database for many AI‑enhanced applications, and that choosing the right tool depends on the shape of the query rather than on “old vs. new” technology. It explains that FTS (lexical `tsvector` with GIN indexes) is ideal for exact‑term, keyword‑driven searches and Boolean filtering, while `pgvector` provides semantic similarity by storing embeddings for “meaning‑based” queries. The article highlights `pg_trgm` as a third, often‑overlooked option for fuzzy matching of short strings, typos, and autocomplete scenarios where neither pure lexical nor semantic search works well. The tone is a practical tutorial aimed at developers and DBAs who are evaluating search strategies for PostgreSQL‑backed applications. Recurring metaphors frame the tools as a “map” of search techniques, positioning each as suited to a particular “shape of the text” and “type of answer” needed.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1264 | 512 | 0 | 518 | 1549 | $0.000143 |
| 2 | 1556 | 512 | 0 | 689 | 2015 | $0.000185 |
| 3 | 1850 | 512 | 0 | 1125 | 3153 | $0.000275 |
| 4 | 1606 | 0 | 0 | 573 | 1507 | $0.000166 |
| 5 | 1599 | 768 | 0 | 724 | 2589 | $0.000193 |
| 6 | 1608 | 512 | 0 | 873 | 2724 | $0.000220 |
| 7 | 2034 | 512 | 0 | 1081 | 2813 | $0.000274 |
| 8 | 2934 | 512 | 0 | 2353 | 6615 | $0.000538 |
| 9 | 1727 | 512 | 0 | 884 | 2349 | $0.000226 |
| 10 | 1212 | 0 | 0 | 257 | 835 | $0.000094 |
