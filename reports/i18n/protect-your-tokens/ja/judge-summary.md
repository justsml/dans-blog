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
- Confidence: high (0.855)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug protect-your-tokens --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug protect-your-tokens --locale ja --skip-global
103 | 
104 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
105 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
106 |   if (issues.length === 0) return;
107 | 
108 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx failed translation integrity checks:
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx:22 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx:24 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:108:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:34:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.02
- Input tokens: 7574
- Output tokens: 461
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005170
- Estimated cost: $0.005170

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.65
- Input tokens: 6282
- Output tokens: 246
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003879
- Estimated cost: $0.003879

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: 'トークン、APIキー、シークレットの保護'" Reason: The frontmatter title is empty in this candidate but should be translated. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: '公開？非公開？何？'" Reason: The frontmatter subTitle is empty in this candidate but should be translated. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "href=\"/securely-using-environment-variables-in-nodejs/\"" Replacement: "href=\"../securely-using-environment-variables-in-nodejs/\"" Reason: Internal links in localized MDX must use relative paths (../) to account for the extra folder depth. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied medium priority suggestion. Match: "[dotenvの使用方法](#-how-to-handle-secrets-safely)" Replacement: "[dotenvの使用方法](#チェックリスト-シークレットの安全な取り扱い)" Reason: The anchor link should point to the localized heading slug. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx
- f52f2a4b676f394f554309e65984734be23e1e18 i18n candidate(ja): protect-your-tokens via openrouter/openai/gpt-oss-120b:nitro
- 803b157880eab551ea3346ff40f8897ac9903366 i18n candidate(ja): protect-your-tokens via openrouter/qwen/qwen3-32b:nitro
