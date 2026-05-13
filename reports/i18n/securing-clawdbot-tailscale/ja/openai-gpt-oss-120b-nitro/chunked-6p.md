# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 13402
- **Total output tokens**: 4702
- **Cache read tokens**: 3968
- **Cache write tokens**: 0
- **Total duration**: 22828ms
- **Estimated cost**: $0.001369 (local-openrouter-estimate)

## Article Summary
Thearticle warns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet gives attackers direct shell access, and it presents a “keep‑it‑local‑by‑default” security model. It explains three attack surfaces (SSH on port 22, the gateway UI/WebSocket on port 18789, and remote node/browser control) and shows how mis‑configuring these—especially by publishing Docker ports or enabling Tailscale Funnel—has already led to thousands of exposed instances. The core solution is to bind the gateway to loopback and route traffic only through a private Tailscale tailnet using the built‑in Serve mode, with optional token‑based auth for direct tailnet binds; Funnel should be avoided unless truly needed. The guide is written for developers or sysadmins deploying OpenClaw, adopting a practical, tutorial‑style tone that repeatedly frames the gateway as the “operator surface” that must stay hidden behind Tailscale.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1037 | 256 | 0 | 475 | 1808 | $0.000126 |
| 2 | 1274 | 512 | 0 | 559 | 4944 | $0.000150 |
| 3 | 1343 | 256 | 0 | 458 | 2107 | $0.000135 |
| 4 | 1182 | 256 | 0 | 328 | 3328 | $0.000105 |
| 5 | 1197 | 512 | 0 | 282 | 856 | $0.000097 |
| 6 | 1245 | 256 | 0 | 467 | 3394 | $0.000133 |
| 7 | 1305 | 512 | 0 | 514 | 1347 | $0.000143 |
| 8 | 1107 | 256 | 0 | 241 | 1088 | $0.000087 |
| 9 | 1237 | 384 | 0 | 415 | 543 | $0.000123 |
| 10 | 1129 | 512 | 0 | 377 | 1325 | $0.000112 |
| 11 | 1346 | 256 | 0 | 586 | 2088 | $0.000158 |
