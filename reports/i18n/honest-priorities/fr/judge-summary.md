# Translation Judge Summary

- Slug: honest-priorities
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
- Runtime seconds: 2.58
- Input tokens: 8994
- Output tokens: 253
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005256

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.54
- Input tokens: 6872
- Output tokens: 313
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004375

### Pass 2
- Runtime seconds: 2.44
- Input tokens: 6851
- Output tokens: 268
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004229

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "panne partielle/compltète du service" Replacement: "panne partielle/complète du service" Reason: Typo in the word 'complète'. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied medium priority suggestion. Match: "meilleurchoix" Replacement: "meilleur choix" Reason: Missing space between 'meilleur' and 'choix' in the subtitle. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-10-23--honest-priorities/fr/index.mdx
- 89853fcf65dd8a67526d9a710e7c5bebcc1ea7fd i18n candidate(fr): honest-priorities via openrouter/openai/gpt-oss-120b:nitro
- b2fc89416caa649a130be6dd42d7dc097539f3dd i18n candidate(fr): honest-priorities via openrouter/qwen/qwen3-32b:nitro
