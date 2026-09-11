# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4622
- **Total output tokens**: 7496
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 55293ms
- **Estimated cost**: $0.002605 (local-openrouter-estimate)

## Article Summary
The article argues that raw LLMs are inherently unsafe in production due to their malleable nature, and that the gap between a demo and a secure deployment is dangerously wide. It presents a solution via the Mastra framework, which enforces safety through a processor pipeline acting as middleware: input processors (e.g., `UnicodeNormalizer`, `PromptInjectionDetector`) sanitize prompts, while output processors (e.g., `PIIDetector`, `ModerationProcessor`) filter responses. Specific techniques include detecting prompt injection, redacting PII (credit cards, SSNs), and moderating harmful content, with configurable thresholds and strategies (block, redact, rewrite). The tone is a technical tutorial with an urgent, cautionary undercurrent, framing guardrails as non-optional layers built into agent architecture rather than afterthoughts. The intended audience is developers deploying LLM agents in production environments.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2378 | 0 | 0 | 2861 | 21297 | $0.001134 |
| 2 | 2244 | 1024 | 0 | 4635 | 33996 | $0.001471 |
