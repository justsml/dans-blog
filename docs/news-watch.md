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

## Trend Signals

Every poll records a metric observation. A signal is inserted when a relevant item is:

- newly visible in a high-ranking feed position,
- growing unusually fast between observations,
- or already at high engagement for its relevance score.

When a source emits a signal, its next poll switches to the configured rapid interval
for an hour. For Reddit sources this is currently one to two minutes. Sources without
signals back off to their normal poll interval. Failed sources use exponential backoff.

## X, LinkedIn, Apple News, And Browser Automation

The placeholders in `config.ts` are there so the storage and scheduler are ready, but
they are disabled by default. Use approved APIs, partner access, RSS feeds, owned
exports, or manually supplied JSONL for those surfaces.

Do not build stealth browser scraping around authenticated social feeds. A browser
collector can still be added for pages you are allowed to access and archive, but it
should use normal rate limits and human-readable audit trails rather than evasion.
