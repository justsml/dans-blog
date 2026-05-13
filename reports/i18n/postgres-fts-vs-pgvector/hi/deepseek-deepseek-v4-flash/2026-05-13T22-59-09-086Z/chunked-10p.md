# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 10
- **Total input tokens**: 16821
- **Total output tokens**: 26511
- **Cache read tokens**: 1920
- **Cache write tokens**: 0
- **Total duration**: 183781ms
- **Estimated cost**: $0.009515 (local-openrouter-estimate)

## Article Summary
The article argues that teams adding AI features often prematurely adopt dedicated vector databases like Pinecone or Weaviate, when PostgreSQL already provides robust search tools: full-text search (FTS) for lexical term matching, `pgvector` for semantic similarity, and `pg_trgm` for fuzzy string matching. It contrasts FTS (tokenizing and stemming words) with vector search (embedding meaning), and highlights `pg_trgm` as a middle ground for handling typos, names, and short strings that neither FTS nor vector search handles well. The tone is a practical tutorial with SQL examples, aimed at developers evaluating search solutions. The recurring framing is that most applications don't need a separate vector store until they hit large scale, and that Postgres’ built-in tools can cover many use cases without added complexity.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1145 | 0 | 0 | 2863 | 17046 | $0.000962 |
| 2 | 1511 | 0 | 0 | 2699 | 12892 | $0.000967 |
| 3 | 1782 | 0 | 0 | 1987 | 9895 | $0.000806 |
| 4 | 1554 | 384 | 0 | 1229 | 7125 | $0.000509 |
| 5 | 1521 | 384 | 0 | 2585 | 12687 | $0.000884 |
| 6 | 1547 | 0 | 0 | 2038 | 9663 | $0.000787 |
| 7 | 2019 | 384 | 0 | 3966 | 17783 | $0.001340 |
| 8 | 2901 | 384 | 0 | 4477 | 33958 | $0.001607 |
| 9 | 1686 | 384 | 0 | 3583 | 19033 | $0.001187 |
| 10 | 1155 | 0 | 0 | 1084 | 43699 | $0.000465 |
