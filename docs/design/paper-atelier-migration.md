# Paper atelier: production migration plan

Accepted direction: `/designs/warm-paper/`. Reference implementation:
`src/design-lab/PaperArtwork.astro` and `src/design-lab/paper.css`.

Status: the prototype is implemented and checked in light/dark at desktop and
mobile widths. Production layouts, routes, and components are **not yet migrated**.
This document is the implementation and acceptance plan, not a completion report.

## Visual direction

The site should feel like a carefully assembled architectural notebook. Use warm
stock, ink typography, blue and terracotta cut-outs, precise edges, and a small
number of directional shadows. Shape and depth should establish hierarchy.

- Homepage: one sculptural collage and a generous editorial introduction. The
  newest article is the lead sheet; supporting stories use simpler paper cards.
- Articles: one unrotated reading sheet, generous line spacing, a framed hero,
  clear metadata, and a discreet blue edge. No cut-outs behind the prose.
- Utility pages: calm sheets with small cut-out accents in introductory areas.
  Contact, search, and quizzes prioritize legibility and clear states.
- Footer: an arranged collection of smaller sheets for archive, projects,
  favorites, social links, feeds, subscription, and contact. Preserve the content
  and personality of the existing footer/menu while editing the visual density.
- Dark mode: charcoal green desk, slightly lighter reading sheets, ivory ink,
  muted terracotta, and blue paper. Define independent dark colors and shadows;
  do not invert the light palette or merely reduce opacity.
- Motion: short arrivals, restrained card lift, shared title/image transitions.
  No continuous background motion. Reduced motion removes decorative movement.
- Typography: editorial serif titles with a readable sans-serif for UI and
  metadata. Existing CJK, Hindi, Arabic, and Hebrew text needs appropriate
  fallbacks, natural wrapping, and native reading direction.

## Architecture and implementation order

### 1. Establish the production foundation

- [ ] Refresh the branch against current main and inspect shared/uncommitted work
  before integration. Preserve current homepage ordering and pagination changes.
- [ ] Capture the current route manifest and behavior baseline before editing.
- [ ] Extract semantic tokens into `src/styles/tokens.css`: desk, sheet, raised
  sheet, ink, secondary ink, accent, blue stock, border, shadow, radius, spacing,
  typography, focus, success, warning, error, and disabled states.
- [ ] Build `src/styles/paper.css` with explicit component classes for sheets,
  media frames, cut-outs, and typography. Adapt existing Tailwind/UI variables to
  these tokens rather than maintaining two separate palettes.
- [ ] Put theme initialization in `BaseHead.astro` before first paint. Provide one
  accessible System/Light/Dark control and a single production storage key.
  Preserve selection across routes; follow OS changes in System mode; tolerate
  unavailable storage. Preview preferences must not become production settings.
- [ ] Integrate foundation styles through `BaseHead`, `Page.astro`, and
  `Post.astro`. Consolidate repeated global imports without changing CSS order
  accidentally. Treat global.css, layout.css, nav.css, and banner-webgl.css as
  migration sources, not as a permanent override stack.
- [ ] Use logical spacing and alignment properties for RTL. Preserve metadata,
  analytics, canonical URLs, alternates, language selection, and Pagefind markers.
- [ ] Move the chosen collage into a production component. Keep decorative forms
  hidden from assistive technology and avoid extra client-side dependencies.

### 2. Unify the site shell and navigation

- [ ] `Header.astro`, `Header.css`, `AnimatedLogoType.*`, `HeaderLink.astro`,
  `StaticNavMenu.astro`, and `StaticNavMenu.css`: a compact editorial masthead,
  clear route links, search, language, and theme controls. Retain keyboard and
  mobile menu access to all existing destinations.
- [ ] Restyle menu panels as elevated paper sheets. Rebalance discovery content
  into the footer, while leaving primary routes available near the top.
- [ ] `SearchUI/SearchBar.astro`, `search.css`, `SearchButton.tsx`: integrate the
  actual Pagefind panel, results, thumbnails, excerpts, clear action, loading,
  empty state, and dismissal. Preserve query restoration and focus behavior.
