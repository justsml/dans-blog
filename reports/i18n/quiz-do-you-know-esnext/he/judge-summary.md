# Translation Judge Summary

- Slug: quiz-do-you-know-esnext
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
- Runtime seconds: 7.42
- Input tokens: 12973
- Output tokens: 283
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007336
- Estimated cost: $0.007336

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.16
- Input tokens: 12483
- Output tokens: 223
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006910
- Estimated cost: $0.006910

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "התמלא: הצלחה" Replacement: "fulfilled: success" Reason: The code output being checked in the console.log is the literal string 'fulfilled' and 'success'. Translating these values makes the quiz question technically incorrect as the code would not output Hebrew. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 039e85a6cd18342ae92c033dddbb4e964deef1e6 i18n candidate(he): quiz-do-you-know-esnext via openrouter/deepseek/deepseek-v4-flash
- 2849eab53d4e99420c9f4582a33ef2c969c4e965 i18n candidate(he): quiz-do-you-know-esnext via openrouter/openai/gpt-oss-120b:nitro
