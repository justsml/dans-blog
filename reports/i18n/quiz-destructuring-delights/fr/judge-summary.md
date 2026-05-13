# Translation Judge Summary

- Slug: quiz-destructuring-delights
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-destructuring-delights --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug quiz-destructuring-delights --locale fr --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-12--quiz-destructuring-delights/fr/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.48
- Input tokens: 21984
- Output tokens: 212
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011628

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.28
- Input tokens: 16716
- Output tokens: 231
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009051

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Que affichera ce code ?" Replacement: "Qu'affichera ce code ?" Reason: Grammar: 'Que' should be elided to 'Qu'' before a vowel. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-12--quiz-destructuring-delights/fr/index.mdx
- fef02f6956ceeb63441691efd662a8602ca32747 i18n candidate(fr): quiz-destructuring-delights via openrouter/openai/gpt-oss-120b:nitro
- 6fc4193e99eda7b7adb26287585eb3da8e379963 i18n candidate(fr): quiz-destructuring-delights via openrouter/qwen/qwen3-32b:nitro
