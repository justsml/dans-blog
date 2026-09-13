# Translation Judge Summary

- Slug: llm-connection-strings
- Locale: fr
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.890)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.64
- Input tokens: 7089
- Output tokens: 285
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006385
- Estimated cost: $0.006385

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.12
- Input tokens: 6687
- Output tokens: 173
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005664
- Estimated cost: $0.005664

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "[`llm-strings` package npm](https://www.npmjs.com/package/llm-strings)" Replacement: "[package npm `llm-strings`](https://www.npmjs.com/package/llm-strings)" Reason: Natural French noun-first order ('package npm llm-strings' rather than English word order 'llm-strings package npm'). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-30--llm-connection-strings/fr/index.mdx
- 6b470e40b193b531dc333917eb563ebd9c56202e i18n candidate(fr): llm-connection-strings via openrouter/deepseek/deepseek-v4-flash
- 59516570e876e96fdc5971123388c1a510b08f86 i18n candidate(fr): llm-connection-strings via openrouter/openai/gpt-5.6-luna
