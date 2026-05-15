# Translation Judge Summary

- Slug: mastra-workflows-memory
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.42
- Input tokens: 10847
- Output tokens: 420
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006684
- Estimated cost: $0.006684

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.28
- Input tokens: 10412
- Output tokens: 484
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006658
- Estimated cost: $0.006658

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "/../llm-routing-mastra-ai" Replacement: "../llm-routing-mastra-ai" Reason: The candidate added an extra leading slash to relative paths, which breaks navigation in the MDX structure. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "/../mastra-security-guardrails" Replacement: "../mastra-security-guardrails" Reason: The candidate added an extra leading slash to relative paths, which breaks navigation in the MDX structure. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "/../mastra-mcp-tool-integrations" Replacement: "../mastra-mcp-tool-integrations" Reason: The candidate added an extra leading slash to relative paths, which breaks navigation in the MDX structure. Note: Applied exact replacement to selected MDX.
4. Pass 2: logged high priority suggestion. Match: "(../llm-routing-mastra-ai)" Replacement: "(/llm-routing-mastra-ai)" Reason: The English source uses root-relative paths (/llm-routing-mastra-ai). The translation changed them to relative parent paths (../) which will break links if the site structure expects root-relative URLs as per the source. Note: Exact match not found in selected MDX.
5. Pass 2: logged high priority suggestion. Match: "(../mastra-security-guardrails)" Replacement: "(/mastra-security-guardrails)" Reason: Restoring root-relative path to match English source. Note: Exact match not found in selected MDX.
6. Pass 2: logged high priority suggestion. Match: "(../mastra-mcp-tool-integrations)" Replacement: "(/mastra-mcp-tool-integrations)" Reason: Restoring root-relative path to match English source. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2026-01-05--mastra-workflows-memory/ar/index.mdx
- 708c7d7891594e8aa7c6bfe6a21db611d08eec48 i18n candidate(ar): mastra-workflows-memory via openrouter/openai/gpt-oss-120b:nitro
