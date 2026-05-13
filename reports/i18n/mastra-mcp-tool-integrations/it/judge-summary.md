# Translation Judge Summary

- Slug: mastra-mcp-tool-integrations
- Locale: it
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.84
- Input tokens: 12943
- Output tokens: 281
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007314

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 1.88
- Input tokens: 8209
- Output tokens: 207
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004725

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "e la chiami giorno" Replacement: "e finisce lì" Reason: The phrase 'call it a day' was translated literally as 'chiami giorno', which is incorrect in Italian. 'E finisce lì' or 'e via così' is more appropriate. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Autenticazione Per-Udente" Replacement: "Autenticazione Per-Utente" Reason: Typo: 'Udente' (hearing person) instead of 'Utente' (user). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-04--mastra-mcp-tool-integrations/it/index.mdx
- 7f8f14e39a9280de4cc5b3d52f70ad9d6aafc7a6 i18n candidate(it): mastra-mcp-tool-integrations via openrouter/qwen/qwen3.6-plus
- 3fdb695ce9f020ac8f3c29728b5e06cb565f5d89 i18n candidate(it): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v4-flash
- 5aa5331ed68e9d1196fa3ebf76652a94746e1abd i18n candidate(it): mastra-mcp-tool-integrations via openrouter/minimax/minimax-m2.7
