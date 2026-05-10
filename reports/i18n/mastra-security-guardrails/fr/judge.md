# I18n Judge Report: mastra-security-guardrails (fr)

## Decision Summary

**Selected Candidate:** `efe12e846373fe09f5bab8ac8a8fdd3f15652c56` (DeepSeek V4 Flash)

DeepSeek V4 Flash provided the most natural and professional French translation while adhering to Dan's direct, technical style. It correctly handled technical terminology ("middleware", "prompt injection", "PII") and preserved the MDX structure and asset paths.

## Candidate Comparison

### 1. Qwen 3.6 Plus (32171c1)
- **Quality:** High. Very natural phrasing.
- **Style:** Good, direct but slightly more formal than DeepSeek in some places.
- **Accuracy:** Good. Used "caractère de contrôle" and "normalise les espaces".
- **Issues:** None major, but phrasing was a bit "wordier" than DeepSeek.

### 2. DeepSeek V4 Flash (efe12e8) - **WINNER**
- **Quality:** Excellent. Very fluid and idiomatic French.
- **Style:** Captures Dan's direct, slightly punchy technical tone perfectly.
- **Accuracy:** Flawless. Correctly kept "middleware" (common in French tech circles) and handled "PII" context well.
- **MDX:** Correctly preserved imports and asset paths (using `../`).

### 3. MiniMax M2.7 (0079830)
- **Quality:** Poor.
- **Issues:** 
    - Failed to translate several English terms ("unsafe", "eventually", "somehow", "guardrails").
    - "L'IA en Production C'est Terrifiant" - uses Title Case which is not standard in French titles.
    - Phrasing feels like a literal machine translation in several places.

## Polishing Notes (DeepSeek)
- Maintained `../` for asset paths.
- Used "carte bleue" (idiomatic French for credit card).
- Kept technical terms like "prompt injection" and "middleware" which are standard in French dev environments.
- Verified that the `redirects` and `related` frontmatter were preserved (standard practice for this blog's i18n).
