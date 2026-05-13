# Translation Judge Summary

- Slug: breaking-unicorns
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug breaking-unicorns --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug breaking-unicorns --locale fr --skip-global
73 |   const sourceComponents = new Set(
74 |     [...sourceContents.matchAll(/<\/?([A-Z][A-Za-z0-9_.]*)\b/g)].map((match) => match[1]),
75 |   );
76 |   for (const component of sourceComponents) {
77 |     if (!new RegExp(`</?${escapeRegExp(component)}\\b`).test(targetContents)) {
78 |       throw new Error(`Missing preserved MDX component in ${targetPath}: ${component}`);
                     ^
error: Missing preserved MDX component in /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-01--breaking-unicorns/fr/index.mdx: Insert
      at assertProtectedTokens (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:78:17)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.03
- Input tokens: 10449
- Output tokens: 153
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005684

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.72
- Input tokens: 8181
- Output tokens: 343
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005119

### Pass 2
- Runtime seconds: 2.27
- Input tokens: 8299
- Output tokens: 242
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004875

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "un temps pretentieux" Replacement: "un temps prétentieux" Reason: Missing accent on 'prétentieux'. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied medium priority suggestion. Match: "Des paysans plus rapides !" Replacement: "Plus vite, manants !" Reason: The translation 'Des paysans plus rapides' is too literal. 'Plus vite, manants !' better captures the satirical, condescending tone of 'Faster peasants!' in a corporate context. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "Montez le niveau, vous fumiers." Replacement: "Montez le niveau, bande d'amateurs." Reason: While 'fumiers' is punchy, 'amateurs' is closer to the source 'amateurs' and fits the corporate satire of the book 'What Got You Here Won't Get You There' better. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-09-01--breaking-unicorns/fr/index.mdx
- ba1896de90acdef66233bc857897186c5cbecf29 i18n candidate(fr): breaking-unicorns via openrouter/openai/gpt-oss-120b:nitro
- 312a261a0c50db806d751c2639aad7b2014e8353 i18n candidate(fr): breaking-unicorns via openrouter/qwen/qwen3-32b:nitro
