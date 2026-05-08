# DanLevy.net Content Audit

Generated: Friday, May 8, 2026

Scope: all `src/content/posts/**/index.md` and `index.mdx` files, article layout/CSS, post visibility helpers, article lists, quiz components, and representative rendered-page risks.

Method: five parallel read-only review passes, plus local validation and targeted source verification. The review covered metadata/site integrity, recent AI/search/database factuality, legacy engineering/security factuality, quiz correctness, and prose/readability/layout. The only file changed by this work is this report.

## Executive Summary

DanLevy.net has a strong center of gravity: practical engineering judgment, skepticism toward shiny defaults, concrete failure modes, and humor that usually works best when it sharpens the lesson. The strongest recent posts are the ones that name the production cost behind an abstraction: Postgres search choices, prompt injection boundaries, RAG failure modes, and eval discipline.

The highest-priority problems are not a lack of substance. They are drift:

- The visibility model has contract mismatches that can leak drafts into lists while not generating routes.
- Some current technical examples are stale or wrong: AI SDK APIs/model IDs, Postgres `unaccent()` usage, vector database dimension limits, Docker examples, and a few quiz explanations.
- The article rendering layer is memorable but too loud for long-form technical reading; list markers, code blocks, wide tables, headings, and structured-data placement need sitewide cleanup.
- Fast-moving AI/search/database/security claims need explicit "Last verified" notes and primary-source links.
- Several content clusters overlap: Postgres/search/vector posts and two generative UI drafts need clear canonical roles.
- Older posts often need historical framing rather than hiding; a few legacy snippets should not look like current production advice.

Recommended order:

1. Fix sitewide correctness and rendering risks: visibility, routability, `Post.astro`, list markers, code/table overflow, duplicate H1 checks.
2. Fix concrete factual bugs in active/high-value posts.
3. Consolidate overlapping drafts and add verification notes.
4. Run a focused editorial polish pass on the highest-traffic or soon-to-publish pieces.
5. Add historical notes and typo fixes for legacy posts worth preserving.

## Validation Snapshot

- `bun run content:check`: 0 errors, 105 warnings.
- `bun run fix-quizzes`: checked 21 quizzes successfully.
- `bun run check`: 0 errors, 34 hints.
- Custom read-only audits: checked 92 post entry files, duplicate slugs/redirects, future dates, visibility leaks, image references, related targets, invalid dates, and credit gaps.
- Local frontmatter image assets: no missing active frontmatter assets found. A few naive scan hits were commented-out cover lines or sample code like `src="image.jpg"`.
- Rendered inspection: an Astro dev server was already listening on port 4242, but page checks were unreliable because some requests timed out and `/postgres-text-search-guide/` returned `UnknownContentCollectionError`. I did not start another dev server.

## Top 45 Issues

### 1. Draft Posts Can Appear In Lists While Not Being Routable

Severity: High

Evidence:

- `src/shared/postVisibility.ts:25` defines `isVisiblePostData()` as published and not hidden, but does not exclude `draft:true`.
- `src/shared/postsCache.ts:7` filters `_postsCollection` with `isVisiblePost`.
- `src/pages/index.astro:28` filters home posts by `!unlisted && !hidden`, but not `!draft`.
- `src/shared/postsCache.ts:175` generates static paths only after `isRoutablePost`, which excludes drafts.

Affected examples:

- `src/content/posts/2015-06-06--docker-firewall-setup/index.md:4`
- `src/content/posts/2015-06-06--javascript-scope-magic/index.md:8`
- `src/content/posts/2015-11-22--disable-transparent-hugepages/index.md:3`
- `src/content/posts/2017-05-01--linux-system-benchmark-scripts/index.md:8`

Suggested fix: Either make `isVisiblePostData()` exclude drafts globally, or normalize private draft frontmatter to `publish:false`, `draft:true`, `hidden:true`, `unlisted:true`. The first option is safer because it prevents future half-configured drafts from leaking.

### 2. `unlisted` Says URL-Accessible But Routing Excludes It

Severity: High

Evidence:

- `src/shared/postVisibility.ts:12` documents unlisted as "URL-accessible posts hidden from lists."
- `src/shared/postVisibility.ts:29` excludes `unlisted:true` from `isRoutablePostData()`.
- `src/shared/postsCache.ts:175` uses `isRoutablePost` for static paths.
- `src/content/posts/2018-09-26--promise-gotchas/index.md:10` relates to `are-promises-broken`, while `src/content/posts/2018-10-06--are-promises-broken/index.md:4` is `unlisted:true`.

Suggested fix: Remove `unlisted` from `isRoutablePostData()` if the editorial model is correct. Hide unlisted posts from lists/feed/search separately.

### 3. `Post.astro` Emits Structured Data And Scripts After `</body>`

Severity: High

Evidence:

- `src/layouts/Post.astro:238` closes `</body>` before `PostLinkedData`, font CSS, and the post enhancement script.
- `src/components/Seo/PostLinkedData.astro:54` emits JSON-LD.

Suggested fix: Move JSON-LD and font links into `<head>`. Keep the enhancement script inside `<body>` before the closing tag.

### 4. Ordered Lists Visually Lose Their Numbers

Severity: High

Evidence:

- `src/styles/global.css:194` applies custom `li::marker` content globally.
- Article `ol` styling at `src/styles/global.css:241` expects decimal list behavior.
- Procedural posts and decision rules depend on ordered-list semantics.

Suggested fix: Scope arrow markers to `ul li::marker` or a specific decorative class. Add `ol li::marker { content: normal; }`.

### 5. Article Typography Is Fighting Long-Form Readability

