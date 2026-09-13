# Translation Judge Summary

- Slug: dont-fear-the-model-router
- Locale: es
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.888)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.19
- Input tokens: 19871
- Output tokens: 399
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016400
- Estimated cost: $0.016400

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.49
- Input tokens: 19238
- Output tokens: 198
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015171
- Estimated cost: $0.015171

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "- [No te cases con tu modelo](../llm-routing-mastra-ai) - [¡Combate los males con evaluaciones!](../llm-evals-are-broken)" Replacement: "- [No te cases con tu modelo](/llm-routing-mastra-ai) - [¡Combate los males con evaluaciones!](/llm-evals-are-broken)" Reason: The internal site links in the English original use absolute root paths (/llm-routing-mastra-ai and /llm-evals-are-broken); changing them to relative paths breaks site routing. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-07-03--dont-fear-the-model-router/es/index.mdx
- f1743c16a474ba4c4f21cde7414ce004a7680a1d i18n candidate(es): dont-fear-the-model-router via openrouter/deepseek/deepseek-v4-flash
- 234c1a3790c63f3b7af162c2594f78dd80027046 i18n candidate(es): dont-fear-the-model-router via openrouter/openai/gpt-5.6-luna
