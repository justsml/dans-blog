# Judge Report: mastra-mcp-tool-integrations (fr)

## Decision: Choose DeepSeek-V4-Flash (fc09e358) with light polish

### Candidate Evaluation

| Candidate | Model | Pros | Cons |
| :--- | :--- | :--- | :--- |
| **4891fba** | Qwen 3.6 Plus | Solid translation, good technical accuracy. | Slightly more formal/standard than Dan's usual direct, punchy style ("Votre Agent IA est Inutile Sans Ça"). |
| **fc09e35** | DeepSeek V4 Flash | Excellent flow, very natural "engineer-to-engineer" tone. "Ligne magique" is a great touch. | Minor phrasing could be punchier in a few spots. |
| **431b2d9** | MiniMax M2.7 | Decent, but used "considerant" in code comments which is less idiomatic than other options. | A bit more verbose in explanations. |

### Selection Logic
DeepSeek-V4-Flash captured the "USB-C of AI" analogy with the most natural French flow. It avoided the slightly "marketing-heavy" feel of Qwen while maintaining full technical correctness in the MDX components and code blocks.

### Polish applied
- Changed "C'est la ligne magique" to "C'est la ligne magique" (already good, but verified against context).
- Adjusted "Ce que MCP Résolve" to "Ce que MCP Résout" (grammatical fix).
- Verified parent-relative paths (`../wide.webp`) are preserved.
- Ensured "USB-C" analogy stays central.
- Verified frontmatter slugs and categories.

## Performance Stats
- **Judge Model**: google/gemini-3-flash-preview (as instructed via CLI task)
- **Decision Date**: 2026-05-09
