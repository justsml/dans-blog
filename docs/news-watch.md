# News Watch Capture Pipeline

This is a local-first capture layer for finding AI/LLM stories that are starting to move.
It stores source items, markdown snapshots, observations, and trend signals in SQLite.

## Commands

```bash
bun run news:watch -- --all
bun run news:watch
bun run news:watch:daemon
bun run news:watch:report
```

`--all` ignores the per-source schedule and polls every enabled source once. Without it,
the script only polls sources whose `next_poll_after` has passed.

Generated data lives under `data/news-watch/` and is gitignored:

- `news-watch.sqlite` - SQLite database
- `items/` - markdown snapshots for each captured source item
- `screenshots/` - reserved for later article screenshots

## Current Sources

The first adapters are intentionally simple and durable:

- Google News RSS searches for AI/frontier model/local LLM terms.
- Reddit JSON listings for AI-heavy communities such as `r/LocalLLaMA`, `r/OpenAI`, and `r/MachineLearning`.

Source definitions live in `src/scripts/news-watch/config.ts`.

Reddit's unauthenticated JSON listings can return `403 Blocked` depending on the
runtime environment. The runner records those as source failures and keeps polling
other sources. For reliable Reddit coverage, add a credentialed Reddit API adapter
instead of trying to disguise browser or HTTP automation.

The Reddit adapter now tries credentialed OAuth first when these environment
variables are present:

```bash
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
```

Create a Reddit app for this workflow, keep the secret out of git, and use a clear
`NEWS_WATCH_USER_AGENT` that identifies the project/contact. Without credentials,
the adapter falls back to public JSON and then Reddit's Atom/RSS listing URL, but
those may be blocked or rate-limited from some networks.

## Trend Signals

Every poll records a metric observation. A signal is inserted when a relevant item is:

- newly visible in a high-ranking feed position,
- growing unusually fast between observations,
- or already at high engagement for its relevance score.

When a source emits a signal, its next poll switches to the configured rapid interval
for an hour. For Reddit sources this is currently one to two minutes. Sources without
signals back off to their normal poll interval. Failed sources use exponential backoff.

## X, LinkedIn, Apple News

The placeholders in `config.ts` are there so the storage and scheduler are ready, but
they are disabled by default. Use approved APIs, partner access, RSS feeds, owned
exports, or manually supplied JSONL for those surfaces.

## Browser TLS Impersonation (Audit)

Reddit and similar surfaces frequently serve the unauthenticated public JSON listing
through Cloudflare or equivalent bot-detection layers. To capture what an actual
browser session would see, sources can opt in to a TLS/JA3 impersonation profile:

```ts
{
  key: "reddit-local-llama",
  type: "reddit",
  url: redditListingUrl("LocalLLaMA"),
  impersonate: "chrome124",
  auditLabel: "anon-browser-impersonation",
  ...
}
```

Implementation: `src/scripts/news-watch/fingerprint-fetch.ts` (Bun-side orchestrator)
delegates to `src/scripts/news-watch/impersonated-fetch-node.mjs` (Node subprocess
that uses the official `impers` package, a Node binding for `lexiforest/curl-impersonate`).

The Bun side cannot import `impers` directly: Bun's NAPI shim is missing
`uv_handle_size` (oven-sh/bun#18546), and koffi (impers' FFI layer) needs it. The
subprocess runs under system Node and the result is JSON-returned over stdout. Set
`NEWS_WATCH_NODE_BINARY=/path/to/node` to override the auto-detected binary.

Supported profiles: `chrome99` through `chrome146` (incl. `chrome133a` A/B variant and
`chrome99_android` / `chrome131_android`), `safari153` through `safari2601` (incl.
iOS variants), `firefox133` through `firefox147`, `tor145`, `edge99`, `edge101`.
Default is `chrome146` (newest stable Chrome fingerprint the bundled
`libcurl-impersonate v1.5.6` supports).

Audit results so far (2026-07-07): Reddit's Cloudflare-fronted `.json` listings
return HTTP 403 for every browser profile tested (`chrome124`–`chrome146`,
`firefox147`) from a fresh, cookie-less session, with identical 189908-byte
block-page bodies. The pipeline records the block, the profile used, and the
response duration so the operator can compare profiles, header sets, and proxy
egress.
