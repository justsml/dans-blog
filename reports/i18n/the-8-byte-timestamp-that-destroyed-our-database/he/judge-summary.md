# Translation Judge Summary

- Slug: the-8-byte-timestamp-that-destroyed-our-database
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.45
- Input tokens: 10889
- Output tokens: 441
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006768
- Estimated cost: $0.006768

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.75
- Input tokens: 10284
- Output tokens: 552
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006798
- Estimated cost: $0.006798

### Pass 2
- Runtime seconds: 21.70
- Input tokens: 10284
- Output tokens: 568
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006846
- Estimated cost: $0.006846

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "שלוש ייצוגים שונים" Replacement: "שלושה ייצוגים שונים" Reason: Grammar: 'ייצוג' (representation) is masculine, so the number should be 'שלושה'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "שתי חישובי מרווח" Replacement: "שני חישובי מרווח" Reason: Grammar: 'חישוב' (calculation) is masculine, so the number should be 'שני'. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "מה לימדה אותי כרטיס הרכבת ההוא" Replacement: "מה לימד אותי כרטיס הרכבת ההוא" Reason: Grammar: 'כרטיס' (ticket) is masculine, so the verb should be 'לימד'. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "שלוש ייצוגים שונים" Replacement: "שלושה ייצוגים שונים" Reason: Grammar: 'ייצוג' (representation) is masculine, so the number should be 'שלושה'. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "שתי חישובי מרווח" Replacement: "שני חישובי מרווח" Reason: Grammar: 'חישוב' (calculation) is masculine, so the number should be 'שני'. Note: Applied exact replacement to selected MDX.
6. Pass 2: logged high priority suggestion. Match: "מה לימד אותי כרטיס הרכבת ההוא" Replacement: "מה לימד אותי כרטיס הרכבת ההוא" Reason: Grammar: 'כרטיס' (ticket) is masculine, so the verb should be 'לימד'. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current not present
- ac40b60e7f368d1bfce7ee94698c3f28d6120af7 i18n candidate(he): the-8-byte-timestamp-that-destroyed-our-database via openrouter/deepseek/deepseek-v4-flash
- 3a3fa24b08629bafd4a773c80e150d46b9cc1144 i18n candidate(he): the-8-byte-timestamp-that-destroyed-our-database via openrouter/openai/gpt-oss-120b:nitro
