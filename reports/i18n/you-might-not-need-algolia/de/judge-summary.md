# Translation Judge Summary

- Slug: you-might-not-need-algolia
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
- Runtime seconds: 3.08
- Input tokens: 8948
- Output tokens: 381
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005617

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.12
- Input tokens: 5733
- Output tokens: 416
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004115

### Pass 2
- Runtime seconds: 2.56
- Input tokens: 5634
- Output tokens: 234
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003519

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "social_image: desktop-social.webp" Replacement: "social_image: ../desktop-social.webp" Reason: The image path must be relative to the parent directory to match the English source's structure and ensure the image resolves correctly in the build. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "![Indexierung meiner Site mit PageFind](PageFind-Cleaner-better-15fps-720p2.webp \"Indexierung meiner Site mit PageFind\")" Replacement: "![Indexierung meiner Site mit PageFind](../PageFind-Cleaner-better-15fps-720p2.webp \"Indexierung meiner Site mit PageFind\")" Reason: The image path must be relative to the parent directory. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "synchron mit deiner Quellquelle" Replacement: "synchron mit deiner Source of Truth" Reason: The term 'Quellquelle' is a redundant and awkward translation of 'source of truth'. Keeping the technical term or using 'Datenquelle' is more natural. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "dieChunks" Replacement: "die Chunks" Reason: Missing space between the article and the noun. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "das Output" Replacement: "den Output" Reason: In German technical context, 'Output' is typically masculine (den Output) rather than neuter. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-03-01--you-might-not-need-algolia/de/index.mdx
- 1220550254443fd21b61afc5c9579e5d726b85cb i18n candidate(de): you-might-not-need-algolia via openrouter/qwen/qwen3.6-plus
- 050d55442b41f4fc29eb8b45578d246d104e604b i18n candidate(de): you-might-not-need-algolia via openrouter/openai/gpt-oss-120b:nitro
- 3ad0ecd5b14d872cdbb5d5fa842f7f300394d229 i18n candidate(de): you-might-not-need-algolia via openrouter/qwen/qwen3-32b:nitro
