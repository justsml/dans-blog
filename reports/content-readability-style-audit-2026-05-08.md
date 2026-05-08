# DanLevy.net Content, Readability, Voice, and Layout Audit

Generated: 2026-05-08  
Scope: `src/content/posts/**/index.md(x)`, article layout/CSS, article lists, quiz UI, and representative page components.  
Method: five parallel review passes covering prose/readability, DanLevy.net voice, content strategy/metadata, typography/layout, and technical correctness/maintenance. No source files were edited as part of the review.

## Executive Summary

The blog has a strong and recognizable center of gravity: practical engineering judgment, concrete failure modes, skepticism toward fashionable abstractions, and humor that works best when it sharpens the lesson. The best recent posts, especially the 2026 AI/security/search drafts, sound like an engineer explaining the expensive mistake behind the abstraction.

The main risks are not that the site lacks voice or substance. The risks are drift and friction:

- Some 2024-2025 refreshed posts read like vendor/blog-marketing prose rather than DanLevy.net.
- Visibility flags, dates, taxonomy, and related links need an editorial system.
- Several current AI/search/database posts make fast-aging claims that need verification before publication.
- The article reading layer is visually memorable but too loud for long-form technical reading.
- Wide tables, code blocks, quiz explanation panes, and extra in-body H1s create rendering and semantics risk.
- A few posts are competing with each other for the same search/query intent.

Best next move: run a two-track cleanup. First, fix sitewide structural issues that improve every post: article typography, tables/code/figures, visibility rules, related links, internal link checks. Second, revise the highest-value content clusters: Search/Postgres/vector, GenUI, Pagefind/Algolia, Docker/security, quizzes, and the older Promise/Docker legacy posts worth preserving.

## Top 40 Issues

### 1. Normalize the editorial visibility model

Severity: High  
Importance: Prevents accidental publish/unpublish bugs and confusing build behavior.  
Files: `src/shared/postVisibility.ts`, many post frontmatters.

Problem: `publish`, `draft`, `hidden`, and `unlisted` are mixed in contradictory combinations. Examples include:

- `src/content/posts/2015-06-06--javascript-scope-magic/index.md:8` has `draft: true` with `publish: true`.
- `src/content/posts/2015-06-12--love-computer-languages/index.mdx:7` has `draft: true`, `hidden: true`, and `publish: true`.
- `src/content/posts/2026-04-16--lancedb-wasm-browser-client/index.mdx:9` has `draft: false`, `hidden: true`, and `publish: false`.

Suggested fix: define one state matrix: `published`, `unlisted`, `draft`, `archived`. Document exactly how each maps to frontmatter and PostCollections filtering. Then add a validation script that flags contradictory combinations.

### 2. Fix the semantic vector post publication/date mismatch

Severity: High  
Importance: Prevents a future-looking slug from being routable early or sorted oddly.  
File: `src/content/posts/2026-05-09--semantic-vector-search-landscape/index.mdx`

Problem: The directory says `2026-05-09`, frontmatter says `date: 2026-05-01`, and draft/hide fields are commented out at lines 9-12. On 2026-05-08, this can appear publishable despite the future directory date.

Suggested fix: align directory date, frontmatter date, and intended publish state before release.

### 3. Add an internal absolute-link checker

Severity: High  
Importance: Catches broken post links before build/deploy.  
File: `src/content/posts/2026-05-05--prompt-injection-new-sql-injection/index.mdx:243`

Problem: The post links to `/production-ai-is-terrifying-and-how-to-fix-it/`, but the actual Mastra security slug appears to be `/mastra-security-guardrails/`.

Suggested fix: add a custom check that scans Markdown/HTML absolute links and compares them to known `PostCollections` slugs.

### 4. Consolidate the search/Postgres/vector content cluster

Severity: High  
Importance: Reduces reader confusion and search cannibalization.  
Files:

- `src/content/posts/2026-05-08--postgres-text-search-guide/index.mdx`
- `src/content/posts/2026-05-08--postgres-fts-vs-pgvector/index.mdx`
- `src/content/posts/2026-05-09--semantic-vector-search-landscape/index.mdx`

