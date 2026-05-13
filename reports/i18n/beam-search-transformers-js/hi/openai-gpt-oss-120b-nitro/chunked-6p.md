# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 12
- **Total input tokens**: 13002
- **Total output tokens**: 3773
- **Cache read tokens**: 3712
- **Cache write tokens**: 0
- **Total duration**: 12898ms
- **Estimated cost**: $0.001186 (local-openrouter-estimate)

## Article Summary
The article argues that the long‑standing “TODO: Support beam search” comment in transformers.js meant that every model configured with `num_beams > 1` was silently falling back to greedy decoding, producing sub‑par results compared to the Python library. It walks through a hands‑on implementation of true beam search—including standard, diverse, and sampling variants—by computing full `num_beams × vocab_size` log‑probability candidates, fixing the crucial KV‑cache reordering, and adding a priority‑queue‑based `BeamHypotheses` handler for early stopping and length penalties. The tone is a pragmatic tutorial‑style post, peppered with analogies (“bounded breadth‑first search”, “diverse beams as different conversation groups”) and warnings about tempting shortcuts. The intended audience is JavaScript developers working with the transformers.js library who need a correct, performant beam‑search implementation for encoder‑decoder and decoder‑only models.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 943 | 384 | 0 | 289 | 355 | $0.000089 |
| 2 | 1064 | 256 | 0 | 191 | 796 | $0.000076 |
| 3 | 1089 | 256 | 0 | 219 | 1046 | $0.000082 |
| 4 | 1136 | 256 | 0 | 358 | 1337 | $0.000109 |
| 5 | 1162 | 256 | 0 | 501 | 1286 | $0.000135 |
| 6 | 1111 | 256 | 0 | 342 | 1124 | $0.000105 |
| 7 | 1105 | 512 | 0 | 425 | 1245 | $0.000120 |
| 8 | 1125 | 256 | 0 | 380 | 1135 | $0.000112 |
| 9 | 1107 | 256 | 0 | 299 | 1507 | $0.000097 |
| 10 | 1079 | 256 | 0 | 252 | 1179 | $0.000087 |
| 11 | 1117 | 256 | 0 | 411 | 1028 | $0.000118 |
| 12 | 964 | 512 | 0 | 106 | 860 | $0.000057 |
