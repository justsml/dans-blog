# Translation Judge Summary

- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: fr
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.891)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 21.92
- Input tokens: 13932
- Output tokens: 702
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.013081
- Estimated cost: $0.013081

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.89
- Input tokens: 13390
- Output tokens: 316
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011227
- Estimated cost: $0.011227

### Pass 2
- Runtime seconds: 3.53
- Input tokens: 12890
- Output tokens: 153
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010241
- Estimated cost: $0.010241

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "**« Il a obtenu 94 % » n’est pas une mesure si la même exécution donne 82 % mardi.**[/auto-tune-your-llm-judge]" Replacement: "[« Il a obtenu 94 % » n’est pas une mesure si la même exécution donne 82 % mardi.](/auto-tune-your-llm-judge)" Reason: Fix malformed markdown link syntax where opening bracket and bolding broke the hyperlink. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Le démonstration fonctionne." Replacement: "La démonstration fonctionne." Reason: Fix gender agreement error ('démonstration' is feminine in French). Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "Rien ne indique si le système respecte les permissions, survive à un timeout," Replacement: "Rien n'indique si le système respecte les permissions, survit à un timeout," Reason: Fix elision ('n'indique') and mood/conjugation ('survit'). Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "Accordez du crédit lorsqu’une personne corrige sa propre erreur en plein réponse." Replacement: "Accordez du crédit lorsqu’une personne corrige sa propre erreur en pleine réponse." Reason: Fix gender agreement error ('en pleine réponse' since 'réponse' is feminine). Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "Parlez‑moi d’une approche que vous avez abandonnée ?" Replacement: "Parlez‑moi d’une approche que vous avez abandonnée." Reason: Match the original declarative imperative sentence ending in a period rather than an inappropriate question mark. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 803c0ccc675e88bf33e0cc39af4f19002f7e7f37 i18n candidate(fr): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/openai/gpt-oss-120b:nitro
- b8867515df0120946853d940fe47084e7f222975 i18n candidate(fr): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/deepseek/deepseek-v4-flash
