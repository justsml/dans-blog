# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 3p
- **Total chunks**: 31
- **Total input tokens**: 34446
- **Total output tokens**: 9958
- **Cache read tokens**: 10368
- **Cache write tokens**: 0
- **Total duration**: 28455ms
- **Estimated cost**: $0.003136 (local-openrouter-estimate)

## Article Summary
Thearticle argues that PostgreSQL’s built‑in search tools—full‑text search (FTS), trigram matching (pg_trgm), and the newer pgvector extension—can often replace a separate vector database for many AI‑enhanced applications, and it explains when to use each. It describes FTS as a lexical, deterministic matcher ideal for exact‑term queries, boolean filters, and ranking without extra infrastructure; pg_trgm as a fuzzy‑string matcher suited for short identifiers, names, and typo‑tolerant autocomplete; and pgvector as a semantic, embedding‑based search for meaning‑based similarity. The tone is a practical tutorial aimed at developers and DBAs who already use PostgreSQL and are considering AI features, using a “search‑tool map” metaphor to frame the three technologies as complementary layers rather than competing alternatives.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 815 | 0 | 0 | 149 | 343 | $0.000059 |
| 2 | 939 | 512 | 0 | 132 | 295 | $0.000060 |
| 3 | 991 | 0 | 0 | 288 | 421 | $0.000090 |
| 4 | 1022 | 640 | 0 | 226 | 367 | $0.000081 |
| 5 | 984 | 256 | 0 | 145 | 545 | $0.000064 |
| 6 | 1067 | 256 | 0 | 207 | 779 | $0.000079 |
| 7 | 1095 | 256 | 0 | 224 | 840 | $0.000083 |
| 8 | 1063 | 256 | 0 | 278 | 831 | $0.000091 |
| 9 | 1318 | 256 | 0 | 507 | 1737 | $0.000143 |
| 10 | 1212 | 256 | 0 | 443 | 1105 | $0.000127 |
| 11 | 1066 | 256 | 0 | 95 | 517 | $0.000059 |
| 12 | 960 | 512 | 0 | 275 | 946 | $0.000087 |
| 13 | 1076 | 256 | 0 | 285 | 1145 | $0.000093 |
| 14 | 912 | 512 | 0 | 195 | 571 | $0.000071 |
| 15 | 1198 | 512 | 0 | 387 | 962 | $0.000116 |
| 16 | 983 | 256 | 0 | 242 | 789 | $0.000082 |
| 17 | 994 | 512 | 0 | 131 | 506 | $0.000062 |
| 18 | 1069 | 512 | 0 | 359 | 1122 | $0.000106 |
| 19 | 1095 | 0 | 0 | 151 | 715 | $0.000070 |
| 20 | 1082 | 0 | 0 | 271 | 749 | $0.000091 |
| 21 | 1011 | 256 | 0 | 136 | 458 | $0.000064 |
| 22 | 971 | 512 | 0 | 95 | 334 | $0.000055 |
| 23 | 1276 | 512 | 0 | 675 | 1681 | $0.000171 |
| 24 | 1546 | 512 | 0 | 893 | 2502 | $0.000221 |
| 25 | 2088 | 512 | 0 | 1344 | 3147 | $0.000323 |
| 26 | 1077 | 512 | 0 | 304 | 827 | $0.000097 |
| 27 | 1188 | 0 | 0 | 368 | 954 | $0.000113 |
| 28 | 1131 | 512 | 0 | 405 | 1258 | $0.000117 |
| 29 | 1160 | 512 | 0 | 431 | 1046 | $0.000123 |
| 30 | 1149 | 0 | 0 | 57 | 279 | $0.000055 |
| 31 | 908 | 512 | 0 | 260 | 684 | $0.000082 |
