# Chunked Translation Report

- **Model**: openai/gpt-oss-120b:nitro
- **Chunk size**: 10p
- **Total chunks**: 7
- **Total input tokens**: 8984
- **Total output tokens**: 2987
- **Cache read tokens**: 3072
- **Cache write tokens**: 0
- **Total duration**: 9194ms
- **Estimated cost**: $0.000888 (local-openrouter-estimate)

## Article Summary
The article argues that “prompt injection” is the modern analogue of classic SQL injection: because large‑language‑model agents cannot reliably separate user data from executable instructions, an attacker can embed malicious directives that override system prompts and cause the model to perform unauthorized actions. It outlines the main variants—direct, indirect (via fetched documents), context hijacking, and multimodal injection—and explains why simple “hard‑coded” prompt defenses fail, since models lack a trustworthy mechanism to prioritize system over user instructions. The piece then proposes a layered defense stack (input sanitisation and detection, least‑privilege tool gating, runtime monitoring, and response filtering) aimed at developers building LLM‑powered agents. The tone is an analytical tutorial, using the familiar SQL‑injection story as a recurring metaphor to frame the security risk. Intended audience: engineers, security practitioners, and product teams responsible for deploying conversational or autonomous AI agents.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1095 | 512 | 0 | 378 | 1810 | $0.000111 |
| 2 | 1337 | 512 | 0 | 422 | 1149 | $0.000128 |
| 3 | 1329 | 512 | 0 | 459 | 1245 | $0.000134 |
| 4 | 1522 | 512 | 0 | 632 | 1801 | $0.000173 |
| 5 | 1379 | 512 | 0 | 499 | 1549 | $0.000144 |
| 6 | 1268 | 512 | 0 | 491 | 1223 | $0.000138 |
| 7 | 1054 | 0 | 0 | 106 | 417 | $0.000060 |
