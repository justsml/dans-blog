# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 17
- **Total input tokens**: 21057
- **Total output tokens**: 7821
- **Cache read tokens**: 5632
- **Cache write tokens**: 0
- **Total duration**: 25660ms
- **Estimated cost**: $0.002229 (local-openrouter-estimate)

## Article Summary
The article argues that “generative UI” is not a single technology but a layered problem space that should be broken into four distinct layers: the product shell the user interacts with, the UI‑composition grammar the model can emit, the runtime/transport protocol that moves messages and UI artifacts, and the backend agent/tool stack that supplies data and logic. It surveys the confusing terminology and overlapping projects (e.g., AG‑UI vs. A2UI, json‑render, CopilotKit, OpenAI Apps SDK, MCP Apps) and shows how each occupies a different layer. The core thesis is that developers must balance control and agent freedom along a spectrum—from safe tool‑to‑component rendering to open‑ended HTML generation—by choosing the minimal amount of model freedom needed for the user task. The tone is analytical and instructional, using a “map” metaphor and a “control spectrum” visual to frame the discussion, and it targets engineers and product designers building LLM‑driven interfaces.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 977 | 256 | 0 | 272 | 1280 | $0.000087 |
| 2 | 1017 | 256 | 0 | 337 | 907 | $0.000100 |
| 3 | 1353 | 512 | 0 | 586 | 2209 | $0.000158 |
| 4 | 1084 | 256 | 0 | 269 | 1081 | $0.000091 |
| 5 | 1363 | 256 | 0 | 580 | 1564 | $0.000158 |
| 6 | 1322 | 256 | 0 | 545 | 1745 | $0.000150 |
| 7 | 1089 | 256 | 0 | 304 | 905 | $0.000097 |
| 8 | 1130 | 256 | 0 | 166 | 528 | $0.000074 |
| 9 | 2140 | 256 | 0 | 1623 | 5061 | $0.000376 |
| 10 | 1131 | 256 | 0 | 326 | 1175 | $0.000103 |
| 11 | 1023 | 512 | 0 | 229 | 666 | $0.000081 |
| 12 | 1047 | 512 | 0 | 293 | 800 | $0.000094 |
| 13 | 1197 | 512 | 0 | 244 | 1011 | $0.000091 |
| 14 | 1230 | 256 | 0 | 471 | 2287 | $0.000133 |
| 15 | 1216 | 256 | 0 | 313 | 1002 | $0.000104 |
| 16 | 1699 | 256 | 0 | 1059 | 2702 | $0.000257 |
| 17 | 1039 | 512 | 0 | 204 | 737 | $0.000077 |
