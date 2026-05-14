# Chunked Translation Report

- **Model**: google/gemini-3-flash-preview
- **Chunk size**: 18p
- **Total chunks**: 6
- **Total input tokens**: 13034
- **Total output tokens**: 7177
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 49217ms
- **Estimated cost**: $0.028048 (local-openrouter-estimate)

## Article Summary
This technical analysis argues that developers should leverage PostgreSQL’s native search capabilities—Full-Text Search (FTS), Trigrams (`pg_trgm`), and `pgvector`—before adopting dedicated vector databases, which often introduce unnecessary architectural complexity and synchronization issues. The author categorizes these tools by intent: FTS for lexical prose matching and exact terms, Trigrams for fuzzy string matching and typo-tolerant identifiers, and `pgvector` for semantic similarity. Written in a practical, tutorial-inflected tone, the article provides SQL implementations for each method to demonstrate how they compose naturally within existing relational logic. The core thesis is framed around the "search tool map," emphasizing that the choice depends on the shape of the data and the required answer type rather than a simple "old vs. new" dichotomy.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1483 | 0 | 0 | 707 | 6105 | $0.002862 |
| 2 | 2314 | 0 | 0 | 1315 | 11006 | $0.005102 |
| 3 | 2101 | 0 | 0 | 1096 | 7474 | $0.004339 |
| 4 | 2662 | 0 | 0 | 1624 | 10872 | $0.006203 |
| 5 | 3296 | 0 | 0 | 2246 | 11542 | $0.008386 |
| 6 | 1178 | 0 | 0 | 189 | 2218 | $0.001156 |
