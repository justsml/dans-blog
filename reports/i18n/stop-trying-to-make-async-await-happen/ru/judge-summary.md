# Translation Judge Summary

- Slug: stop-trying-to-make-async-await-happen
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
- Runtime seconds: 2.65
- Input tokens: 14803
- Output tokens: 265
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008197

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.09
- Input tokens: 9282
- Output tokens: 218
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005295

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Поясняется ясность: именованные функции" Replacement: "Появляется ясность: именованные функции" Reason: Typo in the candidate: 'Поясняется' (is explained) instead of 'Появляется' (emerges/appears) which matches the English 'Clarity emerges'. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/ru/index.mdx
- edc987798fa6eb4d9f557110d73da456eb922608 i18n candidate(ru): stop-trying-to-make-async-await-happen via openrouter/qwen/qwen3.6-plus
- cffd12547bb2eae0af4d76a83d953c664bc239bf i18n candidate(ru): stop-trying-to-make-async-await-happen via openrouter/openai/gpt-oss-120b:nitro
- 24eeebf5dfe6089c9d4b646c2f717f1ba94c08bd i18n candidate(ru): stop-trying-to-make-async-await-happen via openrouter/qwen/qwen3-32b:nitro
