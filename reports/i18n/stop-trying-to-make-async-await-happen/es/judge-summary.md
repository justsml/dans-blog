# Translation Judge Summary

- Slug: stop-trying-to-make-async-await-happen
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
- Runtime seconds: 3.63
- Input tokens: 11631
- Output tokens: 307
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006737

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.99
- Input tokens: 9126
- Output tokens: 405
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005778

### Pass 2
- Runtime seconds: 2.41
- Input tokens: 9134
- Output tokens: 256
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005335

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "lostiempos" Replacement: "los tiempos" Reason: Typo: missing space between 'los' and 'tiempos'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Anti‑Patrón" Replacement: "Antipatrón" Reason: 'Antipatrón' is the standard spelling in Spanish; the hyphenated version with a non-breaking hyphen is unnecessary. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "Desde el principio de lostiempos" Replacement: "Desde el principio de los tiempos" Reason: Typo: missing space between 'los' and 'tiempos'. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "Anti‑Patrón" Replacement: "Antipatrón" Reason: 'Antipatrón' is the standard spelling in Spanish; the hyphenated version with a non-breaking hyphen is unnecessary. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/es/index.mdx
- 36a7577b512ffd790a53857a23dbc48246f1cd54 i18n candidate(es): stop-trying-to-make-async-await-happen via openrouter/openai/gpt-oss-120b:nitro
- bde2b362df8355ecf8392e1a3eb23460b1807dbc i18n candidate(es): stop-trying-to-make-async-await-happen via openrouter/qwen/qwen3-32b:nitro
