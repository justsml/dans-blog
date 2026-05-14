# Translation Judge Summary

- Slug: quiz-css-core-fundamentals
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-css-core-fundamentals --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug quiz-css-core-fundamentals --locale ru --skip-global
110 |     })
111 |     .filter((message): message is string => message != null);
112 | 
113 |   if (mismatches.length === 0) return;
114 | 
115 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-08--quiz-css-core-fundamentals/ru/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:115:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.62
- Input tokens: 14413
- Output tokens: 226
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007884
- Estimated cost: $0.007884

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.14
- Input tokens: 14481
- Output tokens: 231
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007933
- Estimated cost: $0.007933

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "options={[ ]}" Replacement: "options={[ { text: 'a {}' }, { text: 'b.b {}' }, { text: 'c > > d {}', isAnswer: true }, { text: '#d {}' }, ]}" Reason: The current translation is missing the options for Challenge index 5, making the question unanswerable. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-08--quiz-css-core-fundamentals/ru/index.mdx
- e3d52db890c2e836ff875359ce6dc81fc9677fdb i18n candidate(ru): quiz-css-core-fundamentals via openrouter/qwen/qwen3-32b:nitro
