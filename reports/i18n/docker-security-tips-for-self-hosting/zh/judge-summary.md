# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: zh
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.329)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale zh --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/zh/index.mdx failed structural parity with score 0.740 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/zh/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Image count or target sequence changed. Alt text count or length profile changed. Differences: {"h2":5,"h3":5,"h4":8,"links":20,"images":1,"altTexts":1,"headingSequence":18,"linkTargets":29,"imageTargets":1}. Differences: {"h2":5,"h3":5,"h4":8,"links":20,"images":1,"altTexts":1,"headingSequence":18,"linkTargets":29,"imageTargets":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 6.44
- Input tokens: 43709
- Output tokens: 426
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.034379
- Estimated cost: $0.034379

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 6.92
- Input tokens: 27351
- Output tokens: 331
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.021754
- Estimated cost: $0.021754

### Pass 2
- Runtime seconds: 6.54
- Input tokens: 27222
- Output tokens: 310
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.021579
- Estimated cost: $0.021579

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "- 🔄 [`:latest`之舞](#-latest之舞)" Replacement: "- 🔄 [`:latest`之舞](#-latest之舞)" Reason: Verify anchor formatting matches generated slug. Note: Exact match and replacement are identical; no MDX change needed.
2. Pass 1: applied high priority suggestion. Match: "只要确保[验证你的设置](#🛡️-监控与验证)即可。" Replacement: "只要确保[验证你的设置](#-监控与验证)即可。" Reason: The heading for monitoring is '## 🔍 监控与验证', so the anchor is #-监控与验证, not #🛡️-监控与验证. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "- [从 `.env` 升级到 MacOS 钥匙串](#从env升级到macos钥匙串)" Replacement: "- [从 `.env` 升级到 MacOS 钥匙串](#从-env-升级到-macos-钥匙串)" Reason: Generated slug from '### 从 `.env` 升级到 MacOS 钥匙串' preserves hyphens around env. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "详见[监控与验证](#监控与验证)部分。" Replacement: "详见[监控与验证](#-监控与验证)部分。" Reason: The anchor link should match the slug of '## 🔍 监控与验证', which is '#-监控与验证'. Note: Applied exact replacement to selected MDX.
5. Pass 2: logged medium priority suggestion. Match: "一旦你的[网络和主机安全得到强化，](#-network-hazard)" Replacement: "一旦你的[网络和主机安全得到强化，](#-网络风险)" Reason: The heading link still points to the English anchor '#-network-hazard' instead of the translated heading '#-网络风险'. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/zh/index.mdx
- 9430ba13a8bf7ae893515ab571db404f2c3af50e i18n candidate(zh): docker-security-tips-for-self-hosting via openrouter/deepseek/deepseek-v4-flash
- 48ea4be701abe095cdd6d8d0a20f23d4e6dac804 i18n candidate(zh): docker-security-tips-for-self-hosting via openrouter/openai/gpt-5.6-luna
- a06542d6296e51f5d27321f92df16880ee978d94 i18n candidate(zh): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
