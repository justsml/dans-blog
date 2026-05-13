# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6263
- **Total output tokens**: 6962
- **Cache read tokens**: 384
- **Cache write tokens**: 0
- **Total duration**: 64249ms
- **Estimated cost**: $0.002773 (local-openrouter-estimate)

## Article Summary
This tutorial argues that while currency values are global (e.g., USD, EUR), their formatting is local and must be handled client-side based on the user’s locale. It explains the distinction between locale-specific number rules (decimal separators, grouping, symbol placement) and universal currency codes (ISO 4217). The article demonstrates JavaScript’s `Intl.NumberFormat` as the primary solution and recommends storing monetary amounts as integers (cents) for precision. Aimed at developers building ecommerce or payment systems, the tone is instructive with light humor, using the recurring framing “Numbers are Local, Currency is Global” and country-specific examples to illustrate formatting chaos.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1042 | 0 | 0 | 1795 | 9783 | $0.000648 |
| 2 | 1024 | 0 | 0 | 1276 | 6778 | $0.000501 |
| 3 | 1045 | 0 | 0 | 968 | 25148 | $0.000417 |
| 4 | 1213 | 0 | 0 | 642 | 6092 | $0.000350 |
| 5 | 1017 | 0 | 0 | 1678 | 12827 | $0.000612 |
| 6 | 922 | 384 | 0 | 603 | 3621 | $0.000245 |
