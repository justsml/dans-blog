# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4672
- **Total output tokens**: 3450
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 33149ms
- **Estimated cost**: $0.001480 (local-openrouter-estimate)

## Article Summary
The article argues that the gap between "works in demo" and "safe in production" is dangerously wide for LLMs, because raw models are prediction machines that blindly follow any pattern—including injection attacks, PII leaks, and harmful output. It frames the solution as layered "guardrails" built into agent architecture, using Mastra’s input/output processors as middleware that can detect, block, or sanitize content before and after model interaction. Specific technologies covered include Unicode normalizers, a PromptInjectionDetector, a PIIDetector, and a ModerationProcessor, each configurable with thresholds and strategies (block, redact, filter, rewrite). The tone is a technical tutorial with some urgency, targeting developers who build production AI agents. The recurring metaphor is "processors as safety layers" or middleware, with the framing that safety must be built in from the start, not bolted on later.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2381 | 0 | 0 | 1652 | 15675 | $0.000796 |
| 2 | 2291 | 1024 | 0 | 1798 | 17474 | $0.000684 |
