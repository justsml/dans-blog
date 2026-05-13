# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 6
- **Total input tokens**: 8049
- **Total output tokens**: 2870
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 9075ms
- **Estimated cost**: $0.000831 (local-openrouter-estimate)

## Article Summary
The article argues that JSONB in PostgreSQL is a useful tool for storing semi‑structured data, but it becomes a source of technical debt when teams use it as a shortcut for undefined schemas and then treat the column as a primary data store. It illustrates a common pattern: a JSONB column is added to defer schema decisions, later proliferates into many divergent versions that force validation and querying into application code, leading to costly full‑table scans, index bloat, and “schema‑on‑read” fragility. The piece delineates when JSONB is appropriate—e.g., webhook payloads, logs, user‑settings blobs, LLM configuration objects, and other immutable or rarely‑queried documents—while warning that relational queries on nested fields signal a need for proper columns. The tone is a pragmatic rant‑style analysis aimed at developers, architects, and DBAs who design PostgreSQL schemas and risk over‑using JSONB as a catch‑all. Recurring metaphors compare JSONB to “cleaning your room later,” emphasizing the gap between intended design and actual implementation.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1291 | 512 | 0 | 606 | 1756 | $0.000159 |
| 2 | 1209 | 512 | 0 | 280 | 1061 | $0.000098 |
| 3 | 1506 | 0 | 0 | 702 | 1825 | $0.000185 |
| 4 | 1393 | 0 | 0 | 443 | 1347 | $0.000134 |
| 5 | 1406 | 0 | 0 | 438 | 1389 | $0.000134 |
| 6 | 1244 | 0 | 0 | 401 | 1697 | $0.000121 |
