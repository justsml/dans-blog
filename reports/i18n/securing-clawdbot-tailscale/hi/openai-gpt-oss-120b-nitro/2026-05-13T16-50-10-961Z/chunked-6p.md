# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 12420
- **Total output tokens**: 4495
- **Cache read tokens**: 6272
- **Cache write tokens**: 0
- **Total duration**: 7306ms
- **Estimated cost**: $0.001293 (local-openrouter-estimate)

## Article Summary
The article warns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet creates a direct shell‑access vector, and it shows how to avoid that by keeping the gateway bound to 127.0.0.1 and routing traffic only through a private Tailscale tailnet. It outlines the three attack surfaces (SSH on port 22, the gateway UI/WebSocket on port 18789, and browser‑node control), cites real‑world scans and a GitHub audit to illustrate the risk, and then presents a step‑by‑step “Tailscale Serve” configuration as the safest default, with optional “Funnel” mode only for intentional public exposure. The tone is a practical security tutorial aimed at developers and operators who deploy OpenClaw on VPS or local machines, using the metaphor of “gateways” as doors that must stay locked unless deliberately opened to a trusted network.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1024 | 384 | 0 | 460 | 518 | $0.000123 |
| 2 | 1148 | 640 | 0 | 542 | 920 | $0.000142 |
| 3 | 1183 | 640 | 0 | 433 | 396 | $0.000124 |
| 4 | 1121 | 640 | 0 | 265 | 643 | $0.000091 |
| 5 | 1091 | 640 | 0 | 305 | 488 | $0.000097 |
| 6 | 1186 | 640 | 0 | 436 | 738 | $0.000125 |
| 7 | 1203 | 384 | 0 | 479 | 434 | $0.000133 |
| 8 | 1030 | 640 | 0 | 226 | 348 | $0.000081 |
| 9 | 1154 | 384 | 0 | 428 | 421 | $0.000122 |
| 10 | 1055 | 640 | 0 | 380 | 1958 | $0.000110 |
| 11 | 1225 | 640 | 0 | 541 | 442 | $0.000145 |
