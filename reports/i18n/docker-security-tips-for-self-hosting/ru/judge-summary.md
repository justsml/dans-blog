# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: ru
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale ru --skip-global
109 |     })
110 |     .filter((message): message is string => message != null);
111 | 
112 |   if (mismatches.length === 0) return;
113 | 
114 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ru/index.mdx changed heading counts. H1: English has 0, translation has 15; H2: English has 10, translation has 9; H3: English has 17, translation has 14; H4: English has 11, translation has 8
      at assertHeadingCounts (/Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:114:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:27:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 5.18
- Input tokens: 39112
- Output tokens: 759
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.021833

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "# [Для отважных](#️-for-the-brave)" Replacement: "# [Для отважных](#️-для-отважных)" Reason: The anchor link in the table of contents must match the translated heading ID for navigation to work. Note: Exact match not found in selected MDX.
2. Pass 1: logged high priority suggestion. Match: "# [Танец `:latest`](#-the-latest-dance)" Replacement: "# [Танец `:latest`](#-танец-latest)" Reason: The anchor link in the table of contents must match the translated heading ID for navigation to work. Note: Exact match not found in selected MDX.
3. Pass 1: logged high priority suggestion. Match: "# [Управление секретами: правильный путь](#-secrets-management)" Replacement: "# [Управление секретами: правильный путь](#-управление-секретами)" Reason: The anchor link in the table of contents must match the translated heading ID for navigation to work. Note: Exact match not found in selected MDX.
4. Pass 1: logged high priority suggestion. Match: "# [Сетевой риск](#-network-hazard)" Replacement: "# [Сетевой риск](#-сетевая-опасность)" Reason: The anchor link in the table of contents must match the translated heading ID for navigation to work. Note: Exact match not found in selected MDX.
5. Pass 1: logged high priority suggestion. Match: "# [Контроль доступа](#️-access-controls)" Replacement: "# [Контроль доступа](#️-управление-доступом)" Reason: The anchor link in the table of contents must match the translated heading ID for navigation to work. Note: Exact match not found in selected MDX.
6. Pass 1: logged high priority suggestion. Match: "# [Мониторинг и проверка](#-monitoring--verification)" Replacement: "# [Мониторинг и проверка](#-мониторинг-и-проверка)" Reason: The anchor link in the table of contents must match the translated heading ID for navigation to work. Note: Exact match not found in selected MDX.
7. Pass 1: logged high priority suggestion. Match: "# [Часто упускаемые советы](#-often-overlooked-tips)" Replacement: "# [Часто упускаемые советы](#-часто-упускаемые-советы)" Reason: The anchor link in the table of contents must match the translated heading ID for navigation to work. Note: Exact match not found in selected MDX.
8. Pass 1: logged high priority suggestion. Match: "# [Контрольный список для продакшна](#-production-checklist)" Replacement: "# [Контрольный список для продакшна](#-production-checklist)" Reason: The anchor link in the table of contents must match the translated heading ID for navigation to work. Note: Exact match and replacement are identical; no MDX change needed.
9. Pass 1: logged high priority suggestion. Match: "# [Дополнительные материалы](#-further-reading)" Replacement: "# [Дополнительные материалы](#-further-reading)" Reason: The anchor link in the table of contents must match the translated heading ID for navigation to work. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ru/index.mdx
- 13c5f36b0d3377eec06b479dc3a6654ad0951066 i18n candidate(ru): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- ebc0629f2ef7429dc1f1c48dc471675f7862eba2 i18n candidate(ru): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
