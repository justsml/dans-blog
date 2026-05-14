# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9854
- **Total output tokens**: 2859
- **Cache read tokens**: 3072
- **Cache write tokens**: 0
- **Total duration**: 8603ms
- **Estimated cost**: $0.000899 (local-openrouter-estimate)

## Article Summary
The article argues that the long‑standing “TODO: Support beam search” comment in transformers.js meant that every model configured with `num_beams > 1` was silently falling back to greedy decoding, producing sub‑optimal outputs compared to the Python library. It walks through a hands‑on implementation of true beam search—including standard, diverse, and sampling variants—by computing full `num_beams × vocab_size` log‑probability scores, fixing the crucial KV‑cache reordering bug, and adding a priority‑queue‑based `BeamHypotheses` handler with length‑penalty and early‑stopping logic. The piece is a technical tutorial aimed at JavaScript/TypeScript developers working with the transformers.js library, using concrete code snippets and a “debug‑the‑bug” narrative as its framing device.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1101 | 512 | 0 | 247 | 947 | $0.000087 |
| 2 | 1419 | 512 | 0 | 427 | 1124 | $0.000132 |
| 3 | 1525 | 512 | 0 | 477 | 1677 | $0.000145 |
| 4 | 1501 | 512 | 0 | 473 | 1327 | $0.000144 |
| 5 | 1453 | 512 | 0 | 399 | 1043 | $0.000128 |
| 6 | 1427 | 0 | 0 | 405 | 1050 | $0.000129 |
| 7 | 1428 | 512 | 0 | 431 | 1435 | $0.000133 |
