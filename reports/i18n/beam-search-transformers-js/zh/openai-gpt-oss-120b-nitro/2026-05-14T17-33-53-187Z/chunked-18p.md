# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 6478
- **Total output tokens**: 2404
- **Cache read tokens**: 1536
- **Cache write tokens**: 0
- **Total duration**: 6847ms
- **Estimated cost**: $0.000685 (local-openrouter-estimate)

## Article Summary
The article arguesthat the “num_beams” option in transformers.js was silently ignored, causing all models to fall back to greedy decoding, and walks the reader through a full implementation of true beam search—including standard, diverse, and sampling variants—tailored to the library’s architecture. It explains the core algorithmic steps (log‑softmax, cumulative scores, a two‑level sort over num_beams × vocab_size candidates) and highlights the hardest engineering hurdle: correctly reordering the transformer’s key‑value cache after each pruning step, with separate CPU and async‑GPU paths. The piece is written as a hands‑on tutorial, peppered with informal metaphors (“bounded breadth‑first search,” “the first word you say isn’t always the best start”) and occasional humor, aimed at JavaScript developers familiar with transformer models who need to extend or debug generation code.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1570 | 0 | 0 | 199 | 780 | $0.000097 |
| 2 | 1745 | 512 | 0 | 819 | 2130 | $0.000215 |
| 3 | 1613 | 512 | 0 | 782 | 1930 | $0.000204 |
| 4 | 1550 | 512 | 0 | 604 | 2007 | $0.000169 |
