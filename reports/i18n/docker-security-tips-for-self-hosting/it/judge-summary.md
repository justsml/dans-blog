# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: it
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale it --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale it --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/it/index.mdx changed heading counts. H1: English has 0, translation has 15; H2: English has 10, translation has 6; H3: English has 17, translation has 14; H4: English has 11, translation has 8
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.06
- Input tokens: 47776
- Output tokens: 235
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.024593

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.48
- Input tokens: 27686
- Output tokens: 651
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.015796

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "#Consenti gli IP di CloudFlare" Replacement: "# Consenti gli IP di CloudFlare" Reason: Missing space after comment hash in bash script. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "lereti domestiche" Replacement: "le reti domestiche" Reason: Typo: missing space between 'le' and 'reti'. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/it/index.mdx
- dd79ece82e855faa3afac897ed09747a855b90ff i18n candidate(it): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 94efa22ba19f140d1bb4ec723313a994b06268c7 i18n candidate(it): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
- 177d7fe6f6d0f00ecd3421050c0c93ae0f7117b2 i18n candidate(it): docker-security-tips-for-self-hosting via deepseek/deepseek-v4-flash
