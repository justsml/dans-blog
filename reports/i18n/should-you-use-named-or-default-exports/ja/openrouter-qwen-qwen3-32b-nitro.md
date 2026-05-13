# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/ja/index.mdx
- Validation: passed
- Runtime seconds: 43.30
- Input tokens: 4368
- Output tokens: 3636
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001222
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'ESMエクスポート: 名前付きとデフォルトの違い？'
subTitle: 名付けるか、それとも名付けないか？
date: '2023-08-10'
modified: '2024-08-01'
tags:
  - typescript
  - javascript
  - modules
category: Guides
subCategory: JavaScript
cover: ../austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_mobile: ../w300_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_icon: ../icon_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
---
## JavaScriptで`named`と`default`エクスポートのどちらを使うべきか？

このトピックに関する熱心な記事は数多くあります。

その多くが`default export`を「ひどい」と評価します。一方で、`default`が勝者であるべきだと主張する意見もあります（例: AirBnbスタイルガイド）。

彼らはしばしば完全に一時的な問題を非難しています: IDEの自動インポートバグ、特定のバンドラのtree-shaking能力、インポート名のタイポ可能性などです。

そもそも`export`の目的そのものを見失っていないでしょうか？

**コードはコミュニケーションです。✨**

> インポーターに「**_この物の使い方_**」を信号として送っています。

### では、我々は何を言っているのでしょうか？

現代のJavaScriptでは、もののエクスポート方法には大きく分けて2通りあります：

- `export default` は明確に「これは**_最も重要な単一の_**ものです」と宣言します。また、「名前付きエクスポートは補助的な役割を果たします」とも言っています。
- `named export` は「これは**_絶対に何か！_**」と述べます。また、「他にも仲間がいますか？」という疑問を投げかけます。続きとして、「招待されていますか、必要ですか？」と問います。

もちろん、両方を組み合わせたり、コードベースの異なる部分で異なるアプローチを使ったりすることもできます。[記事の最後でさらに例を見てください](#summary)。

### 弱い引いた議論

### 弱い引いた議論

Let’s address some of the common “temporary issues” folks run into.

- Arg #1: Named exports ensure name consistency. [source](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - No, they don’t. You’re maybe looking for a lint rule?
  - (I hate to break it to you, but wait until you learn what variables can do!)

```tsx
// You can alias using both!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Arg #2: Use `import * as soManyKnives from './kinves.js'` to combine named exports. (Not linked, author retracted.)
  - Neat feature. Not the point.
  - Now tell me, how do I hold your contraption again? No author intent.
- Arg #3: Named exports have better IDE import or renaming support. [source](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- Incorrect (any more). Configure/update your tools.
  - Support has existed for 3+ years in [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ, etc.
  - Still, there are some “best practices” to use with `default exports` to get the best IDE & refactor experience.
  - ✅ `export default function UserService() {}` - always prefer named functions.
  - ❌ `export default function() { }` - anonymous functions are not implicitly tied to their filename. If you don’t name the thing, it’s hard to ask the computer to change it.
  - **Note:** For historical reasons you cannot combine `export default` with a `const` expression.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Not Supported ❌ ^
    // Cannot export default const ....
    // ==========================

    // However, once declared you can export a const var as the default.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Valid

    // For completeness:
    export default class anyoneStillUseThese {}
    // ^ ✅ Also valid to export a class as default
    ```

<section className="scroll-x">
## Summary

There are actually many combinations of ways we could export things, each tells a different story:

| Default (Exports) | Named (Exports) | Private Fns | Pattern                                                   | Meaning                                                       |
| ----------------- | --------------- | ----------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| ✅                | ❌              | ❌          | One default export.                                       | “Presenting ONE function w/ Single Purpose!”                  |
| ❌                | ✅              | ❌          | One named export.                                         | “Please don’t rename me.”                                     |
| ✅                | ✅              | ✅          | Default export + multiple 'private' un-exported functions | “Here’s some related logic. Also, expect class-ish behavior.“ |
| ❌                | ❌              | ✅          | Multiple named exports, generic file name.                | “A grab-bag of loosely related things, no hierarchy implied.” |
| ✅                | ✅              | ❌          | Single named export ALSO exported as default.             | “You can’t mess up importing me.”                             |
</section>

**Something to think about:** What are we saying when the file name does or doesn’t match one of its exports? (For example, a `utils.js` with many functions.)

### 結論

コードはコミュニケーションであるなら、`export`を真剣にやれ！ 💞
````
