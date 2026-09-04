# Translation Judge Summary

- Slug: mastra-mcp-tool-integrations
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.886)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 2.34
- Input tokens: 6927
- Output tokens: 215
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004109
- Estimated cost: $0.004109

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.65
- Input tokens: 9529
- Output tokens: 266
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005562
- Estimated cost: $0.005562

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: \"没有这个，你的 AI 智能体就毫无用处\"" Reason: The frontmatter title was left empty in the translation. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-04--mastra-mcp-tool-integrations/zh/index.mdx
- e9105e14148ed315c357f8887101def92af2c947 i18n candidate(zh): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v4-flash
