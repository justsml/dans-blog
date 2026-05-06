---
name: dan-blog-post-writing
description: Write DanLevy.net articles and blog posts in Dan Levy's voice, structure, humor, technical taste, and Astro MDX conventions. Use when Codex needs to draft, rewrite, expand, polish, or create non-quiz posts for this blog; create matching frontmatter, title/subtitle/tag/category metadata, post directory naming, image concepts, and social/cover image variants. For quiz posts, use the quiz-writing skill instead.
---

# Dan Blog Post Writing

## Overview

Write articles that sound native to DanLevy.net: practical, technically sharp, opinionated, human, and funny without becoming a comedy routine. Produce a complete MDX-ready post, or a revision plan plus patch, depending on the user's request.

## Required Reading

Read only the references needed for the task:

- `references/article-workflow.md` for the drafting, rewriting, research, and quality workflow.
- `references/voice-style.md` before writing or substantially rewriting body prose.
- `references/frontmatter-images.md` before creating a post file, touching frontmatter, or proposing/generated images.

When working inside `/Users/dan/code/oss/dans-blog`, sample 2-5 nearby posts before writing if the topic has an established local pattern. Prefer recent posts in the same category or posts the user has open.

## Workflow

1. Clarify the artifact: new article, rewrite, outline, intro, section expansion, image plan, or frontmatter-only update.
2. Inspect local examples and any existing draft. Preserve user-written good parts; improve structure, claims, rhythm, and specificity.
3. For current technical claims, verify against primary/current sources before presenting them as fact. Link sources naturally in the article.
4. Build the article around one strong thesis, a practical map, concrete examples, and a useful ending. Avoid generic thought-leadership filler.
5. Use the frontmatter and image conventions from `references/frontmatter-images.md`.
6. If editing files, create or update the MDX and image references in the post directory. Do not edit `public/_redirects` manually.
7. Validate when practical with `bun run check` or `bun run build` for broad changes. Use `bun`, never npm or yarn.

## Output Expectations

For a new post, produce:

- A date-prefixed post directory name and slug.
- Complete frontmatter.
- MDX body with links, code blocks, tables, figures, or callouts when they genuinely help.
- An image plan with at least 3 visual concept variants unless the user asks to skip images.
- Asset filenames that match the selected frontmatter.

For rewrites, preserve Dan's point of view and sharpen the piece instead of sanding it into neutral documentation. Make the article more useful than the draft by adding examples, naming tradeoffs, removing throat-clearing, and making the reader feel smarter by the end.

## Quality Bar

Before finishing, check that the post has a clear enemy, a useful map, enough concrete detail, and no paragraphs that could appear unchanged on a vendor blog. If a sentence is merely plausible, improve it or cut it.
