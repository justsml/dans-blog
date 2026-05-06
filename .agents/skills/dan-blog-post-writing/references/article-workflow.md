# Article Workflow

## Choose the Shape

Use the user's request to choose one of these shapes:

- **Practical map**: explain a confusing landscape by separating layers, tradeoffs, and use cases.
- **Warning essay**: name a common bad instinct, show the failure mode, then give a better operating model.
- **Build note**: explain a project or PR through problem, architecture, hard parts, tradeoffs, and what should change next.
- **Tool comparison**: compare options by job-to-be-done, not by hype score.
- **Pattern guide**: turn a production pain into concrete patterns with code and checks.

Do not start with a bland history lesson unless the history creates the argument. Prefer a cold open with a recognizable scene, a claim, or a compact sentence that opens space.

## Research

For claims about current libraries, APIs, models, product behavior, pricing, security guidance, or standards, verify the current state before writing. Prefer official docs, project repos, specs, release notes, and primary sources. Use secondary sources only for ecosystem context, not for definitive claims.

Link naturally in the post. Dan's posts usually cite with inline links on the relevant nouns, not a formal bibliography.

## Article Skeleton

Use this as a flexible drafting shape:

```mdx
---
title: "[Specific, opinionated title]"
subTitle: "[Practical promise or sharp angle]"
date: YYYY-MM-DD
modified: YYYY-MM-DD
tags: [topic, specific-terms, audience]
category: AI | Code | Security | Search | ...
subCategory: Engineering | Security | Databases | Open Source | ...
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.8
social_image: ./desktop-social.webp
cover_full_width: ./wide.webp
cover_mobile: ./square.webp
cover_icon: ./square.webp
---

[Cold open. 1-5 short paragraphs.]

[Thesis. What is misunderstood, overused, risky, or useful?]

---

## [First concrete frame]

[Explain the core distinction.]

## [Practical map / tradeoff / failure mode]

[Examples, code, table, or diagram.]

## [What I would do]

[Recommendations with caveats.]

## [Ending that lands]

[Return to thesis. Give the reader a better mental model.]
```

Use horizontal rules sparingly after the intro when they create a crisp break.

## Make It Better Than a Hand Draft

Improve along these dimensions:

- **Thesis**: compress the main point into one sentence that could survive as a pull quote.
- **Specificity**: replace generic nouns with real technologies, code paths, product surfaces, and failure cases.
- **Structure**: split confused categories. Dan's best technical posts often get stronger when a messy landscape becomes layers, spectra, tables, or "when to use X" sections.
- **Counterweight**: acknowledge where the opposed option is actually good. The target is useful judgment, not dunking for sport.
- **Examples**: add small code snippets, SQL, TypeScript, config, or tables when they turn opinion into operational advice.
- **Compression**: cut repeated intros, repetitive warnings, and paragraphs that merely announce the next section.
- **Ending**: avoid "in conclusion" energy. Land with a practical sentence, mild knife twist, or memorable restatement.

## MDX Patterns

Use standard Markdown and MDX that already appears in the blog:

- Code fences with language tags such as `typescript`, `sql`, `tsx`, `bash`, or `mdx`.
- Tables for decision matrices.
- `<p class="inset">...</p>` for a punchy aside or condensed point.
- `<figure>` or `<figure class="inset-left">` / `<figure class="inset-right">` when an image benefits the surrounding argument.
- Footnotes only when the aside is genuinely funny or clarifying. Do not overuse them.

Keep paragraphs short. One-sentence paragraphs are allowed when they create rhythm.

## Editing Existing Drafts

When revising a draft:

1. Preserve the author's strongest sentences and point of view.
2. Fix structure before wordsmithing.
3. Add missing examples or comparisons where the reader would otherwise have to trust the claim.
4. Keep existing frontmatter unless it conflicts with the new content or repo conventions.
5. If a draft is marked `draft: true`, `hidden: true`, or `publish: false`, preserve those flags unless the user asks to publish.
