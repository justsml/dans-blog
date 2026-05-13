# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9442
- **Total output tokens**: 9577
- **Cache read tokens**: 1536
- **Cache write tokens**: 0
- **Total duration**: 124227ms
- **Estimated cost**: $0.003793 (local-openrouter-estimate)

## Article Summary
The article details the author's discovery and fix of a bug in Transformers.js where `num_beams > 1` silently defaulted to greedy decoding due to an incomplete TODO. It explains the implementation of proper beam search (standard, diverse, and beam sampling), focusing on key technical challenges: bypassing the existing `BeamSearchSampler` to correctly rank all `num_beams × vocab_size` candidates, reordering the KV cache when beams are pruned, and handling the sequential dependency in diverse beam search. The tone is a technical tutorial with self-deprecating humor (e.g., the CW about jargon). The intended audience is developers working with Transformers.js who need accurate sequence generation for models like T5, BART, or Whisper.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1027 | 0 | 0 | 858 | 5326 | $0.000384 |
| 2 | 1364 | 0 | 0 | 1565 | 74289 | $0.000629 |
| 3 | 1467 | 384 | 0 | 1391 | 11130 | $0.000542 |
| 4 | 1478 | 0 | 0 | 2035 | 12984 | $0.000777 |
| 5 | 1413 | 384 | 0 | 1575 | 7293 | $0.000586 |
| 6 | 1356 | 384 | 0 | 1598 | 7626 | $0.000585 |
| 7 | 1337 | 384 | 0 | 555 | 5579 | $0.000290 |
