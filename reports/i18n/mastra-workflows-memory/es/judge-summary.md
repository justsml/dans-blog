# Translation Judge Summary

- Slug: mastra-workflows-memory
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.882)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.47
- Input tokens: 8186
- Output tokens: 373
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005212
- Estimated cost: $0.005212

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.86
- Input tokens: 11366
- Output tokens: 257
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006454
- Estimated cost: $0.006454

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[Documentación de Workflows de Mastra](https://mastra.ai/docs/workflows/overview)" Replacement: "[Documentación de flujos de trabajo de Mastra](https://mastra.ai/docs/workflows/overview)" Reason: Consistency: The term 'Workflows' was translated as 'flujos de trabajo' throughout the text but left in English in the resources section. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-05--mastra-workflows-memory/es/index.mdx
- 6dc68a6ab41eff4802816bcbbc5b4814286fd496 i18n candidate(es): mastra-workflows-memory via openrouter/deepseek/deepseek-v4-flash
