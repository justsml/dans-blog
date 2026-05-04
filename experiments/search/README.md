# Quarantined Search Experiments

These files are historical search experiments. They are intentionally outside `src/` so they are not part of the Astro application, typecheck boundary, or supported dependency graph.

The supported site search path is Pagefind:

- `astro.config.mjs` builds the static Pagefind index.
- `src/components/SearchUI/pagefindLoader.ts` owns runtime Pagefind UI loading.
- `src/search/README.md` records the ownership boundary.

Do not import these modules from app code. Promote only by moving the code back into `src/`, restoring needed dependencies, and replacing the Pagefind ownership docs with a tested decision.
