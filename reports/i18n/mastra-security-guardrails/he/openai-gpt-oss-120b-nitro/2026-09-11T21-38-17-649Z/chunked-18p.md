# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 2
- **Total input tokens**: 4641
- **Total output tokens**: 2523
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 2279ms
- **Estimated cost**: $0.000635 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that the transition from “working in a demo” to “safe in production” is far riskier than most AI teams anticipate, because raw LLMs have no built‑in sense of what they should or shouldn’t do and will obey malicious prompts like “system override mode.” To close this safety gap, the author promotes Mastra’s architecture, which embeds guardrails as middleware‑style processors that inspect and transform inputs and outputs before they reach the model. Three concrete processor types are highlighted: PromptInjectionDetector (stops pirate‑style prompt injection via Unicode normalization and model‑based detection), PIIDetector (redacts or otherwise handles personally identifiable information in both inbound queries and outbound replies), and ModerationProcessor (filters harmful content according to configurable categories). The tone is a pragmatic tutorial‑rant aimed at engineers and product teams building production‑grade AI assistants, using the recurring metaphor of “fortress” or “security layers” to frame the solution.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 2365 | 0 | 0 | 1396 | 1177 | $0.000344 |
| 2 | 2276 | 0 | 0 | 1127 | 1102 | $0.000292 |
