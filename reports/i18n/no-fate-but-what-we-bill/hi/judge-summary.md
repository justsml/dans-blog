# Translation Judge Summary

- Slug: no-fate-but-what-we-bill
- Locale: hi
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.879)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.47
- Input tokens: 11156
- Output tokens: 496
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010227
- Estimated cost: $0.010227

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 5.28
- Input tokens: 11152
- Output tokens: 180
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009039
- Estimated cost: $0.009039

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "src=\".././who-pays.svg\"" Replacement: "src=\"../who-pays.svg\"" Reason: Fix malformed relative image path '.././' to standard '../' Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "src=\".././swarm-odds.svg\"" Replacement: "src=\"../swarm-odds.svg\"" Reason: Fix malformed relative image path '.././' to standard '../' Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "src=\".././defense-layers.svg\"" Replacement: "src=\"../defense-layers.svg\"" Reason: Fix malformed relative image path '.././' to standard '../' Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 031a30c74c01636c7b1df48fca519e5fd0860dcc i18n candidate(hi): no-fate-but-what-we-bill via openrouter/google/gemini-3.8-flash
- 41190e136adca42e58c0b40e4ea7ddac0de26211 i18n candidate(hi): no-fate-but-what-we-bill via openrouter/minimax/minimax-m2.5:nitro
