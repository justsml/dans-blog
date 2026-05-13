# Translation Judge Summary

- Slug: stop-the-angularjs-hate
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug stop-the-angularjs-hate --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug stop-the-angularjs-hate --locale ja --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2015-03-10--stop-the-angularjs-hate/ja/index.mdx changed heading counts. H2: English has 3, translation has 2
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 2.73
- Input tokens: 7398
- Output tokens: 245
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004434

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.17
- Input tokens: 5850
- Output tokens: 236
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003633

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "##AngularJS CAN BE Fun!" Replacement: "## AngularJS CAN BE Fun!" Reason: Missing space after markdown heading marker. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-03-10--stop-the-angularjs-hate/ja/index.mdx
- 41fadb8cc54959e253053d2a2f8f2558bb169eb3 i18n candidate(ja): stop-the-angularjs-hate via openrouter/openai/gpt-oss-120b:nitro
- 17559f023dc738f0f2d3e0ef010c13b0c3c1e54c i18n candidate(ja): stop-the-angularjs-hate via openrouter/qwen/qwen3-32b:nitro
