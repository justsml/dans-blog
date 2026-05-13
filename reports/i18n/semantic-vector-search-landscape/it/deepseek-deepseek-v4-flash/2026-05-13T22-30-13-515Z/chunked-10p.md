# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 9
- **Total input tokens**: 14290
- **Total output tokens**: 16092
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 226289ms
- **Estimated cost**: $0.006401 (local-openrouter-estimate)

## Article Summary
The article argues that semantic vector search is not a universal replacement for lexical search; effective search systems require understanding when to use each tool. It explains that vector embeddings enable meaning-based matching (e.g., for RAG, multilingual search, and similarity) while lexical methods like `tsvector` and BM25 handle exact-match and keyword queries. The intended audience is engineers making search architecture decisions, and the tone is analytical and tutorial, with a recurring framing of “search is not one thing” and the need for hybrid architectures.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1122 | 0 | 0 | 1717 | 10273 | $0.000638 |
| 2 | 1353 | 0 | 0 | 856 | 8410 | $0.000429 |
| 3 | 1470 | 0 | 0 | 2394 | 12573 | $0.000876 |
| 4 | 1310 | 0 | 0 | 995 | 34078 | $0.000462 |
| 5 | 1856 | 0 | 0 | 2263 | 18655 | $0.000893 |
| 6 | 1441 | 0 | 0 | 961 | 5367 | $0.000471 |
| 7 | 3015 | 0 | 0 | 2837 | 116145 | $0.001216 |
| 8 | 1518 | 384 | 0 | 2426 | 12396 | $0.000839 |
| 9 | 1205 | 384 | 0 | 1643 | 8392 | $0.000576 |
