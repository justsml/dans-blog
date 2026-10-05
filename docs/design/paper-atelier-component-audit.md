# Paper atelier component and authored-content audit

The inventory now distinguishes implementation from verification. `migrated`
means a reachable visual owner uses the paper system; it does not mean every
browser state passed. `retained nonvisual` identifies data, behavior, metadata,
route delegation, or color-inheriting icon geometry. `inactive` means no active
import path from production page/content roots; these files remain in place.

## Reachability evidence

The audit resolves relative and `@/` imports, dynamic imports, and CSS imports
through `.astro`, `.ts`, `.tsx`, `.css`, and `.mdx` source files. Production pages
and content MDX are roots; design-lab pages are excluded. Commented imports and
fenced example code are excluded. The CSV includes current importing files and
an implementation evidence column. This conservative source graph is usage
evidence, not proof that every imported conditional branch renders.

The refreshed 153 source rows contain 66 migrated visual owners, 46 retained
nonvisual owners, and 41 inactive production files. Thirteen migrated owners
have bounded local shell inspection documented separately; the rest still
require runtime verification. QuizProgress has one passing offline unit test
with seven assertions. Additional MDX exception rows are listed separately.

Inactive families include the old AnimatedLogoType, floating lines, React
NavMenu, AdditionalReading component, unused list CTA, old SearchButton,
ShareUI, banner WebGL CSS, and unused UI primitives. The footer owns its own
related-article cards now. Screenshots helpers remain developer tooling; their
inactive status refers only to the production import graph. No inactive files
were deleted.

## Authored-content review

The corpus scan checked `<style>`, inline `style`, SVG palettes, and hard-coded
Tailwind visual classes. Twelve active MDX files had inline SVG palette owners:
the evaluator tuning-loop diagram and two Postgres text-search diagrams in
English plus ten translations. Their paper palette now supports both themes;
diagram coordinates, educational labels, arrows, and category distinctions are
preserved. These are educational diagrams, not hero-image replacements.

Twenty fixed-offset Google Sheets embeds in ten translated NVMe articles now
fit their reading sheets and have accessible iframe titles. The external chart
contents keep their own rendering and cannot inherit site colors.

Other authored styles retained with reasons:

- Gatsby-to-Astro articles contain `display:contents` for Astro wrappers; this
  is rendering behavior rather than a palette owner.
- Breaking Unicorns has a 60% width editorial blockquote; inherited paper prose
  colors apply, and the narrower width remains an authored layout choice.
- Protect Your Tokens has centered related-link headings with margin rules;
  inherited paper heading/link styles apply.
- Contribute to Open Source has a small introductory text wrapper; typography
  is authored but uses inherited ink colors.
- CSS quizzes include literal HTML/style demonstrations inside teaching code
  fences. Those examples remain unchanged.
- Inline technology logos use currentColor, or deliberate brand colors. Real
  photographs, static diagrams, and raster illustrations remain candidates in
  the separate ranked hero queue, rather than being recolored by CSS.

## Concrete interactive leftovers corrected

The inline hint tooltip had lost its framing after global style replacement;
its raised paper panel, readable title, and separate dismissal actions are now
explicitly styled. Repository additions/deletions now use success/error paper
tokens while preserving `+` and `-` labels. The original quiz runtime and state
contracts are unchanged.

Comments use an external utterances iframe with light/dark theme messaging.
Contact toasts have tokenized primitives, but the inventory records that no
production Toaster import exists; this pre-existing runtime path is not claimed
as visually verified. Subscription success/error service behavior and external
embeds still need their controlled runtime checks. No real form submissions
were made.
