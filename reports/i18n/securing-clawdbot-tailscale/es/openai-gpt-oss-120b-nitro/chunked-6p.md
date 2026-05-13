# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 6p
- **Total chunks**: 11
- **Total input tokens**: 12552
- **Total output tokens**: 3865
- **Cache read tokens**: 1664
- **Cache write tokens**: 0
- **Total duration**: 19471ms
- **Estimated cost**: $0.001185 (local-openrouter-estimate)

## Article Summary
The article warns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet creates a direct path to shell access on the host, and it shows how to avoid that by keeping the gateway bound to 127.0.0.1 and routing traffic only through a private Tailscale tailnet. It outlines the three attack surfaces (SSH port 22, gateway WebSocket port 18789, and browser‑node control), cites real‑world scans that found thousands of exposed instances, and explains why the “Serve” mode of Tailscale is the safe default while “Funnel” should be avoided unless public exposure is intentional. The guide provides step‑by‑step commands for installing Tailscale, configuring OpenClaw’s gateway in Serve or token‑auth mode, and ensuring Docker ports are not unintentionally published. The tone is a practical security tutorial aimed at developers and operators deploying OpenClaw who may not be security experts. Recurring metaphors frame the gateway as an “operator surface” that, if left open, lets attackers “drive the agent” or gain remote code execution.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1067 | 384 | 0 | 396 | 4220 | $0.000113 |
| 2 | 1157 | 0 | 0 | 410 | 2948 | $0.000119 |
| 3 | 1178 | 0 | 0 | 355 | 2799 | $0.000110 |
| 4 | 1129 | 0 | 0 | 241 | 1126 | $0.000087 |
| 5 | 1105 | 640 | 0 | 262 | 308 | $0.000090 |
| 6 | 1190 | 0 | 0 | 385 | 1606 | $0.000116 |
| 7 | 1223 | 0 | 0 | 404 | 1504 | $0.000120 |
| 8 | 1041 | 0 | 0 | 244 | 1096 | $0.000085 |
| 9 | 1173 | 640 | 0 | 372 | 611 | $0.000113 |
| 10 | 1055 | 0 | 0 | 277 | 1873 | $0.000091 |
| 11 | 1234 | 0 | 0 | 519 | 1380 | $0.000142 |
