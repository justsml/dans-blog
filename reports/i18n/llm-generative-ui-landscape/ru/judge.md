# I18n Judge Report: llm-generative-ui-landscape (ru)

## Decision Summary
- **Selected Candidate:** `39e5ccd045e138b639834d2572ad92dd7143bb0c` (openrouter/qwen/qwen3.6-plus)
- **Reasoning:** Qwen provided the most natural and professional Russian translation, correctly handling technical terms like "tool-to-component" and "human-in-the-loop" without over-translating or leaving them awkward. It preserved the MDX structure and asset paths perfectly.

## Candidate Comparison

### [Qwen 3.6 Plus (39e5ccd0)](https://github.com/justsml/dans-blog/commit/39e5ccd045e138b639834d2572ad92dd7143bb0c)
- **Style:** Captures Dan's direct, technical voice.
- **Accuracy:** Correctly identifies layers and spectra. Handles "tool-to-component" well.
- **Naturalness:** Highest quality Russian prose among the three.
- **MDX Preservation:** Perfect.

### [DeepSeek v4 Flash (367d9490)](https://github.com/justsml/dans-blog/commit/367d949078cc08d24ba6099ef1011312785780f4)
- **Style:** Good, but slightly more clinical than Qwen.
- **Accuracy:** Solid.
- **Naturalness:** Some slightly awkward phrasing (e.g., "приклепанное к продукту").
- **MDX Preservation:** Perfect.

### [Gemini 3 Flash Preview (b03c3310)](https://github.com/justsml/dans-blog/commit/b03c3310ac7e459bd2cac648eff427743d834fb2)
- **Style:** A bit more verbose.
- **Accuracy:** Missed the visibility flags in frontmatter (draft, unlisted, etc. were removed).
- **Naturalness:** Good, but "тренировочными колесами" (without quotes) is less standard than Qwen's version.
- **MDX Preservation:** Significant frontmatter loss.

## Final Polish Actions
1. Selected Qwen candidate as the base.
2. Preserved the source article visibility flags (`draft: true`, `unlisted: true`, `hidden: true`, `publish: false`) to match English and the existing localized versions.
3. Verified asset paths (all parent-relative `../`).