Severity: High

Evidence:

- Article body copy uses ultra-light weight and visible tracking around `src/styles/global.css:178`.
- All headings use `Playwrite AU NSW` at `src/styles/global.css:365`.
- Headings use `line-height: 1.75` at `src/styles/global.css:367`.
- The article H1 gets gradient text and multiple drop shadows at `src/styles/global.css:417`.

Suggested fix: Body copy should be normal weight, normal letter spacing, and a readable measure around 65-72ch. Reserve decorative type and neon treatment for brand accents or the article H1, not every body heading.

### 6. Plain Code Blocks Can Clip On Small Screens

Severity: High

Evidence:

- Base `pre` styling around `src/styles/global.css:266` lacks durable horizontal overflow.
- `main pre` around `src/styles/global.css:527` adds border and margins but not overflow handling.
- Long examples like `src/content/posts/2015-02-24--security-notes-regex/index.mdx:34` are likely to overflow.

Suggested fix: Set `main pre { overflow-x: auto; max-width: 100%; }` and verify quiz/code-tab surfaces separately.

### 7. Wide Editorial Tables Need A Better Mobile Pattern

Severity: High

Evidence:

- 10-column vector database matrix at `src/content/posts/2026-05-08--postgres-fts-vs-pgvector/index.mdx:332`.
- Similar matrix at `src/content/posts/2026-05-01--semantic-vector-search-landscape/index.mdx:303`.
- Tables are scrollable at `src/styles/global.css:1250`, but affordance, captions, and mobile QA are still weak.

Suggested fix: Wrap large editorial tables in a visible scroll container with caption/help text. For 8+ columns, consider cards or split comparison tables.

### 8. Posts Duplicate The Layout H1

Severity: High

Evidence:

- Layout always renders frontmatter title as `<h1>` at `src/layouts/Post.astro:143`.
- Body-level H1 examples include `src/content/posts/2024-11-08--quiz-css-core-fundamentals/index.mdx:20`, `src/content/posts/2025-09-15--serverless-database-magic/index.mdx:16`, and `src/content/posts/2024-10-23--honest-priorities/index.mdx:17`.

Suggested fix: Body content should start with prose or `##`. Add a content check for body-level `# ` and raw `<h1>`.

### 9. Hero Alt Text Is Mostly Generic

Severity: Medium-High

Evidence:

- `src/layouts/Post.astro:77` falls back to `Hero image for ${title}`.
- Local scan found most posts with cover imagery lack `cover_alt`.

Suggested fix: Add `cover_alt` when the image is meaningful. Add a `cover_decorative: true` option that emits empty alt text for decorative art.

### 10. Image Credits Are Inconsistent

Severity: Medium

Evidence:

- Several legacy posts use Unsplash/Pexels-looking asset names without `cover_credit`.
- Example: `src/content/posts/2018-09-26--promise-gotchas/index.md:11`.

Suggested fix: Add missing `cover_credit` where attribution matters, or document an explicit legacy-import exception.

### 11. `content:check` Shows Broad Metadata Drift

Severity: Medium-High

Evidence:

- 105 warnings total.
- 47 tag canonicalization warnings.
- 28 directory/frontmatter date mismatches.
- 23 markdown-inside-JSX warnings.
- 7 visibility warnings.

Suggested fix: Split cleanup into low-risk mechanical PRs: tag canonicalization, date alignment, visibility normalization, and MDX-in-JSX cleanup.

### 12. One Post Has An Invalid Modified Date

Severity: Medium

Evidence: `src/content/posts/2015-06-12--love-computer-languages/index.mdx:4` has `modified: 2017-02-30`.

Suggested fix: Correct to the intended real date or remove `modified` if unknown.

### 13. Future-Dated Drafts Need Pre-Publish Checks

Severity: Low while private, High if accidentally published

Evidence:

- `src/content/posts/2026-05-09--quiz-context-engineering/index.mdx:4` is dated May 9, 2026.
- `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx:4` is dated May 10, 2026.

Suggested fix: Keep fully private until scheduled. Before publish, confirm date, slug, `publish`, `draft`, `hidden`, and `unlisted` flags together.

### 14. AI SDK Math Tool Post Has Broken/Stale API Examples

Severity: High

Evidence:

- `src/content/posts/2026-01-06--ai-sdk-math-tool/index.mdx:97` uses `anthropic('claude-4-5-sonnet-20251115')`.
- `src/content/posts/2026-01-06--ai-sdk-math-tool/index.mdx:100` uses `maxSteps: 5`.

Factual status: likely broken/stale. Anthropic's current Sonnet 4.5 model ID is `claude-sonnet-4-5-20250929` or alias `claude-sonnet-4-5`. AI SDK v5+ moved away from `maxSteps` in favor of `stopWhen: stepCountIs(...)` for current core patterns.

Suggested fix: Update the model ID and current AI SDK control flow. Also replace npm install commands with Bun commands where the post is repo-contextual.

Primary sources:

- https://docs.claude.com/en/docs/about-claude/models/whats-new-claude-4-5
- https://ai-sdk.dev/docs/migration-guides/migration-guide-5-0
- https://v6.ai-sdk.dev/cookbook/node/call-tools-multiple-steps

### 15. Postgres Text Search Guide Uses `unaccent()` Where Immutability Matters

Severity: High

Evidence:

- `src/content/posts/2026-05-02--postgres-text-search-guide/index.mdx:267`
- `src/content/posts/2026-05-02--postgres-text-search-guide/index.mdx:277`

