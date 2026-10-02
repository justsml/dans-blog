# Chunked Translation Report

- **Model**: openai/gpt-5.6-luna
- **Chunk size**: 18p
- **Total chunks**: 5
- **Total input tokens**: 13960
- **Total output tokens**: 9553
- **Cache read tokens**: 3690
- **Cache write tokens**: 10255
- **Total duration**: 98802ms
- **Estimated cost**: $0.013591 (openrouter-2026-09-22)

## Article Summary
The article argues that semantic/vector search is one part of a broader search strategy, not a replacement for exact-match, lexical, or fuzzy search; effective systems often combine these methods in hybrid architectures. It explains embeddings, vectors, semantic similarity, and technologies such as pgvector, Qdrant, Weaviate, Pinecone, Milvus, Elasticsearch, and other vector databases, comparing their deployment models, licensing, interfaces, and workload fit. Written as a practical technical guide with analytical comparisons, it emphasizes choosing tools according to the problem—deterministic lookup versus relevance-based discovery—rather than “embedding everything.” The intended audience is engineers and architects making search-system decisions, with a recurring framing device contrasting simple exact queries with ambiguous meaning-oriented searches and stressing the ability to explain and defend those choices.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 3068 | 0 | 3065 | 2571 | 25745 | $0.003699 |
| 2 | 2666 | 0 | 2663 | 1563 | 16852 | $0.002409 |
| 3 | 2754 | 1230 | 1521 | 1582 | 15878 | $0.002228 |
| 4 | 3028 | 1230 | 1795 | 2371 | 25516 | $0.003229 |
| 5 | 2444 | 1230 | 1211 | 1466 | 14811 | $0.002027 |
