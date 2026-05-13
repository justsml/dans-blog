# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6733
- **Total output tokens**: 1748
- **Cache read tokens**: 1920
- **Cache write tokens**: 0
- **Total duration**: 4696ms
- **Estimated cost**: $0.000577 (local-openrouter-estimate)

## Article Summary
The article argues that while currency units are globally defined, number formatting is inherently locale‑specific, so developers must format prices on the client side to avoid obvious localization errors. It explains key concepts—“Numbers are Local” (different decimal, thousands separators, and symbol placement per ISO 3166 locale) and “Currency is Global” (ISO 4217 codes, invariant value)—and illustrates the chaos of mixed formats across the EU, the US, and India. The core solution is to use built‑in internationalization APIs, notably JavaScript’s `Intl.NumberFormat`, optionally supplemented by libraries like dinero.js for money math and exchange‑rate handling. The tone is a practical tutorial aimed at web developers and engineers working on e‑commerce or payment interfaces. Recurring metaphors compare numbers to “local homes” and currency to a “global citizen,” reinforcing the distinction between locale‑dependent formatting and universal monetary units.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1129 | 256 | 0 | 404 | 343 | $0.000117 |
| 2 | 1105 | 0 | 0 | 225 | 1040 | $0.000084 |
| 3 | 1122 | 640 | 0 | 267 | 310 | $0.000092 |
| 4 | 1275 | 256 | 0 | 438 | 1531 | $0.000129 |
| 5 | 1105 | 512 | 0 | 244 | 773 | $0.000087 |
| 6 | 997 | 256 | 0 | 170 | 699 | $0.000069 |
