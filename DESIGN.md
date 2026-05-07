# DanLevy.net Design Guide

This site is an Astro static blog with a dark editorial interface, bright technical accents, and a voice that is allowed to be sharp, funny, and opinionated. The design should feel like a personal engineering notebook wired into a neon command center: readable first, visually specific second, never generic.

## Design Principles

1. **Writing is the product.** Layout, animation, and UI should make posts easier to read, scan, share, and continue from.
2. **Personality is allowed.** Copy can be direct, weird, technical, and occasionally profane when it fits Dan's voice. Do not sand it into corporate SaaS language.
3. **Dark by default.** The site lives on a near-black grid background with cyan, pink, lime, and violet accents. Light surfaces should be rare and intentional.
4. **Square, gridded, precise.** Panels, nav tiles, search, footer modules, and article cards use hard edges or tiny radii. Avoid pill-heavy UI and soft rounded marketing cards.
5. **Motion should earn its keep.** Use motion for feedback, reveal, and delight, but respect `prefers-reduced-motion` and animate only `transform` and `opacity` where possible.

## Core Aesthetic

The default feel is:

- dark editorial
- neon technical
- grid-based
- high contrast
- slightly irreverent
- optimized for long-form reading

Avoid:

- beige editorial minimalism
- generic three-card SaaS sections
- glassy purple AI dashboards
- centered marketing hero pages
- stock-photo filler
- rounded pill overload
- visible instructional copy that explains obvious UI

## Color

Primary colors are defined in [src/styles/global.css](/Users/dan/code/oss/dans-blog/src/styles/global.css) and reused in component-level CSS.

Use these as the stable palette anchors:

```css
--site-page-bg: #05080b;
--neon-cyan: 180 100% 50%;
--neon-pink: 322 100% 72%;
--neon-green: 120 100% 50%;
--neon-purple: 276 100% 60%;
--neon-yellow: 60 100% 50%;
--foreground: 210 5% 90%;
```

Component accents should generally map to:

- Cyan for navigation, search, links, and default article affordances.
- Pink for active emphasis, bullets, hero glow, and destructive or high-attention moments.
- Lime for quiz surfaces, feed accents, and playful success states.
- Muted white and blue-gray for body text, metadata, borders, and dividers.

Do not make an entire new section one solid hue family. If a feature needs a distinct palette, keep the site shell dark and introduce one accent variable at the component boundary, as in `--article-card-accent` or `--footer-card-accent`.

## Typography

Fonts are loaded in [src/styles/global.css](/Users/dan/code/oss/dans-blog/src/styles/global.css):

- Body: `Raleway`, falling back to system sans.
- Headings: `Playwrite AU NSW` for the handwritten/editorial note.
- Code: use the existing code and Expressive Code styling.

Guidelines:

- Body text should remain comfortable for long posts: generous line-height, readable contrast, and sensible line length.
- Keep article headings expressive, but test that long words and code snippets wrap cleanly.
- Use uppercase kickers sparingly for metadata and card labels.
- Use `text-wrap: balance` or `pretty` where supported for headings and summaries.
- Do not introduce a new font unless the page is a special standalone art direction and the performance cost is justified.

## Layout

Use the `content-grid` system in [src/styles/layout.css](/Users/dan/code/oss/dans-blog/src/styles/layout.css). It provides the core tracks:

- `content` for article text and normal page content.
- `breakout` for emphasized callouts.
- `full-width` for banners, wide media, comments wrappers, and immersive sections.

Default widths:

- Standard pages use a wider shell, around `1180px`.
- Article pages narrow content to around `800px`.
- Header, footer, article lists, and nav panels use the same shell width so the site feels aligned.

Guidelines:

- Prefer CSS Grid for layout.
- Keep mobile layouts single-column and stable.
- Avoid horizontal overflow; use `minmax(0, 1fr)` for grid tracks that contain text.
- Do not put cards inside cards.
- Do not use `h-screen`; use `min-height` with `dvh` where viewport height matters.

## Surfaces

Most interactive surfaces share the same recipe:

- near-black translucent background
- 1px low-opacity border
- square corners or tiny radii
- subtle top highlight line
- optional grid/noise overlay
- hover state that reveals or extends the accent line

Good local examples:

