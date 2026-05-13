# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 12650
- **Total output tokens**: 4049
- **Cache read tokens**: 1920
- **Cache write tokens**: 0
- **Total duration**: 19016ms
- **Estimated cost**: $0.001222 (local-openrouter-estimate)

## Article Summary
The article warns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet gives attackers direct shell access, and it outlines a “secure‑by‑default” deployment that keeps the gateway bound to 127.0.0.1 and routes traffic only through a Tailscale tailnet. It explains the three attack surfaces (SSH on port 22, the gateway UI/WebSocket on port 18789, and browser‑node control), shows how mis‑configuring Docker ports, reverse proxies, or Tailscale Funnel can unintentionally publish these surfaces, and cites real‑world scans (≈2,800 exposed instances) and a GitHub audit (512 findings) as evidence of the risk. The core recommendation is to use Tailscale Serve (or a tailnet‑only bind with token auth) and avoid Funnel unless public exposure is explicitly required, thereby preventing unauthenticated remote code execution. The guide is written for developers or sysadmins deploying OpenClaw who may not be security experts, using a practical tutorial tone with recurring “gateway‑exposed‑to‑the‑internet = shell access” metaphor.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1070 | 384 | 0 | 429 | 544 | $0.000119 |
| 2 | 1169 | 640 | 0 | 465 | 510 | $0.000129 |
| 3 | 1206 | 256 | 0 | 339 | 1042 | $0.000108 |
| 4 | 1136 | 0 | 0 | 258 | 6368 | $0.000091 |
| 5 | 1119 | 0 | 0 | 287 | 1494 | $0.000095 |
| 6 | 1197 | 0 | 0 | 426 | 2718 | $0.000123 |
| 7 | 1229 | 0 | 0 | 423 | 1140 | $0.000124 |
| 8 | 1045 | 0 | 0 | 228 | 1575 | $0.000082 |
| 9 | 1172 | 256 | 0 | 356 | 1812 | $0.000110 |
| 10 | 1063 | 0 | 0 | 340 | 1436 | $0.000103 |
| 11 | 1244 | 384 | 0 | 498 | 377 | $0.000138 |
