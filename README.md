[![Netlify Status](https://api.netlify.com/api/v1/badges/a027c04c-d42a-42e3-8ef6-812e4e4bf2b4/deploy-status)](https://app.netlify.com/sites/danlevy/deploys)

# DanLevy.net

## TODO

### Design & Improvements

- [ ] Stop using REM for layout (padding)

- [x] Fix the color scheme: make darker.
- [x] Update style of social media icons in footer.
- [ ] Add LMS-style data fields to `<QuizUI>` or `<Challenge>`: Learning Objective(s), Prerequisites, Estimated Time, Difficulty Level, Standards Alignment, Learning Outcomes, etc.
- [ ] Experiment: Use Astro's `client:load` to lazy load Quiz `<Challenge>`'s past the first `X`.
- [ ] Add sign-up form to footer.
- [ ] [Animate Nav Link Underline on Hover](https://css-irl.info/animating-underlines/)

### Performance & LightHouse Scores

- [ ] Re-organize CSS to reduce initial page load.
- [ ] Minimize JS not needed on load.
- [ ] Revisit lazy-loading nav menu.

### Content

- [ ] Add page listing my OSS contributions over the years.
- [ ] HOW TO: Comments Component
- [ ] HOW TO: Free local search
- [ ] Change the article card hover effect: https://codepen.io/thebabydino/pen/WNVPdJg?editors=0100

### Quizzes

- [ ] Add AWS Content
  - [ ] events, data streams, and triggers. (Kinesis, SQS, SNS, EventBridge, Lambda)
  - [ ] RDS, Aurora, ElastiCache, Redshift, Neptune, DocumentDB, QLDB
  - [ ] S3, Glacier, Storage Gateway, Snowball, FSx, EFS, EBS
  - [ ] networking, VPC, Direct Connect, Route 53, CloudFront, API Gateway, Transit Gateway
  - [ ] security, IAM, Cognito, Secrets Manager, KMS, Shield, WAF, Macie, GuardDuty
  - [ ] monitoring, CloudWatch, CloudTrail, X-Ray, Config, Trusted Advisor, Health Dashboard
  - [ ] deployment, CloudFormation, CDK, OpsWorks, Elastic Beanstalk, CodeDeploy, CodePipeline
  - [ ] management tools, Systems Manager, CloudWatch Logs, CloudWatch Events, Personal Health Dashboard
  - [ ] analytics, EMR, Athena, Redshift, QuickSight, Glue, Data Pipeline, Lake Formation
  - [ ] machine learning, SageMaker, Comprehend, Polly, Rekognition, Lex, Translate, Transcribe
  - [ ] developer tools, CodeCommit, CodeBuild, CodeDeploy, CodePipeline, Cloud9, X-Ray
  - [ ] serverless, Lambda, API Gateway, Step Functions, SAM, AppSync, Amplify
  - [ ] containers, ECS, EKS, Fargate, ECR, App Runner, Batch
- [ ] Add Terraform Content
  - [ ] Concepts, Modules, Providers, State
  - [ ] Advanced Topics, Supporting Large Teams, Gotchas, Best Practices
  - [ ] Integrations/providers: AWS, Azure, GCP, Kubernetes, LDAP, Docker, GitHub, GitLab, Bitbucket, etc.
  
- [ ] Add Docker Content
- [ ] Add GCP Content?
- [ ] Add Kubernetes Content
- [ ] Add Git Actions Content
- [ ] Add AI/ML Content
  - [ ] NLP (Natural Language Processing)
  - [ ] Complex Decision Trees
  - [ ] Boost abilities w/ RAG
  - [ ] Computer Vision
  - [ ] Speech Recognition
  - [ ] Reinforcement Learning
  - [ ] Generative Adversarial Networks
  - [ ] Transfer Learning
  - [ ] AutoML
  - [ ] Explainable AI
  - [ ] Transformers
  - [ ] Attention Mechanisms
  - [ ] Recurrent Neural Networks
  - [ ] Convolutional Neural Networks

- Math-ey Topics
  - [ ] Statistics
  - [ ] Linear Algebra
  - [ ] Calculus
  - [ ] Probability

### Features

- [ ] Link headers
- [ ] rehype-mermaid
- [ ] [Build an interactive "Favorite Tech Explorer"](https://www.notion.so/dansthoughts/My-Favorite-Tech-Stacks-Solutions-13108c5949488056aac1cecbe0a306a7?pvs=4)
- [ ] Add WebMentions support
- [ ] Add an "About Author" on Posts?

### Screenshots

- [ ] Capture Question 'raw' Text for ALT text. (Save alongside the question's image.)
- [ ] Add "social-banner" scaled output of question cards.
- [ ] Capture Full Home Page screens to compare in a later design article.
- [ ] Investigate recording animated gifs of the quizzes in action.

### Misc

- [ ] Add/update ld+json / JSON-LD
- [ ] Add Video page

- [x] Add comments
- [x] Fine tune: crank lighthouse score
- [x] Add Link to Category on Posts
- [x] Add highlight to apply to all posts from same category when hovering over a an `.article-card`.
- [x] Add Mastodon & Bsky links to footer.
- [x] Support disabling styles in `<Gist />` component.
- [x] Add `theme-color` meta tag

- Add CSS Effects:
  - [x] Adjust Quiz box-shadow using scroll position
  - [ ] Look into scroll snap for each quiz.

- [x] Update Quiz UI, 
  - [x] Make Question's Linkable
  - [x] Add `Group` to Question Title/Banner. Auto-count / number.
  - [x] Get rid of cliche icons abuse.
- [x] Add Quizzes to the Menu
- [x] Publish next batch of quizzes
  - [x] Add `Group` to Question Title/Banner. Auto-count / number.
- [x] Disable posthog locally
- [x] Add search

## UI/UX

- [x] Add new nav
  - [ ] Add tags
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

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## Helpers

Browser snippets to run in console to better understand the main factors in your generated site's size in bytes.

## Screenshot Related Stuff

### Generate Quiz Question Screenshots

```sh
# Generate Screenshots for posts with "Quiz" in the title.
bun run screenshots --filter=Quiz
# All Posts
bun run screenshots
```

```sh
bun run ./screenshotter/basic.ts \
  --output ./.screens \
  --url https://danlevy.net/should-you-use-named-or-default-exports/,https://danlevy.net/protect-your-tokens/,https://danlevy.net/securely-using-environment-variables-in-nodejs/,https://danlevy.net/naming-things-real-good/,https://danlevy.net/amazing-resources/,https://danlevy.net/deathmatch-git-rebase-vs-merge/,https://danlevy.net/guerrilla-types-in-typescript/,https://danlevy.net/you-may-not-need-axios/,https://danlevy.net/docker-server-setup-notes/,https://danlevy.net/javascript-promises-quiz/,https://danlevy.net/js-quiz-14-date-time-questions-test-your-knowledge/
```

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
