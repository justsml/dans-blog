# Translation Judge Summary

- Slug: mastra-mcp-tool-integrations
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview (failed: OpenRouter credit ceiling)
- Second judge model: openrouter/deepseek/deepseek-v4-flash (failed: prompt-token ceiling)
- Escalation judge model: openrouter/anthropic/claude-sonnet-4.6 (failed: OpenRouter credit ceiling)
- Selected commit hint: judge selected

## Primary Judge Telemetry
- Runtime seconds: 3.03
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Estimated cost: unknown

## Fallback Selection
- Model judges were attempted through the standard script, but all requested judge/escalation models returned provider-limit errors before producing usable `judge.md` output.
- Selected candidate: df480b79d4a9844250895fb1551902053b7db4fd (`openrouter/deepseek/deepseek-v4-flash`).
- Rationale: best preserved MDX/code structure, complete article coverage, natural Russian technical prose, correct parent-relative asset paths.
- Final polish: localized "Read the series" links to `/ru/...`.

## Candidates
- 24d02096037e02b02e0b355d74fc7c1106e65e63 i18n candidate(ru): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v4-flash
- 1b359da190258a2539eb0f7a91b80f8aade33d91 i18n candidate(ru): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v3.2
- df480b79d4a9844250895fb1551902053b7db4fd i18n candidate(ru): mastra-mcp-tool-integrations via openrouter/deepseek/deepseek-v4-flash
