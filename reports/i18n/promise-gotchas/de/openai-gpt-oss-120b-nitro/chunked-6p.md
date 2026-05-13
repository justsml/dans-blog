# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 3
- **Total input tokens**: 2746
- **Total output tokens**: 490
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 3655ms
- **Estimated cost**: $0.000195 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article explains that JavaScript promises behave unlike ordinary values: you cannot log a promise directly and must use `.then` to access its resolved value. It warns that the TC39 design allowing `.then` and `.catch` to accept `null` or undefined can lead to subtle bugs, especially when developers mistakenly invoke callbacks instead of passing them. Through a series of examples, the piece shows which forms of `.then` calls correctly log the resolved value (e.g., passing `console.log` as a function versus calling `console.log()` which returns `undefined`). The tone is instructional with a tutorial‑style focus, using concrete code snippets as the primary metaphor for “passing” versus “invoking” callbacks. The intended audience is JavaScript developers familiar with promises who need to avoid common pitfalls.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 843 | 256 | 0 | 189 | 983 | $0.000067 |
| 2 | 1022 | 256 | 0 | 222 | 2047 | $0.000080 |
| 3 | 881 | 256 | 0 | 79 | 625 | $0.000049 |
