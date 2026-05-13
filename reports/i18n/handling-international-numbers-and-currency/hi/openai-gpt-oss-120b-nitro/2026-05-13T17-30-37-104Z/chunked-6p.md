# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6881
- **Total output tokens**: 1810
- **Cache read tokens**: 2304
- **Cache write tokens**: 0
- **Total duration**: 3489ms
- **Estimated cost**: $0.000594 (local-openrouter-estimate)

## Article Summary
The article argues that proper handling of numbers and currency is a core part of product localization (L10n) and internationalization (i18n), emphasizing that while currencies themselves are global, their presentation must respect each locale’s formatting rules. It explains key concepts—local number conventions (decimal separators, grouping symbols, currency‑symbol placement) versus the invariant ISO 4217 currency codes—and why formatting should be done client‑side using the user’s locale (e.g., via JavaScript’s Intl.NumberFormat). The piece offers a short tutorial showing how to format money with `Intl`, mentions libraries such as dinero.js for advanced money math, and suggests next steps like locale detection, storing amounts as integer cents, and handling exchange rates. The tone is instructional, using playful metaphors (e.g., “Numbers are Local 🏘️”, “Currency is Global 🌎”) to keep the guide approachable for web developers and engineers working on e‑commerce or payment interfaces.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1141 | 384 | 0 | 368 | 662 | $0.000111 |
| 2 | 1124 | 0 | 0 | 235 | 492 | $0.000086 |
| 3 | 1143 | 640 | 0 | 244 | 431 | $0.000088 |
| 4 | 1300 | 0 | 0 | 506 | 462 | $0.000142 |
| 5 | 1127 | 640 | 0 | 331 | 748 | $0.000104 |
| 6 | 1046 | 640 | 0 | 126 | 694 | $0.000063 |
