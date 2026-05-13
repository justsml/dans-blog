# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 4
- **Total input tokens**: 5308
- **Total output tokens**: 5854
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 29103ms
- **Estimated cost**: $0.002277 (local-openrouter-estimate)

## Article Summary
The article argues that large language models (LLMs) are pattern-matching engines, not calculators, and therefore fail at multi-step or uncommon arithmetic—often producing confident but wrong results. The author recommends offloading math to a symbolic engine (CortexJS Compute Engine) via tool calling in AI SDKs (v5/v6), providing a TypeScript implementation that batches expressions and handles errors per expression. The tone is a tutorial with analytical critique, using the metaphor of a gymnast balancing a checkbook to illustrate the mismatch. The intended audience is developers building AI-powered applications that require reliable mathematical computation.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1212 | 0 | 0 | 1711 | 8438 | $0.000649 |
| 2 | 1758 | 0 | 0 | 1895 | 9895 | $0.000777 |
| 3 | 1241 | 384 | 0 | 1660 | 7573 | $0.000586 |
| 4 | 1097 | 384 | 0 | 588 | 3197 | $0.000266 |