Problem: These posts repeat the "search is not one thing" thesis, vector store discussion, hybrid search, and exact-vs-semantic distinctions.

Suggested fix: assign one job per post:

- Postgres text guide: implementation guide for FTS, trigrams, exact SQL.
- FTS vs pgvector: decision article for staying in Postgres until proven otherwise.
- Semantic vector landscape: vector/hybrid buyer's map once Postgres is not enough.

### 5. Consolidate the duplicate GenUI drafts

Severity: High  
Importance: Avoids maintaining two drifting versions of a fast-moving topic.  
Files:

- `src/content/posts/2026-05-06--llm-generative-ui-landscape/index.mdx`
- `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx`

Problem: Same topic, similar subtitles/tags, overlapping frameworks/protocols, and a second draft with missing image fields.

Suggested fix: keep one canonical draft. Redirect, delete, or archive the other before publication.

### 6. Create a "last verified" convention for fast-moving claims

Severity: High  
Importance: AI/tooling/security/database claims age quickly.  
Files: especially AI, search, Docker/security, OpenClaw/Tailscale, serverless database posts.

Problem: Posts cite current model names, protocol maturity, GitHub stars, feature caps, cost/perf numbers, product docs, and security behavior without a visible verification date.

Suggested fix: add a small note pattern for volatile sections: "Tooling notes verified on YYYY-MM-DD." Link primary sources near claims.

### 7. Soften prompt-injection mitigation overclaims

Severity: High  
Importance: Security credibility.  
File: `src/content/posts/2026-05-07--stop-hardcoding-your-prompts/index.mdx:175`

Problem: Structural separation is called "the structural fix," and line 311 says it can "eliminate injection vectors by design." Escaping and structure reduce risk; they do not eliminate prompt injection.

Suggested fix: use "reduce," "contain," or "make easier to validate," and pair the pattern with tool permissions, output validation, and capability boundaries.

### 8. Tighten Docker security guidance

Severity: High  
Importance: Avoids unsafe operational advice.  
File: `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx`

Problem: Line 46 recommends pulling/building on startup to stay latest, which can introduce unreviewed breaking changes. Line 471 implies Basic Auth is enough to stop automated CSRF, which is too strong.

Suggested fix: recommend reviewed update automation such as Renovate/Dependabot plus staged rollouts. Describe Basic Auth as friction, not CSRF protection.

### 9. Improve long-form article typography

Severity: High  
Importance: Affects every post.  
Files: `src/styles/global.css`, `src/styles/layout.css`

Problem: Article body styles use ultra-light weight and visible letter spacing across a wide measure. This makes long technical posts feel airy but tiring.

Suggested fix: set article body weight closer to normal, `letter-spacing: 0`, and cap prose width around 65-72ch while preserving breakout lanes for diagrams/tables.

### 10. Calm the article heading system

Severity: High  
Importance: Improves scanning, especially in technical posts.  
File: `src/styles/global.css`

Problem: Body headings inherit large line-height, glow/gradient treatment, and decorative font behavior that works as brand but competes with dense technical content.

Suggested fix: reserve the strong neon treatment for the article H1. Use a crisp readable sans for H2-H6 with tighter spacing and stronger hierarchy.

### 11. Preserve ordered-list semantics

Severity: High  
Importance: Technical instructions and quiz explanations rely on list meaning.  
Files: `src/styles/global.css`, `src/styles/nav.css`

Problem: Global `li::marker` arrow treatment can override ordered/procedural lists.

Suggested fix: apply arrow markers only to selected unordered lists, not all `li` globally.

### 12. Add global table overflow and styling

Severity: High  
Importance: Prevents mobile layout breakage.  
Files: global article CSS, table-heavy posts.

Examples:

- `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx:315`
- `src/content/posts/2026-05-08--postgres-fts-vs-pgvector/index.mdx:329`

