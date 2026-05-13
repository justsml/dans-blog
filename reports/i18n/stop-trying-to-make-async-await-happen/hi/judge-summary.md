# Translation Judge Summary

- Slug: stop-trying-to-make-async-await-happen
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.88
- Input tokens: 14865
- Output tokens: 256
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008200

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.59
- Input tokens: 9325
- Output tokens: 265
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005457

### Pass 2
- Runtime seconds: 2.27
- Input tokens: 9198
- Output tokens: 265
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005394

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "ststus" Replacement: "status" Reason: Fixing a typo carried over from the original English code snippet in the error message. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "ststus" Replacement: "status" Reason: Fixing a typo carried over from the original English code snippet in the error message within the checkResponse function. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/hi/index.mdx
- 42700be21a9d347533ec7b64b165965dcffcd13e i18n candidate(hi): stop-trying-to-make-async-await-happen via openrouter/qwen/qwen3.6-plus
- 2d9290385178ff5e9a4b83fa1175ad72349e7c43 i18n candidate(hi): stop-trying-to-make-async-await-happen via openrouter/openai/gpt-oss-120b:nitro
- 2c4d14639ea3dfe249c49a84ac17aa7ef453c8dc i18n candidate(hi): stop-trying-to-make-async-await-happen via openrouter/qwen/qwen3-32b:nitro
