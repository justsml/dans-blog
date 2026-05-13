# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6273
- **Total output tokens**: 5315
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 19168ms
- **Estimated cost**: $0.001777 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that proper localization (L10n) and internationalization (i18n) of numbers and currency are critical for global software, emphasizing that *numbers are local* (formatting varies by locale) while *currency is global* (standardized codes like USD/EUR). It highlights challenges like locale-specific decimal/thousands separators and advocates using modern tools like JavaScript’s `Intl.NumberFormat` for client-side formatting. The tutorial-style guide targets developers, offering code examples and framing numbers as "local" (🏠) and currency as "global" (🌍) to clarify their distinct handling. It also recommends libraries like `dinero.js` for advanced financial operations and stresses the importance of locale detection and currency conversion best practices.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1076 | 0 | 0 | 792 | 1704 | $0.000276 |
| 2 | 1044 | 0 | 0 | 724 | 1815 | $0.000257 |
| 3 | 1037 | 512 | 0 | 842 | 1954 | $0.000285 |
| 4 | 1194 | 512 | 0 | 1351 | 3088 | $0.000420 |
| 5 | 1006 | 0 | 0 | 1227 | 2718 | $0.000375 |
| 6 | 916 | 0 | 0 | 379 | 7889 | $0.000164 |
