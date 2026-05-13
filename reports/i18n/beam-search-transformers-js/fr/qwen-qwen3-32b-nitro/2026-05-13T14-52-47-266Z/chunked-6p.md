# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 12
- **Total input tokens**: 10969
- **Total output tokens**: 11041
- **Cache read tokens**: 4096
- **Cache write tokens**: 0
- **Total duration**: 24878ms
- **Estimated cost**: $0.003527 (local-openrouter-estimate)

## Article Summary
The article details the implementation of beam search in the `transformers.js` library, addressing a critical bug where models with `num_beams > 1` silently defaulted to greedy decoding. The core thesis is that proper beam search requires tracking **all `num_beams × vocab_size` candidates** per step, not just top tokens per beam, to ensure globally optimal sequences. Key technical challenges include reordering key-value caches during beam pruning (to maintain attention state consistency) and implementing diverse beam search with sequential token penalties to avoid redundant outputs. The tone is

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 790 | 0 | 0 | 983 | 2412 | $0.000299 |
| 2 | 889 | 0 | 0 | 653 | 1689 | $0.000228 |
| 3 | 906 | 0 | 0 | 976 | 2084 | $0.000307 |
| 4 | 955 | 0 | 0 | 1036 | 2400 | $0.000325 |
| 5 | 1000 | 512 | 0 | 1205 | 2482 | $0.000369 |
| 6 | 929 | 512 | 0 | 941 | 2020 | $0.000300 |
| 7 | 955 | 512 | 0 | 891 | 2070 | $0.000290 |
| 8 | 947 | 512 | 0 | 829 | 1826 | $0.000275 |
| 9 | 932 | 512 | 0 | 1105 | 2485 | $0.000340 |
| 10 | 905 | 512 | 0 | 798 | 1727 | $0.000264 |
| 11 | 971 | 512 | 0 | 1047 | 2216 | $0.000329 |
| 12 | 790 | 512 | 0 | 577 | 1467 | $0.000202 |
