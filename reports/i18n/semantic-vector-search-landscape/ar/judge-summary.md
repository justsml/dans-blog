# Translation Judge Summary

- Slug: semantic-vector-search-landscape
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 4.04
- Input tokens: 25375
- Output tokens: 517
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.014238
- Estimated cost: $0.014238

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.31
- Input tokens: 23633
- Output tokens: 240
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.012537
- Estimated cost: $0.012537

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "- Users complain about typos not matching → add `pg_trgm`" Replacement: "- يشتكي المستخدمون من عدم مطابقة الأخطاء الإملائية ← أضف `pg_trgm`" Reason: This list item was left in English in the candidate. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "- Users search by concept and miss relevant results → add pgvector" Replacement: "- يبحث المستخدمون بالمفهوم ويفوتهم النتائج ذات الصلة ← أضف pgvector" Reason: This list item was left in English in the candidate. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "- Users search for exact symbols or codes and get conceptual results instead → add FTS or check if you're over-relying on vector search" Replacement: "- يبحث المستخدمون عن رموز أو أكواد دقيقة ويحصلون على نتائج مفهومية بدلاً من ذلك ← أضف FTS أو تحقق مما إذا كنت تعتمد بشكل مفرط على البحث المتجهي" Reason: This list item was left in English in the candidate. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "- Latency becomes a problem → evaluate pre-filtering, approximate indexes, or a dedicated store" Replacement: "- يصبح زمن الاستجابة مشكلة ← قيم ما قبل الترشيح، الفهارس التقريبية، أو مخزن مخصص" Reason: This list item was left in English in the candidate. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-01--semantic-vector-search-landscape/ar/index.mdx
- ac208c5c1804bad0e7aa3098d6f09450f9982d4e i18n candidate(ar): semantic-vector-search-landscape via openrouter/openai/gpt-oss-120b:nitro
