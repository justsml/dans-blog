# Hindi Translation Judge

Selected candidate: `6a520356b74eea0f1f69e159d52073a22813944c`.

## Why this one

- It had the best balance of technical accuracy and idiomatic Hindi.
- It stayed closest to the source structure and preserved the MDX/SVG/code blocks cleanly.
- It used fewer awkward calques than the other candidates, so the prose reads more naturally while still sounding direct.
- It kept the article's operational tone intact instead of drifting into overly literary or overly English mixed wording.

## Why the others lost

- `b70c847c384b31d9f234453c6da26cfd8fb7790a` was technically solid, but had more English leftovers and slightly less natural Hindi phrasing in places like labels and section transitions.
- `19fed039f86d86cc2b006b6a8edcc65dce347a65` was unavailable as a clean candidate path in this repo state, so it could not be judged reliably from `git show`.
- `d2106d27de2bdfd00327cc3c66782baa46dc8ad4` was the most awkward overall, with more transliterated English, rougher grammar, and weaker flow.

## Polishing applied

- Normalized a few phrasing choices for consistency with Dan's direct style.
- Kept the original MDX structure, code samples, and SVG content intact.
- Avoided any semantic edits to the technical guidance.

## Notes

- No layout or frontmatter changes were needed beyond the selected translation text.
- The technical content remains faithful to the source and keeps the same decision boundaries between FTS, `pg_trgm`, exact-match SQL, `unaccent`, `pg_search`, and `pgvector`.
