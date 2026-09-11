# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4684
- **Total output tokens**: 8570
- **Cache read tokens**: 1024
- **Cache write tokens**: 0
- **Total duration**: 62783ms
- **Estimated cost**: $0.002915 (local-openrouter-estimate)

## Article Summary
The article argues that deploying large language models (LLMs) in production introduces serious safety gaps—like prompt injection, PII leakage, and harmful outputs—that demo systems miss. It frames raw LLMs as amoral "prediction machines" and proposes a solution using the Mastra framework's **processor-based guardrails**: input and output processors that act as middleware to inspect, modify, or block content. Specific technologies covered include UnicodeNormalizer, PromptInjectionDetector, PIIDetector, and ModerationProcessor, with code examples showing configuration for blocking, redacting, or filtering. Written in an analytical/tutorial tone for developers building production AI systems, the article uses the recurring metaphor of "middleware for AI interactions" to explain how guardrails stack and run automatically.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2357 | 0 | 0 | 6232 | 44238 | $0.002075 |
| 2 | 2327 | 1024 | 0 | 2338 | 18545 | $0.000840 |
