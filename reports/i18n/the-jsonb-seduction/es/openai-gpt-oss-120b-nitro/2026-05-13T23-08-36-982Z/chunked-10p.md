# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 6
- **Total input tokens**: 7963
- **Total output tokens**: 2598
- **Cache read tokens**: 4096
- **Cache write tokens**: 0
- **Total duration**: 3301ms
- **Estimated cost**: $0.000778 (local-openrouter-estimate)

## Article Summary
The article argues that JSONB in PostgreSQL is a useful tool for storing semi‑structured data, but it becomes a source of technical debt when teams use it as a shortcut for undefined schemas and then treat the blob as primary business data. It illustrates a common pattern: a JSONB column is added to defer schema decisions, later proliferates into many inconsistent versions accessed by multiple services, forcing validation into application code and incurring costly full‑table scans or complex indexes. The piece delineates when JSONB is appropriate—e.g., webhook payloads, logs, user‑wide settings, LLM configuration, API caching, and immutable event streams—while warning that relational queries on nested fields signal a need for proper columns. The tone is a mix of analytical rant and practical tutorial, using the metaphor of “the database equivalent of ‘I’ll clean my room later’” to frame the pitfalls of schema‑on‑read. It targets developers, DBAs, and product teams who design data models and need guidance on balancing flexibility with maintainability.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1281 | 512 | 0 | 538 | 625 | $0.000147 |
| 2 | 1194 | 512 | 0 | 264 | 393 | $0.000094 |
| 3 | 1506 | 768 | 0 | 607 | 752 | $0.000168 |
| 4 | 1371 | 768 | 0 | 401 | 444 | $0.000126 |
| 5 | 1385 | 768 | 0 | 438 | 594 | $0.000133 |
| 6 | 1226 | 768 | 0 | 350 | 493 | $0.000111 |
