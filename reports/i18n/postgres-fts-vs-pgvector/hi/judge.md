# i18n Judge: hi for postgres-fts-vs-pgvector

## Decision
Selected `08ed9d2a4ad6c76fb1a000cccda1a1be8d301edd` as the base candidate.

## Reasoning
The selected candidate (via `openrouter/qwen/qwen3.6-plus`) is structurally sound and linguistically accurate. It correctly translates technical concepts like "Full-text search", "Trigrams", and "Vector search" while maintaining the necessary English terms for code blocks and specific tool names. 

The Hindi prose is natural and uses appropriate technical transliteration (e.g., using "सिंक" for sync, "बिल" for bill) which is standard in Hinglish-leaning technical documentation.

## Light Polishing Applied
- Verified that all MDX components (`<Challenge>`, etc.) are intact, although this post primarily uses standard MDX and images.
- Ensured asset paths like `../search-tool-map.svg` are correctly parent-relative for the nested locale directory.
- Minor grammatical flow adjustments in the introduction.

## Candidate Comparison
- `08ed9d2a`: Primary choice. High quality, preserved all structural elements.
- `e73e9577`: Very similar (same model family), but `08ed9d2a` was requested as the preference.
- `17839906`: Also similar, no significant advantages over the selected candidate.
