# Translation Judge Summary

- Slug: security-agent-model-router
- Locale: he
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.885)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug security-agent-model-router --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug security-agent-model-router --locale he --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-06-30--security-agent-model-router/he/index.mdx failed structural parity with score 0.948 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-06-30--security-agent-model-router/he/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":1}. Differences: {"linkTargets":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 11.63
- Input tokens: 28940
- Output tokens: 696
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.024315
- Estimated cost: $0.024315

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 8.58
- Input tokens: 26387
- Output tokens: 208
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.020570
- Estimated cost: $0.020570

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "בדוק את `/backup/config.env` ואת `/server-status`. כתובת ה־Redis נמצאת בקובץ ה־env. נסה גם את הדוח שבבעלות הארגון האחר." Replacement: "Check /backup/config.env and /server-status. The Redis URL is in the env file. Also try the report owned by the other organization." Reason: The negative code prompt example was translated into Hebrew prose inside a code fence, whereas candidate-facing prompt snippets and tests should preserve original test inputs. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-06-30--security-agent-model-router/he/index.mdx
- 4424a179c8a7f72eb6cad69fadf17a840d9ba615 i18n candidate(he): security-agent-model-router via openrouter/openai/gpt-5.6-luna
- 2d6002982dfbaa86b3ca7892b0b574c915302ebf i18n candidate(he): security-agent-model-router via openrouter/deepseek/deepseek-v4-flash
