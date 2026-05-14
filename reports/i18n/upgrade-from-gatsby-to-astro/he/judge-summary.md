# Translation Judge Summary

- Slug: upgrade-from-gatsby-to-astro
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug upgrade-from-gatsby-to-astro --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug upgrade-from-gatsby-to-astro --locale he --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/he/index.mdx changed heading counts. H2: English has 9, translation has 10
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.90
- Input tokens: 10606
- Output tokens: 304
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006215
- Estimated cost: $0.006215

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.11
- Input tokens: 9959
- Output tokens: 217
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005631
- Estimated cost: $0.005631

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "## CSS מודרני: וואו ## CSS מודרני: וואו" Replacement: "## CSS מודרני: וואו" Reason: The heading is duplicated in the candidate MDX. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- c27ef1d8046e40e77f3e1a072359900634dbe5a7 i18n candidate(he): upgrade-from-gatsby-to-astro via openrouter/deepseek/deepseek-v4-flash
- 049ab8b42292f7b5b5390ce9caa98cf27eeedab2 i18n candidate(he): upgrade-from-gatsby-to-astro via openrouter/openai/gpt-oss-120b:nitro
