# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: ja
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/ja/index.mdx
- Validation: deferred
- Runtime seconds: 23.31
- Input tokens: 3112
- Output tokens: 4093
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.001476
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise ドキュメントの落とし穴
subTitle: 人気ドキュメントの落とし穴を避ける
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
> Google検索結果や人気ライブラリに見られるPromiseアンチパターンを発見する。

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

まず告白から始めさせてほしい。私自身、以下で批判するのと同じ「アンチパターン」を書いてきた罪がある。それは多くのJS開発者も同様だろう。ここに書いたことは、特定の個人を非難する意図も、元の著者に向けたものも一切ない。単によくあるパターンに対してコードレビューを行っているだけだ——このプロジェクトを通じて、私の優先順位と批判的思考プロセスを伝えられればと思う。

> このプロジェクトを理解すれば、悪いPromiseの警告サインを見抜けるようになるはずだ。

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Qライブラリ](#qlibrary)

--------------------------
### CallbackHell.com
> **出典:** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

----------------------
### StrongLoop
> **CREDIT:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![strong loop](../strongloop.webp)

----------------
### RisingStack
> **CREDIT:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
これはかなりしっかりした記事だ。懸念は1つだけある。

![Rising Stack](../risingstack.webp)

------------------------
### Qライブラリ
> **CREDIT:** https://github.com/kriskowal/q

Qライブラリは最も使われているライブラリの1つであり、'Promises'に関連づけられた最古のものの1つでもある。そのため、古いサンプルコードや後方互換性の維持という課題を抱えている。
**Qは実際には`deferred`パターンに関するものだと感じているため、'Promises'に関連していると言っている。**

Promiseに似ているかもしれないが、私はそうではないと主張する。間違った理由で表面積が大きすぎる。また、命名規則が一貫しておらず名前を省略しているため、インターフェースを覚えにくくなっている。`when`や`done`のようなメソッドは不要だ。

結論：`deferred`パターンは厄介なアンチパターンだ。典型的なコールバック手法と比べて、実質的に何も改善していない。

![qの最初の例](../qlibrary-1.webp)

![q xmlHTTP deferred アンチパターン](../qlibrary-2.webp)

> この記事の関連Githubプロジェクト、[Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)をチェックして（& star）ください。

> プロジェクトの目標：JavaScriptにおけるより良い関数型言語パターンの研究と開発。
````
