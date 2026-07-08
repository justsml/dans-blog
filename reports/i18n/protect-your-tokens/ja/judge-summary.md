# Translation Judge Summary

- Slug: protect-your-tokens
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 3
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.327)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0
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
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx:21 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx:23 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:108:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:34:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.82
- Input tokens: 9245
- Output tokens: 502
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006129
- Estimated cost: $0.006129

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.12
- Input tokens: 6274
- Output tokens: 357
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004208
- Estimated cost: $0.004208

### Pass 2
- Runtime seconds: 2.92
- Input tokens: 6027
- Output tokens: 347
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004054
- Estimated cost: $0.004054

### Pass 3
- Runtime seconds: 3.50
- Input tokens: 5996
- Output tokens: 342
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004024
- Estimated cost: $0.004024

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "href=\"/securely-using-environment-variables-in-nodejs/\"" Replacement: "href=\"../securely-using-environment-variables-in-nodejs/\"" Reason: Locale files are one level deeper than English files; internal links must use ../ to resolve correctly. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Using dotenv securely in NodeJS" Replacement: "NodeJSでdotenvを安全に使用する方法" Reason: The link text in the related article block should be translated for better user experience. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "[_dotenv の使い方_](#-how-to-handle-secrets-safely)" Replacement: "[_dotenv の使い方_](#checklist-handling-secrets-safely)" Reason: The anchor link must match the generated ID of the translated heading 'Checklist: Handling Secrets Safely' (which remains in English in the translation but the fragment was stale). Note: Applied exact replacement to selected MDX.
4. Pass 3: applied high priority suggestion. Match: "[_dotenv の使い方_](#-how-to-handle-secrets-safely)" Replacement: "[_dotenv の使い方_](#checklist-handling-secrets-safely)" Reason: The anchor link must match the generated ID of the translated heading. In the Japanese MDX, the heading is 'Checklist: Handling Secrets Safely', so the fragment must be #checklist-handling-secrets-safely. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-27--protect-your-tokens/ja/index.mdx
- f52f2a4b676f394f554309e65984734be23e1e18 i18n candidate(ja): protect-your-tokens via openrouter/openai/gpt-oss-120b:nitro
- 803b157880eab551ea3346ff40f8897ac9903366 i18n candidate(ja): protect-your-tokens via openrouter/qwen/qwen3-32b:nitro
- 3a7109d7e996560f99bc88d29f21b71c1e99a71c i18n candidate(ja): protect-your-tokens via openrouter/openai/gpt-oss-120b:nitro
