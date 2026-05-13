# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 6
- **Total input tokens**: 7772
- **Total output tokens**: 3072
- **Cache read tokens**: 3584
- **Cache write tokens**: 0
- **Total duration**: 4949ms
- **Estimated cost**: $0.000856 (local-openrouter-estimate)

## Article Summary
The article argues that Retrieval‑Augmented Generation (RAG) often looks impressive in demos but collapses in production because a series of mundane implementation mistakes accumulate, leading to confidently wrong answers. It outlines five common failure modes—incorrect chunk sizing, stale embeddings, mis‑balancing precision versus recall, poorly arranged context windows, and inadequate prompt engineering—showing how each subtly degrades answer quality and offering concrete fixes such as overlap‑based chunking, incremental re‑embedding with content fingerprints, reranking or hybrid search, strategic placement and labeling of retrieved passages, and prompt‑level guardrails. The tone is a pragmatic, experience‑driven analysis aimed at engineers and product teams building RAG pipelines, using the recurring metaphor of “stacked boring mistakes” to frame the pitfalls.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1091 | 512 | 0 | 420 | 532 | $0.000118 |
| 2 | 1262 | 640 | 0 | 440 | 550 | $0.000128 |
| 3 | 1479 | 640 | 0 | 818 | 701 | $0.000205 |
| 4 | 1283 | 640 | 0 | 432 | 1401 | $0.000128 |
| 5 | 1299 | 512 | 0 | 452 | 785 | $0.000132 |
| 6 | 1358 | 640 | 0 | 510 | 980 | $0.000145 |
