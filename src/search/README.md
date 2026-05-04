# Search Index Ownership

Pagefind is the supported search index for this static site.

The build integration is configured in `astro.config.mjs`, the browser runtime loader lives in `src/components/SearchUI/pagefindLoader.ts`, and Pagefind indexing attributes live near the page/layout markup they affect.

Do not add Orama, DuckDB, LanceDB, remote Pagefind helpers, or other search-index implementations under `src/`. Historical experiments are quarantined under `experiments/search/` so Astro does not build, typecheck, or imply support for them.
