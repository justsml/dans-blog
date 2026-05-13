# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9959
- **Total output tokens**: 4230
- **Cache read tokens**: 3584
- **Cache write tokens**: 0
- **Total duration**: 4587ms
- **Estimated cost**: $0.001150 (local-openrouter-estimate)

## Article Summary
The articleargues that `transformers.js` has been silently falling back to greedy decoding because its `num_beams` parameter was never actually supported, and it walks the reader through a full implementation of proper beam search—including standard, diverse, and sampling variants—while exposing the pitfalls of re‑using the existing `BeamSearchSampler` class. It details the core technical challenges: correctly handling the `num_beams × vocab_size` candidate space, reordering the transformer’s key‑value cache after each pruning step, and managing the `BeamHypotheses` priority queue with length penalties and early‑stopping logic. The piece is written as a hands‑on tutorial for JavaScript developers familiar with the Hugging Face transformers ecosystem, using metaphors like “breadth‑first search through token space” and “diversity penalty” to frame the algorithmic choices.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1101 | 0 | 0 | 362 | 474 | $0.000108 |
| 2 | 1445 | 512 | 0 | 672 | 675 | $0.000177 |
| 3 | 1535 | 768 | 0 | 775 | 888 | $0.000199 |
| 4 | 1531 | 0 | 0 | 674 | 650 | $0.000181 |
| 5 | 1480 | 768 | 0 | 543 | 667 | $0.000155 |
| 6 | 1431 | 768 | 0 | 636 | 661 | $0.000170 |
| 7 | 1436 | 768 | 0 | 568 | 572 | $0.000158 |
