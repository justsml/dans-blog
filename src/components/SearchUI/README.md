# Search UI

This directory owns the Pagefind browser UI only.

`pagefindLoader.ts` loads `/pagefind/pagefind-ui.css` and `/pagefind/pagefind-ui.js`, then initializes `window.PagefindUI` against `SearchBar.astro`. Search data is produced by the `astro-pagefind` integration during the static build.

Any alternative index, remote query helper, or database-backed search code belongs outside `src/` unless it is deliberately promoted with architecture docs, tests, and a replacement plan.