Factual status: likely fails as written in normal PostgreSQL. Generated columns and index expressions require immutable functions; `unaccent` commonly trips immutability restrictions.

Suggested fix: Use an `unaccent` text search configuration for FTS, a trigger-maintained normalized column, or a carefully documented immutable wrapper if accepting upgrade/config risk.

Primary sources:

- https://www.postgresql.org/docs/current/ddl-generated-columns.html
- https://www.postgresql.org/docs/15/sql-createindex.html
- https://www.postgresql.org/docs/current/unaccent.html

### 16. MongoDB Atlas Vector Dimension Limit Is Wrong

Severity: High

Evidence:

- `src/content/posts/2026-05-01--semantic-vector-search-landscape/index.mdx:316`
- `src/content/posts/2026-05-08--postgres-fts-vs-pgvector/index.mdx:347`

Factual status: MongoDB Atlas Vector Search currently documents embeddings up to 8192 dimensions, not 2048.

Suggested fix: Change Atlas max dimensions to `8,192` and keep the "Last verified" note.

Primary source: https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/

### 17. pgvector Dimension Headroom Is Misleading In Matrices

Severity: Medium-High

Evidence:

- `src/content/posts/2026-05-01--semantic-vector-search-landscape/index.mdx:303`
- `src/content/posts/2026-05-08--postgres-fts-vs-pgvector/index.mdx:334`

Factual status: pgvector can store `vector` values up to 16,000 dimensions, but HNSW/IVFFlat indexes support `vector` up to 2,000 dimensions and `halfvec` up to 4,000 dimensions. The table reads like indexed-search headroom.

Suggested fix: Split "storage max" from "ANN index max," or footnote pgvector clearly.

Primary source: https://github.com/pgvector/pgvector

### 18. LLM Connection String Examples Are Stale For GPT-5.2 Behavior

Severity: Medium-High

Evidence:

- `src/content/posts/2026-01-30--llm-connection-strings/index.mdx:50`
- `src/content/posts/2026-01-30--llm-connection-strings/index.mdx:68`

Factual status: OpenAI GPT-5.2 guidance says `temperature`, `top_p`, and `logprobs` are only supported with reasoning effort `none`; otherwise requests can error.

Suggested fix: Add `reasoning_effort=none`, use a non-reasoning model for temperature examples, or mark parameters as illustrative rather than valid OpenAI examples.

Primary source: https://platform.openai.com/docs/guides/latest-model

### 19. `draft IETF RFC` Should Be `Internet-Draft`

Severity: Low

Evidence: `src/content/posts/2026-01-30--llm-connection-strings/index.mdx:17`.

Suggested fix: Say "Internet-Draft for the `llm://` URI scheme." RFC is a later publication state.

Primary source: https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/

### 20. Gemini Model ID In Mastra Routing Post Is Likely Stale

Severity: Medium

Evidence: `src/content/posts/2026-01-02--llm-routing-mastra-ai/index.mdx:48` uses `gemini-3-pro`.

Factual status: Google Gemini API currently uses `gemini-3-pro-preview`.

Suggested fix: Use `gemini-3-pro-preview`, avoid hardcoded current model IDs in evergreen examples, or add a "Last verified May 8, 2026" note.

Primary source: https://ai.google.dev/models/gemini

### 21. Prompt Injection Post Overstates The SQL Injection Analogy

Severity: Medium-High

Evidence: `src/content/posts/2026-05-05--prompt-injection-new-sql-injection/index.mdx:231` says parameterized queries close SQL injection "Full stop."

Factual status: Parameterized queries are the primary defense, but dynamic SQL, stored procedures, allow-lists, and escaping caveats still matter.

Suggested fix: Soften to: "Parameterized queries close the common string-concatenation SQLi path when used correctly; dynamic SQL still needs allow-lists and review."

Primary source: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html

### 22. RAG Lost-In-The-Middle Claim Needs Citation And Softer Heuristic Wording

Severity: Medium

Evidence:

- `src/content/posts/2026-05-05--rag-pipeline-failures/index.mdx:126`
- `src/content/posts/2026-05-05--rag-pipeline-failures/index.mdx:132`

Suggested fix: Cite Liu et al. and frame beginning/end chunk placement as a heuristic to evaluate, not a rule that always works.

Primary source: https://arxiv.org/abs/2307.03172

### 23. 2015 Docker Server Setup Contains Unsafe/Broken Current-Looking Advice

Severity: High

Evidence:

- `src/content/posts/2015-04-06--docker-server-setup-notes/index.mdx:45` says the commands work in production.
- `src/content/posts/2015-04-06--docker-server-setup-notes/index.mdx:95` runs unauthenticated `mongo:latest`.
- `src/content/posts/2015-04-06--docker-server-setup-notes/index.mdx:110` uses legacy `mongo` shell patterns.
- `src/content/posts/2015-04-06--docker-server-setup-notes/index.mdx:152` uses untagged Elasticsearch.
- `src/content/posts/2015-04-06--docker-server-setup-notes/index.mdx:176` includes invalid `EXPOSE [3000]` and EOL Node 12.
- `src/content/posts/2015-04-06--docker-server-setup-notes/index.mdx:217` and `:223` use legacy `--link`.

Suggested fix: Add a prominent historical note. Mark snippets as 2015-era local-dev examples or update them to Compose/custom networks, pinned tags, auth/secrets, `mongosh`, `EXPOSE 3000`, and current Node LTS.

Primary sources:

- https://docs.docker.com/engine/deprecated/
- https://hub.docker.com/_/mongo
- https://hub.docker.com/_/elasticsearch
- https://nodejs.org/en/about/eol

