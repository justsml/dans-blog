# Translation Judge Summary

- Slug: docker-server-setup-notes
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.350)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug docker-server-setup-notes --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-server-setup-notes --locale hi --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2015-04-06--docker-server-setup-notes/hi/index.mdx failed structural parity with score 0.874 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2015-04-06--docker-server-setup-notes/hi/index.mdx: Headings changed or moved. Blockquote count changed. Code fence count or language order changed. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h1":3,"h4":-2,"blockquotes":-1,"codeFences":1,"headingSequence":3,"codeFenceLanguages":3,"linkTargets":4}. Differences: {"h1":3,"h4":-2,"blockquotes":-1,"codeFences":1,"headingSequence":3,"codeFenceLanguages":3,"linkTargets":4}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 3.80
- Input tokens: 62852
- Output tokens: 203
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.032035
- Estimated cost: $0.032035

### Round 1, Batch 2
- Runtime seconds: 3.94
- Input tokens: 32066
- Output tokens: 528
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.017617
- Estimated cost: $0.017617

## Primary Judge Telemetry
- Runtime seconds: 4.30
- Input tokens: 47384
- Output tokens: 586
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.025450
- Estimated cost: $0.025450

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current not present
- 3edbc2e3500d29eaf8e5f7ae75bc81d9b606eab5 i18n candidate(hi): docker-server-setup-notes via deepseek/deepseek-v4-flash
- b36809d57df17a86f4cdecd3b684e27f51d578c9 i18n candidate(hi): docker-server-setup-notes via qwen/qwen3.6-35b-a3b
- c81e87cb759bb6221a53ec1c0e2eb326cf213ac7 i18n candidate(hi): docker-server-setup-notes via openrouter/qwen/qwen3-32b:nitro
- 7f5ac649bce5c56f58cd9165b707302190620e54 i18n candidate(hi): docker-server-setup-notes via openrouter/openai/gpt-oss-120b:nitro
