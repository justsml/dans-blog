# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 8340
- **Total output tokens**: 7458
- **Cache read tokens**: 2560
- **Cache write tokens**: 0
- **Total duration**: 19095ms
- **Estimated cost**: $0.002457 (local-openrouter-estimate)

## Article Summary
The article details the implementation of beam search in the `transformers.js` library, addressing a critical bug where models configured with `num_beams > 1`

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 887 | 0 | 0 | 905 | 2467 | $0.000288 |
| 2 | 1206 | 512 | 0 | 1259 | 2905 | $0.000399 |
| 3 | 1297 | 512 | 0 | 1146 | 2850 | $0.000379 |
| 4 | 1296 | 512 | 0 | 1065 | 2680 | $0.000359 |
| 5 | 1251 | 512 | 0 | 956 | 2288 | $0.000330 |
| 6 | 1212 | 0 | 0 | 1195 | 3340 | $0.000384 |
| 7 | 1191 | 512 | 0 | 932 | 2565 | $0.000319 |
