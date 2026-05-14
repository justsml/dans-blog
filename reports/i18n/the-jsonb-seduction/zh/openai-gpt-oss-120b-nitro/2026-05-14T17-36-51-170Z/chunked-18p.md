# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 6371
- **Total output tokens**: 2548
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 10351ms
- **Estimated cost**: $0.000707 (local-openrouter-estimate)

## Article Summary
The article argues that JSONB in PostgreSQL is a useful tool for storing semi‑structured data—but it becomes a hidden source of technical debt when teams use it as a shortcut for undefined schemas and then treat the blob as primary business data. It illustrates a common pattern: a JSONB column is added to defer schema decisions, later proliferates into many divergent versions accessed by multiple services, forcing costly indexes and scattering validation logic into application code. The piece delineates legitimate use cases (webhook payloads, logs, user settings, LLM config, API caching, event sourcing, extensible plugin data) and stresses that JSONB should be employed only when whole documents are fetched by a stable key and schema evolution is intentional. The tone is a pragmatic rant‑turned‑analysis aimed at developers, architects, and DBAs who design data models and risk “schema‑on‑read” debt. Recurring metaphors compare JSONB to “cleaning your room later” and a “temporary solution that never goes away,” framing the technology as both a rescue and a trap.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1505 | 512 | 0 | 737 | 2003 | $0.000191 |
| 2 | 1849 | 512 | 0 | 889 | 4171 | $0.000232 |
| 3 | 1761 | 512 | 0 | 698 | 2961 | $0.000194 |
| 4 | 1256 | 512 | 0 | 224 | 1216 | $0.000089 |
