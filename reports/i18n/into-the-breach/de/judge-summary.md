# Translation Judge Summary

- Slug: into-the-breach
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.182)
- Confidence signals: 1 high and 3 medium issues; single judge
- High/medium/low issue counts: 1/3/0

## Primary Judge Telemetry
- Runtime seconds: 3.32
- Input tokens: 9696
- Output tokens: 294
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005730
- Estimated cost: $0.005730

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.19
- Input tokens: 9023
- Output tokens: 473
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005931
- Estimated cost: $0.005931

### Pass 2
- Runtime seconds: 3.56
- Input tokens: 9094
- Output tokens: 530
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.006137
- Estimated cost: $0.006137

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "pnoms minimumReleaseAge" Replacement: "pnpms minimumReleaseAge" Reason: Typo in the tool name 'pnpm'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "fake [prod-billing-admin] profile" Replacement: "gefälschtes [prod-billing-admin] Profil" Reason: The code block contains descriptive comments that should be translated for the reader, as seen in the other candidate. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "pnpms minimumReleaseAge" Replacement: "pnpms minimumReleaseAge" Reason: The judge report mentioned a typo 'pnoms' but the actual file content already contains 'pnpms'. No change needed if already correct, but verifying the tool name is pnpm. Note: Exact match and replacement are identical; no MDX change needed.
4. Pass 2: applied medium priority suggestion. Match: "canary URL inside an old-looking dump" Replacement: "Canary-URL in einem alt aussehenden Dump" Reason: The code block contains descriptive comments that should be translated for the reader to maintain language consistency. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied medium priority suggestion. Match: "fake API key beside real local config" Replacement: "gefälschter API-Key neben echter lokaler Konfiguration" Reason: The code block contains descriptive comments that should be translated for the reader. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-05-13--into-the-breach/de/index.mdx
- ddd8bb4ab8bbff0b0529b6404283e5bd681ed586 i18n candidate(de): into-the-breach via openrouter/openai/gpt-oss-120b:nitro
- 6fd8d26f21d11af1d84d3b063e2f5c3df9443745 i18n candidate(de): into-the-breach via openrouter/deepseek/deepseek-v4-flash
