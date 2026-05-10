# I18n Judge Second Review: lancedb-wasm-browser-client (fr)

## Verdict: **Agree** with selection of DeepSeek V4 Flash (e2dfaf8355c91b5d757ba794a19ca68dbfb5b3cd)

No escalation required. The current `fr/index.mdx` (V4 Flash) is the correct choice.

## Candidate Analysis

### DeepSeek V4 Flash (e2dfaf) — Already selected
- Idiomatic, natural technical French throughout.
- Correctly uses French terms ("magasin d'objets", "instantané", "paquet", "drapeau").
- Maintains Dan's conversational but expert tone.
- Perfect MDX preservation.

### DeepSeek V3.2 (f6b395) — Not an improvement
Makes lateral or slightly worse changes:
- Changes "Construire" → "Créer" in subtitle (original English says "Building", so "Construire" is more faithful).
- Uses anglicisms: "dataset" replaces "jeu de données" in snapshot bullets, "Package" replaces "Paquet".
- Changes "bien plus simple" → "considérablement plus simple" (less natural).
- Changes "Artefacts" → "Artéfacts" (variant spelling, not wrong but unnecessary).

No critical errors, but no improvements either — strictly a regression from V4 Flash.

### MiniMax M2.5 (7b1cfb) — Rejected. Multiple critical failures.

**Foreign-language contamination (fatal):**
- `через` (Russian preposition) appears in Transformers wrapper section
- `mostly` and `sometimes` left as English in French prose
- `fáciles` (Spanish) appears in "Ce que je ferais différemment"
- `pulander` — not a French word at all (garble of "poser" + "landing")
- `loggant` — English "logging" rendered as pseudo-French
- `tragable` — not a French word (garble of "réalisable")

**Anglicisms and terminology drift:**
- Title uses "serverless" instead of French "sans serveur"
- "object store" used throughout instead of "magasin d'objets"
- "flag" instead of "drapeau"
- "headers" instead of "en-têtes"

**Accent and orthographic errors:**
- "reside" (→ réside), "là ou" (→ là où), "texte integral" (→ intégral)
- "héberges" (→ hébergés), "sottement" (→ subtilement — meaning change too)
- Inconsistent capitalization on headings

These issues make the MiniMax candidate unusable.