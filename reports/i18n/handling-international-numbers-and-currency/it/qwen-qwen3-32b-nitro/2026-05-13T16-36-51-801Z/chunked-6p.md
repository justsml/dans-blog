# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 6
- **Total input tokens**: 6246
- **Total output tokens**: 6513
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 15054ms
- **Estimated cost**: $0.002063 (local-openrouter-estimate)

## Article Summary
The article argues that proper formatting of numbers and currency is critical for global software, emphasizing the distinction between **localization (L10n)** (locale-specific formatting rules) and **internationalization (i18n)** (global currency standards). Key points include:  
1. **Numbers are Local**: Formatting rules (decimal separators, thousand separators) vary by locale (e.g., `€1,234,567.89` vs. `1.234.567,89 €`).  
2. **Currency is Global**: Currencies (e.g., `USD`, `EUR`) are standardized but require locale-aware formatting on the client side using tools like JavaScript’s `Intl.NumberFormat`.  
3. **Technical Solutions**: Modern languages provide built-in libraries for formatting, while libraries like `dinero.js` handle advanced operations (taxes, discounts).  

The intended audience is developers building internationalized apps, particularly in e-commerce or payments. The tone is tutorial, blending practical examples with conceptual framing (e.g., "Numbers are Local

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1065 | 0 | 0 | 1259 | 2753 | $0.000387 |
| 2 | 1040 | 0 | 0 | 830 | 2031 | $0.000282 |
| 3 | 1041 | 0 | 0 | 805 | 2275 | $0.000276 |
| 4 | 1182 | 512 | 0 | 1331 | 2846 | $0.000414 |
| 5 | 1002 | 0 | 0 | 1640 | 3632 | $0.000474 |
| 6 | 916 | 512 | 0 | 648 | 1517 | $0.000229 |
