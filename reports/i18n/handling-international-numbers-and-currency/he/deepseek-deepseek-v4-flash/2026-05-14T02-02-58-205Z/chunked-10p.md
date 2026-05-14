# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 4891
- **Total output tokens**: 3683
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 23796ms
- **Estimated cost**: $0.001611 (local-openrouter-estimate)

## Article Summary
This tutorial explains that while numbers are formatted according to local conventions (e.g., decimal separators, symbol placement), currency values themselves are global and do not change with locale. The article argues that formatting should be done on the client side using the user’s locale (e.g., via JavaScript’s `Intl.NumberFormat`), and recommends storing monetary amounts as integers (cents) for precision. Aimed at developers building ecommerce or payment systems, the tone is explanatory with light humor, and it frames the core distinction as “Numbers are Local, Currency is Global.”

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1150 | 0 | 0 | 1124 | 9033 | $0.000476 |
| 2 | 1281 | 0 | 0 | 1318 | 6995 | $0.000548 |
| 3 | 1419 | 384 | 0 | 792 | 4849 | $0.000368 |
| 4 | 1041 | 384 | 0 | 449 | 2919 | $0.000219 |
