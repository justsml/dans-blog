# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 12
- **Total input tokens**: 10859
- **Total output tokens**: 11783
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 27435ms
- **Estimated cost**: $0.003697 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article details the implementation of beam search in the `transformers.js` library, addressing a critical bug where models with `num_beams > 1` defaulted to greedy decoding instead of beam search. The author explains beam search as a breadth-first exploration of token space, emphasizing three variants (standard, diverse, and beam sampling) and technical challenges like KV cache reordering

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 760 | 0 | 0 | 945 | 2198 | $0.000288 |
| 2 | 891 | 0 | 0 | 960 | 1986 | $0.000302 |
| 3 | 909 | 0 | 0 | 878 | 2079 | $0.000283 |
| 4 | 953 | 0 | 0 | 1048 | 2292 | $0.000328 |
| 5 | 1000 | 0 | 0 | 1114 | 2509 | $0.000347 |
| 6 | 920 | 0 | 0 | 753 | 2014 | $0.000254 |
| 7 | 943 | 0 | 0 | 1296 | 2624 | $0.000386 |
| 8 | 936 | 0 | 0 | 1424 | 3212 | $0.000417 |
| 9 | 916 | 0 | 0 | 628 | 1651 | $0.000224 |
| 10 | 894 | 0 | 0 | 857 | 2291 | $0.000277 |
| 11 | 960 | 0 | 0 | 1261 | 3008 | $0.000379 |
| 12 | 777 | 0 | 0 | 619 | 1571 | $0.000211 |
