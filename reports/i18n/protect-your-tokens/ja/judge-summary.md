# Translation Judge Summary

- Slug: protect-your-tokens
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.311)
- Confidence signals: 3 high and 0 medium issues; single judge
- High/medium/low issue counts: 3/0/0
- Validation error: Command failed: bun run i18n:validate --slug protect-your-tokens --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug protect-your-tokens --locale ja --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx failed structural parity with score 0.983 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":2}. Differences: {"linkTargets":2}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.17
- Input tokens: 7559
- Output tokens: 368
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004883
- Estimated cost: $0.004883

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.96
- Input tokens: 6057
- Output tokens: 505
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004543
- Estimated cost: $0.004543

### Pass 2
- Runtime seconds: 3.97
- Input tokens: 6031
- Output tokens: 520
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004575
- Estimated cost: $0.004575

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[_How to use dotenv_](../#-how-to-handle-secrets-safely)" Replacement: "[_How to use dotenv_](#checklist-handling-secrets-safely)" Reason: The link fragment #-how-to-handle-secrets-safely does not exist in the translated document. It should point to the translated heading slug #checklist-handling-secrets-safely. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "[`Secret keys`](#-secret-keys)" Replacement: "[`Secret keys`](#secret-keys)" Reason: The heading ID for '## 🔒 `Secret keys`' is #secret-keys. The extra dash in the fragment prevents the link from working. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "[`Non-secret keys`](#-non-secret-keys)" Replacement: "[`Non-secret keys`](#non-secret-keys)" Reason: The heading ID for '## 🌍 `Non-secret keys`' is #non-secret-keys. The extra dash in the fragment prevents the link from working. Note: Applied exact replacement to selected MDX.
4. Pass 2: logged high priority suggestion. Match: "[_How to use dotenv_](#checklist-handling-secrets-safely)" Replacement: "[_dotenv の使い方_](#checklist-handling-secrets-safely)" Reason: The link text should be translated for the reader, while the fragment correctly points to the localized heading ID. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx
- f52f2a4b676f394f554309e65984734be23e1e18 i18n candidate(ja): protect-your-tokens via openrouter/openai/gpt-oss-120b:nitro
- 803b157880eab551ea3346ff40f8897ac9903366 i18n candidate(ja): protect-your-tokens via openrouter/qwen/qwen3-32b:nitro
