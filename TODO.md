# TODO

## Performance

- [ ] Create a standard extraction contract for each document type (PDF, HTML, Markdown, etc.) that includes both the extracted text, images, image descriptions, charts, and metadata like token count, chunk count, markdown headers, links, ocr stats, and extraction time. This will allow us to make informed decisions about which extraction methods to use for different document types and sizes. Goal: measure quality, latency and perf issues. ToC, Tables, LaTeX, Code, QR codes, and images are all known pain points that we should prioritize. Write tests to benchmark each added document extraction method we add. (As much content as possible should end up in markdown, with relative image paths & successfully extracted images. The MD needs to be rendered in our UI, but we should also capture the raw text and metadata for search and other non-rendering use cases.)
- [ ] Re-measure homepage and article pages after the current lazy-load pass to confirm LCP, TBT, and request-count improvements.
- [x] Keep PostHog lean by loading only the core client up front and deferring heavier add-ons like session recording, tracing headers, and exception capture until they are clearly needed.
- [x] Keep search lazy. The header should only load Pagefind assets and initialize the UI after someone opens search.
- [x] Keep `htmx` scoped to the homepage article feed and paginated feed partials instead of shipping it site-wide.
- [x] Continue trimming article-page hydration. Share stats, comments, banner effects, and quiz logic should stay behind `client:visible`, idle work, or explicit quiz/banner detection.
- [ ] Revisit article hero image priority and loading behavior to improve article LCP.
- [x] Update PostHog preconnect to the actual ingest host: `https://us.i.posthog.com`.
- [x] Keep hashed asset caching at `max-age=31536000, immutable`.

## Content And Editorial Ops

- [ ] Fix RSS ordering so manually inserted items do not jump ahead of newer posts.
- [ ] Add feed discovery links in `<head>` and consider upgrading `rss.json` to JSON Feed.
- [ ] Tighten related-post matching so article recommendations stay topical instead of partly random.
- [ ] Add or fix `modified` metadata wherever the UI can currently render incomplete “updated ago” states.
- [ ] Create canonical hub pages for stronger topic clusters:
  - Async JavaScript
  - AI agents and routing
  - Postgres and databases
  - Search and vector search
  - Security and self-hosting
- [ ] Publish a few short-form field notes between larger essays to compound authority the way other strong dev blogs do.
- [ ] Add “historical post” or update-context callouts on older time-sensitive posts.
- [ ] Clarify evolving positions across older and newer AI/search/tooling posts with retrospective or “current recommendations” hub posts.

## Optional Visibility / Integration Work

- [ ] Add `/.well-known/security.txt`.
- [ ] Add Fediverse domain identity files only if you want custom-domain Mastodon/WebFinger support.
- [ ] Consider `llms.txt` if AI crawler discoverability matters to you.
- [ ] Consider stronger series/tag landing pages for AI Systems, Postgres Pitfalls, Modern Async JS, and Security for Builders.
