# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: de
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
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale de --skip-global
165 |   const targetLength = getComparablePostLength(targetContents);
166 |   const { minimumRatio, maximumRatio, label } = getLengthRatioBounds(targetPath);
167 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
168 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
169 |   if (targetLength < minimumLength || targetLength > maximumLength) {
170 |     throw new Error(
                    ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx changed comparable body length from 19229 chars in English to 13142 chars. Expected 13460-31728 chars (German range: 70%-165% of English).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:170:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.37
- Input tokens: 39373
- Output tokens: 472
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.021102
- Estimated cost: $0.021102

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 7.10
- Input tokens: 28554
- Output tokens: 949
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.017124
- Estimated cost: $0.017124

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "[Von `.env` auf MacOS Keychain aufrüsten](#upgrade-from-env-to-macos-keychain)" Replacement: "[Von `.env` auf MacOS Keychain aufrüsten](#upgrade-from-env-to-macos-keychain)" Reason: The link fragment in the TOC must match the generated ID from the heading 'Upgrade von .env zum MacOS Keychain', which would be #upgrade-von-env-zum-macos-keychain. Note: Exact match and replacement are identical; no MDX change needed.
2. Pass 1: applied high priority suggestion. Match: "[Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) und [Jan Schaumann](https://www.netmeister.org/</cite>" Replacement: "[Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) und [Jan Schaumann](https://www.netmeister.org/)</cite>" Reason: Broken HTML/Markdown syntax: missing closing parenthesis for the URL. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx
- 5f7fcc6153c55cf63abf36594478c66758e76603 i18n candidate(de): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 1f4c701d50299fa90b814367ee24b3abff368161 i18n candidate(de): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
