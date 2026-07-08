# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 3
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.317)
- Confidence signals: 4 high and 0 medium issues; single judge
- High/medium/low issue counts: 4/0/0
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale de --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx failed structural parity with score 0.848 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Code fence count or language order changed. Differences: {"h1":5,"h2":1,"h3":3,"h4":7,"links":11,"codeFences":1,"headingSequence":16,"codeFenceLanguages":5,"linkTargets":24}. Differences: {"h1":5,"h2":1,"h3":3,"h4":7,"links":11,"codeFences":1,"headingSequence":16,"codeFenceLanguages":5,"linkTargets":24}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.83
- Input tokens: 49071
- Output tokens: 398
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.025729
- Estimated cost: $0.025729

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 12.10
- Input tokens: 28478
- Output tokens: 839
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016756
- Estimated cost: $0.016756

### Pass 2
- Runtime seconds: 4.90
- Input tokens: 28799
- Output tokens: 700
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016500
- Estimated cost: $0.016500

### Pass 3
- Runtime seconds: 4.29
- Input tokens: 28653
- Output tokens: 708
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016450
- Estimated cost: $0.016450

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "import {CodeTabs} from '../../../../components/CodeTabs';" Replacement: "import {CodeTabs} from '../../../../../components/CodeTabs';" Reason: The locale file is one folder deeper than the English source; it needs an additional ../ to reach the components directory. Note: Applied exact replacement to selected MDX.
2. Pass 1: logged high priority suggestion. Match: "- [Upgrade von `.env` zum macOS‑Schlüsselbund](#upgrade-from-env-to-macos-keychain)" Replacement: "- [Upgrade von `.env` zum macOS‑Schlüsselbund](#upgrade-from-env-to-macos-keychain)" Reason: The link fragment must match the generated ID from the heading 'Upgrade von .env zu macOS-Schlüsselbund', which would be #upgrade-von-env-zu-macos-schlüsselbund. Note: Exact match and replacement are identical; no MDX change needed.
3. Pass 2: logged high priority suggestion. Match: "import {CodeTabs} from '../../../../../components/CodeTabs';" Replacement: "import {CodeTabs} from '../../../components/CodeTabs';" Reason: The import path in the candidate is too deep. The file is at src/content/posts/[slug]/de/index.mdx, so it needs three levels (../../../) to reach src/components/. Note: Exact match not found in selected MDX.
4. Pass 2: applied high priority suggestion. Match: "- 🧗‍♀️ [Für die Mutigen](#️-für-die-mutigen)" Replacement: "- 🧗‍♀️ [Für die Mutigen](#-für-die-mutigen)" Reason: The anchor link contains an invisible character or incorrect emoji handling that will break the link to the heading '## 🧗‍♀️ Für die Mutigen'. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "- [Starke Secrets erzeugen](#generate-strong-secrets) - [Canary Tokens](#canary-tokens) - [Upgrade von `.env` zum macOS‑Schlüsselbund](#upgrade-from-env-to-macos-keychain)" Replacement: "- [Starke Secrets erzeugen](#starke-secrets-erzeugen) - [Canary Tokens](#canary-tokens) - [Upgrade von `.env` zum macOS‑Schlüsselbund](#upgrade-von-env-zu-macos-schlüsselbund)" Reason: Same-page heading links must use localized slugs derived from the translated heading text to function correctly. Note: Applied exact replacement to selected MDX.
6. Pass 2: applied high priority suggestion. Match: "Stellen Sie einfach sicher, dass Sie Ihre Konfiguration **[prüfen Sie Ihre Konfiguration.](#uberwachung-verifikation)**." Replacement: "Stellen Sie einfach sicher, dass Sie Ihre Konfiguration **[verifizieren](#-überwachung--verifikation)**." Reason: The link fragment #uberwachung-verifikation is stale/incorrect and the phrasing is redundant. It should point to the localized ID of the Monitoring section. Note: Applied exact replacement to selected MDX.
7. Pass 2: applied high priority suggestion. Match: "sudo lsof -i:80 -Pn ``` # ESTABLISHED‑Verbindungen überwachen" Replacement: "sudo lsof -i:80 -Pn # ESTABLISHED‑Verbindungen überwachen" Reason: Broken code block. The closing fence was placed prematurely, leaving the rest of the shell commands as raw text. Note: Applied exact replacement to selected MDX.
8. Pass 3: applied high priority suggestion. Match: "import {CodeTabs} from '../../../../components/CodeTabs';" Replacement: "import {CodeTabs} from '../../../components/CodeTabs';" Reason: The import path is too deep. The file is at src/content/posts/[slug]/de/index.mdx, so it needs three levels (../../../) to reach src/components/. Note: Applied exact replacement to selected MDX.
9. Pass 3: logged high priority suggestion. Match: "- 🧗‍♀️ [Für die Mutigen](#-für-die-mutigen)" Replacement: "- 🧗‍♀️ [Für die Mutigen](#für-die-mutigen)" Reason: The anchor link contains an invisible character or incorrect emoji handling that will break the link to the heading '## 🧗‍♀️ Für die Mutigen'. Note: Exact match not found in selected MDX.
10. Pass 3: logged high priority suggestion. Match: "- [Starke Secrets erzeugen](#starke-secrets-erzeugen) - [Canary Tokens](#canary-tokens) - [Upgrade von `.env` zum macOS‑Schlüsselbund](#upgrade-von-env-zu-macos-schlüsselbund)" Replacement: "- [Starke Secrets erzeugen](#starke-secrets-erzeugen) - [Canary Tokens](#canary-tokens) - [Upgrade von `.env` zum macOS‑Schlüsselbund](#upgrade-von-env-zu-macos-schlüsselbund)" Reason: Same-page heading links must use localized slugs derived from the translated heading text to function correctly. Note: Exact match and replacement are identical; no MDX change needed.
11. Pass 3: logged high priority suggestion. Match: "Stellen Sie einfach sicher, dass Sie Ihre Konfiguration **[verifizieren](#-überwachung--verifikation)**." Replacement: "Stellen Sie einfach sicher, dass Sie Ihre Konfiguration **[verifizieren](#-überwachung--verifikation)**." Reason: The link fragment must match the generated ID of the Monitoring section. Note: Exact match and replacement are identical; no MDX change needed.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx
- 5f7fcc6153c55cf63abf36594478c66758e76603 i18n candidate(de): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 1f4c701d50299fa90b814367ee24b3abff368161 i18n candidate(de): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
- 2c5d0c69cd08d9c0aaf980502884aef87c984402 i18n candidate(de): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
