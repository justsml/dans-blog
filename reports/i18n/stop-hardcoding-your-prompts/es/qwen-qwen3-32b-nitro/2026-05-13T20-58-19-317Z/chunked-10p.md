# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 10p
- **Total chunks**: 5
- **Total input tokens**: 6609
- **Total output tokens**: 6492
- **Cache read tokens**: 512
- **Cache write tokens**: 0
- **Total duration**: 43639ms
- **Estimated cost**: $0.002087 (local-openrouter-estimate)

## Article Summary
**Summary:**  
The article argues that embedding prompts as raw strings in codebases creates unmanageable, insecure systems prone to prompt injection and technical debt. It critiques the "string interpolation" approach, comparing it to SQL injection vulnerabilities, and proposes three patterns to treat prompts as structured configuration: (1) **typed templates** with validation (using Zod), (2) **composable sections** for modular, testable prompt logic, and (3) **structured message formats** to separate instructions from data. Targeting developers integrating LLMs into applications, the tone is analytical and prescriptive, emphasizing runtime safety, version control, and architectural clarity. Key

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1059 | 0 | 0 | 1095 | 3113 | $0.000348 |
| 2 | 1261 | 0 | 0 | 1460 | 3908 | $0.000451 |
| 3 | 1736 | 0 | 0 | 1670 | 19750 | $0.000540 |
| 4 | 1350 | 0 | 0 | 1290 | 14786 | $0.000418 |
| 5 | 1203 | 512 | 0 | 977 | 2082 | $0.000331 |
