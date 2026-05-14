# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale he --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/he/index.mdx changed heading counts. H1: English has 0, translation has 12; H3: English has 17, translation has 16; H4: English has 11, translation has 9
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.63
- Input tokens: 31765
- Output tokens: 319
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016840
- Estimated cost: $0.016840

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current not present
- 76a33a1d18151ee3f83bc159317f2454866123bf i18n candidate(he): docker-security-tips-for-self-hosting via openrouter/deepseek/deepseek-v4-flash
- ac5fac46942c8ff47f9068e7ccddd922768a8954 i18n candidate(he): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
