# Chunked Translation Report

- **Model**: qwen/qwen3.6-35b-a3b
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 9649
- **Total output tokens**: 29153
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 128772ms
- **Estimated cost**: $0.030600 (local-openrouter-estimate)

## Article Summary
This security-focused tutorial warns that exposing OpenClaw’s gateway, SSH, or browser control interfaces to the public internet without robust authentication creates a direct path to unauthorized shell access and remote code execution. The article identifies three primary attack surfaces and recommends a secure default configuration: keeping the gateway bound to loopback and routing remote access exclusively through Tailscale Serve with explicit identity-based authentication. Targeted at developers and system administrators deploying personal AI assistants, the piece adopts a cautionary, instructional tone while consistently framing the AI’s control interfaces as sensitive "operator surfaces" that must be deliberately restricted rather than publicly exposed.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1307 | 0 | 0 | 5074 | 23168 | $0.005270 |
| 2 | 1458 | 0 | 0 | 4739 | 20713 | $0.004958 |
| 3 | 1300 | 0 | 0 | 3248 | 14559 | $0.003443 |
| 4 | 1548 | 0 | 0 | 4047 | 17675 | $0.004279 |
| 5 | 1454 | 0 | 0 | 3776 | 15849 | $0.003994 |
| 6 | 1256 | 0 | 0 | 4381 | 19783 | $0.004569 |
| 7 | 1326 | 0 | 0 | 3888 | 17025 | $0.004087 |
