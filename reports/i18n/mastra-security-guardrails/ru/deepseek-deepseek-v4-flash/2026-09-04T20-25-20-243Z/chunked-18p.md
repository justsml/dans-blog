# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4473
- **Total output tokens**: 5493
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 46642ms
- **Estimated cost**: $0.002024 (local-openrouter-estimate)

## Article Summary
The article argues that raw LLMs are inherently unsafe in production due to their lack of built-in guardrails, creating a dangerous gap between demo and deployment. It presents the Mastra framework as a solution, introducing "processors" as middleware layers that inspect, modify, or block inputs and outputs to prevent prompt injection, PII leaks, and harmful content. The tone is a tutorial with code examples, targeting developers building production AI systems, and uses the recurring metaphor of processors as "safety layers" stacked like middleware.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2301 | 0 | 0 | 3215 | 26269 | $0.001222 |
| 2 | 2172 | 1024 | 0 | 2278 | 20373 | $0.000801 |
