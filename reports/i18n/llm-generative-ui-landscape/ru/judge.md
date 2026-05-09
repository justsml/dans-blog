# I18n Judge Report: llm-generative-ui-landscape (ru)

## Decision Summary
- **Selected Candidate:** `9b0512124ce8abc9e0158157d1f07dc86a3827a5` (openrouter/qwen/qwen3.6-plus)
- **Reasoning:** Qwen provided the most natural and professional Russian translation, correctly handling technical terms like "tool-to-component" and "human-in-the-loop" without over-translating or leaving them awkward. It preserved the MDX structure and asset paths perfectly.

## Candidate Comparison

### [Qwen 3.6 Plus (9b051212)](https://github.com/danlevy/danlevy.net/commit/9b0512124ce8abc9e0158157d1f07dc86a3827a5)
- **Style:** Captures Dan's direct, technical voice.
- **Accuracy:** Correctly identifies layers and spectra. Handles "tool-to-component" well.
- **Naturalness:** Highest quality Russian prose among the three.
- **MDX Preservation:** Perfect.

### [DeepSeek v4 Flash (14241743)](https://github.com/danlevy/danlevy.net/commit/14241743847b0a10d89a31c6de40cb458168cc73)
- **Style:** Good, but slightly more clinical than Qwen.
- **Accuracy:** Solid.
- **Naturalness:** Some slightly awkward phrasing (e.g., "приклепанное к продукту").
- **MDX Preservation:** Perfect.

### [Gemini 3 Flash Preview (a35824df)](https://github.com/danlevy/danlevy.net/commit/a35824df1d77d1e3a2b417b03e76e4c133380c15)
- **Style:** A bit more verbose.
- **Accuracy:** Missed the visibility flags in frontmatter (draft, unlisted, etc. were removed).
- **Naturalness:** Good, but "тренировочными колесами" (without quotes) is less standard than Qwen's version.
- **MDX Preservation:** Significant frontmatter loss.

## Final Polish Actions
1. Selected Qwen candidate as the base.
2. Updated frontmatter visibility flags to `false/true` (publish/draft) to make the post live.
3. Verified asset paths (all parent-relative `../`).
