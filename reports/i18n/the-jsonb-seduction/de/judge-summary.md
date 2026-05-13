# Translation Judge Summary

- Slug: the-jsonb-seduction
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.66
- Input tokens: 15145
- Output tokens: 280
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008412

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.55
- Input tokens: 9200
- Output tokens: 303
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005509

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Postgres führt einen vollständigen Tabellenscan durch – jede einzelne Zeile." Replacement: "Postgres führt einen vollständigen Tabellenscan durch. Jede einzelne Zeile." Reason: Better flow and closer to the original punchy sentence structure. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-12-29--the-jsonb-seduction/de/index.mdx
- 3968f0633dcf1b23369f02215701ce711bfbba6c i18n candidate(de): the-jsonb-seduction via openrouter/qwen/qwen3.6-plus
- d0b7ec04079f1c6c5f83619c9ed8c92e8dc7e5c1 i18n candidate(de): the-jsonb-seduction via openrouter/openai/gpt-oss-120b:nitro
- 71c8eaa0f9540f4da5cc1da2be22356b94708880 i18n candidate(de): the-jsonb-seduction via openrouter/qwen/qwen3-32b:nitro
