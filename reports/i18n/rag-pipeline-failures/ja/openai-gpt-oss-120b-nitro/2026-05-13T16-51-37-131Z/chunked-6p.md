# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 10
- **Total input tokens**: 11294
- **Total output tokens**: 3747
- **Cache read tokens**: 4224
- **Cache write tokens**: 0
- **Total duration**: 6763ms
- **Estimated cost**: $0.001115 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that Retrieval‑Augmented Generation (RAG) projects often look impressive in demos but collapse in production because a series of mundane engineering oversights accumulate. It outlines five common failure modes—incorrect chunk sizing, stale embeddings, mismatched precision‑recall trade‑offs, poorly arranged context windows, and inadequate prompt‑engineering—and offers concrete, code‑level fixes such as overlapping chunks, content fingerprinting for incremental re‑indexing, cross‑encoder reranking or hybrid vector‑keyword search, and strategic ordering/labeling of retrieved passages. The tone is a pragmatic, “post‑mortem” analysis aimed at engineers and product teams building enterprise‑grade RAG pipelines, using the recurring metaphor of “stacked boring mistakes” to frame the discussion.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 818 | 384 | 0 | 250 | 462 | $0.000077 |
| 2 | 1217 | 512 | 0 | 457 | 524 | $0.000130 |
| 3 | 1214 | 512 | 0 | 274 | 343 | $0.000097 |
| 4 | 1308 | 512 | 0 | 609 | 773 | $0.000161 |
| 5 | 1223 | 512 | 0 | 504 | 523 | $0.000138 |
| 6 | 1048 | 512 | 0 | 210 | 460 | $0.000079 |
| 7 | 1117 | 512 | 0 | 475 | 502 | $0.000129 |
| 8 | 1133 | 256 | 0 | 233 | 1062 | $0.000086 |
| 9 | 1284 | 256 | 0 | 492 | 1387 | $0.000139 |
| 10 | 932 | 256 | 0 | 243 | 727 | $0.000080 |
