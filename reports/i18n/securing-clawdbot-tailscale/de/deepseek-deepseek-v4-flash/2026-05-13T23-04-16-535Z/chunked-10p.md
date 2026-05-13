# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 8915
- **Total output tokens**: 12928
- **Cache read tokens**: 384
- **Cache write tokens**: 0
- **Total duration**: 66235ms
- **Estimated cost**: $0.004815 (local-openrouter-estimate)

## Article Summary
This article warns that exposing OpenClaw’s gateway, node controls, or SSH on the public internet without strong authentication can grant attackers shell access. It recommends keeping the gateway on loopback and exposing it only via Tailscale Serve, while locking down SSH and verifying no public exposure. The tone is a security tutorial with a cautionary emphasis, citing Shodan scans that found thousands of exposed instances. The intended audience is OpenClaw users who need practical, non-expert guidance to avoid publishing operator surfaces before deployment.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1267 | 0 | 0 | 1931 | 10168 | $0.000718 |
| 2 | 1323 | 384 | 0 | 2045 | 10176 | $0.000705 |
| 3 | 1176 | 0 | 0 | 1061 | 6136 | $0.000462 |
| 4 | 1415 | 0 | 0 | 1829 | 9363 | $0.000710 |
| 5 | 1341 | 0 | 0 | 2910 | 13893 | $0.001003 |
| 6 | 1173 | 0 | 0 | 1499 | 8134 | $0.000584 |
| 7 | 1220 | 0 | 0 | 1653 | 8365 | $0.000634 |
