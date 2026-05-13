# Translation Judge Summary

- Slug: protect-your-tokens
- Locale: it
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.78
- Input tokens: 8800
- Output tokens: 294
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005282

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.29
- Input tokens: 5736
- Output tokens: 239
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003585

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "È sicuro hardcoded le chiavi non segrete (pubbliche)!" Replacement: "È sicuro inserire direttamente nel codice le chiavi non segrete (pubbliche)!" Reason: 'Hardcoded' is used as a verb incorrectly here; 'inserire direttamente nel codice' is the correct Italian technical expression. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-27--protect-your-tokens/it/index.mdx
- 05ce900a37936f38ac2b0117c39766d83dce9dc8 i18n candidate(it): protect-your-tokens via openrouter/qwen/qwen3.6-plus
- 7e8a24c7164c409bc5f60a125b20099888c252b9 i18n candidate(it): protect-your-tokens via openrouter/openai/gpt-oss-120b:nitro
- abd5f43d702ca3f8da6745472175b1dd6d1348b6 i18n candidate(it): protect-your-tokens via openrouter/qwen/qwen3-32b:nitro
