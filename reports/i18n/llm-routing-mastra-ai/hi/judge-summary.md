# Translation Judge Summary

- Slug: llm-routing-mastra-ai
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.867)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.31
- Input tokens: 7621
- Output tokens: 480
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005250
- Estimated cost: $0.005250

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.05
- Input tokens: 7411
- Output tokens: 327
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004686
- Estimated cost: $0.004686

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: 'LLM रूटिंग, आजकल बहुत चर्चा में है'" Reason: The subtitle was left empty in the translation but contains reader-facing content in the English source. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "प्रतिनिधित्व बनाम समर्पण" Replacement: "डेलिगेशन बनाम समर्पण" Reason: In a technical context, 'Delegation' is better understood as a loanword or transliterated, as 'प्रतिनिधित्व' (Representation) doesn't quite capture the technical meaning of delegating tasks to agents. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-02--llm-routing-mastra-ai/hi/index.mdx
- 7b48f92febe0b235a0723c30188a1cbbae2e158b i18n candidate(hi): llm-routing-mastra-ai via openrouter/deepseek/deepseek-v4-flash
- 9c35da2890af79cb9d2290d757fa66608d65ab23 i18n candidate(hi): llm-routing-mastra-ai via openrouter/qwen/qwen3.6-plus
