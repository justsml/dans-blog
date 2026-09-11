# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: de
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.879)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 10.60
- Input tokens: 14988
- Output tokens: 474
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.013019
- Estimated cost: $0.013019

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.34
- Input tokens: 9518
- Output tokens: 245
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008057
- Estimated cost: $0.008057

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Bei gestreamter Ausgabe solltest du Chunks bündeln, bevor du aufwendigere Klassifizierer ausführst. So bezahlst du nicht für eine separate LLM-Prüfung bei jedem winzigen Token-T..." Replacement: "Bei gestreamter Ausgabe sollten Sie Chunks bündeln, bevor Sie aufwendigere Klassifizierer ausführen. So bezahlen Sie nicht für eine separate LLM-Prüfung bei jedem winzigen Token..." Reason: Harmonize pronoun register to consistent formal 'Sie' used throughout the rest of candidate 0890794260c9b02222524dbffd36eea2cadebcd5. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/de/index.mdx
- 6c658f4491d4fe52eec285003e2e78dadc179780 i18n candidate(de): mastra-security-guardrails via openrouter/deepseek/deepseek-v4-flash
- 0890794260c9b02222524dbffd36eea2cadebcd5 i18n candidate(de): mastra-security-guardrails via openrouter/openai/gpt-5.6-luna
- b45babb8384b8ae43039c7558298671ddc20904b i18n candidate(de): mastra-security-guardrails via openrouter/openai/gpt-oss-120b:nitro
