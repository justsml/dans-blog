# Reveal.js runtime and lightning decks

Full-length decks are hand-authored under [`public/decks/`](../../public/decks/) (see [artifacts/decks](../decks/README.md)). The generated bullet decks, their generator, per-route editions and PowerPoint exports were removed on 7 September 2026.

## Present

`bun run dev`, then open <http://localhost:4242/decks/>. Decks also open straight from disk.

Arrow keys navigate, Escape opens overview, F enters fullscreen, S opens speaker view with notes and a timer (needs the dev server and a popup). Add `?print-pdf` before the URL hash and print from Chromium for PDF. Add `?all` to show every fragment at once.

Reveal.js 5.2, the notes plugin and the fonts live once, in `public/talks/assets/`, and every deck links to them. Licenses are alongside.

## Lightning talk: `llm://` connection strings

Three cuts of the same talk in `public/talks/`: `llm-uri-5min.html` (4 slides), `llm-uri-10min.html` (5 slides), and `llm-uri-15min.html` (6 slides). Example strings use the short provider alias form from the `llm-strings` README; the host names the provider, and local models are a host rather than a separate scheme. The longer cuts show the real normalizer output as a table and a screen grab of the playground in `assets/llm-uri/`. They share `assets/llm-uri.css` and set reveal.js `totalTime` to match their length so the speaker-view timer counts down correctly. Fragments are used heavily; press Space to step through each slide's beats. Notes carry per-slide timings and the objections to expect. Refresh the Internet-Draft status on the closing slide before presenting.

## Render and link check

With the dev server running, `bun artifacts/speaking-portfolio-expanded/check-talks.ts retrieval` uses installed Chrome to visit every slide of `public/decks/retrieval/`, reveal all fragments, and check viewport overflow, console and network errors, and local Markdown links in changed files. Set `TALKS_CHECK_BASE` to a Git revision to include committed changes in the link check.
