# Translation Judge Summary

- Slug: mastra-workflows-memory
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.332)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.20
- Input tokens: 8424
- Output tokens: 426
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005490
- Estimated cost: $0.005490

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.53
- Input tokens: 11644
- Output tokens: 356
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006890
- Estimated cost: $0.006890

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: \"Arrêtez de créer des agents instables : utilisez les Workflows et la Mémoire\"" Reason: The frontmatter title is empty in the candidate, which is a major omission for reader-facing content. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "[Routage LLM](/llm-routing-mastra-ai)" Replacement: "[Routage LLM](../llm-routing-mastra-ai)" Reason: Internal links to other posts in the series should ideally use relative paths consistent with the locale folder depth, though the source used absolute-style paths. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "1. [Routage LLM](../llm-routing-mastra-ai)" Replacement: "1. [Routage LLM](/llm-routing-mastra-ai)" Reason: The link should point to the root-relative path as per the English source to ensure consistency across the site's routing structure, rather than a relative path that might break depending on the deployment environment. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2026-01-05--mastra-workflows-memory/fr/index.mdx
- 0e637470f0f98f355d6a432ceaa1a790497d3c58 i18n candidate(fr): mastra-workflows-memory via openrouter/deepseek/deepseek-v4-flash
