# Translation Judge Summary

- Slug: you-might-not-need-algolia
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
- Runtime seconds: 2.56
- Input tokens: 9236
- Output tokens: 244
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005350

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.39
- Input tokens: 5603
- Output tokens: 273
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003621

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "across des systèmes" Replacement: "à travers des systèmes" Reason: 'Across' is an English word left untranslated in the middle of a French sentence. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "blog vendor" Replacement: "blog de vendeur" Reason: 'Vendor' is used as an adjective here; 'blog de vendeur' or 'discours commercial' is more natural in French. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-03-01--you-might-not-need-algolia/fr/index.mdx
- ad0e86964706b8db26744373f8bba2368e8bbf82 i18n candidate(fr): you-might-not-need-algolia via openrouter/qwen/qwen3.6-plus
- 0b34440915d23a995c38e3d3dd892c415417b301 i18n candidate(fr): you-might-not-need-algolia via openrouter/openai/gpt-oss-120b:nitro
- 019cd199ac5a7399134492734060e5480466a762 i18n candidate(fr): you-might-not-need-algolia via openrouter/qwen/qwen3-32b:nitro
