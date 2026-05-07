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

- `AI` for LLMs, agents, evals, prompt engineering, RAG, AI infrastructure, model APIs, and vector search with AI framing.
- `Code` for programming, architecture, JavaScript, TypeScript, databases, frontend, backend, patterns, and implementation guides.
- `Security` for security-first articles, vulnerability management, auth, supply chain, prompt injection as security, and defensive engineering.
- `Search` for site search, Pagefind, full-text search, trigrams, semantic search, and search infrastructure when search is the primary subject.
- `Guides` for durable how-to material that is less opinion essay and more practical walkthrough.
- `Engineering` for team/process/product-engineering pieces where the main point is how engineering work is organized.
- `Instructional Design` for teaching, assessment, learning design, and education strategy.
- `DevOps` for deployment, servers, Docker, hosting, shell, and operational setup posts.
- `Quiz` only for quiz posts; use the `quiz-writing` skill for those.

Prefer current broad categories over one-off legacy categories such as `Thoughts`, `Regex`, `HowTo`, or `Lulz` unless the user is intentionally working in an old post style.

Preferred `subCategory` values:

- `Engineering`
- `Databases`
- `JavaScript`
- `Architecture`
- `Security`
- `Open Source`
- `Best Practices`
- `Frontend`
- `CSS`
- `AI Infrastructure`
- `Machine Learning`
- `Teaching`
- `Engineering Management`
- `Cloud`

Normalize near-duplicates for new work: use `Databases`, not `Database`; use `JavaScript`, not `NodeJS` unless the post is specifically about Node.js.

## Tags

Tags should include:

- broad topic: `ai`, `code`, `security`, `javascript`, `postgres`, `databases`, `search`
- specific terms: `llm`, `agents`, `rag`, `embeddings`, `vector-search`, `pgvector`, `full-text-search`, `trigrams`, `pg_trgm`, `prompt-injection`, `typescript`, `react`, `tailwind`, `pagefind`, `mastra`, `mcp`
- audience/context: `production`, `developer-experience`, `testing`, `observability`, `performance`, `debugging`, `architecture`, `best-practices`, `open-source`
- level tags only when useful: `beginner`, `intermediate`, `advanced`, `fundamentals`, `intro`

Prefer 6-10 tags for substantial technical posts. Use lowercase kebab-case for new tags unless preserving an established proper noun. Avoid creating both singular and plural forms (`database` and `databases`) for new posts; pick the existing stronger tag, usually `databases`.

Preferred tag families:

- AI: `ai`, `llm`, `agents`, `rag`, `embeddings`, `vector-search`, `prompt-engineering`, `evals`, `model-routing`, `tools`, `mcp`, `mastra`
- Security: `security`, `prompt-injection`, `web-security`, `auth`, `vpn`, `tailscale`, `owasp`, `attack-vectors`
- Databases/search: `postgres`, `postgresql`, `sql`, `databases`, `search`, `full-text-search`, `trigrams`, `pg_trgm`, `pgvector`, `semantic-search`, `hybrid-search`
- JavaScript/frontend: `javascript`, `typescript`, `react`, `frontend`, `css`, `tailwind`, `promises`, `async`, `nodejs`
- Engineering practice: `architecture`, `patterns`, `production`, `testing`, `debugging`, `performance`, `developer-experience`, `observability`, `open-source`

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
- **Infographic explainer**: one clear flow, matrix, lifecycle, stack, or spectrum, useful when the article's main value is organizing a confusing concept.
- **Annotated architecture**: boxes, arrows, boundaries, permissions, data paths, or retrieval stages, useful when implementation shape matters.
- **Before/after model**: two contrasting panels or states, useful when the post argues against a bad default and toward a better operating model.

For each variant, include:

- visual concept
- why it fits the thesis
- prompt
- suggested filenames
- notes for wide/square/social crop safety

## In-Article Figures And Captions

Use visuals inside the article when they reduce cognitive load:

- Use an infographic-style visual for taxonomies, pipelines, query flows, security boundaries, tradeoff spectra, or "which tool when" decisions.
- Use a small illustrative figure for a metaphor only when it reinforces the thesis and does not feel like decoration.
- Use diagrams when the article keeps saying "layer", "boundary", "pipeline", "loop", "handoff", "ranking", or "trust".
- Use screenshots only when the real UI or output matters. Prefer diagrams for concepts and generated editorial images for mood.

Captions should explain the lesson of the image:

```mdx
<figure>
  <img src="./retrieval-pipeline.webp" alt="Diagram of a retrieval pipeline with filtering, ranking, and answer generation stages" />
  <figcaption>Retrieval quality is not one step. Filtering, ranking, and generation can each fail independently.</figcaption>
</figure>
```

Caption rules:

- Say what the reader should notice, not just what the image contains.
- Keep captions to one or two sentences.
- Use accurate alt text that describes the image for readers who cannot see it.
- For diagrams with labels baked into the image, make the caption carry the argument so the post still works if the image is compressed.

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
