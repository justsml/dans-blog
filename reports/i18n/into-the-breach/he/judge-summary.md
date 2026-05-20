# Translation Judge Summary

- Slug: into-the-breach
- Locale: he
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.316)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.94
- Input tokens: 18023
- Output tokens: 266
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009810
- Estimated cost: $0.009810

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.28
- Input tokens: 12465
- Output tokens: 478
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007666
- Estimated cost: $0.007666

### Pass 2
- Runtime seconds: 3.02
- Input tokens: 12565
- Output tokens: 381
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007425
- Estimated cost: $0.007425

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "- הקשר קידוד AI" Replacement: "| הקשר קידוד AI | העוזר עלול לקבל \"לשם הקשר\" קבצים רגישים. |" Reason: The table row for 'AI coding context' was broken into a list item, disrupting the table structure. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "| הקשר קידוד AI | העוזר עלול לקבל \"לשם הקשר\" קבצים רגישים. | | העוזר עלול לקבל \"לשם הקשר\" קבצים רגישים. |" Replacement: "| הקשר קידוד AI | העוזר עלול לקבל \"לשם הקשר\" קבצים רגישים. |" Reason: The table row for 'AI coding context' contains a duplicated cell and broken formatting, which disrupts the Markdown table structure. Note: Exact match not found in selected MDX.
3. Pass 2: applied high priority suggestion. Match: "פחות מ-24 שעות几乎没有, בעצם אפס בדיקה קהילתית." Replacement: "פחות מ-24 שעות, עבר בעצם אפס בדיקה קהילתית." Reason: Leaked Chinese characters '几乎没有' (meaning 'almost none') found in the middle of a Hebrew sentence. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/he/index.mdx
- e632dc503f7add7ba4718fb37c19e1b48b470c37 i18n candidate(he): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
- b9d43aef106a0c7c52147aef268f467a2f36d2db i18n candidate(he): into-the-breach via openrouter/qwen/qwen3-32b:nitro
- cb796c5b78b14b2fadad407528f5baba661e1235 i18n candidate(he): into-the-breach via deepseek/deepseek-v4-flash:nitro
