# Translation Judge Summary

- Slug: quiz-regex-or-wreckage
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.90
- Input tokens: 25531
- Output tokens: 450
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.014115

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.88
- Input tokens: 19528
- Output tokens: 583
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011513

### Pass 2
- Runtime seconds: 3.84
- Input tokens: 19528
- Output tokens: 583
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011513

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Sonderzeichen müssen mit `\\\\` escaped werden" Replacement: "Sonderzeichen müssen mit `\\` escaped werden" Reason: The candidate used double backslashes in the explanation text, which is unnecessary and confusing in this context compared to the English original. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "escapen Sie es: `\\\\$`" Replacement: "escapen Sie es: `\\$`" Reason: The candidate used double backslashes in the explanation text, which is unnecessary and confusing in this context compared to the English original. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "Unicode‑Property‑Escapes (`\\\\p{...}`)" Replacement: "Unicode‑Property‑Escapes (`\\p{...}`)" Reason: The candidate used double backslashes in the explanation text, which is unnecessary and confusing in this context compared to the English original. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "Das Muster `\\\\p{Emoji}`" Replacement: "Das Muster `\\p{Emoji}`" Reason: The candidate used double backslashes in the explanation text, which is unnecessary and confusing in this context compared to the English original. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "Sonderzeichen müssen mit `\\\\` escaped werden" Replacement: "Sonderzeichen müssen mit `\\` escaped werden" Reason: The candidate used double backslashes in the explanation text, which is unnecessary and confusing in this context compared to the English original. Note: Applied exact replacement to selected MDX.
6. Pass 2: applied high priority suggestion. Match: "escapen Sie es: `\\\\$`" Replacement: "escapen Sie es: `\\$`" Reason: The candidate used double backslashes in the explanation text, which is unnecessary and confusing in this context compared to the English original. Note: Applied exact replacement to selected MDX.
7. Pass 2: applied high priority suggestion. Match: "Unicode‑Property‑Escapes (`\\\\p{...}`)" Replacement: "Unicode‑Property‑Escapes (`\\p{...}`)" Reason: The candidate used double backslashes in the explanation text, which is unnecessary and confusing in this context compared to the English original. Note: Applied exact replacement to selected MDX.
8. Pass 2: applied high priority suggestion. Match: "Das Muster `\\\\p{Emoji}`" Replacement: "Das Muster `\\p{Emoji}`" Reason: The candidate used double backslashes in the explanation text, which is unnecessary and confusing in this context compared to the English original. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-15--quiz-regex-or-wreckage/de/index.mdx
- a951ecf19d66509588e31373fda1ae923e364c73 i18n candidate(de): quiz-regex-or-wreckage via openrouter/openai/gpt-oss-120b:nitro
- 10205269c1ddfbdf4b7e3559f45a32f41f90ddd3 i18n candidate(de): quiz-regex-or-wreckage via openrouter/qwen/qwen3-32b:nitro
