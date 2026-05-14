# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 2
- **Total input tokens**: 2182
- **Total output tokens**: 490
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 2192ms
- **Estimated cost**: $0.000173 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article warns that JavaScript promises behave unlike ordinary values: they cannot be logged directly and must be accessed via `.then`. It highlights a common pitfall—passing the result of `console.log()` (which is `undefined`) instead of the function itself to `.then`, noting that the TC39 spec permits `null`/`undefined` handlers, which can silently break chains. Through a four‑option example, the author shows that only the calls that pass a function (`console.log` or an arrow wrapper) correctly log the resolved value, explaining the type differences that cause the confusion. The piece is written as a concise tutorial/analysis aimed at JavaScript developers familiar with promises, using clear code snippets and a “gotcha” framing metaphor.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1084 | 512 | 0 | 324 | 1297 | $0.000101 |
| 2 | 1098 | 512 | 0 | 166 | 895 | $0.000073 |
