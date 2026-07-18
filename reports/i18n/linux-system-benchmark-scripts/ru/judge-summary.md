# Translation Judge Summary

- Slug: linux-system-benchmark-scripts
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.888)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug linux-system-benchmark-scripts --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug linux-system-benchmark-scripts --locale ru --skip-global
103 | 
104 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
105 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
106 |   if (issues.length === 0) return;
107 | 
108 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2017-05-01--linux-system-benchmark-scripts/ru/index.mdx failed translation integrity checks:
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2017-05-01--linux-system-benchmark-scripts/ru/index.mdx:152 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2017-05-01--linux-system-benchmark-scripts/ru/index.mdx:155 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:108:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:34:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Batch Judge Telemetry
### Round 1, Batch 1
- Runtime seconds: 2.95
- Input tokens: 8857
- Output tokens: 237
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005139
- Estimated cost: $0.005139

### Round 1, Batch 2
- Runtime seconds: 2.91
- Input tokens: 5215
- Output tokens: 266
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003406
- Estimated cost: $0.003406

## Primary Judge Telemetry
- Runtime seconds: 2.36
- Input tokens: 7075
- Output tokens: 230
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004228
- Estimated cost: $0.004228

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.43
- Input tokens: 6788
- Output tokens: 246
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004132
- Estimated cost: $0.004132

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: 'Быстрый замер производительности CPU и HDD'" Reason: The subTitle was left empty in this candidate but contains useful reader-facing information in the source. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 940732bf6b0865ef084431620179e5f6edbbe7fd i18n candidate(ru): linux-system-benchmark-scripts via openrouter/openai/gpt-oss-120b:nitro
- cf22ea82313f5d74752179a852065c089505d939 i18n candidate(ru): linux-system-benchmark-scripts via openrouter/qwen/qwen3-32b:nitro
- a2a777268b9b74f465bc3af670bd48dcb482ef34 i18n candidate(ru): linux-system-benchmark-scripts via deepseek/deepseek-v4-flash
- b15025426b9f7c00df014590d7254c63a3e1f97c i18n candidate(ru): linux-system-benchmark-scripts via qwen/qwen3.6-35b-a3b
