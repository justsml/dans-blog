# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 8.97
- Input tokens: 10629
- Output tokens: 3430
- Thinking tokens: unknown
- Cached input tokens: 2944
- Cache write tokens: 0
- Estimated cost: $0.001032
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/ja/index.mdx reports/i18n/upgrade-from-gatsby-to-astro/ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ブログをアップグレードして得た教訓
subTitle: Astro、Tailwind、MDX、Pagefind、その他多数！
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
最近、8年以上前に作った Gatsby v1 サイトのアップグレードに取り掛かりました。

この記事では、作業中に得た教訓と試した面白い技術を共有します。

## 目次

- [プロジェクト要件](#project-requirements)
- [自分に合った技術スタックの選定](#choosing-my-right-technology-stack)
- [Astro: 学習コストと主要機能](#astro-learning-curve-and-key-features)
- [モダン CSS: Wow](#modern-css-wow)
- [検索: Pagefind](#search-pagefind)
- [コメント: Utterances](#comments-utterances)
- [Tailwind: 後悔](#tailwind-regrets)
- [結論](#conclusion)

## プロジェクト要件

アップグレードに着手する前に、要件を以下のように定めました。

ブログのページビュー数は日によって大きく変動するため、余計な複雑さを抱えずに求めるパフォーマンスを得られる静的事前生成サイトが適していると判断しました。

また、既存のコンテンツと機能をそのまま残す必要がありました。具体的には:

- コードハイライト
- コメント機能
- サイト検索
- 既存の React コンポーネント: クイズ UI、Gist 埋め込み
- お問い合わせフォーム
- レスポンシブ画像
- 1 秒未満のロード時間
- ブラウザ互換性: 2018 以降
- 自動化＋プルリクエストベースのデプロイ

## Choosing my Right Technology Stack

長年にわたり、Jekyll、Hugo、Slate、Gatsby といった多数の静的サイトツール、そして Ember、Knockout、Angular、Vue、そしてもちろん React といったフロントエンドフレームワークを使ってきました。

その結果、選択肢が多すぎて困ったので、最終的に **Remix**、**Next.js**、**Astro** の３つに絞りました。

評価プロセス全体をブログシリーズにしても良いですが、ここでは要点だけまとめます。

<p class="breakout">意味のあることを **すぐに** 行える点で [Astro](https://astro.build) を選びました。</p>

API の設計が非常にシンプルです。柔軟性と良い設計方針の **バランスが取れた** アプローチです。[その理由はこちら。](https://docs.astro.build/en/concepts/why-astro/)

Astro が特定のクラウドベンダーやフレームワークの方向性に偏っていない点も、安心感を与えてくれました。

使用した技術は Astro だけではありません。スタック全体は次の通りです。

- [Astro](https://astro.build): モダンな静的サイトジェネレータ。
- [ShadcnUI](https://ui.shadcn.com): 再利用可能コンポーネントのコレクション。
- [Tailwind CSS](https://tailwindcss.com): ユーティリティファーストの CSS フレームワーク。
- [MDX](https://mdxjs.com): Markdown コンテンツとインラインコンポーネント。
- [Pagefind](https://pagefind.app): 高速・静的・オフライン対応のサイト検索ライブラリ。Algolia は不要です。
- [Utterances](https://utteranc.es): GitHub Issues を利用したコメントシステム。
- [Netlify](https://www.netlify.com): 自動デプロイ、キャプチャ付きお問い合わせフォーム。

## Astro: 学習コストと主な機能

<p class="breakout quote">Astro はすぐにアップグレードの要となった。</p>

特に役立った主な機能は次のとおりです。

- `.astro` ファイル: 一見すると React の JSX コンポーネントに見えるが、実際はかなり違い、別の目的に特化している（下表参照）。
- 独自の Golang 製 [ビルドツール](https://github.com/withastro/compiler) と Vite により、ESM/CJS、TypeScript、コードバンドリング、スタイル、画像などをシームレスに処理し、ほぼ設定不要で動作する。
- [フレームワークバイアスなし](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) かつ [クラウドバイアスなし](https://docs.astro.build/en/guides/deploy/)（※ Next.js、OpenNext への皮肉）。
- [静的 vs. ハイブリッド](https://docs.astro.build/en/basics/rendering-modes/) レンダリング: Astro は [ほとんどのクラウドプラットフォーム](https://docs.astro.build/en/guides/deploy/)（AWS、GCP、Firebase、Netlify、Vercel、Cloudflare Pages、Azure、Fly.io など）へのデプロイ柔軟性を提供する。
- コンテンツコレクション: [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) API により、コンテンツファイルをデータソースとして扱う作業がシンプルになる。
- ファイルベースルーティング: `getStaticPaths` と組み合わせた Astro のファイルベースルーティングシステムにより、ページ生成が楽になる。
- SEO: [Astro は邪魔をしない](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63) ため、必要なときにだけ最小限の ~~デトリタ~~ ボイラープレート（`astro-island`）を出力する。

少し驚いた点として、Astro が注入するマークアップ周りのスタイリングや `display:contents` の挙動がある。

```tsx
```

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

```

### `.astro` コンポーネント と クライアントコンポーネント の比較

Astro コンポーネントは基本的に HTML テンプレートで、強力なコンポーネント＆プロップスパターンを備えています。ビルド時にデータを取得したり、バックエンドリソースにアクセスしたり、機密情報を隠したままにできます。

Astro の `.astro` コンポーネントを理解する最良の方法は、クライアントサイドコンポーネント（React、Vue、Svelte など）と比較することです。

<section className="scroll-x">
| 必要な機能は何か                                                                | `.astro` コンポーネント | クライアントコンポーネント |
| ---------------------------------------------------------------------------------- | ------------------- | ------------------- |
| 強力なテンプレート＋コンポーネントパターンで HTML を生成                         | ✅ | ❌ |
| ビルド時にデータを取得                                                            | ✅ | ❌ |
| バックエンドリソースに直接アクセス                                                | ✅ | ❌ |
| 機密情報を隠す（アクセストークン、API キー等）                                    | ✅ | ❌ |
| クライアント側 JavaScript を削減                                                   | ✅ | ❌ |
| クライアントコンポーネント（React、Vue、Svelte 等）を使用可能                    | ✅ | ✅ |
| インタラクティブ性とイベントリスナー（`onClick()`、`onChange()` 等）を追加可能   | ❌ | ✅ |
| State とライフサイクルエフェクト（`useState()`、`useReducer()`、`useEffect()` 等）を使用可能 | ❌ | ✅ |
| ブラウザ専用 API を使用                                                          | ❌ | ✅ |
| State、エフェクト、またはブラウザ専用 API に依存するカスタムフックを使用可能      | ❌ | ✅ |
</section>

## モダン CSS: ワオ

フロントエンド開発に戻ると、ネイティブ CSS の進化に感激しました。

- CSS 変数: しばらく前から利用可能で、202* 以降はブラウザ間でかなり安定しています。  
- ネスティング: ついに仕様に入り、以前の不格好な構文は不要です。現在は Less や SCSS に似た書き方ができます。  
- 新しいセレクタ: [`:is()`, `:where()`, `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) は要素のターゲティングをより正確に行えます。  
- `ch`、`vw` といったモダン単位や `clamp()` のような関数は、レイアウトやタイポグラフィの制御を向上させます。  
- `-inline` と `-block` 属性で間隔を自然に設定できます。水平方向または垂直方向のパディングやマージンを指定する際、`margin: 0 1rem 0 1rem` の代わりに `margin-inline: 1rem` と書けます。  
- 高度なレイアウト: CSS Grid を再学習中です。正直言うと情報量が多く、使い方が無限に見えるので圧倒されがちです。ただし、1〜2 パターンさえ掴めれば十分です。以下のリソースは Grid のトリックを習得するのに役立ちました。  
  - [Kevin Powell の動画: Learn CSS Grid the easy way](https://www.youtube.com/watch?v=rg7Fvvl3taU)  
  - [Responsive w/o media queries](https://ardilamorin.com/responsive-no-media-queries/)  
  - [Ten modern layouts in one line of CSS](https://web.dev/articles/one-line-layouts)

## Search: Pagefind

**サイト検索**をサードパーティサービスやデータベースを使わずに実装するのは、面白い挑戦だと思いました。まだ 10,000 件の投稿をインデックスするほどの規模ではありませんが。

[Astro のコミュニティ統合](https://astro.build/integrations/?search=find) を眺めていると、早く知っていればよかったという素晴らしいツールに出会いました: [Pagefind](https://pagefind.app/)。

<p class="breakout quote">ほとんどのツールが解決できない問題を、Pagefind はローカルサイト検索で的確に解決します。</p>

Pagefind の実装がシンプルなのは嬉しいです。任意の静的サイトコンテンツに組み込めますし、デフォルト UI を使うか、独自にカスタム UI を作るか選べます。

欲しかったことはすべてきれいに解決してくれました。統合にかかったのは数分で、主な作業は `<div id="search"></div>` タグを追加し、少しスタイリングするだけでした。

## コメント: Utterances

残念ながら、長年蓄積してきた Disqus とそのコメントは手放さざるを得ませんでした。

サードパーティスクリプトに対する制御性と可視性を高めたかったのです。

さらに、シンプルで保守しやすいことが求められました。

この結果、素晴らしい [Utterances](https://utteranc.es/) サービスを選びました。GitHub（issues ベース）のコメントシステムは私の読者層にマッチします。設定も簡単で、無料です。

## Tailwind: 後悔

唯一、使い続けるうちに徐々に後悔している技術があります：Tailwind。

書く時の速さは抜群ですが、規模が大きくなるにつれて保守コストが目に見えて上がります。複雑になると、読みや拡張が面倒になることがあります。

## 結論

古い Gatsby v1 サイトを Astro を中心としたモダンスタックへ移行したのは楽しい体験でした。10/10 でおすすめします。

古いサイトのアップグレードや新規の静的（あるいはハイブリッド）サイト構築を検討しているなら、まずは Astro を見ることを強く推奨します。学習コストは時に高く感じるかもしれませんが、パフォーマンス、開発体験、そしてプロジェクトの将来性に対するメリットはその労力に見合う価値があります。
````
