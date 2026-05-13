# Translation Judge Summary

- Slug: securely-using-environment-variables-in-nodejs
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.62
- Input tokens: 8194
- Output tokens: 264
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004889

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.19
- Input tokens: 5412
- Output tokens: 215
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003351

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Connecting to ${PGUSER} @ ${PGHOST}:${PGHOST}" Replacement: "Connexion à ${PGUSER} @ ${PGHOST}:${PGHOST}" Reason: The console log message should be translated for consistency with the rest of the French content, as seen in other candidates. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/fr/index.mdx
- 9c10efa0a8376b3fd2f890e51cb69c624f3953ac i18n candidate(fr): securely-using-environment-variables-in-nodejs via openrouter/qwen/qwen3.6-plus
- 5c34c7badd8022cddd1cf2cecfbbacb8875f087b i18n candidate(fr): securely-using-environment-variables-in-nodejs via openrouter/openai/gpt-oss-120b:nitro
- 0bf9e0a213c03fe67ab57c3da46dd3750b4c39e6 i18n candidate(fr): securely-using-environment-variables-in-nodejs via openrouter/qwen/qwen3-32b:nitro
