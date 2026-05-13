# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 17
- **Total input tokens**: 24186
- **Total output tokens**: 10614
- **Cache read tokens**: 9984
- **Cache write tokens**: 0
- **Total duration**: 10455ms
- **Estimated cost**: $0.002854 (local-openrouter-estimate)

## Article Summary
The article argues that “generative UI” at runtime is a distinct architectural concept: the LLM decides which pre‑defined UI component(s) to display, not just what text to render. It separates this from design‑time code generators, simple form autofill, and unsafe raw‑HTML injection, warning that the latter poses security and accessibility risks. Three implementation patterns are outlined—a safe tool‑to‑component mapping, a middle‑ground JSON‑driven component catalog, and an open‑ended generation approach—each with its own grammar, risk profile, and suitable use cases. The tone is an analytical guide aimed at engineers and product teams building AI‑augmented front‑ends, using a “map” metaphor to help readers locate the appropriate pattern in their stack.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1182 | 512 | 0 | 579 | 583 | $0.000150 |
| 2 | 1320 | 640 | 0 | 391 | 392 | $0.000122 |
| 3 | 1527 | 640 | 0 | 799 | 719 | $0.000203 |
| 4 | 1460 | 512 | 0 | 518 | 450 | $0.000150 |
| 5 | 1385 | 640 | 0 | 655 | 826 | $0.000172 |
| 6 | 1463 | 640 | 0 | 650 | 524 | $0.000174 |
| 7 | 1548 | 0 | 0 | 762 | 524 | $0.000198 |
| 8 | 1401 | 640 | 0 | 580 | 733 | $0.000159 |
| 9 | 1465 | 640 | 0 | 733 | 570 | $0.000189 |
| 10 | 1399 | 640 | 0 | 614 | 509 | $0.000165 |
| 11 | 1236 | 640 | 0 | 347 | 350 | $0.000111 |
| 12 | 1389 | 640 | 0 | 516 | 438 | $0.000147 |
| 13 | 1560 | 640 | 0 | 728 | 630 | $0.000192 |
| 14 | 1592 | 640 | 0 | 890 | 693 | $0.000222 |
| 15 | 1536 | 640 | 0 | 688 | 760 | $0.000184 |
| 16 | 1546 | 640 | 0 | 765 | 1372 | $0.000198 |
| 17 | 1177 | 640 | 0 | 399 | 382 | $0.000118 |
