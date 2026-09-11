# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4626
- **Total output tokens**: 2655
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 2102ms
- **Estimated cost**: $0.000658 (local-openrouter-estimate)

## Article Summary
The article argues that the transition from “working in a demo” to “safe in production” is far riskier than most AI teams anticipate, because raw LLMs lack built‑in safeguards and will obey any prompt that mimics system commands. It presents Mastra’s architecture as a solution, embedding safety‑oriented processors (input‑side prompt‑injection detectors, PII scanners, and content‑moderation filters) that act like middleware to inspect, modify, or block data before it reaches the model and after it returns. Specific technologies highlighted include the UnicodeNormalizer, PromptInjectionDetector, PIIDetector, and ModerationProcessor, all configurable with thresholds and response strategies (block, warn, redact, etc.). The tone is a pragmatic, slightly urgent tutorial‑style analysis aimed at developers and product teams building production‑grade AI assistants. Recurring metaphors frame the system as a “fortress” or “guardrails” that must be built into the agent from the start rather than added later.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2366 | 896 | 0 | 1450 | 1061 | $0.000353 |
| 2 | 2260 | 1152 | 0 | 1205 | 1041 | $0.000305 |
