# Translation Judge Summary

- Slug: docker-security-for-admins-and-maintainers
- Locale: zh
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-security-for-admins-and-maintainers --locale zh --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-for-admins-and-maintainers --locale zh --skip-global
111 |     })
112 |     .filter((message): message is string => message != null);
113 | 
114 |   if (mismatches.length === 0) return;
115 | 
116 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/zh/index.mdx changed heading counts. H3: English has 10, translation has 9
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:116:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:28:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.06
- Input tokens: 15611
- Output tokens: 345
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008840
- Estimated cost: $0.008840

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.49
- Input tokens: 9952
- Output tokens: 313
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005915
- Estimated cost: $0.005915

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[🔍 监控与诱饵令牌](#-监控与诱饵令牌)" Replacement: "[🔍 监控与金丝雀令牌](#-monitoring--canary-tokens)" Reason: The link anchor must match the English ID or the translated heading ID exactly. The current link is broken because it uses a translated anchor while the heading uses a different one, and standard practice here is to keep English anchors for stability. Note: Applied exact replacement to selected MDX.
2. Pass 1: logged high priority suggestion. Match: "## 🔍 监控与诱饵令牌" Replacement: "## 🔍 监控与双重验证" Reason: The heading text in the body (Section 5) does not match the table of contents text. It should be consistent with the TOC or the English 'Monitoring & Double-checking'. Note: Exact match not found in selected MDX.
3. Pass 2: logged high priority suggestion. Match: "5. [🔍 监控与金丝雀令牌](#-monitoring--canary-tokens)" Replacement: "5. [🔍 监控与双重验证](#-监控与双重验证)" Reason: The Table of Contents entry for section 5 must match the actual heading text '## 🔍 监控与双重验证' used in the body to ensure the link works and the document is consistent. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/zh/index.mdx
- 77c565c63534e5dd3b59887c9c8930bf3b4826f3 i18n candidate(zh): docker-security-for-admins-and-maintainers via openrouter/qwen/qwen3-32b:nitro
- 3ae342f0213ddaedc4d18b19e7c7d9ec41469cd5 i18n candidate(zh): docker-security-for-admins-and-maintainers via openrouter/google/gemini-3-flash-preview
- fecadd4cc0dda2b184bf2007d99b79d9025ebbd0 i18n candidate(zh): docker-security-for-admins-and-maintainers via deepseek/deepseek-v4-flash
