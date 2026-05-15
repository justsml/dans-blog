# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 8264
- **Total output tokens**: 3845
- **Cache read tokens**: 1792
- **Cache write tokens**: 0
- **Total duration**: 6903ms
- **Estimated cost**: $0.001014 (local-openrouter-estimate)

## Article Summary
The article warns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet creates a direct shell‑access vector, and it shows how to avoid that by keeping the gateway bound to 127.0.0.1 and routing only through a private Tailscale tailnet. It outlines the three attack surfaces (SSH on port 22, the gateway UI/WebSocket on port 18789, and browser‑node control), cites real‑world scans that found thousands of exposed instances, and explains why the “Serve” mode of Tailscale is the safe default while “Funnel” should be used only with password auth and explicit need. The guide provides step‑by‑step commands for installing Tailscale, configuring OpenClaw’s gateway for Serve or token‑based tailnet binding, and cautions against publishing Docker ports or enabling public proxies. Intended for developers and operators deploying OpenClaw who are not security experts but need practical hardening instructions. The tone is a pragmatic tutorial with occasional cautionary anecdotes, using the metaphor of “opening a door” to illustrate the risk of unintentionally exposing operator surfaces.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2073 | 768 | 0 | 1176 | 1571 | $0.000293 |
| 2 | 2112 | 0 | 0 | 898 | 2200 | $0.000244 |
| 3 | 2162 | 0 | 0 | 960 | 2328 | $0.000257 |
| 4 | 1917 | 1024 | 0 | 811 | 804 | $0.000221 |
