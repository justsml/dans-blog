# Judgment

Winner: `openrouter/google/gemini-3-flash-preview`

Why it won:
- Best balance of technical accuracy and readable Hindi.
- Preserved the MDX structure cleanly, including headings, lists, links, and fenced code blocks.
- Kept the article's direct tone without over-literal phrasing.
- Avoided the heavier awkwardness and mixed-register phrasing that showed up in some other candidates.

Tradeoffs in the runner-up candidates:
- `openrouter/qwen/qwen3.6-plus` was strong, but it drifted more into transliterated English and had a slightly less natural flow in long paragraphs.
- `openrouter/moonshotai/kimi-k2.6` read well in places, but it introduced more explanatory parentheticals and occasional over-translation.
- `openrouter/z-ai/glm-5.1` had decent fidelity, but the phrasing felt more mechanical and less like Dan's direct style.
- `openrouter/minimax/minimax-m2.7` was the weakest fit for the article voice, with the most obvious translation artifacts and register drift.

Polish applied:
- Standardized a few terms to keep them consistent: `guardrails`, `processors`, `prompt injection`, `PII`, `content moderation`.
- Kept product, API, and code identifiers in English so the MDX remains accurate and build-safe.
- Smoothed some Hindi sentences to reduce literal translation feel while keeping the original meaning intact.
