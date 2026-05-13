# Translation Candidate
- Slug: quiz-in-the-aws-cloud
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-12-28--quiz-in-the-aws-cloud/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 58.81
- Input tokens: 24542
- Output tokens: 24032
- Thinking tokens: unknown
- Cached input tokens: 10368
- Cache write tokens: 0
- Estimated cost: $0.005283
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-12-28--quiz-in-the-aws-cloud/ja/index.mdx reports/i18n/quiz-in-the-aws-cloud/ja
## Raw Output

````mdx
---
unlisted: false
title: 'クイズ: AWS ストレージ – 20問以上!'
subTitle: クラウドの迷路を抜けられますか？
label: AWS Storage
category: Quiz
subCategory: Cloud
date: '2024-12-28'
modified: '2024-12-29'
tags:
  - quiz
  - aws
  - cloud
  - storage
  - databases
  - s3
  - dynamodb
  - rds
  - elasticache
social_image: ../mobile.webp
cover_full_width: ../aws-cloud--city-focus-wide.webp
cover_mobile: ../aws-cloud--city-focus-square.webp
cover_icon: ../aws-cloud--city-focus-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">クラウドに挑戦するかい？！ 🤡</p>

AWS ストレージサービスを徹底的に掘り下げよう！このクイズでは S3、DynamoDB、Aurora、RDS、ElastiCache などの知識を試す。ベストプラクティスから罠まで、クラウドストレージの全貌を検証する。

クラウドの専門性を証明する準備はできたか？ 🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ウォームアップ"
  title="S3 トリビア"
  options={[
    {text: 'サーバー ストレージ v3'},
    {text: 'サービスとしてのストレージ'},
    {text: 'シンプル ストレージ サービス', isAnswer: true},
    {text: 'サッシー ストレージ サービス'},
    {text: 'シンプル 同期 ストア'},
  ]}
