# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6356
- **Total output tokens**: 1764
- **Cache read tokens**: 1280
- **Cache write tokens**: 0
- **Total duration**: 6637ms
- **Estimated cost**: $0.000565 (local-openrouter-estimate)

## Article Summary
The article argues that proper number and currency formatting is a fundamental part of product localization (L10n) and internationalization (i18n), because displaying money in the wrong locale instantly reveals a lack of effort. It explains that while currencies themselves are global (identified by ISO 4217 codes), the visual representation of numbers—decimal separators, thousand delimiters, symbol placement, and spacing—is defined per locale, so formatting must happen on the client side using the user’s locale (e.g., via `navigator.language`). The core solution presented is JavaScript’s built‑in `Intl.NumberFormat` API, illustrated with sample code, and it points developers toward libraries like dinero.js for advanced money math and exchange‑rate handling. The tone is a friendly tutorial, peppered with humor and visual metaphors (e.g., “Numbers are Local 🏘️”, “Currency is Global 🌎”) to make the concepts memorable. It targets front‑end engineers and e‑commerce developers who need to implement locale‑aware pricing.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1073 | 0 | 0 | 322 | 1284 | $0.000100 |
| 2 | 1021 | 256 | 0 | 235 | 900 | $0.000082 |
| 3 | 1059 | 256 | 0 | 234 | 841 | $0.000083 |
| 4 | 1216 | 256 | 0 | 440 | 1582 | $0.000127 |
| 5 | 1040 | 256 | 0 | 272 | 1023 | $0.000090 |
| 6 | 947 | 256 | 0 | 261 | 1007 | $0.000084 |
