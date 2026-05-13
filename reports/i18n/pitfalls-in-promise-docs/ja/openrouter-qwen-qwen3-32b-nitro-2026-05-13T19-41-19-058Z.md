# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/ja/index.mdx
- Validation: deferred
- Runtime seconds: 22.34
- Input tokens: 3111
- Output tokens: 3270
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001034
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: ''
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
> JavaScript Promiseのドキュメントやライブラリにおける一般的なアンチパターンの指摘。Qライブラリ、RisingStack、StrongLoopなどの古いまたは設計が不適切な例が、Promiseの偽装下でコールバックスタイルの複雑さを引き継いでいる。

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

まず告白しますが、私は以下の批判対象となる「アンチパターン」を自ら書いてしまったことがあります。多くのJS開発者が同様であることは間違いないでしょう。私が述べたことは、個人攻撃や原作者への批判を意図したものではありません。単に一般的なパターンのコードレビューを行っているに過ぎません。このプロジェクトを通じて、悪いPromiseの警告サインに気づけるよう、私の優先順位や批判的思考プロセスを共有したいと思います。

1. [コールバック地獄.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Qライブラリ](#qlibrary)

--------------------------
### コールバック地獄.com
> **クレジット:** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

### StrongLoop
> **クレジット:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`
![strong loop](../strongloop.webp)

----------------
### RisingStack
> **クレジット:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/
これはかなりしっかりとした記事です。ただ1つの懸念点があります：

![Rising Stack](../risingstack.webp)

------------------------
### Q Library
> **クレジット:** https://github.com/kriskowal/q

Qライブラリは「Promises」と関連付けられる最も使用され、最も古いライブラリの1つです。そのため、古くなった例や後方互換性を維持する必要があるという課題があります。
**「Promises」と関連付けられるのは、Qが実際には`deferred`パターンに焦点を当てているからだと感じています。**

Promisesに似ているかもしれませんが、私はそうではないと主張します。すべての間違った理由で表面積が大きすぎます。また、命名規則が不一しく略記されているため、インターフェースを覚えにくくなります。`when`や`done`のようなメソッドは必要ありません。

Bottom line: `deferred`パターンは非常に痛いアンチパターンです。これは典型的なコールバックアプローチと比べてほぼ何も改善しません。

![qライブラリの最初の例](../qlibrary-1.webp)

![qライブラリのXMLHttpRequestにおけるdeferred anti-pattern](../qlibrary-2.webp)

> この記事の補足となるGitHubプロジェクト、[Callback Mountainからの脱出](https://github.com/justsml/escape-from-callback-mountain)をご覧ください（スターをつけてください）

> プロジェクトの目標: JavaScriptにおけるより良い関数型言語パターンの研究と開発。
````
