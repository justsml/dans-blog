# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9377
- **Total output tokens**: 3170
- **Cache read tokens**: 3840
- **Cache write tokens**: 0
- **Total duration**: 9257ms
- **Estimated cost**: $0.000936 (local-openrouter-estimate)

## Article Summary
The articleargues that `transformers.js` has been silently falling back to greedy decoding because its `num_beams` parameter was never actually supported, and it walks the reader through a full implementation of true beam search—including standard, diverse, and sampling variants—to bring the library up to parity with the Python transformers reference. It explains the core technical challenges (ranking `num_beams × vocab_size` candidates, correctly reordering the KV‑cache after pruning, and managing completed hypotheses with a priority queue) and shows how the author solved them by computing log‑softmax directly, adding a cache‑reordering routine for both CPU and GPU tensors, and structuring diverse beam search as a sequential group process. The piece is written as a hands‑on tutorial aimed at JavaScript developers familiar with transformer models, using a light‑hearted “beam‑search as a bounded breadth‑first search” metaphor throughout.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1116 | 512 | 0 | 311 | 882 | $0.000100 |
| 2 | 1363 | 512 | 0 | 470 | 1255 | $0.000138 |
| 3 | 1421 | 512 | 0 | 541 | 1875 | $0.000153 |
| 4 | 1423 | 512 | 0 | 525 | 1442 | $0.000150 |
| 5 | 1398 | 512 | 0 | 445 | 1321 | $0.000135 |
| 6 | 1346 | 768 | 0 | 413 | 1141 | $0.000127 |
| 7 | 1310 | 512 | 0 | 465 | 1341 | $0.000135 |
