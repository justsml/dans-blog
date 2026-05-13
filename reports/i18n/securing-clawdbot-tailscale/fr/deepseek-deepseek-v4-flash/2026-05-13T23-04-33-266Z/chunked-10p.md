# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9120
- **Total output tokens**: 11434
- **Cache read tokens**: 1536
- **Cache write tokens**: 0
- **Total duration**: 147425ms
- **Estimated cost**: $0.004268 (local-openrouter-estimate)

## Article Summary
This tutorial-style security guide argues that exposing OpenClaw’s gateway, node controls, or SSH on the public internet without strong authentication invites shell access, citing Shodan scans that found 2,847 exposed instances. It recommends the safest default: keep the gateway bound to loopback, expose it only via Tailscale Serve (tailnet-private), lock down SSH, and avoid Tailscale Funnel unless public access is truly needed. The intended audience is OpenClaw deployers, especially non-experts, and the tone is a cautionary how-to that frames “operator surfaces” as the core risk and the tailnet as the secure private network.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1294 | 0 | 0 | 1145 | 5911 | $0.000502 |
| 2 | 1365 | 384 | 0 | 1756 | 9149 | $0.000630 |
| 3 | 1204 | 0 | 0 | 1371 | 79786 | $0.000552 |
| 4 | 1441 | 384 | 0 | 873 | 7227 | $0.000393 |
| 5 | 1378 | 384 | 0 | 2658 | 20640 | $0.000884 |
| 6 | 1201 | 384 | 0 | 1464 | 12184 | $0.000525 |
| 7 | 1237 | 0 | 0 | 2167 | 12528 | $0.000780 |
