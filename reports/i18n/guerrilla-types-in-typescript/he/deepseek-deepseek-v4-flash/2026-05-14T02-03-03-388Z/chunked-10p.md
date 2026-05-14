# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 10p
- **Total chunks**: 6
- **Total input tokens**: 8168
- **Total output tokens**: 10799
- **Cache read tokens**: 1152
- **Cache write tokens**: 0
- **Total duration**: 74291ms
- **Estimated cost**: $0.004009 (local-openrouter-estimate)

## Article Summary
This article presents unconventional "guerrilla" techniques for designing TypeScript types to achieve consistent, predictable model interfaces. It contrasts two common approaches—single large objects (explicit but not DRY) and multiple named types (reusable but potentially less readable)—then introduces Technique #1: deriving sub-types from a primary type using indexed access types (e.g., `type Seller = ProductDetails["seller"]`), which preserves both big-picture clarity and named sub-types without duplication. The tone is a tutorial with playful irreverence ("possibly terrible?"), targeting TypeScript developers working with semi-structured API data. The article also promises coverage of mix-ins and namespace organization, framing these as guerrilla tactics to avoid unintended naming variances and compose higher-level types.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1311 | 0 | 0 | 2281 | 14069 | $0.000822 |
| 2 | 1418 | 384 | 0 | 3090 | 20128 | $0.001011 |
| 3 | 1333 | 0 | 0 | 1900 | 10258 | $0.000719 |
| 4 | 1649 | 384 | 0 | 1756 | 14939 | $0.000670 |
| 5 | 1427 | 0 | 0 | 1513 | 11021 | $0.000623 |
| 6 | 1030 | 384 | 0 | 259 | 3876 | $0.000164 |
