# Social cards and previews

Social cards use the site's paper palette, serif headlines, and local Atkinson font.
Articles pair the title and subtitle with their cover artwork; quizzes show the
first question title and question count, with the question given more space than
the quiz title. Individual question captures include a compact quiz label,
large question heading, readable code and answers, and a “Try the quiz” footer.
They keep their natural height instead of cropping longer questions. The homepage features the three newest
listed English posts. Hidden and private drafts never enter the production card
manifest. Older draft-labelled posts that still have public routes are included
in the capture inventory. Translations receive a card with their own title and text direction.

Use a static build to avoid development reloads while writing image assets:

```sh
bun run build
# Check for an existing preview server before starting one.
bun run preview --port 4343
SITE_URL=http://localhost:4343 bun run screenshots --rss /social-card/capture-feed.json
SITE_URL=http://localhost:4343 bun run social-cards
bun run build
```

`SITE_URL=http://localhost:4343 bun run screenshots --filter Quiz --questions-only`
refreshes just the individual question images.

Run screenshots first: it refreshes desktop/mobile page previews, `main.webp`,
and each quiz question. Social cards then replace the older cropped social
images. The last build includes the new public files and refreshes metadata.

`bun run social-cards --filter <slug>` supports a smaller capture pass; `--missing` captures only cards whose JPEG
is absent. Cards are
1200 × 630 JPEGs in `public/social/`; English cards also refresh the existing
`desktop-social.webp` and `mobile-social.webp` files beside each post. The home
card refreshes `src/assets/social-banner.webp`, the site's default share image.
Post metadata prefers the generated localized card when present and falls back
to cover art for new posts awaiting capture. Card-rendering routes are excluded
from the sitemap and Pagefind and carry `noindex`.
