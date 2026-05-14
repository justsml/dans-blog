# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 6
- **Total input tokens**: 7910
- **Total output tokens**: 2886
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 9171ms
- **Estimated cost**: $0.000828 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that Retrieval‑Augmented Generation (RAG) projects often look impressive in demos but collapse in production because a series of mundane implementation errors accumulate. It outlines five common failure modes—incorrect chunk sizing, stale embeddings, mis‑balancing precision versus recall, poorly shaped context windows, and inadequate prompt engineering—and provides concrete, code‑level remedies such as overlapping chunks, fingerprint‑based re‑embedding, cross‑encoder reranking, hybrid vector‑keyword search, and strategic ordering/labeling of retrieved passages. The tone is a pragmatic, “post‑mortem” analysis aimed at engineers and product teams building enterprise‑grade RAG pipelines, using the recurring metaphor of “stacked boring mistakes” to frame each technical pitfall.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1100 | 512 | 0 | 401 | 1095 | $0.000115 |
| 2 | 1288 | 512 | 0 | 408 | 1879 | $0.000124 |
| 3 | 1500 | 512 | 0 | 713 | 1903 | $0.000187 |
| 4 | 1306 | 0 | 0 | 392 | 1230 | $0.000121 |
| 5 | 1332 | 0 | 0 | 452 | 1516 | $0.000133 |
| 6 | 1384 | 512 | 0 | 520 | 1548 | $0.000148 |
