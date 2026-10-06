# Browser tests

Run the suite with Bun:

```sh
bun run test:e2e
bun run test:e2e -- tests/e2e/nav-menu.spec.ts
bun run test:e2e:ui
bun run test:e2e:debug
```

Chromium is the configured browser. Playwright reuses the server at
`http://localhost:4242` outside CI. Check that URL before starting another server.
The default command stops after the first failure.

## Coverage

- `nav-menu.spec.ts`: actual navigation through article, category, project and
  contact links; switching/dismissing panels; keyboard focus and activation.
- `home-pagination.spec.ts`: English and Spanish pagination continuity and browser
  append behavior.
- `quiz-runtime.spec.ts`: immediate answers, localized controls, independent
  hydration, retries, persistence and keyboard hint dismissal.
- `quiz-corpus.spec.ts`: every discovered quiz's rendered choices and answer
  behavior, plus mobile controls, resets and locale-separated progress.

Quiz source invariants (answer positions, option uniqueness, slot preservation)
are checked offline in `src/scripts/i18n/quiz-corpus.test.ts`. Browser tests check
what renders and what happens when a reader interacts with it.

## Test quality

Select a link by its section or accessible name, click it, and verify the actual
destination and response. Selecting a link by the expected href and then checking
that same href proves little. A CSS class or a nonzero count of page links does
not establish accessibility; verify keyboard focus and activation instead.

Prefer retrying locator assertions to fixed delays and `networkidle`. A deliberate
delay is appropriate when exercising a specific timing regression, such as the
old wrong-answer auto-advance timer.

The corpus suite is intentionally broader and slower than the runtime smoke
suite: translated MDX has independent inputs and can introduce article-specific
rendering problems. Its passing result does not establish translation quality.

See [the test suite review](../../docs/test-suite-review.md) for the cleanup
rationale and verification limits.
