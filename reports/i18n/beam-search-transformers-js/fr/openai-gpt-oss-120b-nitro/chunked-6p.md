# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 12
- **Total input tokens**: 12395
- **Total output tokens**: 3490
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 20988ms
- **Estimated cost**: $0.001112 (local-openrouter-estimate)

## Article Summary
The article argues that `transformers.js` has been silently falling back to greedy decoding because its `num_beams` flag was never implemented, and it walks readers through a full, production‑ready beam‑search implementation to fix the bug. It explains the mathematics of standard, diverse, and sampling‑based beam search, then details the engineering hurdles—especially the need to reorder the transformer’s key‑value cache and to manage separate encoder/decoder caches—while showing how the author rewrote the scorer, added async/CPU‑specific tensor indexing, and built a `BeamHypotheses` priority queue with length‑penalty and early‑stopping logic. The tone is a hands‑on tutorial aimed at JavaScript developers familiar with the Hugging Face Transformers ecosystem, peppered with metaphors like “bounded breadth‑first search” and jokes about “Max’s probs” to keep the exposition lively.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 923 | 0 | 0 | 286 | 2120 | $0.000087 |
| 2 | 1007 | 0 | 0 | 185 | 1158 | $0.000073 |
| 3 | 1027 | 0 | 0 | 203 | 1872 | $0.000077 |
| 4 | 1075 | 0 | 0 | 308 | 1473 | $0.000097 |
| 5 | 1115 | 0 | 0 | 432 | 2765 | $0.000121 |
| 6 | 1059 | 0 | 0 | 303 | 1281 | $0.000096 |
| 7 | 1075 | 0 | 0 | 359 | 2088 | $0.000107 |
| 8 | 1066 | 0 | 0 | 320 | 1741 | $0.000099 |
| 9 | 1041 | 0 | 0 | 257 | 1026 | $0.000087 |
| 10 | 1012 | 0 | 0 | 228 | 1424 | $0.000081 |
| 11 | 1084 | 0 | 0 | 362 | 2303 | $0.000107 |
| 12 | 911 | 0 | 0 | 247 | 1737 | $0.000080 |
