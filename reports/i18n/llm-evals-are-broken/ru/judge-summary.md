# Translation Judge Summary

- Slug: llm-evals-are-broken
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.56
- Input tokens: 19133
- Output tokens: 221
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.010230

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.96
- Input tokens: 11257
- Output tokens: 199
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006226

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "смолинге" Replacement: "смокинге" Reason: Typo: 'смолинг' is not a word; it should be 'смокинг' (tuxedo) as in the original text. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-06--llm-evals-are-broken/ru/index.mdx
- 048aa8b8a78a69e4f961fd502772359d52aa6ab5 i18n candidate(ru): llm-evals-are-broken via openrouter/qwen/qwen3.6-plus
- b0c4efd20c21aa63fb6d4e42f0e40db814ff4dfd i18n candidate(ru): llm-evals-are-broken via openrouter/qwen/qwen3.5-flash-02-23
- 9bc2dbf610fa289a990e7ca957ab94df9eeb0c0d i18n candidate(ru): llm-evals-are-broken via openrouter/deepseek/deepseek-v4-flash
