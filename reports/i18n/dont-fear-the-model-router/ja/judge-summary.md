# Translation Judge Summary

- Slug: dont-fear-the-model-router
- Locale: ja
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
- Runtime seconds: 4.46
- Input tokens: 20185
- Output tokens: 453
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016837
- Estimated cost: $0.016837

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.75
- Input tokens: 19550
- Output tokens: 305
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015806
- Estimated cost: $0.015806

### Pass 2
- Runtime seconds: 2.48
- Input tokens: 19323
- Output tokens: 189
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015201
- Estimated cost: $0.015201

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "[Mastra `createScorer`リファレンス](https://mastra.ai/reference/evals/create-scorer)" Replacement: "[Mastra `createScorer` リファレンス](https://mastra.ai/reference/evals/create-scorer)" Reason: Formatting consistency with surrounding link texts Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "[Mastra `runEvals`リファレンス](https://mastra.ai/reference/evals/run-evals)" Replacement: "[Mastra `runEvals` リファレンス](https://mastra.ai/reference/evals/run-evals)" Reason: Formatting consistency with surrounding link texts Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "[モデルに縛られない](/llm-routing-mastra-ai)" Replacement: "[モデルと心中するな](/llm-routing-mastra-ai)" Reason: Align internal link anchor text with the Japanese translated title used in the Resources section and the related post title. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-07-03--dont-fear-the-model-router/ja/index.mdx
- ed523e9a7834724a751920a305ec7c086242cf0f i18n candidate(ja): dont-fear-the-model-router via openrouter/deepseek/deepseek-v4-flash
- c92355c6ca4f5807e3e4c8fa93538815c9d05b2c i18n candidate(ja): dont-fear-the-model-router via openrouter/openai/gpt-5.6-luna
