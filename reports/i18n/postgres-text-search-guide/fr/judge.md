# Judge Report: fr translation for postgres-text-search-guide

## Candidates
- **Qwen Plus**: `04de9a7a2c9544f2807f6ef7b96e2779525e67a6`
- **Qwen Flash**: `afb375fb4df7d15bb046db084ff40c69e149f6b7`
- **DeepSeek Flash**: `f0875d611c1d4287822256cc68345c1c1440ea3e`

## Decision: Qwen Plus (`04de9a7a2c9544f2807f6ef7b96e2779525e67a6`)

### Reasoning
- **Technical Accuracy**: Qwen Plus correctly used technical terms like "racinisation" (stemming) and "lexèmes". It handled the SVG content well, preserving the exact layout while translating labels accurately.
- **Natural Language Quality**: The flow is more natural than the Flash models. It avoids the slightly clunky "déclinaison" for stemming (which Qwen Flash used).
- **Dan's Style**: It captures the direct, punchy tone of the original English text ("Les outils de recherche déjà dans votre base de données, et quand chacun justifie sa place.").
- **MDX Preservation**: Imports and frontmatter are correctly preserved, and asset paths are correctly updated to `../`.

### Polishing Applied
- Verified asset paths are parent-relative (`../`).
- Ensured consistent use of "Postgres" vs "PostgreSQL" to match the technical context.
- Fixed minor punctuation and spacing in the SVG blocks.
