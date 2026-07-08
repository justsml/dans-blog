# Translation Judge Summary

- Slug: docker-security-tips-for-self-hosting
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.313)
- Confidence signals: 10 high and 0 medium issues; single judge
- High/medium/low issue counts: 10/0/0
- Validation error: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug docker-security-tips-for-self-hosting --locale de --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx failed structural parity with score 0.762 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Code fence count or language order changed. MDX component order changed. Differences: {"h1":15,"h2":4,"h3":2,"h4":5,"links":12,"codeFences":3,"components":1,"headingSequence":26,"codeFenceLanguages":12,"linkTargets":22,"componentSequence":1}. Differences: {"h1":15,"h2":4,"h3":2,"h4":5,"links":12,"codeFences":3,"components":1,"headingSequence":26,"codeFenceLanguages":12,"linkTargets":22,"componentSequence":1}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 6.03
- Input tokens: 39275
- Output tokens: 824
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.022110
- Estimated cost: $0.022110

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 6.40
- Input tokens: 29163
- Output tokens: 1053
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.017740
- Estimated cost: $0.017740

### Pass 2
- Runtime seconds: 6.14
- Input tokens: 29163
- Output tokens: 1053
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.017740
- Estimated cost: $0.017740

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "- 🧗‍♀️ [Für die Mutigen](#️-for-the-brave)" Replacement: "- 🧗‍♀️ [Für die Mutigen](#-für-die-mutigen)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "- 🔄 [Der `:latest` Tanz](#-the-latest-dance)" Replacement: "- 🔄 [Der `:latest` Tanz](#-der-latest-tanz)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "- 🔐 [Geheimnisverwaltung: Der Richtige Weg](#-secrets-management)" Replacement: "- 🔐 [Geheimnisverwaltung: Der Richtige Weg](#-geheimnisverwaltung-der-richtige-weg)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "- 🌐 [Netzwerkgefahr](#-network-hazard)" Replacement: "- 🌐 [Netzwerkgefahr](#-netzwerkgefahr)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
5. Pass 1: applied high priority suggestion. Match: "- 🛡️ [Zugriffskontrollen](#️-access-controls)" Replacement: "- 🛡️ [Zugriffskontrollen](#-zugriffskontrollen)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
6. Pass 1: applied high priority suggestion. Match: "- 🔍 [Monitoring & Verifikation](#-monitoring--verification)" Replacement: "- 🔍 [Monitoring & Verifikation](#-monitoring--verifikation)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
7. Pass 1: applied high priority suggestion. Match: "- ⏰ [Häufig Übersehene Tipps](#-often-overlooked-tips)" Replacement: "- ⏰ [Häufig Übersehene Tipps](#-häufig-übersehene-tipps)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
8. Pass 1: applied high priority suggestion. Match: "- 🚀 [Produktions‑Checkliste](#-production-checklist)" Replacement: "- 🚀 [Produktions‑Checkliste](#-produktionscheckliste)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
9. Pass 1: applied high priority suggestion. Match: "- 📚 [Weiterführende Literatur](#-further-reading)" Replacement: "- 📚 [Weiterführende Literatur](#-weiterführende-literatur)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
10. Pass 1: applied high priority suggestion. Match: "<pclassName='inset'>" Replacement: "<p className='inset'>" Reason: Broken HTML/JSX tag: missing space between tag name and attribute. Note: Applied exact replacement to selected MDX.
11. Pass 2: applied high priority suggestion. Match: "- 🧗‍♀️ [Für die Mutigen](#️-for-the-brave)" Replacement: "- 🧗‍♀️ [Für die Mutigen](#-für-die-mutigen)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
12. Pass 2: applied high priority suggestion. Match: "- 🔄 [Der `:latest` Tanz](#-the-latest-dance)" Replacement: "- 🔄 [Der `:latest` Tanz](#-der-latest-tanz)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
13. Pass 2: applied high priority suggestion. Match: "- 🔐 [Geheimnisverwaltung: Der Richtige Weg](#-secrets-management)" Replacement: "- 🔐 [Geheimnisverwaltung: Der Richtige Weg](#-geheimnisverwaltung-der-richtige-weg)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
14. Pass 2: applied high priority suggestion. Match: "- 🌐 [Netzwerkgefahr](#-network-hazard)" Replacement: "- 🌐 [Netzwerkgefahr](#-netzwerkgefahr)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
15. Pass 2: applied high priority suggestion. Match: "- 🛡️ [Zugriffskontrollen](#️-access-controls)" Replacement: "- 🛡️ [Zugriffskontrollen](#-zugriffskontrollen)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
16. Pass 2: applied high priority suggestion. Match: "- 🔍 [Monitoring & Verifikation](#-monitoring--verification)" Replacement: "- 🔍 [Monitoring & Verifikation](#-monitoring--verifikation)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
17. Pass 2: applied high priority suggestion. Match: "- ⏰ [Häufig Übersehene Tipps](#-often-overlooked-tips)" Replacement: "- ⏰ [Häufig Übersehene Tipps](#-häufig-übersehene-tipps)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
18. Pass 2: applied high priority suggestion. Match: "- 🚀 [Produktions‑Checkliste](#-production-checklist)" Replacement: "- 🚀 [Produktions‑Checkliste](#-produktionscheckliste)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
19. Pass 2: applied high priority suggestion. Match: "- 📚 [Weiterführende Literatur](#-further-reading)" Replacement: "- 📚 [Weiterführende Literatur](#-weiterführende-literatur)" Reason: The link fragment must match the localized heading ID generated from the translated text. Note: Applied exact replacement to selected MDX.
20. Pass 2: applied high priority suggestion. Match: "<pclassName='inset'>" Replacement: "<p className='inset'>" Reason: Broken HTML/JSX tag: missing space between tag name and attribute. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx
- 5f7fcc6153c55cf63abf36594478c66758e76603 i18n candidate(de): docker-security-tips-for-self-hosting via openrouter/openai/gpt-oss-120b:nitro
- 1f4c701d50299fa90b814367ee24b3abff368161 i18n candidate(de): docker-security-tips-for-self-hosting via openrouter/qwen/qwen3-32b:nitro
