# Translation Judge Summary

- Slug: quiz-master-modern-html5
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-master-modern-html5 --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-master-modern-html5" --locale ru --skip-global
110 |     })
111 |     .filter((message): message is string => message != null);
112 | 
113 |   if (mismatches.length === 0) return;
114 | 
115 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-01--quiz-master-modern-html5/ru/index.mdx changed heading counts. H2: English has 1, translation has 0; H3: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:115:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.17
- Input tokens: 13587
- Output tokens: 180
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007333
- Estimated cost: $0.007333

## Candidates
- current src/content/posts/2024-11-01--quiz-master-modern-html5/ru/index.mdx
- 09738d6c4f69089bf8f0050f0628bd036fcfc76e i18n candidate(ru): quiz-master-modern-html5 via openrouter/qwen/qwen3-32b:nitro
