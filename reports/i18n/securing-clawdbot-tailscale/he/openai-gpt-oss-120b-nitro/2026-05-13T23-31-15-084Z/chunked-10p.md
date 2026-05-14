# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 10085
- **Total output tokens**: 3997
- **Cache read tokens**: 3072
- **Cache write tokens**: 0
- **Total duration**: 12634ms
- **Estimated cost**: $0.001113 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article warns that exposing OpenClaw’s gateway, node controls, or SSH to the public Internet gives attackers direct shell access to the host. It outlines the three attack surfaces (SSH port 22, gateway WebSocket port 18789, and remote‑node/browser control) and cites real‑world scans that found thousands of vulnerable instances. The core recommendation is to keep the gateway bound to 127.0.0.1 and route traffic only through a private Tailscale network—using Tailscale Serve for most personal deployments and avoiding the public “Funnel” mode unless absolutely necessary. Step‑by‑step instructions show how to install Tailscale, configure OpenClaw’s `gateway` settings, and securely expose the service. The piece is a practical security‑focused tutorial aimed at developers and operators who run OpenClaw (formerly Clawdbot/Moltbot) on VPS or local machines.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1398 | 512 | 0 | 803 | 2318 | $0.000199 |
| 2 | 1517 | 512 | 0 | 621 | 1998 | $0.000171 |
| 3 | 1344 | 512 | 0 | 312 | 1325 | $0.000109 |
| 4 | 1589 | 512 | 0 | 669 | 1895 | $0.000182 |
| 5 | 1509 | 512 | 0 | 583 | 1561 | $0.000164 |
| 6 | 1342 | 512 | 0 | 454 | 2122 | $0.000134 |
| 7 | 1386 | 0 | 0 | 555 | 1415 | $0.000154 |
