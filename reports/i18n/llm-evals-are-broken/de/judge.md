# i18n Judge Report: llm-evals-are-broken (de)

## Candidates
- **c1dec1081c1a69083e039e5fdaf446acef0a7e38 (Qwen 3.6 Plus)**: Excellent natural flow, captures Dan's direct tone well. "Bekämpfe Übel mit Evals!" is a strong, punchy title.
- **95f2ea1d33b136c75fef9deb270b2d666d383f64 (Qwen 3.5 Flash)**: Decent, but slightly more robotic in places. Used "Golden Set" vs "Golden Case" inconsistently.
- **22f5ae9872ee328261f313e427b789a30b7b6ad6 (DeepSeek V4 Flash)**: Good technical accuracy but occasionally uses overly formal or clunky phrasing (e.g., "Wissenswerte Tools").

## Decision
**Winner: c1dec1081c1a69083e039e5fdaf446acef0a7e38 (Qwen 3.6 Plus)**

### Reasoning
Qwen 3.6 Plus provided the most "Dan-like" translation. It uses direct, slightly edgy language ("im Smoking aus Benchmarks daher", "peinlichen Sachen") that matches the original English post's personality. It also did the best job of preserving MDX components and code block integrity.

## Polishing Notes
- Ensured consistent use of "Golden Set" and "Golden Case".
- Verified all parent-relative asset paths (e.g., `../desktop-social.webp`).
- Checked that code blocks and comments remain syntactically valid.
- Lightly refined the technical terminology (e.g., "Regressionen" vs "Verschlechterungen") for consistency.
