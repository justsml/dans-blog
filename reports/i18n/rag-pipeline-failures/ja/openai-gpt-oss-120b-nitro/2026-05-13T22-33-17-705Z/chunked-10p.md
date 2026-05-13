# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 6
- **Total input tokens**: 8382
- **Total output tokens**: 3546
- **Cache read tokens**: 3584
- **Cache write tokens**: 0
- **Total duration**: 3766ms
- **Estimated cost**: $0.000965 (local-openrouter-estimate)

## Article Summary
The article argues that Retrieval‑Augmented Generation (RAG) projects often look impressive in demos but collapse in production because a series of mundane implementation errors accumulate, leading to confidently wrong answers. It outlines five common failure modes—incorrect chunk sizing, stale embeddings, mis‑balancing precision versus recall, poorly arranged context windows, and inadequate prompt engineering—providing concrete fixes such as measuring chunk impact, re‑embedding on content change with fingerprints, using rerankers or hybrid search, and strategically ordering or labeling retrieved passages. The tone is a pragmatic, experience‑driven analysis aimed at engineers and product teams building RAG pipelines, using the recurring metaphor of “stacked boring mistakes” to frame the discussion.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1076 | 512 | 0 | 537 | 570 | $0.000139 |
| 2 | 1422 | 640 | 0 | 532 | 657 | $0.000151 |
| 3 | 1631 | 512 | 0 | 855 | 855 | $0.000218 |
| 4 | 1321 | 640 | 0 | 463 | 527 | $0.000135 |
| 5 | 1437 | 640 | 0 | 545 | 595 | $0.000154 |
| 6 | 1495 | 640 | 0 | 614 | 562 | $0.000169 |
