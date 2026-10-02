# Homepage design lab

Open `/designs/` on the existing dev server (usually http://localhost:4242/designs/).
The sticky switcher links to four static routes:

- `/designs/warm-editorial/`
- `/designs/dark-studio/`
- `/designs/bold-type/`
- `/designs/modular-magazine/`

`Layout.astro` owns the isolated document, header, footer, switcher, and lightweight
search/topic interaction. `Home.astro` loads the same nine real, listed English
posts for every design through PostCollections. `Article.astro` owns the shared
article markup and optimized imagery. Each named block in `styles.css` can be
changed independently. No dependencies, production layout imports, or global
theme changes are needed.

The search box and topic pills filter the preview's nine articles; the archive,
project, about, consulting, and article links open the existing site pages. The
previews have noindex metadata and are excluded from Pagefind and the sitemap.

To remove the experiment, delete `src/design-lab/` and `src/pages/designs/`, and
remove the `/designs/` entry from `ignorePaths` in `astro.config.mjs`. Generated
reference images and prompts remain in `output/design-mockups/2026-10-02/`.
