# Translation Judge Summary

- Slug: mastra-mcp-tool-integrations
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: medium (0.650)
- Confidence signals: low blocking-issue rate; single judge
- High/medium/low issue counts: 0/1/0

## Primary Judge Telemetry
- Runtime seconds: 3.05
- Input tokens: 7787
- Output tokens: 254
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004655
- Estimated cost: $0.004655

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.59
- Input tokens: 10452
- Output tokens: 366
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006324
- Estimated cost: $0.006324

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: 'סוכן ה-AI שלך חסר תועלת בלי זה'" Reason: The frontmatter title was left empty in the translation. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "## אישור בגבול הכלי" Replacement: "--- ## אישור בגבול הכלי" Reason: Missing horizontal rule (---) before the H2 heading compared to the source structure. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged medium priority suggestion. Match: "--- ## אישור בגבול הכלי" Replacement: "--- ## אישור בגבול הכלי" Reason: The previous judge report suggested a missing horizontal rule, but it is actually present in the candidate. However, there is a trailing space in the candidate's separator '--- ' which should be cleaned for MDX consistency. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2026-01-04--mastra-mcp-tool-integrations/he/index.mdx
- 5baa080903da1561d2fc85fc87c214cc53a0c97d i18n candidate(he): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v4-flash
