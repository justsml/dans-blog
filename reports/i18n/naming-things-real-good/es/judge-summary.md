# Translation Judge Summary

- Slug: naming-things-real-good
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.92
- Input tokens: 7871
- Output tokens: 547
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005576

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.22
- Input tokens: 5505
- Output tokens: 251
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003505

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "cover: rawpixel-652639-unsplash.webp" Replacement: "cover: ../rawpixel-652639-unsplash.webp" Reason: The image path needs to be relative to the localized folder (../) to match the English source's structure and ensure the image loads correctly. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "cover_mobile: w300_rawpixel-652639-unsplash.webp" Replacement: "cover_mobile: ../w300_rawpixel-652639-unsplash.webp" Reason: The image path needs to be relative to the localized folder (../). Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "cover_icon: icon_rawpixel-652639-unsplash.webp" Replacement: "cover_icon: ../icon_rawpixel-652639-unsplash.webp" Reason: The image path needs to be relative to the localized folder (../). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2016-06-01--naming-things-real-good/es/index.mdx
- 6b1024868db0a3cade5903cbd4ea5b197ceae0a3 i18n candidate(es): naming-things-real-good via openrouter/qwen/qwen3.6-plus
- d7e6289505904d45433ac4930f2aa66e78aa58f5 i18n candidate(es): naming-things-real-good via openrouter/openai/gpt-oss-120b:nitro
- 693c8f08a460dbcaf449ff3fabd7e73e3206c744 i18n candidate(es): naming-things-real-good via openrouter/qwen/qwen3-32b:nitro
