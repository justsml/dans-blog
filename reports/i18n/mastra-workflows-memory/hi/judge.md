# Hindi Translation Judge

Chosen candidate: `1e22fa8477a78d447f9e13d1e7f3ac67929387b1` (`openrouter/qwen/qwen3.6-plus`)

Why this one won:
- Best balance of technical accuracy and readable Hindi. It preserves the original argument cleanly without the awkward code-switching and English leakage present in the other candidates.
- Strongest MDX preservation. Frontmatter, code fences, list structure, headings, and inline formatting stayed intact, with no structural drift.
- Closest to Dan's direct style. The prose stays blunt and practical instead of sounding over-literal or machine-translated.

Main issues in the rejected candidates:
- `8cfc41d76371ab9480e0729a1e1cd55b8daf52af` was readable but had several literal choices and some overly normalized phrasing that dulled the voice.
- `f3027a10e41680d48605920297a8c88ca047722a` mixed Hindi with a lot of untranslated English terms and felt the least polished.
- `e20627596c1b65b7875bc24e64275e0821469ddb` introduced multiple awkward word choices and some semantic slips.
- `b27721766c5b29ef3918a73a1e9b1452c42d7475` had the most noise: untranslated English, punctuation drift, and the weakest natural Hindi flow.

Light polish applied to the selected draft:
- Tightened a few phrases for smoother Hindi while keeping the original structure and technical meaning.
- Kept code and MDX markup unchanged.
