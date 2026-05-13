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

## Primary Judge Telemetry
- Runtime seconds: 2.98
- Input tokens: 7868
- Output tokens: 337
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004945

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.15
- Input tokens: 5159
- Output tokens: 418
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003834

### Pass 2
- Runtime seconds: 4.14
- Input tokens: 5106
- Output tokens: 468
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.003957

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "शिक्षक केवल एक विकल्प का चयन नहीं कर रहा है।" Replacement: "शिक्षार्थी केवल एक विकल्प का चयन नहीं कर रहा है।" Reason: The original English says 'The learner is not merely selecting an option.' The translation used 'शिक्षक' (teacher) instead of 'शिक्षार्थी' (learner). Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "व्याख्या appearing से पहले ही" Replacement: "व्याख्या सामने आने से पहले ही" Reason: Avoid mixing English 'appearing' in the middle of a Hindi sentence when a natural Hindi equivalent exists. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "यह विचार कैसे गलत हो जाती है" Replacement: "यह विचार कैसे गलत हो जाता है" Reason: Grammar fix: 'विचार' (thought/idea) is masculine in Hindi, so the verb should be 'हो जाता है' instead of 'हो जाती है'. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied medium priority suggestion. Match: "समान सिंटैक्स के बीच सूक्ष्म अंतरों नेविगेट करते हैं" Replacement: "समान सिंटैक्स के बीच सूक्ष्म अंतरों को समझते हैं" Reason: The word 'navigate' used as 'अंतरों नेविगेट' is grammatically incomplete in Hindi; 'को समझते हैं' (understand) or 'के बीच रास्ता निकालते हैं' is more natural. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-01-01--the-unassuming-power-of-multiple-choice-questions/hi/index.mdx
- ca12e47aff5d8e3a72c2bb7f0e67130c01622453 i18n candidate(hi): the-unassuming-power-of-multiple-choice-questions via openrouter/qwen/qwen3.6-plus
- 64aba97a39d93e89d617a3ba8e4ba9819f41d99e i18n candidate(hi): the-unassuming-power-of-multiple-choice-questions via openrouter/openai/gpt-oss-120b:nitro
- 35b95fb68413ee0cfe9ba5f2cac6e3edbb9801d4 i18n candidate(hi): the-unassuming-power-of-multiple-choice-questions via openrouter/qwen/qwen3-32b:nitro
