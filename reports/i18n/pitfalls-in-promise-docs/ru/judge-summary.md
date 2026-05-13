# Translation Judge Summary

- Slug: pitfalls-in-promise-docs
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
- Runtime seconds: 3.11
- Input tokens: 4640
- Output tokens: 357
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003391

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.25
- Input tokens: 4041
- Output tokens: 296
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002909

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "![q first example](../qlibrary-1.webp)" Replacement: "![q first example](qlibrary-1.webp)" Reason: The current directory structure for images in the Q Library section should match the relative pathing used in the original or be consistent with the other images. However, looking at the current file, the images qlibrary-1.webp and qlibrary-2.webp are missing the '../' prefix compared to others. They should likely be consistent. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Bottom line:" Replacement: "В итоге:" Reason: Translate 'Bottom line' to maintain the Russian flow of the text. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "![q first example](qlibrary-1.webp)" Replacement: "![q first example](../qlibrary-1.webp)" Reason: Image path is missing the '../' prefix required for localized content in the ru/ subfolder to correctly reference assets in the parent folder. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2017-05-10--pitfalls-in-promise-docs/ru/index.mdx
- 4091fae596da82326b690438c8c6a92a106fd271 i18n candidate(ru): pitfalls-in-promise-docs via openrouter/openai/gpt-oss-120b:nitro
- 5b157f4d5de18eab56b6696766a312f7611f9825 i18n candidate(ru): pitfalls-in-promise-docs via openrouter/qwen/qwen3-32b:nitro
