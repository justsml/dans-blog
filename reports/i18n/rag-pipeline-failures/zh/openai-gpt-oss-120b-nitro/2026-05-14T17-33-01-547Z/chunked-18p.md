# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 6073
- **Total output tokens**: 2482
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 9503ms
- **Estimated cost**: $0.000684 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that Retrieval‑Augmented Generation (RAG) projects often look impressive in demos but collapse in production because a series of small, overlooked mistakes accumulate. It outlines five common failure modes—incorrect chunk sizing, stale embeddings, mis‑balanced precision vs. recall, poorly arranged context windows, and inadequate prompt engineering—each illustrated with concrete code snippets and practical diagnostics (e.g., eval sets, fingerprint‑based re‑embedding, cross‑encoder reranking, hybrid BM25 + vector search, and strategic chunk ordering). The tone is a pragmatic, slightly rant‑like analysis aimed at engineers and product teams building enterprise RAG pipelines, using the recurring metaphor of “boring errors stacked together” to frame the discussion.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1336 | 512 | 0 | 639 | 1760 | $0.000167 |
| 2 | 1865 | 512 | 0 | 834 | 4203 | $0.000223 |
| 3 | 1804 | 512 | 0 | 826 | 2619 | $0.000219 |
| 4 | 1068 | 512 | 0 | 183 | 921 | $0.000075 |
