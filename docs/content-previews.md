# Content previews

Netlify pull-request Deploy Previews (`CONTEXT=deploy-preview`), including draft
PRs, generate routes for all posts regardless of `draft`, `hidden`, `publish`, or
`unlisted`. Frontmatter stays unchanged. Production builds keep the existing
editorial visibility rules; `CONTEXT=production` overrides the local preview flag.

For a local or manually deployed preview build:

```sh
BLOG_CONTENT_PREVIEW=1 bun run build
```

The header links to `/preview/`. It lists articles changed against `origin/main`
(or local `main`) first, including new files and changes to images or other files
in a post directory. Translations in a changed article directory are included.
Local staged, unstaged, and untracked changes count too. Deleted articles have no
route and aren't listed. When the clone is shallow, comparison falls back to the
available main tip; when main or Git metadata is absent, the page reports that
comparison is unavailable and still lists all drafts.

Preview-only posts stay out of ordinary production-style lists and RSS feeds.
All preview pages using BaseHead receive `noindex`. This is an indexing control,
not an access control. Netlify preview URLs
remain accessible according to the site's deploy access settings.

Normal production builds generate neither hidden/unpublished article routes nor
the `/preview/` review page. This change does not deploy or publish anything by
itself: commit the article and preview changes to the PR to include them in its
next Deploy Preview.

When a preview build has no GitHub token, the open-source journal shows repository
links in place of live contribution statistics. This keeps article review builds
independent of GitHub authentication; production retains its existing data policy.
