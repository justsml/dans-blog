# Translation Judge Summary

- Slug: breaking-unicorns
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug breaking-unicorns --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug breaking-unicorns --locale he --skip-global
75 |   const sourceComponents = new Set(
76 |     [...sourceContents.matchAll(/<\/?([A-Z][A-Za-z0-9_.]*)\b/g)].map((match) => match[1]),
77 |   );
78 |   for (const component of sourceComponents) {
79 |     if (!new RegExp(`</?${escapeRegExp(component)}\\b`).test(targetContents)) {
80 |       throw new Error(`Missing preserved MDX component in ${targetPath}: ${component}`);
                     ^
error: Missing preserved MDX component in /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-01--breaking-unicorns/he/index.mdx: Insert
      at assertProtectedTokens (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:80:17)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.85
- Input tokens: 8585
- Output tokens: 285
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005148
- Estimated cost: $0.005148

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.00
- Input tokens: 8609
- Output tokens: 157
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004776
- Estimated cost: $0.004776

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "כמו _נגמרו הזין._" Replacement: "כמו _נגמרו הזינים לתת._" Reason: The original 'no fucks left' is an idiom. The candidate's literal translation is grammatically incorrect in Hebrew; the suggested replacement is a more natural (though still vulgar) slang equivalent. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "האם אתה מופרע?" Replacement: "האם אתה משבש?" Reason: 'Disrupted' in a startup context refers to 'Disruption' (innovation), not being mentally 'disturbed' (מופרע). Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- e37122f3b01b52c45d74077380570bd6061faa87 i18n candidate(he): breaking-unicorns via openrouter/deepseek/deepseek-v4-flash
- f06baaa1b2339df555bcc4b26d9ffe9375a93015 i18n candidate(he): breaking-unicorns via openrouter/openai/gpt-oss-120b:nitro
