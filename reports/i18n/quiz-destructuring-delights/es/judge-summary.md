# Translation Judge Summary

- Slug: quiz-destructuring-delights
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug quiz-destructuring-delights --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug quiz-destructuring-delights --locale es --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-12--quiz-destructuring-delights/es/index.mdx changed heading counts. H2: English has 1, translation has 0
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.62
- Input tokens: 21541
- Output tokens: 280
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.011610

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.11
- Input tokens: 16557
- Output tokens: 270
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.009088

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: 'Quiz: Delicias dedesestructuración'" Replacement: "title: 'Quiz: Delicias de la desestructuración'" Reason: Typo in the title: 'dedesestructuración' should be 'de la desestructuración'. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-12--quiz-destructuring-delights/es/index.mdx
- 913a1732bc2912be1c904925a56d92fcf3dae24d i18n candidate(es): quiz-destructuring-delights via openrouter/openai/gpt-oss-120b:nitro
- 61ebb60aba94a4608582d247d98d05ae07559b5d i18n candidate(es): quiz-destructuring-delights via openrouter/qwen/qwen3-32b:nitro
