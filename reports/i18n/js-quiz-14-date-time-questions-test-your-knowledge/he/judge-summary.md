# Translation Judge Summary

- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug js-quiz-14-date-time-questions-test-your-knowledge --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "js-quiz-14-date-time-questions-test-your-knowledge" --locale he --skip-global
153 | 
154 |   for (const slotName of ["hints", "explanation"] as const) {
155 |     const sourceSlots = countSlot(sourceContents, slotName);
156 |     const targetSlots = countSlot(targetContents, slotName);
157 |     if (sourceSlots !== targetSlots) {
158 |       throw new Error(
                      ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/he/index.mdx changed hints slot count from 13 to 1
      at assertQuizStructure (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:158:17)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:30:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.53
- Input tokens: 18851
- Output tokens: 511
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010958
- Estimated cost: $0.010958

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.46
- Input tokens: 19043
- Output tokens: 576
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011250
- Estimated cost: $0.011250

### Pass 2
- Runtime seconds: 2.39
- Input tokens: 18926
- Output tokens: 255
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010228
- Estimated cost: $0.010228

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: 'new Intl.DateTimeFormat(\"'}," Replacement: "{text: 'new Intl.DateTimeFormat(\\'en-US\\').format(date)'}," Reason: The candidate truncated the code options in Challenge 5, making the quiz question non-functional/incorrect. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "{text: 'date.toLocaleFormat(\"', isAnswer: true}," Replacement: "{text: 'date.toLocaleFormat(\\'en-US\\')', isAnswer: true}," Reason: The candidate truncated the code options in Challenge 5. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "{text: 'date.toLocaleString(\"'}," Replacement: "{text: 'date.toLocaleString(\\'en-GB\\', { timeZone: \\'UTC\\' })'}," Reason: The candidate truncated the code options in Challenge 5. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "{text: 'date.toLocaleDateString(\"'}," Replacement: "{text: 'date.toLocaleDateString(\\'en-US\\', { timeZone: \\'UTC\\', timeZoneName: \\'short\\' })'}," Reason: The candidate truncated the code options in Challenge 5. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "{text: 'new Intl.DateTimeFormat(\"'}," Replacement: "{text: 'new Intl.DateTimeFormat(\\'en-US\\').format(date)'}," Reason: The candidate truncated the code options in Challenge 5, making the quiz question non-functional/incorrect. Note: Applied exact replacement to selected MDX.
6. Pass 2: applied high priority suggestion. Match: "{text: 'date.toLocaleFormat(\"', isAnswer: true}," Replacement: "{text: 'date.toLocaleFormat(\\'en-US\\')', isAnswer: true}," Reason: The candidate truncated the code options in Challenge 5. Note: Applied exact replacement to selected MDX.
7. Pass 2: applied high priority suggestion. Match: "{text: 'date.toLocaleString(\"'}," Replacement: "{text: 'date.toLocaleString(\\'en-GB\\', { timeZone: \\'UTC\\' })'}," Reason: The candidate truncated the code options in Challenge 5. Note: Applied exact replacement to selected MDX.
8. Pass 2: applied high priority suggestion. Match: "{text: 'date.toLocaleDateString(\"'}," Replacement: "{text: 'date.toLocaleDateString(\\'en-US\\', { timeZone: \\'UTC\\', timeZoneName: \\'short\\' })'}," Reason: The candidate truncated the code options in Challenge 5. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 774b143bd53c350c9727a3856e993720ba21ef2c i18n candidate(he): js-quiz-14-date-time-questions-test-your-knowledge via openrouter/deepseek/deepseek-v4-flash
- 906a674b89fdc3ac62afd418997d2e88b56278c2 i18n candidate(he): js-quiz-14-date-time-questions-test-your-knowledge via openrouter/openai/gpt-oss-120b:nitro
