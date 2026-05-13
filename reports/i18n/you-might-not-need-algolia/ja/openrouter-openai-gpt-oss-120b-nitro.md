# Translation Candidate
- Slug: you-might-not-need-algolia
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-03-01--you-might-not-need-algolia/ja/index.mdx
- Validation: deferred
- Runtime seconds: 12.88
- Input tokens: 6679
- Output tokens: 1951
- Thinking tokens: unknown
- Cached input tokens: 1280
- Cache write tokens: 0
- Estimated cost: $0.000612
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Algolia™は必ずしも必要ないかもしれません
social_image: ../desktop-social.webp
subTitle: 静的サイトはホスト型検索を必要としないことが多い
tags:
  - search
  - algolia
  - pagefind
  - cdn
date: '2025-03-01'
modified: '2025-03-05'
category: Search
cover_full_width: ../synth-wave-city-wide.webp
cover_mobile: ../synth-wave-city-200-square.webp
cover_icon: ../synth-wave-city-200-square.webp
cover_credit: Image by Dan Levy
---
ほとんどのサイト検索の意思決定は遅すぎる。

「Algolia を使うべきだ」という声が上がる時点で、チームはすでに重要な質問を飛ばしていることが多い。すなわち「どんなコンテンツを検索対象にするのか？」という点だ。

答えが「すでにビルドしている HTML ページ」なら、[Pagefind](https://pagefind.app/) を最初に試すべきだ。Algolia が悪いからというわけではない。Algolia は多くの難しい課題を非常にうまく処理できる。しかし、検索インデックスがサイトのデプロイ時に変わるだけなら、ホスト型検索サービスはインフラの余計なコスプレに過ぎない。

<p class="inset">検索対象コンテンツがビルド時に生成される場合は Pagefind を使用する。ライブ書き込みやビジネスルール、ユーザー固有のランキング、あるいは静的ビルドでは提供できない運用上の保証が必要な場合は Algolia を選択する。</p>

このルールは想像以上に多くのサイトに当てはまる。ブログ、ドキュメント、マーケティングサイト、社内ハンドブック、製品ガイド、コースカタログ、そして主にページを公開する「アプリ」まで含まれる。

## 問題の形状

Algolia は外部検索システムを提供します。レコードを作成し、インデックスにプッシュし、ランキングを設定し、UI を組み立て、そして真実のデータソースと同期させ続けます。

Pagefind は、すでに配信済みの HTML を見て、その横に静的検索インデックスを構築します。

この違いは、統合を保守し始めるまで退屈に聞こえるでしょう。

Algolia を使うと、サイトはコンテンツの二重コピーを持つことになります。そこで次のような質問に答える必要が出てきます。

- デプロイは完了したがインデックス更新が失敗した場合はどうするか？
- 正規のフィールドはどれか：CMS のフィールドか、レンダリングされたページか、あるいは検索レコードか？
- ページと合致しなくなったランキング調整の所有者は誰か？
- 無料プランが実際のトラフィック形状に合わないと判明したらどうなるか？

これらの質問に価値があるケースもあります。マーケットプレイス、サポートポータル、あるいは大規模な e コマースカタログでは、そうである可能性が高いです。静的なドキュメントサイトに関しては、しばしば自ら招いた複雑さに過ぎません。

## Pagefind Works Because It Refuses The Extra System

Pagefind のトリックは魔法ではない。感覚だ。

ページが実際に存在するまで待ち、完成した HTML をインデックスし、サイトの他のファイルと同じ CDN に配置できる静的アセットのコレクションを書き出す。ブラウザは必要なチャンクだけをダウンロードする。常に稼働させておく検索サーバーも、クローラのクォータを監視する必要も、変更を覚えておく webhook パイプラインもない。

その結果、障害モードが圧倒的に分かりやすくなる：

- ページがデプロイされていれば、インデックスされたコンテンツはそのページから取得されたものです。
- ページがデプロイされていなければ、ユーザーはそもそも見ることができません。
- 検索結果が間違っている場合、問題は遠くの同期ジョブではなく、通常はレンダリングされたマークアップか Pagefind の設定にあります。

これがコンテンツサイトに対して好感を持つ理由だ。インデックスは生成物に追従する。

## 実際のセットアップはこうなる

プレーンな静的サイトの場合、ワークフローは快適に単調です：

- **CLI**：サイトの HTML ファイルを走査し、インデックスを生成して、数分でグローバル CDN にデプロイします。
- **Static Site Generators**：Astro や Hugo 用の PageFind プラグインを使ってインデックス作成を自動化します。
- **Custom Solutions**：PageFind の API を利用して、固有の要件に合わせた検索体験を構築します。

<figure>
  <figcaption>PageFind CLI でサイトをインデックス化する</figcaption>
  ![PageFind でサイトをインデックス化する](PageFind-Cleaner-better-15fps-720p2.webp "PageFind でサイトをインデックス化する")
</figure>

[Getting Started](https://pagefind.app/docs/) ガイドだけで十分に始められます。より重要なテストは運用面です：CI でインデックスを再構築し、出力をデプロイし、レンダリングされた HTML を調べて検索ミスをすべて説明できるかどうか。

## Algolia が依然として優位なケース



Pagefind は、トレンチコートを着た小さな Algolia ではありません。全く別の解答です。

検索インデックスをサイトのデプロイとは独立して更新する必要がある場合は、Algolia、OpenSearch、Postgres 検索、あるいは他のライブシステムを使います。

具体例は次の通りです。

- 数分ごとに変わる在庫数
- ユーザーごとの権限やプライベートな検索結果
- 売上、鮮度、人気、実験結果などに基づくカスタムランキング
- 静的サイトにまとめられないシステム間のフェデレーション検索
- ベンダーが提供することが期待される分析・運用サポート

これらは実際に必要とされる要件です。Pagefind が高速だからといってそれらを処理できると装うのは、別のベンダーブログ的な語り口です。

## 私が採用している判断基準

最初に一つだけ質問してください：

> ユーザーが閲覧している同じ静的出力から検索インデックスを再構築できますか？

もし「はい」なら、まず Pagefind を導入します。デフォルトでプライベート検索が可能になり、CDN に適したアセットが提供され、意見を持つサービスアカウントが一つ減ります。

もし「いいえ」なら、インデックスをリアルタイムに保つ要因（在庫、権限、パーソナライズ、分析、ランキング、書き込み頻度など）を特定し、その仕事を明確に担うデータベースまたは検索サービスを選択してください。

Algolia が悪者というわけではありません。悪者は、最初のアーティファクトが不十分であることを証明する前に、二つ目のシステムを導入してしまうことです。
````
