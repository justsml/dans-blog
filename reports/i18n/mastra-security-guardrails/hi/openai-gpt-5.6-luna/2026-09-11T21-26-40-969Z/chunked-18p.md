# Chunked Translation Report

- **Model**: openai/gpt-5.6-luna
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4331
- **Total output tokens**: 2414
- **Cache read tokens**: 1055
- **Cache write tokens**: 3270
- **Total duration**: 21173ms
- **Estimated cost**: $0.003573 (local-openrouter-estimate)

## Article Summary
The article argues that the gap between a successful LLM demo and a safe production AI system is substantial because raw language models follow patterns without inherent safety judgments. It presents Mastra’s processor-based agent architecture as a solution, using input and output middleware such as `UnicodeNormalizer`, `PromptInjectionDetector`, `PIIDetector`, `ModerationProcessor`, and `BatchPartsProcessor` to detect, transform, or block risky content. The piece is a practical, tutorial-style guide for developers, with a cautionary tone and recurring “guardrails,” “safety layers,” and “fortress” framing around threats such as prompt injection, privacy leaks, and harmful outputs.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2232 | 0 | 2229 | 1303 | 11655 | $0.002010 |
| 2 | 2099 | 1055 | 1041 | 1111 | 9518 | $0.001563 |
