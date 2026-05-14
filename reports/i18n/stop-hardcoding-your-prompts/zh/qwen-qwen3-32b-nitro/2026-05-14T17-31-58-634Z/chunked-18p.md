# Chunked Translation Report

- **Model**: qwen/qwen3-32b:nitro
- **Chunk size**: 18p
- **Total chunks**: 3
- **Total input tokens**: 4985
- **Total output tokens**: 4318
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 9987ms
- **Estimated cost**: $0.001435 (local-openrouter-estimate)

## Article Summary
The article argues that embedding prompts as raw strings in codebases creates maintenance and security risks, advocating instead for treating prompts as structured, versioned configuration. It highlights three patterns: (1) typed templates with validation (using Zod), (2) composable prompt sections for modular management, and (3) separating instructions from data to mitigate injection attacks. The core thesis emphasizes rigorous software engineering practices—testing, typing, and modularity—for prompt management, framed as critical infrastructure rather than disposable code. Targeting developers integrating AI models, the tone is analytical and prescriptive, using metaphors like "load-bearing and invisible" to stress the hidden complexity of buried prompts. Key technologies include Zod for validation and structured API message formats (e.g., OpenAI's ChatMessage).

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1283 | 0 | 0 | 1137 | 2660 | $0.000376 |
| 2 | 2213 | 0 | 0 | 2028 | 4397 | $0.000664 |
| 3 | 1489 | 0 | 0 | 1153 | 2930 | $0.000396 |
