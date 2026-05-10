# I18n Judge Escalation: lancedb-wasm-browser-client (fr)

## Escalation Trigger

A second judge pass was run after the first, which triggered the escalation workflow. The second judge (`judge-second.md`) returned **Agree** — both judges independently selected **DeepSeek V4 Flash** (e2dfaf8355c91b5d757ba794a19ca68dbfb5b3cd). There is no substantive disagreement between the two judge passes.

The escalation report is written to close the workflow and document the final polished output.

---

## Final Selection: DeepSeek V4 Flash (e2dfaf8)

### Why V4 Flash wins

Both judges converge on the same rationale:

- **Idiomatic French throughout.** V4 Flash uses natural French technical vocabulary: *magasin d'objets*, *instantané*, *drapeau*, *paquet*, *en-têtes*. These read like a francophone technical author, not a machine translation.
- **Subtitle fidelity.** "Construire un Client de Recherche Vectorielle pour Navigateur" correctly renders the English gerund "Building" as *Construire*, preserving the instructional register. V3.2's "Créer" is a lateral move that loses some fidelity.
- **No contamination.** Unlike MiniMax M2.5 (which injected Russian, Spanish, and English words directly into French prose), V4 Flash produces clean, monolingual French.
- **Perfect MDX preservation.** All component imports, code blocks, asset paths, and frontmatter fields are intact.

### Why V3.2 is not an improvement

The second judge's detailed comparison confirms: V3.2 makes lateral or regressive changes relative to V4 Flash — replacing *jeu de données* with the anglicism *dataset*, *Paquet* with *Package*, and *bien plus simple* with the stiffer *considérablement plus simple*. No change is clearly superior; several are minor regressions in register.

### Why MiniMax M2.5 is rejected

Fatal contamination: Cyrillic (*через*), English (*mostly*, *sometimes*), and Spanish (*fáciles*) words appear inline in French prose. Additional invented vocabulary (*pulander*, *loggant*, *tragable*) and systematic orthographic errors (missing accents, mixed capitalization) make this candidate unusable.

---

## Post-Selection Polish Applied

The judge commit (`8721a5f7`) introduced one regression relative to the V4 Flash candidate: the `searchTable()` code snippet reverted the query string from the correct French `"requête de recherche sémantique"` back to the English `"semantic search query"`. This was corrected in the final polish pass.

Other judge modifications were retained:
- Added `(object store)` gloss after *magasin d'objets* — helpful for developers scanning for the Rust trait name.
- Added `(range requests)` gloss — helpful cross-reference.
- Added `(fail closed)` gloss after the French *faillir de manière sécurisée* — accurate and useful for readers who know the term.
- Section heading "Les Parties Difficiles" → "Les Points Difficiles" — minor variant, retained.

---

## Outcome

- **Selected candidate**: e2dfaf8355c91b5d757ba794a19ca68dbfb5b3cd (DeepSeek V4 Flash)
- **Final file**: `src/content/posts/2026-04-16--lancedb-wasm-browser-client/fr/index.mdx`
- **Escalation verdict**: No genuine disagreement. Both judges agree. Polish applied. Workflow closed.
- **Date**: 2026-05-09
