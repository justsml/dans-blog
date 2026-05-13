# Translation Judge Summary

- Slug: upgrade-from-gatsby-to-astro
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug upgrade-from-gatsby-to-astro --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug upgrade-from-gatsby-to-astro --locale es --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/es/index.mdx changed heading counts. H2: English has 9, translation has 10
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.88
- Input tokens: 14962
- Output tokens: 390
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008651

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/es/index.mdx
- 75a32c09fcae75acc48fda832fcbef909041b150 i18n candidate(es): upgrade-from-gatsby-to-astro via openrouter/qwen/qwen3.6-plus
- 398f08659e229b7d56e615b4e93093189e034e78 i18n candidate(es): upgrade-from-gatsby-to-astro via openrouter/openai/gpt-oss-120b:nitro
- 1c8b4b40ae0d373a2fe30ea485478b91d37a40ef i18n candidate(es): upgrade-from-gatsby-to-astro via openrouter/qwen/qwen3-32b:nitro
