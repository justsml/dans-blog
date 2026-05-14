# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 3057
- **Total output tokens**: 2650
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 7834ms
- **Estimated cost**: $0.000881 (local-openrouter-estimate)

## Article Summary
The article "Understanding International Numbers & Currency" argues that developers must distinguish between **locale-specific number formatting** and **global currency standards** to build trustworthy internationalized applications. It emphasizes that while **numbers are local** (with locale-specific rules for decimals, thousands separators, and symbol placement), **currency is global** (using standardized 3-letter codes like USD/EUR and exchange rates). The tutorial-style guide highlights JavaScript’s `Intl.NumberFormat` as a core tool for locale-aware formatting and introduces libraries like `dinero.js` for advanced financial operations. Framed with metaphors like "Numbers are Local 🏘️" and "Currency is Global 🌎," the article targets developers building e-commerce or payment systems, stressing the importance of client-side formatting to respect user locales. Key technical concepts include ISO standards (ISO 3166, ISO 4217), locale detection via `navigator.language`, and best practices for handling currency

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1449 | 0 | 0 | 1556 | 4656 | $0.000489 |
| 2 | 1608 | 0 | 0 | 1094 | 3178 | $0.000391 |
