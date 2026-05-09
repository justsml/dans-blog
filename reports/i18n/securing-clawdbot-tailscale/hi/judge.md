# Hindi Translation Judge

Selected candidate: `e8c037cedb58f33b5e79169473d5e483eeeac0af` (Qwen 3.6 Plus)

## Why this one

- It preserved the MDX structure cleanly and kept the technical content closest to the source.
- It handled the security guidance with the least amount of meaning drift, especially around Tailscale Serve/Funnel, gateway exposure, and SSH hardening.
- The Hindi reads more naturally than the other candidates while still keeping Dan's direct, operational tone.

## Notes on the other candidates

- `24bb6a77b41d848fec3153aa6255af43263fa300` reads like a rough draft: lots of English leakage and a less consistent register.
- `9073ad7239878fcc2e66fb23dd1db8d6b3d5b697` has the same issue, plus more transliteration where plain Hindi would be clearer.
- `64b48ae86d98fc0919d8733909fe7353822d58be` is understandable, but it leans too hard into mixed-script phrasing and sounds less polished.
- `6c3fe6697159665487a8709296f2338b3aa452aa` was not available in the local object database when I tried to inspect it, so I could not fairly judge it.

## Polish applied

- Lightly normalized English terms where the candidate had awkward mixed-script usage.
- Kept code blocks, links, frontmatter, and MDX structure intact.
- Avoided rewriting the article beyond small readability fixes.
