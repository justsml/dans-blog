# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 6
- **Total input tokens**: 7947
- **Total output tokens**: 8591
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 46335ms
- **Estimated cost**: $0.003413 (local-openrouter-estimate)

## Article Summary
This article warns that PostgreSQL’s JSONB is often misused as a deferred schema decision, leading to undocumented “schema-on-read” systems and technical debt. The author argues JSONB is appropriate for specific use cases (webhook payloads, logs, user preferences, LLM configs) but becomes problematic when nested fields are queried relationally, causing full table scans and schema drift. The tone is analytical and cautionary, using metaphors like “I’ll clean my room later” to describe deferred decisions. The intended audience is developers and database architects who need to distinguish legitimate JSONB usage from harmful overuse.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1178 | 0 | 0 | 2289 | 12263 | $0.000806 |
| 2 | 1209 | 0 | 0 | 496 | 3975 | $0.000308 |
| 3 | 1478 | 0 | 0 | 2273 | 10655 | $0.000843 |
| 4 | 1387 | 384 | 0 | 1520 | 7126 | $0.000567 |
| 5 | 1413 | 0 | 0 | 600 | 5001 | $0.000366 |
| 6 | 1282 | 384 | 0 | 1413 | 7315 | $0.000522 |