### 24. Docker Server Setup Has Inconsistent Postgres Container Names

Severity: High

Evidence:

- `src/content/posts/2015-04-06--docker-server-setup-notes/index.mdx:57` names the container `pg-localhost`.
- `src/content/posts/2015-04-06--docker-server-setup-notes/index.mdx:77` and `:83` use `pg-server`.

Suggested fix: Make names consistent or show a variable.

### 25. Docker Security Post Has A Stale Docker Engine Caveat

Severity: Medium

Evidence: `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx:298` says localhost-bound published ports may be reachable from LAN hosts and "impacts Fedora, Ubuntu, and likely others."

Factual status: Docker docs now scope that L2 exposure issue to Docker Engine releases older than 28.0.0.

Suggested fix: Reword the caveat around Docker Engine releases older than 28.0.0 and keep the verify-with-nmap guidance.

Primary source: https://docs.docker.com/engine/network/port-publishing/

### 26. Docker Security Post Recommends A Nonexistent Postgres Tag

Severity: Medium

Evidence: `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx:63` uses `postgres:17.2.1`.

Factual status: `docker manifest inspect postgres:17.2.1` failed with no manifest; `postgres:17.2` succeeded.

Suggested fix: Use `postgres:17.2`, `postgres:17`, or a digest.

### 27. Docker Security Post Has A Network Name Mismatch

Severity: Medium

Evidence:

- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx:393` says `auto-net`.
- The compose example defines `db-network`.

Suggested fix: Rename the prose to `db-network` or the example to `auto-net`.

### 28. Axios Comparison Overcredits Native `fetch`

Severity: Medium

Evidence: `src/content/posts/2018-11-15--you-may-not-need-axios/index.mdx:57` marks fetch as having automatic JSON transforms.

Factual status: Native `fetch` requires explicit `response.json()` and explicit `JSON.stringify()` for JSON request bodies. Axios transforms request/response data by default.

Suggested fix: Change fetch to "manual helpers required" and keep the recipes as the ergonomics bridge.

Primary sources:

- https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
- https://developer.mozilla.org/en-US/docs/Web/API/Response/json
- https://axios-http.com/docs/req_config

### 29. URL Regex Article Expected Output Does Not Match The Regex

Severity: Medium

Evidence: `src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/index.mdx:189` expects `ftp://files.server.org/index).` to become `ftp://files.server.org/index`, but running the provided regex returns `ftp://files.server.org/index).`.

Suggested fix: Adjust the regex/post-processing to trim terminal punctuation, or update expected output and explain the tradeoff.

### 30. ReDoS Post Downplays A Security Vulnerability

Severity: Medium

Evidence:

- `src/content/posts/2015-02-24--security-notes-regex/index.mdx:23` says ReDoS is not as much a security issue.
- `src/content/posts/2015-02-24--security-notes-regex/index.mdx:27` through `:29` miss the most important structural warning signs.

Suggested fix: Frame ReDoS as denial-of-service vulnerability. Mention nested quantifiers, repeated groups, overlapping alternation, timeouts, static analysis, and non-backtracking engines where appropriate.

Primary source: https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS

### 31. Regex Quiz Mislabels Fixed-Length Lookbehind

Severity: Medium

Evidence: `src/content/posts/2024-11-15--quiz-regex-or-wreckage/index.mdx:309` says `/(?<!abc)\d+/g` shows variable-length lookbehind. It is fixed-length.

Suggested fix: Say "fixed-length lookbehind shown here" or add a real variable-length discussion if the question is meant to teach that edge.

### 32. Several Quizzes Have Predictable Answer Placement

Severity: Medium

Evidence:

- `src/content/posts/2024-12-28--quiz-in-the-aws-cloud/index.mdx:858`: 18 of 26 answers are option index 1, including the final run from questions 21-25.
- `src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/index.mdx:28`: first 6 of 7 answers are option index 0.
- `src/content/posts/2024-10-31--quiz-data-structures-algorithms/index.mdx:31`: 11 of 20 answers are option index 0.

Suggested fix: Shuffle answer positions while preserving exactly one `isAnswer: true`.

### 33. Markdown-Inside-JSX Warnings Are Concentrated In Quizzes

Severity: Medium

Evidence:

- `src/content/posts/2024-11-15--quiz-regex-or-wreckage/index.mdx:35`: 71 warnings.
- `src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/index.mdx:43`: 69 warnings.
- `src/content/posts/2024-11-20--quiz-bash-in-the-shell/index.mdx:34`: 54 warnings.

Suggested fix: Convert risky slot bodies to MDX-safe JSX/HTML, or teach the checker which quiz slot patterns are intentionally supported.

### 34. Fast-Moving Vendor/Platform Quizzes Need Verification Notes

Severity: Medium

Evidence:

- `src/content/posts/2026-05-09--quiz-context-engineering/index.mdx:356` discusses OpenAI/Anthropic prompt caching behavior.
- `src/content/posts/2024-12-28--quiz-in-the-aws-cloud/index.mdx:426` discusses AWS pricing/capacity/service behavior.

Suggested fix: Add "Last verified: May 8, 2026" notes near fast-moving AI/AWS capability and pricing claims.

### 35. Empty Hint Slots Reduce Teaching Value In Older Quizzes

Severity: Low-Medium

Evidence:

- `src/content/posts/2024-10-31--quiz-data-structures-algorithms/index.mdx:50`: 20/20 empty hints.
- `src/content/posts/2024-10-31--quiz-do-you-know-esnext/index.mdx:28`: 11/11 empty hints.

Suggested fix: Add per-option hints for common misconceptions, or remove empty legacy hint slots.

