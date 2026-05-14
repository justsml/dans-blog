# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 6
- **Total input tokens**: 12836
- **Total output tokens**: 7540
- **Cache read tokens**: 3328
- **Cache write tokens**: 0
- **Total duration**: 22250ms
- **Estimated cost**: $0.001858 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL’s built‑in search tools—full‑text search (FTS), trigram matching (pg_trgm), and the newer pgvector extension—can often replace a separate vector database for many AI‑augmented applications, and it explains when each should be used alone or together. It describes FTS as a lexical, deterministic matcher ideal for exact‑term queries, boolean filters, and ranking without extra infrastructure; pg_trgm as a fuzzy‑string matcher suited to short identifiers, names, and typo‑tolerant autocomplete; and pgvector as a semantic, embedding‑based search that finds meaning‑similar documents. The tone is tutorial‑focused, offering concrete SQL examples and a visual “search tool map” to guide developers in choosing the right PostgreSQL feature for their use case.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1470 | 512 | 0 | 827 | 2183 | $0.000206 |
| 2 | 2280 | 512 | 0 | 1327 | 3426 | $0.000328 |
| 3 | 2098 | 512 | 0 | 1122 | 2678 | $0.000284 |
| 4 | 2529 | 512 | 0 | 1634 | 4601 | $0.000393 |
| 5 | 3247 | 768 | 0 | 2392 | 8278 | $0.000557 |
| 6 | 1212 | 512 | 0 | 238 | 1084 | $0.000090 |
