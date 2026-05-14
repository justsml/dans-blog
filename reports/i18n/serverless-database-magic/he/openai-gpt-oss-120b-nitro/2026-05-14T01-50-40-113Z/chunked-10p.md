# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 2
- **Total input tokens**: 4662
- **Total output tokens**: 3630
- **Cache read tokens**: 512
- **Cache write tokens**: 0
- **Total duration**: 10803ms
- **Estimated cost**: $0.000835 (local-openrouter-estimate)

## Article Summary
The article argues that for read‑heavy, rebuildable workloads—such as documentation sites, catalog snapshots, and prototype RAG systems—a new class of “static‑index” databases that store searchable indexes as files or object‑storage objects can be more practical than traditional server‑based databases. It presents a decision rule (“use object‑storage if data is rebuildable and mostly read; otherwise use a real DB”) and surveys several emerging tools (Pagefind, Orama, Chroma, LanceDB, DuckDB‑WASM), comparing their features, storage models, and performance as of September 2025. The tone is an analytical, practitioner‑focused guide that uses the metaphor of “building an index and serving it over HTTP” to frame the trade‑off between infrastructure ceremony and query latency. The intended audience is engineers and technical decision‑makers evaluating search and vector‑search solutions for mid‑scale AI‑augmented applications.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1412 | 512 | 0 | 832 | 1669 | $0.000205 |
| 2 | 3250 | 0 | 0 | 2798 | 9134 | $0.000630 |
