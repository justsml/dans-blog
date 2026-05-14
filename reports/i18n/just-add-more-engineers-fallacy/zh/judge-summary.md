# Translation Judge Summary

- Slug: just-add-more-engineers-fallacy
- Locale: zh
- Judge model: openrouter/deepseek/deepseek-v4-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 36.06
- Input tokens: 7246
- Output tokens: 8183
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004722
- Estimated cost: $0.004722

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 8.21
- Input tokens: 7957
- Output tokens: 871
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.001940
- Estimated cost: $0.001940

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "《神话中的人月》" Replacement: "《人月神话》" Reason: The standard Chinese title for Fred Brooks' 'The Mythical Man-Month' is '人月神话', not '神话中的人月'. This ensures readers can identify the book correctly. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "《灵感》" Replacement: "《启示录》" Reason: The standard Chinese title for Marty Cagan's 'Inspired' is '启示录', not '灵感'. Using the correct title improves accuracy for readers seeking the book. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "没有银弹：软件工程的本质与偶然" Replacement: "没有银弹：软件工程的本质与意外" Reason: The original English subtitle is 'Essence and Accidents of Software Engineering'. 'Accidents' refers to accidental difficulties, better translated as '意外' rather than '偶然' (coincidence). Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 72fad3f5a9166edab86218aea11e17904384d6b8 i18n candidate(zh): just-add-more-engineers-fallacy via openrouter/openai/gpt-oss-120b:nitro
- 584bb0fd00b7227ac744ea5a2fc4b1f3966d82e0 i18n candidate(zh): just-add-more-engineers-fallacy via openrouter/deepseek/deepseek-v4-flash
