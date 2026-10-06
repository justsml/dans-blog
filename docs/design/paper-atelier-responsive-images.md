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

Runtime delivery results will be recorded in
`output/paper-atelier-promoted/verification.json` after the production build.