- Article cards: [src/components/ArticleCard.css](/Users/dan/code/oss/dans-blog/src/components/ArticleCard.css)
- Static nav: [src/components/StaticNavMenu.css](/Users/dan/code/oss/dans-blog/src/components/StaticNavMenu.css)
- Search panel: [src/components/SearchUI/search.css](/Users/dan/code/oss/dans-blog/src/components/SearchUI/search.css)
- Footer modules: [src/components/Footer.astro](/Users/dan/code/oss/dans-blog/src/components/Footer.astro)

Use cards for repeated items, tools, modals, and genuinely bounded UI. For page sections, prefer full-width bands or unframed layouts.

## Navigation And Search

The header is a compact tool surface, not a marketing nav. Preserve:

- avatar plus animated logo type
- dense nav tiles
- hard-edged dropdown panels
- Pagefind-powered search
- strong keyboard/focus behavior

Search is Pagefind only. Do not add or maintain alternate search implementations.

## Articles

Post pages should prioritize:

- clear title and subtitle
- visible date/category metadata
- strong cover imagery when available
- readable prose
- accessible links
- related-reading continuation in the footer

For MDX content:

- Store post images next to the post.
- Use WebP images where possible.
- Prefer real screenshots, diagrams, or generated images that clarify the article.
- Use `breakout`, `inset`, `skinny`, and `full-width` intentionally.
- Keep code blocks scannable and avoid decorative wrappers around every example.

## Quizzes

Quizzes are playful but still technical. Their interface may be more kinetic than normal posts.

Keep:

- fixed, stable card widths
- clear progress
- obvious selected/correct/incorrect states
- localStorage persistence behavior
- reduced-motion fallbacks

Quiz accents should lean lime, pink, and dark gray. Validate numbering with:

```bash
bun run fix-quizzes
```

## Components

The repo mixes Astro components for static structure and React components for interactive islands.

Use Astro when:

- the component is mostly static markup
- data is known at build time
- no client state is needed

Use React when:

- the component needs browser state
- the component integrates with Radix, Pagefind runtime behavior, quiz state, or form state
- hydration is required

Icons:

- Use `lucide-react` where an icon exists in current UI code.
- Use existing local SVG icons for social links.
- Keep icon stroke widths consistent within a component.
- Prefer recognizable symbols over text-only controls for compact tools.

## Motion

Acceptable motion:

- hover/focus lift with `translateY`
- active press with tiny scale or translate
- drawer/panel reveal
- card image zoom
- quiz answer pulse or shake
- WebGL banner effects when they are isolated and reduced-motion aware

Rules:

- Respect `prefers-reduced-motion`.
- Animate `transform` and `opacity`.
- Avoid scroll listeners for effects if CSS, IntersectionObserver, GSAP, or existing helpers can do it better.
- Do not add motion that makes reading harder.

## Accessibility

Minimum expectations:

- preserve semantic landmarks: `header`, `main`, `footer`, `nav`, `section`
- use visible focus states for links, buttons, inputs, and menu triggers
- provide meaningful alt text for article images
- keep text contrast high on dark backgrounds
- avoid hover-only interactions
- keep tap targets usable on mobile
- ensure search and nav panels can be dismissed and navigated by keyboard

## Copy Voice

The site voice is technical, direct, personal, and funny. It can be blunt. It should not sound like a vendor landing page.

Prefer:

- concrete verbs
- specific technical language
- small jokes that come from the subject
- labels that name the action plainly

Avoid:

- "elevate"
- "unlock"
- "seamless"
- "next-gen"
- "revolutionize"
- bland placeholder names and fake metrics

## Implementation Conventions

- Use Bun exclusively.
- Prefer existing CSS variables before adding new ones.
- Keep component styles colocated when the component already owns a CSS file.
- Import global layout and theme primitives rather than recreating them.
- Use `PostCollections` from [src/shared/postsCache.ts](/Users/dan/code/oss/dans-blog/src/shared/postsCache.ts) for post data.
- Never manually edit `public/_redirects`; use post frontmatter redirects.
- Keep generated assets out of source unless the repo already expects them.

## Review Checklist

Before calling a visual change done, check:

- Does it still feel like DanLevy.net?
- Is the writing easier to read or act on?
- Does it work at mobile, tablet, and desktop widths?
- Are focus states and reduced-motion behavior covered?
- Did the change avoid generic SaaS/card/gradient defaults?
- Did it reuse the existing grid, color variables, typography, and component patterns?
- Does `bun run check` pass for code changes?

