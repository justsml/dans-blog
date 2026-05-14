# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 3045
- **Total output tokens**: 1482
- **Cache read tokens**: 1280
- **Cache write tokens**: 0
- **Total duration**: 2232ms
- **Estimated cost**: $0.000386 (local-openrouter-estimate)

## Article Summary
The article argues that while currency units are globally defined, number formatting is inherently locale‑specific, so developers must format prices on the client side to avoid obvious UI errors. It explains key concepts—local number rules (decimal/thousands separators, symbol placement) versus global currency codes (ISO 4217)—and illustrates the chaos of differing formats across the EU, the US, and India. The core solution is to use built‑in internationalization APIs (e.g., JavaScript’s Intl.NumberFormat) or libraries like dinero.js for richer money math and conversion. Written in a friendly tutorial tone, it repeatedly frames numbers as “local” (🏘️) and currency as “global” (🌎) to reinforce the distinction. The intended audience is front‑end or e‑commerce developers needing practical guidance on proper money localization.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1433 | 512 | 0 | 768 | 1504 | $0.000194 |
| 2 | 1612 | 768 | 0 | 714 | 728 | $0.000191 |
