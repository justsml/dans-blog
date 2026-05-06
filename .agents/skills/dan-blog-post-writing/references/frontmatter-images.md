# Frontmatter And Images

## Post Location

Create posts under:

```text
src/content/posts/YYYY-MM-DD--slug-name/index.mdx
```

Use the post date in the directory name. Use lowercase kebab-case slugs. Keep images beside `index.mdx`.

## Common Frontmatter

Recent non-quiz draft posts commonly use:

```yaml
---
title: "Specific Title"
subTitle: "Practical subtitle."
date: YYYY-MM-DD
modified: YYYY-MM-DD
tags: [ai, llm, typescript, production]
category: AI
subCategory: Engineering
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
```

Older posts vary, but new technical drafts should usually include the draft/unlisted/hidden/publish flags unless the user explicitly asks to publish.

Use `redirects` in frontmatter for old URLs. Never edit `public/_redirects` manually.

## Category Guidance

Use existing categories when possible:

- `AI` for LLMs, agents, evals, prompt engineering, vector search with AI framing.
- `Code` for programming, architecture, JavaScript, databases, patterns.
- `Security` for security-first articles.
- `Search` for site search and search infrastructure.
- `Quiz` only for quiz posts; use the `quiz-writing` skill for those.

Use precise `subCategory` values such as `Engineering`, `Security`, `Databases`, `Open Source`, or `Best Practices`.

## Tags

Tags should include:

- broad topic: `ai`, `code`, `security`, `postgres`
- specific terms: `pgvector`, `prompt-injection`, `full-text-search`, `typescript`
- audience/context: `production`, `developer-experience`, `testing`, `observability`

Prefer 6-10 tags for substantial technical posts.

## Image Asset Set

For modern generated-image posts, prefer this asset set:

```yaml
social_image: ./desktop-social.webp
cover_full_width: ./wide.webp
cover_mobile: ./square.webp
cover_icon: ./square.webp
```

Target dimensions:

- `desktop-social.webp`: 1200x630 social preview.
- `wide.webp`: 1600x900 wide cover.
- `square.webp`: 800x800 cover/icon source.
- `mobile-social.webp`: optional mobile social variant when the workflow produces one.

If using a 200px icon variant, name it `square-200.webp` or a topic-specific `*-square-200.webp` and point `cover_icon` to it.

## Image Generation Workflow

When images are needed and image-generation tools are available:

1. Offer or create at least 3 concept variants before committing to a direction.
2. Generate the winning concept in wide, square, and social crops.
3. Avoid text baked into images unless the user explicitly asks. Blog titles should remain HTML text, not image text.
4. Prefer editorial, diagrammatic, or surreal technical visuals over generic stock-photo people at laptops.
5. Keep enough negative space for crops. The subject should survive both 16:9 and square.
6. Convert final assets to WebP and store them beside `index.mdx`.

## Concept Variants To Offer

Offer variants like these, adapted to the topic:

- **Diagrammatic map**: clean technical map, layers, arrows, labeled conceptual objects, useful when the post explains an ecosystem.
- **Editorial metaphor**: one memorable visual metaphor, useful for opinion pieces and warnings.
- **Workbench / systems view**: terminals, schemas, traces, code, mechanical parts, useful for practical engineering guides.
- **Failure-mode scene**: a system doing the wrong thing in a visually obvious way, useful for security, evals, and architecture pitfalls.

For each variant, include:

- visual concept
- why it fits the thesis
- prompt
- suggested filenames
- notes for wide/square/social crop safety

## Prompt Style

Image prompts should be specific and art-directable:

```text
Editorial technical illustration for an article about [topic]. Show [central metaphor]
with [specific technical objects]. Mood: sharp, modern, slightly wry, not cute.
Style: high-detail digital editorial illustration, crisp lighting, strong composition,
deep but balanced color palette, no text, no logos, no UI screenshots.
Composition must work as 16:9 and square crops with the subject centered but not cramped.
```

Avoid:

- generic "AI brain" imagery unless subverted
- illegible pseudo-code walls
- brand logos without permission
- tiny text labels that will not survive crop or compression
- overly dark, blurry, atmospheric images where the idea is hard to read
