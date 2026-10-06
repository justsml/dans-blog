# Adopted paper editorial image families

Twenty-six approved wide proposals are now the article heroes, landscape card art,
and social images. Their freshly generated square companions are native
1254×1254: the built-in generator returned that size despite a 2048px request.
No upscaling was used. Search icons are separate 160px WebP derivatives.

The English sources and all ten shared locale references were updated together
(286 files across both batches). Article bodies and quiz hydration were preserved. LLM connection
strings retains its original image family, including its useful visual details.

[Selected wide and square compositions](../../output/paper-atelier-promoted/selected.md)
and [promotion manifest](../../output/paper-atelier-promoted/manifest.json) record
the actual files, replaced references, and resolutions. The three square prompt
manifests in the same folder preserve generation provenance and review notes.

## Delivery contract

- Article heroes use Astro-generated WebP width variants up to 1600px. The
  `sizes` attribute describes the reading sheet's actual breakout width.
- `cover_mobile_hero: true` explicitly selects separately composed square art
  below 601px through native `picture` and `source`. Ordinary legacy thumbnails
  remain card-only. Square delivery uses 320, 480, 720, 960, and native 1254px
  variants; candidate widths never exceed the source resolution.
- Hero preload media, srcset, sizes, format, and quality match the rendered hero.
  Only the source appropriate to the viewport is preloaded with high priority.
- Landscape cards use the wide composition, responsive srcset, intrinsic width
  and height, and lazy decoding/loading. Only the initial homepage lead is eager
  with high fetch priority. Initial, appended, category, and footer cards share
  the build-time optimizer; repeated requests are memoized within the build.
- Sparse category grids use one/two-column size hints and candidates up to
  1600px so their larger cards receive appropriately sized images.
- Pagefind uses the small icon rather than downloading a square master for each
  result. No image-selection JavaScript, client image service, or new dependency
  was added. Existing bounded paging cache and quiz lazy hydration remain intact.

## Second adopted batch

The homepage Postgres text-search guide (rank33), plus ranks18–26 from the
editorial queue, are approved and installed with fresh squares across110 files.
[Wide/square compositions](../../output/paper-atelier-promoted-v5/selected.md)
and the adjacent manifest preserve source paths and generation provenance.

Runtime delivery results are recorded in `output/paper-atelier-promoted/verification.json`
and `output/paper-atelier-promoted-v5/verification.json`.

## Vercel branch preview

The current `design/warm-editorial` snapshot is available at
[the Vercel preview](https://dans-blog-warm-editorial.vercel.app), including
all26 adopted families and ExploitHunter in the curated popular-article menu.
The isolated `dans-blog-preview` project serves the existing static Astro build.
Source files and environment files are not uploaded. Existing cache headers,
legacy redirects, and 404 behavior are retained; preview responses carry noindex.

After building, `python3 output/paper-atelier-promoted-v5/prepare-vercel.py`
packages the static output. Deploy using `bunx vercel deploy --prebuilt --target=preview`
and update the review alias to the returned preview URL.

## Existing artwork format completion

All 80 published article families now have landscape and square formats, with
matching references in localized content. Existing photography and approved
artwork remain intact. The format completion manifest records each recut source;
original files are retained. There is no raster upscaling.

Squares are at least 400px; most are 600px or larger. Native 400–494px compositions
remain valid when larger matching artwork is unavailable. Search uses separate
200px WebP icons. Native `picture` selects explicitly enabled square heroes below
601px, with candidates at 200, 320, 400, 600, 960 and native source width as needed.
The preload uses identical media, srcset and sizes. No image-selection JavaScript
or runtime image service is added. LLM connection strings preserves its original
wide hero on both viewport sizes to retain the useful URL details.

Two private drafts with no assigned artwork are excluded.
[Coverage and side-by-side crop review](../../output/hero-coverage/report.md)
and [source manifest](../../output/hero-coverage/manifest.json) record the full inventory.

`bun src/scripts/hero-formats.ts` audits existing families; `--write` fills missing
formats from matching sources and updates shared locale references. Review source
overrides and crops before writing; do not substitute exploratory artwork merely
because it has higher resolution.
