# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale es --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/es/index.mdx changed heading counts. H1: English has 0, translation has 15; H2: English has 10, translation has 9; H3: English has 17, translation has 14; H4: English has 11, translation has 8
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.67
- Input tokens: 37360
- Output tokens: 420
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.019940

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "# [Generar secretos fuertes](#generate-strong-secrets)" Replacement: "# [Generar secretos fuertes](#generar-secretos-fuertes)" Reason: The anchor link must match the translated heading ID for the table of contents to work. Note: Exact match not found in selected MDX.
2. Pass 1: logged high priority suggestion. Match: "# [Tokens canario](#canary-tokens)" Replacement: "# [Tokens canario](#tokens-canary)" Reason: The anchor link must match the translated heading ID for the table of contents to work. Note: Exact match not found in selected MDX.
3. Pass 1: logged high priority suggestion. Match: "# [Migrar de `.env` al llavero de macOS](#upgrade-from-env-to-macos-keychain)" Replacement: "# [Migrar de `.env` al llavero de macOS](#actualiza-de-env-a-keychain-de-macos)" Reason: The anchor link must match the translated heading ID for the table of contents to work. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/es/index.mdx
- db01637a91238f03a263c506822e559886911cf2 i18n candidate(es): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 59e05c834ccf9e2f8c7fb86b8d6bfcbb0447c609 i18n candidate(es): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
