# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: zh
- Judge model: openrouter/deepseek/deepseek-v4-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale zh --skip-global
110 |     })
111 |     .filter((message): message is string => message != null);
112 | 
113 |   if (mismatches.length === 0) return;
114 | 
115 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/zh/index.mdx changed heading counts. H1: English has 0, translation has 12; H3: English has 17, translation has 16; H4: English has 11, translation has 9
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:115:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 33.85
- Input tokens: 24480
- Output tokens: 6162
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007361
- Estimated cost: $0.007361

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 25.59
- Input tokens: 25269
- Output tokens: 5224
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007143
- Estimated cost: $0.007143

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "### Canary Tokens" Replacement: "### 蜜罐令牌" Reason: Translate heading to Chinese for consistency and natural language quality. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "#### Canary Token 最佳实践" Replacement: "#### 蜜罐令牌最佳实践" Reason: Translate heading to Chinese for consistency with the translated term '蜜罐令牌'. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "### 生成强随机 secret" Replacement: "### 生成强密钥" Reason: Use Chinese term '密钥' instead of English 'secret' for better readability. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied medium priority suggestion. Match: "\"Helper commands\"" Replacement: "\"辅助命令\"" Reason: Translate tab label to Chinese for consistency with the rest of the translation. Note: Applied exact replacement to selected MDX.
5. Pass 1: applied medium priority suggestion. Match: "\"Example: Drop/Limit Capabilities\"" Replacement: "\"示例：丢弃/限制能力\"" Reason: Translate code block title to Chinese for better readability. Note: Applied exact replacement to selected MDX.
6. Pass 1: applied medium priority suggestion. Match: "\"nmap Scan\"" Replacement: "\"nmap 扫描\"" Reason: Translate frame title to Chinese for consistency. Note: Applied exact replacement to selected MDX.
7. Pass 1: applied medium priority suggestion. Match: "\"lsof Commands\"" Replacement: "\"lsof 命令\"" Reason: Translate code block title to Chinese for better readability. Note: Applied exact replacement to selected MDX.
8. Pass 1: logged medium priority suggestion. Match: "\"Get Public IP\"" Replacement: "\"获取公网 IP\"" Reason: Translate code block title to Chinese for consistency. Note: Exact match not found in selected MDX.
9. Pass 1: logged medium priority suggestion. Match: "\"nmap External Scan\"" Replacement: "\"nmap 外部扫描\"" Reason: Translate code block title to Chinese for better readability. Note: Exact match not found in selected MDX.
10. Pass 2: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current not present
- 07dc0be2b5bb4586470d0bf5d7c99a3d34a46efc i18n candidate(zh): docker-security-tips-for-self-hosting via openrouter/deepseek/deepseek-v4-flash
- d2aeb239d71875755de67f0d4f1eadb4dd3df7b4 i18n candidate(zh): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
