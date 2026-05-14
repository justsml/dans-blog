# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 13856
- **Total output tokens**: 7522
- **Cache read tokens**: 3328
- **Cache write tokens**: 0
- **Total duration**: 19141ms
- **Estimated cost**: $0.001894 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL already provides three distinct, native search primitives—full‑text search (lexical tsvector + GIN), trigram similarity (pg_trgm), and exact‑match indexes (B‑tree/hash)—and that teams should combine them rather than defaulting to a single tool or an external search service. It explains when each primitive fits: full‑text for long prose with stemming and ranking, trigram for fuzzy name or typo‑tolerant matching, and exact indexes for binary‑match fields like IDs or emails, emphasizing “match the tool to the shape of the query.” The guide is written as a practical tutorial for developers and DBAs who design search features in PostgreSQL, using a recurring visual metaphor of a “search primitive map” that plots tools against input length and semantic vs. lexical intent.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2912 | 512 | 0 | 2214 | 5026 | $0.000512 |
| 2 | 1372 | 512 | 0 | 500 | 1258 | $0.000144 |
| 3 | 1584 | 512 | 0 | 629 | 1624 | $0.000175 |
| 4 | 1329 | 512 | 0 | 431 | 1145 | $0.000129 |
| 5 | 1831 | 512 | 0 | 843 | 3481 | $0.000223 |
| 6 | 3383 | 0 | 0 | 2431 | 5416 | $0.000570 |
| 7 | 1445 | 768 | 0 | 474 | 1191 | $0.000142 |
