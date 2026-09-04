# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4532
- **Total output tokens**: 4915
- **Cache read tokens**: 1792
- **Cache write tokens**: 0
- **Total duration**: 44186ms
- **Estimated cost**: $0.001765 (local-openrouter-estimate)

## Article Summary
The article argues that production AI safety is far harder than demos suggest, because raw LLMs are neutral prediction machines vulnerable to prompt injection, PII leaks, and harmful outputs—not bugs but inherent model behavior. It presents Mastra's processor pipeline as a solution: input and output processors act as middleware layers that normalize Unicode, detect injections, redact PII, and moderate content using configurable thresholds and strategies like block or mask. The tone is a practical tutorial with a warning edge, framed around guardrails and safety layers, targeting developers building AI agents who need to bridge the demo-to-production gap.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2315 | 768 | 0 | 2948 | 25858 | $0.001044 |
| 2 | 2217 | 1024 | 0 | 1967 | 18328 | $0.000721 |
