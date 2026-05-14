# Translation Judge Summary

- Slug: docker-security-for-admins-and-maintainers
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
- Runtime seconds: 3.34
- Input tokens: 11168
- Output tokens: 351
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006637
- Estimated cost: $0.006637

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.69
- Input tokens: 10719
- Output tokens: 346
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006398
- Estimated cost: $0.006398

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "## עבודה בתהליך" Replacement: "## עבודה בעיצומה" Reason: 'עבודה בעיצומה' is the standard Hebrew translation for 'Work in progress'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "[🕵️‍ דליפות אישורים והתקפות ערוץ צדדי](#-credential-leaks-and-side-channel-attacks)" Replacement: "[🕵️‍ דליפות אישורים והתקפות ערוץ צדדי](#-credential-leaks-and-side-channel-attacks) 5. [🔍 ניטור ובדיקה כפולה](#-monitoring--double-checking)" Reason: The candidate missed translating the 5th item in the Table of Contents list, causing a mismatch with the actual heading below. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "5. [🔍 ניטור ובדיקה כפולה](#-monitoring--double-checking) 5. [🔍 ניטור ואסימוני קנרית](#-monitoring--canary-tokens)" Replacement: "5. [🔍 ניטור ובדיקה כפולה](#-monitoring--double-checking) 6. [❌ תפיסות מוטעות נפוצות](#-common-misconceptions)" Reason: The Table of Contents has duplicate item 5s and incorrect numbering/labels compared to the English source and the actual headings in the document. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- e6188d4c743665cd6b7c2f60f98473f1523fafc5 i18n candidate(he): docker-security-for-admins-and-maintainers via openrouter/deepseek/deepseek-v4-flash
- 403c4cb54850089329ca5ebe677a05e427a8a0ff i18n candidate(he): docker-security-for-admins-and-maintainers via openrouter/openai/gpt-oss-120b:nitro
