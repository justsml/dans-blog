# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6694
- **Total output tokens**: 1999
- **Cache read tokens**: 3328
- **Cache write tokens**: 0
- **Total duration**: 3374ms
- **Estimated cost**: $0.000621 (local-openrouter-estimate)

## Article Summary
The article argues that while currency units are globally defined, number formatting is inherently locale‑specific, so developers must format prices on the client side to avoid obvious localization errors. It explains key concepts—“Numbers are Local” (different decimal, thousands separators, and symbol placement per ISO‑based locale) and “Currency is Global” (fixed three‑letter codes and symbols independent of locale)—and illustrates the chaos of raw formatting across the EU, the US, and India. The core solution is to use built‑in internationalization APIs, notably JavaScript’s Intl.NumberFormat, optionally supplemented by libraries like dinero.js for money math and exchange‑rate handling. The tone is a practical tutorial aimed at web developers and engineers working on e‑commerce or payment interfaces. Recurring metaphors compare numbers to “local homes” and currency to a “global citizen,” reinforcing the distinction between locale‑bound formatting and universal monetary units.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1054 | 384 | 0 | 366 | 606 | $0.000107 |
| 2 | 1148 | 640 | 0 | 261 | 700 | $0.000092 |
| 3 | 1142 | 384 | 0 | 269 | 354 | $0.000093 |
| 4 | 1302 | 640 | 0 | 528 | 670 | $0.000146 |
| 5 | 1053 | 640 | 0 | 269 | 357 | $0.000089 |
| 6 | 995 | 640 | 0 | 306 | 687 | $0.000094 |
