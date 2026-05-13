# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 7304
- **Total output tokens**: 8152
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 67701ms
- **Estimated cost**: $0.002541 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that proper formatting of international numbers and currency is critical for global applications, emphasizing the distinction between **local number formatting** (which varies by locale) and **global currency standards** (ISO 4217 codes). It highlights challenges like locale-specific decimal/thousands separators and currency symbol placement, using examples from Eurozone, US, and Indian formats. The solution focuses on JavaScript’s `Intl.NumberFormat` API for client-side formatting, paired with libraries like *dinero.js* for advanced operations. The tutorial-style guide targets developers, stressing the importance of locale detection (via `navigator.language`) and avoiding hardcoded formatting. Key metaphors frame numbers as "local" and currency as "global," reinforcing the need to separate formatting logic from currency logic.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1095 | 0 | 0 | 1484 | 3132 | $0.000444 |
| 2 | 1310 | 0 | 0 | 952 | 13196 | $0.000333 |
| 3 | 1255 | 0 | 0 | 1017 | 12945 | $0.000344 |
| 4 | 1413 | 0 | 0 | 1313 | 3073 | $0.000428 |
| 5 | 1131 | 0 | 0 | 2602 | 33190 | $0.000715 |
| 6 | 1100 | 0 | 0 | 784 | 2165 | $0.000276 |
