# Translation Judge Summary

- Slug: your-foreign-keys-are-killing-performance
- Locale: es
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug your-foreign-keys-are-killing-performance --locale es --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug your-foreign-keys-are-killing-performance --locale es --skip-global
207 |     ...targetContents.matchAll(/=["']\.\/(?!\.)[^"']+\.(?:avif|gif|jpe?g|png|svg|webp)["']/g),
208 |   ];
209 | 
210 |   if (nestedAssetReferences.length === 0) return;
211 | 
212 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/es/index.mdx uses ./ asset paths inside a locale folder. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:212:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.68
- Input tokens: 15890
- Output tokens: 234
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008647

### Round 1, Batch 2
- Runtime seconds: 2.43
- Input tokens: 15772
- Output tokens: 207
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.008507

### Round 1, Batch 3
- Runtime seconds: 2.31
- Input tokens: 9899
- Output tokens: 232
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005646

## Primary Judge Telemetry
- Runtime seconds: 2.85
- Input tokens: 12934
- Output tokens: 303
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.007376

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.02
- Input tokens: 9846
- Output tokens: 423
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.006192

### Pass 2
- Runtime seconds: 1.93
- Input tokens: 9879
- Output tokens: 201
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005542

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Wyoming no va a cambiar de nombre anytime soon." Replacement: "Wyoming no va a cambiar de nombre pronto." Reason: The English phrase 'anytime soon' was left untranslated. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "en el momento de la escritura." Replacement: "en el momento de escritura." Reason: Slightly more natural phrasing for technical context. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "Wyoming no va a cambiar de nombre anytime soon." Replacement: "Wyoming no va a cambiar de nombre pronto." Reason: The English phrase 'anytime soon' was left untranslated in the candidate text. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "La base de datos no tiene mecanismo para enforcing una restricción" Replacement: "La base de datos no tiene mecanismo para aplicar una restricción" Reason: The word 'enforcing' was left in English; 'aplicar' or 'hacer cumplir' is the correct Spanish term. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/es/index.mdx
- 8999900066992d1d106b8192f5ed8395b7ef0996 i18n candidate(es): your-foreign-keys-are-killing-performance via openrouter/qwen/qwen3.6-plus
- 340963e1b7d5e953ad8ea0cbc7b47392ce5321de i18n candidate(es): your-foreign-keys-are-killing-performance via openrouter/moonshotai/kimi-k2.6
- 51752f0bd8e7acce5955bc4553e4403ab04c0e6e i18n candidate(es): your-foreign-keys-are-killing-performance via openrouter/google/gemini-3-flash-preview
- 4db3b290e9262abb6b4e05c1c63ee14c7921bcc8 i18n candidate(es): your-foreign-keys-are-killing-performance via openrouter/z-ai/glm-5.1
- 7539c6c9a5a2e6536c3a9b4393be8e6c3fbb27b4 i18n candidate(es): your-foreign-keys-are-killing-performance via openrouter/minimax/minimax-m2.7
- b1a42587d091bb88a9f0846325452039321dd0aa i18n candidate(es): your-foreign-keys-are-killing-performance via openrouter/openai/gpt-oss-120b:nitro
- 9c6a65ee8d4ff016b2922c8f401fc361bee59987 i18n candidate(es): your-foreign-keys-are-killing-performance via openrouter/qwen/qwen3-32b:nitro