Suggested fix: style article tables with horizontal overflow, smaller table text, readable headers, and clear cell spacing.

### 13. Fix structured data/script placement in post layout

Severity: High  
Importance: Avoids HTML recovery quirks and SEO fragility.  
File: `src/layouts/Post.astro`

Problem: `PostLinkedData`, font preload link, and script are emitted after `</body>`.

Suggested fix: move structured data and font links into `<head>` or before `</body>`.

### 14. Remove body H1s from posts

Severity: High  
Importance: Corrects document outline and rendering hierarchy.  
Files include:

- `src/content/posts/2025-09-15--serverless-database-magic/index.mdx:16`
- `src/content/posts/2024-10-23--honest-priorities/index.mdx:17`
- `src/content/posts/2024-11-08--quiz-css-core-fundamentals/index.mdx:20`
- `src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/index.mdx:20`

Suggested fix: body content should generally start with prose or `##`. Add an MDX lint rule for no body `#` or `<h1>`.

### 15. Fix quiz explanation/code hard widths

Severity: High  
Importance: Prevents narrow-screen overflow in quizzes.  
File: `src/components/QuizUI/index.css`

Problem: Explanation/code areas use hard-coded widths like `calc(550px - 3.3rem)`.

Suggested fix: use `width: 100%; max-width: 100%; overflow-x: auto`.

### 16. Add a related-link strategy

Severity: High  
Importance: Improves reader flow, SEO, and footer recommendations.  
Files: post frontmatter, `src/layouts/Post.astro`, `src/components/Footer.astro`

Problem: The `related` frontmatter feature is effectively unused.

Suggested fix: add related clusters for Promises, Docker/security, Pagefind/search, Postgres/vector search, quizzes, AI agents, and leadership posts.

### 17. Create a controlled taxonomy

Severity: High  
Importance: Improves category pages, search facets, and editorial consistency.  
Files: post frontmatter, `src/content.config.ts`

Problem: Categories and tags splinter: `AI` vs `ai`, `lanceDB` vs `lancedb`, `Databases` vs `Database`, singleton categories like `Regex`, `Search`, `HowTo`, `Lulz`.

Suggested fix: define a controlled top-level set such as `AI`, `Code`, `Security`, `DevOps`, `Leadership`, `Quiz`, `Thoughts`. Normalize tag casing.

### 18. Rewrite the Pagefind/Algolia post out of vendor-blog voice

Severity: High  
Importance: It likely matters for site search/product positioning.  
File: `src/content/posts/2025-03-01--you-might-not-need-algolia/index.mdx`

Problem: Phrases like "landscape," "robust," "streamlined," "blazing-fast," and "scales seamlessly" flatten the voice.

Suggested fix: rebuild around the concrete thesis: "You probably do not need hosted search for a static/content site." Use Dan's actual migration story, cost/ops constraints, and Pagefind decision rules.

### 19. Rewrite or reframe the serverless database post

Severity: High  
Importance: Current version reads like a market map and has stale-prone claims.  
File: `src/content/posts/2025-09-15--serverless-database-magic/index.mdx`

Problem: "Landscape has fundamentally shifted," "enterprise-grade," "unlock," and broad checkbox comparisons weaken the argument. It also includes precise tool stars/perf numbers and `@latest` imports.

Suggested fix: narrow the thesis to object-storage-backed search for read-heavy, medium-sized, publishable data. Mark claims as a dated snapshot or refresh them.

### 20. Rewrite the MCQ post around Dan's actual quiz-building insight

Severity: High  
Importance: Strong topic, weak house voice.  
File: `src/content/posts/2025-01-01--the-unassuming-power-of-multiple-choice-questions/index.mdx`

Problem: Academic/education-marketing language: "sophisticated tools," "unprecedented versatility," "paradigm shift," "powerful catalysts."

Suggested fix: make the enemy lazy recall questions. Show two bad questions becoming one good question.

### 21. Review `Replacing Myself with AI` as an artifact or rewrite from a scar

