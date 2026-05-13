# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 12
- **Total input tokens**: 12801
- **Total output tokens**: 3324
- **Cache read tokens**: 3328
- **Cache write tokens**: 0
- **Total duration**: 12719ms
- **Estimated cost**: $0.001098 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article explains how the author discovered and fixed the missing beam‑search implementation in *transformers.js*, where models with `num_beams > 1` were unintentionally falling back to greedy decoding. It walks through the theory of beam search (standard, diverse, and sampling variants), then details the architectural choices required to implement it correctly—most notably computing full `num_beams × vocab_size` candidate scores instead of reusing the existing `BeamSearchSampler`. A large portion of the piece is devoted to the tricky KV‑cache reordering needed when beams are pruned, including separate handling for encoder‑decoder models and both CPU and GPU tensor paths. The author also describes the implementation of diverse beam search (sequential group processing with a diversity penalty) and the `BeamHypotheses` priority‑queue that manages completed sequences. The tone is a hands‑on tutorial aimed at JavaScript developers familiar with transformer inference and the Hugging Face ecosystem.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 946 | 256 | 0 | 255 | 692 | $0.000083 |
| 2 | 1046 | 0 | 0 | 168 | 590 | $0.000071 |
| 3 | 1062 | 256 | 0 | 202 | 769 | $0.000078 |
| 4 | 1112 | 256 | 0 | 328 | 957 | $0.000102 |
| 5 | 1147 | 256 | 0 | 425 | 1410 | $0.000121 |
| 6 | 1103 | 256 | 0 | 284 | 877 | $0.000094 |
| 7 | 1099 | 256 | 0 | 353 | 2027 | $0.000106 |
| 8 | 1095 | 256 | 0 | 292 | 1098 | $0.000095 |
| 9 | 1069 | 512 | 0 | 246 | 1679 | $0.000086 |
| 10 | 1055 | 256 | 0 | 224 | 1006 | $0.000081 |
| 11 | 1120 | 512 | 0 | 447 | 1200 | $0.000124 |
| 12 | 947 | 256 | 0 | 100 | 414 | $0.000055 |
