# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 5945
- **Total output tokens**: 5377
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 12864ms
- **Estimated cost**: $0.001766 (local-openrouter-estimate)

## Article Summary
The article argues that proper internationalization (i18n) requires distinguishing between **local number formatting** (which varies by locale, e.g., decimal separators, currency symbol placement) and **global currency standards** (ISO 4217 codes like USD/EUR). It emphasizes using modern tools like JavaScript’s `Intl.NumberFormat` to dynamically format numbers/currency based on user locale, while handling currency conversion and math via libraries like *dinero.js*. The tutorial-style guide targets developers building global web apps, stressing that inconsistent formatting undermines trust and usability. Key metaphors include "Numbers are Local 🏘️" (locale-specific rules) and "Currency is Global 🌎" (universal exchange units), framed through examples from the EU, US, and India. The tone balances practical code examples with strategic advice for handling locale detection, tax calculations, and exchange rates.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1019 | 0 | 0 | 937 | 2035 | $0.000306 |
| 2 | 984 | 0 | 0 | 850 | 2092 | $0.000283 |
| 3 | 986 | 512 | 0 | 1263 | 3013 | $0.000382 |
| 4 | 1135 | 512 | 0 | 898 | 2255 | $0.000306 |
| 5 | 951 | 0 | 0 | 819 | 1840 | $0.000273 |
| 6 | 870 | 0 | 0 | 610 | 1629 | $0.000216 |
