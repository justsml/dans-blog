# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 6959
- **Total output tokens**: 3364
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 9061ms
- **Estimated cost**: $0.000877 (local-openrouter-estimate)

## Article Summary
The articlewarns that exposing OpenClaw’s gateway, node controls, or SSH to the public internet creates a direct shell‑access vector, and it shows how to avoid that by keeping the gateway bound to 127.0.0.1 and routing access through Tailscale’s private‑network features. It outlines three attack surfaces (SSH on port 22, the gateway UI/WebSocket on port 18789, and browser‑node control), cites real‑world scans that found thousands of exposed instances, and explains why the “Serve” mode of Tailscale is the safe default while “Funnel” should only be used with strong password auth. The guide is a practical, security‑focused tutorial aimed at developers and operators deploying OpenClaw, using the metaphor of “publishing operator surfaces” to frame the risk of unintentionally making the assistant publicly reachable.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1712 | 512 | 0 | 991 | 959 | $0.000245 |
| 2 | 1788 | 512 | 0 | 809 | 3759 | $0.000215 |
| 3 | 1848 | 512 | 0 | 871 | 2287 | $0.000229 |
| 4 | 1611 | 512 | 0 | 693 | 2056 | $0.000188 |
