# Translation Judge Summary

- Slug: into-the-breach
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.323)
- Confidence signals: 3 high and 1 medium issues; single judge
- High/medium/low issue counts: 3/1/0

## Primary Judge Telemetry
- Runtime seconds: 4.22
- Input tokens: 9867
- Output tokens: 401
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006136
- Estimated cost: $0.006136

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.85
- Input tokens: 9305
- Output tokens: 518
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006207
- Estimated cost: $0.006207

### Pass 2
- Runtime seconds: 4.53
- Input tokens: 9247
- Output tokens: 577
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006354
- Estimated cost: $0.006354

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "في صندوق**" Replacement: "في صندوق" Reason: Stray asterisks at the end of the heading. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "الطيور المغردة تجعل السرقة أكثر صخبًا" Replacement: "طيور الكناري تجعل السرقة أكثر صخبًا" Reason: The term 'Canaries' in a security context should remain consistent with the previous translation 'طيور الكناري' rather than switching to 'singing birds'. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "cover_full_width: ../wide.webp" Replacement: "cover_full_width: ../wide-2.webp" Reason: The asset filename in the English source is 'wide-2.webp'. The translation incorrectly changed it to 'wide.webp', which will cause a 404 error if the file doesn't exist. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "للحوزم" Replacement: "للحزم" Reason: Typo in the Arabic word for 'packages'. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "القنابل التجريبية" Replacement: "طيور الكناري (Canaries)" Reason: The subTitle translates 'canaries' as 'experimental bombs' (القنابل التجريبية), which is technically incorrect in a security context. It should use the industry-standard 'Canary' terminology used elsewhere in the document. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/ar/index.mdx
- c13b3c240dbf16176a4bef631df13e0af703bb8f i18n candidate(ar): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
- 9922463625a4aad4d51d870933926ca20ef17cca i18n candidate(ar): into-the-breach via openrouter/deepseek/deepseek-v4-flash
