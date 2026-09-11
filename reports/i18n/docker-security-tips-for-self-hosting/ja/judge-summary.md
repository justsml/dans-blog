# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: ja
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.350)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale ja --skip-global
256 | export function assertStructuralParity(input: CompareMdxStructureInput) {
257 |   const comparison = compareMdxStructure(input);
258 |   if (comparison.valid) return;
259 | 
260 |   const targetLabel = input.targetPath ?? "translation";
261 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx failed structural parity with score 0.664 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Code fence count or language order changed. Image count or target sequence changed. Alt text count or length profile changed. Differences: {"h1":15,"h3":1,"h4":4,"links":2,"codeFences":3,"images":1,"altTexts":1,"components":1,"headingSequence":20,"codeFenceLanguages":13,"linkTargets":10,"imageTargets":1,"componentSequence":1}. Differences: {"h1":15,"h3":1,"h4":4,"links":2,"codeFences":3,"images":1,"altTexts":1,"components":1,"headingSequence":20,"codeFenceLanguages":13,"linkTargets":10,"imageTargets":1,"componentSequence":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:261:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 6.29
- Input tokens: 47193
- Output tokens: 650
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.037832
- Estimated cost: $0.037832

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 9.73
- Input tokens: 28440
- Output tokens: 1311
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.026246
- Estimated cost: $0.026246

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "import {CodeTabs} from '../../../../components/CodeTabs';" Replacement: "import {CodeTabs} from '../../../../components/CodeTabs';" Reason: Ensure proper component import depth Note: Exact match and replacement are identical; no MDX change needed.
2. Pass 1: applied high priority suggestion. Match: "- 🧗‍♀️ [勇者へ](#️-勇者へ) - 🔄 [`:latest` ダンス](#-the-latest-dance) - 🔐 [シークレット管理：正しいやり方](#-シークレット管理) - 🌐 [ネットワークリスク](#-ネットワークリスク) - 🛡️ [アクセス制御](#️-access-controls) - 🔍 [監視と検証](#..." Replacement: "- 🧗‍♀️ [勇者へ](#️-勇者へ) - 🔄 [`:latest` ダンス](#-latest-ダンス) - 🔐 [シークレット管理：正しいやり方](#-シークレット管理正しいやり方) - 🌐 [ネットワークリスク](#-ネットワークリスク) - 🛡️ [アクセス制御](#️-アクセス制御) - 🔍 [監視と検証](#-監視と検証) -..." Reason: Table of contents links must resolve to localized heading slugs instead of stale English slugs or mismatched text Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "exact translated text currently in the selected MDX" Replacement: "exact replacement text to write into the selected MDX" Reason: English explanation of why this medium/high-priority change is needed Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx
- a6785435c38891c66a4564508617c9ddf9796547 i18n candidate(ja): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 73da8dab0f3738ba204db60554e0560657e20dd5 i18n candidate(ja): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
- 24e3086de3a09c7cb56656b5e6136da500c187e9 i18n candidate(ja): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
