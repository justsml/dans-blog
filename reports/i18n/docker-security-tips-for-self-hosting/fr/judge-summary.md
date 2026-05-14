# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale fr --skip-global
154 |   }
155 | 
156 |   const minimumLength = Math.floor(sourceLength * minimumRatio);
157 |   const maximumLength = Math.ceil(sourceLength * maximumRatio);
158 |   if (targetLength < minimumLength || targetLength > maximumLength) {
159 |     throw new Error(
                    ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/fr/index.mdx changed comparable body length from 19252 chars in English to 12199 chars. Expected 13476-30804 chars (French range: 70%-160% of English).
      at assertTranslationLength (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:159:15)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.50
- Input tokens: 39503
- Output tokens: 400
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.020952
- Estimated cost: $0.020952

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.25
- Input tokens: 28535
- Output tokens: 668
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016272
- Estimated cost: $0.016272

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "# Autoriser les IP de CloudFlare curl -fsSL https://www.cloudflare.com/ips-v4 | \\ while read line; do ufw allow from $line to any port 443; done" Replacement: "# Autoriser les IP de CloudFlare curl -fsSL https://www.cloudflare.com/ips-v4 | \\ while read line; do ufw allow from $line to any port 443; done # Ajouter la prise en charge IPv..." Reason: The candidate accidentally moved the CloudFlare IP loop outside of the code block, breaking the script's integrity and leaving it as plain text. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/fr/index.mdx
- 233bfd5ceb3d3a6fd80ef520ddaf75c31234a658 i18n candidate(fr): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- a5c19554d9a8b292f8a7129274bcd308745bab7b i18n candidate(fr): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
