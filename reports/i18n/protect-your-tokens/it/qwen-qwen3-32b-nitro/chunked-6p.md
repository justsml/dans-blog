# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 7
- **Total input tokens**: 6443
- **Total output tokens**: 5887
- **Cache read tokens**: 512
- **Cache write tokens**: 0
- **Total duration**: 21606ms
- **Estimated cost**: $0.001928 (local-openrouter-estimate)

## Article Summary
The article argues that developers must rigorously distinguish between **secret keys** (which must be hidden from code and browsers) and **non-secret keys** (which can be safely exposed) to prevent security breaches. It emphasizes using environment variables (e.g., `.env` files with `dotenv`) to manage secrets, avoiding Git commits, and leveraging hosting platforms (Heroku, Netlify) for secure deployment. Key technologies include `dotenv`, CI/CD tools, and service-specific environment variables. The tone is **tutorial** and **practical**, using metaphors like "soup of terms" to frame the confusion around overlapping jargon. Intended for developers handling APIs, the article provides actionable rules (e.g., "costly services must be proxied") and checklists for secure key management.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 796 | 0 | 0 | 797 | 1920 | $0.000255 |
| 2 | 933 | 0 | 0 | 593 | 1768 | $0.000217 |
| 3 | 905 | 512 | 0 | 780 | 2040 | $0.000260 |
| 4 | 924 | 0 | 0 | 936 | 2182 | $0.000299 |
| 5 | 1048 | 0 | 0 | 1135 | 2760 | $0.000356 |
| 6 | 937 | 0 | 0 | 991 | 2565 | $0.000313 |
| 7 | 900 | 0 | 0 | 655 | 8371 | $0.000229 |
