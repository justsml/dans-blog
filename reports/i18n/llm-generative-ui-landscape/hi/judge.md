## Decision

Selected `ffa24b364b455f09ec973cf364a046b0c435bd53` as the base translation.

## Why this candidate

- It had the best balance of technical accuracy and readable Hindi.
- It preserved MDX structure well, including headings, lists, table shape, code blocks, and links.
- It stayed closest to Dan's direct, opinionated style without drifting into paraphrase-heavy prose.
- It avoided the more serious mistranslations and awkward phrasing present in the other candidates.

## Main tradeoffs

- I lightly normalized a few terms back toward the source article to keep the translation faithful and easier to maintain.
- I kept product names, protocol names, and code identifiers in English where that reads more naturally in technical Hindi.
- I did not try to over-localize the table labels or key technical nouns, because that would reduce clarity.

## Notes on the other candidates

- `cc8d5467f2414688ebe01ba70f2f59c51468f4fe` was close, but it used more awkward phrasing and had more mechanical-sounding Hindi.
- `a72478f6f6957c09d7f2b05df6ca23811a5e3e8f` was unavailable at the requested path, so it could not be judged directly from the file content.
- `de580acca3e4e8c39e64bf5779c7154cf8ac7cbb` and `b3596810f3a0ec6bead1b354fef8f9ab51848083` were more literal but less natural, with more punctuation and terminology drift.

## Polish applied

- Standardized a few headings and terms to match the English source more closely.
- Smoothed some sentences where the candidate was overly literal or unnatural.
- Preserved the original MDX layout and content order.
