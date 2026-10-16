# Translation Judge Summary

- Slug: no-fate-but-what-we-bill
- Locale: de
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.483)
- Confidence signals: 0 high and 2 medium issues; single judge
- High/medium/low issue counts: 0/2/0

## Primary Judge Telemetry
- Runtime seconds: 5.92
- Input tokens: 11496
- Output tokens: 390
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010084
- Estimated cost: $0.010084

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 5.04
- Input tokens: 11066
- Output tokens: 289
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009383
- Estimated cost: $0.009383

### Pass 2
- Runtime seconds: 6.29
- Input tokens: 10915
- Output tokens: 244
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009101
- Estimated cost: $0.009101

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "wie lange ein agent arbeiten kann, und wie viele Agenten ein orchestrator koordinieren kann." Replacement: "wie lange ein Agent arbeiten kann, und wie viele Agenten ein Orchestrator koordinieren kann." Reason: Capitalize German nouns 'Agent' and 'Orchestrator'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Ausdauer (wie lange ein agent arbeitet) und Breite (wie viele Agenten ein orchestrator betreibt)" Replacement: "Ausdauer (wie lange ein Agent arbeitet) und Breite (wie viele Agenten ein Orchestrator betreibt)" Reason: Capitalize German nouns 'Agent' and 'Orchestrator'. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged medium priority suggestion. Match: "Operativer orchestrator agierte" Replacement: "operativer Orchestrator agierte" Reason: Capitalize German noun 'Orchestrator'. Note: Exact match not found in selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "Ein orchestrator, der Dutzende parallele Sub-Agenten steuert" Replacement: "Ein Orchestrator, der Dutzende parallele Sub-Agenten steuert" Reason: Capitalize German noun 'Orchestrator'. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 5490c757010317b7efad668e5adb28fef46bb5e5 i18n candidate(de): no-fate-but-what-we-bill via openrouter/google/gemini-3.8-flash
- 2aade359128549e58cca2634b5d3d4c0de8dc99f i18n candidate(de): no-fate-but-what-we-bill via openrouter/minimax/minimax-m2.5:nitro
