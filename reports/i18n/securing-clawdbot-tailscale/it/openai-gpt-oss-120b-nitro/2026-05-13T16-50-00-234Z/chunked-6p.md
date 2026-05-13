# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 12366
- **Total output tokens**: 3953
- **Cache read tokens**: 2560
- **Cache write tokens**: 0
- **Total duration**: 15480ms
- **Estimated cost**: $0.001194 (local-openrouter-estimate)

## Article Summary
**Summary**  
The article warns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet gives attackers direct shell access, and it presents a concrete hardening guide. It explains the three attack surfaces (SSH port 22, gateway WebSocket port 18789, and remote‑node/browser control) and cites real‑world scans that found thousands of vulnerable instances. The core recommendation is to keep the gateway bound to 127.0.0.1 and route traffic only through a private Tailscale tailnet using Tailscale Serve (or a token‑auth tailnet bind), avoiding Tailscale Funnel or any public port publishing. The piece is written as a practical, security‑focused tutorial for developers and sysadmins deploying OpenClaw (formerly Clawdbot/Moltbot) who may not be security experts. It repeatedly frames the problem as “publishing operator surfaces” and uses the metaphor of a “gateway” as the door that must stay locked.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1045 | 256 | 0 | 401 | 1416 | $0.000113 |
| 2 | 1126 | 0 | 0 | 469 | 1333 | $0.000128 |
| 3 | 1172 | 256 | 0 | 367 | 1237 | $0.000112 |
| 4 | 1099 | 0 | 0 | 265 | 880 | $0.000091 |
| 5 | 1099 | 256 | 0 | 245 | 1292 | $0.000087 |
| 6 | 1175 | 256 | 0 | 407 | 2568 | $0.000119 |
| 7 | 1194 | 0 | 0 | 430 | 1167 | $0.000124 |
| 8 | 1033 | 512 | 0 | 228 | 1037 | $0.000081 |
| 9 | 1154 | 512 | 0 | 359 | 1045 | $0.000110 |
| 10 | 1047 | 256 | 0 | 295 | 1126 | $0.000094 |
| 11 | 1222 | 256 | 0 | 487 | 2379 | $0.000135 |
