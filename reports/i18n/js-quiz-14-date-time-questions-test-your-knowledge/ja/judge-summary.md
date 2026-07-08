# Translation Judge Summary

- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 3
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.350)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug js-quiz-14-date-time-questions-test-your-knowledge --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "js-quiz-14-date-time-questions-test-your-knowledge" --locale ja --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/ja/index.mdx failed structural parity with score 0.991 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/ja/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"links":-1,"linkTargets":1}. Differences: {"links":-1,"linkTargets":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.03
- Input tokens: 23593
- Output tokens: 502
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.013303
- Estimated cost: $0.013303

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 5.04
- Input tokens: 18589
- Output tokens: 670
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011305
- Estimated cost: $0.011305

### Pass 2
- Runtime seconds: 6.99
- Input tokens: 18661
- Output tokens: 1285
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.013185
- Estimated cost: $0.013185

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "The [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) メソッドは" Replacement: "[`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) メソッドは" Reason: Remove leftover English 'The' at the start of the sentence. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) メソッドは" Replacement: "[`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) メソッドは" Reason: Remove leftover English 'The' at the start of the sentence. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "The month argument is zero-based, with a range of 0-11 (using western calendars.)" Replacement: "月の引数は 0 から始まり、範囲は 0-11 です（西暦カレンダーを使用）。" Reason: Translate leftover English sentence in Challenge 12 explanation. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) メソッドは" Replacement: "[`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) メソッドは" Reason: Remove leftover English 'The' at the start of the sentence in Challenge 12. Note: Applied exact replacement to selected MDX.
5. Pass 2: logged high priority suggestion. Match: "Here we see the month and year is adjusted to February 2021, because `setMonth(13)` is 2 more than 11 (December)." Replacement: "ここでは、`setMonth(13)` が 11（12月）より 2 多いため、月と年が 2021年2月に調整されることがわかります。" Reason: Translate leftover English sentence in Challenge 12 explanation. Note: Exact match not found in selected MDX.
6. Pass 2: logged high priority suggestion. Match: "Numbers outside the range of 0-11 will cause the year to over- or under-flow. For example, `setMonth(13)` will adjust the year to 2021 (in February because 13 is 2 more than 11)." Replacement: "0〜11 の範囲外の数値は、年のオーバーフローまたはアンダーフローを引き起こします。例えば、`setMonth(13)` は年を 2021年に調整します（13 は 11 より 2 多いため、2月になります）。" Reason: Translate leftover English hint in Challenge 12. Note: Exact match not found in selected MDX.
7. Pass 3: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/ja/index.mdx
- a92e3ccbbd78286bf93bc6f75925ad2df9c00c83 i18n candidate(ja): js-quiz-14-date-time-questions-test-your-knowledge via openrouter/openai/gpt-oss-120b:nitro
- 49ba99b4935485fc80fe5c246e0204c8e4a05f89 i18n candidate(ja): js-quiz-14-date-time-questions-test-your-knowledge via openrouter/openai/gpt-oss-120b:nitro
