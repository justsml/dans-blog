# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9507
- **Total output tokens**: 3360
- **Cache read tokens**: 3584
- **Cache write tokens**: 0
- **Total duration**: 10224ms
- **Estimated cost**: $0.000976 (local-openrouter-estimate)

## Article Summary
The article argues that `transformers.js` has been silently falling back to greedy decoding because its `num_beams` parameter was never actually supported, and it walks the reader through a full implementation of true beam search—including standard, diverse, and sampling variants—to bring the library in line with the Python reference. It details the core technical challenges: correctly handling the `num_beams × vocab_size` candidate space, reordering the transformer’s key‑value cache after each pruning step, and managing completed hypotheses with a priority queue and length penalty. The piece is written as a hands‑on tutorial, peppered with informal metaphors (e.g., “breadth‑first search through token space,” “the first word you say isn’t always the best start”) to keep the tone conversational while remaining technically rigorous. The intended audience is JavaScript developers familiar with transformer models who need to extend or debug generation code in `transformers.js`.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1121 | 512 | 0 | 314 | 967 | $0.000100 |
| 2 | 1382 | 512 | 0 | 532 | 1835 | $0.000150 |
| 3 | 1445 | 512 | 0 | 592 | 1491 | $0.000163 |
| 4 | 1453 | 512 | 0 | 530 | 1626 | $0.000152 |
| 5 | 1415 | 512 | 0 | 489 | 1357 | $0.000143 |
| 6 | 1362 | 512 | 0 | 465 | 1231 | $0.000137 |
| 7 | 1329 | 512 | 0 | 438 | 1717 | $0.000131 |
