# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 12
- **Total input tokens**: 12201
- **Total output tokens**: 3159
- **Cache read tokens**: 6656
- **Cache write tokens**: 0
- **Total duration**: 6192ms
- **Estimated cost**: $0.001044 (local-openrouter-estimate)

## Article Summary
Thearticle argues that the long‑standing “num_beams” flag in transformers.js was effectively a lie—its generation loop always fell back to greedy decoding, producing sub‑optimal outputs compared to the Python library. It explains the fundamentals of beam search (standard, diverse, and sampling variants), then details the author’s implementation choices: computing full log‑softmax over the entire num_beams × vocab space, reordering the key‑value cache correctly for both CPU and GPU tensors, and managing completed hypotheses with a priority queue. The piece is a hands‑on tutorial aimed at JavaScript developers working on transformer inference, written in an informal, anecdotal tone that repeatedly uses “search” metaphors (e.g., “bounded breadth‑first search,” “reordering the cache”) to frame the challenges.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 910 | 0 | 0 | 257 | 652 | $0.000082 |
| 2 | 987 | 512 | 0 | 173 | 276 | $0.000070 |
| 3 | 1022 | 384 | 0 | 179 | 1114 | $0.000072 |
| 4 | 1064 | 640 | 0 | 277 | 399 | $0.000091 |
| 5 | 1094 | 640 | 0 | 372 | 942 | $0.000110 |
| 6 | 1033 | 640 | 0 | 269 | 381 | $0.000089 |
| 7 | 1057 | 640 | 0 | 319 | 338 | $0.000099 |
| 8 | 1049 | 640 | 0 | 294 | 292 | $0.000094 |
| 9 | 1023 | 640 | 0 | 223 | 745 | $0.000080 |
| 10 | 1001 | 640 | 0 | 204 | 254 | $0.000076 |
| 11 | 1067 | 640 | 0 | 367 | 348 | $0.000108 |
| 12 | 894 | 640 | 0 | 225 | 451 | $0.000075 |
