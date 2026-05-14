# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 6800
- **Total output tokens**: 4792
- **Cache read tokens**: 384
- **Cache write tokens**: 0
- **Total duration**: 27895ms
- **Estimated cost**: $0.002241 (local-openrouter-estimate)

## Article Summary
This tutorial-style article warns that publicly exposing OpenClaw’s gateway, SSH, or node controls without strong authentication can give attackers shell access to the user’s machine. It identifies three critical surfaces—port 18789 (Gateway Control UI/WebSocket), port 22 (SSH), and browser/node pairing—and highlights that Shodan scans found thousands of exposed instances. The recommended solution is to bind the gateway to loopback and expose it only via Tailscale Serve, keeping it private on the tailnet while avoiding Funnel or public proxies. The guide provides step‑by‑step setup for Tailscale and OpenClaw configuration, targeting users who deploy personal AI assistants and want secure remote access without being security experts. Recurring metaphors like “operator surface” and “shell access” frame the risk as a direct path from public exposure to command execution.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1688 | 0 | 0 | 939 | 5795 | $0.000499 |
| 2 | 1748 | 0 | 0 | 831 | 4969 | $0.000477 |
| 3 | 1797 | 384 | 0 | 949 | 5652 | $0.000465 |
| 4 | 1567 | 0 | 0 | 2073 | 11479 | $0.000800 |
