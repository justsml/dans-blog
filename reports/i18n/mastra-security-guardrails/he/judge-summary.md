# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.118)
- Confidence signals: 3 high and 4 medium issues; single judge
- High/medium/low issue counts: 3/4/0
- Validation error: Command failed: bun run i18n:validate --slug mastra-security-guardrails --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug mastra-security-guardrails --locale he --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/he/index.mdx failed structural parity with score 0.953 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2026-01-03--mastra-security-guardrails/he/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h3":1,"headingSequence":4,"linkTargets":3}. Differences: {"h3":1,"headingSequence":4,"linkTargets":3}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.52
- Input tokens: 7115
- Output tokens: 379
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004694
- Estimated cost: $0.004694

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.83
- Input tokens: 9634
- Output tokens: 502
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006323
- Estimated cost: $0.006323

### Pass 2
- Runtime seconds: 5.97
- Input tokens: 9628
- Output tokens: 953
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007673
- Estimated cost: $0.007673

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "### 3. ניטור תוכן ### 3. ניטור תוכן" Replacement: "### 3. ניטור תוכן" Reason: The heading is duplicated in the candidate. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: \"אם לסוכן שלכם אין מעקות בטיחות, אתם לא מוכנים לפרודקשן.\"" Reason: The subtitle was left empty but should be translated. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "[ניתוב LLM](../llm-routing-mastra-ai)" Replacement: "[ניתוב LLM](/he/llm-routing-mastra-ai)" Reason: Internal links to other posts in the series should point to the localized version or follow the site's routing convention; the candidate used a relative path that might break depending on the router. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "בצ' את הנתחים" Replacement: "קבצו את הנתחים (batch)" Reason: The word 'בצ'' is a typo or incomplete translation of 'batch'. Using 'קבצו' (group/batch) is more accurate. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "מודלים מהלים לפעמים" Replacement: "מודלים הוזים לפעמים" Reason: The word 'מהלים' is a typo for 'הוזים' (hallucinate), which is the standard technical term in AI. Note: Applied exact replacement to selected MDX.
6. Pass 2: logged medium priority suggestion. Match: "1. [ניתוב LLM](/he/llm-routing-mastra-ai)" Replacement: "1. [ניתוב LLM](/llm-routing-mastra-ai)" Reason: The site uses a root-relative path for internal links in the series list to ensure consistency across locales, as per the English source. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/he/index.mdx
- c52cb0dbeaa8e46c44e4575bc23c557aeeedbc39 i18n candidate(he): mastra-security-guardrails via openrouter/deepseek/deepseek-v4-flash
