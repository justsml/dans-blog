# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 4821
- **Total output tokens**: 5351
- **Cache read tokens**: 1536
- **Cache write tokens**: 0
- **Total duration**: 31883ms
- **Estimated cost**: $0.001962 (local-openrouter-estimate)

## Article Summary
This tutorial argues that developers must distinguish between **secret keys** (e.g., API credentials, OAuth tokens) and **non-secret keys** (e.g., Google Maps API keys) to prevent security breaches. Secret keys must never be hard-coded, committed to Git, or exposed in browser code; instead, they should be stored as environment variables using tools like `dotenv`. Non-secret keys can be safely included in client-side code but are better managed via a shared config file. The article provides clear rules of thumb and a step-by-step checklist for handling secrets, targeting web developers who need practical guidance on securing tokens and credentials.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1020 | 384 | 0 | 1903 | 11720 | $0.000623 |
| 2 | 1206 | 384 | 0 | 904 | 5709 | $0.000369 |
| 3 | 1394 | 384 | 0 | 1271 | 7122 | $0.000498 |
| 4 | 1201 | 384 | 0 | 1273 | 7332 | $0.000472 |