### 36. Pagefind/Algolia Post Reads Too Vendor-Blog Adjacent

Severity: Medium-High

Evidence: `src/content/posts/2025-03-01--you-might-not-need-algolia/index.mdx` uses generic terms such as "landscape," "robust," "streamlined," and "blazing-fast."

Suggested fix: Rebuild around the concrete thesis: static/content sites probably do not need hosted search. Use the real Pagefind migration story, cost/ops constraints, and decision rules.

### 37. Serverless Database Post Has Stale-Prone Market-Map Claims

Severity: Medium-High

Evidence:

- `src/content/posts/2025-09-15--serverless-database-magic/index.mdx:34` through `:51` includes star counts and benchmark-shaped performance ranges.
- `src/content/posts/2025-09-15--serverless-database-magic/index.mdx:79` uses `text-embedding-ada-002`.

Suggested fix: Either cite methodology per measurement, or replace with qualitative ranges and a "Last verified" snapshot. Avoid exact star/perf claims unless maintained.

### 38. MCQ Post Has Strong Topic, Weak House Voice

Severity: Medium-High

Evidence: `src/content/posts/2025-01-01--the-unassuming-power-of-multiple-choice-questions/index.mdx` leans on "sophisticated tools," "unprecedented versatility," "paradigm shift," and "powerful catalysts."

Suggested fix: Make the enemy lazy recall questions. Show two bad questions becoming one good one.

### 39. `Replacing Myself With AI` Needs Time-Capsule Framing Or Rewrite

Severity: Medium

Evidence: `src/content/posts/2024-12-05--replacing-my-job-with-gpt-and-llm/index.mdx` uses generic AI-collaboration language compared with newer DanLevy.net voice.

Suggested fix: Preserve as a 2024 artifact, or rewrite around what actually changed, what failed, and which parts still needed human taste.

### 40. Postgres/Search/Vector Posts Overlap

Severity: High

Evidence:

- `src/content/posts/2026-05-01--semantic-vector-search-landscape/index.mdx`
- `src/content/posts/2026-05-02--postgres-text-search-guide/index.mdx`
- `src/content/posts/2026-05-08--postgres-fts-vs-pgvector/index.mdx`

Problem: The same "search is not one thing" thesis, hybrid search, exact-vs-semantic framing, and vector-store matrix material appears in multiple drafts/posts.

Suggested fix: Assign one job per post:

- Postgres text guide: implementation guide for FTS, trigrams, exact SQL.
- FTS vs pgvector: decision article for staying in Postgres until benchmarks prove otherwise.
- Semantic vector landscape: buyer's map after Postgres is no longer enough.

### 41. Generative UI Has Duplicate Drafts

Severity: High

Evidence:

- `src/content/posts/2026-05-06--llm-generative-ui-landscape/index.mdx`
- `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx`

Suggested fix: Choose one canonical draft before publish. Archive, delete, or redirect the other. Keep source snapshots for any verified claims you preserve.

### 42. GenUI/AI Tooling Claims Need Source-Backed Snapshot Treatment

Severity: Medium-High

Evidence:

- `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx:224` discusses AI SDK RSC and deprecated structured-output APIs.
- `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx:328` through `:340` discusses project velocity and pre-1.0 status.

Suggested fix: Keep "Last verified May 8, 2026," cite primary docs/discussions next to each volatile claim, and avoid turning current momentum into durable verdicts.

Primary sources:

- https://github.com/vercel/ai/discussions/3251
- https://v6.ai-sdk.dev/docs/migration-guides/migration-guide-6-0

### 43. Title/Subtitle Mismatches Weaken Strong Posts

Severity: Medium

Evidence:

- `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx:2`: "The LLM GenUI Landscape v2" sounds internal/drafty.
- `src/content/posts/2026-05-01--semantic-vector-search-landscape/index.mdx:2`: "and Other Topics to Win Friends and Lovers" undersells a serious guide.
- `src/content/posts/2026-05-06--llm-evals-are-broken/index.mdx:2`: "Fight Evils with Evals!" is lighter than the thesis.

Suggested fix: Let titles name the decision or enemy. Keep jokes when they clarify, not when they obscure.

### 44. Body Callouts/Blockquotes Are Overused In Some Posts

Severity: Medium

Evidence:

- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx:296`
- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx:298`
- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx:300`
- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx:401`
- Global blockquote styling starts around `src/styles/global.css:258`.

Suggested fix: Reserve blockquotes for thesis, external quotes, and true warnings. Convert ordinary emphasis back to paragraphs or lists.

### 45. Captions Are Oversized And Sometimes Literal

Severity: Low-Medium

Evidence:

- `src/styles/global.css:875` sets `figcaption` to `1.475rem`.
- `src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/index.mdx:87` has a caption that describes what is visible rather than why it matters.

Suggested fix: Reduce caption scale and rewrite captions as explanatory notes.

## File-By-File Remediation Backlog

### `src/shared/postVisibility.ts`

- High: Align implementation with the documented editorial visibility model.
- High: Make unlisted posts routable if they are meant to be URL-accessible.
- High: Decide whether drafts are ever visible. If not, exclude drafts at `isVisiblePostData()`.

### `src/shared/postsCache.ts`

- High: Ensure `_posts`, feed posts, category counts, tag counts, related data, and static paths use consistent visibility semantics.
- Medium: If `unlisted` remains routable, keep list/feed/search filters responsible for hiding unlisted posts.
- Medium: Use one popularity system: frontmatter-driven or curated-list-driven.

### `src/pages/index.astro`

