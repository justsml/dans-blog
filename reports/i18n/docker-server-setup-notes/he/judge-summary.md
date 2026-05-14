# Translation Judge Summary

- Slug: docker-server-setup-notes
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-server-setup-notes --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-server-setup-notes --locale he --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2015-04-06--docker-server-setup-notes/he/index.mdx changed heading counts. H1: English has 0, translation has 3; H4: English has 7, translation has 5
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.42
- Input tokens: 47242
- Output tokens: 310
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.024551
- Estimated cost: $0.024551

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.12
- Input tokens: 46935
- Output tokens: 574
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.025190
- Estimated cost: $0.025190

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "מייס-קיו-אל" Replacement: "MySQL" Reason: Technical terms like MySQL should generally remain in English or be transliterated more standardly; the candidate used a phonetic Hebrew transliteration which is less common in technical documentation. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current not present
- 6e542cc499a2876f14f88547a0cfa65b105d3134 i18n candidate(he): docker-server-setup-notes via openrouter/deepseek/deepseek-v4-flash
- d1306b2c01c8fe026d160404ef3c5a91ce298b0b i18n candidate(he): docker-server-setup-notes via openrouter/openai/gpt-oss-120b:nitro
