# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 1.68
- Input tokens: 3214
- Output tokens: 1045
- Thinking tokens: unknown
- Cached input tokens: 1408
- Cache write tokens: 0
- Estimated cost: $0.000313
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2017-05-10--pitfalls-in-promise-docs/ja/index.mdx reports/i18n/pitfalls-in-promise-docs/ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise ドキュメントの落とし穴
subTitle: 人気ドキュメントの問題回避
date: '2017-05-10'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - programming
  - patterns
  - promises
  - functional-programming
cover: ../craig-whitehead-433328-unsplash.webp
cover_mobile: ../w300_craig-whitehead-433328-unsplash.webp
cover_icon: ../icon_craig-whitehead-433328-unsplash.webp
---
> Spotting Promise Anti-Patterns in google search results, and popular libraries.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

まずは告白します。以下で批判する「アンチパターン」と同じものを書いてしまったのは私ですし、多くの JS 開発者も同様だと思います。ここに書かれていることは個人的な攻撃でも、元の作者への非難でもありません。共通のパターンに対するコードレビューを行っているだけです。私の優先順位と批判的思考プロセスを共有できればと考えています。

> このプロジェクトを読めば、悪い Promise の警告サインを見分けられるようになるはずです。

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Q Library](#qlibrary)

--------------------------
### CallbackHell.com
> **CREDIT:** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

----------------------
### StrongLoop
> **CREDIT:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![strong loop](../strongloop.webp)

----------------
### RisingStack
> **CREDIT:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
これはかなり実践的な記事です。唯一懸念があるとすれば次の点です:

![Rising Stack](../risingstack.webp)

------------------------
### Q Library
> **CREDIT:** https://github.com/kriskowal/q

Q ライブラリは「Promises」と結びつけられる最も古く、かつ広く使われているものの一つです。そのため、古いサンプルが残っていたり、下位互換性を保つ必要がある点で問題が生じています。  
**「Promises と結びつけられている」と言うのは、実際には Q が `deferred` パターンにほぼ等価だと感じているからです。**

見た目は Promise に似ていますが、実際にはそうではありません。不要な理由でインターフェースが過剰に広がっており、命名規則も一貫性がなく略語が多用されるため、API を覚えるのが難しくなります。`when` や `done` といったメソッドは必須でもなく、むしろ混乱を招きます。

Bottom line: `deferred` パターンは痛みを伴うアンチパターンであり、従来のコールバック方式に比べて実質的に何も改善しません。

![q first example](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> 本記事の companion Github プロジェクト、[Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain) をご覧ください（★付き）。

> プロジェクト目標: JavaScript におけるより良い関数型言語パターンの調査と開発。
````
