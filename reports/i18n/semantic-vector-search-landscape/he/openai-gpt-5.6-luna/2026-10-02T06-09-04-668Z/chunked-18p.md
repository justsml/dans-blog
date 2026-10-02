# Chunked Translation Report

- **Model**: openai/gpt-5.6-luna
- **Chunk size**: 18p
- **Total chunks**: 5
- **Total input tokens**: 12916
- **Total output tokens**: 8783
- **Cache read tokens**: 3234
- **Cache write tokens**: 9667
- **Total duration**: 92680ms
- **Estimated cost**: $0.012541 (openrouter-2026-09-22)

## Article Summary
The article argues that semantic/vector search is one layer of search, not a replacement for exact-match, lexical, or fuzzy search, and that effective systems usually combine these approaches in a hybrid architecture. It explains embeddings, vectors, lexical search, FTS, and BM25, then compares 16 technologies—including pgvector, Qdrant, Weaviate, Pinecone, Milvus, Elasticsearch, OpenSearch, Vespa, and others—by deployment model, licensing, capabilities, and workload fit. The intended audience is engineers and technical decision-makers choosing search infrastructure, with emphasis on understanding when vectors add value and when they should stay out of the way. The tone is practical and analytical with a lightly playful framing around “winning” technical arguments and choosing the right tool.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2916 | 0 | 2913 | 2365 | 23772 | $0.003421 |
| 2 | 2409 | 1078 | 1328 | 1420 | 15643 | $0.001992 |
| 3 | 2584 | 0 | 2581 | 1489 | 15468 | $0.002304 |
| 4 | 2814 | 1078 | 1733 | 2163 | 24116 | $0.002964 |
| 5 | 2193 | 1078 | 1112 | 1346 | 13681 | $0.001860 |
