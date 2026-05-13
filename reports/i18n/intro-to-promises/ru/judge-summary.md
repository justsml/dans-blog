# Translation Judge Summary

- Slug: intro-to-promises
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.09
- Input tokens: 6268
- Output tokens: 168
- Thinking tokens: unknown
- Cached input tokens: 4072
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.001806

### Round 1, Batch 2
- Runtime seconds: 1.81
- Input tokens: 5125
- Output tokens: 119
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002919

## Primary Judge Telemetry
- Runtime seconds: 3.07
- Input tokens: 3974
- Output tokens: 381
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003130

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.97
- Input tokens: 4440
- Output tokens: 217
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002871

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "cover: joe-yates-480485-unsplash.webp" Replacement: "cover: ../joe-yates-480485-unsplash.webp" Reason: Broken image path. Local assets in localized subdirectories must use relative parent paths to match the current file structure. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "cover_mobile: w300_joe-yates-480485-unsplash.webp" Replacement: "cover_mobile: ../w300_joe-yates-480485-unsplash.webp" Reason: Broken image path. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "cover_icon: icon_joe-yates-480485-unsplash.webp" Replacement: "cover_icon: ../icon_joe-yates-480485-unsplash.webp" Reason: Broken image path. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-08-01--intro-to-promises/ru/index.mdx
- ce50553948aa737b46a6106590cbcd48f5e41b07 i18n candidate(ru): intro-to-promises via openrouter/qwen/qwen3.6-plus
- d867c86ba4454b1630c2fadab51813717251e19d i18n candidate(ru): intro-to-promises via openrouter/qwen/qwen3-32b:nitro
- 387fe9231568f26c2232fe63169050939035b3e9 i18n candidate(ru): intro-to-promises via openrouter/openai/gpt-oss-120b:nitro
- 52b0c4ade238893a1c013b8a0c5787eada9f9c3a i18n candidate(ru): intro-to-promises via deepseek/deepseek-v4-flash
- b9b422af8eec06b759a9fefc4a7b9e59a195f192 i18n candidate(ru): intro-to-promises via qwen/qwen3.6-35b-a3b
