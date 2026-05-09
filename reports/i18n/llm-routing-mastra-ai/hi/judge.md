# Hindi Translation Judgment

Selected candidate: `deb4c1e19ca75a51104723c4fd2a89e81cfdb27b`

## Why this one

This version had the best balance of accuracy, readable Hindi, and a tone that stays close to Dan's direct, slightly snarky style without drifting into slang-heavy translation.

It handled the core technical ideas cleanly:

- model specialization by task
- router-based delegation
- cost efficiency and resilience tradeoffs
- eval-driven model choice instead of trend-driven choice

It also preserved the MDX structure well, including the code block, headings, resource links, and series navigation.

## Why the others lost

- `7072928335c8244fd2b90f90d92de508f85b5f18` had several awkward code-switches and some English phrasing left in place where Hindi read more naturally.
- `acb4794e0c785c075e115eba7410a3e2950d1ff9` was understandable, but it leaned too far into explanatory formalism and lost some of the post's punch.
- `c4ea4d56ea6648e50c0119d71a1ab8130255822e` was the loosest in style. It introduced more transliterated English and some phrasing that felt less polished.
- `0d365a3ce921dd6fcc484c135e060273172f98e7` read the least naturally overall and had several awkward or broken constructions.

## Light polishing applied

I kept the selected translation mostly intact and only made small edits for rhythm, spelling, and consistency:

- normalized a few Hindi word choices
- smoothed a couple of sentences that were too literal
- kept code, links, and MDX markers unchanged

The final file stays faithful to the chosen candidate while reading a little cleaner.
