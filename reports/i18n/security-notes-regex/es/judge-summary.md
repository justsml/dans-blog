# Translation Judge Summary

- Slug: security-notes-regex
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.64
- Input tokens: 3978
- Output tokens: 323
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.002958

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.12
- Input tokens: 3536
- Output tokens: 462
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003154

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "cuantificadores anidados" Replacement: "Cuantificadores anidados" Reason: Capitalization for consistency in list items. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "motores con retroceso" Replacement: "Motores con retroceso" Reason: Capitalization for consistency in list items. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "la expresión se usa" Replacement: "La expresión se usa" Reason: Capitalization for consistency in list items. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "la validación con regex" Replacement: "La validación con regex" Reason: Capitalization for consistency in list items. Note: Applied exact replacement to selected MDX.
5. Pass 2: logged high priority suggestion. Match: "1. Cuantificadores anidados" Replacement: "1. Cuantificadores anidados" Reason: The current text already has correct capitalization in the provided MDX content for the first item, but I will ensure the others match the source's sentence case. Note: Exact match and replacement are identical; no MDX change needed.
6. Pass 2: logged high priority suggestion. Match: "2. Motores con retroceso" Replacement: "2. Motores con retroceso" Reason: Ensuring consistency with the source's list capitalization. Note: Exact match and replacement are identical; no MDX change needed.
7. Pass 2: logged high priority suggestion. Match: "3. La expresión se usa" Replacement: "3. La expresión se usa" Reason: Ensuring consistency with the source's list capitalization. Note: Exact match and replacement are identical; no MDX change needed.
8. Pass 2: logged high priority suggestion. Match: "4. La validación con regex" Replacement: "4. La validación con regex" Reason: Ensuring consistency with the source's list capitalization. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current src/content/posts/2015-02-24--security-notes-regex/es/index.mdx
- 725fbf15c1dd9d370eda8539b5e44a3e09316def i18n candidate(es): security-notes-regex via openrouter/openai/gpt-oss-120b:nitro
- d593e98e0720c337ba73c130ee93618e910dacd4 i18n candidate(es): security-notes-regex via openrouter/qwen/qwen3-32b:nitro
