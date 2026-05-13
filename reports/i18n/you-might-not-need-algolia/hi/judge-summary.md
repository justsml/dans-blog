# Translation Judge Summary

- Slug: you-might-not-need-algolia
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
- Runtime seconds: 3.67
- Input tokens: 9219
- Output tokens: 487
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006071

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.14
- Input tokens: 5997
- Output tokens: 210
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003629

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "social_image: desktop-social.webp" Replacement: "social_image: ../desktop-social.webp" Reason: The image path needs to be relative to the parent directory to match the English source structure and ensure the image loads correctly in the localized folder. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "cover_full_width: synth-wave-city-wide.webp" Replacement: "cover_full_width: ../synth-wave-city-wide.webp" Reason: Image path correction. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "cover_mobile: synth-wave-city-200-square.webp" Replacement: "cover_mobile: ../synth-wave-city-200-square.webp" Reason: Image path correction. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "cover_icon: synth-wave-city-200-square.webp" Replacement: "cover_icon: ../synth-wave-city-200-square.webp" Reason: Image path correction. Note: Applied exact replacement to selected MDX.
5. Pass 1: applied high priority suggestion. Match: "![PageFind के साथ मेरी साइट को इंडेक्स करना](PageFind-Cleaner-better-15fps-720p2.webp" Replacement: "![PageFind के साथ मेरी साइट को इंडेक्स करना](../PageFind-Cleaner-better-15fps-720p2.webp" Reason: Image path correction. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-03-01--you-might-not-need-algolia/hi/index.mdx
- 08b1a2d0511b9c3971fea846d53ca3adadea2e78 i18n candidate(hi): you-might-not-need-algolia via openrouter/qwen/qwen3.6-plus
- c984280b0565510b0e5ae1b3d2781ed473c73276 i18n candidate(hi): you-might-not-need-algolia via openrouter/openai/gpt-oss-120b:nitro
- 123c968fd8e15c5969aab08d6268809bbbfaa4ea i18n candidate(hi): you-might-not-need-algolia via openrouter/qwen/qwen3-32b:nitro
