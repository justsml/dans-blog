# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 10
- **Total input tokens**: 10424
- **Total output tokens**: 2983
- **Cache read tokens**: 2304
- **Cache write tokens**: 0
- **Total duration**: 11278ms
- **Estimated cost**: $0.000943 (local-openrouter-estimate)

## Article Summary
The article argues that production RAG pipelines look impressive in demos but routinely break down because five “boring” engineering oversights compound to deliver wrong answers. It walks through concrete failure modes—mis‑sized chunks, stale embeddings, the precision‑vs‑recall trade‑off in retrieval, poorly ordered context within the LLM’s window, and inadequate prompt structuring—showing code snippets and practical heuristics (overlapping chunks, fingerprint‑based re‑indexing, reranking or hybrid search, and strategic placement/labeling of retrieved passages). The tone is a pragmatic, mildly ranting analysis aimed at engineers and product teams building internal chat‑assistants or knowledge‑base bots, using the recurring metaphor of a “demo that looks great but collapses in production.”

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 817 | 256 | 0 | 185 | 901 | $0.000065 |
| 2 | 1096 | 256 | 0 | 370 | 1151 | $0.000109 |
| 3 | 1040 | 256 | 0 | 236 | 946 | $0.000083 |
| 4 | 1172 | 256 | 0 | 389 | 1325 | $0.000116 |
| 5 | 1126 | 0 | 0 | 441 | 1512 | $0.000123 |
| 6 | 996 | 256 | 0 | 191 | 694 | $0.000073 |
| 7 | 1042 | 256 | 0 | 338 | 1413 | $0.000101 |
| 8 | 1006 | 256 | 0 | 191 | 1048 | $0.000074 |
| 9 | 1203 | 256 | 0 | 447 | 1614 | $0.000127 |
| 10 | 926 | 256 | 0 | 195 | 674 | $0.000071 |
