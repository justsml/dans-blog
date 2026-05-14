# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 4736
- **Total output tokens**: 3136
- **Cache read tokens**: 1152
- **Cache write tokens**: 0
- **Total duration**: 19718ms
- **Estimated cost**: $0.001383 (local-openrouter-estimate)

## Article Summary
This tutorial argues that while numbers are locally formatted (decimal, thousands, symbol position vary by locale), currency itself is global (value and 3-letter code are universal). It explains that client-side formatting using JavaScript’s `Intl.NumberFormat` is the correct approach, and recommends storing monetary values as integers (cents) and using libraries like dinero.js for advanced operations. The intended audience is developers building ecommerce or payment systems, and the tone is instructional with light humor, framed by the recurring dichotomy “Numbers are Local, Currency is Global.”

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1138 | 0 | 0 | 934 | 5187 | $0.000421 |
| 2 | 1234 | 384 | 0 | 619 | 3998 | $0.000293 |
| 3 | 1366 | 384 | 0 | 1239 | 7522 | $0.000485 |
| 4 | 998 | 384 | 0 | 344 | 3011 | $0.000183 |
