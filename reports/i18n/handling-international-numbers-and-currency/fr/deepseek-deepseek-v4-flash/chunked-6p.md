# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6330
- **Total output tokens**: 6517
- **Cache read tokens**: 384
- **Cache write tokens**: 0
- **Total duration**: 40661ms
- **Estimated cost**: $0.002658 (local-openrouter-estimate)

## Article Summary
This tutorial argues that while currency values are global (e.g., USD, EUR), number formatting (decimal separators, grouping, symbol placement) is locale-specific and must be handled client-side. It explains the distinction between localization (L10n) and internationalization (i18n), then demonstrates JavaScript’s `Intl.NumberFormat` to format money according to the user’s `navigator.language`. The article targets developers building ecommerce or payment systems, using a casual, example-driven tone with emojis and a “Numbers are Local 🏘️” / “Currency is Global 🌎” framing. It recommends storing monetary values as integers (cents) and mentions libraries like dinero.js for advanced operations.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1056 | 0 | 0 | 1013 | 6543 | $0.000431 |
| 2 | 1035 | 0 | 0 | 696 | 4140 | $0.000340 |
| 3 | 1056 | 0 | 0 | 1060 | 6217 | $0.000445 |
| 4 | 1225 | 0 | 0 | 1022 | 6607 | $0.000458 |
| 5 | 1026 | 0 | 0 | 431 | 4240 | $0.000264 |
| 6 | 932 | 384 | 0 | 2295 | 12914 | $0.000720 |
