# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 16311
- **Total output tokens**: 7743
- **Cache read tokens**: 1920
- **Cache write tokens**: 0
- **Total duration**: 20780ms
- **Estimated cost**: $0.002030 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL already provides three complementary search primitives—full‑text search (`tsvector`/GIN), trigram similarity (`pg_trgm`), and exact‑match indexes (B‑tree/Hash)—and that teams should master all of them to build robust, low‑complexity search without resorting to external services. It explains each tool’s mechanics, ideal use‑cases (lexical matching for prose, fuzzy matching for names/typos, binary matching for IDs), and how they can be layered together, illustrated with a visual “search primitive map.” The tone is a practical tutorial aimed at developers, DBAs, and product teams who design search features in PostgreSQL‑backed applications. Recurring framing treats the three tools as a “toolbox” where the right primitive is chosen based on the shape of the query rather than perceived sophistication.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 998 | 384 | 0 | 339 | 358 | $0.000100 |
| 2 | 2836 | 256 | 0 | 2057 | 5997 | $0.000481 |
| 3 | 1202 | 256 | 0 | 384 | 1110 | $0.000116 |
| 4 | 1035 | 0 | 0 | 271 | 754 | $0.000089 |
| 5 | 1329 | 0 | 0 | 426 | 1398 | $0.000129 |
| 6 | 1057 | 0 | 0 | 320 | 962 | $0.000099 |
| 7 | 1077 | 512 | 0 | 279 | 1036 | $0.000092 |
| 8 | 1311 | 0 | 0 | 490 | 1487 | $0.000139 |
| 9 | 1389 | 512 | 0 | 703 | 2149 | $0.000181 |
| 10 | 2844 | 0 | 0 | 2033 | 3806 | $0.000477 |
| 11 | 1233 | 0 | 0 | 441 | 1723 | $0.000127 |
