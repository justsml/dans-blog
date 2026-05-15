# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 11790
- **Total output tokens**: 7720
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 21701ms
- **Estimated cost**: $0.001849 (local-openrouter-estimate)

## Article Summary
The article argues that modern teams should deliberately combine all three native PostgreSQL search primitives—full‑text search (`tsvector`/GIN), trigram indexes (`pg_trgm`), and exact‑match indexes (B‑tree/Hash)—instead of defaulting to a single tool or an external search service. It explains each technology’s core mechanics (lexical tokenization and ranking, orthographic similarity via 3‑character slices, and binary matching for keys), shows when each is the right fit, and frames the decision as “match the tool to the shape of the query.” The guide is written as a practical tutorial for developers, DBAs, and product teams who need to design efficient, low‑complexity search within PostgreSQL. Recurring metaphors compare the tools to “different lenses” for the same data, emphasizing that the choice is about query shape—not sophistication.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 3636 | 0 | 0 | 2872 | 8038 | $0.000659 |
| 2 | 2038 | 0 | 0 | 1010 | 3478 | $0.000261 |
| 3 | 2489 | 0 | 0 | 1397 | 3774 | $0.000349 |
| 4 | 3627 | 0 | 0 | 2441 | 6411 | $0.000581 |
