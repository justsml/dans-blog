# Translation Judge Summary

- Slug: breaking-unicorns
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug breaking-unicorns --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug breaking-unicorns --locale ar --skip-global
75 |   const sourceComponents = new Set(
76 |     [...sourceContents.matchAll(/<\/?([A-Z][A-Za-z0-9_.]*)\b/g)].map((match) => match[1]),
77 |   );
78 |   for (const component of sourceComponents) {
79 |     if (!new RegExp(`</?${escapeRegExp(component)}\\b`).test(targetContents)) {
80 |       throw new Error(`Missing preserved MDX component in ${targetPath}: ${component}`);
                     ^
error: Missing preserved MDX component in /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-01--breaking-unicorns/ar/index.mdx: Insert
      at assertProtectedTokens (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:80:17)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.17
- Input tokens: 8439
- Output tokens: 285
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005075
- Estimated cost: $0.005075

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.17
- Input tokens: 8519
- Output tokens: 216
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004908
- Estimated cost: $0.004908

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "<p>هل `<أدخل اسم القسم>` في فوضى؟</p>" Replacement: "<p>هل `<اسم القسم هنا>` في فوضى؟</p>" Reason: The placeholder syntax was partially translated in a way that might break if it were code, though here it is prose, it's better to keep it clean. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- bc4575d185af514ec97cf142652df1b56f3e8309 i18n candidate(ar): breaking-unicorns via openrouter/deepseek/deepseek-v4-flash
- 6dd11e937904bba40de5f408584f261682ab7e81 i18n candidate(ar): breaking-unicorns via openrouter/openai/gpt-oss-120b:nitro
