# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 4
- **Total input tokens**: 6153
- **Total output tokens**: 3297
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 9768ms
- **Estimated cost**: $0.000833 (local-openrouter-estimate)

## Article Summary
The article argues that for read‑heavy, rebuildable workloads—such as documentation, catalog snapshots, or prototype RAG systems—a new class of “static‑index” datastores that store searchable indexes as files or object‑storage objects often beats traditional databases. It presents a decision rule (“use object‑storage DB if data is rebuildable and mostly read; otherwise use a real DB”) and surveys several 2022‑2025 tools (Pagefind, Orama, Chroma, LanceDB, DuckDB‑WASM), comparing their features, storage models, and performance in a concise table. The tone is pragmatic analysis, using the metaphor of “serverless / CDN‑capable datastores” as a lightweight alternative to heavyweight database infrastructure, and repeatedly frames the trade‑off as moving complexity from runtime services to build pipelines and cache management. The intended audience is engineers and architects evaluating search‑oriented storage solutions for AI‑augmented applications.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1030 | 256 | 0 | 322 | 1365 | $0.000098 |
| 2 | 1419 | 256 | 0 | 458 | 1453 | $0.000138 |
| 3 | 1226 | 256 | 0 | 451 | 1368 | $0.000129 |
| 4 | 2478 | 256 | 0 | 2066 | 5582 | $0.000469 |
