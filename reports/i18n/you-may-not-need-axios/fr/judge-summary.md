# Translation Judge Summary

- Slug: you-may-not-need-axios
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.315)
- Confidence signals: 9 high and 0 medium issues; single judge
- High/medium/low issue counts: 9/0/0
- Validation error: Command failed: bun run i18n:validate --slug you-may-not-need-axios --locale fr --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug you-may-not-need-axios --locale fr --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2018-11-15--you-may-not-need-axios/fr/index.mdx failed structural parity with score 0.953 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2018-11-15--you-may-not-need-axios/fr/index.mdx: Headings changed or moved. Link count or href sequence changed across Markdown/HTML link formats. Differences: {"h3":1,"headingSequence":5,"linkTargets":19}. Differences: {"h3":1,"headingSequence":5,"linkTargets":19}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 5.83
- Input tokens: 13262
- Output tokens: 810
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.009061
- Estimated cost: $0.009061

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 5.32
- Input tokens: 10586
- Output tokens: 1029
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008380
- Estimated cost: $0.008380

### Pass 2
- Runtime seconds: 5.91
- Input tokens: 10593
- Output tokens: 1029
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008384
- Estimated cost: $0.008384

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "import Gist from '../../../../../components/Gist/index.astro'" Replacement: "import Gist from '../../../../components/Gist/index.astro'" Reason: The import path is too deep. In src/content/posts/YYYY-MM-DD--slug/fr/index.mdx, it should be 4 levels up to reach src/components. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "- [Aperçu](#apercu)" Replacement: "- [Aperçu](#aperçu)" Reason: The slug for 'Aperçu' is #aperçu, not #apercu. The link is broken. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "- [En-têtes personnalisés](#en-tetes-personnalises)" Replacement: "- [En-têtes personnalisés](#en-têtes-personnalisées)" Reason: The heading is 'En-têtes personnalisées', so the link must match the slug. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "- [Données encodées en formulaire](#donnees-encodees-en-formulaire)" Replacement: "- [Données encodées en formulaire](#données-encodées-en-formulaire)" Reason: Slug mismatch. Note: Applied exact replacement to selected MDX.
5. Pass 1: applied high priority suggestion. Match: "- [Téléverser un fichier](#televerser-un-fichier)" Replacement: "- [Téléverser un fichier](#téléchargement-dun-fichier)" Reason: The heading text is 'Téléchargement d'un fichier', not 'Téléverser'. Note: Applied exact replacement to selected MDX.
6. Pass 1: applied high priority suggestion. Match: "- [Téléverser plusieurs fichiers](#televerser-plusieurs-fichiers)" Replacement: "- [Téléverser plusieurs fichiers](#téléchargement-de-plusieurs-fichiers)" Reason: Heading text mismatch. Note: Applied exact replacement to selected MDX.
7. Pass 1: applied high priority suggestion. Match: "- [Délais d'attente](#delais-dattente)" Replacement: "- [Délais d'attente](#délais-dexpiration-timeouts)" Reason: Heading text mismatch. Note: Applied exact replacement to selected MDX.
8. Pass 1: applied high priority suggestion. Match: "- [Annulation d'une requête fetch](#annulation-dune-requete-fetch)" Replacement: "- [Annulation d'une requête fetch](#annulation-dune-requête-fetch)" Reason: Slug mismatch. Note: Applied exact replacement to selected MDX.
9. Pass 1: applied high priority suggestion. Match: "- [Compatibilité](#compatibilite)" Replacement: "- [Compatibilité](#compatibilité)" Reason: Slug mismatch. Note: Applied exact replacement to selected MDX.
10. Pass 2: applied high priority suggestion. Match: "import Gist from '../../../../../components/Gist/index.astro'" Replacement: "import Gist from '../../../../components/Gist/index.astro'" Reason: The import path is too deep. In src/content/posts/YYYY-MM-DD--slug/fr/index.mdx, it should be 4 levels up to reach src/components. Note: Applied exact replacement to selected MDX.
11. Pass 2: applied high priority suggestion. Match: "- [Aperçu](#apercu)" Replacement: "- [Aperçu](#aperçu)" Reason: The slug for 'Aperçu' is #aperçu, not #apercu. The link is broken. Note: Applied exact replacement to selected MDX.
12. Pass 2: applied high priority suggestion. Match: "- [En-têtes personnalisés](#en-tetes-personnalises)" Replacement: "- [En-têtes personnalisés](#en-têtes-personnalisées)" Reason: The heading is 'En-têtes personnalisées', so the link must match the slug. Note: Applied exact replacement to selected MDX.
13. Pass 2: applied high priority suggestion. Match: "- [Données encodées en formulaire](#donnees-encodees-en-formulaire)" Replacement: "- [Données encodées en formulaire](#données-encodées-en-formulaire)" Reason: Slug mismatch due to missing accents in the fragment. Note: Applied exact replacement to selected MDX.
14. Pass 2: applied high priority suggestion. Match: "- [Téléverser un fichier](#televerser-un-fichier)" Replacement: "- [Téléverser un fichier](#téléchargement-dun-fichier)" Reason: The heading text is 'Téléchargement d'un fichier', not 'Téléverser'. Note: Applied exact replacement to selected MDX.
15. Pass 2: applied high priority suggestion. Match: "- [Téléverser plusieurs fichiers](#televerser-plusieurs-fichiers)" Replacement: "- [Téléverser plusieurs fichiers](#téléchargement-de-plusieurs-fichiers)" Reason: Heading text mismatch. Note: Applied exact replacement to selected MDX.
16. Pass 2: applied high priority suggestion. Match: "- [Délais d'attente](#delais-dattente)" Replacement: "- [Délais d'attente](#délais-dexpiration-timeouts)" Reason: Heading text mismatch. Note: Applied exact replacement to selected MDX.
17. Pass 2: applied high priority suggestion. Match: "- [Annulation d'une requête fetch](#annulation-dune-requete-fetch)" Replacement: "- [Annulation d'une requête fetch](#annulation-dune-requête-fetch)" Reason: Slug mismatch. Note: Applied exact replacement to selected MDX.
18. Pass 2: applied high priority suggestion. Match: "- [Compatibilité](#compatibilite)" Replacement: "- [Compatibilité](#compatibilité)" Reason: Slug mismatch. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2018-11-15--you-may-not-need-axios/fr/index.mdx
- b566b4f6175aeffa8433c0165a2ca94be21c5e40 i18n candidate(fr): you-may-not-need-axios via openrouter/openai/gpt-oss-120b:nitro
- 84d37ea4004a2a6114aa909b0e6b6f352ef36aba i18n candidate(fr): you-may-not-need-axios via openrouter/qwen/qwen3-32b:nitro
