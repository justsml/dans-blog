# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: ja
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/ja/index.mdx
- Validation: deferred
- Runtime seconds: 103.35
- Input tokens: 6684
- Output tokens: 22942
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.023945
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ブログのアップグレードで得た教訓
subTitle: Astro、Tailwind、MDX、Pagefind など！
date: '2024-08-21'
modified: '2024-08-23'
category: Guides
tags:
  - astro
  - tailwind
  - mdx
  - pagefind
  - gatsby
cover: ../galaxy-contribution-mode.webp
cover_full_width: ../galaxy-contribution-banner.webp
cover_mobile: ../w300_galaxy-contribution-mode.webp
cover_icon: ../icon_galaxy-contribution-mode.webp
---
最近、8年以上運用してきたGatsby v1のサイトを刷新する作業に着手した。

本稿では、この移行プロセスで得た教訓と、試して面白かった技術について記す。

## 目次

- [プロジェクトの要件](#project-requirements)
- [適切な技術スタックの選定](#choosing-my-right-technology-stack)
- [Astro: 学習曲線と主要機能](#astro-learning-curve-and-key-features)
- [モダンCSS: 素晴らしい](#modern-css-wow)
- [検索: Pagefind](#search-pagefind)
- [コメント: Utterances](#comments-utterances)
- [Tailwind: 後悔](#tailwind-regrets)
- [結論](#conclusion)

## プロジェクトの要件

移行作業に着手する前に、以下の要件を定義した。

ブログの1日あたりのPV数は変動幅が大きい。そのため、追加のインフラオーバーヘッドを避けつつ、所望のパフォーマンスを得られる手段として、事前にビルドする静的サイト生成（SSG）アプローチを採用すべきだと判断した。

また、既存のコンテンツと機能はそのまま残す必要があった。要件リストは以下の通り。

- コードハイライト
- コメント機能
- サイト内検索
- 既存のReactコンポーネント（Quiz UI、Gist埋め込み）
- お問い合わせフォーム
- レスポンシブ画像
- 1秒未満の読み込み時間
- ブラウザ互換性：2018年以降
- 自動化およびPRベースのデプロイ

## 適切な技術スタックの選定

過去数年で、Jekyll、Hugo、Slate、Gatsbyといった静的サイト生成ツールから、Ember、Knockout、Angular、Vue、そして言うまでもなくReactに至るまで、数多くのフロントエンドフレームワークに触れてきた。

選択肢が多岐にわたったため、最終的に**Remix**、**Next.js**、**Astro**の3つに絞り込んだ。

評価プロセスの詳細はブログシリーズにできるほどだが、ここでは要点をまとめる。

<p class="breakout">_実用的な成果_を素早く出しやすかったため、[Astro](https://astro.build)を選んだ。</p>

API設計が無駄がなくシンプルだ。[柔軟性と明確な設計思想のバランスが取れている。](https://docs.astro.build/en/concepts/why-astro/)

特定のクラウドベンダーに依存したり、特定のフレームワークへの誘導を図ったりする匂いが一切ないのも、開発者として安心できた点だ。

Astroだけが使った技術ではない。使用した技術スタックの全体像は以下の通り。

- [Astro](https://astro.build): 現代的な静的サイトジェネレーター。
- [ShadcnUI](https://ui.shadcn.com): 再利用可能なコンポーネントのコレクション。
- [Tailwind CSS](https://tailwindcss.com): ユーティリティファーストのCSSフレームワーク。
- [MDX](https://mdxjs.com): マークダウンコンテンツとインラインコンポーネントの統合。
- [Pagefind](https://pagefind.app): 高速・静的・オフライン対応のサイト内検索ライブラリ。Algoliaは不要。
- [Utterances](https://utteranc.es): GitHubのIssuesを基盤としたコメントシステム。
- [Netlify](https://www.netlify.com): 自動化されたデプロイと、CAPTCHA付きお問い合わせフォーム。

## Astro: 学習コストと主要機能

<p class="breakout quote">Astroは、移行作業の基盤としてすぐに中核を担うようになった。</p>

特に有用だと感じた主な機能を以下に示す。

- `.astro` ファイル：一見すると Astro コンポーネントは React の JSX に似ているが、実際は大きく異なり、目指すゴールも異なる。（比較表は後述）
- 独自の Go 製 [ビルドツール](https://github.com/withastro/compiler) と Vite を採用：とにかく動く。ESM/CJS、TypeScript、コードバンドル、スタイル、画像などをシームレスに処理する。
- [フレームワークバイアス](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) や [クラウドバイアス](https://docs.astro.build/en/guides/deploy/) がない。（咳払い）Next.js、OpenNext
- [静的 vs. ハイブリッド](https://docs.astro.build/en/basics/rendering-modes/) レンダリング：Astro は [主要なクラウドプラットフォームのほとんどを対象とした柔軟性](https://docs.astro.build/en/guides/deploy/) を提供する。AWS、GCP、Firebase、Netlify、Vercel、Cloudflare Pages、Azure、Fly.io など多数。
- コンテンツコレクション：[`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) API により、コンテンツファイルをデータソースとして扱う作業が簡素化される。
- ファイルベースルーティング：Astro のファイルベースルーティングと `getStaticPaths` の組み合わせにより、ページ生成が極めて容易になる。
- SEO：[Astro は邪魔をしない](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63)。必要に応じて最小限の ~~デトリタス~~ ボイラープレート（`astro-island`）のみを出力する。

Astro が注入するマークアップのスタイリングや、`display: contents` の効果など、いくつかの挙動には少し驚かされた。

```tsx

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

```

### `.astro` とクライアントコンポーネントの比較

Astro コンポーネントは、強力なコンポーネント＆props パターンを備えた HTML テンプレートに過ぎない。ビルド時にデータをフェッチでき、バックエンドリソースに直接アクセス可能であり、特定の機密情報（アクセストークンや API キーなど）を隠蔽できる。

Astro の `.astro` コンポーネントを理解するための最善の方法は、クライアントサイドコンポーネント（React、Vue、Svelte など）と比較対照させることだ。

<section className="scroll-x">
| 必要な処理                                                                                   | `.astro` コンポーネント | クライアントコンポーネント |
| ---------------------------------------------------------------------------------------------- | ----------------------- | -------------------------- |
| 強力なテンプレート＋コンポーネントパターンで HTML を生成                                       | ✅                      | ❌                         |
| ビルド時にデータをフェッチ                                                                     | ✅                      | ❌                         |
| バックエンドリソースに直接アクセス                                                             | ✅                      | ❌                         |
| 機密情報を隠蔽（アクセストークン、API キーなど）                                               | ✅                      | ❌                         |
| クライアントサイド JavaScript を削減                                                           | ✅                      | ❌                         |
| クライアントコンポーネント（React、Vue、Svelte など）を使用                                    | ✅                      | ✅                         |
| インタラクションとイベントリスナーの追加（`onClick()`、`onChange()` など）                     | ❌                      | ✅                         |
| 状態とライフサイクルエフェクトの使用（`useState()`、`useReducer()`、`useEffect()` など）       | ❌                      | ✅                         |
| ブラウザ固有 API の使用                                                                        | ❌                      | ✅                         |
| 状態、エフェクト、またはブラウザ固有 API に依存するカスタムフックの使用                          | ❌                      | ✅                         |
</section>

## モダン CSS：おっ、これは

フロントエンド開発の現場に戻ると、ネイティブCSSの進歩に本当に驚かされた。

- CSS変数：以前から利用可能だったが、202*以降はブラウザ間でかなり安定している。
- ネスト：ついに仕様化され、以前の不格好な構文も解消された。今ではLessやSCSSとほぼ同じ感覚で使える。
- 新規セレクタ：[`:is()`](https://www.youtube.com/watch?v=3ncFpP8GP4g)、`:where()`、`:has()` により、要素のターゲット指定がより精密になった。
- `ch`、`vw` などのモダン単位や `clamp()` 関数により、レイアウトとタイポグラフィの制御が格段に向上した。
- `-inline` や `-block` 論理プロパティで、より自然な間隔設定が可能になった。水平軸または垂直軸のみにパディングやマージンを設定できる。`margin: 0 1rem 0 1rem` → `margin-inline: 1rem` のように。
- 高度なレイアウト：CSS Gridを再学習した。Wow、中身が相当ヤバい。使い方が無限にありそうで見えて圧倒されるが、1〜2つの使い方をマスターすれば十分やっていける。Gridの高度なレイアウトを組む際に参考になったリソースをいくつか示す：[Kevin Powellの動画：Learn CSS Grid the easy way](https://www.youtube.com/watch?v=rg7Fvvl3taU)、[Responsive w/o media queries](https://ardilamorin.com/responsive-no-media-queries/)、[Ten modern layouts in one line of CSS](https://web.dev/articles/one-line-layouts)。

## 検索：Pagefind

サードパーティ製サービスやデータベースホスティングに依存せず、**サイト内検索**を実装するのは面白い課題に思えた。そもそも、まだ1万記事もインデックスするほどコンテンツはないしな。

[Astroのコミュニティインテグレーション](https://astro.build/integrations/?search=find) をブラウズしている際、もっと早く知っておきたかった素晴らしいツールに出会った：[Pagefind](https://pagefind.app/)。

<p class="breakout quote">Pagefindほどローカルサイト検索の問題を解決してくれるツールは少ない。</p>

Pagefindの実装のシンプルさは素晴らしい。ANY静的サイトコンテンツに統合可能で、デフォルトUIを使うか、カスタムUIを構築するかは自由だ。

求める機能をすべて網羅し、すっきり解決してくれた。統合には数分しかかからず、大半の作業は `<div id="search"></div>` タグの追加と少しのスタイリングに尽きた！

## コメント：Utterances

残念ながら、Disqusと長年蓄積してきたコメントとはお別れすることになった。

サイト上のサードパーティスクリプトに対する制御と可視性をより強く求めた。

さらに、シンプルで保守性が高いことも必須だった。

その要件を満たすため、素晴らしい[Utterances](https://utteranc.es/)サービスを採用した。GitHubのIssuesベースのコメントシステムは、私の読者層と非常に相性が良い。セットアップも容易で、無料という点も大きい。

## Tailwind：後悔

使っているうちに後悔するようになった技術が一つある。Tailwindだ。

時間が経つにつれ、実装コストと保守コストの差が明確に感じられるようになる。Tailwindは記述が非常に速い反面、ある程度複雑になると、読み込みや拡張が煩雑になりがちだ。

## 結論

古いGatsby v1サイトをAstroを基盤としたモダンなスタックへ移行した経験は楽しかった。迷わず10/10で推奨する。

既存サイトの移行や、新しい静的（またはハイブリッド）サイトの構築を検討しているなら、Astroを必ずチェックしてほしい。学習曲線が急になる場面もあるが、パフォーマンス、開発者体験、そしてプロジェクトの将来性という観点での恩恵は、その努力に見合う価値が十分にある。
````
