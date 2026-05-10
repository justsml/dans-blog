# Judge Report: de translation for semantic-vector-search-landscape

## Candidates
- **Qwen** (a5cf7f8): `i18n candidate(de): semantic-vector-search-landscape via openrouter/qwen/qwen3.6-plus`
- **DeepSeek** (f8a778a): `i18n candidate(de): semantic-vector-search-landscape via openrouter/deepseek/deepseek-v4-flash`
- **MiniMax** (f0e3ede): `i18n candidate(de): semantic-vector-search-landscape via openrouter/minimax/minimax-m2.7`

## Decision: Qwen (a5cf7f8)

### Reasoning
- **Technical Accuracy**: Qwen provides the most accurate and nuanced German technical terminology (e.g., "Vokabularpositionen feuern", "Arbeitsspeicher-residente Indizes").
- **Natural Language Quality**: Qwen's flow is the most natural in German. MiniMax's subtitle "Themen, um Freunde zu gewinnen und zu beeindrucken" is a bit literal/stiff compared to Qwen's "Themen, mit denen man Freunde und Liebhaber gewinnt" (which matches the "Win Friends and Influence People" wordplay better).
- **Dan's Direct Style**: Qwen captures the punchy, slightly cynical yet deeply technical voice best. Phrases like "Vektorsuche ohne Filterung ist eine Demo" (Vector search without filtering is a demo) feel authentically like Dan.
- **MDX Preservation**: All candidates did well, but Qwen's handling of complex table structures and code blocks was the cleanest.

### Polish Applied
- Standardized asset paths to `../` for localized directory structure.
- Lightly tweaked some technical headers for consistency with the blog's other German posts.
- Ensured "Engineers" remains used where Dan prefers it over "Ingenieure".
