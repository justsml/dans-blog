# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 6058
- **Total output tokens**: 2422
- **Cache read tokens**: 2048
- **Cache write tokens**: 0
- **Total duration**: 7957ms
- **Estimated cost**: $0.000672 (local-openrouter-estimate)

## Article Summary
The article argues that “prompt injection” is the modern analogue of classic SQL injection: because large‑language‑model agents cannot reliably separate user data from instructions, adversarial input can override system prompts and cause the model to execute unwanted actions. It outlines several injection vectors—direct jailbreak prompts, indirect injection via fetched documents, context hijacking, and multimodal payloads—and explains why simple “hard‑coded” prompt defenses fail, since models lack a cryptographic notion of authority. The author proposes a layered defense stack (input sanitisation and detection, least‑privilege tool gating, runtime monitoring, and response filtering) and illustrates it with TypeScript code examples. The tone is an analytical tutorial aimed at developers, security engineers, and AI product teams building LLM‑powered agents. Recurring metaphors compare prompt injection to SQL injection and frame the problem as “tokens vs. instructions” that must be guarded like a firewall.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1317 | 512 | 0 | 560 | 2047 | $0.000152 |
| 2 | 1716 | 512 | 0 | 755 | 2396 | $0.000203 |
| 3 | 1740 | 512 | 0 | 790 | 1967 | $0.000210 |
| 4 | 1285 | 512 | 0 | 317 | 1547 | $0.000107 |