Severity: Medium-High  
Importance: It is the clearest generic AI-draft voice.  
File: `src/content/posts/2024-12-05--replacing-my-job-with-gpt-and-llm/index.mdx`

Problem: "AI as collaborator," "unlocked productivity," "extraordinary outcomes," and "possibilities are endless" do not sound like current DanLevy.net.

Suggested fix: either preserve as a moment-in-time artifact or rewrite around what changed, what failed, what became cheaper, and what still needs human taste.

### 22. Reduce catalog density in the GenUI v2 draft

Severity: Medium-High  
Importance: Keeps a useful post readable.  
File: `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx`

Problem: The ecosystem tour becomes dense before the reader has a durable decision frame.

Suggested fix: move a compact "choose this if..." decision table earlier. Make the tool catalog skimmable reference material.

### 23. Rename or reframe "landscape" titles

Severity: Medium-High  
Importance: Reduces SEO-ish title energy.  
Files:

- `src/content/posts/2026-05-06--llm-generative-ui-landscape/index.mdx`
- `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx`
- `src/content/posts/2026-05-09--semantic-vector-search-landscape/index.mdx`

Suggested fix: title toward the enemy or decision: "Generative UI Is Four Different Problems" or "Semantic Search: pgvector, Hybrid Search, and When Postgres Stops Being Enough."

### 24. Clarify "semantic vector search" opening

Severity: Medium-High  
Importance: The active draft gets meta too early.  
File: `src/content/posts/2026-05-09--semantic-vector-search-landscape/index.mdx:24`

Problem: "The engineers who are most persuasive..." and "This article covers..." explain the article instead of pulling the reader into the problem.

Suggested fix: lead with the email lookup vs debugging article contrast and quickly state the rule: correct answer vs relevance.

### 25. Verify vector database caps/cost/performance claims

Severity: High  
Importance: Very stale-prone technical comparison.  
Files:

- `src/content/posts/2026-05-09--semantic-vector-search-landscape/index.mdx:293`
- `src/content/posts/2026-05-08--postgres-fts-vs-pgvector/index.mdx:327`

Suggested fix: add source links and "verified on" dates. Avoid "best-in-class" wording unless sourced.

### 26. Clarify Postgres trigram/prefix wording

Severity: Medium  
Importance: Technical precision.  
File: `src/content/posts/2026-05-08--postgres-text-search-guide/index.mdx:116`

Problem: The prose says "leading wildcard," but the example `ILIKE $1 || '%'` is prefix search.

Suggested fix: distinguish prefix search, suffix search, and substring/leading-wildcard search. Also soften `pg_search` from "drop-in upgrade path" to "possible upgrade path."

### 27. Add MDX markdown-inside-JSX checks

Severity: Medium  
Importance: Prevents literal `[link](...)` rendering.  
Files include:

