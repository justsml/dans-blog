# Translation Judge Summary

- Slug: the-4-pillars-of-collaborative-culture
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
- Runtime seconds: 2.93
- Input tokens: 8341
- Output tokens: 301
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005073

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.21
- Input tokens: 6399
- Output tokens: 223
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003868

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "(ex. `Urgent`, `[Team-Name]`, `Needs C-Level Approval`, `Hackathon`, `Spike related`.)" Replacement: "(ex. `Urgent`, `[Nom-Équipe]`, `Nécessite approbation direction`, `Hackathon`, `Relatif au Spike`.)" Reason: The labels in the list were left in English, which breaks the flow for a French reader. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2021-03-03--the-4-pillars-of-collaborative-culture/fr/index.mdx
- 1efd812a8655986a1dd7df2dadfc818afa56f933 i18n candidate(fr): the-4-pillars-of-collaborative-culture via openrouter/openai/gpt-oss-120b:nitro
- 2e90dbee3c4152d30f8c77e4de3ef06ad1847fb4 i18n candidate(fr): the-4-pillars-of-collaborative-culture via openrouter/qwen/qwen3-32b:nitro
