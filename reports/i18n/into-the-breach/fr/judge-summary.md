# Translation Judge Summary

- Slug: into-the-breach
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.885)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.43
- Input tokens: 17039
- Output tokens: 252
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009276
- Estimated cost: $0.009276

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.66
- Input tokens: 11819
- Output tokens: 255
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006674
- Estimated cost: $0.006674

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Table des matières visuelle" Replacement: "Sommaire visuel" Reason: 'Sommaire' is more natural for a visual overview in French than the literal 'Table des matières'. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/fr/index.mdx
- 243388ac58b94c41a6e72a898723e2df03109226 i18n candidate(fr): into-the-breach via deepseek/deepseek-v4-flash:nitro
- db4fa81c99468b12d51e5bc9316e8b5eaa1e7472 i18n candidate(fr): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
- 07baa35afbf7e96cce319b43bfb81097d15c57ce i18n candidate(fr): into-the-breach via openrouter/qwen/qwen3-32b:nitro
