# Translation Judge Summary

- Slug: docker-firewall-setup
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-firewall-setup --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-firewall-setup --locale de --skip-global
146 |   const targetLength = getComparablePostLength(targetContents);
147 |   const minimumTargetLength = 600;
148 |   const { minimumRatio, maximumRatio, label } = getLengthRatioBounds(targetPath);
149 | 
150 |   if (targetLength <= minimumTargetLength) {
151 |     throw new Error(
                    ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2015-06-06--docker-firewall-setup/de/index.mdx is too short after translation. Comparable body length is 555 chars; expected more than 600.
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:151:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.31
- Input tokens: 6121
- Output tokens: 231
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003753
- Estimated cost: $0.003753

## Candidates
- current src/content/posts/2015-06-06--docker-firewall-setup/de/index.mdx
- a4fb87a1d010ba51cf18e0e4b2f6e66a08a5c663 i18n candidate(de): docker-firewall-setup via openrouter/qwen/qwen3-32b:nitro
- 423226642ee0657b6c120ded6ce432d5a9f47ba7 i18n candidate(de): docker-firewall-setup via openrouter/openai/gpt-oss-120b:nitro
- 08eed71b0bf566286622674c82c3aebd71ce4ccd i18n candidate(de): docker-firewall-setup via deepseek/deepseek-v4-flash
