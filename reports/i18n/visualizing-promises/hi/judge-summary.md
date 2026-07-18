# Translation Judge Summary

- Slug: visualizing-promises
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.880)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug visualizing-promises --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug visualizing-promises --locale hi --skip-global
103 | 
104 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
105 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
106 |   if (issues.length === 0) return;
107 | 
108 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-09-30--visualizing-promises/hi/index.mdx failed translation integrity checks:
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2018-09-30--visualizing-promises/hi/index.mdx:50 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2018-09-30--visualizing-promises/hi/index.mdx:94 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:108:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:34:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.55
- Input tokens: 7286
- Output tokens: 187
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004204
- Estimated cost: $0.004204

### Round 1, Batch 2
- Runtime seconds: 2.08
- Input tokens: 4452
- Output tokens: 178
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002760
- Estimated cost: $0.002760

## Primary Judge Telemetry
- Runtime seconds: 2.10
- Input tokens: 5912
- Output tokens: 184
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003508
- Estimated cost: $0.003508

## Candidates
- current not present
- acf142683f5f8f2af7432aaa80c49d333ac469fc i18n candidate(hi): visualizing-promises via openrouter/openai/gpt-oss-120b:nitro
- 2bce0293c76ea0050824bf3025de071eda041720 i18n candidate(hi): visualizing-promises via openrouter/qwen/qwen3-32b:nitro
- ef3bdd63e9e38c91f8fbf4be3741118ad6c7b79a i18n candidate(hi): visualizing-promises via deepseek/deepseek-v4-flash
- bf577c83be473ec66104014f61e86550664dd8ed i18n candidate(hi): visualizing-promises via qwen/qwen3.6-35b-a3b
