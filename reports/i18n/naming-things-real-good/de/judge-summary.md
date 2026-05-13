# Translation Judge Summary

- Slug: naming-things-real-good
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.90
- Input tokens: 8217
- Output tokens: 545
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005744

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.02
- Input tokens: 5597
- Output tokens: 214
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003440

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "cover: rawpixel-652639-unsplash.webp" Replacement: "cover: ../rawpixel-652639-unsplash.webp" Reason: The image path must be relative to the localized folder to resolve correctly in this project structure. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "cover_mobile: w300_rawpixel-652639-unsplash.webp" Replacement: "cover_mobile: ../w300_rawpixel-652639-unsplash.webp" Reason: The image path must be relative to the localized folder to resolve correctly in this project structure. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "cover_icon: icon_rawpixel-652639-unsplash.webp" Replacement: "cover_icon: ../icon_rawpixel-652639-unsplash.webp" Reason: The image path must be relative to the localized folder to resolve correctly in this project structure. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2016-06-01--naming-things-real-good/de/index.mdx
- 7453fb34acbf4cfa4cf22928a73c3d802876a083 i18n candidate(de): naming-things-real-good via openrouter/qwen/qwen3.6-plus
- a6a588da1f19d944a83e097ecef5038e8285d3dd i18n candidate(de): naming-things-real-good via openrouter/openai/gpt-oss-120b:nitro
- 9f69e3ff0b674f6e9045dd3f978e6733df71f277 i18n candidate(de): naming-things-real-good via openrouter/qwen/qwen3-32b:nitro
