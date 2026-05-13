# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 12
- **Total input tokens**: 12897
- **Total output tokens**: 3291
- **Cache read tokens**: 3072
- **Cache write tokens**: 0
- **Total duration**: 12712ms
- **Estimated cost**: $0.001095 (local-openrouter-estimate)

## Article Summary
The article argues that `transformers.js` has been silently falling back to greedy decoding because its `num_beams` parameter was never actually implemented, and it walks the reader through a full, production‑ready beam‑search implementation. It explains the mathematics of standard, diverse, and sampled beam search, then details the architectural choices the author made—replacing the inadequate `BeamSearchSampler` with a direct `log_softmax` + cumulative‑score sort, and fixing the crucial KV‑cache reordering (including async GPU handling) to keep attention states consistent across beam pruning. The piece also covers auxiliary components such as the `BeamHypotheses` priority queue, length‑penalty scoring, and the sequential processing required for diverse beam search. Written as a hands‑on tutorial for JavaScript developers familiar with transformer inference (especially those migrating from Python), the tone is pragmatic and slightly self‑deprecating, using metaphors like “breadth‑first search through token space” and “the first word you say isn’t always the best start.”

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 961 | 0 | 0 | 263 | 782 | $0.000085 |
| 2 | 1041 | 256 | 0 | 177 | 920 | $0.000072 |
| 3 | 1078 | 256 | 0 | 189 | 744 | $0.000076 |
| 4 | 1122 | 256 | 0 | 313 | 1931 | $0.000100 |
| 5 | 1143 | 0 | 0 | 401 | 2145 | $0.000117 |
| 6 | 1091 | 512 | 0 | 299 | 856 | $0.000096 |
| 7 | 1112 | 256 | 0 | 367 | 1103 | $0.000109 |
| 8 | 1116 | 512 | 0 | 291 | 925 | $0.000096 |
| 9 | 1088 | 256 | 0 | 240 | 683 | $0.000086 |
| 10 | 1064 | 256 | 0 | 227 | 874 | $0.000082 |
| 11 | 1124 | 256 | 0 | 361 | 1048 | $0.000109 |
| 12 | 957 | 256 | 0 | 163 | 701 | $0.000067 |