- [ ] `Footer.astro`, `SocialLinks.astro`, `SubscribeForm.astro`,
  `EditOnGitHubLink.tsx`, and footer-owned article cards: translate the full
  production footer into the paper system. Do not substitute the smaller lab
  footer and silently lose content or actions.

### 3. Migrate every card family and listing surface

| Surface | Source | Treatment and verification |
| --- | --- | --- |
| Home, category, related, archive articles | `ArticleCard.tsx`, `ArticleCard.css` | Lead, standard, compact, and related variants share sheet/media tokens. Preserve image selection, localized hrefs, reading time, and full title wrapping. |
| Home composition | `HomePage.astro` | Bring over the collage and lead/story arrangement using the real post collection and current pagination, not the lab's fixed nine-post sample. |
| Archive fragments | `pages/[...page].astro`, localized equivalent, `ArticleListSkeleton.astro` | Appended cards and loading placeholders match the initial page. Keep pagination, sort suffixes, next URL, and duplicate prevention. These are partials, not ordinary standalone page shells. |
| Category discovery | category index/detail helpers, `CategoryLink.astro`, `ArticleFilterLinks.astro` | Small directory sheets and restrained topic tabs. The category index currently owns its own HTML shell and must adopt the shared layout/theme behavior explicitly. |
| Related reading | `AdditionalReading.astro`, `AdditionalReading.css` | Compact paper cards with clear editorial relationships and intact translated destinations. |
| Quiz discovery | `QuizGrid.tsx`, `QuizCard.tsx`, `QuizFilter.tsx`, `challenges.css`, `icons.css` | Paper cards, crisp filter UI, and legible progress/status. Replace visual tilt with restrained lift. Verify fresh, started, and completed states. |
| Repository/project activity | `GitRepoCard/RepoList.astro`, `RepoCard.tsx`, `SummaryStats.tsx`, contribution/change CSS | Ledger-like sheets. Keep repository links, PR data, additions/deletions, empty/loading/error states, and meaningful status colors. |
| Consulting and list CTAs | consulting page helpers, `ConsultingCTA.astro`, `ArticleListConsultingCTA.astro` | Editorial service sheets and a consistent action strip. Preserve per-service content, imagery, and contact links. |
| Menu/footer/search cards | `NavMenu/*` usage review, `StaticNavMenu`, `Footer`, Pagefind output | Audit independently: they do not all reuse the main ArticleCard. Migrate active variants; label inactive ones with usage evidence. |

### 4. Migrate reading and interactive components

- [ ] `Post.astro`: hero variants, image credits, title/dek, date/modified labels,
  category, translated-post disclosure, language options, and byline. Preserve
  hero-less and legacy posts; do not require cover imagery to make a page work.
- [ ] `TableOfContents.astro`: clear paper index with the existing eligibility
  threshold, anchors, sticky behavior, and mobile layout.
- [ ] Prose: paragraphs, headings, inline links/code, ordered/unordered/nested
  lists, blockquotes, figures/captions, tables, footnotes, embeds, and callouts.
  Preserve native list semantics and deliberate heading hierarchy.
- [ ] `CodeTabs/*`, Expressive Code output, `Gist/*`, and `ui/timeline.*`: tokenized
  framing, readable syntax, active tab states, copy actions, horizontal scrolling,
  and correct typography. Code can use a distinct ink surface in either theme.
- [ ] `QuizUI/*`: question, answer, correctness, retries, hint tooltip, explanations,
  progress, slide controls, reset, and summaries. Keep client:visible hydration
  and localStorage keys/state intact. Status must be legible without color alone.
- [ ] Share UI/counters, comments, contact form, subscription, created/modified
  labels, editing links, and support controls: migrate every visible state,
  including unavailable services, validation, success, error, and disabled states.
- [ ] Reachable `ui/*` primitives: buttons, inputs, textareas, badges, cards,
  tables, tabs/comboboxes, progress, tooltips, popovers, dialogs, sheets, toasts,
  pagination, and timeline. Audit nested overlays for contrast and stacking.
  Usage review determines which primitives need runtime verification.
