# Translation Judge Summary

- Slug: quiz-in-the-aws-cloud
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
- Runtime seconds: 3.60
- Input tokens: 35903
- Output tokens: 313
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.018891
- Estimated cost: $0.018891

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.62
- Input tokens: 32839
- Output tokens: 204
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.017032
- Estimated cost: $0.017032

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "בדקו עוד [אתגרים של דן](../challenges/)!" Replacement: "בדקו עוד [אתגרים של דן](/challenges/)!" Reason: The link should be absolute to the site root as per the English source, or at least consistent with the site structure. The candidate changed /challenges/ to ../challenges/ which might break if the base path is different. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 175a37f9ee2ea7a660be695979616fe799c3fb37 i18n candidate(he): quiz-in-the-aws-cloud via openrouter/deepseek/deepseek-v4-flash
- 9c52f72f461ec1990304b60eac7f1c29785cb9d1 i18n candidate(he): quiz-in-the-aws-cloud via openrouter/openai/gpt-oss-120b:nitro
