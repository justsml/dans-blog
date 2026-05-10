# Judge Report: de translation for mastra-workflows-memory

## Candidate Overview

- **Qwen (be00f560)**: `i18n candidate(de): mastra-workflows-memory via openrouter/qwen/qwen3.6-plus`
- **DeepSeek (33d68be6)**: `i18n candidate(de): mastra-workflows-memory via openrouter/deepseek/deepseek-v4-flash`
- **Minimax (f043e69a)**: `i18n candidate(de): mastra-workflows-memory via openrouter/minimax/minimax-m2.7`

## Decision: Qwen (be00f560)

### Reasoning

1. **Technical Accuracy**: Qwen maintained the technical terms and code structure perfectly. It correctly localized the internal descriptions in the `fetchWeather` step while keeping the `zod` schema and `fetch` logic intact.
2. **Natural Language Quality**: Qwen's German is very natural and captures the "tech-casual" tone of the blog. For example, "Schluss mit instabilen Agenten" is a great punchy headline.
3. **Dan's Style**: Qwen captured the direct, opinionated style well. It translated "Stop building flaky agents" to "Schluss mit instabilen Agenten" and "ground-truth data" to "Ground-Truth-Daten", preserving the industry-standard English terms where they make sense in a German tech context.
4. **MDX Preservation**: All three candidates did well with MDX, but Qwen's frontmatter handling (relative paths like `../wide.webp`) was correct. Minimax had some Chinese characters in the code comments (`考虑气候适当的选项`), which is a disqualifier. DeepSeek was decent but slightly less idiomatic in its prose (e.g., "gehorchen" feels a bit heavy for the context compared to Qwen's "Befolge").

## Polishing Notes
- Verified asset paths use `../` for local images.
- Ensured consistent terminology for "Workflows", "Memory", and "Agent Networks".
- Fixed minor phrasing to ensure it sounds like a senior engineer speaking.
