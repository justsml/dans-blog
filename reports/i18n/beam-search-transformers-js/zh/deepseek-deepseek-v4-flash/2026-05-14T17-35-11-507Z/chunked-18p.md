# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 6140
- **Total output tokens**: 3119
- **Cache read tokens**: 1152
- **Cache write tokens**: 0
- **Total duration**: 22519ms
- **Estimated cost**: $0.001575 (local-openrouter-estimate)

## Article Summary
The article details the author's discovery that `num_beams > 1` in Transformers.js silently defaulted to greedy decoding due to an incomplete TODO, then walks through implementing correct beam search (standard, diverse, and sampling) as a pull request. Key challenges included bypassing the existing `BeamSearchSampler` because it couldn't rank all `num_beams × vocab_size` candidates, reordering the KV cache after beam pruning (especially for encoder-decoder models), and sequentially processing groups for diverse beam search. The tone is a technical tutorial blending narrative discovery with implementation details, aimed at developers working with Transformers.js, JavaScript ML, or ONNX Runtime who need correct decoding beyond greedy search. Recurring framing includes the "lie" of the TODO and the "traps" of obvious reuse paths.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1288 | 0 | 0 | 596 | 4261 | $0.000347 |
| 2 | 1765 | 384 | 0 | 898 | 6171 | $0.000446 |
| 3 | 1585 | 384 | 0 | 835 | 5645 | $0.000403 |
| 4 | 1502 | 384 | 0 | 790 | 6442 | $0.000379 |
