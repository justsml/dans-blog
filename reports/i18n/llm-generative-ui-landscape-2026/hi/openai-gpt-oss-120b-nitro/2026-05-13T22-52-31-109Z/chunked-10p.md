# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 17
- **Total input tokens**: 25807
- **Total output tokens**: 12739
- **Cache read tokens**: 12544
- **Cache write tokens**: 0
- **Total duration**: 13455ms
- **Estimated cost**: $0.003299 (local-openrouter-estimate)

## Article Summary
**Summary – “The LLM GenUI Landscape v2”**

The article argues that “generative UI” is an overloaded term and must be split into three concrete runtime patterns, each with a distinct risk‑/cost profile. Pattern 1 (tool‑to‑component) lets an LLM trigger pre‑written UI components via tool calls—​the safest approach, used by Vercel AI SDK, CopilotKit, etc. Pattern 2 (component‑catalog composition) has the model emit a typed JSON tree that references a developer‑curated catalog of components, balancing expressive layout with schema validation. Pattern 3 (open‑ended markup generation) directly produces raw HTML/JSX, which is technically possible but highly unsafe (XSS, accessibility, styling issues). The piece is a technical analysis aimed at engineers and product designers building AI‑augmented front‑ends, using a “map” metaphor to guide architectural decisions and warning against conflating design‑time code generation, form autofill, and raw markup generation.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1241 | 512 | 0 | 687 | 725 | $0.000172 |
| 2 | 1412 | 768 | 0 | 472 | 548 | $0.000140 |
| 3 | 1627 | 512 | 0 | 931 | 921 | $0.000231 |
| 4 | 1554 | 768 | 0 | 661 | 630 | $0.000180 |
| 5 | 1492 | 768 | 0 | 829 | 702 | $0.000207 |
| 6 | 1569 | 768 | 0 | 849 | 746 | $0.000214 |
| 7 | 1650 | 768 | 0 | 906 | 839 | $0.000227 |
| 8 | 1508 | 768 | 0 | 706 | 828 | $0.000186 |
| 9 | 1536 | 768 | 0 | 810 | 1062 | $0.000206 |
| 10 | 1496 | 768 | 0 | 712 | 614 | $0.000187 |
| 11 | 1342 | 768 | 0 | 510 | 850 | $0.000144 |
| 12 | 1481 | 768 | 0 | 591 | 709 | $0.000164 |
| 13 | 1666 | 768 | 0 | 866 | 1048 | $0.000221 |
| 14 | 1683 | 768 | 0 | 976 | 891 | $0.000241 |
| 15 | 1627 | 768 | 0 | 790 | 871 | $0.000206 |
| 16 | 1644 | 768 | 0 | 1008 | 953 | $0.000246 |
| 17 | 1279 | 768 | 0 | 435 | 518 | $0.000128 |
