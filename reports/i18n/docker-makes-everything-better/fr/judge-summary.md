# Translation Judge Summary

- Slug: docker-makes-everything-better
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
- Runtime seconds: 3.21
- Input tokens: 5043
- Output tokens: 438
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003835

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.08
- Input tokens: 3791
- Output tokens: 216
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002544

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "cover: guillaume-bolduc-259596-unsplash.webp" Replacement: "cover: ../guillaume-bolduc-259596-unsplash.webp" Reason: Fix broken image paths by adding the relative parent directory prefix used in the project structure. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "cover_mobile: w300_guillaume-bolduc-259596-unsplash.webp" Replacement: "cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp" Reason: Fix broken image paths by adding the relative parent directory prefix used in the project structure. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "cover_icon: icon_guillaume-bolduc-259596-unsplash.webp" Replacement: "cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp" Reason: Fix broken image paths by adding the relative parent directory prefix used in the project structure. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-03-12--docker-makes-everything-better/fr/index.mdx
- 295424d9477c2dd97328af7ef1097c6a37d0a0e9 i18n candidate(fr): docker-makes-everything-better via openrouter/qwen/qwen3.6-plus
- 74cc2a183a400b07d352213c5df4848d936641dc i18n candidate(fr): docker-makes-everything-better via openrouter/openai/gpt-oss-120b:nitro
- 779675426c6be6d754a058dcf68a9a7319db86ed i18n candidate(fr): docker-makes-everything-better via openrouter/qwen/qwen3-32b:nitro
