# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: ja
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/ja/index.mdx
- Validation: deferred
- Runtime seconds: 64.04
- Input tokens: 4530
- Output tokens: 12830
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise ドキュメントの落とし穴
subTitle: 定番ドキュメントの落とし穴を回避する
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
> Google検索結果や人気ライブラリに潜むPromiseのアンチパターンを見極める

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

まず告白させてほしい。私が以下で批判している「アンチパターン」を、私自身も書いてきた。おそらく多くのJS開発者も同様だろう。ここで示した内容は、個人を標的にしたものでも、原作者への直接的な批判也不是ではない。単に一般的なパターンに対するコードレビューを行っているに過ぎない。私の優先事項と批判的思考のプロセスを共有できればと考えている。

> このプロジェクトを理解すれば、不適切なPromiseの兆候を見極められるようになるはずだ。

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
内容自体は悪くない。懸念点が1つある。

![Rising Stack](../risingstack.webp)

------------------------
### Q Library
> **CREDIT:** https://github.com/kriskowal/q

Qライブラリは「Promises」として最も普及し、かつ最も古い実装の一つだ。そのため、古びた例題や後方互換性の維持という技術的負債を抱えている。
**「Promises」と「関連づけて語られる」と言うのは、Qライブラリの本質は実は `deferred` パターンにあると感じているからだ。**

見た目はPromiseに似ているかもしれないが、私はそれがPromiseではないと主張する。間違った理由で、APIの表面積が極端に広すぎる。さらに命名規則も一貫しておらず、略語の使い分けが曖昧なため、インターフェースの習得が難しい。`when` や `done` といったメソッドは不要だ。

結論として明確に言えるのは、`deferred` パターンは運用上の負担を増やすだけの厄介なアンチパターンだということである。従来のコールバック方式と比較しても、実質的な改善点はほぼ存在しない。抽象化レイヤーを追加するだけで、可読性やデバッグ容易性はむしろ低下する。状態管理の複雑さが指数関数的に増大し、エラーハンドリングの経路も不明確になるため、保守コストは無駄に嵩む。

![q first example](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> この記事の companion リポジトリである GitHub プロジェクト [コールバックマウンテンからの脱出](https://github.com/justsml/escape-from-callback-mountain) を参照してほしい。& star（スター）も歓迎する。

> プロジェクトの目的：JavaScript におけるより優れた関数型パターンを調査・開発し、非同期処理の実装標準化とコード品質の向上に寄与すること。
````
