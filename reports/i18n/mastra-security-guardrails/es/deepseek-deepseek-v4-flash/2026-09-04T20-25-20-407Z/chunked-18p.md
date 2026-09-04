# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4865
- **Total output tokens**: 5833
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 49725ms
- **Estimated cost**: $0.002033 (local-openrouter-estimate)

## Article Summary
This article argues that the gap between a demo LLM and a safe production system is dangerously wide, framing raw models as “prediction machines” vulnerable to prompt injection, PII leaks, and toxic outputs. As a solution, it introduces Mastra’s processor-based guardrails—input/output middleware that normalizes text, detects injection attacks, redacts PII, and moderates content using configurable thresholds and strategies like blocking or masking. The tone is a tutorial with a cautionary edge, using the recurring metaphor of a “castle” fortified by stacked safety layers. The intended audience is developers building secure production agents who need concrete code examples (TypeScript) and architectural patterns to harden their AI interactions.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2503 | 1024 | 0 | 2630 | 23535 | $0.000946 |
| 2 | 2362 | 1024 | 0 | 3203 | 26190 | $0.001087 |
