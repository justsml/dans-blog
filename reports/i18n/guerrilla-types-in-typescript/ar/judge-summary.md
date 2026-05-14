# Translation Judge Summary

- Slug: guerrilla-types-in-typescript
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug guerrilla-types-in-typescript --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug guerrilla-types-in-typescript --locale ar --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2023-09-06--guerrilla-types-in-typescript/ar/index.mdx changed heading counts. H2: English has 2, translation has 1; H3: English has 5, translation has 1; H4: English has 5, translation has 3
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.48
- Input tokens: 10223
- Output tokens: 407
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006332
- Estimated cost: $0.006332

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 5.30
- Input tokens: 10414
- Output tokens: 496
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006695
- Estimated cost: $0.006695

### Pass 2
- Runtime seconds: 2.17
- Input tokens: 10414
- Output tokens: 222
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005873
- Estimated cost: $0.005873

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "#### كائن واحد كبير #### كائن واحد كبير" Replacement: "#### كائن واحد كبير" Reason: The heading is duplicated in the candidate. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "interface Reviews { authorId: number; stars: number; } } بشكل عام، هذا النهج رائع." Replacement: "interface Reviews { authorId: number; stars: number; } ``` بشكل عام، هذا النهج رائع." Reason: The code block is missing its closing backticks and has an extra closing brace, breaking the MDX structure. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "#### كائن واحد كبير #### كائن واحد كبير" Replacement: "#### كائن واحد كبير" Reason: The heading is duplicated in the candidate. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "interface Reviews { authorId: number; stars: number; } } بشكل عام، هذا النهج رائع." Replacement: "interface Reviews { authorId: number; stars: number; } ``` بشكل عام، هذا النهج رائع." Reason: The code block is missing its closing backticks and has an extra closing brace, breaking the MDX structure. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 02b6b8898b890a833e344fcef91560ae45818f87 i18n candidate(ar): guerrilla-types-in-typescript via openrouter/deepseek/deepseek-v4-flash
- 4a5e1924aeb87b489f4b1be6eaeb6309ffbb4d35 i18n candidate(ar): guerrilla-types-in-typescript via openrouter/openai/gpt-oss-120b:nitro
