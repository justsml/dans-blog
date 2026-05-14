# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 5
- **Total input tokens**: 11292
- **Total output tokens**: 9332
- **Cache read tokens**: 1152
- **Cache write tokens**: 0
- **Total duration**: 56230ms
- **Estimated cost**: $0.004036 (local-openrouter-estimate)

## Article Summary
The article argues that effective search requires understanding the distinct roles of lexical (exact-match) and semantic (meaning-based) retrieval, rather than treating semantic vector search as a universal replacement. It explains how vector embeddings and proximity search (via pgvector, HNSW, and hybrid architectures using techniques like RRF) excel for RAG, intent-based queries, similarity search, and multilingual search—while lexical tools like Postgres FTS and BM25 remain essential for deterministic, term-matching use cases. Written as a technical analysis with a tutorial-like clarity for engineers making search decisions, the piece frames the key skill as knowing "which tool to reach for and why," using the recurring metaphor of a landscape where the most persuasive engineers understand the full spectrum.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1513 | 0 | 0 | 932 | 6022 | $0.000473 |
| 2 | 2067 | 384 | 0 | 3033 | 18558 | $0.001086 |
| 3 | 2324 | 384 | 0 | 1678 | 11061 | $0.000743 |
| 4 | 3527 | 0 | 0 | 2822 | 15183 | $0.001284 |
| 5 | 1861 | 384 | 0 | 867 | 5406 | $0.000451 |
