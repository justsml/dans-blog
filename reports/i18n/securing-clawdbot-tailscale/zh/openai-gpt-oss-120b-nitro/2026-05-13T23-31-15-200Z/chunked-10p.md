# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 10559
- **Total output tokens**: 3516
- **Cache read tokens**: 3328
- **Cache write tokens**: 0
- **Total duration**: 10986ms
- **Estimated cost**: $0.001045 (local-openrouter-estimate)

## Article Summary
The articlewarns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet creates a direct shell‑access vector, and it shows how to avoid that by keeping the gateway bound to 127.0.0.1 and routing it only through a private Tailscale tailnet. It outlines the three attack surfaces (SSH on port 22, the gateway UI/WebSocket on port 18789, and browser‑node control), cites real‑world scans that found thousands of exposed instances, and explains why the “Serve” mode of Tailscale is the safe default while “Funnel” should be used only with password auth and explicit intent. The guide provides step‑by‑step commands for installing Tailscale, configuring OpenClaw’s gateway for Serve or token‑based tailnet binding, and cautions against publishing Docker ports or enabling public proxies. Intended for developers and operators deploying OpenClaw, the tone is a practical security tutorial that mixes concrete code snippets with a recurring metaphor of “operator surfaces” that must be kept behind a private network.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1422 | 512 | 0 | 661 | 1709 | $0.000174 |
| 2 | 1610 | 512 | 0 | 544 | 1269 | $0.000161 |
| 3 | 1437 | 512 | 0 | 268 | 1193 | $0.000104 |
| 4 | 1650 | 0 | 0 | 580 | 1469 | $0.000169 |
| 5 | 1544 | 768 | 0 | 560 | 2573 | $0.000161 |
| 6 | 1411 | 512 | 0 | 408 | 1102 | $0.000128 |
| 7 | 1485 | 512 | 0 | 495 | 1671 | $0.000147 |