- `src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/index.mdx:570`
- `src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/index.mdx:56`
- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx:220`

Suggested fix: convert markdown links inside raw HTML/JSX to `<a href="">` or MDX components.

### 28. Display hero credits and improve hero alt text

Severity: Medium  
Importance: Accessibility and attribution polish.  
Files: `src/layouts/Post.astro`, posts with `cover_credit`.

Problem: `cover_credit` exists in frontmatter but is not displayed. Hero image alt text uses the post title even when the image is decorative.

Suggested fix: add `cover_alt` and a hero figure component with optional caption/credit.

### 29. Recompute hero image preload sizes by selected variant

Severity: Medium  
Importance: Performance polish.  
File: `src/layouts/Post.astro`

Problem: preload sizes always use full-width sizing even for non-full-width hero variants.

Suggested fix: compute `imagesizes` from the selected hero image path.

### 30. Normalize figure/caption patterns

Severity: Medium  
Importance: Improves visual explanation and consistency.  
Files: multiple posts with diagrams/images.

Problem: Some diagrams have captions, many do not, and figure styling is inconsistent.

Suggested fix: introduce a reusable MDX figure pattern and CSS for caption size, contrast, spacing, image max-height, and breakout behavior.

### 31. Reduce code block size and improve overflow behavior

Severity: Medium  
Importance: Long shell/YAML/security posts need durable code rendering.  
Files: `src/styles/global.css`, `src/styles/nav.css`, `src/components/CodeTabs/codeTabs.css`

Suggested fix: keep code around `.875rem-1rem`, ensure `overflow-x: auto`, and remove global negative mobile margins.

### 32. Fix subtitle semantics

Severity: Medium  
Importance: Cleaner outline and accessibility.  
File: `src/layouts/Post.astro`

Problem: `subTitle` renders as an H2 even though it is a deck/summary, not a section heading.

Suggested fix: render as `<p class="p-summary article-dek">`.

### 33. Standardize quiz template and hydration

Severity: Medium  
Importance: Keeps quiz pages predictable.  
Files: quiz posts and `src/components/QuizUI`

Problem: Some quiz bodies duplicate H1s, some use different hydration (`client:visible` vs `client:load`), and wrapper copy drifts generic.

Suggested fix: create one quiz post template with standard intro, no body H1, consistent hydration, and a subject-specific CTA.

### 34. Add bottom padding for fixed quiz score bar

Severity: Medium  
Importance: Avoids content being covered.  
File: `src/components/QuizUI/index.css`

Suggested fix: add quiz content bottom padding equal to fixed score bar height and verify keyboard/focus behavior.

### 35. Reduce humor density in "Beware the Single-Purpose People"

Severity: Medium-High  
Importance: Strong enemy, but the bit can crowd the lesson.  
File: `src/content/posts/2025-04-03--beware-the-single-purpose-people/index.mdx`

Problem: The opening and middle sections stack ornate jokes, labels, and metaphors before a clean practical rule.

Suggested fix: open with the concrete "15 files for 100 lines" pain. Keep one sharp joke per beat, then land the rule: group code by change reason, not molecule size.

### 36. Add historical framing to thin legacy posts

Severity: Medium  
Importance: Preserves old charm without misleading current readers.  
Files include:

- `src/content/posts/2015-03-12--docker-makes-everything-better/index.md`
- `src/content/posts/2018-09-26--promise-gotchas/index.md`
- `src/content/posts/2015-08-05--angularjs-v2-impending-schism/index.md`
- `src/content/posts/2017-05-10--pitfalls-in-promise-docs/index.md`

Suggested fix: add a short "historical note" or mark low-value fragments unlisted.

### 37. Run a typo-only pass on older posts

Severity: Low-Medium  
Importance: Easy credibility cleanup while preserving voice.  
Examples:

- `src/content/posts/2015-02-24--security-notes-regex/index.mdx:15` "suprising"
- `src/content/posts/2015-04-06--docker-server-setup-notes/index.mdx:20` "persistance"
- `src/content/posts/2021-03-03--the-4-pillars-of-collaborative-culture/index.md:91` "Whernever"
- `src/content/posts/2015-06-06--docker-firewall-setup/index.md:40` "Firtewall"
- `src/content/posts/2024-11-28--quiz-postgres-sql-mastery-pt2/index.mdx:21` "Postres"

Suggested fix: run a conservative spelling pass. Do not rewrite old personality unless the post is being refreshed.

### 38. Refresh stale model/tooling examples

Severity: High  
Importance: Current claims need current proof.  
Files:

- `src/content/posts/2026-01-02--llm-routing-mastra-ai/index.mdx`
- `src/content/posts/2026-05-06--llm-generative-ui-landscape/index.mdx`
- `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx`
- `src/content/posts/2025-09-15--serverless-database-magic/index.mdx`

Suggested fix: verify with primary docs before publish. Where exact names/prices are not central, make examples illustrative instead of ranked.

### 39. Use one popularity system

Severity: Medium  
Importance: Keeps lists and editorial priorities understandable.  
Files: post frontmatter, `src/shared/postsCache.ts`

Problem: Some posts use `popularity`, while popular posts are also hardcoded.

Suggested fix: pick frontmatter-driven or curated-list-driven popularity. Document the choice.

### 40. Harmonize article-card systems

Severity: Medium  
Importance: Improves list/footer polish.  
Files:

- `src/components/ArticleCard.css`
- `src/components/AdditionalReading.css`
- `src/components/Footer.astro`

Problem: Home cards, additional reading tiles, and footer article cards restyle similar content separately and visually drift.

Suggested fix: extract shared card tokens/classes for metadata, image treatment, title/subtitle clamp, and focus states.

## File-by-File Remediation Backlog

### `src/layouts/Post.astro`

- High: Move structured data, font links, and post-enhancement script inside valid document locations.
- Medium: Render `subTitle` as lead/deck prose instead of H2.
- Medium: Add hero figure support with `cover_alt` and `cover_credit`.
- Medium: Recompute preload `imagesizes` according to selected hero variant.

### `src/styles/global.css`

- High: Improve article body readability: normal weight, `letter-spacing: 0`, tighter readable measure.
- High: Calm body heading styles and reserve heavy neon treatment for H1/brand moments.
- High: Restrict custom list markers to unordered decorative lists, not ordered instructions.
- High: Add table overflow/polish.
- Medium: Reduce code block font scaling and remove fragile negative margins.
- Medium: Add consistent figure/figcaption system.

### `src/styles/layout.css`

- High: Revisit article content width and breakout sizing. Keep prose around 65-72ch, reserve breakout for diagrams/tables/callouts.
- Medium: Tune `.inset`, `.breakout`, and `.narrow` spacing for mobile.

### `src/components/QuizUI/index.css`

- High: Remove hard-coded explanation/code widths.
- Medium: Add bottom padding for fixed score UI.
- Medium: Centralize reduced-motion behavior and focus/announcement states.

### `src/components/ArticleCard.css`

- Medium: Let mobile titles breathe to three lines where needed.
- Medium: Use less aggressive media crop than `16 / 4` for browsing comprehension.
- Medium: Share card tokens with additional reading/footer cards.

### `src/content/posts/2026-05-09--semantic-vector-search-landscape/index.mdx`

- High: Align directory date, frontmatter date, and publish flags.
- High: Verify vector DB dimensions/cost/performance matrix with source links.
- Medium-High: Rework opening to avoid "This article covers..." meta-prose.
- Medium: Rename/reframe the title to match the practical seriousness of the post.
- Medium: Separate buyer's-guide material from essay flow.

### `src/content/posts/2026-05-08--postgres-fts-vs-pgvector/index.mdx`

- High: Reduce overlap with Postgres text guide and semantic vector post.
- High: Verify vector-store comparison/cap claims.
- Medium: Make this the "stay in Postgres until proven otherwise" decision article.

### `src/content/posts/2026-05-08--postgres-text-search-guide/index.mdx`

- Medium: Clarify prefix vs leading-wildcard trigram example.
- Medium: Soften ParadeDB `pg_search` from "drop-in upgrade path" to "possible upgrade path."
- Medium: Use this as the implementation guide, not the buyer's guide.

### `src/content/posts/2026-05-06--llm-generative-ui-landscape/index.mdx`

- High: Decide whether this or the 2026 version is canonical.
- Medium-High: Verify young protocol/tool claims before publish.
- Medium: Rename away from generic "landscape" if keeping.

### `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx`

- High: Consolidate with the earlier GenUI draft.
- Medium-High: Move decision table earlier.
- Medium-High: Add "last verified" sources for protocol/tool claims.
- Medium: Add/normalize image frontmatter before publish.
- Medium: Tighten abstract ending into a practical decision rule.

### `src/content/posts/2026-05-05--prompt-injection-new-sql-injection/index.mdx`

- High: Fix broken internal Mastra security link at line 243.
- Low: Preserve as a voice exemplar for future AI/security posts.

### `src/content/posts/2026-05-07--stop-hardcoding-your-prompts/index.mdx`

- High: Soften "eliminate injection vectors by design" and "the structural fix."
- Medium: Keep as a voice exemplar, but add precise security caveats.

### `src/content/posts/2026-05-05--rag-pipeline-failures/index.mdx`

- Low: Preserve as a voice exemplar.
- Medium: Ensure any current RAG/tooling claims have source links before publish.

### `src/content/posts/2026-05-06--llm-evals-are-broken/index.mdx`

- Low: Preserve opening/voice as exemplar.
- Medium: Verify current eval tooling claims before publish.

### `src/content/posts/2026-01-02--llm-routing-mastra-ai/index.mdx`

- High: Verify model names, availability, pricing, and rankings.
- Medium: Make model IDs illustrative examples rather than durable recommendations.
- Medium: Refocus the thesis on task routing, not provider leaderboard.

### `src/content/posts/2026-01-04--mastra-mcp-tool-integrations/index.mdx`

- Medium-High: Reduce product-tutorial/promotional phrasing.
- Medium: Add failure modes: auth boundaries, tool drift, permissioning, and what MCP does not solve.

### `src/content/posts/2026-01-30--llm-connection-strings/index.mdx`

- Medium: Tighten security aside around credentials in URLs/logs.
- Low: Preserve distinct thesis and humor, but keep security caveats crisp.

### `src/content/posts/2025-03-01--you-might-not-need-algolia/index.mdx`

- High: Rewrite vendor-blog language.
- High: Center actual Pagefind migration/cost/indexing story.
- Medium: Update `PageFind` spelling to `Pagefind` where applicable if that is the chosen convention.

### `src/content/posts/2025-09-15--serverless-database-magic/index.mdx`

- High: Narrow thesis and remove market-map language.
- Medium-High: Refresh stale tool claims, star counts, performance ranges, and `text-embedding-ada-002`.
- Medium: Avoid `@latest` in code examples.
- Medium: Mark S3 Vector/status claims as dated or refresh.

### `src/content/posts/2025-01-01--the-unassuming-power-of-multiple-choice-questions/index.mdx`

- High: Rewrite academic/marketing language into Dan's concrete quiz-building voice.
- Medium: Show before/after examples of bad vs good MCQs.

### `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx`

- High: Replace startup latest-pull guidance with reviewed update automation.
- High: Reword Basic Auth/CSRF claim.
- Medium: Fix markdown-inside-HTML/JSX patterns.
- Medium: Normalize `macOS`, `Cloudflare`, and related spelling.

### `src/content/posts/2026-01-26--securing-clawdbot-tailscale/index.mdx`

- Medium: Verify OpenClaw commands and audit counts against current docs.
- Medium: Label incident/audit counts as historical.

### `src/content/posts/2025-04-03--beware-the-single-purpose-people/index.mdx`

- Medium-High: Reduce opening joke density and fix typos.
- Medium: Add before/after code organization examples.
- Medium: Keep one sharp joke per beat, then land the rule.

### `src/content/posts/2024-12-05--replacing-my-job-with-gpt-and-llm/index.mdx`

- Medium-High: Decide whether to preserve as a time-capsule or rewrite.
- Medium: Replace generic AI-collaboration claims with workflow specifics, failures, and human taste boundaries.

### `src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/index.mdx`

- Medium: Improve figure captions so they explain why the diagram matters.
- Low: Frontmatter image paths are inconsistent with newer `./` style; normalize if touching.

### `src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/index.mdx`

- Medium: Fix markdown-inside-HTML/JSX risk around line 56.
- Medium: Split long list paragraphs for scan mode.

### `src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/index.mdx`

- High: Remove any in-body H1 patterns.
- Medium: Fix markdown links inside raw HTML/JSX.
- Medium: Normalize `social_image` to expected desktop/social convention if that is adopted.

### `src/content/posts/2024-11-28--quiz-postgres-sql-mastery-pt2/index.mdx`

- Low-Medium: Fix "Postres" typo.
- Medium: Standardize quiz intro/outro template.

### `src/content/posts/2024-12-28--quiz-in-the-aws-cloud/index.mdx`

- Medium: Replace generic "dive deep / best practices / landscape" wrapper copy with sharper challenge framing.
- Medium: Verify current AWS service claims if refreshing.

### `src/content/posts/2024-12-28--quiz-is-your-memory-rusty/index.mdx`

- Low-Medium: Replace generic "Let's dive in" wrapper copy.
- Medium: Keep code blocks readable on mobile after CSS cleanup.

### `src/content/posts/2026-05-09--quiz-context-engineering/index.mdx`

- Medium: Keep draft flags unless publishing.
- Low-Medium: Rephrase "cl100k (GPT-4)" as tokenizer-specific rather than universal.

### `src/content/posts/2025-09-10--patchy-with-a-chance-of-vulnerability/index.mdx`

- Low-Medium: Source/qualify CrowdStrike hospital impact claim.
- Low-Medium: Soften hardware-token social-engineering language.

### `src/content/posts/2021-03-03--creating-collaborative-culture/index.md`

- Medium: Add concrete team rituals, proposal examples, and failure stories if revising.
- Low: Preserve earnest historical voice.

### `src/content/posts/2021-03-03--the-4-pillars-of-collaborative-culture/index.md`

- Medium: Add specificity to "safety/speed/clarity/commitment."
- Low-Medium: Fix obvious typo at line 91.

### `src/content/posts/2015-06-12--love-computer-languages/index.mdx`

- Medium: Fix invalid `modified: 2017-02-30`.
- Medium: Decide archive/draft state and remove contradictory flags.

### `src/content/posts/2015-06-06--javascript-scope-magic/index.md`

- Medium: Decide archive/draft state and remove contradictory flags.
- Low: Preserve as legacy unless refreshing.

### `src/content/posts/2015-06-06--docker-firewall-setup/index.md`

- Low-Medium: Fix "Firtewall" typo.
- Medium: Historical/security note if keeping indexed.

### `src/content/posts/2015-03-12--docker-makes-everything-better/index.md`

- Medium: Add historical note or unlist.
- Medium: Add a real ending or rule of thumb if preserving as an article.

### `src/content/posts/2018-09-26--promise-gotchas/index.md`

- Medium: Starts as a snippet and at lower heading depth. Add historical note or expand.

### `src/content/posts/2017-05-10--pitfalls-in-promise-docs/index.md`

- Low-Medium: Add historical note around Q/Promise ecosystem claims.

## Recommended Cleanup Plan

### Phase 1: Structural Safety

1. Define and validate editorial visibility states.
2. Add internal absolute-link checking.
3. Add no-body-H1 MDX check.
4. Add markdown-inside-JSX/HTML check.
5. Add date/slug mismatch reporting.

### Phase 2: Reading System

1. Adjust article typography: body weight, letter spacing, measure.
2. Calm body headings.
3. Fix lists, tables, code blocks, figures/captions.
4. Fix post layout placement of structured data/scripts.
5. Fix quiz explanation widths and fixed score padding.

### Phase 3: Editorial Strategy

1. Consolidate Search/Postgres/vector cluster.
2. Consolidate GenUI drafts.
3. Add `related` clusters.
4. Normalize taxonomy and image metadata for high-value posts.
5. Choose one popularity system.

### Phase 4: High-Value Rewrites

1. Rewrite Pagefind/Algolia.
2. Rewrite/refocus serverless database.
3. Rewrite MCQ post.
4. Tighten Docker/security guidance.
5. Refresh model/tooling claims in AI posts.

### Phase 5: Legacy Preservation

1. Add historical notes to thin/stale legacy posts.
2. Run typo-only cleanup.
3. Unlist fragments that are not worth modernizing.

## Validation Commands

```bash
bun run check
bun run test:e2e
bun run fix-quizzes
bun run build
```

Notes:

- `bun run check` passed during the technical review with no errors, though existing warnings/hints were reported.
- `bun run fix-quizzes` may modify quiz files; run it on a clean tree.
- `bun run build` may update `public/_redirects`; redirects should still be managed through post frontmatter.
