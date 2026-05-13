# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 12499
- **Total output tokens**: 10408
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 177943ms
- **Estimated cost**: $0.003498 (local-openrouter-estimate)

## Article Summary
The article argues that deploying OpenClaw (a multi-platform AI assistant) with insecure network exposure risks granting attackers shell access to your machine. It highlights three vulnerable surfaces—SSH (port 22), the gateway API (port 18789), and browser/node controls—and emphasizes that default loopback binding for the gateway should be maintained unless explicitly configured for secure private access via Tailscale. The core solution involves using Tailscale’s encrypted "tailnet" to isolate OpenClaw’s operator interfaces, with **Serve mode** (private access) preferred over **Funnel mode** (public exposure), and stresses the importance of strong authentication and avoiding Docker port publishing. The tone is **tutorial/analysis**, offering step-by-step security hardening while citing real-world vulnerabilities (e.g., Shodan scans, GitHub audit findings) to underscore risks. Key metaphors include "operator surfaces" (exposed control points) and framing Tailscale as a "secure tunnel" to avoid "leaving SSH open to the world." Intended for **non-expert users** deploying OpenClaw, it prioritizes practical safeguards over complex security measures.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1028 | 0 | 0 | 1010 | 39104 | $0.000325 |
| 2 | 1145 | 0 | 0 | 1186 | 35686 | $0.000376 |
| 3 | 1179 | 0 | 0 | 792 | 16304 | $0.000284 |
| 4 | 1123 | 0 | 0 | 932 | 12361 | $0.000314 |
| 5 | 1120 | 0 | 0 | 885 | 10940 | $0.000302 |
| 6 | 1188 | 0 | 0 | 935 | 9995 | $0.000319 |
| 7 | 1211 | 0 | 0 | 1269 | 15581 | $0.000401 |
| 8 | 1054 | 0 | 0 | 857 | 10491 | $0.000290 |
| 9 | 1176 | 0 | 0 | 755 | 8091 | $0.000275 |
| 10 | 1046 | 0 | 0 | 803 | 8679 | $0.000276 |
| 11 | 1229 | 0 | 0 | 984 | 10711 | $0.000334 |
