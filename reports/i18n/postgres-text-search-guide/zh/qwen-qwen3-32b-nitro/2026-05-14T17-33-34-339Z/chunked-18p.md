# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 11081
- **Total output tokens**: 9811
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 18893ms
- **Estimated cost**: $0.003241 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL's native search tools—full-text search (`tsvector`/`GIN`), trigrams (`pg_trgm`), and exact-match indexes—should be used strategically based on query requirements, not as interchangeable solutions. Full-text search excels for lexical analysis (e.g., articles, logs), trigrams for fuzzy matching (e.g., typos, autocomplete), and exact-match indexes for binary matches (e.g., IDs, SKUs). The core thesis emphasizes avoiding overcomplicated external search services by leveraging Postgres' built-in capabilities tailored to input types and query intent. The tone is analytical and tutorial, using metaphors like "input shape" and a visual tool map to frame decision-making. Targeted at developers and teams managing search in PostgreSQL, it advocates for hybrid, tool-specific approaches to reduce complexity.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 3551 | 0 | 0 | 3545 | 6755 | $0.001135 |
| 2 | 1692 | 512 | 0 | 1336 | 2805 | $0.000456 |
| 3 | 2232 | 512 | 0 | 1786 | 3495 | $0.000607 |
| 4 | 3606 | 0 | 0 | 3144 | 5838 | $0.001043 |
