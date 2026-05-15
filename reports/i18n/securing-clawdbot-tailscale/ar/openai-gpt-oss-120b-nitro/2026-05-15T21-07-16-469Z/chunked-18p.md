# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 8150
- **Total output tokens**: 3546
- **Cache read tokens**: 3584
- **Cache write tokens**: 0
- **Total duration**: 3513ms
- **Estimated cost**: $0.000956 (local-openrouter-estimate)

## Article Summary
The article warns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet gives attackers direct shell access, and it presents a concrete hardening recipe centered on Tailscale. It explains the three attack surfaces (SSH port 22, gateway WebSocket port 18789, and browser‑node pairing), shows how default loopback binding mitigates risk, and contrasts Tailscale’s “Serve” mode (private tail‑net routing) with the risky “Funnel” mode that publicly proxies the gateway. The guide walks readers through installing Tailscale, configuring OpenClaw to run the gateway on loopback with `tailscale serve`, and optionally using token‑based auth for a direct tail‑net bind, emphasizing that no deep security expertise is required. The tone is a practical tutorial aimed at developers or operators deploying OpenClaw who may not be security specialists but need safe defaults. Recurring metaphors frame the gateway as an “operator surface” that must stay “behind the firewall” and Tailscale as a “private tunnel” that lets you “reach without publishing”.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2063 | 768 | 0 | 1113 | 1290 | $0.000281 |
| 2 | 2079 | 768 | 0 | 810 | 758 | $0.000227 |
| 3 | 2118 | 1024 | 0 | 889 | 683 | $0.000243 |
| 4 | 1890 | 1024 | 0 | 734 | 782 | $0.000206 |
