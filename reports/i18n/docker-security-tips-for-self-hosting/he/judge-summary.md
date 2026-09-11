# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: he
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.881)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale he --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/he/index.mdx failed structural parity with score 0.982 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/he/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":11}. Differences: {"linkTargets":11}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 9.23
- Input tokens: 55193
- Output tokens: 369
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.042778
- Estimated cost: $0.042778

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 6.59
- Input tokens: 30332
- Output tokens: 475
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.024530
- Estimated cost: $0.024530

### Pass 2
- Runtime seconds: 14.87
- Input tokens: 30312
- Output tokens: 169
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.023368
- Estimated cost: $0.023368

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "- [חסימת מדינות](#חסימת-מדינות)" Replacement: "- [חסימת מדינה!](#חסימת-מדינה)" Reason: Fixes broken heading anchor link mismatch with the target heading '### חסימת מדינה!' Note: Exact match not found in selected MDX.
2. Pass 1: applied high priority suggestion. Match: "[הקשחתם את אבטחת הרשת והמארח](#-סכנות-ברשת)" Replacement: "[הקשחתם את אבטחת הרשת והמארח](#-סכנת-רשת)" Reason: Fixes stale heading link fragment to match the actual section slug Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "זה דומה במקצת ל[חסימת מדינות](#חסימת-מדינות) שהוזכרה למעלה, אבל עם שליטה הדוקה הרבה יותר." Replacement: "זה דומה במקצת ל[חסימת מדינה!](#חסימת-מדינה) שהוזכרה למעלה, אבל עם שליטה הדוקה הרבה יותר." Reason: Fix anchor link to match translated heading '### חסימת מדינה!' Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "מידע נוסף נמצא בסעיף [ניטור ואימות](#ניטור-ואימות)." Replacement: "מידע נוסף נמצא בסעיף [ניטור ואימות](#-ניטור-ואימות)." Reason: Fix anchor link to include emoji prefix matching '## 🔍 ניטור ואימות' Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/he/index.mdx
- e4ef05a57ed3a0cdae10d511b7659f8c29ea2813 i18n candidate(he): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 87da697b0815cc20647e92c9a6e71ffaf5387b73 i18n candidate(he): docker-security-tips-for-self-hosting via openrouter/deepseek/deepseek-v4-flash
- cb0aa2d939921b26eebc59492dcd8480308f030d i18n candidate(he): docker-security-tips-for-self-hosting via openrouter/openai/gpt-5.6-luna
