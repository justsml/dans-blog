# Translation Judge Summary

- Slug: docker-server-setup-notes
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.883)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug docker-server-setup-notes --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-server-setup-notes --locale fr --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2015-04-06--docker-server-setup-notes/fr/index.mdx failed structural parity with score 0.948 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2015-04-06--docker-server-setup-notes/fr/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":4}. Differences: {"linkTargets":4}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 3.42
- Input tokens: 62858
- Output tokens: 195
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.032014
- Estimated cost: $0.032014

### Round 1, Batch 2
- Runtime seconds: 4.51
- Input tokens: 32157
- Output tokens: 481
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.017521
- Estimated cost: $0.017521

## Primary Judge Telemetry
- Runtime seconds: 3.31
- Input tokens: 47651
- Output tokens: 369
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.024932
- Estimated cost: $0.024932

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.88
- Input tokens: 47374
- Output tokens: 262
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.024473
- Estimated cost: $0.024473

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "# Stockez les fichiers de la base de données sur un chemin local, en dehors du conteneur" Replacement: "# Stocker les fichiers de la base de données sur un chemin local, en dehors du conteneur" Reason: Code comments should generally use the infinitive form in French for instructions. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 2de64449af579a2ab269c1b14fdbe8685e0fd7fc i18n candidate(fr): docker-server-setup-notes via deepseek/deepseek-v4-flash
- 93d1338ad7af5554398d3a1a021c9247e590a774 i18n candidate(fr): docker-server-setup-notes via openrouter/openai/gpt-oss-120b:nitro
- 437e8e005a2be12a6cf32167dbd466d84091b0ea i18n candidate(fr): docker-server-setup-notes via openrouter/qwen/qwen3-32b:nitro
- 084af1ff856c3ecff79a19e9676eb457cd3a6e2b i18n candidate(fr): docker-server-setup-notes via qwen/qwen3.6-35b-a3b
