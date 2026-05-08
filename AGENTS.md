# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Astro 5 static blog with MDX content, interactive React quizzes, and Bun as the package manager. All pages are pre-rendered at build time - there is no server.

**Stack**: Astro 5, React 18, Tailwind CSS v4, MDX, Bun
**Deployment**: Netlify (static files)

## IMPORTANT

The server is probably running already. Never just assume you need to run `bun run dev` - always check the http localhost port (and response) first to see if it's already running. If you run `bun run dev` while it's already running, you'll get a confused around different ports or errors about the port being in use. If that happens, just stop the new process and check the existing one. Or stop and ask the user to start it again.

## Commands

```bash
# Development
bun run dev              # Dev server at localhost:4242 (runs type check first)
bun run check            # Type check without starting server

# Build
bun run build            # Build to ./dist/
bun run preview          # Preview production build

# Testing
bun run test:e2e         # Run Playwright tests (chromium only)
bun run test:e2e:ui      # Playwright UI mode
bun run test:e2e:debug   # Playwright debug mode

# Content utilities
bun run content:check    # Validate content conventions, taxonomy, related links, and MDX footguns
bun run screenshots      # Generate quiz question screenshots with Playwright
bun run fix-quizzes      # Validate and fix quiz question numbering
bun run webp-images      # Convert images to WebP format
```

**Important**: Always use `bun`, never npm or yarn.

## Architecture

### Content Structure

Posts live in date-prefixed directories:
```
src/content/posts/YYYY-MM-DD--slug-name/
├── index.mdx          # Post content with frontmatter
└── *.webp             # Images (stored with post)
```

**Frontmatter schema**: `src/content.config.ts`

**Critical frontmatter fields**:
- `redirects: string[]` - Old URLs to redirect here (auto-generates Netlify `_redirects` file)
- `category: string` - Controlled primary category from `src/content.config.ts`
- `draft: boolean` - Hide from build
- `unlisted: boolean` - Accessible via URL but hidden from lists
- `related: string[]` - Related post slugs
- `popularity: number` - 0-1 score for sorting
- `cover_alt: string` - Explicit hero alt text when the cover image is meaningful
- `cover_credit: string` - Optional HTML credit rendered below hero imagery

**Controlled categories**:
`AI`, `Code`, `DevOps`, `Engineering`, `Guides`, `HowTo`, `Instructional Design`, `Leadership`, `Lulz`, `Quiz`, `Regex`, `Search`, `Security`, `Thoughts`.

Run `bun run content:check` after adding posts, changing categories, changing visibility fields, or editing related links.

### Editorial Visibility Model

Visibility helpers live in `src/shared/postVisibility.ts`.

- Published/indexed: omit visibility flags or set `publish: true`.
- Unlisted: set `unlisted: true` for URL-accessible posts hidden from lists.
- Draft/private: set `publish: false`, `draft: true`, `hidden: true`, and `unlisted: true`.
- Archived/legacy-but-routable: keep `publish: true` and add historical framing in the post body instead of hiding the post.

### PostCollections: Central Data Source

**Always import from `src/shared/postsCache.ts` instead of calling `getCollection("posts")` directly.**

```typescript
import { PostCollections } from "@/shared/postsCache";

// Available data:
PostCollections._posts           // All posts, sorted newest first
PostCollections._postsBySlug     // Map for O(1) slug lookup
PostCollections._quizPosts       // Quiz posts only
PostCollections._categories      // Category counts
PostCollections._tags            // Tag → slug[] mapping

// Methods:
PostCollections.getStaticPaths() // For dynamic routing
PostCollections.getCategoryCounts()
PostCollections.getTagCounts()
```

This singleton provides consistent filtering (removes hidden posts), sorting, and slug normalization.

### Routing

**Main post route**: `src/pages/[...slug].astro`

```typescript
export async function getStaticPaths() {
  return PostCollections.getStaticPaths(); // Generates HTML for all posts at build time
}
```

At build time, Astro calls `getStaticPaths()` and generates one static HTML file per post.

**Other dynamic routes**:
- `category/[...category].astro` - Category listing pages
- `pages/[...page].astro` - Paginated post lists

### Auto-Generated Redirects

The `autoRegisterRedirects()` function (called in `[...slug].astro:17`) processes the `redirects` array from post frontmatter and appends rules to `public/_redirects` during build.

**Never manually edit `public/_redirects`** - always use frontmatter:

```yaml
---
title: My Post
redirects:
  - /blog/old-slug
  - /another-old-url
---
```

Implementation: `src/scripts/redirectManager.tsx`

### Quiz System

**Components**:
- `<QuizUI>` - Container component
- `<Challenge>` - Individual question with options/explanations

**State persistence**: Answers stored in browser localStorage via `QuestionStore.ts`:
```javascript
// Key: post slug (e.g., "quiz-javascript-promises")
// Value: Array of question states
[{
  title: "Question text",
  index: 0,
  isCorrect: true,  // or false, or undefined
  tries: 2
}]
```

