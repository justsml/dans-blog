# Translation Judge Summary

- Slug: dont-fear-the-model-router
- Locale: de
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.880)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.89
- Input tokens: 20252
- Output tokens: 377
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016603
- Estimated cost: $0.016603

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.02
- Input tokens: 19531
- Output tokens: 217
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015462
- Estimated cost: $0.015462

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "- [Verheirate dein Modell nicht](/llm-routing-mastra-ai)" Replacement: "- [Heirate dein Modell nicht](/llm-routing-mastra-ai)" Reason: Align the link title in the Resources section with the translation used in the opening paragraph. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-07-03--dont-fear-the-model-router/de/index.mdx
- 9deff1841944a1503bf506619937591fc378f255 i18n candidate(de): dont-fear-the-model-router via openrouter/openai/gpt-5.6-luna
- 2bfdadb9a00b1acc4a9eb0ab8ee18025674cf306 i18n candidate(de): dont-fear-the-model-router via openrouter/deepseek/deepseek-v4-flash
