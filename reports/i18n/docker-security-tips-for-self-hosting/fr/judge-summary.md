# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale fr --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/fr/index.mdx changed heading counts. H1: English has 0, translation has 15; H2: English has 10, translation has 9; H3: English has 17, translation has 14; H4: English has 11, translation has 8
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.85
- Input tokens: 39179
- Output tokens: 376
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.020717

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.28
- Input tokens: 28474
- Output tokens: 437
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.015548

### Pass 2
- Runtime seconds: 4.23
- Input tokens: 28408
- Output tokens: 572
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.015920

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Il existede nombreuses façons" Replacement: "Il existe de nombreuses façons" Reason: Typo: missing space between 'existe' and 'de'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "- [Générer des secrets forts](#generate-strong-secrets) - [Jetons Canary](#canary-tokens) - [Passer de `.env` au trousseau de clés macOS](#upgrade-from-env-to-macos-keychain)" Replacement: "- [Générer des secrets forts](#générer-des-secrets-forts) - [Jetons Canary](#jetons-canary) - [Passer de `.env` au trousseau de clés macOS](#passer-de-env-à-la-trousseau-macos)" Reason: The internal links in the list do not match the translated heading IDs. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "- [Générer des secrets forts](#generate-strong-secrets) - [Jetons Canary](#canary-tokens) - [Passer de `.env` au trousseau de clés macOS](#upgrade-from-env-to-macos-keychain)" Replacement: "- [Générer des secrets forts](#générer-des-secrets-forts) - [Jetons Canary](#jetons-canary) - [Passer de `.env` au trousseau de clés macOS](#passer-de-env-à-la-trousseau-macos)" Reason: The internal links in the list do not match the translated heading IDs. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "Passer de `.env` au trousseau de clés macOS" Replacement: "Passer de `.env` au trousseau macOS" Reason: Consistency with the heading title used later in the document. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/fr/index.mdx
- 233bfd5ceb3d3a6fd80ef520ddaf75c31234a658 i18n candidate(fr): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- a5c19554d9a8b292f8a7129274bcd308745bab7b i18n candidate(fr): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
