# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 6
- **Total input tokens**: 12735
- **Total output tokens**: 9163
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 52408ms
- **Estimated cost**: $0.004243 (local-openrouter-estimate)

## Article Summary
The article argues that teams adding AI features should first leverage PostgreSQL's built-in search tools—full-text search (FTS), `pg_trgm` for fuzzy string matching, and `pgvector` for semantic vector search—instead of prematurely adopting dedicated vector databases like Pinecone or Qdrant, which introduce extra dependencies and synchronization bugs. It presents a practical, tutorial-style comparison: FTS excels at lexical keyword and exact-match queries (e.g., SKUs, error codes), `pg_trgm` handles fuzzy matching for names/typos, and `pgvector` provides semantic similarity for meaning-based retrieval. The recurring metaphor of “pushing the first search system hard” and the tool-selection map emphasize choosing based on text shape and query intent. The intended audience is developers and backend engineers building search/AI features who need guidance on when to use each PostgreSQL capability before adding external services.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1465 | 0 | 0 | 2192 | 12522 | $0.000819 |
| 2 | 2270 | 0 | 0 | 1373 | 8113 | $0.000702 |
| 3 | 2056 | 0 | 0 | 1109 | 6159 | $0.000598 |
| 4 | 2580 | 0 | 0 | 1715 | 9523 | $0.000841 |
| 5 | 3187 | 384 | 0 | 2382 | 12891 | $0.001060 |
| 6 | 1177 | 384 | 0 | 392 | 3200 | $0.000222 |
