# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6097
- **Total output tokens**: 6274
- **Cache read tokens**: 1152
- **Cache write tokens**: 0
- **Total duration**: 76558ms
- **Estimated cost**: $0.002452 (local-openrouter-estimate)

## Article Summary
This tutorial argues that formatting numbers and currency requires separating locale-specific display rules (e.g., decimal separators, symbol placement) from the global value of a currency (ISO 4217 code). It explains that numbers are local (vary by user locale) while currency is global (value unchanged by locale), and recommends client-side formatting using JavaScript’s `Intl.NumberFormat`. The article targets developers building ecommerce or payment systems, using a conversational tone with emoji icons and the recurring framing “Numbers are Local, Currency is Global.”

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1017 | 0 | 0 | 1370 | 8872 | $0.000526 |
| 2 | 998 | 0 | 0 | 996 | 44037 | $0.000419 |
| 3 | 1018 | 0 | 0 | 1034 | 6242 | $0.000432 |
| 4 | 1184 | 384 | 0 | 1529 | 8797 | $0.000541 |
| 5 | 987 | 384 | 0 | 1017 | 5881 | $0.000370 |
| 6 | 893 | 384 | 0 | 328 | 2729 | $0.000164 |
