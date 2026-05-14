# Translation Judge Summary

- Slug: llm-routing-mastra-ai
- Locale: zh
- Judge model: openrouter/deepseek/deepseek-v4-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 21.09
- Input tokens: 5127
- Output tokens: 4473
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002815
- Estimated cost: $0.002815

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.27
- Input tokens: 5589
- Output tokens: 634
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.001371
- Estimated cost: $0.001371

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "不要绑定你的模型" Replacement: "别和模型结婚" Reason: The original title 'Don't Marry Your Model' uses a marriage metaphor. The current translation '不要绑定你的模型' (Don't bind your model) loses this metaphor. '别和模型结婚' directly translates the metaphor and matches the humorous tone. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 8c327e1d2d9ed3524abdbe2fb74d6e12562eae55 i18n candidate(zh): llm-routing-mastra-ai via openrouter/deepseek/deepseek-v4-flash
- 3b5b5dcdc1e994dcfab28f162cc6983dffacf4d1 i18n candidate(zh): llm-routing-mastra-ai via openrouter/openai/gpt-oss-120b:nitro
