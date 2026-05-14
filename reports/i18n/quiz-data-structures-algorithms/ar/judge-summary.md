# Translation Judge Summary

- Slug: quiz-data-structures-algorithms
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
- Runtime seconds: 2.85
- Input tokens: 18938
- Output tokens: 238
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010183
- Estimated cost: $0.010183

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.54
- Input tokens: 18158
- Output tokens: 300
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009979
- Estimated cost: $0.009979

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "والخوارزميات ()،" Replacement: "والخوارزميات،" Reason: The empty parentheses in the English source were likely a placeholder or typo; in Arabic, they look like a mistake and should be removed for better flow. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "والخوارزميات، وتعقيد الوقت." Replacement: "والخوارزميات، والتعقيد الزمني." Reason: In Arabic computer science terminology, 'Time Complexity' is more accurately and naturally translated as 'التعقيد الزمني' rather than 'تعقيد الوقت'. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- a721d19647ca84e96d0fe77b6a8895373aea0760 i18n candidate(ar): quiz-data-structures-algorithms via openrouter/deepseek/deepseek-v4-flash
- 57f32ca73e5fff1f64d2671b7e4d44d075ee4dfb i18n candidate(ar): quiz-data-structures-algorithms via openrouter/openai/gpt-oss-120b:nitro
