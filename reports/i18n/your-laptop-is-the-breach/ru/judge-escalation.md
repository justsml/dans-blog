# Judge Escalation Resolution

- Slug: your-laptop-is-the-breach
- Locale: ru
- Primary judge: openrouter/openai/gpt-5.4-mini
- Second judge: openrouter/openai/gpt-5-mini
- Escalation judge: openrouter/anthropic/claude-sonnet-4.6
- Final selected commit: 69f8fbe31941b68ccc3d4d1915c94eb69241b344

The primary judge selected 126950f339132920b0b43c04e33b5a1231bc36dd, but post-judge QA found mojibake and non-Russian fragments in that candidate. The final resolution uses 69f8fbe31941b68ccc3d4d1915c94eb69241b344 because it preserves the MDX structure cleanly and has the strongest Russian prose among the valid candidates after artifact scanning.

Final polish replaced a few English workflow terms with natural Russian equivalents while preserving technical terms, URLs, frontmatter, headings, tables, and code spans.
