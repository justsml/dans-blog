# I18n Judge Report: Stop Burying Prompts in Code (FR)

## Candidates
- **Qwen 3.6 Plus** (4955643): Good, but used "Arrêtez d'Enterrer" (capitalized) and "Edit de string" (a bit too literal).
- **DeepSeek V4 Flash** (e880876): **Selected.** High technical accuracy (uses RAG correctly), natural flow, and stays closest to Dan's direct, no-nonsense style.
- **MiniMax M2.7** (5315459): Decent, but "ajustement prompt" is clunky and "rollback" was left untranslated.

## Decision: DeepSeek V4 Flash
DeepSeek produced the most idiomatic French while preserving the technical weight. It correctly translated "load-bearing" as "porteur" (though "load-bearing" is often "porteur" in architecture, "critique" or "indispensable" also work; kept "porteur" as it matches the "architecture" metaphor).

## Polishes Applied
- Replaced some non-breaking spaces that caused tool friction.
- Polished "enterrée" to "enfouie" for better technical nuance.
- Refined "contrôle le comportement" to "pilote le comportement" for better "Dan flavor".
- Ensured "RAG" (DeepSeek used it) was consistent (Minimax used "retrieval").
- Added "(presque)" to "ennuyeux à modifier" to match the dry humor.
