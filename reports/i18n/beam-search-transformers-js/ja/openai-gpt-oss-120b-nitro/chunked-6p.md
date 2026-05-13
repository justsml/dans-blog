# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 12
- **Total input tokens**: 13977
- **Total output tokens**: 19612
- **Cache read tokens**: 7040
- **Cache write tokens**: 0
- **Total duration**: 12039ms
- **Estimated cost**: $0.004075 (local-openrouter-estimate)

## Article Summary
The article argues that `transformers.js` has been silently falling back to greedy decoding because its `num_beams` parameter was never actually supported, and it walks the reader through a full implementation of true beam search—including standard, diverse, and sampling variants—tailored to the library’s architecture. It explains key technical choices such as computing log‑softmax over the entire `num_beams × vocab_size` space, reordering the key‑value attention cache after each pruning step, and managing completed hypotheses with a priority queue that respects length penalties and early‑stopping rules. The piece is written as a hands‑on tutorial, peppered with informal metaphors (“bounded breadth‑first search,” “the most annoying bug”) to keep the tone approachable for JavaScript developers familiar with transformer models and eager to extend the generation pipeline.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 918 | 384 | 0 | 336 | 598 | $0.000096 |
| 2 | 1133 | 640 | 0 | 223 | 688 | $0.000084 |
| 3 | 1122 | 640 | 0 | 256 | 373 | $0.000090 |
| 4 | 1201 | 640 | 0 | 404 | 441 | $0.000120 |
| 5 | 1285 | 640 | 0 | 16000 | 4256 | $0.002930 |
| 6 | 1346 | 640 | 0 | 353 | 501 | $0.000116 |
| 7 | 1106 | 640 | 0 | 473 | 725 | $0.000128 |
| 8 | 1210 | 640 | 0 | 366 | 2189 | $0.000113 |
| 9 | 1179 | 640 | 0 | 333 | 405 | $0.000106 |
| 10 | 1198 | 640 | 0 | 283 | 640 | $0.000098 |
| 11 | 1244 | 640 | 0 | 476 | 526 | $0.000134 |
| 12 | 1035 | 256 | 0 | 109 | 697 | $0.000060 |
