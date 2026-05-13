# Translation Judge Summary

- Slug: llm-evals-are-broken
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.32
- Input tokens: 17934
- Output tokens: 321
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009930

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.54
- Input tokens: 11055
- Output tokens: 246
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006266

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "感情分類が既存のテストセットで肯定から否定に3%以上反転してはならない" Replacement: "感情分類が既存のテストセットで、肯定的から否定的へと3%を超えて反転してはならない" Reason: The original English says 'not flip... more than 3% of the time'. The candidate translation is slightly ambiguous about whether 3% is the threshold for the flip itself or the frequency. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-06--llm-evals-are-broken/ja/index.mdx
- cfc27fa469f4f845c2128a64cb83785bf6948ff1 i18n candidate(ja): llm-evals-are-broken via openrouter/deepseek/deepseek-v4-flash
- 200749ff77df00a184f960a73d8d335afb07c900 i18n candidate(ja): llm-evals-are-broken via openrouter/z-ai/glm-5-turbo
- cd999209b0d859ea1b9ba81ac96000f09387ab44 i18n candidate(ja): llm-evals-are-broken via openrouter/z-ai/glm-4.7-flash