>
  <slot name="question">
  <div className="question">
    <p className="text-sm">最終確認日: 2026年5月8日。AWS の制限や価格は頻繁に変わります。</p>
    `S3` の名前は何を意味しますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    S3 は **Simple Storage Service** の略です。大規模データ保存向けに設計されたスケーラブルなオブジェクトストレージサービスです。

    AWS S3 には複数のストレージクラスがあります:
    - Standard: 頻繁にアクセスされるデータ向け
    - Infrequent Access (IA): アクセス頻度が低い場合の低コスト
    - Glacier: 長期保存向けの低コストアーカイブストレージ

    各クラスは価格とアクセス特性が異なり、データ使用パターンに応じたコスト最適化が可能です。

    [​S3 ストレージクラスの詳細を見る​](https://aws.amazon.com/s3/storage-classes/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="スキーマレス"
  title="DynamoDB"
  options={[
    {text: '任意のプロパティを保存する', isAnswer: true},
    {text: '動的パーティションキー'},
    {text: '列は型がない'},
    {text: '自動管理されるJSONスキーマ'},
    {text: 'スキーマサポートにRDSに依存する'},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB が「スキーマレス」と表現されるのはどういう意味ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    DynamoDB が「スキーマレス」とみなされるのは、事前に定義されたスキーマなしでアイテムに任意のプロパティを保存できるためです。

    [DynamoDB ベストプラクティス](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="スキーマレス"
  title="DynamoDB"
  options={[
    {text: 'PutItem', hint: '新しいアイテムを作成するか、既存のアイテムを新しいアイテムで置き換えます。'},
    {text: 'BatchUpdateItem', hint: '存在しません。'},
    {text: 'BatchWriteItem', hint: '単一の呼び出しで複数のアイテムを Put（挿入）または Delete します。'},
    {text: 'UpdateItem', isAnswer: true},
    {text: 'BatchUpsertItem', hint: 'DynamoDB で？'},
    {text: 'TransactWriteItems', hint: '複数の PutItem、UpdateItem、DeleteItem、ConditionCheck 操作を単一の呼び出しにまとめます。'},
  ]}
>
  <slot name="question">
  <div className="question">
    どの DynamoDB API が既存のアイテムの属性を更新しますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ポイントは <b>updates</b> であり、inserts や PUT ではありません。挿入を行う場合は `BatchWriteItem` または `TransactWriteItems` を使用できます。

    `BatchWriteItem` は複数の操作を処理できますが、PUT と DELETE に限定されます。`TransactWriteItems` はより強力ですが、シンプルな更新にはやや大げさです。
    シンプルな更新には `UpdateItem` が最適です。既存のアイテムの1つ以上の属性を UPDATE、つまり変更できます。

    `UpdateItem` 操作はリクエストごとに1つのアイテムを変更します。大規模なバックフィルや一括更新の場合は、通常多数の `UpdateItem` 呼び出しをオーケストレーションするか、PartiQL バッチ実行、Step Functions、Glue、EMR、またはカスタムワーカープロセスといった大規模ワークフローを使用します。

    `UpdateItem` 操作:
    - 既存アイテムの属性を更新します。
    - 既存アイテムに新しい属性を追加します。
    - 既存アイテムから属性を削除します。
    - アイテムが存在する、または特定の条件を満たす場合にのみ更新を条件付きで実行します。

    [DynamoDB UpdateItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="クエリ機能"
  title="高度な検索機能"
  options={[
    {text: 'ElastiCache', hint: '主にインメモリキャッシュです。新しい Valkey バージョンには検索機能が含まれています。'},
    {text: 'OpenSearch', isAnswer: true},
    {text: 'Neptune', hint: '高度なクエリ機能を持つグラフデータベース'},
    {text: 'Redshift', hint: '複雑な分析クエリ'},
    {text: 'DocumentDB', hint: 'MongoDB 互換のクエリ'},
  ]}
>
  <slot name="question">
  <div className="question">
    ここにある AWS サービスのうち、全文検索と検索分析のために専用設計されたものはどれですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    OpenSearch は検索、ログ分析、全文検索ワークロード用の AWS が提供するマネージドサービスです。

    誤答となっているサービスは有用ですが、このリストで専用設計された検索エンジンではありません:
    - ElastiCache: 主にインメモリキャッシュです。現在の ElastiCache for Valkey にはインデックスされたインメモリデータ向けの検索コマンドが含まれているため、サービス全体に検索機能がないと説明するのは正確ではなくなりました。
    - Neptune: グラフデータベースで、全文検索のために OpenSearch と統合できます。
    - Redshift: SQL 分析用のデータウェアハウスです。
    - DocumentDB: サポートされているバージョンで MongoDB 互換のテキスト検索を提供するドキュメントデータベースです。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="RDS"
  title="マルチAZデプロイ"
  options={[
    {text: 'ストレージコストを削減する'},
    {text: 'アウトバウンド問題を解決する'},
    {text: '自動フェイルオーバーを提供する', isAnswer: true},
    {text: '読み取り性能を向上させる'},
    {text: 'ジオ分散トラフィックを改善する'},
  ]}
>
  <slot name="question">
  <div className="question">
    RDS マルチAZデプロイの **主な** 利点は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Availability Zones (AZ) は **リージョン内の** 別々のデータセンターです。RDS マルチAZデプロイは、*近くの* AZ にあるスタンバイレプリカへの自動フェイルオーバーを提供します。

    Multi-AZ デプロイ:
    - 自動フェイルオーバーを提供する
    - データベースの可用性を向上させる
    - 同期スタンバイレプリカを作成する
    - インフラ障害時のダウンタイムを最小化する

    Multi-AZ デプロイを、読み取りスケール用のリードレプリカと混同しないでください。

    {/* [RDS Multi-AZ Details](https://aws.amazon.com/rds/features/multi-az/) */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="WebSockets"
  title="WebSocket の魔法"
  options={[
    {text: 'API Gateway', isAnswer: true},
    {text: 'EKS', hint: 'EKS は長時間稼働する WebSocket サービスを自分で実行できます。'},
    {text: 'Lightsail', hint: 'Lightsail インスタンスで独自の WebSocket サーバーを実行できます。'},
    {text: 'AppSync', hint: 'AppSync は WebSocket 上で管理されたリアルタイム GraphQL サブスクリプションを提供しますが、任意の生のソケットはサポートしません。'},
    {text: 'EC2', hint: 'EC2 で長時間稼働する WebSocket サーバープロセスを実行できます。'},
  ]}
>
  <slot name="question">
  <div className="question">
    👋 ここまで楽しんでいることを願っています！

    難しい問題の時間です…

    AWS がクライアント接続を管理し、統合先へメッセージをルーティングする、マネージド WebSocket API を提供しているサービスはどれですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    API Gateway は双方向 WebSocket API をサポートしますが、実装は API Gateway が管理しており、独自サーバーへの直接ソケットではありません。
    API Gateway はクライアント接続を保持し、Lambda、HTTP エンドポイント、その他の統合先へメッセージをルーティングします。接続中のクライアントへは API Gateway Management API を通じてメッセージを送信できます。

    他のサービスは WebSocket にずっとフレンドリーです:
    - Lightsail: シンプルな WebSocket 設定に最適 👌
    - AppSync: 管理された GraphQL サブスクリプションに WebSocket を使用
    - EC2: WebSocket 用の「好きなことを何でも」クラシックオプション
    - EKS: スケーラブルな WebSocket クラスタの実行に最適

    プロのコツ: 生の WebSocket 機能が必要なら、コンピュート系サービスを使い続けてください！
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="S3 セキュリティ"
  title="S3 バケットポリシー"
  options={[
    {text: '新しいバケットを公開する', hint: '最小権限、まずはこれ。'},
    {text: 'S3 をオンプレミスに移行して ACL を完全に管理する'},
    {text: 'データをプライベートブロックチェーンに移す', hint: '冗談でしょ？'},
    {text: '最小権限の原則を使用する', isAnswer: true},
    {text: '必要なアクセスを確保するためにポリシーのワイルドカードを使用する', hint: '😯 だめ！'},
  ]}
>
  <slot name="question">
  <div className="question">
    S3 バケットの権限設定で推奨されるアプローチは何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    実質的にすべてのシステムで、"最小権限" 設計を採用することは、堅牢化と将来への備えの重要な手段です。既存システムをロックダウンしようとするのは、オフィスビル全体を新しい基礎に移すくらい大変です。

    S3 バケットも例外ではありません。最小権限の原則を適用するには、まず権限を付与しない状態から始め、必要なアクセスだけを許可します。IAM ロールとポリシーでアクセスを制御し、バケット権限を定期的に監査しましょう。

    セキュリティベストプラクティス:
    - 最小権限の原則を適用する
    - 権限なしから開始する
    - 必要なアクセスだけを付与する
    - IAM ロールとポリシーを使用する
    - バケット権限を定期的に監査する

    過度に許可された設定は機密データを露出させる可能性があるので避けてください。

    [S3 Security Best Practices](https://aws.amazon.com/s3/security/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Aurora"
  title="Aurora Serverless"
  options={[
    {text: '常にプロビジョンドより安い'},
    {text: 'コンピュート容量を自動的にスケール', isAnswer: true},
    {text: '無制限のストレージを提供'},
    {text: 'データベース管理を不要にする'},
  ]}
>
  <slot name="question">
  <div className="question">
    Aurora Serverless の主な機能は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Aurora Serverless:
    - コンピュート容量を自動的にスケール
    - ワークロードに応じてリソースを調整
    - 予測不可能なワークロードに最適
    - 使用したリソース分だけ支払う

    トラフィックが変動するアプリケーションに最適です。

    [Aurora Serverless の概要](https://aws.amazon.com/rds/aurora/serverless/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="バッチ、パート1！"
  title="BatchGetItem の制限"
  options={[
    {text: '1', hint: '... バッチ処理にこだわります。'},
    {text: '25', hint: '`BatchWriteItem` の上限です。'},
    {text: '100', isAnswer: true},
    {text: '75', hint: '近いですが、丸い数字です。'},
    {text: '50', hint: '`BatchGetItem` の方が少し高めです。'},
    {text: '200', hint: '少し高すぎます…'},
    {text: 'Unlimited', hint: '`BatchGetItem` には固定の上限があります。'},
  ]}
>
  <slot name="question">
  <div className="question">
    もう一つ DynamoDB バッチの質問です！<br />
    単一の DynamoDB `BatchGetItem` リクエストで取得できる最大アイテム数は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    DynamoDB SDK では、単一の `BatchGetItem` リクエストで最大 **100** アイテムを取得できます。これは `BatchWriteItem` の上限である 25 アイテムよりも多いです。
    さらに、総ペイロードサイズ、ドキュメントサイズ、リクエストレートにも制限があります。

    これらの制限を理解することは、アプリケーションのパフォーマンスを最適化し、効率的なデータ操作を実現するために重要です。

    **Note:** いくつかの制限は、AWS アカウントマネージャーを甘く説得すれば超えることも可能です。 😎
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="バッチ、パート2！"
  title="バッチ操作"
  options={[
    {text: '1', isAnswer: true},
    {text: '10'},
    {text: '25', hint: 'なかなかの推測…'},
    {text: '50'},
    {text: '100', hint: 'GetItem の上限を考えましたか？'},
    {text: '100 when streaming'},
    {text: 'None of the above', hint: 'ちょっとややこしいですね…'},
  ]}
>
  <slot name="question">
  <div className="question">
    バッチで DynamoDB が `UPDATE` できるドキュメントの最大数は？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    DynamoDB クライアントは基本的に HTTP API のラッパーです。`BatchWriteItem` 操作では **25** 件のドキュメントを `PUT` または `DELETE` できますが、複数のドキュメントを `UPDATE` することはできません。

    DynamoDB は **25** 件のドキュメントを `INSERT` できますが、`UpdateItem` 操作を使うと **1** 件しか `UPDATE` できません。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="DynamoDB"
  title="プロビジョンド vs オンデマンド キャパシティ"
  options={[
    {text: 'プロビジョンドは常に優れている'},
    {text: 'オンデマンドは無制限のキャパシティを持つ'},
    {text: 'パフォーマンスは同じです'},
    {text: 'オンデマンドは予測不可能なワークロードでコストが安い', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB のオンデマンドキャパシティはいつ使うべきですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    オンデマンドキャパシティが最適なケース:
    - 予測不可能なワークロード
    - 断続的なトラフィック
    - アクセスパターンが不明なアプリケーション
    - オーバープロビジョニングの回避

    プロビジョンドキャパシティが適しているケース:
    - 予測可能で一貫したワークロード
    - パフォーマンスのより細かい制御
    - コスト削減の可能性

    [DynamoDB Capacity Modes](https://aws.amazon.com/dynamodb/pricing/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="S3 パフォーマンス"
  title="S3 パフォーマンス最適化"
  options={[
    {text: 'ランダム/ハッシュプレフィックスを使用する'},
    {text: '論理的なプレフィックスを使用する；ランダム化は不要', isAnswer: true},
    {text: '常に最大サイズのオブジェクトを使用する'},
    {text: 'オブジェクト数を最小化する'},
  ]}
>
  <slot name="question">
  <div className="question">
    高リクエストレートで S3 のパフォーマンスを最適化するには？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    S3 パフォーマンスのヒント:
    - 最新の S3 はプレフィックスごとにリクエストレートを自動的にスケールします
    - パフォーマンスのためにランダム/ハッシュプレフィックスは不要です
    - アクセスパターンに合った論理的なキー名を使用してください
    - 非常に高いリクエストレートを出す場合は 503 Slow Down 応答を監視します

    以前はホットパーティションを避けるためにプレフィックスのランダム化が推奨されていましたが、現在はデフォルトのパフォーマンス要件として推奨されていません。

    [S3 Performance Guidelines](https://aws.amazon.com/s3/performance/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="RDS バックアップ"
  title="RDS バックアップ戦略"
  options={[
    {text: '手動スナップショットのみ'},
    {text: 'バックアップは不要'},
    {text: 'ポイントインタイムリカバリ付き自動バックアップ', isAnswer: true},
    {text: '週次フルバックアップ'},
  ]}
>
  <slot name="question">
  <div className="question">
    推奨されるRDSバックアップのアプローチは？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ベストバックアッププラクティス:
    - 自動バックアップを有効化
    - ポイントインタイムリカバリを使用
    - コンプライアンス要件に基づきバックアップを保持
    - 復元プロセスを定期的にテスト
    - クロスリージョンバックアップを検討

    自動バックアップの提供内容:
    - 継続的なデータ保護
    - 柔軟な復旧オプション

    [RDS バックアップベストプラクティス](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="ElastiCache"
  title="Redis と Memcached"
  options={[
    {text: 'Redis はより多くのデータ構造と操作をサポートします', isAnswer: true},
    {text: 'すべての面で同一です'},
    {text: 'API レベルの互換性'},
    {text: 'Memcached は常に高速です'},
  ]}
>
  <slot name="question">
  <div className="question">
    ElastiCache の `Redis` と `Memcached` の主な違いは何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Redis の利点:
    - 複雑なデータ構造をサポート
    - 永続性オプション
    - 高度な操作
    - Pub/Sub メッセージング

    Memcached:
    - シンプルなキー‑バリュー ストア
    - 純粋なキャッシュ
    - シンプルなユースケースでの高性能

    [Redis vs Memcached](https://aws.amazon.com/elasticache/redis-vs-memcached/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="DynamoDB インデックス"
  title="グローバルセカンダリインデックス"
  options={[
    {text: 'プライマリキーと同一'},
    {text: '追加コストなし'},
    {text: '書き込み性能が低下する'},
    {text: 'プライマリ属性以外でクエリ可能', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB のグローバルセカンダリインデックスの目的は？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    グローバルセカンダリインデックス (GSI):
    - プライマリキー以外の属性でクエリ可能
    - 代替アクセスパターンを作成
    - クエリの柔軟性が向上
    - 追加の書き込み容量コストがかかる

    プライマリキーを超える複雑なクエリ要件に有用。

    [DynamoDB Indexes](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="S3 ライフサイクル"
  title="S3 ライフサイクル管理"
  options={[
    {text: 'オブジェクトを手動で移動する'},
    {text: 'ストレージクラス間でオブジェクトを自動的に移行する', isAnswer: true},
    {text: '古いオブジェクトを削除しない'},
    {text: 'すべてを Standard クラスに保存する'},
  ]}
>
  <slot name="question">
  <div className="question">
    S3 ライフサイクル管理で何ができるようになるでしょうか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ライフサイクル管理:
    - ストレージクラス間でオブジェクトを自動的に移行する
    - 使用頻度の低いデータをより安価なストレージへ移動する
    - オブジェクトの有効期限設定ルールを作成する
    - ストレージコストを最適化する
    - 手動管理の負担を減らす

    [S3 Lifecycle Rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="Aurora スケーリング"
  title="Amazon Auroraでのリードスケーリング"
  options={[
    {text: '単一のリードレプリカに限定', hint: 'Aurora のスケーラビリティ機能を考えてみてください。'},
    {text: 'リードスケーリングは不可能', hint: 'それは Aurora の機能と合っていますか？'},
    {text: '最大15個のリードレプリカをサポート', isAnswer: true},
    {text: '無制限のリードレプリカ', hint: '実際には考慮すべき制限があります。'},
  ]}
>
  <slot name="question">
  <div className="question">
    Amazon Aurora がサポートできるリードレプリカの最大数は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Amazon Aurora は **最大15個のリードレプリカ** をサポートし、リード操作を大幅にスケールできます。これらのレプリカは次のメリットがあります：

    - **レプリカ間のほぼ瞬時のレプリケーション**
    - **プライマリインスタンスへの最小限のパフォーマンス影響**
    - **リードワークロードの効率的な分散**

    この構成により、リード需要の高いアプリケーションでも水平スケーリングが可能になります。

    [Aurora リードレプリカの詳細はこちら](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replicas.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="RDS セキュリティ"
  title="RDS 暗号化"
  options={[
    {text: 'データを保存時と転送時に暗号化する', isAnswer: true},
    {text: '暗号化は任意です'},
    {text: '暗号化は利用できません'},
    {text: '特定のカラムのみ暗号化する'},
  ]}
>
  <slot name="question">
  <div className="question">
    RDS が提供する暗号化機能は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    RDS 暗号化機能:
    - KMS を使用して保存時のデータを暗号化
    - SSL/TLS を使用して転送時のデータを暗号化
    - データベース作成時に暗号化を有効化
    - 機密情報を保護
    - セキュリティ標準への準拠

    [RDS 暗号化オプション](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/encryption-options.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="DynamoDB Streams"
  title="DynamoDB Streams の目的"
  options={[
    {text: '追加のデータコピーを保存する'},
    {text: 'グリーンベンダー向け DynamoDB クレジット', hint: '本当に？'},
    {text: '書き込み性能を向上させる', hint: 'Streams は '},
    {text: 'イベント駆動アーキテクチャ向けにアイテム単位の変更を取得する', isAnswer: true},
    {text: 'グローバルセカンダリインデックスの代替手段', hint: '当て推測ですか？'},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB Streams の主な用途は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    DynamoDB Streams:
    - アイテム単位の変更を取得
    - イベント駆動アーキテクチャを有効化
    - Lambda 関数をトリガー
    - リージョン間レプリケーションをサポート
    - ほぼリアルタイムのデータ移動を提供

    [DynamoDB Streams Overview](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="S3 転送"
  title="大容量ファイル転送"
  options={[
    {text: '常に単一の PUT リクエストを使用する'},
    {text: '大きなファイルにはマルチパートアップロードを使用する', isAnswer: true},
    {text: 'アップロード前に圧縮する'},
    {text: 'アップロード前に手動で分割する'},
  ]}
>
  <slot name="question">
  <div className="question">
    S3 に大容量ファイルをアップロードする最適な方法は？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    マルチパートアップロードの利点:
    - 大容量ファイルを効率的に処理
    - 中断したアップロードを再開
    - ファイルパーツを並列にアップロード
    - 100MB 超のファイルに推奨
    - ネットワーク信頼性の向上

    [S3 マルチパートアップロード](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={20}
  group="コスト最適化"
  title="ストレージコスト分析"
  options={[
    {text: 'すべてのデータを S3 Standard に保存'},
    {text: '常に最も安いストレージを使用する'},
    {text: 'アクセスパターンに応じてストレージクラスを組み合わせる', isAnswer: true},
    {text: 'すべてを Glacier に保存'},
  ]}
>
  <slot name="question">
  <div className="question">
    1PB のデータを、20% は毎日、30% は月次、50% は年次でアクセスされる場合、最もコスト効果の高い保存方法は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    最適なストレージ戦略:
    - 毎日アクセスされるデータの 20% を S3 Standard に
    - 月次アクセスされるデータの 30% を S3 Standard-IA に
    - 年次アクセスされるデータの 50% を Glacier に

    この方法はコストを最適化し、適切なアクセスパターンを維持します。

    コスト考慮事項:
    - GB あたりのストレージ料金
    - 取得コスト
    - アクセスパターン
    - 移行コスト
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={21}
  group="DynamoDB 整合性"
  title="整合性モデル"
  options={[
    {text: '100 読み取り/秒', isAnswer: true},
    {text: '50 読み取り/秒'},
    {text: '200 読み取り/秒'},
    {text: '無制限の読み取り/秒'},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB テーブルのプロビジョンド読み取り容量は 100 RCU です。4KB アイテムに対して、1 秒間に実行できる強い整合性の読み取りは何回ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    DynamoDB の整合性モデルを理解することは重要です：

    - 1 RCU = 4KB 以下のアイテムに対する 1 回の強い整合性読み取り/秒
    - 1 RCU = 4KB 以下のアイテムに対する 2 回の最終的整合性読み取り/秒

    したがって：
    - 100 RCU = 100 回の強い整合性 4KB 読み取り/秒
    - 100 RCU = 200 回の最終的整合性 4KB 読み取り/秒

    整合性モデルは次に基づいて選択します：
    - アプリケーション要件
    - コスト考慮
    - パフォーマンス要件
    - データの新鮮さ要件
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={22}
  group="Aurora 高可用性"
  title="Auroraフェイルオーバーメカニズム"
  options={[
    {text: '手動での介入が必要'},
    {text: 'アプリケーションの再構成が必要'},
    {text: '常に最も古いレプリカにフェイルオーバーする'},
    {text: 'フェイルオーバー優先度ティアに基づく自動昇格', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    複数のリードレプリカを持つ Aurora クラスターで、プライマリインスタンスが障害した際の自動フェイルオーバー時に何が起こりますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Aurora フェイルオーバープロセス:
    1. プライマリインスタンスの障害を検出
    2. フェイルオーバー優先度ティアを主に基に Aurora レプリカを選択
    3. 優先度が同じ場合はインスタンス特性を tie-breaker として使用
    4. クラスターエンドポイントを自動的に更新

    ベストプラクティス:
    - AZ 間に複数のレプリカを配置
    - 昇格ティアを意図的に設定
    - アプリケーションではクラスターエンドポイントを使用
    - フェイルオーバーシナリオを定期的にテスト
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={23}
  group="S3 の一貫性"
  title="S3 の強い一貫性"
  options={[
    {text: '新規オブジェクトのみ'},
    {text: 'すべての操作で強い一貫性', isAnswer: true},
    {text: '更新時は最終的に一貫性が保たれる'},
    {text: 'リージョンによる'},
  ]}
>
  <slot name="question">
  <div className="question">
    2020年末時点で、S3 はすべての操作に対してどの一貫性モデルを提供していますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    S3 の一貫性モデル:
    - すべての操作で強い read-after-write 一貫性
    - PUT と DELETE に適用
    - 以前使用していた回避策は不要
    - 追加コストはかからない

    影響:
    - アプリケーションロジックがシンプルに
    - 一貫性チェックが不要
    - 書き込み直後の読み取りが確実
    - アプリケーションの信頼性が向上
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={24}
  group="DynamoDB の機能"
  title="有効期限 (TTL)"
  options={[
    {text: '有効期限が切れたらすぐにアイテムを削除する'},
    {text: '手動で削除トリガーが必要'},
    {text: 'ベストエフォートでバックグラウンド削除を行う', isAnswer: true},
    {text: 'アイテムは期限切れになるが保存されたままにする'},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB の TTL 機能はアイテム削除をどのように処理しますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    DynamoDB TTL の特性:
    - バックグラウンドプロセスが TTL 属性を監視
    - 期限切れのアイテムはベストエフォートで削除され、通常数日以内
    - TTL に追加コストはかからない
    - 削除されたアイテムはストリームに現れる

    使用例:
    - セッション管理
    - ログの期限切れ
    - 一時データのクリーンアップ
    - 法規制遵守
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={25}
  group="Aurora Serverless"
  title="スケーリングの挙動"
  options={[
    {text: 'スケーリング速度は現在の容量と設定された容量に依存します', isAnswer: true},
    {text: '需要に応じて即座にスケールします'},
    {text: '事前設定された間隔でのみスケールします'},
    {text: '手動スケーリングのみ'},
  ]}
>
  <slot name="question">
  <div className="question">
    突然のトラフィック急増に Aurora Serverless を頼る際の重要な考慮点は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Aurora Serverless スケーリング:
    - Aurora Serverless v2 は細かい ACU 増分で容量をスケールします
    - スケーリング速度は現在の容量と最小/最大 ACU 設定に依存します
    - 対応バージョンは設定により 0 ACU で自動一時停止できます
    - ACU に基づき秒単位で課金されます

    ベストプラクティス:
    - 重要なワークロードの急激なスパイクに備えて最小容量を十分に高く設定する
    - スケーリングイベントを監視する
    - 接続管理に注意する
  </div>
  </slot>
</Challenge>

</QuizUI>

Wow、あの冒険はかなり奥深くまで掘り下げましたね！ 🚀☁️  
AWS ストレージサービスについて、何かしら学びがあったことを願っています。

もっと見るには [Dan のチャレンジ](../challenges/) をチェックしてください！ 🧠  

※ 本クイズは教育目的のみで提供されています。すべての商標および著作権は各権利者に帰属します。特に大手ベンダーのものはそのままです。
````
