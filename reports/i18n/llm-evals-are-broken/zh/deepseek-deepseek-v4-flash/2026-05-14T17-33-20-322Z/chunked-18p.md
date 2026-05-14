# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 4
- **Total input tokens**: 6490
- **Total output tokens**: 4727
- **Cache read tokens**: 768
- **Cache write tokens**: 0
- **Total duration**: 29999ms
- **Estimated cost**: $0.002127 (local-openrouter-estimate)

## Article Summary
The article argues that public benchmarks (e.g., MMLU, HumanEval) are irrelevant for production AI systems; teams must write custom evals—automated tests reflecting their specific tasks, data, and failure modes. It critiques "vibes-based evaluation" (relying on user complaints) as missing silent regressions. Key techniques include deterministic checks (JSON validity, grounded citations), building a "golden set" from past failures, and running regression tests on every model change. The tone is practical and urgent, targeting developers and product managers building AI applications. The central metaphor is benchmarks wearing a "tuxedo"—impressive but useless for real-world needs.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1341 | 0 | 0 | 734 | 5684 | $0.000393 |
| 2 | 1933 | 384 | 0 | 2403 | 13840 | $0.000891 |
| 3 | 2121 | 0 | 0 | 1363 | 8257 | $0.000679 |
| 4 | 1095 | 384 | 0 | 227 | 2218 | $0.000164 |
