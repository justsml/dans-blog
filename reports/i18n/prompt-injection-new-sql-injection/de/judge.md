# Judge Report: Prompt Injection Is SQL Injection for Agents (DE)

## Summary
- **Selected Candidate:** `965ec09562ef4de74192294752024da4fef9c79f` (openrouter/qwen/qwen3.6-plus)
- **Selection Reason:** Most idiomatic and technically balanced. It captured the "History rhymes" metaphor naturally and preserved MDX structure perfectly.
- **Polishing Applied:** 
    - Replaced "ungeschickt" with "klobig" for "clunky" (from DeepSeek's version).
    - Refined "Context Hijacking" to remove the clunky parenthetical.
    - Standardized security terminology (Datenexfiltration).
    - Adjusted the "Firewall" metaphor for better impact.

## Candidate Comparison

| Model | Accuracy | Style | MDX | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Qwen 3.6 Plus** | High | Excellent | Perfect | Best overall balance. Natural phrasing. |
| **Qwen 3.5 Flash** | Medium | Poor | Good | Grammatical errors in "Indirect Injection" example. Weird neologisms. |
| **DeepSeek V4 Flash** | High | Sharp | Good | Very direct, but "Datenerpressung" was a mistranslation of "exfiltration". |

## Final MDX
Written to `src/content/posts/2026-05-05--prompt-injection-new-sql-injection/de/index.mdx`.