- [ ] MDX-authored custom styling: search the entire content corpus for hard-coded
  colors, inline styles, custom panels, and component imports. Fix active visual
  exceptions at their owner; do not rewrite editorial copy as part of styling.

### 5. Complete all page families

- [ ] `/` and every localized homepage.
- [ ] Category index and each category listing, including localized versions.
- [ ] All archive pagination/sort partials and their translated equivalents.
- [ ] Ordinary posts, quizzes, short/long posts, image/no-image posts, legacy
  layouts, translated posts, and accessible unlisted posts.
- [ ] `/challenges/` and localized quiz indexes.
- [ ] `/open-source-journal/` and localized variants.
- [ ] `/consulting/`, every service route, and localized equivalents.
- [ ] `/about/`, `/contact/`, and their localized versions.
- [ ] `/404.html` and the actual Netlify unknown-path response.
- [ ] RSS XML/JSON, robots, sitemap, redirects, and social metadata remain valid.
  These nonvisual outputs are verification items, not paper-themed pages.

## Migration ledger and completeness gate

`paper-atelier-inventory.csv` lists 145 production route/layout/component/style
files audited on this branch: 107 are statically reachable from page/content
imports, and 38 need explicit usage review. Static reachability is a discovery
hint, not proof of runtime coverage: imports can be conditional or commented,
MDX can carry its own styles, and third-party markup needs separate checks.
Refresh this inventory against the integration checkout before implementation.

Every row starts pending. During migration, record one of:

- `migrated` with the implementation commit and representative route/state.
- `retained nonvisual` with the reason behavior/metadata needs no design change.
- `inactive` with import/route evidence. Absence from this initial scan is not
  sufficient evidence for deletion.

Verification rows record tested theme, viewport, interaction state, and artifact
or test evidence. A component is complete only when its visible instances and
states are checked. Add rows for MDX exceptions, Pagefind-generated result UI,
Expressive Code, external embeds, and production components introduced later.
No pending rows or unexplained old visual treatments may remain at release.

## Verification and preview release

1. Build a permanent acceptance matrix from the route manifest and ledger. Cover
   every page family and every card/interactive family; crawl all generated HTML
   for broken internal links/images, missing shell/theme markers, and leftover
   old-theme classes. Exclude feeds, fragments, redirects, and the design lab
   from full-page assertions using explicit classifications.
2. Visually review light and dark at 390, 768, and 1440px. Include long titles,
   missing images, long translations, CJK, Hindi, and RTL Arabic/Hebrew. Test
   zoomed text, keyboard focus, system theme, persistence, reduced motion, print,
   and unavailable storage. Take full-page screenshots plus focused component
   screenshots; inspect overlays and states, not just initial page views.
3. Add meaningful theme/route/component coverage and run existing navigation,
   home-pagination, quiz-runtime, and quiz-corpus tests. Verify search on a
   production build with the real Pagefind index. Test menu/search/language
   panels, Escape/focus return, filters, pagination, quiz answers/reload/reset,
   tabs, forms, and article transitions. Exercise forms in controlled test mode;
   do not send real contact/subscription requests as a design test.
4. Run `bun run check`, `bun run content:check`, `bun run build`, and appropriate
   `bun run test:e2e` suites after changes settle. Review request sizes, image
   decoding/layout shift, font loading, and hydration against the baseline.
   Retire obsolete visual CSS only after coverage confirms no active consumers.
5. Publish a Netlify branch preview and repeat the critical matrix on that actual
   deployment, including redirect behavior, Pagefind, locale routes, analytics,
   forms configuration, and unknown paths. Attach the verification ledger and
   screenshot evidence. Production publication follows the completed preview
   review; do not report preview checks as production verification.

Suggested delivery commits: foundation/theme; shell/search/footer; cards and
listings; reading/interactive components; page/locale polish; verification and
CSS cleanup. Each commit should leave the branch usable and reviewable.
