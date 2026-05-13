# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 12
- **Total input tokens**: 12888
- **Total output tokens**: 3330
- **Cache read tokens**: 3072
- **Cache write tokens**: 0
- **Total duration**: 12891ms
- **Estimated cost**: $0.001102 (local-openrouter-estimate)

## Article Summary
The articleargues that the long‑standing “num_beams” flag in transformers.js was effectively a lie—models defaulted to greedy decoding because beam search was never implemented. It walks through the core concepts of beam, diverse beam, and beam‑sampling search, then details the engineering challenges of adding a correct implementation: handling the full num_beams × vocab‑size candidate space, reordering the transformer’s key‑value cache after each pruning step, and managing encoder‑decoder cache differences. The author describes the final design—computing log‑softmax directly, a custom `_reorder_cache` routine for both CPU and GPU tensors, and a priority‑queue‑based `BeamHypotheses` manager—while emphasizing the sequential nature of diverse‑beam scoring. The piece is a hands‑on tutorial aimed at JavaScript developers familiar with the Hugging Face Transformers library who need to extend or debug generation code. It uses a light‑hearted, “debug‑hunt” tone with metaphors of “breadth‑first search” and “pruning” to frame the technical narrative.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 965 | 256 | 0 | 265 | 1117 | $0.000085 |
| 2 | 1046 | 256 | 0 | 168 | 780 | $0.000071 |
| 3 | 1082 | 256 | 0 | 196 | 1059 | $0.000077 |
| 4 | 1120 | 256 | 0 | 304 | 1025 | $0.000098 |
| 5 | 1154 | 512 | 0 | 416 | 1126 | $0.000120 |
| 6 | 1091 | 0 | 0 | 284 | 754 | $0.000094 |
| 7 | 1113 | 0 | 0 | 369 | 1912 | $0.000110 |
| 8 | 1109 | 0 | 0 | 317 | 916 | $0.000100 |
| 9 | 1077 | 256 | 0 | 221 | 716 | $0.000082 |
| 10 | 1063 | 256 | 0 | 218 | 663 | $0.000081 |
| 11 | 1116 | 512 | 0 | 406 | 1307 | $0.000117 |
| 12 | 952 | 512 | 0 | 166 | 1516 | $0.000067 |
