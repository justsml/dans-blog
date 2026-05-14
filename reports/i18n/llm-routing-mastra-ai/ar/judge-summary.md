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

## Primary Judge Telemetry
- Runtime seconds: 2.99
- Input tokens: 6406
- Output tokens: 313
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004142
- Estimated cost: $0.004142

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.25
- Input tokens: 6418
- Output tokens: 455
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004574
- Estimated cost: $0.004574

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "/mastra-security-guardrails" Replacement: "../mastra-security-guardrails" Reason: The link must start with ../ to correctly reference the parent directory in the localized folder structure. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "/mastra-mcp-tool-integrations" Replacement: "../mastra-mcp-tool-integrations" Reason: The link must start with ../ to correctly reference the parent directory in the localized folder structure. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "/mastra-workflows-memory" Replacement: "../mastra-workflows-memory" Reason: The link must start with ../ to correctly reference the parent directory in the localized folder structure. Note: Applied exact replacement to selected MDX.
4. Pass 2: logged high priority suggestion. Match: "(..../mastra-security-guardrails)" Replacement: "(/mastra-security-guardrails)" Reason: The current translation has an incorrect path format '..../'. It should be a standard root-relative or relative path. Given the site structure, '/mastra-security-guardrails' is the standard for internal cross-linking in this project. Note: Exact match not found in selected MDX.
5. Pass 2: logged high priority suggestion. Match: "(..../mastra-mcp-tool-integrations)" Replacement: "(/mastra-mcp-tool-integrations)" Reason: Correcting the broken path prefix '..../' to the standard internal link format. Note: Exact match not found in selected MDX.
6. Pass 2: logged high priority suggestion. Match: "(..../mastra-workflows-memory)" Replacement: "(/mastra-workflows-memory)" Reason: Correcting the broken path prefix '..../' to the standard internal link format. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- 071449f22d81d262d8b49ce76844230d35f33980 i18n candidate(ar): llm-routing-mastra-ai via openrouter/deepseek/deepseek-v4-flash
- dadcbea6f315310a7fc733427c76a636bcfb9433 i18n candidate(ar): llm-routing-mastra-ai via openrouter/openai/gpt-oss-120b:nitro
