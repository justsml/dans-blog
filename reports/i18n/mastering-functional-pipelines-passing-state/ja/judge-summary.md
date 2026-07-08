# Translation Judge Summary

- Slug: mastering-functional-pipelines-passing-state
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.886)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug mastering-functional-pipelines-passing-state --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastering-functional-pipelines-passing-state --locale ja --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ja/index.mdx failed structural parity with score 0.935 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ja/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h4":-1,"headingSequence":9,"linkTargets":3}. Differences: {"h4":-1,"headingSequence":9,"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.84
- Input tokens: 11989
- Output tokens: 270
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006804
- Estimated cost: $0.006804

## Candidates
- current src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ja/index.mdx
- a4a2b96c84bf334de567c5c21ee895bc87711791 i18n candidate(ja): mastering-functional-pipelines-passing-state via openrouter/openai/gpt-oss-120b:nitro
- 7367f219117b2082dea98c129b9be2a74fd8adcb i18n candidate(ja): mastering-functional-pipelines-passing-state via deepseek/deepseek-v4-flash
