# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 6
- **Total input tokens**: 8455
- **Total output tokens**: 3130
- **Cache read tokens**: 4096
- **Cache write tokens**: 0
- **Total duration**: 4121ms
- **Estimated cost**: $0.000893 (local-openrouter-estimate)

## Article Summary
The article argues that JSONB in PostgreSQL is a useful tool for storing semi‑structured data—but it becomes a hidden source of technical debt when teams use it as a shortcut for undefined schemas and then treat the blob as primary business data. It illustrates a common pattern: a JSONB column is added to defer schema decisions, later proliferates into many divergent versions accessed by multiple services, forcing costly indexes and scattering validation logic into application code. The piece delineates legitimate use cases (webhook payloads, logs, user settings, LLM configs, API caches, event sourcing, extensible plugin data) and stresses that JSONB should be used only when whole documents are fetched by a stable key and the application owns versioning, otherwise relational columns are preferable. The tone is a pragmatic rant‑turned analysis, employing the metaphor of “the database equivalent of ‘I’ll clean my room later’” to frame the dangers of schema‑on‑read abuse. The intended audience is engineers, architects, and product teams who design PostgreSQL schemas and need guidance on when to adopt JSONB versus traditional relational columns.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1318 | 512 | 0 | 638 | 794 | $0.000166 |
| 2 | 1281 | 768 | 0 | 307 | 387 | $0.000105 |
| 3 | 1583 | 512 | 0 | 742 | 1078 | $0.000195 |
| 4 | 1456 | 768 | 0 | 496 | 625 | $0.000146 |
| 5 | 1491 | 768 | 0 | 524 | 711 | $0.000152 |
| 6 | 1326 | 768 | 0 | 423 | 526 | $0.000128 |
