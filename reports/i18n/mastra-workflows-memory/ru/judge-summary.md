# Translation Judge Summary

- Slug: mastra-workflows-memory
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.47
- Input tokens: 15930
- Output tokens: 207
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008586

### Round 1, Batch 2
- Runtime seconds: 2.42
- Input tokens: 12227
- Output tokens: 275
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006939

## Primary Judge Telemetry
- Runtime seconds: 3.07
- Input tokens: 12794
- Output tokens: 366
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007495

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.57
- Input tokens: 10138
- Output tokens: 257
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005840

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "нестохастических моделей" Replacement: "недетерминированных моделей" Reason: The English text says 'non-deterministic'. 'Non-stochastic' is a different mathematical concept, and 'non-deterministic' is the standard term in AI for probabilistic models. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-05--mastra-workflows-memory/ru/index.mdx
- bd55e7d32bd92d4ca07ae337583bbf923e43d486 i18n candidate(ru): mastra-workflows-memory via openrouter/qwen/qwen3.6-plus
- f1b95b23c0881e7d88743fe3344bf787868777c0 i18n candidate(ru): mastra-workflows-memory via openrouter/deepseek/deepseek-v4-flash
- 03247a47dede755c762b9c628d7447d008b75712 i18n candidate(ru): mastra-workflows-memory via openrouter/minimax/minimax-m2.7
- 11650e477f3bfd6847e0c1ad72288e3565abbaef i18n candidate(ru): mastra-workflows-memory via openrouter/openai/gpt-oss-120b:nitro
- 6262987b1c7f9adbfbd56a5f12d7627e520b8b52 i18n candidate(ru): mastra-workflows-memory via openrouter/qwen/qwen3-32b:nitro
