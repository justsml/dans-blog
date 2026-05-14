# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 10
- **Total input tokens**: 17167
- **Total output tokens**: 8039
- **Cache read tokens**: 3072
- **Cache write tokens**: 0
- **Total duration**: 18992ms
- **Estimated cost**: $0.002117 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that PostgreSQL already provides three complementary search tools—full‑text search (`tsvector`/GIN), trigram matching (`pg_trgm`), and semantic vector search (`pgvector`)—so teams should evaluate them before adding an external vector database. It explains the core differences: FTS is lexical and ideal for exact‑term, keyword‑driven queries; `pg_trgm` handles fuzzy matching of short strings, typos, and autocomplete; `pgvector` stores embeddings for semantic similarity when meaning, not wording, matters. The piece is written as a practical tutorial for developers and DBAs, using concrete SQL examples and a visual “search tool map” metaphor to frame each technology’s niche. The intended audience is engineers building search features who need guidance on when to use each PostgreSQL capability, either alone or in hybrid combinations.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1201 | 512 | 0 | 441 | 617 | $0.000126 |
| 2 | 1583 | 0 | 0 | 597 | 2131 | $0.000169 |
| 3 | 1794 | 768 | 0 | 1013 | 985 | $0.000252 |
| 4 | 1560 | 768 | 0 | 498 | 531 | $0.000150 |
| 5 | 1551 | 256 | 0 | 609 | 1837 | $0.000170 |
| 6 | 1573 | 0 | 0 | 742 | 2018 | $0.000195 |
| 7 | 2047 | 256 | 0 | 996 | 2778 | $0.000259 |
| 8 | 2886 | 0 | 0 | 2186 | 5202 | $0.000506 |
| 9 | 1758 | 0 | 0 | 715 | 1752 | $0.000197 |
| 10 | 1214 | 512 | 0 | 242 | 1141 | $0.000091 |
