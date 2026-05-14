# Translation Judge Summary

- Slug: quiz-do-you-know-esnext
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
- Runtime seconds: 3.38
- Input tokens: 12438
- Output tokens: 318
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007173
- Estimated cost: $0.007173

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.71
- Input tokens: 12231
- Output tokens: 228
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006799
- Estimated cost: $0.006799

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "وليس ما يفعله هذا العامل." Replacement: "وليس ما تفعله هذه الميزة." Reason: Consistency: The English text says 'not what this feature does'. The candidate uses 'feature' in some places and 'operator' in others. Using 'feature' (ميزة) is more accurate to the source. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "ما مدى صعوبة الأمر، هاه؟" Replacement: "ما مدى صعوبة الأمر، أليس كذلك؟" Reason: 'هاه' is a bit too literal for 'eh?'. 'أليس كذلك؟' or 'يا ترى؟' fits the tone better in Arabic. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- d463b24f169753c6dd5a4fd19babffa4aa55f408 i18n candidate(ar): quiz-do-you-know-esnext via openrouter/deepseek/deepseek-v4-flash
- 81999e87a6bed93f5d7b99404115bb1a05747e7a i18n candidate(ar): quiz-do-you-know-esnext via openrouter/openai/gpt-oss-120b:nitro
