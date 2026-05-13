# Translation Judge Summary

- Slug: one-weird-trick-to-speed-up-feature-teams
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
- Runtime seconds: 2.61
- Input tokens: 10965
- Output tokens: 284
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006334

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.26
- Input tokens: 8511
- Output tokens: 428
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005540

### Pass 2
- Runtime seconds: 3.36
- Input tokens: 8493
- Output tokens: 392
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005423

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: Les Staff Engineers détestent ça !" Reason: The subtitle was missing in the candidate but present in the English source. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "La hiérarchie des clés (`user/420` -> `user/420/friends`) encodage naturel d'une relation graphique" Replacement: "La hiérarchie des clés (`user/420` -> `user/420/friends`) encode naturellement une relation de graphe" Reason: The original sentence 'encodage naturel' is ungrammatical (missing verb). 'Relation de graphe' is more standard than 'relation graphique' in this technical context. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "l'évoluer vers un système plus complexe" Replacement: "le faire évoluer vers un système plus complexe" Reason: In French, 'évoluer' is intransitive; you cannot 'évoluer' something directly. 'Le faire évoluer' is the correct transitive construction. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/fr/index.mdx
- 09e70ba000b840c88ca3e46b7274dd9bd2829a6c i18n candidate(fr): one-weird-trick-to-speed-up-feature-teams via openrouter/openai/gpt-oss-120b:nitro
- 714afad4b0edfb15a2d1f9ac450161813060fb06 i18n candidate(fr): one-weird-trick-to-speed-up-feature-teams via openrouter/qwen/qwen3-32b:nitro
