# Chunked Translation Report

- **Model**: qwen/qwen3.6-35b-a3b
- **Chunk size**: 10p
- **Total chunks**: 6
- **Total input tokens**: 8048
- **Total output tokens**: 45238
- **Cache read tokens**: 0
- **Cache write tokens**: 0
- **Total duration**: 158065ms
- **Estimated cost**: $0.046445 (local-openrouter-estimate)

## Article Summary
This article explores unconventional ("guerrilla") TypeScript type design strategies to help developers achieve consistent, predictable, and reusable interfaces without relying on traditional OOP or ERD patterns. It contrasts top-down single-object modeling with bottom-up named types, then introduces three pragmatic techniques: deriving sub-types via indexed access, composing logical objects with mix-ins, and organizing types through namespaces. Written in an informal, tutorial-style tone, the piece uses tactical metaphors to frame type design as a flexible, trade-off-driven practice rather than a rigid architectural rule. The intended audience is TypeScript developers working with semi-structured API data who seek practical, IDE-friendly patterns for managing complex type hierarchies.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1318 | 0 | 0 | 21076 | 48978 | $0.021274 |
| 2 | 1370 | 0 | 0 | 5521 | 23920 | $0.005726 |
| 3 | 1294 | 0 | 0 | 5375 | 26873 | $0.005569 |
| 4 | 1655 | 0 | 0 | 5142 | 22829 | $0.005390 |
| 5 | 1422 | 0 | 0 | 5260 | 22094 | $0.005473 |
| 6 | 989 | 0 | 0 | 2864 | 13371 | $0.003012 |
