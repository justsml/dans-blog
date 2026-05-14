# Translation Judge Summary

- Slug: security-notes-regex
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
- Runtime seconds: 2.91
- Input tokens: 3470
- Output tokens: 259
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002512
- Estimated cost: $0.002512

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.35
- Input tokens: 3500
- Output tokens: 225
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002425
- Estimated cost: $0.002425

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "מכפילים מקוננים" Replacement: "כמתים מקוננים" Reason: 'Quantifiers' in RegEx context is more accurately translated as 'כמתים' than 'מכפילים' (multipliers). Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- bf844ebf3540b2a48153f29de42422d5ea31c7c2 i18n candidate(he): security-notes-regex via openrouter/deepseek/deepseek-v4-flash
- 1b83cbf3cba6a242310896f62c9ac0b444d56ba5 i18n candidate(he): security-notes-regex via openrouter/openai/gpt-oss-120b:nitro
