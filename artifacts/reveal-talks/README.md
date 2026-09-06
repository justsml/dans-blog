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

The full-length decks use `../speaking-portfolio-expanded/outlines/*-40min.md`. The former flagship outline files are compatibility pointers. Slide notes preserve speaker guidance, citations, rehearsal timing, and personal-story prompts. Personal-story prompts still need Dan's own experience before delivery; no biography or results were invented.

The free-tier deck includes dated company announcements and an AWS credit offer checked September 5, 2026. Refresh these before presenting. Synthetic scores and costs remain illustrative, not measurements of current products.

Edit canonical outlines for registered talks; never edit their generated HTML or scripts. Shared typography and behavior live in `assets/deck.css` and `assets/deck.js`; each deck also has its own art direction. No Astro routes or dependencies are involved. Five portfolio talks also have a [PowerPoint export](../speaking-portfolio-expanded/decks/); those exports predate the September 6 rewrites and must be regenerated from the outlines.

The rewritten talks registered for generation are: adaptive-systems, dynamic-scaling, evidence-learning, free-tier, failure-improvement, product-engineering, judgment, benchmarks, and retrieval. These decks are generated from their outlines: edit `../speaking-portfolio-expanded/outlines/<talk>-40min.md`, then run `bun artifacts/speaking-portfolio-expanded/build-talk.ts <talk>`. The shared head lives in `templates/engineering-head.html`. Their PowerPoint exports predate the September 6 rewrite and must be regenerated.

Implementation follows the official [initialization](https://revealjs.com/initialization/) and [speaker view](https://revealjs.com/speaker-view/) documentation.

## Lightning talk: `llm://` connection strings

Three cuts of the same talk, sized for lightning and short-session slots: `llm-uri-5min.html` (4 slides), `llm-uri-10min.html` (5 slides), and `llm-uri-15min.html` (6 slides). Example strings use the short provider alias form from the `llm-strings` README; the host names the provider, and local models are a host rather than a separate scheme. The longer cuts show the real normalizer output as a table and a screen grab of the playground in `assets/llm-uri/`. They share `assets/llm-uri.css` for art direction and set reveal.js `totalTime` to match their length, so the speaker-view timer counts down correctly. Fragments are used heavily; press Space to step through each slide's beats. Notes carry per-slide timings and the objections to expect. Refresh the Internet-Draft status on the closing slide before presenting.

## Render and link check

With the local server running, use `bun artifacts/speaking-portfolio-expanded/check-talks.ts failure-improvement product-engineering judgment benchmarks retrieval`. It uses installed Chrome, visits every slide, reveals all fragments, and checks viewport overflow, console/network errors, and local Markdown links in changed files. Set `TALKS_CHECK_BASE` to a Git revision to include already-committed changes in the link check.
