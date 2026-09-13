# Translation Judge Summary

- Slug: llm-connection-strings
- Locale: ru
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.887)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.63
- Input tokens: 6988
- Output tokens: 380
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006666
- Estimated cost: $0.006666

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.17
- Input tokens: 6809
- Output tokens: 172
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005752
- Estimated cost: $0.005752

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Хорошая новость: по меркам AI это произошло всего примерно полвиброгодa назад." Replacement: "Хорошая новость: по меркам AI это было всего около полутора вайб-месяцев назад." Reason: Fix minor Latin 'a' typo in 'полвиброгодa' and render 'half a vibe-year' more naturally in Russian ('полтора вайб-года назад' or 'пол-вайб-года назад'). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-30--llm-connection-strings/ru/index.mdx
- 1a8bc643e8e094a9b8f78507e5c623dd07b7cf9f i18n candidate(ru): llm-connection-strings via openrouter/openai/gpt-5.6-luna
- 5010d258046546cccfb0adc5f6572b8a345503d0 i18n candidate(ru): llm-connection-strings via openrouter/deepseek/deepseek-v4-flash
