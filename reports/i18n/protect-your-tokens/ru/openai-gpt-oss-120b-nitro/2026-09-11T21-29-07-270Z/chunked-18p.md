# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 3
- **Total input tokens**: 5027
- **Total output tokens**: 1726
- **Cache read tokens**: 3200
- **Cache write tokens**: 0
- **Total duration**: 1615ms
- **Estimated cost**: $0.000507 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that distinguishing *secret* from *non‑secret* keys is essential for security, because exposing a secret token can give attackers full control of your services. It defines secret keys as values that must never appear in source control or client‑side code and should be kept on private servers or managed via environment‑variable services (e.g., Heroku, Netlify, dotenv). Non‑secret keys are public identifiers that can safely be hard‑coded and sent to browsers (e.g., Google Maps API keys). The piece offers practical checklists—use environment variables, add `.env` to `.gitignore`, and avoid creating `.env` files on production—to protect secrets, and provides simple code examples for handling public keys. The tone is a concise, tutorial‑style guide aimed at web developers and DevOps engineers who manage API credentials.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1635 | 896 | 0 | 801 | 724 | $0.000208 |
| 2 | 1895 | 1152 | 0 | 738 | 610 | $0.000207 |
| 3 | 1497 | 1152 | 0 | 187 | 281 | $0.000092 |
