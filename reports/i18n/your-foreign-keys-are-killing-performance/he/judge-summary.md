# Translation Judge Summary

- Slug: your-foreign-keys-are-killing-performance
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
- Runtime seconds: 3.44
- Input tokens: 11792
- Output tokens: 395
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007081
- Estimated cost: $0.007081

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.52
- Input tokens: 10738
- Output tokens: 294
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006251
- Estimated cost: $0.006251

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "מפתחות זרים לא מתקשקשים" Replacement: "מפתחות זרים לא עוברים סקייל" Reason: The term 'מתקשקשים' is a literal/slang mistranslation of 'scale'. In a database context, 'עוברים סקייל' or 'מתרחבים' is appropriate. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "האפשרות השלישית הזו אינה רמאות" Replacement: "האפשרות השלישית הזו היא לא רמאות" Reason: While 'אינה' is grammatically correct, Dan's style is direct and conversational; 'היא לא' fits the tone better. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- e615b82a41f2b756345502b9b6ae1d29b1107241 i18n candidate(he): your-foreign-keys-are-killing-performance via openrouter/deepseek/deepseek-v4-flash
- 71c959674ef71d43a6f5e5876ca078f771a61c7f i18n candidate(he): your-foreign-keys-are-killing-performance via openrouter/openai/gpt-oss-120b:nitro
