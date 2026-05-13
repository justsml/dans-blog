# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 10434
- **Total output tokens**: 4888
- **Cache read tokens**: 4864
- **Cache write tokens**: 0
- **Total duration**: 5522ms
- **Estimated cost**: $0.001287 (local-openrouter-estimate)

## Article Summary
The articlewarns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet gives attackers direct shell access, and it presents a “keep‑it‑local‑by‑default” security model. It explains three attack surfaces (SSH on port 22, the gateway UI/WebSocket on port 18789, and remote node/browser control) and shows how mis‑configuring these—especially by publishing Docker ports or enabling Tailscale Funnel—has already led to thousands of exposed instances. The core solution is to bind the gateway to 127.0.0.1 and route traffic only through a private Tailscale tailnet using the built‑in Serve mode, optionally using token‑based auth for direct tailnet binds. The guide is written as a practical, step‑by‑step tutorial aimed at developers or sysadmins deploying OpenClaw, using the metaphor of “operator surfaces” as doors that must stay closed unless deliberately opened.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1385 | 512 | 0 | 1000 | 1188 | $0.000234 |
| 2 | 1623 | 512 | 0 | 776 | 1243 | $0.000203 |
| 3 | 1425 | 768 | 0 | 363 | 354 | $0.000121 |
| 4 | 1628 | 768 | 0 | 737 | 595 | $0.000196 |
| 5 | 1533 | 768 | 0 | 709 | 585 | $0.000187 |
| 6 | 1379 | 768 | 0 | 683 | 682 | $0.000177 |
| 7 | 1461 | 768 | 0 | 620 | 875 | $0.000169 |
