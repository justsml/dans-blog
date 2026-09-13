# Translation Judge Summary

- Slug: dont-fear-the-model-router
- Locale: he
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
- Runtime seconds: 3.62
- Input tokens: 22097
- Output tokens: 337
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.017837
- Estimated cost: $0.017837

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.81
- Input tokens: 20475
- Output tokens: 237
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016245
- Estimated cost: $0.016245

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[אל תתחתן עם המודל שלך](../llm-routing-mastra-ai) טען את הטיעון הפשוט" Replacement: "[אל תתחתן עם המודל שלך](/llm-routing-mastra-ai) טען את הטיעון הפשוט" Reason: Root-relative URL was incorrectly modified to a relative path ('../llm-routing-mastra-ai') in the lead sentence. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-07-03--dont-fear-the-model-router/he/index.mdx
- 69f0911a488bb04588a42c96aae9dd961e68fa5f i18n candidate(he): dont-fear-the-model-router via openrouter/deepseek/deepseek-v4-flash
- f05320905eeda6604ffd04ac7228278403936989 i18n candidate(he): dont-fear-the-model-router via openrouter/openai/gpt-5.6-luna
