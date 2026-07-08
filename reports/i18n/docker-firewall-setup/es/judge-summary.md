# Translation Judge Summary

- Slug: docker-firewall-setup
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.877)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.15
- Input tokens: 6878
- Output tokens: 345
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004474
- Estimated cost: $0.004474

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.63
- Input tokens: 4733
- Output tokens: 305
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003282
- Estimated cost: $0.003282

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "ufw limit ssh # Límite de tasa básico para mitigar fuerza bruta SSH --- CHUNK END --- # Establece tu IP externa" Replacement: "ufw limit ssh # Límite de tasa básico para mitigar fuerza bruta SSH # Establece tu IP externa" Reason: The candidate contains a '--- CHUNK END ---' marker which is a leak from the translation process and breaks the code block structure. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-06-06--docker-firewall-setup/es/index.mdx
- 9bfdddbe73eb104dd0222bc2eb788ef1b613a70e i18n candidate(es): docker-firewall-setup via openrouter/qwen/qwen3-32b:nitro
- 11bc5318cbd8e53f0d0396f015098585de883810 i18n candidate(es): docker-firewall-setup via openrouter/openai/gpt-oss-120b:nitro
- 351382088d212294a2c0da36841b200c3adef665 i18n candidate(es): docker-firewall-setup via deepseek/deepseek-v4-flash
