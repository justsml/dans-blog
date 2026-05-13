# Translation Judge Summary

- Slug: breaking-unicorns
- Locale: it
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug breaking-unicorns --locale it --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug breaking-unicorns --locale it --skip-global
73 |   const sourceComponents = new Set(
74 |     [...sourceContents.matchAll(/<\/?([A-Z][A-Za-z0-9_.]*)\b/g)].map((match) => match[1]),
75 |   );
76 |   for (const component of sourceComponents) {
77 |     if (!new RegExp(`</?${escapeRegExp(component)}\\b`).test(targetContents)) {
78 |       throw new Error(`Missing preserved MDX component in ${targetPath}: ${component}`);
                     ^
error: Missing preserved MDX component in /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-01--breaking-unicorns/it/index.mdx: Insert
      at assertProtectedTokens (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:78:17)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.09
- Input tokens: 13146
- Output tokens: 277
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007404

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.52
- Input tokens: 8487
- Output tokens: 428
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005528

### Pass 2
- Runtime seconds: 3.25
- Input tokens: 8551
- Output tokens: 446
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005613

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Alza la Sfida 💪" Replacement: "Alzare l'asticella 💪" Reason: 'Alzare l'asticella' is the standard Italian idiom for 'Raising the bar', matching the context of corporate performance. Note: Applied exact replacement to selected MDX.
2. Pass 1: logged medium priority suggestion. Match: "Alza la posta" Replacement: "Alzare l'asticella" Reason: Consistency with the section heading and the specific 'Raising the Bar' satire theme. Note: Exact match not found in selected MDX.
3. Pass 2: applied high priority suggestion. Match: "Alza la Sfida 💪" Replacement: "Alzare l'asticella 💪" Reason: 'Alzare l'asticella' is the standard Italian idiom for 'Raising the bar', matching the context of corporate performance. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "alzare la posta" Replacement: "alzare l'asticella" Reason: Consistency with the section heading and the specific 'Raising the Bar' satire theme. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "Alza la Posta" Replacement: "Alzare l'asticella" Reason: Consistency with the section heading and the specific 'Raising the Bar' satire theme. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-09-01--breaking-unicorns/it/index.mdx
- fcef44ff038431676950fee06e809f5c9edb2234 i18n candidate(it): breaking-unicorns via openrouter/openai/gpt-oss-120b:nitro
- 2b671ba952f8561d60c6066131dee002bba121df i18n candidate(it): breaking-unicorns via openrouter/qwen/qwen3-32b:nitro
- 47fc30b83dbaedb41bba94c3522092057230c954 i18n candidate(it): breaking-unicorns via deepseek/deepseek-v4-flash
