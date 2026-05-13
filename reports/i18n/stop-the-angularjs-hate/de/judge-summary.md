# Translation Judge Summary

- Slug: stop-the-angularjs-hate
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug stop-the-angularjs-hate --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug stop-the-angularjs-hate --locale de --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2015-03-10--stop-the-angularjs-hate/de/index.mdx changed heading counts. H3: English has 7, translation has 6
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.95
- Input tokens: 7445
- Output tokens: 284
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004574

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.82
- Input tokens: 5939
- Output tokens: 374
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004091

### Pass 2
- Runtime seconds: 2.21
- Input tokens: 5937
- Output tokens: 230
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003658

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Justread this section" Replacement: "Lesen Sie einfach diesen Abschnitt" Reason: The candidate failed to translate 'Just read this section' and even merged the words into 'Justread'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "###Pure-er JS Ansatz" Replacement: "### Reinerer JS-Ansatz" Reason: Missing space after heading marker and awkward translation of 'Pure-er'. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "Justread this section" Replacement: "Lesen Sie einfach diesen Abschnitt" Reason: The candidate failed to translate 'Just read this section' and even merged the words into 'Justread'. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "###Pure-er JS Ansatz" Replacement: "### Reinerer JS-Ansatz" Reason: Missing space after heading marker and awkward translation of 'Pure-er'. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-03-10--stop-the-angularjs-hate/de/index.mdx
- 257009bd553849a3766093053a950b90ddd950e0 i18n candidate(de): stop-the-angularjs-hate via openrouter/openai/gpt-oss-120b:nitro
- 3f141512f193f0bd9f580231a15de8996863dbf3 i18n candidate(de): stop-the-angularjs-hate via openrouter/qwen/qwen3-32b:nitro
