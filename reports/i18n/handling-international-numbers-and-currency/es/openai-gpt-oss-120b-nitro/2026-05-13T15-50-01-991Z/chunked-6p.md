# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6214
- **Total output tokens**: 1753
- **Cache read tokens**: 1152
- **Cache write tokens**: 0
- **Total duration**: 7350ms
- **Estimated cost**: $0.000558 (local-openrouter-estimate)

## Article Summary
The article argues that correctly formatting numbers and currency is a fundamental part of product internationalization, because mismatched locales instantly reveal a lack of localization effort. It explains the distinction between “local” number conventions (decimal separators, thousand grouping, symbol placement) and the globally defined ISO 4217 currency codes, and shows how locale‑specific formatting must be handled client‑side. The core solution presented is the built‑in JavaScript Intl API (Intl.NumberFormat) with a simple `formatMoney` helper, while recommending libraries such as dinero.js for advanced money math and conversions. Written in a friendly, tutorial tone, it repeatedly uses house‑ and globe‑emoji metaphors (“Numbers are Local 🏘️”, “Currency is Global 🌎”) to frame the contrast between locale rules and currency standards. The intended audience is web developers building e‑commerce or payment interfaces who need practical guidance on locale‑aware money handling.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1052 | 256 | 0 | 347 | 1726 | $0.000103 |
| 2 | 1016 | 256 | 0 | 235 | 1624 | $0.000082 |
| 3 | 1028 | 256 | 0 | 218 | 1221 | $0.000079 |
| 4 | 1183 | 0 | 0 | 418 | 1312 | $0.000121 |
| 5 | 1016 | 0 | 0 | 278 | 1035 | $0.000090 |
| 6 | 919 | 384 | 0 | 257 | 432 | $0.000082 |
