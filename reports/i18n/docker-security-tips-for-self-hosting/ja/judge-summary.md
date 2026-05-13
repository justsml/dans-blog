# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale ja --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx changed heading counts. H1: English has 0, translation has 4
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.65
- Input tokens: 37195
- Output tokens: 355
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.019662

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.20
- Input tokens: 27508
- Output tokens: 684
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.015806

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "- 🧗‍♀️ [勇者へ](#️-for-the-brave)" Replacement: "- 🧗‍♀️ [勇者へ](#-勇者へ)" Reason: The anchor link must match the translated heading text to function correctly in MDX. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "- 🛡️ [アクセス制御](#️-access-controls)" Replacement: "- 🛡️ [アクセス制御](#-アクセス制御)" Reason: The anchor link must match the translated heading text to function correctly in MDX. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "- 🔍 [監視と検証](#-monitoring--verification)" Replacement: "- 🔍 [監視と検証](#-監視と検証)" Reason: The anchor link must match the translated heading text to function correctly in MDX. Note: Applied exact replacement to selected MDX.
4. Pass 2: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx
- a6785435c38891c66a4564508617c9ddf9796547 i18n candidate(ja): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 73da8dab0f3738ba204db60554e0560657e20dd5 i18n candidate(ja): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
