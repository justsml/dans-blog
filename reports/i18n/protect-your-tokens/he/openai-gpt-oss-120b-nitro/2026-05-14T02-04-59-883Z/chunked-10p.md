# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5096
- **Total output tokens**: 1581
- **Cache read tokens**: 1536
- **Cache write tokens**: 0
- **Total duration**: 4533ms
- **Estimated cost**: $0.000483 (local-openrouter-estimate)

## Article Summary
The article argues that protecting API tokens, keys, and other credentials is essential because a single leak can give attackers full control of your services. It distinguishes **secret keys**—which must never appear in source control or client‑side code and should be stored in environment variables (e.g., via dotenv and platform config) and proxied when accessed from browsers—from **non‑secret keys**, which are safe to embed publicly (e.g., Google Maps API keys) and can be hard‑coded or placed in a shared config file. The piece offers practical checklists and rule‑of‑thumb heuristics (CORS errors, cost of the service, write operations) for developers to decide how to handle each type. The tone is a straightforward tutorial aimed at web developers and DevOps engineers responsible for securing their applications. Recurring metaphors frame the distinction as a “secret vs. non‑secret” binary, reinforced with lock and globe icons.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1107 | 512 | 0 | 397 | 1333 | $0.000115 |
| 2 | 1277 | 512 | 0 | 256 | 719 | $0.000096 |
| 3 | 1436 | 512 | 0 | 527 | 1375 | $0.000151 |
| 4 | 1276 | 0 | 0 | 401 | 1106 | $0.000122 |
