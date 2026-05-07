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

## Conceptual Arc

Every strong DanLevy.net post should have a visible conceptual arc, not just a sequence of correct sections. Before drafting or rewriting, name these four beats:

- **Pressure**: what confusion, waste, risk, or false promise makes the topic worth reading now.
- **False default**: the common shortcut that seems reasonable in demos, meetings, or first implementations.
- **Clarifying frame**: the distinction, map, model, or decision rule that makes the problem easier to reason about.
- **Payoff**: what the reader can now decide, build, avoid, or explain better.

Use the beats to order sections. If a section does not move the reader from pressure to payoff, merge it, cut it, or turn it into a short aside.

Good arcs often look like:

- "This looks like one problem, but it is three layers."
- "The demo optimizes for first success; production optimizes for repeated correctness."
- "The debate is framed as tool A vs. tool B, but the real split is query shape, ownership, and failure tolerance."
- "The API is small; the operational surface is not."

## Explanatory Asides

Use asides to keep the main argument moving while giving readers a foothold:

- Add a one-paragraph aside when a term, hidden assumption, or implementation detail would otherwise interrupt the section.
- Use a punchy inset for a compressed mental model, not for generic emphasis.
- Use footnotes rarely, and only for genuinely clarifying or funny side notes.
- Place definitions near first use. Do not make readers wait three sections to learn what the important noun means.
- Explain the "why this matters" of a technical detail before expanding the mechanism.

Useful aside patterns:

```mdx
<p class="inset">
The trick is not making the model smarter. It is shrinking the amount of trust the model has to carry.
</p>
```

```mdx
> **Small distinction:** full-text search ranks words. Vector search ranks meaning. Both can be wrong, but they are wrong in different directions.
```

Avoid asides that become a second article hiding inside the first. If the aside needs code, a table, and three caveats, promote it to a section or cut it.

## Technical Depth Dial

Choose the depth deliberately. Do not accidentally make a conceptual essay into docs, or a practical guide into vibes.

- **More conceptual**: lead with metaphors, system boundaries, decision rules, and tradeoff tables. Keep code snippets tiny or pseudocode-like. Use diagrams to separate layers and failure modes.
- **Practitioner-level default**: include runnable-ish TypeScript, SQL, shell commands, config, and concrete product names, but keep snippets short enough to teach the pattern. Explain the consequence of each example.
- **More technical**: add API shapes, data models, failure cases, security boundaries, performance costs, and testable checks. Use code when the implementation detail changes the recommendation.
- **Less technical**: replace implementation branches with examples, analogies, diagrams, and "what to ask your team" questions. Preserve accuracy; remove incidental syntax.

Signals that the post needs more technical detail:

- It recommends a tool, architecture, or security boundary.
- A reader could agree with the article and still not know what to do Monday.
- The claim depends on behavior that differs across frameworks, databases, model providers, browsers, or runtimes.

Signals that the post needs less technical detail:

- The code is proving that the author knows the topic instead of helping the reader.
- The article loses the thesis under setup, imports, and edge cases.
- A diagram, table, or short decision rule would explain the same thing faster.

## Make It Better Than a Hand Draft

Improve along these dimensions:

- **Thesis**: compress the main point into one sentence that could survive as a pull quote.
- **Specificity**: replace generic nouns with real technologies, code paths, product surfaces, and failure cases.
- **Structure**: split confused categories. Dan's best technical posts often get stronger when a messy landscape becomes layers, spectra, tables, or "when to use X" sections.
- **Counterweight**: acknowledge where the opposed option is actually good. The target is useful judgment, not dunking for sport.
- **Examples**: add small code snippets, SQL, TypeScript, config, or tables when they turn opinion into operational advice.
- **Asides**: add short definitions, caveats, and "why this matters" moments exactly where a smart reader would otherwise pause.
- **Visual explanation**: use figures, captions, diagrams, or infographic-style visuals when the article is explaining layers, flows, comparisons, or failure modes.
- **Compression**: cut repeated intros, repetitive warnings, and paragraphs that merely announce the next section.
- **Ending**: avoid "in conclusion" energy. Land with a practical sentence, mild knife twist, or memorable restatement.

## MDX Patterns

Use standard Markdown and MDX that already appears in the blog:

- Code fences with language tags such as `typescript`, `sql`, `tsx`, `bash`, or `mdx`.
- Tables for decision matrices.
- `<p class="inset">...</p>` for a punchy aside or condensed point.
- `<figure>` or `<figure class="inset-left">` / `<figure class="inset-right">` when an image benefits the surrounding argument.
- `<blockquote>` for a quoted claim, compressed thesis, or short excerpt that the prose then interrogates. Keep it brief and attribute/link real sources.
- `<figcaption>...</figcaption>` inside figures for captions that explain the point of the image, not merely restate the filename.
- Footnotes only when the aside is genuinely funny or clarifying. Do not overuse them.

Keep paragraphs short. One-sentence paragraphs are allowed when they create rhythm.

## Editing Existing Drafts

When revising a draft:

1. Preserve the author's strongest sentences and point of view.
2. Fix structure before wordsmithing.
3. Add missing examples or comparisons where the reader would otherwise have to trust the claim.
4. Keep existing frontmatter unless it conflicts with the new content or repo conventions.
5. If a draft is marked `draft: true`, `hidden: true`, or `publish: false`, preserve those flags unless the user asks to publish.
