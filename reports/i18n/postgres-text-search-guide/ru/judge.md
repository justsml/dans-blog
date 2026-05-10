# Judge Report: Postgres Text Searching Guide 2026 (RU)

## Summary
- **Selected Candidate:** `b801db95268489d01bea672faf3744f263f09c06` (openrouter/qwen/qwen3.6-plus)
- **Selection Reason:** Highest linguistic quality and most natural technical terminology. It successfully translated "sophistication" and "ship" without falling into literalism or leaving English terms (unlike the Flash models). It also preserved the complex SVG structure and MDX components perfectly.
- **Polishing Applied:**
    - Standardized "ship" (доставляют -> выпускают) for better dev-speak.
    - Improved flow in the summary sentence for the three tools.
    - Fixed a minor awkwardness in the "Three Tools" intro.

## Candidate Comparison

| Model | Accuracy | Style | MDX | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Qwen 3.6 Plus** | High | Excellent | Perfect | Best balance. Avoided leaving "sophistication" in English. |
| **Qwen 3.5 Flash** | Medium | Poor | Good | Left "sophistication" untranslated. Phrasing feels robotic. |
| **DeepSeek V4 Flash** | High | Good | Good | Very direct, but slightly dry compared to Plus. |

## Final MDX
Written to `src/content/posts/2026-05-02--postgres-text-search-guide/ru/index.mdx`.
