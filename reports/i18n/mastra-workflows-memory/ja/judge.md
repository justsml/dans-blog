# Judge Report: mastra-workflows-memory (ja)

Selected candidate: `4bf40b8246977463ade6ce24738373866ec874df`

## Why this candidate won

- It preserves the full MDX structure cleanly: frontmatter, headings, code blocks, lists, and internal links all survive without corruption.
- The prose is the most natural Japanese among the candidates while staying close to the source meaning.
- Technical terms are handled consistently enough for an engineering audience, without the heavy translation drift seen in weaker candidates.
- It keeps Dan's direct, slightly opinionated style instead of drifting into overly formal or overly literal Japanese.

## What I polished

- Kept the selected candidate as the base and only made light editorial cleanup where the phrasing could be tightened.
- Avoided introducing new semantics or rewriting the structure.
- Preserved the original MDX content model so the post remains build-safe.

## Why the others lost

- `66871a5d01de6f989e1cbb356c0008c48e38d749`: readable, but several lines are more literal than natural and some English phrases remain awkwardly embedded.
- `37135d38f4c0b4fc7155f51647670cb6aa839e37`: decent fluency, but it occasionally smooths over the source too much and changes the tone.
- `a7c71d91e77d4b768d3626e808df645562d24d45`: too noisy. It contains severe language mixing and obvious corruption, which makes it unsafe.
- `49d156c89f6fadef9b7d53ce34e1090830142bd1`: understandable in places, but it is the least polished and has the most unnatural phrasing and terminology drift.

## Verdict

The selected translation is the strongest balance of technical accuracy, natural Japanese, editorial voice, and MDX fidelity. It needed only minor polish, not rescue.
