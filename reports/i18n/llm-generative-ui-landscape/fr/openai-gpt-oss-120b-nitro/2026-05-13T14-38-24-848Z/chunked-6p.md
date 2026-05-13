# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 17
- **Total input tokens**: 21853
- **Total output tokens**: 7916
- **Cache read tokens**: 1792
- **Cache write tokens**: 0
- **Total duration**: 21505ms
- **Estimated cost**: $0.002277 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article argues that “generative UI” is not a single technology but a layered problem space that should be decomposed into four distinct layers: the product shell (the user‑facing container), the UI composition model (the grammar the LLM speaks, e.g., tool calls, JSON specs, A2UI), the runtime/transport layer (how state, messages, and UI artifacts move between agent and frontend), and the agent‑tool backend (the underlying LLM orchestration, retrieval, and business logic). It surveys the confusing terminology—React component selection, JSON‑render specs, iframe apps, chat‑UI libraries, agent protocols, and code generators—showing how each fits into a specific layer rather than being interchangeable. The piece adopts an analytical, tutorial‑style tone, using a “map” metaphor and a “control spectrum” diagram to illustrate the trade‑off between developer control and agent freedom, and it cites concrete projects (AG‑UI, A2UI, json‑render, CopilotKit, OpenAI Apps SDK, MCP Apps) as examples of each layer. The intended audience is developers and product designers building LLM‑driven applications who need a clear architectural framework for choosing and combining these emerging tools.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1032 | 256 | 0 | 270 | 1047 | $0.000089 |
| 2 | 1065 | 0 | 0 | 386 | 1050 | $0.000111 |
| 3 | 1389 | 0 | 0 | 591 | 1576 | $0.000161 |
| 4 | 1127 | 0 | 0 | 272 | 799 | $0.000093 |
| 5 | 1409 | 0 | 0 | 662 | 1555 | $0.000174 |
| 6 | 1361 | 0 | 0 | 564 | 1378 | $0.000155 |
| 7 | 1135 | 256 | 0 | 303 | 1405 | $0.000099 |
| 8 | 1182 | 0 | 0 | 171 | 631 | $0.000077 |
| 9 | 2190 | 256 | 0 | 1575 | 3711 | $0.000369 |
| 10 | 1186 | 0 | 0 | 348 | 1014 | $0.000109 |
| 11 | 1068 | 0 | 0 | 228 | 699 | $0.000083 |
| 12 | 1103 | 0 | 0 | 295 | 865 | $0.000096 |
| 13 | 1233 | 256 | 0 | 232 | 732 | $0.000090 |
| 14 | 1277 | 0 | 0 | 445 | 1161 | $0.000130 |
| 15 | 1274 | 0 | 0 | 324 | 507 | $0.000108 |
| 16 | 1745 | 512 | 0 | 1068 | 2577 | $0.000260 |
| 17 | 1077 | 256 | 0 | 182 | 798 | $0.000075 |
