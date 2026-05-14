# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5249
- **Total output tokens**: 1922
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 5205ms
- **Estimated cost**: $0.000551 (local-openrouter-estimate)

## Article Summary
The article argues that while currency units are globally defined, the way numbers and prices are displayed must be localized to each user’s locale; failing to format money correctly signals a lack of effort in international products. It explains key concepts—“Numbers are Local” (locale‑specific decimal, thousands separators, and symbol placement) and “Currency is Global” (ISO‑4217 codes, invariant value)—and shows why formatting should happen client‑side, using the browser’s locale. The core solution is the built‑in JavaScript Intl API (especially Intl.NumberFormat) with examples, and it recommends libraries like dinero.js for advanced money math and conversion. The tone is a friendly tutorial, using emojis and metaphors (e.g., “numbers are local 🏘️, currency is global 🌎”) to illustrate the contrast between regional formatting quirks and universal currency codes. The intended audience is web developers and engineers working on e‑commerce or payment interfaces who need practical guidance on i18n/L10n of monetary values.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1271 | 512 | 0 | 518 | 593 | $0.000143 |
| 2 | 1359 | 0 | 0 | 412 | 1483 | $0.000127 |
| 3 | 1494 | 512 | 0 | 554 | 1776 | $0.000158 |
| 4 | 1125 | 0 | 0 | 438 | 1353 | $0.000123 |
