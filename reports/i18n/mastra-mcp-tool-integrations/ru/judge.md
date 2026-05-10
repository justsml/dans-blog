# Translation Judge

- Slug: mastra-mcp-tool-integrations
- Locale: ru
- Requested judges: openrouter/google/gemini-3-flash-preview, openrouter/deepseek/deepseek-v4-flash
- Escalation attempted: openrouter/anthropic/claude-sonnet-4.6
- Result: provider-limited model judge fallback

The standard judge script was run with the requested two cheap judges. Gemini failed before judging because the OpenRouter key could only afford fewer output tokens than requested. DeepSeek V4 Flash also failed before producing a usable review because the prompt token total exceeded the provider/key limit. Because the cheap judge output was structurally broken, Sonnet escalation was attempted, but OpenRouter reported only enough remaining credit for 204 output tokens.

Selected candidate: `df480b79d4a9844250895fb1551902053b7db4fd`.

Reason: this DeepSeek V4 Flash candidate preserved the MDX/code structure, kept parent-relative asset paths, translated the complete article, and read naturally in Russian while preserving the article's direct technical voice. A final polish pass localized the series links to `/ru/...`.
