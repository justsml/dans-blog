# Translation Judge Summary

- Slug: llm-routing-mastra-ai
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.887)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.21
- Input tokens: 5468
- Output tokens: 309
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003661
- Estimated cost: $0.003661

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.53
- Input tokens: 7297
- Output tokens: 245
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004384
- Estimated cost: $0.004384

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: 'لا ترتبط بنموذج واحد للأبد'" Reason: The frontmatter title was left empty; it must be translated as it is reader-facing. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: 'توجيه نماذج اللغة (LLM Routing) هو التوجه الأبرز حالياً'" Reason: The frontmatter subTitle was left empty; it must be translated. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-02--llm-routing-mastra-ai/ar/index.mdx
- b5104880d313d97b93e2d25e7d94058be52cbf8d i18n candidate(ar): llm-routing-mastra-ai via openrouter/qwen/qwen3.6-plus
