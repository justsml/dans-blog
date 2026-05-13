# Translation Judge Summary

- Slug: the-8-byte-timestamp-that-destroyed-our-database
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
- Runtime seconds: 2.98
- Input tokens: 14984
- Output tokens: 265
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008287

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.34
- Input tokens: 9220
- Output tokens: 385
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005765

### Pass 2
- Runtime seconds: 2.23
- Input tokens: 9245
- Output tokens: 228
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005306

## Judge Suggestions
1. Pass 1: logged medium priority suggestion. Match: "hora de Relocal" Replacement: "reloj de pared" Reason: 'Relocal' is a hallucination/typo. The English text refers to 'Wall-Clock Time'. Note: Exact match not found in selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Europe/paris" Replacement: "Europe/Paris" Reason: Timezone identifiers are case-sensitive in many contexts; preserving standard casing is better. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "Cuando la Hora de Relocal es lo que Realmente Necesitas" Replacement: "Cuando la hora de reloj de pared es lo que realmente necesitas" Reason: 'Relocal' is a hallucination/typo. The English text refers to 'Wall-Clock Time', which is standardly translated as 'reloj de pared' in technical contexts. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "Europe/paris" Replacement: "Europe/Paris" Reason: IANA timezone identifiers are case-sensitive; 'Paris' should be capitalized as in the source. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/es/index.mdx
- 33f731620d9e13d57a6a99ae377cb77b5a6dbc67 i18n candidate(es): the-8-byte-timestamp-that-destroyed-our-database via openrouter/qwen/qwen3.6-plus
- c39496bf7877cc96a3489cfd74360c284171efd9 i18n candidate(es): the-8-byte-timestamp-that-destroyed-our-database via openrouter/openai/gpt-oss-120b:nitro
- 9737189098da851f3f174f06bd7a0c1575167825 i18n candidate(es): the-8-byte-timestamp-that-destroyed-our-database via openrouter/qwen/qwen3-32b:nitro
