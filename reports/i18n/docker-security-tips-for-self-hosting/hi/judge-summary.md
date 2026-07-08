# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.319)
- Confidence signals: 1 high and 0 medium issues; single judge
- High/medium/low issue counts: 1/0/0
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale hi --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale hi --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/hi/index.mdx failed structural parity with score 0.768 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/hi/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Code fence count or language order changed. MDX component order changed. Differences: {"h1":15,"h2":4,"h3":2,"h4":5,"links":12,"codeFences":2,"components":1,"headingSequence":26,"codeFenceLanguages":12,"linkTargets":18,"componentSequence":1}. Differences: {"h1":15,"h2":4,"h3":2,"h4":5,"links":12,"codeFences":2,"components":1,"headingSequence":26,"codeFenceLanguages":12,"linkTargets":18,"componentSequence":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.36
- Input tokens: 39649
- Output tokens: 322
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.020790
- Estimated cost: $0.020790

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.16
- Input tokens: 28485
- Output tokens: 366
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.015340
- Estimated cost: $0.015340

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "import {CodeTabs} from '../../../../../components/CodeTabs';" Replacement: "import {CodeTabs} from '../../../../components/CodeTabs';" Reason: The import path is too deep. It should be four levels up (../../../../) to reach the components directory from the locale-specific post folder. Note: Applied exact replacement to selected MDX.
2. Pass 2: logged high priority suggestion. Match: "import {CodeTabs} from '../../../../components/CodeTabs';" Replacement: "import {CodeTabs} from '../../../../components/CodeTabs';" Reason: The import path in the provided candidate was already correct at 4 levels deep, but the judge report incorrectly flagged it. No change is actually needed to the path in the candidate, but I am verifying the candidate's existing correct path. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/hi/index.mdx
- 6e71ade27afda2f6e40db61d256cd6f3075e2a0c i18n candidate(hi): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 13e9a080a5e591f3f7d4ad893403ca81fa69e797 i18n candidate(hi): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
