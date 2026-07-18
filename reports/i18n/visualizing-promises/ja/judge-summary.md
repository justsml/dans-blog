# Translation Judge Summary

- Slug: visualizing-promises
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.327)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0
- Validation error: Command failed: bun run i18n:validate --slug visualizing-promises --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug visualizing-promises --locale ja --skip-global
103 | 
104 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
105 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
106 |   if (issues.length === 0) return;
107 | 
108 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-09-30--visualizing-promises/ja/index.mdx failed translation integrity checks:
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2018-09-30--visualizing-promises/ja/index.mdx:50 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2018-09-30--visualizing-promises/ja/index.mdx:94 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:108:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:34:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 3.08
- Input tokens: 7329
- Output tokens: 209
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004292
- Estimated cost: $0.004292

### Round 1, Batch 2
- Runtime seconds: 4.19
- Input tokens: 4444
- Output tokens: 557
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003893
- Estimated cost: $0.003893

## Primary Judge Telemetry
- Runtime seconds: 2.83
- Input tokens: 5889
- Output tokens: 312
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003880
- Estimated cost: $0.003880

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "![Timeline showing delay 1000 then console log running after one second](../N_1000ms_log.webp)" Replacement: "![Timeline showing delay 1000 then console log running after one second](../N_1000ms_log.webp)" Reason: The candidate correctly updated image paths to ../ but the other candidate missed some, making this one more consistent. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current not present
- 4d6673b1c0910e86008cb753abbd824ffb461742 i18n candidate(ja): visualizing-promises via openrouter/openai/gpt-oss-120b:nitro
- ee9aa02c8a80cdffcdf391ede5176138fd08390b i18n candidate(ja): visualizing-promises via deepseek/deepseek-v4-flash
- 087d65e9060f77a555d03a556ecc061fee4c62b9 i18n candidate(ja): visualizing-promises via qwen/qwen3.6-35b-a3b
- 58a80c15a849895b7169ed4dc906f9355ea1d105 i18n candidate(ja): visualizing-promises via openrouter/qwen/qwen3-32b:nitro
