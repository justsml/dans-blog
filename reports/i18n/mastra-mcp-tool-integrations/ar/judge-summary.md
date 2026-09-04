# Translation Judge Summary

- Slug: mastra-mcp-tool-integrations
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.222)
- Confidence signals: 1 high and 2 medium issues; single judge
- High/medium/low issue counts: 1/2/0

## Primary Judge Telemetry
- Runtime seconds: 3.31
- Input tokens: 7508
- Output tokens: 336
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004762
- Estimated cost: $0.004762

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.30
- Input tokens: 10295
- Output tokens: 386
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006306
- Estimated cost: $0.006306

### Pass 2
- Runtime seconds: 8.05
- Input tokens: 10209
- Output tokens: 434
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006406
- Estimated cost: $0.006406

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: \"وكيل الذكاء الاصطناعي الخاص بك عديم الفائدة بدون هذا\"" Reason: The frontmatter title was left empty in the translation. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "## ربط الأدوات بالوكلاء" Replacement: "--- ## ربط الأدوات بالوكلاء" Reason: Missing horizontal rule separator before this heading compared to the English source. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "## الموافقة تقع على حدود الأداة" Replacement: "--- ## الموافقة تقع على حدود الأداة" Reason: Missing horizontal rule separator before this heading compared to the English source. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "## ربط الأدوات بالوكلاء" Replacement: "--- ## ربط الأدوات بالوكلاء" Reason: Missing horizontal rule separator before this heading compared to the English source. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "## الموافقة تقع على حدود الأداة" Replacement: "--- ## الموافقة تقع على حدود الأداة" Reason: Missing horizontal rule separator before this heading compared to the English source. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-04--mastra-mcp-tool-integrations/ar/index.mdx
- 092b247d986ce39640bd941e12e689b409424494 i18n candidate(ar): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v4-flash
