# Translation Judge Summary

- Slug: llm-evals-are-broken
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug llm-evals-are-broken --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug llm-evals-are-broken --locale he --skip-global
78 | 
79 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
80 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
81 |   if (issues.length === 0) return;
82 | 
83 |   throw new Error(
                 ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-06--llm-evals-are-broken/he/index.mdx failed translation integrity checks:
- [high] html-unclosed-tag: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-06--llm-evals-are-broken/he/index.mdx:144 opens <number> without a closing tag.
- [high] html-unclosed-tag: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-06--llm-evals-are-broken/he/index.mdx:144 opens <one> without a closing tag.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:83:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.08
- Input tokens: 13217
- Output tokens: 345
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007644
- Estimated cost: $0.007644

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.99
- Input tokens: 12021
- Output tokens: 293
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006889
- Estimated cost: $0.006889

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "החדר מתרועע" Replacement: "החדר נהיה רועש" Reason: 'מתרועע' means socializing/mingling, which is a mistranslation of 'the room gets loud' (meaning complaints increase). Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "הלוצינציות" Replacement: "הזיות" Reason: Consistency: the text uses both 'הזיה' and 'הלוצינציות'. 'הזיות' is the standard Hebrew term for AI hallucinations. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "בסיס קו" Replacement: "קו בסיס" Reason: 'Baseline' should be translated as 'קו בסיס', not 'בסיס קו'. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-06--llm-evals-are-broken/he/index.mdx
- 23f247bd75256e19461bba38dc223183c01ae830 i18n candidate(he): llm-evals-are-broken via openrouter/openai/gpt-oss-120b:nitro
