# Translation Judge Summary

- Slug: llm-connection-strings
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.10
- Input tokens: 6611
- Output tokens: 319
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004262
- Estimated cost: $0.004262

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.20
- Input tokens: 6285
- Output tokens: 270
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003953
- Estimated cost: $0.003953

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "{/* ¹ Yes, I know that `URI` is more correct than `URL`. If you are pedantic enough to actually care about that distinction, please go touch grass. */}" Replacement: "{/* ¹ نعم، أعلم أن `URI` أكثر صحة من `URL`. إذا كنت من المدققين الذين يهتمون فعلاً بهذا الفرق، فالرجاء الخروج للمشي في العشب. */}" Reason: The candidate left the final footnote comment in English. It should be translated to match the rest of the document. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-30--llm-connection-strings/ar/index.mdx
- 4dd576f5afbd132fcc67df574601e7475d98f69e i18n candidate(ar): llm-connection-strings via openrouter/openai/gpt-oss-120b:nitro
