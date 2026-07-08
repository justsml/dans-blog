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
- Confidence: high (0.873)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug breaking-unicorns --locale it --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug breaking-unicorns --locale it --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-01--breaking-unicorns/it/index.mdx failed structural parity with score 0.991 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-01--breaking-unicorns/it/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":1}. Differences: {"linkTargets":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.72
- Input tokens: 13991
- Output tokens: 252
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007751
- Estimated cost: $0.007751

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.11
- Input tokens: 8883
- Output tokens: 683
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006490
- Estimated cost: $0.006490

### Pass 2
- Runtime seconds: 2.44
- Input tokens: 9241
- Output tokens: 259
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005398
- Estimated cost: $0.005398

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: \"Rompere gli unicorni\"" Reason: The subTitle was left empty in this candidate but is present in the English source and other candidates. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: \"Rompere gli unicorni\"" Reason: The subTitle was left empty in this candidate but is present in the English source and other candidates. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "<li>[Teatro d'Impresa 🎭](#enterprise-theater-)</li>" Replacement: "<li>[Teatro d'Impresa 🎭](#teatro-dimpresa-)</li>" Reason: Same-page heading links must resolve to the localized heading IDs generated from translated heading text. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "<li>[Alza la Sfida 💪](#raising-the-bar-)</li>" Replacement: "<li>[Alza la Sfida 💪](#alza-la-sfida-)</li>" Reason: Same-page heading links must resolve to the localized heading IDs generated from translated heading text. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "<li>[Sei Disruptivo? 🚀](#are-you-disrupted-)</li>" Replacement: "<li>[Sei Disruptivo? 🚀](#sei-disruptivo-)</li>" Reason: Same-page heading links must resolve to the localized heading IDs generated from translated heading text. Note: Applied exact replacement to selected MDX.
6. Pass 2: applied high priority suggestion. Match: "<li>[Ucciso dal Book Club 📚](#book-clubbed-to-death-)</li>" Replacement: "<li>[Ucciso dal Book Club 📚](#ucciso-dal-book-club-)</li>" Reason: Same-page heading links must resolve to the localized heading IDs generated from translated heading text. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-09-01--breaking-unicorns/it/index.mdx
- fcef44ff038431676950fee06e809f5c9edb2234 i18n candidate(it): breaking-unicorns via openrouter/openai/gpt-oss-120b:nitro
- 2b671ba952f8561d60c6066131dee002bba121df i18n candidate(it): breaking-unicorns via openrouter/qwen/qwen3-32b:nitro
- 47fc30b83dbaedb41bba94c3522092057230c954 i18n candidate(it): breaking-unicorns via deepseek/deepseek-v4-flash
