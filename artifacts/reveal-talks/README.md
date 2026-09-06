# Reveal.js talk collection

Ten full-length HTML decks, based on the latest available 40-minute outlines. Open [the collection](index.html) to choose a talk.

## Present

From the repository root:

```sh
bun artifacts/reveal-talks/serve.ts
```

Visit http://localhost:4343/reveal-talks/index.html. Set `TALKS_PORT` to choose another port. The server binds to localhost and serves the artifacts directory so the existing demo kit and source outlines remain reachable.

Arrow keys navigate, Escape opens overview, F enters fullscreen, and S opens speaker view with notes and a timer. Speaker view requires a local server and permission for its popup. Add `?print-pdf` before the URL hash, then print from Chromium for PDF output.

The HTML slides also open directly from disk. Reveal.js 5.2.1, the notes plugin, and fonts are bundled locally. External reference links require internet access. Fonts are Raleway and Atkinson Hyperlegible; their licenses and the reveal.js MIT license are in `assets/`.

## Content

The retrieval, benchmarks, and judgment decks use `../flagship-talks/*-40min-outline.md`. The other seven use the newer `../speaking-portfolio-expanded/outlines/*-40min.md`. Slide notes preserve speaker guidance, citations, rehearsal timing, and personal-story prompts. Personal-story prompts still need Dan's own experience before delivery; no biography or results were invented.

The free-tier deck includes dated company announcements and an AWS credit offer checked September 5, 2026. Refresh these before presenting. Synthetic scores and costs remain illustrative, not measurements of current products.

Edit the HTML directly. Shared typography and behavior live in `assets/deck.css` and `assets/deck.js`; each deck also has its own art direction. No Astro routes or dependencies are involved. Adaptive and parallelization use these HTML decks; their obsolete PowerPoint exports have been removed.

Implementation follows the official [initialization](https://revealjs.com/initialization/) and [speaker view](https://revealjs.com/speaker-view/) documentation.
