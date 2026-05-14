# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5071
- **Total output tokens**: 1775
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 2314ms
- **Estimated cost**: $0.000517 (local-openrouter-estimate)

## Article Summary
The article argues that while currency units are globally defined, the way numbers and prices are displayed must be localized to each user’s locale; failing to format money correctly signals a lack of effort and can undermine trust. It explains key concepts—“Numbers are Local” (locale‑specific decimal, thousands separators, and symbol placement) and “Currency is Global” (ISO 4217 codes, invariant value)—and shows why formatting should happen client‑side, using the browser’s locale. The core solution presented is JavaScript’s built‑in Intl.NumberFormat (with a simple `formatMoney` helper) and, for more advanced needs, libraries like dinero.js. The tone is a friendly tutorial, peppered with humor and visual metaphors (e.g., “Numbers are Local 🏘️”, “Currency is Global 🌎”) aimed at web developers and engineers working on e‑commerce or payment interfaces.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1243 | 0 | 0 | 514 | 664 | $0.000141 |
| 2 | 1314 | 512 | 0 | 402 | 487 | $0.000124 |
| 3 | 1432 | 768 | 0 | 544 | 732 | $0.000154 |
| 4 | 1082 | 768 | 0 | 315 | 431 | $0.000099 |
