# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 3p
- **Total chunks**: 31
- **Total input tokens**: 36337
- **Total output tokens**: 10572
- **Cache read tokens**: 12672
- **Cache write tokens**: 0
- **Total duration**: 24037ms
- **Estimated cost**: $0.003320 (local-openrouter-estimate)

## Article Summary
The article argues that PostgreSQL’s built‑in search tools—full‑text search (FTS), trigram matching (pg_trgm), and the newer pgvector extension—can often replace a separate vector database for many AI‑enhanced applications, and it explains when to use each. It describes FTS as a lexical, deterministic system ideal for exact‑term queries, boolean filters, and ranking without extra infrastructure; pg_trgm as a fuzzy‑string matcher suited for short identifiers, names, and typo‑tolerant autocomplete; and pgvector as a semantic, embedding‑based matcher for meaning‑oriented searches. The tone is a practical tutorial aimed at developers and DBAs who are evaluating search strategies for PostgreSQL‑backed products, using a “tool map” metaphor to frame the three technologies as complementary parts of a single search ecosystem.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 820 | 384 | 0 | 163 | 299 | $0.000061 |
| 2 | 959 | 512 | 0 | 175 | 267 | $0.000069 |
| 3 | 1039 | 640 | 0 | 303 | 410 | $0.000095 |
| 4 | 1145 | 640 | 0 | 227 | 613 | $0.000086 |
| 5 | 1011 | 640 | 0 | 155 | 320 | $0.000067 |
| 6 | 1081 | 640 | 0 | 228 | 412 | $0.000083 |
| 7 | 1191 | 0 | 0 | 256 | 264 | $0.000093 |
| 8 | 1085 | 640 | 0 | 272 | 539 | $0.000091 |
| 9 | 1435 | 0 | 0 | 502 | 1346 | $0.000146 |
| 10 | 1250 | 640 | 0 | 419 | 410 | $0.000124 |
| 11 | 1121 | 640 | 0 | 112 | 284 | $0.000064 |
| 12 | 970 | 640 | 0 | 297 | 381 | $0.000091 |
| 13 | 1223 | 640 | 0 | 285 | 444 | $0.000099 |
| 14 | 939 | 640 | 0 | 152 | 249 | $0.000064 |
| 15 | 1205 | 640 | 0 | 406 | 557 | $0.000120 |
| 16 | 1036 | 640 | 0 | 285 | 539 | $0.000092 |
| 17 | 1060 | 640 | 0 | 138 | 281 | $0.000066 |
| 18 | 1082 | 640 | 0 | 399 | 425 | $0.000114 |
| 19 | 1224 | 640 | 0 | 158 | 268 | $0.000076 |
| 20 | 1095 | 640 | 0 | 321 | 379 | $0.000100 |
| 21 | 1148 | 256 | 0 | 151 | 1274 | $0.000072 |
| 22 | 991 | 0 | 0 | 107 | 504 | $0.000058 |
| 23 | 1296 | 256 | 0 | 676 | 1635 | $0.000172 |
| 24 | 1616 | 256 | 0 | 976 | 2874 | $0.000239 |
| 25 | 2264 | 0 | 0 | 1514 | 3343 | $0.000361 |
| 26 | 1088 | 0 | 0 | 345 | 1049 | $0.000105 |
| 27 | 1300 | 0 | 0 | 381 | 1006 | $0.000119 |
| 28 | 1240 | 0 | 0 | 385 | 1081 | $0.000118 |
| 29 | 1294 | 0 | 0 | 438 | 1328 | $0.000129 |
| 30 | 1211 | 256 | 0 | 61 | 317 | $0.000058 |
| 31 | 918 | 512 | 0 | 285 | 939 | $0.000087 |
