# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: ja
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.313)
- Confidence signals: 3 high and 0 medium issues; single judge
- High/medium/low issue counts: 3/0/0
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale ja --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale ja --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx failed structural parity with score 0.667 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Code fence count or language order changed. Image count or target sequence changed. Alt text count or length profile changed. Differences: {"h1":15,"h3":1,"h4":4,"links":2,"codeFences":3,"images":1,"altTexts":1,"components":1,"headingSequence":20,"codeFenceLanguages":13,"linkTargets":8,"imageTargets":1,"componentSequence":1}. Differences: {"h1":15,"h3":1,"h4":4,"links":2,"codeFences":3,"images":1,"altTexts":1,"components":1,"headingSequence":20,"codeFenceLanguages":13,"linkTargets":8,"imageTargets":1,"componentSequence":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.08
- Input tokens: 38090
- Output tokens: 408
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.020269
- Estimated cost: $0.020269

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 6.29
- Input tokens: 28161
- Output tokens: 468
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015485
- Estimated cost: $0.015485

### Pass 2
- Runtime seconds: 4.46
- Input tokens: 28044
- Output tokens: 554
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015684
- Estimated cost: $0.015684

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "import {CodeTabs} from '../../../../../components/CodeTabs';" Replacement: "import {CodeTabs} from '../../../../components/CodeTabs';" Reason: The import path is too deep. It should be 4 levels up from the locale folder to reach components. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "import {CodeTabs} from '../../../../../components/CodeTabs';" Replacement: "import {CodeTabs} from '../../../../components/CodeTabs';" Reason: The import path is too deep. It should be 4 levels up from the locale folder to reach components. Note: Applied exact replacement to selected MDX.
3. Pass 2: applied high priority suggestion. Match: "[勇者へ](#️-for-the-brave)" Replacement: "[勇者へ](#-for-the-brave)" Reason: The anchor fragment contains an invisible or malformed character (likely a variation selector) that prevents the link from resolving to the heading ID. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ja/index.mdx
- a6785435c38891c66a4564508617c9ddf9796547 i18n candidate(ja): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 73da8dab0f3738ba204db60554e0560657e20dd5 i18n candidate(ja): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
