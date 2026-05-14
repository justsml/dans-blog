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
110 |     })
111 |     .filter((message): message is string => message != null);
112 | 
113 |   if (mismatches.length === 0) return;
114 | 
115 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/it/index.mdx changed heading counts. H1: English has 0, translation has 15; H2: English has 10, translation has 6; H3: English has 17, translation has 14; H4: English has 11, translation has 8
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:115:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.64
- Input tokens: 47810
- Output tokens: 272
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.024721
- Estimated cost: $0.024721

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/it/index.mdx
- dd79ece82e855faa3afac897ed09747a855b90ff i18n candidate(it): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 94efa22ba19f140d1bb4ec723313a994b06268c7 i18n candidate(it): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
- 177d7fe6f6d0f00ecd3421050c0c93ae0f7117b2 i18n candidate(it): docker-security-tips-for-self-hosting via deepseek/deepseek-v4-flash
