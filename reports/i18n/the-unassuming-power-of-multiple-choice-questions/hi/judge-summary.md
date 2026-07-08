# Translation Judge Summary

- Slug: the-unassuming-power-of-multiple-choice-questions
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.866)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 3.09
- Input tokens: 8680
- Output tokens: 314
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005282
- Estimated cost: $0.005282

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.88
- Input tokens: 5561
- Output tokens: 358
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003854
- Estimated cost: $0.003854

### Pass 2
- Runtime seconds: 2.78
- Input tokens: 5454
- Output tokens: 250
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003477
- Estimated cost: $0.003477

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Consider thisPostgreSQL question as an example:" Replacement: "उदाहरण के लिए इस PostgreSQL प्रश्न पर विचार करें:" Reason: The candidate left a sentence partially in English with a missing space. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "(Correct)" Replacement: "(सही)" Reason: Consistency with the rest of the translated labels. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "Consider thisPostgreSQL question as an example:" Replacement: "उदाहरण के लिए इस PostgreSQL प्रश्न पर विचार करें:" Reason: The candidate left a sentence partially in English with a missing space ('thisPostgreSQL'). Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "(Correct)" Replacement: "(सही)" Reason: Consistency with the rest of the translated labels in the quiz section. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-01-01--the-unassuming-power-of-multiple-choice-questions/hi/index.mdx
- ca12e47aff5d8e3a72c2bb7f0e67130c01622453 i18n candidate(hi): the-unassuming-power-of-multiple-choice-questions via openrouter/qwen/qwen3.6-plus
- 64aba97a39d93e89d617a3ba8e4ba9819f41d99e i18n candidate(hi): the-unassuming-power-of-multiple-choice-questions via openrouter/openai/gpt-oss-120b:nitro
- 35b95fb68413ee0cfe9ba5f2cac6e3edbb9801d4 i18n candidate(hi): the-unassuming-power-of-multiple-choice-questions via openrouter/qwen/qwen3-32b:nitro
