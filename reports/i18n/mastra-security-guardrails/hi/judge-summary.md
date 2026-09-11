# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: hi
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.885)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.50
- Input tokens: 14562
- Output tokens: 403
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.012433
- Estimated cost: $0.012433

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.21
- Input tokens: 9335
- Output tokens: 167
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007627
- Estimated cost: $0.007627

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "subTitle: >- अगर आपके एजेंट में सुरक्षा-नियंत्रण नहीं हैं, तो वह प्रोडक्शन के लिए तैयार नहीं है।" Replacement: "subTitle: 'यदि आपके एजेंट में गार्डरेल्स नहीं हैं, तो आप प्रोडक्शन के लिए तैयार नहीं हैं।'" Reason: Align with common technical terminology ('गार्डरेल्स') and avoid awkward multi-line YAML folding for subtitle. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/hi/index.mdx
- 2431e448502a035f5624e77f023215e632b1d251 i18n candidate(hi): mastra-security-guardrails via openrouter/deepseek/deepseek-v4-flash
- fca989108b2b0915546251c1361d84b10b8b5ace i18n candidate(hi): mastra-security-guardrails via openrouter/openai/gpt-5.6-luna
- 1db9d1b52f0f9d7acdd484f3321d57f6a471b189 i18n candidate(hi): mastra-security-guardrails via openrouter/openai/gpt-oss-120b:nitro