- High: Stop list pages from showing `draft:true` posts if drafts are not routable.
- Medium: Prefer a shared visibility helper over local `!unlisted && !hidden` logic.

### `src/layouts/Post.astro`

- High: Move JSON-LD, font CSS, and post enhancement script into valid document locations.
- High: Continue rendering `subTitle` as deck prose, not a heading.
- Medium: Add hero figure support with explicit `cover_alt`, `cover_decorative`, and `cover_credit`.
- Medium: Recompute preload `imagesizes` according to the selected hero variant.

### `src/styles/global.css`

- High: Restore ordered-list markers.
- High: Add durable `pre` overflow handling.
- High: Improve article body readability: normal weight, no letter spacing, readable measure.
- High: Calm H2-H6 styles.
- Medium: Improve large table affordance.
- Medium: Reduce caption scale.
- Medium: Reduce blockquote/callout dominance.

### `src/styles/layout.css`

- Medium: Keep prose around 65-72ch while preserving breakout lanes for diagrams/tables.
- Medium: Tune `.inset`, `.breakout`, and `.narrow` spacing for mobile.

### `src/components/QuizUI`

- Medium: Keep `client:visible` hydration where used intentionally.
- Medium: Add bottom padding for fixed quiz controls if content can be covered.
- Medium: Ensure explanation/code surfaces have `overflow-x: auto`.

### `src/scripts/check-content.ts`

- High: Add checks for body-level H1s.
- High: Add checks for routability/visibility contradictions.
- Medium: Improve markdown-inside-JSX warnings so intentional quiz patterns are distinguished from true MDX footguns.
- Medium: Add invalid date validation for frontmatter `date` and `modified`.

### `src/content/posts/2026-01-06--ai-sdk-math-tool/index.mdx`

- High: Update invalid/stale Anthropic model ID.
- High: Update AI SDK step-control example from `maxSteps` to current pattern.
- Medium: Replace npm install commands with Bun commands if the post is framed as repo-native.
- Medium: Add a "Last verified" note for model/API examples.

### `src/content/posts/2026-05-02--postgres-text-search-guide/index.mdx`

- High: Fix `unaccent()` usage in generated columns/index expressions.
- Medium: Clarify prefix search vs contains/leading-wildcard trigram search.
- Medium: Add primary-source citations for Postgres FTS/trigram behavior.

### `src/content/posts/2026-05-08--postgres-fts-vs-pgvector/index.mdx`

- High: Fix MongoDB Atlas dimensions.
- Medium-High: Clarify pgvector storage vs ANN index dimension limits.
- High: Reduce overlap with the Postgres text guide and semantic vector landscape.
- Medium: Keep matrix claims tied to the May 8, 2026 verification note.

### `src/content/posts/2026-05-01--semantic-vector-search-landscape/index.mdx`

- High: Fix MongoDB Atlas dimensions.
- Medium-High: Clarify pgvector storage vs ANN index dimension limits.
- High: Consolidate duplicated vector-store matrix material with the FTS vs pgvector post.
- Medium: Retitle toward the concrete decision instead of "landscape" framing.

### `src/content/posts/2026-01-30--llm-connection-strings/index.mdx`

- Medium-High: Fix GPT-5.2 temperature/reasoning-effort examples.
- Low: Change "draft IETF RFC" to "Internet-Draft."
- Medium: Tighten credential-in-URL security caveats.

### `src/content/posts/2026-01-02--llm-routing-mastra-ai/index.mdx`

- Medium: Update `gemini-3-pro` or make model IDs illustrative.
- Medium: Add Last verified note near current model examples.
- Medium: Keep the thesis on routing by task and measured evals, not provider leaderboards.

### `src/content/posts/2026-05-05--prompt-injection-new-sql-injection/index.mdx`

- Medium-High: Soften SQL injection comparison around parameterized queries.
- Medium: Preserve strong thesis, but keep security language defense-in-depth.
- Medium: Verify internal links to related Mastra/security posts before publish.

### `src/content/posts/2026-05-07--stop-hardcoding-your-prompts/index.mdx`

- High: Replace "eliminate injection vectors by design" style wording with "reduce risk," "constrain," or "make validation practical."
- Medium: Add tool-permission/output-validation caveats beside prompt-structure patterns.

### `src/content/posts/2026-05-05--rag-pipeline-failures/index.mdx`

- Medium: Cite lost-in-the-middle research.
- Medium: Frame chunk ordering as a heuristic to test.
- Low: Keep as a voice exemplar for current AI posts.

### `src/content/posts/2026-05-06--llm-evals-are-broken/index.mdx`

- Low-Medium: Make joke benchmark numbers explicitly hypothetical or cite real launch numbers.
- Medium: Verify current eval tooling claims before publish.
- Medium: Retitle if the joke fights the serious thesis.

### `src/content/posts/2026-05-06--llm-generative-ui-landscape/index.mdx`

- High: Decide whether this or the May 10 version is canonical.
- Medium-High: Verify fast-moving protocol/tool claims with primary sources.
- Medium: Rename away from generic "landscape" if keeping.

### `src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/index.mdx`

- High: Consolidate with the earlier GenUI draft.
- Medium-High: Move decision table earlier.
- Medium-High: Add source-backed "Last verified" notes.
- Medium: Add image frontmatter before publish.
- Medium: Keep catalog material skimmable so the decision frame survives.

### `src/content/posts/2015-04-06--docker-server-setup-notes/index.mdx`

