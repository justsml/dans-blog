# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9489
- **Total output tokens**: 11743
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 67267ms
- **Estimated cost**: $0.004511 (local-openrouter-estimate)

## Article Summary
The article warns that exposing OpenClaw’s gateway, node controls, or SSH on the public internet without strong authentication can give attackers shell access, citing Shodan scans that found thousands of exposed instances. It recommends keeping the gateway bound to loopback and using Tailscale Serve for private tailnet access, while avoiding Tailscale Funnel unless public exposure is truly needed. The tone is a security-focused tutorial aimed at OpenClaw users, framing the gateway and browser control as “operator surfaces” that must remain hidden behind a private network (tailnet).

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1277 | 0 | 0 | 2410 | 11844 | $0.000854 |
| 2 | 1479 | 384 | 0 | 818 | 4802 | $0.000383 |
| 3 | 1297 | 0 | 0 | 1318 | 11814 | $0.000551 |
| 4 | 1510 | 384 | 0 | 2155 | 9955 | $0.000762 |
| 5 | 1402 | 0 | 0 | 1344 | 7540 | $0.000573 |
| 6 | 1202 | 0 | 0 | 1629 | 8561 | $0.000624 |
| 7 | 1322 | 0 | 0 | 2069 | 12751 | $0.000764 |
