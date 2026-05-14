# Translation Judge Summary

- Slug: docker-rocks
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.85
- Input tokens: 3071
- Output tokens: 271
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002348
- Estimated cost: $0.002348

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.03
- Input tokens: 3127
- Output tokens: 306
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002482
- Estimated cost: $0.002482

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "עבור פתחות פתוחות בלתי צפויות" Replacement: "עבור פורטים פתוחים באופן בלתי צפוי" Reason: 'פתחות' is a literal but incorrect translation for network ports; 'פורטים' is the standard technical term in Hebrew. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- ba46177418d320d66aa1cac180fdcb194ccda026 i18n candidate(he): docker-rocks via openrouter/deepseek/deepseek-v4-flash
- 083188a7b21e71abd4a1cb0e581a00015b387ee2 i18n candidate(he): docker-rocks via openrouter/openai/gpt-oss-120b:nitro
