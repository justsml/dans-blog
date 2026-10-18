# Council of Dans: final article readiness

Reviewed October 18, 2026. Article: **No Fate But What We Bill**. Scope: English, all ten translations, four shared figures, publication routing, and the import-validation defect exposed by the figure repair.

**Result: no remaining critical or high-priority findings in the reviewed article. English and all ten translations are prepared for publication.**

## Council disposition

Three critics participated; none dropped out. Findings overlap and should not be counted as unique defects.

| Persona | Initial findings | Decision and rationale | Evidence |
| --- | --- | --- | --- |
| Architect | Seven high, no critical | Separate human-baseline task difficulty, orchestration scale, work budgets, and demonstrated incidents. Removed unsupported growth laws and absolute guarantees. | [Initial review](./architect-review.md); [translation repairs](./architect-translations.md); [de/ru/zh cross-review](./architect-cross-review.md); [ar/he cross-review](./architect-rtl-cross-review.md) |
| Detail Detective | Five high, no critical | Correct source attribution and probability assumptions; distinguish historical cost scenarios from current prices. Numerically sampled probability curves replace hand-drawn approximations. | [Initial review](./detective-review.md); [translation repairs](./detective-translations.md); [es/fr/it cross-review](./detective-cross-review.md); [hi/ja cross-review](./detective-asia-cross-review.md) |
| Battle-scarred Operator | Five high, no critical | Retain quotas and authorization, combine edit/runtime monitoring, contain sessions and workers, and reconcile translated security advice before publication. | [Initial review](./operator-review.md); [translation repairs](./operator-translations.md) |

The initial alternative of holding stale translations in draft was superseded by the user's explicit request to update all ten. No stale translation is being published. Locale files now inherit the published English metadata, carry modified date 2026-10-18, and record source hash `398caaa9e710` after repair. Revisions were direct Codex editorial work with independent cross-review, not external candidate/judge pipeline calls. Existing candidate/judge history remains intact.

All three critics cleared the revised English and figures. Cross-reviews cleared all ten translated versions. These reviews address material factual fidelity and security advice; they are not native-speaker certification.

## Additional integration repairs

Browser verification found all four original relative HTML image paths returned 404 in production. All eleven MDX files now import SVG URLs through the build pipeline. The locale validator incorrectly normalized only `../` prefixes and rejected corresponding `./` source imports; both CLI and core validation now normalize either prefix. Regression tests verify valid rebasing while still rejecting a different asset or missing URL query.

## Final validation

- All ten `i18n:validate --skip-global` runs passed.
- `content:check`: zero errors, 108 existing corpus warnings; none for this article.
- `bun run check`: zero errors, zero warnings, 127 hints across 408 files.
- Routing tests: 22 passed; validation tests: 14 passed.
- Final production build: exit 0; 2,547 pages in 1m 36s. Network access was needed for the existing Open Source Journal GitHub fetch. The first sandboxed build failed on that external request; the final network-enabled build completed.
- [Production artifact verification](./production-verification.json): all eleven routes exist, correct `lang` and self-canonical, all twelve language alternates including `x-default`, four bundled figure files per route, current translation hashes, RTL for Arabic/Hebrew, and no stale locale fallback redirects.
- Collaborative-browser verification: all four figures loaded on English, Arabic, and Japanese pages. English at 1280px and 390px, Arabic and Japanese at 390px had no horizontal page overflow. Desktop figure rendering and Arabic mobile layout were visually inspected.
- `git diff --check` passed. Non-checkout merge simulation of the completed content commits against fetched `origin/main` (`8c4c381f1`) exited 0 with no conflicts.

The reviewed content is committed on `article/no-fate-but-what-we-bill`; it has not been pushed, merged, or deployed by this task. No PR existed for the branch. The branch also contains pre-existing translation/infrastructure history, which this article review does not constitute a full code review of. Unrelated working-tree edits were preserved. Generated redirects returned to their original tracked state after all translations were included.
