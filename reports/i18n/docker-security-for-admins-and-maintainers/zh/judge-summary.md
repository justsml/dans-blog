# Translation Judge Summary

- Slug: docker-security-for-admins-and-maintainers
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
- Runtime seconds: 56.41
- Input tokens: 8815
- Output tokens: 8296
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005081
- Estimated cost: $0.005081

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 5.70
- Input tokens: 9261
- Output tokens: 1019
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002260
- Estimated cost: $0.002260

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "console.error(\"检测到不安全的密钥:\", missingSecrets);" Replacement: "console.error(\"Unsafe secrets detected:\", missingSecrets);" Reason: Code examples should preserve original English strings to maintain consistency with the source and avoid altering executable code. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "panic!(\"{} 中存在不安全的密钥\", key);" Replacement: "panic!(\"Unsafe secret in {}\", key);" Reason: Code examples should preserve original English strings to maintain consistency with the source and avoid altering executable code. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "panic(fmt.Sprintf(\"%s 中存在不安全的密钥\", pair[0]))" Replacement: "panic(fmt.Sprintf(\"Unsafe secret in %s\", pair[0]))" Reason: Code examples should preserve original English strings to maintain consistency with the source and avoid altering executable code. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied medium priority suggestion. Match: "echo \".env 文件已存在！\"" Replacement: "echo \".env file already exists!\"" Reason: Shell script output strings should remain in English to match the original example and avoid confusion. Note: Applied exact replacement to selected MDX.
5. Pass 1: applied medium priority suggestion. Match: "echo \"已生成新的 .env 文件！\"" Replacement: "echo \"New .env file generated!\"" Reason: Shell script output strings should remain in English to match the original example and avoid confusion. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- 2e4d54f08280afc4805f12b85bba14bab2f20237 i18n candidate(zh): docker-security-for-admins-and-maintainers via openrouter/deepseek/deepseek-v4-flash
- a64f17c3b921b686f80fe69297a2780e11598b79 i18n candidate(zh): docker-security-for-admins-and-maintainers via openrouter/openai/gpt-oss-120b:nitro
