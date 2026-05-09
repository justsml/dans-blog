# Judge Report: postgres-fts-vs-pgvector (fr)

## Candidates

1.  **af5dcba357a20895c053b73aaaa634d3e14d3fc1** (DeepSeek V4 Flash)
2.  **cbcc5c43a8c49d3f13b6cf258951f9360c13541c** (Gemini 2.5 Flash-lite)
3.  **acfb849c700206b68b42b075f89d8656282f2fcf** (Qwen 3.6 Plus)

## Decision

**Winner: DeepSeek V4 Flash (af5dcba)**

## Reasoning

*   **Natural Language Quality:** DeepSeek provided the most idiomatic French translation. It correctly translated "at scale" as "à grande échelle" and "sources of truth to keep honest" as "sources de vérité à synchroniser" (avoiding the literal and awkward "maintenir honnêtes" found in Gemini).
*   **Technical Accuracy:** All models handled the technical terms well, but DeepSeek's use of "racinise" for "stemming" is very standard in French NLP contexts. Qwen used "radicalise", which is also correct but "racinise" feels slightly more precise for search engines.
*   **Dan's Style:** DeepSeek maintained the direct, punchy tone of the original English text. It avoided the slightly more verbose constructions of Qwen and the literalisms of Gemini.
*   **MDX Preservation:** DeepSeek preserved all MDX components, frontmatter, and asset paths correctly. It included the `cover_icon` which Gemini missed.

## Polishing Improvements

*   Unified the use of "raciniser" for consistency.
*   Ensured consistent punctuation in list items.
*   Verified that parent-relative asset paths (e.g., `../wide.webp`) were preserved to ensure correct rendering in the `/fr/` sub-route.
*   Adjusted the translation of "stemming" to include the technical term in parentheses where helpful.

## Finalization Note

The primary judge selected DeepSeek V4 Flash but wrote a truncated working tree. The second judge caught the truncation and agreed that DeepSeek was the best candidate. The final file restores the complete 399-line DeepSeek candidate and applies only the small fixes listed in `judge-second.md`.
