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

## Primary Judge Telemetry
- Runtime seconds: 4.61
- Input tokens: 12071
- Output tokens: 257
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006807
- Estimated cost: $0.006807

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.84
- Input tokens: 7881
- Output tokens: 298
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004835
- Estimated cost: $0.004835

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[`MCPClient`](https://mastra.ai/docs/mcp/overview)" Replacement: "[`MCPClient`](../mastra.ai/docs/mcp/overview)" Reason: The English file uses a bare URL which should be relative in the localized folder per instructions. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "[`MCPClient`](../mastra.ai/docs/mcp/overview)" Replacement: "[`MCPClient`](https://mastra.ai/docs/mcp/overview)" Reason: The link in the source is an absolute external URL to the documentation site. The candidate incorrectly changed it to a relative path which will result in a 404. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2026-01-04--mastra-mcp-tool-integrations/zh/index.mdx
- c3d5fbcb319737c6dda7bba6eb644cddf0567d1a i18n candidate(zh): mastra-mcp-tool-integrations via openrouter/openai/gpt-oss-120b:nitro
- 83ba55b956b8bc979e49594ac8f3d640528c1d73 i18n candidate(zh): mastra-mcp-tool-integrations via openrouter/qwen/qwen3-32b:nitro
- a99a7ac4803b27793df53c5e5470ea235debe589 i18n candidate(zh): mastra-mcp-tool-integrations via openrouter/google/gemini-3-flash-preview
