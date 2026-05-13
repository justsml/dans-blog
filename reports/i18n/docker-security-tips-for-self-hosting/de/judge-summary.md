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
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale de --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx changed heading counts. H1: English has 0, translation has 19; H2: English has 10, translation has 5; H3: English has 17, translation has 12; H4: English has 11, translation has 7
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.46
- Input tokens: 38383
- Output tokens: 296
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.020080

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.45
- Input tokens: 28021
- Output tokens: 502
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.015517

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "<pclassName='inset'>" Replacement: "<p className='inset'>" Reason: Missing space in JSX tag will cause a build error. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "# CloudFlare‑IPs zulassen" Replacement: "```bash # CloudFlare‑IPs zulassen" Reason: Broken code block fence in the CloudFlare hardening section. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx
- 5f7fcc6153c55cf63abf36594478c66758e76603 i18n candidate(de): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 1f4c701d50299fa90b814367ee24b3abff368161 i18n candidate(de): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