- High: Add historical framing or update production-looking examples.
- High: Fix `pg-localhost` vs `pg-server` mismatch.
- High: Replace unsafe/stale Docker patterns if refreshed: unauthenticated Mongo, `mongo` shell, untagged Elasticsearch, `EXPOSE [3000]`, EOL Node 12, and `--link`.

### `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/index.mdx`

- Medium: Update Docker Engine 28 port-publishing caveat.
- Medium: Replace nonexistent `postgres:17.2.1` tag.
- Medium: Fix `auto-net` vs `db-network` mismatch.
- Medium: Convert leftover task comments that should not render as editorial copy.
- Medium: Add Last verified note for Docker/networking behavior.

### `src/content/posts/2018-11-15--you-may-not-need-axios/index.mdx`

- Medium: Correct fetch JSON transform comparison.
- Medium: Preserve the useful "you may not need a dependency" framing but make ergonomics tradeoffs precise.

### `src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/index.mdx`

- Medium: Fix regex expected output mismatch.
- Medium: Consider post-processing terminal punctuation instead of stretching the regex into unreadability.
- Medium: Remove emoji-heavy section headings if refreshing for current site style.

### `src/content/posts/2015-02-24--security-notes-regex/index.mdx`

- Medium: Reframe ReDoS as a security vulnerability.
- Medium: Add modern warning signs and mitigations.
- Low: Fix "suprising" typo.

### `src/content/posts/2024-11-15--quiz-regex-or-wreckage/index.mdx`

- Medium: Fix fixed-length lookbehind explanation.
- Medium: Address markdown-inside-JSX warnings if touching quiz internals.
- Low-Medium: Reduce emoji/joke density in closing if modernizing.

### `src/content/posts/2024-12-28--quiz-in-the-aws-cloud/index.mdx`

- Medium: Shuffle answer positions.
- Medium: Add Last verified note for AWS pricing/capacity/service behavior.
- Medium: Replace "dive deep / best practices / landscape" wrapper language with sharper challenge framing.

### `src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/index.mdx`

- Medium: Shuffle early answer positions.
- Medium: Address markdown-inside-JSX warnings if refreshing.

### `src/content/posts/2024-10-31--quiz-data-structures-algorithms/index.mdx`

- Medium: Shuffle answer positions.
- Low-Medium: Add per-option hints or remove empty hint slots.
- Low: Fix "algorithms (), and time complexity."

### `src/content/posts/2024-10-31--quiz-do-you-know-esnext/index.mdx`

- Low-Medium: Add hints or remove empty hint slots.
- Low: The commented-out cover line is harmless but can confuse naive asset scans; remove if cleaning frontmatter.

### `src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/index.mdx`

- Medium: Clean markdown-inside-JSX warnings.
- Medium: Keep code examples mobile-safe after CSS fixes.

### `src/content/posts/2024-11-28--quiz-postgres-sql-mastery-pt2/index.mdx`

- Low-Medium: Fix "Postres" typo.
- Medium: Clean markdown-inside-JSX warnings over time.

### `src/content/posts/2024-11-20--quiz-bash-in-the-shell/index.mdx`

- Medium: Clean markdown-inside-JSX warnings.
- Medium: Keep shell code examples readable on mobile.

### `src/content/posts/2026-05-09--quiz-context-engineering/index.mdx`

- Low while draft: Keep private flags until intended release.
- Medium: Add Last verified note for OpenAI/Anthropic prompt caching behavior.
- Low-Medium: Make tokenizer references model/tokenizer-specific, not universal.

### `src/content/posts/2025-03-01--you-might-not-need-algolia/index.mdx`

- Medium-High: Rewrite generic vendor-blog language.
- Medium: Center the Pagefind/static-site decision rule.
- Medium: Add Last verified note for Pagefind/Algolia capability claims.

### `src/content/posts/2025-09-15--serverless-database-magic/index.mdx`

- Medium-High: Replace benchmark/star counts with cited methodology or qualitative framing.
- Medium: Update older embedding model examples.
- Medium: Avoid `@latest` in code examples if readers might copy them.
- Medium: Narrow the thesis to object-storage-backed read-heavy search.

### `src/content/posts/2025-01-01--the-unassuming-power-of-multiple-choice-questions/index.mdx`

- Medium-High: Rewrite academic/marketing prose.
- Medium: Add before/after examples of weak vs strong multiple-choice questions.

### `src/content/posts/2024-12-05--replacing-my-job-with-gpt-and-llm/index.mdx`

- Medium: Preserve as a time capsule or rewrite in current scar-tissue voice.
- Medium: Replace generic AI productivity language with workflow specifics.

### `src/content/posts/2025-04-03--beware-the-single-purpose-people/index.mdx`

- Medium: Reduce opening joke density.
- Medium: Add concrete before/after code organization examples.
- Medium: Fix tag canonicalization (`software development`, `code organization`).

### `src/content/posts/2025-09-10--patchy-with-a-chance-of-vulnerability/index.mdx`

- Low-Medium: Soften hardware-token social-engineering language.
- Low-Medium: Source or qualify incident-impact claims.

### `src/content/posts/2024-08-29--handling-international-numbers-and-currency/index.mdx`

- Low: Correct "locale = country per ISO 3166" framing. Locales are BCP 47 language tags with optional script/region.

Primary source: https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag

### `src/content/posts/2023-08-18--should-you-use-named-or-default-exports/index.mdx`

- Low: Fix invalid object-literal arrow example: `const Knife = () => ({ ...blade, ...handle })`.

### `src/content/posts/2015-06-12--love-computer-languages/index.mdx`

- Medium: Fix invalid modified date.
- Medium: Resolve contradictory `draft:true`, `hidden:true`, `publish:true`.
- Low: Correct Rust compiler description if revived; Rust does not normally transpile into pure C.

