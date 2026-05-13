# Translation Judge Summary

- Slug: creating-collaborative-culture
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
- Runtime seconds: 3.48
- Input tokens: 5363
- Output tokens: 470
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004091

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.93
- Input tokens: 3888
- Output tokens: 220
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002604

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "cover: pexels-photo-3184431--cropped.webp" Replacement: "cover: ../pexels-photo-3184431--cropped.webp" Reason: The image path must be relative to the parent directory (../) to match the project structure, as seen in the English source and other localized versions. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "cover_mobile: w300_pexels-photo-3184431--cropped.webp" Replacement: "cover_mobile: ../w300_pexels-photo-3184431--cropped.webp" Reason: The image path must be relative to the parent directory (../). Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "cover_icon: icon_pexels-photo-3184431--cropped.webp" Replacement: "cover_icon: ../icon_pexels-photo-3184431--cropped.webp" Reason: The image path must be relative to the parent directory (../). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2021-03-03--creating-collaborative-culture/fr/index.mdx
- 9f65f1b8ec85029f47cebec48a5c2e54f7efc78b i18n candidate(fr): creating-collaborative-culture via openrouter/qwen/qwen3.6-plus
- 297e97aa7c4452e3e24da94954740ad7abb50d00 i18n candidate(fr): creating-collaborative-culture via openrouter/openai/gpt-oss-120b:nitro
- a260ab121c714ae91c4e5218ddac65633b0c4296 i18n candidate(fr): creating-collaborative-culture via openrouter/qwen/qwen3-32b:nitro
