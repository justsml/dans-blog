# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9107
- **Total output tokens**: 13605
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 30837ms
- **Estimated cost**: $0.003994 (local-openrouter-estimate)

## Article Summary
The article details the implementation of beam search in the `transformers.js` library, addressing a long-standing bug where models incorrectly used greedy decoding instead of beam search when `num_beams

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 901 | 0 | 0 | 1382 | 3286 | $0.000404 |
| 2 | 1349 | 0 | 0 | 2493 | 5267 | $0.000706 |
| 3 | 1435 | 0 | 0 | 2034 | 4900 | $0.000603 |
| 4 | 1428 | 512 | 0 | 2173 | 5160 | $0.000636 |
| 5 | 1319 | 0 | 0 | 1505 | 3641 | $0.000467 |
| 6 | 1343 | 512 | 0 | 2367 | 4999 | $0.000676 |
| 7 | 1332 | 0 | 0 | 1651 | 3584 | $0.000503 |
