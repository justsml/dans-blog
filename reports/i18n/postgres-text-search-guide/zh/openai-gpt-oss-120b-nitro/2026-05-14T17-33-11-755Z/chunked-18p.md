# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 10728
- **Total output tokens**: 7542
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 19825ms
- **Estimated cost**: $0.001776 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL already provides three complementary search primitives—full‑text search (`tsvector` + GIN), trigram similarity (`pg_trgm`), and exact‑match indexes (B‑tree/hash)—and that teams should combine them instead of defaulting to a single tool or an external search service. It explains each technology’s mechanics, ideal use cases (lexical matching for long prose, orthographic similarity for fuzzy names and autocomplete, and binary matching for IDs or emails), and how to layer them to handle different query shapes. Written in a pragmatic, tutorial tone, the guide uses a visual “search tool map” metaphor to frame the decision‑making process. The intended audience is engineers and architects who design search features in PostgreSQL‑centric applications and want to reduce complexity while maximizing relevance.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 3320 | 512 | 0 | 2729 | 7338 | $0.000621 |
| 2 | 1744 | 512 | 0 | 952 | 3173 | $0.000239 |
| 3 | 2290 | 512 | 0 | 1381 | 3637 | $0.000338 |
| 4 | 3374 | 512 | 0 | 2480 | 5677 | $0.000578 |
