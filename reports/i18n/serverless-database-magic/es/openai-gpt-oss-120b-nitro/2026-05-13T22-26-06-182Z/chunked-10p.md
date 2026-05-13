# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 2
- **Total input tokens**: 4617
- **Total output tokens**: 3211
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 3597ms
- **Estimated cost**: $0.000758 (local-openrouter-estimate)

## Article Summary
The article argues that for read‑heavy, rebuildable workloads—such as documentation sites, catalog snapshots, and prototype RAG systems—a “static‑index‑as‑file” approach often beats traditional databases, and the decision rule is simply: if the data can be regenerated from files, store the index in object storage; if it’s constantly being written, use a real DB. It surveys a new class of serverless‑or‑CDN‑backed datastores (Pagefind, Orama, Chroma, LanceDB, DuckDB‑WASM), comparing their features (full‑text vs. vector search, AI integrations, CRUD support, performance) and showing how they shift complexity to build pipelines and cache invalidation rather than to persistent DB infrastructure. The tone is pragmatic and tutorial‑like, using a “if‑else” decision metaphor and a “snapshot” framing device to stress that the landscape is rapidly evolving. The intended audience is engineers and product teams evaluating search and retrieval stacks for AI‑augmented applications, especially those who prefer lightweight, edge‑friendly solutions over heavyweight server setups.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1423 | 0 | 0 | 698 | 2039 | $0.000181 |
| 2 | 3194 | 768 | 0 | 2513 | 1558 | $0.000577 |
