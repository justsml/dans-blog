# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 12098
- **Total output tokens**: 3935
- **Cache read tokens**: 384
- **Cache write tokens**: 0
- **Total duration**: 20073ms
- **Estimated cost**: $0.001180 (local-openrouter-estimate)

## Article Summary
The article warns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet gives attackers direct shell access, and it presents a concrete hardening workflow. It explains the three attack surfaces (SSH on port 22, the gateway UI/WebSocket on port 18789, and remote‑node/browser control) and shows how most real‑world breaches stem from overriding the default loopback binding or publishing ports. The core solution is to keep the gateway bound to 127.0.0.1 and route traffic through Tailscale Serve (or a tailnet‑only bind with token auth), avoiding Tailscale Funnel unless a public endpoint is truly needed, and to lock down SSH with strong authentication. The guide is written as a practical, security‑focused tutorial aimed at developers and operators deploying OpenClaw, using the metaphor of “operator surfaces” as doors that must stay closed.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1021 | 0 | 0 | 401 | 2494 | $0.000112 |
| 2 | 1109 | 0 | 0 | 445 | 2436 | $0.000123 |
| 3 | 1136 | 0 | 0 | 369 | 2227 | $0.000111 |
| 4 | 1088 | 0 | 0 | 249 | 1448 | $0.000087 |
| 5 | 1070 | 384 | 0 | 254 | 312 | $0.000087 |
| 6 | 1144 | 0 | 0 | 398 | 2799 | $0.000116 |
| 7 | 1180 | 0 | 0 | 436 | 1164 | $0.000125 |
| 8 | 1001 | 0 | 0 | 220 | 1712 | $0.000079 |
| 9 | 1128 | 0 | 0 | 372 | 958 | $0.000111 |
| 10 | 1026 | 0 | 0 | 289 | 1751 | $0.000092 |
| 11 | 1195 | 0 | 0 | 502 | 2772 | $0.000137 |
