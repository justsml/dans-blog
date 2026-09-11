# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4576
- **Total output tokens**: 6581
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 55600ms
- **Estimated cost**: $0.002343 (local-openrouter-estimate)

## Article Summary
The article argues that production AI systems are dangerous because raw LLMs, as prediction machines, will comply with malicious prompts (e.g., injection attacks, PII leaks, harmful outputs). The core thesis is that safety must be architected in from the start rather than bolted on after failures. It presents Mastra’s processor-based guardrails—input/output middleware that normalizes Unicode, detects prompt injection and PII, and moderates content—as a solution. The tone is a tutorial/analysis aimed at developers, using the recurring framing of "demo vs. production" and the metaphor of processors as "middleware for AI interactions."

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2329 | 0 | 0 | 4328 | 37135 | $0.001538 |
| 2 | 2247 | 1024 | 0 | 2253 | 18465 | $0.000805 |