### `src/content/posts/2015-06-06--javascript-scope-magic/index.md`

- Medium: Resolve `draft:true` with `publish:true`.
- Low: Preserve as legacy unless refreshing.

### `src/content/posts/2015-06-06--docker-firewall-setup/index.md`

- Medium: Normalize draft/private flags.
- Low: Fix "Firtewall" typo.
- Medium: Add historical/security framing if keeping indexed.

### `src/content/posts/2015-11-22--disable-transparent-hugepages/index.md`

- Medium: Normalize draft/private flags.
- Medium: Align directory date and frontmatter date if preserving.
- Medium: Add historical note if keeping routable.

### `src/content/posts/2017-05-01--linux-system-benchmark-scripts/index.md`

- Medium: Resolve `draft:true` with `publish:true`.
- Medium: Add historical note if preserving.

### `src/content/posts/2018-10-06--are-promises-broken/index.md`

- High via platform behavior: Decide whether `unlisted:true` should still be routable, because related posts point to it.
- Medium: Add historical note if keeping accessible.

### `src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/index.mdx`

- Low-Medium: Rewrite literal captions into explanatory captions.
- Medium: Keep figure/table rendering safe after CSS changes.

### `src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/index.mdx`

- Medium: Remove generic phrases like "embarked on a journey" if refreshing.
- Medium: Clean markdown-inside-JSX risk.

### `src/content/posts/2021-03-03--creating-collaborative-culture/index.md`

- Medium: Add concrete rituals and examples if revising.
- Low: Preserve earnest historical voice.

### `src/content/posts/2021-03-03--the-4-pillars-of-collaborative-culture/index.md`

- Medium: Add specificity around safety/speed/clarity/commitment if revising.
- Low: Fix obvious typo from content-check/spelling pass.

## Recommended Cleanup Plan

### Phase 1: Structural Safety

1. Fix visibility/routability helpers.
2. Move `Post.astro` structured data/scripts into valid document locations.
3. Restore ordered-list semantics.
4. Add no-body-H1 validation.
5. Add invalid-date validation.
6. Add stronger internal absolute-link and related-link checks.

### Phase 2: Reading System

1. Normalize article body typography.
2. Calm body headings.
3. Add reliable code/table overflow behavior.
4. Normalize figure/caption styling.
5. Add hero alt/credit conventions.
6. Verify mobile rendering for wide matrices and quiz explanations.

### Phase 3: Current Technical Correctness

1. Fix AI SDK/model examples.
2. Fix Postgres `unaccent()` example.
3. Fix vector matrix limits and pgvector footnotes.
4. Fix Docker tag/network/caveat mismatches.
5. Fix regex/fetch/quiz correctness issues.
6. Add "Last verified" notes to AI/search/security/cloud claims.

### Phase 4: Editorial Consolidation

1. Consolidate the Postgres/search/vector cluster.
2. Consolidate the GenUI drafts.
3. Retitle posts where jokes obscure the practical thesis.
4. Add related clusters for Promises, Docker/security, Postgres/search, AI agents, evals, and quizzes.

### Phase 5: Voice And Legacy Preservation

1. Rewrite Pagefind/Algolia, serverless database, and MCQ posts in current Dan voice.
2. Decide time-capsule vs rewrite for older AI/productivity prose.
3. Add historical notes to old Docker/Promise/Angular/Linux posts.
4. Run a typo-only pass that preserves legacy personality.

## Primary Sources Consulted

- PostgreSQL generated columns: https://www.postgresql.org/docs/current/ddl-generated-columns.html
- PostgreSQL `CREATE INDEX`: https://www.postgresql.org/docs/15/sql-createindex.html
- PostgreSQL `unaccent`: https://www.postgresql.org/docs/current/unaccent.html
- PostgreSQL `pg_trgm`: https://www.postgresql.org/docs/17/pgtrgm.html
- PostgreSQL full text search controls: https://www.postgresql.org/docs/17/textsearch-controls.html
- PostgreSQL text search indexes: https://www.postgresql.org/docs/17/textsearch-indexes.html
- pgvector README: https://github.com/pgvector/pgvector
- MongoDB Atlas Vector Search: https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/
- Vercel AI SDK RSC discussion: https://github.com/vercel/ai/discussions/3251
- Vercel AI SDK 6 migration guide: https://v6.ai-sdk.dev/docs/migration-guides/migration-guide-6-0
- AI SDK v5 migration guide: https://ai-sdk.dev/docs/migration-guides/migration-guide-5-0
- Anthropic Claude model notes: https://docs.claude.com/en/docs/about-claude/models/whats-new-claude-4-5
- Google Gemini models: https://ai.google.dev/models/gemini
- OpenAI latest model guide: https://platform.openai.com/docs/guides/latest-model
- OWASP SQL Injection Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
- Lost in the Middle paper: https://arxiv.org/abs/2307.03172
- Docker deprecated features: https://docs.docker.com/engine/deprecated/
- Docker port publishing: https://docs.docker.com/engine/network/port-publishing/
- Mongo Docker image: https://hub.docker.com/_/mongo
- Elasticsearch Docker image: https://hub.docker.com/_/elasticsearch
- Node.js EOL: https://nodejs.org/en/about/eol
- MDN Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
- MDN `Response.json()`: https://developer.mozilla.org/en-US/docs/Web/API/Response/json
- Axios request config: https://axios-http.com/docs/req_config
- OWASP ReDoS: https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS
- MDN BCP 47 language tag: https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag
- `llm://` Internet-Draft: https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/
