# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 8939
- **Total output tokens**: 3138
- **Cache read tokens**: 4992
- **Cache write tokens**: 0
- **Total duration**: 3324ms
- **Estimated cost**: $0.000913 (local-openrouter-estimate)

## Article Summary
The article argues that `transformers.js` has been silently falling back to greedy decoding because its `num_beams` parameter was never actually supported, and it walks the reader through a full implementation of true beam search—including standard, diverse, and sampling variants—to bring the library in line with the Python reference. It explains key technical hurdles such as handling the full `num_beams × vocab_size` candidate space, correctly reordering the transformer’s key‑value cache after each pruning step, and managing completed hypotheses with a priority‑queue‑based `BeamHypotheses` structure. The piece is written as a hands‑on tutorial, peppered with informal metaphors (“bounded breadth‑first search,” “the most annoying bug”) and a light‑hearted tone that assumes the audience is developers familiar with JavaScript, transformer internals, and decoding algorithms.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1087 | 512 | 0 | 281 | 338 | $0.000093 |
| 2 | 1283 | 640 | 0 | 452 | 439 | $0.000131 |
| 3 | 1363 | 768 | 0 | 536 | 524 | $0.000150 |
| 4 | 1366 | 768 | 0 | 504 | 469 | $0.000144 |
| 5 | 1340 | 768 | 0 | 436 | 390 | $0.000131 |
| 6 | 1267 | 768 | 0 | 440 | 427 | $0.000129 |
| 7 | 1233 | 768 | 0 | 489 | 737 | $0.000136 |
