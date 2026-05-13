# Translation Candidate
- Slug: one-weird-trick-to-speed-up-feature-teams
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/ja/index.mdx
- Validation: deferred
- Runtime seconds: 3.41
- Input tokens: 9780
- Output tokens: 2931
- Thinking tokens: unknown
- Cached input tokens: 4608
- Cache write tokens: 0
- Estimated cost: $0.000909
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 機能チームを加速させる奇抜なテクニック
subTitle: スタッフエンジニアはこれが嫌いです！
date: '2024-09-29'
modified: '2024-09-30'
tags:
  - agile
  - teams
category: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide_danny-howe-98KlbUsOO_w-unsplash.webp
cover_mobile: ../danny-howe-98KlbUsOO_w-unsplash__w200.webp
cover_icon: ../danny-howe-98KlbUsOO_w-unsplash__w200.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@dannyhowe?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Danny
  Howe</a> on <a
  href="https://unsplash.com/photos/red-and-white-neon-light-signage-98KlbUsOO_w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
{/* Add html5 toggle element */}

<details>
<summary>Table of Contents</summary>

- [Thinking in Keys](#thinking-in-keys)
  - [Designing with Keys](#designing-with-keys)
  - [KVs as Graphs & Trees?](#kvs-as-graphs--trees)
  - [When to Use KV Patterns](#when-to-use-kv-patterns)
  - [When to Avoid KV Patterns](#when-to-avoid-kv-patterns)
  - [When you need more than KV](#when-you-need-more-than-kv)
- [Next Steps](#next-steps)
  - [Fact Service - Reference Project](#fact-service---reference-project)
- [Conclusion](#conclusion)
  - [Further Reading](#further-reading)

</details>

新しいシステムや機能を設計するとき、スキーマ設計に時間を取られがちです。この記事では、私のキャリアで効果を実感したシンプルな手法を紹介します。

<section class="breakout">
  _Try_ the simplest possible data persistence when designing a new system or feature.
</section>

多くの場合、チームはデータ保存先として SQL や MongoDB を唯一の選択肢として選びがちです。SQL を選んでも誰も叱責されませんが、もっとシンプルで高速、しかもコストが低い方法があるとしたらどうでしょうか。

KV（キー‑バリュー）ストアが必要なだけかもしれません。Redis や S3 のようなものです。

それが常に最適な選択というわけではありませんが、**思いのほぼ半数以上**は KV が適しています。

シンプルなストレージ層を導入すれば、データ層のコードを再利用でき、スキーマ設計やマイグレーションに伴う churn のコストを回避できるため、*初期* 開発をやや速く進められます。churn は必ず発生します。コード側でできるだけ長く対処させておき、変更箇所を二か所に増やすのは避けましょう。

`key` の検索は高度に最適化されているため、パフォーマンス向上が期待できます。また、書き込みはバッチ更新の恩恵を受けやすいです。

{/* データセット内のプロパティで検索したり JOIN が必要な場合、あるいは無限に増大し続けるデータ（`Logs`、`Signups` など）を扱う場合は KV パターンを避けてください。 */}

## キーで考える

オブジェクト階層やエンティティリレーション図（ER 図）を前提に設計し、SQL で直接実装してきた経験がある場合、最初にキー‑バリュー パターンで設計するのは違和感を覚えるかもしれません。

おそらく **KV パターン** はすでに使ったことがあるでしょう。設定ファイルや URL、S3 形式のオブジェクトストレージなど、至る所に存在します。データを一意な `ID` で扱うたびに、実は別のキー‑バリュー パターンが現れています（ただし必ずしも KV ストアである必要はありません）。

### キーで設計する

実質的にすべてのデータは KV パターンで表現可能です。（実際、多くの上位レベルのデータベースは下位レベルの KV パターン上に構築されています。）いくつか例を見てみましょう。

```markdown
user/123          {id: 123, ...}
user/123/block    ['user/456', 'user/789']
user/123/groups   ['admin', 'staff']
user/420/friends  ['user/456', 'user/789']

group/admin       {user: '*:rw'}
group/default     {user: '*:r'}

product/42/discount/<UUID>	{percentOff: '10%'}
product/42/discount/<UUID>	{percentOff: '20%', minTotal: 100.0}
```

気づいたかもしれませんが、`ID` 自体がキーになることが多いです。これは KV ストアでよく見られるパターンで、キーはエンティティ種別と一意な識別子の複合になることが一般的です（例：`user/123`、`user:456`）。

### KV をグラフやツリーとして扱う？

複雑なデータ構造（グラフやツリー）を KV パターンで表現すると便利なことがあります。（再び、REST の URL が好例です。）

キー階層（`user/420` → `user/420/friends`）は、`user` とその `friends` 間のグラフ関係を自然にエンコードします。

これはグラフデータ構造をシリアライズする、手軽で低コストな手法です。特に、Neo4j のようなグラフデータベースの複雑さが不要な場合に有効です。

<figure>
![user/123 のグラフ](../KVsCanBeGraphs.webp)
<figcaption>user/123 のグラフ</figcaption>
</figure>

### KV パターンを使うべきタイミング

- 大規模スケールが必要なとき（数十億、場合によっては数兆の KV ペア）。
- 主に一意キーでデータにアクセスする場合。
- シンプルなデータ構造が求められるとき。
- 階層、グラフ、またはツリー構造を持つデータがある場合。

### KV パターンを避けるべきタイミング

単一の KV ペアにブログコメントのようなものを格納しないでください。例として `post/666 -> {comments: [...too many...]}` のようにです。代わりに `post/666/comments/1` や `post/666/comments/<UUID>` などを使用するか、SQL テーブルに移行してください。

- データセット内のプロパティ（キーや ID 以外）で検索が必要なとき。  
- 複数のエンティティにまたがってデータを **JOIN** する必要があるとき。  
- 複雑な制約やリレーションシップを強制する必要があるとき。

### KV 以上が必要なとき

プロジェクトの要件は自然に進化するため、KV ストアがサポートできる以上のことが求められることがあります。この段階では、より複雑なデータストアへの移行を検討する必要があります。

{/* 良いニュースは、KV パターンで始めて必要に応じてより複雑なシステムへ進化させられることです。S3 は単なるストレージ以上の機能を持ち、Athena によるファイル検索、Glacier、期限ポリシーなど多くのことが可能です。また、Redis も Pub/Sub、ジオ空間、ストリーム、ソート済みセットなどの高レベル機能を追加しており、いくつかの要件を満たすのに役立ちます。 */}

良いニュースは、単一の KV ストアから SQL への移行が、複雑な SQL スキーマを KV ストアへ移行するよりも比較的容易であるということです。（複数テーブル、インデックス、制約などがある場合）。この作業は 50 行程度のスクリプトで何度も実施しています。

経験則として、KV パターンから始めると SQL 設計の品質が向上することが多いです。データを別の視点で捉えることを余儀なくされ、SQL から本当に必要なものを **正確に** 把握できるようになります。

## 次のステップ

学ぶ最良の方法は実際に手を動かすことです。もしこのパターンをさらに深く探求したいなら、Redis、DynamoDB、あるいは S3 を使って **実装してみる** ことを推奨します。いずれも特徴的なトレードオフを持つ優れた KV ストアです。

### Fact Service - 参考プロジェクト

私のオープンソースプロジェクト **「Fact Service」**（GitHub にある参考実装）をチェックしてください。  
https://github.com/justsml/fact-service

これは、KV データサービスを実装したスタンドアロンの RESTful API です。

多くの[data adapters](https://github.com/justsml/fact-service/tree/main/lib/providers)が用意されています。  
Postgres、Redis、DynamoDB、Firestore、そして Cassandra 用のアダプタも含まれています！（[Docker コマンド](https://github.com/justsml/fact-service/tree/main/lib/providers)が完備されているので、すぐに始められます。）

Fact Service は入門・学習用プロジェクトとして設計されているので、フォークして自分だけの KV データサービスを構築してください！

## 結論

この記事が役に立ったことを願っています。質問やフィードバックがあれば、遠慮なくコメントするか、[Twitter](https://x.com/justsml)で `@` を付けて連絡してください。

### クレジット

- [Modeling Hierarchical Tree Data in PostgreSQL](https://leonardqmarcq.com/posts/modeling-hierarchical-tree-data)
- [Do's and Don'ts of Storing Large Trees in PostgreSQL](https://leonardqmarcq.com/posts/dos-and-donts-of-modeling-hierarchical-trees-in-postgres)

### さらに読む

- [Fact Service](https://github.com/justsml/fact-service)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [S3](https://aws.amazon.com/s3/)
- [Cassandra](https://cassandra.apache.org/)
- [Firestore](https://firebase.google.com/docs/firestore)
````
