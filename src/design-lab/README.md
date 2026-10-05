# Homepage design lab

Open `/designs/` on the existing dev server (usually http://localhost:4242/designs/).
Warm Editorial now has four related layouts, with their own static routes:

- `/designs/warm-editorial/`
- `/designs/warm-journal/` — a lead story followed by three photographic columns
- `/designs/warm-library/` — a compact reading index with small images
- `/designs/warm-dispatch/` — image-led columns with an open-source side rail

The original alternate directions remain accessible directly:

- `/designs/dark-studio/`
- `/designs/bold-type/`
- `/designs/modular-magazine/`

`Layout.astro` owns the isolated document, header, footer, switcher, and lightweight
theme control. `runtime.ts` initializes search and theme listeners after every
Astro page transition. `Home.astro` loads the same nine real, listed English
posts for every design through PostCollections. `Article.astro` owns the shared
article markup and optimized imagery. Each named block in `styles.css` can be
changed independently. No dependencies, production layout imports, or global
theme changes are needed.

The search box and topic pills filter the preview's nine articles. Warm-layout
article links open complete MDX reading previews under `/designs/<design>/<slug>/`;
title and image elements share transition names between the card and the article.
The Color theme control supports system, light, and dark, remembers the selection,
and follows live OS changes in system mode. Reduced motion disables decorative
animation and shared-element motion. The expanded footer adapts categories,
popular posts, project descriptions, quiz access, profile, and social links from
the production navigation. Archive, about, and consulting links open the current site.
The previews have noindex metadata and are excluded from Pagefind and the sitemap.

Run the focused browser checks with:

```sh
bun run test:e2e tests/e2e/warm-editorial.spec.ts --workers=2
```

The refined image direction lives in
`.agents/skills/blog-hero-images/references/visual-language.md`, and the
post-writing skill links to it. Existing article images remain the live source
assets; future cover generation follows the refined photographic guidance.

To remove the experiment, delete `src/design-lab/` and `src/pages/designs/`, and
remove `tests/e2e/warm-editorial.spec.ts` and the `/designs/` entry from
`ignorePaths` in `astro.config.mjs`. Generated
reference images and prompts remain in `output/design-mockups/2026-10-02/`.

## Background experiments

Warm layouts include a Background picker with five treatments: Cotton stock
(fine paper tooth), Morning mist (clouded edges), Mineral wash (clay and sage
pigment), Sunday edition (dry newsprint grain), and Window light (diffuse garden
light). Plain paper disables every texture. Share a choice with `?surface=cotton`,
`mist`, `mineral`, `press`, or `light`; it is also remembered across layout changes
and article navigation. A valid URL choice overrides the saved preference.

Articles automatically use a quieter version, preserving the central reading
column and stopping decorative movement. Dark mode uses lower-opacity grain and
muted color. Window light drifts slowly on homepages only; reduced motion stops
it. Print omits all effects and the picker. The three small procedural SVG tiles
live in `textures/`; `surfaces.css` owns the entire effect and is scoped to warm
preview layouts. No production backgrounds or dependencies change.
