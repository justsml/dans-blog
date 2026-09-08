# Decks

Hand-authored reveal.js decks, one per talk, in [`public/decks/<talk>/index.html`](../../public/decks/). Every slide is a diagram, a comparison, or an illustration built for that idea. No generator, no template, no build step: the file you edit is the file you present. Speaker notes sit in each slide's `<aside class="notes">`, copied from the talk's outline.

## Each deck gets its own design

Before writing a deck, write its design brief and keep it at the top of the deck file as a comment. The brief names, for this talk and this audience:

- **Palette.** Four to six named colors drawn from the subject's own world, not a house style. The retrieval deck is ink, paper, and highlighter because judging documents is the subject.
- **Type.** A display face and a body face chosen for the tone, with a real fallback stack. Mono only where the content is data.
- **Hierarchy.** What the eye reads first, second, third on a typical slide, and what the recurring object is (the retrieval deck's is the paper document that gets stamped, pooled, judged, and finally found).
- **Rhythm.** Where the peak slide is, where the room does something, where the deck goes quiet. Builds are for reveals that change the argument, not for pacing bullet points.
- **Tone.** Who is in the room and what register the headlines take. A security audience, a teachers' conference, and an investor summit do not get the same deck.

No bullet lists, no numbered rows, no eyebrow labels, no meta strings joined with middle dots. If a slide has nothing to show, the outline needs a better idea for that slide, not a text layout.

## Present and check

`bun run dev`, then <http://localhost:4242/decks/index.html>. Decks also open from disk. `?all` shows every fragment at once. S opens speaker view.

Shorter routes: do not build separate 15- and 30-minute decks. The cut lists are in each talk's adaptation files; hide the skipped slides in speaker preparation.

## Status

| Talk | Deck |
| --- | --- |
| retrieval | done, 15 slides |
| benchmarks, judgment, product-engineering, failure-improvement, adaptive-systems, evidence-learning, free-tier, dynamic-scaling | not started |
