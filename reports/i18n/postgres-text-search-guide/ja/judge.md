# Judge Report

Selected candidate: `55f12900b475b600a88dc81d0b1fb5dff6d735df` (`openrouter/qwen/qwen3.6-plus`)

## Decision

I selected the Qwen candidate as the base because it was the cleanest balance of technical fidelity, readable Japanese, and MDX preservation. It kept the structure intact, preserved code and SVG blocks without adding noise, and stayed closest to Dan's direct style.

## Why it won

- Technical accuracy: the Postgres concepts, examples, and decision table were preserved with fewer meaning shifts than the other candidates.
- Natural language quality: the prose reads more naturally than the more literal candidates, while avoiding the overly embellished tone from some alternatives.
- Dan's style: direct, concrete, and lightly opinionated without becoming stiff or overly formal.
- MDX preservation: frontmatter, figures, code blocks, and internal links were retained cleanly.

## Polishing applied

- Tightened a few phrases to reduce awkward English calques.
- Normalized spacing around `Postgres`, code spans, and punctuation.
- Kept the SVG/MDX structure from the chosen candidate rather than merging in noisier variants.

## Rejected candidates

- `d6c9939b4d5ad1ec7a82c54b6ed9603cac869788` was readable but introduced more literal phrasing and a few less natural turns.
- `35aef4d9cc4b17bbb0d77b94c56917c7a4362126` had acceptable structure but felt less natural overall and used slightly weaker terminology choices.
- `50f1120bea6153edbd714d61574595991d61faf5` drifted into unnatural wording and mixed-language artifacts in several places.
- `f26e4065890f99f8ed03f5bdf94ccb8ae1080f53` had the most noise and the weakest language quality of the set.

## Notes

The final MDX in `src/content/posts/2026-05-02--postgres-text-search-guide/ja/index.mdx` is the selected candidate with light polish only. I intentionally avoided broad rewrites so the translation remains faithful to the source and stable for rendering.
