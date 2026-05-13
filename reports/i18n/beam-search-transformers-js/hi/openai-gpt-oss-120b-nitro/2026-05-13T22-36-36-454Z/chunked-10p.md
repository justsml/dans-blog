# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9193
- **Total output tokens**: 3765
- **Cache read tokens**: 4992
- **Cache write tokens**: 0
- **Total duration**: 4125ms
- **Estimated cost**: $0.001036 (local-openrouter-estimate)

## Article Summary
The articleargues that `transformers.js` has been silently falling back to greedy decoding because its `num_beams` parameter was never actually supported, and it walks the reader through a full implementation of true beam search—including standard, diverse, and sampling variants—to bring the library in line with the Python reference. It explains key technical hurdles such as correctly handling the `num_beams × vocab_size` candidate space, reordering the transformer’s key‑value cache after each pruning step, and managing completed hypotheses with a priority queue and length penalty. The piece is written as a hands‑on tutorial, peppered with informal metaphors (e.g., “breadth‑first search through token space,” “the first word you say isn’t always the best start”) and a light‑hearted tone that assumes the audience is developers familiar with JavaScript, transformer internals, and decoding algorithms.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1091 | 512 | 0 | 315 | 367 | $0.000099 |
| 2 | 1325 | 640 | 0 | 542 | 589 | $0.000149 |
| 3 | 1399 | 768 | 0 | 722 | 858 | $0.000185 |
| 4 | 1416 | 768 | 0 | 606 | 564 | $0.000164 |
| 5 | 1371 | 768 | 0 | 531 | 524 | $0.000149 |
| 6 | 1325 | 768 | 0 | 550 | 560 | $0.000151 |
| 7 | 1266 | 768 | 0 | 499 | 663 | $0.000139 |
