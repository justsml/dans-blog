# Translation Judge Summary

- Slug: protect-your-tokens
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug protect-your-tokens --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug protect-your-tokens --locale ru --skip-global
110 |     })
111 |     .filter((message): message is string => message != null);
112 | 
113 |   if (mismatches.length === 0) return;
114 | 
115 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-10-27--protect-your-tokens/ru/index.mdx changed heading counts. H2: English has 4, translation has 3
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:115:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.33
- Input tokens: 5456
- Output tokens: 410
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003958
- Estimated cost: $0.003958

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.09
- Input tokens: 5764
- Output tokens: 268
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003686
- Estimated cost: $0.003686

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "##When to protect your tokens?" Replacement: "## Когда защищать свои токены?" Reason: The heading is still in English and missing a space after the hashes. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "> Securing API keys & tokens is **critically important**!" Replacement: "> Защита API-ключей и токенов **критически важна**!" Reason: This important callout was left in English. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "One mistake can lead to lost control of your server and data to hackers!" Replacement: "Одна ошибка может привести к потере контроля над сервером и краже данных хакерами!" Reason: This sentence was left in English. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "It shouldn't be so difficult determining if any particular token must be hidden - even based on official documentation!" Replacement: "Определить, нужно ли скрывать конкретный токен, не должно быть так сложно — даже на основе официальной документации!" Reason: This sentence was left in English. Note: Applied exact replacement to selected MDX.
5. Pass 1: applied high priority suggestion. Match: "It часто усложняется" Replacement: "Ситуация часто усложняется" Reason: The sentence starts with an English word 'It'. Note: Applied exact replacement to selected MDX.
6. Pass 1: applied medium priority suggestion. Match: "которые можно свободно делиться" Replacement: "которыми можно свободно делиться" Reason: Grammar: 'которыми' (with which) instead of 'которые' (which). Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-10-27--protect-your-tokens/ru/index.mdx
- ad5481a8ff846f49ab456c871b0fcc769f34c312 i18n candidate(ru): protect-your-tokens via openrouter/openai/gpt-oss-120b:nitro
