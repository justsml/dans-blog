# Translation Judge Summary

- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: ar
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.876)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug how-to-hire-an-ai-engineer-without-getting-burned --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug how-to-hire-an-ai-engineer-without-getting-burned --locale ar --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-09-09--how-to-hire-an-ai-engineer-without-getting-burned/ar/index.mdx failed structural parity with score 0.983 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-09-09--how-to-hire-an-ai-engineer-without-getting-burned/ar/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":1}. Differences: {"linkTargets":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.86
- Input tokens: 13791
- Output tokens: 446
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.012016
- Estimated cost: $0.012016

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.58
- Input tokens: 13025
- Output tokens: 164
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010384
- Estimated cost: $0.010384

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "للمرشح في بداية مسيرته المهنية، الأدلة أصغر وهذا جيد. قم بمواءمة النطاق المتوقع والإشراف مع الدور." Replacement: "للمرشح في بداية مسيرته المهنية، الأدلة أصغر وهذا جيد. قم بمواءمة النطاق المتوقع والإشراف مع الدور. أنت تختبر الفهم والملكية، وليس الوصول إلى علامات تجارية مشهورة." Reason: Candidate missed the final sentence of the paragraph in English: 'You are testing understanding and ownership, not access to famous logos.' Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "امنح الموظف الجديد الإذن بخيبة أمل خارطة الطريق" Replacement: "امنح الموظف الجديد الإذن بتخييب آمال خارطة الطريق" Reason: More natural and grammatically correct Arabic phrasing for 'Give the hire permission to disappoint the roadmap'. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 334dd4c166f533a4c9bea006353f570e93e8031c i18n candidate(ar): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/openai/gpt-oss-120b:nitro
- 3ba92687804b27980aa79ee0262b7935d8e69609 i18n candidate(ar): how-to-hire-an-ai-engineer-without-getting-burned via openrouter/deepseek/deepseek-v4-flash
