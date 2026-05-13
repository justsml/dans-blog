# Translation Judge Summary

- Slug: promise-gotchas
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
- Input tokens: 4863
- Output tokens: 582
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004177

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.92
- Input tokens: 3771
- Output tokens: 215
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002531

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "cover: michal-parzuchowski-224092-unsplash.webp" Replacement: "cover: ../michal-parzuchowski-224092-unsplash.webp" Reason: The image paths in the frontmatter must be relative to the parent directory (../) to match the project structure for translated posts. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "cover_mobile: w300_michal-parzuchowski-224092-unsplash.webp" Replacement: "cover_mobile: ../w300_michal-parzuchowski-224092-unsplash.webp" Reason: The image paths in the frontmatter must be relative to the parent directory (../) to match the project structure for translated posts. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "cover_icon: icon_michal-parzuchowski-224092-unsplash.webp" Replacement: "cover_icon: ../icon_michal-parzuchowski-224092-unsplash.webp" Reason: The image paths in the frontmatter must be relative to the parent directory (../) to match the project structure for translated posts. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-09-26--promise-gotchas/es/index.mdx
- 72ca539a94086f37a19224b33774ae982bba4934 i18n candidate(es): promise-gotchas via openrouter/qwen/qwen3.6-plus
- 06d3f9fcd886be0d0098fb3ef9a1bcfa756a6028 i18n candidate(es): promise-gotchas via openrouter/openai/gpt-oss-120b:nitro
- 40b3c806b1867acf72dfcd31e74409200c04fcd7 i18n candidate(es): promise-gotchas via openrouter/qwen/qwen3-32b:nitro
