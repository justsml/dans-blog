# Chunked Translation Report

- **Model**: google/gemini-3-flash-preview
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 11664
- **Total output tokens**: 7997
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 46124ms
- **Estimated cost**: $0.029823 (local-openrouter-estimate)

## Article Summary
This technical guide argues that developers can avoid the complexity of external search services by mastering the native search primitives within Postgres. The author categorizes search strategies based on "input shape" and "query intent," specifically contrasting lexical full-text search (`tsvector`), orthographic fuzzy matching (`pg_trgm`), semantic search (`pgvector`), and exact-match indexing. Written in a practical, authoritative tutorial tone, the article serves as a strategic roadmap for software engineers to layer these technologies effectively. The core framing device is a "search tool map" that helps users select the correct tool based on whether the query prioritizes exact words versus meaning, and short strings versus long prose.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 3754 | 0 | 0 | 3011 | 16255 | $0.010910 |
| 2 | 1757 | 0 | 0 | 915 | 5601 | $0.003623 |
| 3 | 2356 | 0 | 0 | 1390 | 7879 | $0.005348 |
| 4 | 3797 | 0 | 0 | 2681 | 16389 | $0.009941 |
