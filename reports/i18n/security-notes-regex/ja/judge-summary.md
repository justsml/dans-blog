# Translation Judge Summary

- Slug: security-notes-regex
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 4.30
- Input tokens: 4900
- Output tokens: 536
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004058

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.80
- Input tokens: 3660
- Output tokens: 196
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002418

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "cover: markus-spiske-666905-unsplash.webp" Replacement: "cover: ../markus-spiske-666905-unsplash.webp" Reason: The image path needs the relative parent directory prefix to match the project structure, as seen in the current version. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "cover_mobile: w300_markus-spiske-666905-unsplash.webp" Replacement: "cover_mobile: ../w300_markus-spiske-666905-unsplash.webp" Reason: The image path needs the relative parent directory prefix. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "cover_icon: icon_markus-spiske-666905-unsplash.webp" Replacement: "cover_icon: ../icon_markus-spiske-666905-unsplash.webp" Reason: The image path needs the relative parent directory prefix. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-02-24--security-notes-regex/ja/index.mdx
- 7064caafbe1d4f4b0c0ff8bf41c61fe332faa61f i18n candidate(ja): security-notes-regex via openrouter/qwen/qwen3.6-plus
- f06b27ae102a268174561a663b405e1ffa227b88 i18n candidate(ja): security-notes-regex via openrouter/openai/gpt-oss-120b:nitro
- 3c8fd30eb60c4ed31c733530433606b9662cf305 i18n candidate(ja): security-notes-regex via openrouter/qwen/qwen3-32b:nitro
