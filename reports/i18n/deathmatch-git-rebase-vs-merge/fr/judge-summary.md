# Translation Judge Summary

- Slug: deathmatch-git-rebase-vs-merge
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug deathmatch-git-rebase-vs-merge --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug deathmatch-git-rebase-vs-merge --locale fr --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/fr/index.mdx changed heading counts. H4: English has 5, translation has 4
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.64
- Input tokens: 10296
- Output tokens: 289
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006015

## Judge Suggestions
1. Pass 1: logged medium priority suggestion. Match: "maîtriser le git" Replacement: "maîtriser le git-fu" Reason: The original text uses 'git fu', which is a play on 'kung fu'. 'Maîtriser le git' loses the flavor of the original. Note: Exact match not found in selected MDX.
2. Pass 1: logged medium priority suggestion. Match: "conflits irrelevants" Replacement: "conflits non pertinents" Reason: 'Irrelevant' is an anglicism in this context; 'non pertinent' is the correct French term. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/fr/index.mdx
- da7e4e83b40bc26754388e9da9d7dc7123d9ad88 i18n candidate(fr): deathmatch-git-rebase-vs-merge via openrouter/openai/gpt-oss-120b:nitro
- 2a8ebe9e7c5f28a118b8a255e84a135990e97147 i18n candidate(fr): deathmatch-git-rebase-vs-merge via openrouter/qwen/qwen3-32b:nitro
