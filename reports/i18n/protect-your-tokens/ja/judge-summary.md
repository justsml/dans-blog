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
- Confidence: low (0.302)
- Confidence signals: 2 high and 0 medium issues; single judge
- High/medium/low issue counts: 2/0/0
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
- Runtime seconds: 7.03
- Input tokens: 7659
- Output tokens: 569
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005536
- Estimated cost: $0.005536

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.08
- Input tokens: 6130
- Output tokens: 577
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004796
- Estimated cost: $0.004796

### Pass 2
- Runtime seconds: 6.36
- Input tokens: 6106
- Output tokens: 489
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004520
- Estimated cost: $0.004520

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "** ‼️ Important:** `Secret keys` **MUST** be ignored by Git _AND_ omitted in all browser code. [_How to use dotenv_](../#-how-to-handle-secrets-safely)" Replacement: "** ‼️ 重要:** `シークレットキー` は **Git で無視し**、かつブラウザコードから**絶対に除外する必要があります**。[_dotenv の使用方法_](#-how-to-handle-secrets-safely)" Reason: The candidate left a critical warning sentence in English and used an incorrect relative path for the internal anchor link. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "Checklist: Handling Secrets Safely" Replacement: "チェックリスト：シークレットを安全に扱うために" Reason: Heading should be translated for the target audience. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "href=\"../securely-using-environment-variables-in-nodejs/\"" Replacement: "href=\"/securely-using-environment-variables-in-nodejs/\"" Reason: Internal site links to other posts should use absolute paths from root as per the original, or at least not break the routing logic. Note: Applied exact replacement to selected MDX.
4. Pass 2: logged high priority suggestion. Match: "** ‼️ Important:** `Secret keys` **MUST** be ignored by Git _AND_ omitted in all browser code. [_How to use dotenv_](#-how-to-handle-secrets-safely)" Replacement: "** ‼️ 重要:** `シークレットキー` は **Git で無視し**、かつブラウザコードから**絶対に除外する必要があります**。[_dotenv の使用方法_](#-how-to-handle-secrets-safely)" Reason: The candidate left a critical warning sentence in English. Note: The anchor link fragment should match the translated heading ID if applicable, but keeping the English fragment is safer if the ID generation isn't certain, however the prose must be Japanese. Note: Exact match not found in selected MDX.
5. Pass 2: applied high priority suggestion. Match: "### Checklist: Handling Secrets Safely" Replacement: "### チェックリスト：シークレットを安全に扱うために" Reason: Heading should be translated for the target audience. Note: Applied exact replacement to selected MDX.
6. Pass 2: logged medium priority suggestion. Match: "href=\"/securely-using-environment-variables-in-nodejs/\"" Replacement: "href=\"/securely-using-environment-variables-in-nodejs/\"" Reason: Ensuring the link remains absolute to the site root as per the English source. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx
- f52f2a4b676f394f554309e65984734be23e1e18 i18n candidate(ja): protect-your-tokens via openrouter/openai/gpt-oss-120b:nitro
- 803b157880eab551ea3346ff40f8897ac9903366 i18n candidate(ja): protect-your-tokens via openrouter/qwen/qwen3-32b:nitro
