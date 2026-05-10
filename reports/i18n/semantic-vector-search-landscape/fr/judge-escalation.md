# Escalation Judge Report: semantic-vector-search-landscape (fr)

## Decision

Final selection: `5ba0398b5ece8d5752ba1e8704f16e4af5e83687`

Model: `openrouter/deepseek/deepseek-v4-flash`

The final file restores the complete DeepSeek candidate after the second judge found that the primary judge's edited working copy was truncated at 199 lines. The selected final is 372 lines and includes the architecture comparison, dedicated vector-store landscape, "La seule chose a ne pas faire", and closing summary sections.

## Judge Consensus

- Primary judge: `openrouter/google/gemini-3-flash-preview`
- Primary result: selected DeepSeek, but its polished working copy was incomplete.
- Second judge: `openrouter/deepseek/deepseek-v4-flash`
- Second result: disagreed with the working copy because it was truncated; recommended restoring the full DeepSeek candidate.
- Escalation attempt: `openrouter/anthropic/claude-sonnet-4.6`
- Escalation result: timed out after 240 seconds after confirming the truncation and identifying DeepSeek as the right base. No additional expensive retry was run.

## Rationale

DeepSeek had the strongest French technical terminology and preserved the article structure. It consistently used "plongement", "jeton", "reessai", "floue", "segments", and "quasi-doublons" where appropriate, while preserving code blocks, URLs, MDX frontmatter, and parent-relative asset paths.

The second judge provided a concrete failure mode, not a stylistic disagreement: the working copy had lost roughly half the article. Restoring the complete selected candidate resolves that issue without burning another high-cost judge run.
