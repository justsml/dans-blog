# Paper atelier production verification

Verified 2026-10-05 on the isolated design/warm-editorial branch.

- Astro check: 379 files, 0 errors, 0 warnings (124 existing hints).
- Content conventions: 0 errors; 110 existing authored-content warnings.
- Offline archive and quiz-state tests: 6 pass, 30 assertions.
- Full static build: 1,651 generated routes; Pagefind indexed 1,654 pages.
- Static asset crawl: no missing local image/script assets; RSS and sitemap XML parse.
- Native T3 browser matrix: 19 route families at 390px and 1280px, both themes
  (76 combinations), matching requested locales and no horizontal overflow.
  Includes six consulting services, article/quiz, category, repository journal,
  contact, Arabic home/contact/consulting, and the error page.
- Pagefind: `postgres` returns 19 results on the built site, with paper panel colors.
- Pagination: eight requests append 18,27,36,45,54,63,72,78 unique cards; rapid
  double-clicks do not add requests or duplicates, and the terminal state appears.
- Retry: a failed fragment request preserves all nine current cards and shows
  a visible error; retry appends successfully to 18 cards.
- History: returning from an article preserves all 78 loaded cards, the previous
  card focus, and the reading position with the bounded in-memory cache.
- Production quiz: lazy visible hydration works; first question changes from
  untouched to incorrect at one attempt, then correct at two attempts. Light
  question surface is ivory with ink text; dark mode uses the independent palette.
- Native shell screenshots and source reachability evidence are in the separate
  shell report and component audit. Matrix JSON records exact dimensions/colors.

Limits: no real contact, consultation, or subscription submission was sent.
External reCAPTCHA, utterances, and Google Sheets retain their own rendering and
service dependencies. The two standalone Reveal presentations under /decks are
preserved authored presentations, outside the blog shell migration. Inactive
legacy components remain explicitly classified in the inventory; they were not deleted.

Eight initial hero candidates are published in the comparison gallery, including
both Postgres quizzes. Existing article frontmatter/final covers remain intact;
ExploitHunter and llm connection strings need dedicated square recomposition
before final promotion. Markdown proposals and exact prompts accompany the gallery.

## Published preview

https://warm-editorial-preview--danlevy.netlify.app/

Netlify deployment: 6ac4218e0ad147d72012033e. Deployed ordinary routes,
archive fragments, Pagefind, and hero gallery/Markdown return 200. Native live
checks confirmed dark theme, 18 cards after the first append, 19 Pagefind results
for postgres, and no desktop overflow. The comparison gallery has eight proposals.
Deployment and HTTP receipts are archived with the browser matrix.
