# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: it
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
- Runtime seconds: 2.48
- Input tokens: 12776
- Output tokens: 203
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006997

### Round 1, Batch 2
- Runtime seconds: 2.48
- Input tokens: 10449
- Output tokens: 310
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006155

## Primary Judge Telemetry
- Runtime seconds: 2.63
- Input tokens: 10370
- Output tokens: 285
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006040

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.23
- Input tokens: 8039
- Output tokens: 253
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004778

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "// 1. Scrub invisible characters" Replacement: "// 1. Pulisce i caratteri invisibili" Reason: The comment inside the code block was left in English. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "// 2. Detect the attempt" Replacement: "// 2. Rileva il tentativo" Reason: The comment inside the code block was left in English. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/it/index.mdx
- 1548ce08fed5966521be2a8ddba30504579d3dd1 i18n candidate(it): mastra-security-guardrails via openrouter/qwen/qwen3.6-plus
- ce8b703aebc7537833eb78907466ddc4f3ec4d13 i18n candidate(it): mastra-security-guardrails via openrouter/minimax/minimax-m2.7
- 5a2fce48aee54c644af14d83b5f857d51ce58415 i18n candidate(it): mastra-security-guardrails via openrouter/z-ai/glm-5-turbo
- 15051b1465c33b67f080e22ce2a7e32c2ed1ed0e i18n candidate(it): mastra-security-guardrails via openrouter/openai/gpt-oss-120b:nitro
- 1044a8ad10f78a41221da9b9a1d17e4c08aab8b5 i18n candidate(it): mastra-security-guardrails via openrouter/qwen/qwen3-32b:nitro
