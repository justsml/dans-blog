# Translation Judge Summary

- Slug: dont-fear-the-model-router
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.324)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.57
- Input tokens: 20387
- Output tokens: 300
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.011093
- Estimated cost: $0.011093

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.89
- Input tokens: 19646
- Output tokens: 347
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010864
- Estimated cost: $0.010864

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[डॉन्ट मैरी योर मॉडल](/llm-routing-mastra-ai)" Replacement: "[Don't Marry Your Model](/llm-routing-mastra-ai)" Reason: The link text refers to a specific previous post title which should remain consistent with the site's English titles or be localized consistently; however, the English source uses the title as a proper reference. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "[Don't Marry Your Model](/llm-routing-mastra-ai) का पहला संस्करण" Replacement: "[Don't Marry Your Model](/llm-routing-mastra-ai) का पहला संस्करण" Reason: The current translation already uses the English title for the internal link, which is correct for cross-referencing. No change needed, but verifying consistency. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current not present
- 1753a77e2167feeadf10b9fb5b0b44bcf4b42100 i18n candidate(hi): dont-fear-the-model-router via openrouter/openai/gpt-oss-120b:nitro
- bd1ef91040d0c87c3be45d3aacb9ade23efb5a59 i18n candidate(hi): dont-fear-the-model-router via openrouter/deepseek/deepseek-v4-flash
