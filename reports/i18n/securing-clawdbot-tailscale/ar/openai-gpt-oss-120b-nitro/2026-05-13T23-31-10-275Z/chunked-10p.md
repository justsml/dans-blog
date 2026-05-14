# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9904
- **Total output tokens**: 3781
- **Cache read tokens**: 3328
- **Cache write tokens**: 0
- **Total duration**: 12414ms
- **Estimated cost**: $0.001067 (local-openrouter-estimate)

## Article Summary
The article warns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet gives attackers direct shell access, and it presents a concrete hardening workflow. It explains three attack surfaces—SSH (port 22), the gateway UI/WebSocket (port 18789), and remote‑node/browser control—and shows how mis‑configuring these (e.g., publishing Docker ports or enabling Tailscale Funnel) leads to remote code execution. The core solution is to keep the gateway bound to 127.0.0.1 and route traffic only through a private Tailscale tailnet using “Serve” mode, optionally securing the gateway with token‑based auth, while avoiding public Funnel exposure. The guide is written for developers and sysadmins deploying OpenClaw, using a practical tutorial tone with recurring metaphors of “operator surfaces” and “gateways” as doors that must stay closed to strangers.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1388 | 512 | 0 | 789 | 1931 | $0.000196 |
| 2 | 1475 | 0 | 0 | 569 | 1488 | $0.000160 |
| 3 | 1325 | 512 | 0 | 283 | 1728 | $0.000103 |
| 4 | 1559 | 768 | 0 | 631 | 1526 | $0.000174 |
| 5 | 1479 | 512 | 0 | 583 | 2955 | $0.000163 |
| 6 | 1326 | 512 | 0 | 399 | 1167 | $0.000124 |
| 7 | 1352 | 512 | 0 | 527 | 1619 | $0.000148 |
