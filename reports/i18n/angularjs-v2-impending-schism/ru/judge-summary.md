# Translation Judge Summary

- Slug: angularjs-v2-impending-schism
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.04
- Input tokens: 3402
- Output tokens: 371
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002814

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.59
- Input tokens: 3246
- Output tokens: 570
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003333

### Pass 2
- Runtime seconds: 1.98
- Input tokens: 3341
- Output tokens: 219
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002328

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "src=\"https://res.cloudinary.com/ddd/image/upload/timeout-expired.gif\"" Replacement: "src=\"../https://res.cloudinary.com/ddd/image/upload/timeout-expired.gif\"" Reason: The project uses a specific relative path prefix for external images in MDX to handle asset processing. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "src=\"https://res.cloudinary.com/ddd/image/upload/v1442175801/system-maint-anon.gif\"" Replacement: "src=\"../https://res.cloudinary.com/ddd/image/upload/v1442175801/system-maint-anon.gif\"" Reason: The project uses a specific relative path prefix for external images in MDX to handle asset processing. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "Тайно желал, чтобы на встречах TC‑39 его уже выдали… Но их не было." Replacement: "Втайне желал, чтобы встречи TC-39 породили его... Они этого не сделали." Reason: The original text says 'They didn't' (referring to producing the spec), not that the meetings didn't happen. 'Втайне' is also more standard than 'Тайно' in this context. Note: Applied exact replacement to selected MDX.
4. Pass 2: logged high priority suggestion. Match: "src=\"../https://res.cloudinary.com/ddd/image/upload/timeout-expired.gif\"" Replacement: "src=\"https://res.cloudinary.com/ddd/image/upload/timeout-expired.gif\"" Reason: The previous judge incorrectly suggested adding '../' to absolute HTTPS URLs. Absolute URLs should not have relative path prefixes. Note: Exact match not found in selected MDX.
5. Pass 2: logged high priority suggestion. Match: "src=\"../https://res.cloudinary.com/ddd/image/upload/v1442175801/system-maint-anon.gif\"" Replacement: "src=\"https://res.cloudinary.com/ddd/image/upload/v1442175801/system-maint-anon.gif\"" Reason: The previous judge incorrectly suggested adding '../' to absolute HTTPS URLs. Absolute URLs should not have relative path prefixes. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2015-08-05--angularjs-v2-impending-schism/ru/index.mdx
- 0be99fa0b1ae80c55c0f82cab412e59306ca7999 i18n candidate(ru): angularjs-v2-impending-schism via openrouter/openai/gpt-oss-120b:nitro
- 39af2ae0dbada2b76deaae4795f6af7b042a6922 i18n candidate(ru): angularjs-v2-impending-schism via openrouter/qwen/qwen3-32b:nitro
