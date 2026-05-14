# Translation Judge Summary

- Slug: serverless-database-magic
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
- Runtime seconds: 3.27
- Input tokens: 12856
- Output tokens: 409
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007655
- Estimated cost: $0.007655

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.24
- Input tokens: 11936
- Output tokens: 220
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006628
- Estimated cost: $0.006628

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "הנה כלל ההחלטה שהייתי רוצה שהשתמשתי בו קודם:" Replacement: "הנה כלל ההחלטה שהייתי רוצה שהייתי משתמש בו קודם:" Reason: Grammar fix: 'שהשתמשתי' (that I used) should be 'שהייתי משתמש' (that I would have used) to match the conditional 'wish I had used'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "והפסיק לנסות לגרום ל‑S3 להתחפש לאחד כזה." Replacement: "ותפסיקו לנסות לגרום ל‑S3 להתחפש לאחד כזה." Reason: The imperative 'stop' in this context is directed at the reader (plural or general), 'ותפסיקו' flows better in Dan's direct style. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- cbb8e1952da76366eb24ed92147219eae793ead1 i18n candidate(he): serverless-database-magic via openrouter/deepseek/deepseek-v4-flash
- c35e9f4f3a8990983fc6bb4c1bc070ba56523295 i18n candidate(he): serverless-database-magic via openrouter/openai/gpt-oss-120b:nitro
