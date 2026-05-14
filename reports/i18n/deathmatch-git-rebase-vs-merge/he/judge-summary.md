# Translation Judge Summary

- Slug: deathmatch-git-rebase-vs-merge
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
- Runtime seconds: 3.59
- Input tokens: 8821
- Output tokens: 340
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005431
- Estimated cost: $0.005431

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.09
- Input tokens: 8377
- Output tokens: 221
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004851
- Estimated cost: $0.004851

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "לא כשמעורבת צוות אחד או יותר!" Replacement: "לא כשמעורב צוות אחד או יותר!" Reason: Grammar: 'צוות' (team) is masculine in Hebrew, so the verb should be 'מעורב' not 'מעורבת'. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 81804680de4ab34c831aa5912dd06256f15a9a9b i18n candidate(he): deathmatch-git-rebase-vs-merge via openrouter/deepseek/deepseek-v4-flash
- 91073c2dd68613a1bdff7789b64a3235ea84eb03 i18n candidate(he): deathmatch-git-rebase-vs-merge via openrouter/openai/gpt-oss-120b:nitro
