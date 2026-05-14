# Translation Judge Summary

- Slug: into-the-breach
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug into-the-breach --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug into-the-breach --locale ja --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-13--into-the-breach/ja/index.mdx changed heading counts. H2: English has 12, translation has 13
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.69
- Input tokens: 22279
- Output tokens: 213
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011779
- Estimated cost: $0.011779

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.61
- Input tokens: 20286
- Output tokens: 216
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010791
- Estimated cost: $0.010791

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "## 実用的な基準 ## 実用的な基準" Replacement: "## 実用的な基準" Reason: The candidate accidentally duplicated the H2 heading '実用的な基準'. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 044ba354aba738dc5ccaabd177c7562349e52e60 i18n candidate(ja): into-the-breach via openrouter/deepseek/deepseek-v4-flash
- a3f0115a87fcbf359fe0c334098a7873720f8593 i18n candidate(ja): into-the-breach via openrouter/google/gemini-3-flash-preview