**Hydration**: Many quiz posts intentionally use `client:visible={{rootMargin: "150px"}}` on `<Challenge>` components. Treat those as performance features. Do not convert them to `client:load` unless the user explicitly asks for eager hydration. Some small support components, such as `CodeTabs`, may still use `client:load`.

**Validation**: Run `bun run fix-quizzes` to check question numbering. Run `bun run content:check` to catch markdown-inside-JSX issues, invalid related links, taxonomy drift, and visibility mistakes.

## Common Tasks

### Add a Blog Post

1. Create: `src/content/posts/YYYY-MM-DD--slug-name/index.mdx`
2. Add frontmatter (minimum: `title`, `date`, `category`)
3. Write content in MDX
4. Prefer `related` frontmatter for editorial links to 2-5 genuinely related posts
5. Run `bun run content:check`
6. Run `bun run build` - routing happens automatically

### Add a Quiz

1. Create post with `category: "Quiz"`
2. Use `<Challenge>` components:
   ```mdx
   <Challenge
     index={0}
     question="What is the output?"
     options={["A", "B", "C"]}
     answer={0}
     explanation="Because..."
   />
   ```
3. Run `bun run fix-quizzes` to validate
4. Preserve existing `client:visible` directives on `<Challenge>` unless eager hydration is intentional
5. Run `bun run screenshots` for social images

### Redirect Old URLs

Add to frontmatter:
```yaml
redirects:
  - /old-path
  - /blog/2020/another-old-path
```

Redirects auto-generate during build.

### Add Images

1. Place WebP images in post directory alongside `index.mdx`
2. Reference in MDX: `![Alt text](./image.webp)`
3. Use `bun run webp-images` for batch conversion

## Path Aliases

```typescript
@/*              → ./src/*
@/components/*   → ./src/components/*
@/utils/*        → ./src/utils/*
@/screenshotter/* → ./screenshotter/*
```

## Build Process

1. `PostCollections` loads all posts from content collection
2. Frontmatter validated against Zod schema
3. `getStaticPaths()` generates routes for all posts
4. `autoRegisterRedirects()` updates `public/_redirects`
5. MDX rendered to HTML with React components
6. Images optimized (Sharp)
7. Code highlighting applied (Expressive Code, Dracula theme)
8. Search index built (Pagefind)

**Search**: Pagefind is the only supported search index. Do not work on or maintain compatibility with Orama, LanceDB, or any other search implementations. These are experimental and not supported.
9. Static HTML output to `dist/`

## Key Files

```
src/
├── content/posts/           # MDX blog posts
├── pages/[...slug].astro    # Main post routing (ENTRY POINT)
├── shared/postsCache.ts     # PostCollections singleton (USE THIS)
├── components/QuizUI/       # Quiz system
├── scripts/redirectManager.tsx  # Auto-redirect generation
└── layouts/Post.astro       # Post layout template

astro.config.mjs             # Astro configuration
playwright.config.ts         # E2E tests
```

## Important Conventions

- **Use Bun exclusively** - Node version >=20.0.0, Bun >=1.2.1
- **Import PostCollections** - Don't call `getCollection()` directly
- **Date-prefix directories** - Format: `YYYY-MM-DD--slug-name`
- **Frontmatter redirects** - Never edit `public/_redirects` manually
- **React hydration** - Preserve `client:visible` on quiz challenges; it is a deliberate performance feature
- **Store images with posts** - Keep images in same directory as `index.mdx`
- **Related links** - Use `related` frontmatter with valid slugs for durable editorial linking
- **Hero media** - Add useful `cover_alt` and `cover_credit` when a post has hero imagery
- **Subtitles** - Post subtitles render as paragraph/dek text, not heading levels
- **Lists** - Preserve native ordered-list semantics in markdown and CSS; do not restyle `ol` into generic block/list-item wrappers
- **Fast-moving claims** - Add a short "Last verified" note for claims about prices, limits, model capabilities, vendors, benchmarks, or tool availability
- **Security prose** - Avoid absolute guarantees. Prefer defense-in-depth wording: "reduces risk", "makes exploitation harder", "limits blast radius"
- **Legacy posts** - Do not hide old routable posts just because they are dated. Add historical framing and keep redirects/routes stable

## Editorial Style Notes

- Dan's voice is direct, technical, and allergic to vendor-blog gloss. Keep the scar tissue, remove the brochure.
- Prefer concrete tradeoffs and operational detail over catalog density.
- For comparison posts, explain when a tool is a good fit before listing every feature.
- For fast-moving AI/search/database content, distinguish measured facts from current impressions and include the verification date.
- For quiz posts, center the teaching insight behind the questions, not only the answer key mechanics.
- Humor works best as seasoning. If a bit starts competing with the argument, cut it back.

## Debugging

- **Type errors**: `bun run check`
- **Redirects not working**: Inspect `public/_redirects` after build
- **Quiz state issues**: Clear localStorage or use `QuestionStore._clearAllQuizData()`
- **Images not optimizing**: Verify WebP format, run `bun run webp-images`
- **Build fails**: Check for hidden posts with invalid frontmatter
