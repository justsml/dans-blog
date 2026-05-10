# Escalation Report: your-foreign-keys-are-killing-performance (fr)

**Escalation model**: anthropic/claude-sonnet-4.6 (direct human review)

## Summary

The first judge correctly selected GLM-4 (b37a8c87) as winner. The second judge disagreed — not with the candidate selection, but with the state of the working file, which had been truncated during first-judge polishing.

**Escalation decision: Uphold GLM-4. Restore the full candidate. Apply one grammar fix.**

---

## What the Disagreement Was Actually About

The judges agreed on the winner (GLM-4). The conflict was structural: the working file (121 lines) was materially shorter than the GLM-4 candidate (147 lines). The second judge correctly identified that the first judge had silently dropped content during its "polishing applied" step.

### Missing content in the working file

Sections present in the GLM-4 candidate but absent from the post-judge working file:

1. **"L'échelle est contextuelle"** — Body was almost entirely replaced with a single line. The entire Raspberry Pi vs. AWS Aurora comparison, the sharding boundary explanation, the multi-tenant SaaS scenario, and the IoT edge device example were gone.

2. **"Ce que ça donne vraiment en pratique"** — The entire section was missing: the three-question diagnostic framework, and the pattern breakdown (financial transactions, high-volume logs, historical snapshots).

In addition, several prose passages in the remaining sections had been silently altered in ways that regressed quality:

- `Commandes → LignesCommande → Produits → Variantes → Couleurs → Tailles` had been replaced with the untranslated English `Orders → OrderItems → Products → Variants → Colors → Sizes`
- `{"color": "bleu", "size": "M"}` had been changed to `{"color": "blue", "size": "M"}` (English value inside a French-language example)
- `La rupture se produit` had been softened to `Le décalage se produit` (weaker, loses Dan's directness)
- Section heading `### Les blobs opaques` had been silently renamed `### Blobs opaques`
- `Commencez à l'instantanéer` had been replaced with `Commencez à en faire un instantané` (more wordy, less punchy)

None of these changes were noted in judge.md's "Polishing applied" section, which only mentioned asset paths and `lang: fr`.

---

## Escalation Decision

The first judge's *candidate selection* was correct. GLM-4 produces more idiomatic French, preserves Dan's direct register better than DeepSeek or MiniMax, and correctly translates the schema example names. The first judge's *polishing execution* was incorrect — it introduced content loss and translation regressions.

The second judge's finding is upheld: restore the full GLM-4 candidate.

**Action taken**: The working file has been restored to match the GLM-4 candidate exactly (b37a8c872d8a1b73464b782116b48973fcacfce3), with one additional grammar fix:

- `de quelle couleur était **le** chemise` → `de quelle couleur était **la** chemise` (grammatical gender agreement: *chemise* is feminine)

This is the only change from the raw candidate. All missing sections are restored. All prose regressions are reversed.

---

## Candidate Comparison (for reference)

| Criterion | GLM-4 (b37a8c87) | DeepSeek (5cbc0618) | MiniMax (77a9087f) |
|---|---|---|---|
| Schema names translated | Yes (`Commandes`, `LignesCommande`) | Partial | Partial |
| "roulettes" for training wheels | Yes (idiomatic) | "roues d'apprentissage" | "roues d'apprentissage" |
| Completeness (lines) | 147 | 145 | 145 |
| Dan's register | Direct, punchy | Slightly formal | Slightly formal |
| Asset paths | `../` (correct) | `../` (correct) | `../` (correct) |

GLM-4 remains the correct winner.

---

## Final File

`src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/fr/index.mdx`

147 lines. Full content restored. One grammar fix applied (`le chemise` → `la chemise`).
