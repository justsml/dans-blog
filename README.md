[![Netlify Status](https://api.netlify.com/api/v1/badges/a027c04c-d42a-42e3-8ef6-812e4e4bf2b4/deploy-status)](https://app.netlify.com/sites/danlevy/deploys)

# DanLevy.net

## TODO

- [ ] Stop using REM for layout (padding)
- [ ] Add list of OSS projects (see last site for starting list). Add postgis, turf.js, react native video?
- [ ] Add `<lastPubDate>` to RSS feed.
- [ ] Add AutoFit Text module [autoFit.ts](/src/shared/autoFit.ts)
- [ ] Change inset/blockquote to have an artistic border.
- [ ] Add 'pop-shadow' effect to `.article-card` on scroll in to view. Animate from `box-shadow: 0.0px 0.0px 0.0px hsl(0deg 0% 0% / 0.50);` and `box-shadow: 8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25);`
- [x] Add highlight to apply to all posts from same category when hovering over a an `.article-card`.
- [x] Add Mastodon & Bsky links to footer.
- [x] Support disabling styles in `<Gist />` component.
- [x] Add `theme-color` meta tag

- Add Scroll CSS Effects:
  - [ ] Adjust Quiz box-shadow using scroll position
  - [ ] Look into scroll snap for each quiz.

- [x] Update Quiz UI, 
  - [x] Make Question's Linkable
  - [x] Add `Group` to Question Title/Banner. Auto-count / number.
  - [x] Get rid of cliche icons abuse.
- [ ] Add/update ld+json / JSON-LD
- [ ] Look into scroll snap for each quiz.

- [ ] Publish:
  - [ ] Free Site Search (PageFind) overview
- [x] Add Quizzes to the Menu
- [x] Publish next batch of quizzes
  - [x] Add `Group` to Question Title/Banner. Auto-count / number.
- [x] Disable posthog locally
- [ ] Add Video page
- [x] Add search
- Publish:
  - [ ] Comments Component
  - [ ] Free local search
  - [ ] Newsletter
- [ ] Add Video page?
- [ ] Add newsletter?

## Done

- [x] Add highlight to apply to all posts from same category when hovering over a an `.article-card`.
- [x] Add comments
- [x] Fine tune: crank lighthouse score
- [x] Add Link to Category on Posts
- [x] Add Mastodon & Bsky links to footer.
- [x] Add LinkedIn link to footer.
- [x] Support inlining `<Gist />` with owned syntax highlighting.
- [x] Add Scroll CSS Effects:
  - [x] Adjust Quiz box-shadow using scroll position
- [x] Update Quiz UI
  - [x] Make Question's Linkable
  - [x] Add `Group` to Question Title/Banner. Auto-count / number.
  - [x] Get rid of cliche icons abuse.
- [x] Add Quizzes to the Menu
- [x] Publish next batch of quizzes
  - [x] Add `Group` to Question Title/Banner. Auto-count / number.
- [x] Disable posthog locally
- [x] Add search
- [x] Add new nav
  - [ ] Add tags?
  - [x] Add categories
  - [x] Add Popular/Related posts
- [x] Convert Quiz UI to MDX/Astro
- [x] Add favicon
- [x] Add social media meta tags
- [x] Add RSS feed
- [x] Add sitemap
- [x] Add smart 404 page
- [x] Add about page
- [x] Add OSS project list (in menu)
- [x] Add contact page
- [x] Add search

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## Helpers

Browser snippets to run in console to better understand the main factors in your generated site's size in bytes.

### Misc DOM Helpers

```js
const getAttrObject = el => Object.fromEntries(Object.values(el.attributes).map(attr => [attr.name, attr.value]));
```

### Analyze Size of Astro Sites

```js
Array.from(document.querySelectorAll('astro-island'))
.map(island => {
  var url = island.getAttribute('component-url');
  var size = island.outerHTML.length;
  return { url, size };
})
.sort((a, b) => b.size - a.size)
.map(island => `${island.url}: ${(island.size).toLocaleString()}`);
```

### Analyze Size of Key Elements

Get the size of the main elements in your site.

```js
var sections = Array.from(document.querySelectorAll('html, body, head, main, article, aside, nav, header, footer, style, script, astro-root, astro-island'))
.map(element => {
  var tag = element.tagName.toLowerCase();
  var size = element.outerHTML.length;
  return { tag, size, attrs: element.attributes };
})
var sectionSizes = Object.entries(sections.reduce((acc, {tag, size}) => {
  acc[tag] = acc[tag] == null ? size : acc[tag] + size;
  return acc;
}, {}))
.sort((a, b) => b.size - a.size)
// .map(element => `${element.tag}: ${(element.size).toLocaleString()}`);
console.table(sections);
console.table(sectionSizes);

```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `bun run dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally, before deploying     |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
