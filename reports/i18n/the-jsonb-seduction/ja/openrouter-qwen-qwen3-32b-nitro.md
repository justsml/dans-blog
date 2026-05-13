# Translation Candidate
- Slug: the-jsonb-seduction
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--the-jsonb-seduction/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 86.06
- Input tokens: 10871
- Output tokens: 7695
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002716
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-12-29--the-jsonb-seduction/ja/index.mdx reports/i18n/the-jsonb-seduction/ja
## Raw Output

````mdx
---
title: 'JSONB: データベースを壊す最悪の方法'
subTitle: JSONBは非常に強力で有用ですが、ブロブを実際のスキーマとした場合、非常に悪用しやすいです。
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - postgres
  - postgresql
  - databases
  - jsonb
  - json
  - schema-design
  - technical-debt
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
PostgreSQLは、事前に堅いスキーマを定義することなく半構造化データを保存できるJSONBを追加した。このアイデア自体は妥当だった。たとえば、データの姿が本当に分からない場合や、従来のカラムに収めるよりも頻繁に変化するケースでは、JSONBは合理的な選択肢となる。

重要なのは、JSONB自体が間違いではないということだ。多くのシステムにおいて、これは問題領域の最も明快な表現となる。もし外部サービスのウェブフックペイロード、バージョン付きイベントボディ、機能フラグ、LLMの設定オブジェクト（各プロバイダやモデルがわずかに異なるかつ常に変化するオプションセットを持つ）を保存する場合など、すべてを第一級のカラムに強制する方がかえって面倒な場合がある。

問題は、JSONBがスキーマ設計の延期を隠蔽する最も簡単な手段でもあるということだ。意図と実装の間に、このデータ型は「部屋を後で片付ける」的なデータベースのエイリアスへと変質してしまった。6か月前に行った一時的な対応策が、今も残っており、今や本番環境がそれに依存している。

私は繰り返し同じパターンを目にする。チームは要件が不確実なのでJSONBカラムを追加する。落ち着いたら正規化するという自己約束を立て、3年後にはそのカラムが40種類ものユーザー情報のバージョンを含み、15のサービスがそれぞれ異なる前提でその中身をクエリしている。

技術的負債はJSONB自体にない。それはあなたが建設したはずのものと、実際には構築したものの間に生じるギャップだ。すなわち、文書化されていないスキーマオンリードシステムである。

## 通常の展開
--- CHUNK END ---

機能を追加していて、ユーザーが`twitter_handle`が必要か`bluesky_handle`か、あるいはまったく別のものが必要か分からない。スキーマを深く考えずに、こうする:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);
```

これは動く。機能をリリースし、次のタスクに進み、さらにその次のタスクに進む。JSONBカラムはバックグラウンドで静かに成長する。

これが分岐点だ。`profile`が不透明なblobとして`user.id`で取得され続ける限り、おそらく問題はない。それがビジネスデータの主な格納場所になるようになると、トレードオフは急激に変化する。

プロダクトチームが尋ねる:*「ニューヨークにいるユーザーはどのくらいいますか？」*

あなたはこう書く:

```sql
SELECT count(*) FROM users WHERE profile->>'location' = 'New York';
```

PostgreSQLはフルテーブルスキャンを行う。すべての行を。

ジンインデックスを追加する。まだ許容範囲かもしれない。場合によっては許容できる。だが今や、第一級のリレーショナルデータとして振る舞うフィールドが第一級のカラムにはならなかったため、実際の複雑さとストレージコストを支払っている。

### 1年目: スキーマのドリフト

同じカラムに3つのデータバージョンが存在する。

*   行1: `{"city": "NYC"}`
*   行1000: `{"location": "NYC"}`
*   行5000: `{"address": {"city": "New York"}}`

あなたのアプリケーションコードは今やこうなる:

```javascript
const city = user.location || user.city || user.address?.city || "Unknown";
```

スキーマを削除しなかった。単に検証と一貫性のチェックをデータベースから散らばったアプリケーションコードに移動しただけだ。

---

## JSONBを実際に使うべきとき

JSONBには有効なユースケースがあります。多くの場合問題なく使用でき、場合によっては唯一の最善の選択肢となることもあります。

重要な区別は「構造化データが良い、JSONが悪い」という単純な二分法ではありません。むしろ以下のような視点が近いでしょう:

- データは安定した主キーで全体的に取得されることが多いですか？
- キーはプロバイダ、バージョン、テナント、時間経過で大きく変化しますか？
- 既知の少数のフィールドをクエリするのか、スプリントごとに新しいパスクエリを考案するのか？
- アプリケーションがバージョン管理や検証を意図的に所有しているのか、それとも適当にやっているだけなのか？

### JSONBの正当なユースケース

---

### JSONBの正当なユースケース（続き）

1.  **ウェブフックペイロード**: Stripe、Slack、GitHubなどからデータを受信します。スキーマの制御はできません。クエリもほとんど行いません。デバッグや再送のために保存するだけです。**JSONBが最適です。**

2.  **ログ記録とイベントストリーム**: アプリケーションログ、監査トレース、エラーコンテキスト。書き込みが頻繁で、特定フィールドのクエリはまれで、通常は全体を一括分析やアナリティクスプラットフォームへのエクスポートで扱います。**JSONBは適切です。**

3.  **ユーザーの設定やプリファレンス**: 100以上のブール値フラグを持つ設定オブジェクトで、ほとんどの値が`false`で、ユーザーIDごとに全体を取得します。`WHERE preferences->>'theme' = 'dark'`のようなクエリは実行しません。**JSONBが適しています。**

4.  **LLMプロバイダ/モデル設定**: これは現代の明確な例です。OpenAI、Anthropic、Gemini、オープン重みのローカルモデル、ベンダー特有のゲートウェイはすべて重複するが異なるパラメータを公開します。たとえ同じプロバイダ内でも、モデルの機能やオプション名は進化します。`temperature`、`top_p`、`reasoning_effort`、`json_schema`、`tool_choice`、他20以上のパラメータをすべてユニバーサルなカラムに強制するよりも、JSONBの設定オブジェクトがはるかに正直です。**JSONBはここでは最適な抽象化です。**

5.  **APIレスポンスのキャッシュ**: 全体のAPIレスポンスをキャッシュします。データベースは単に高速なRedisです。キャッシュキーで取得し、ネストされたプロパティはクエリしません。**JSONBが適切です。**

6.  **イベントソーシング**: 不変なイベントペイロードを保存します。クエリは常に「アグリゲートXのすべてのイベントを時刻順に取得」となり、イベントプロパティで`WHERE`句は実行しません。**JSONBが合っています。**

7.  **拡張性のインターフェース**: インテグレーション、プラグイン設定、テナントごとのオーバーライド、マーケットプレイスメタデータ、プロバイダの機能、またはサブタイプごとに形状が変化すると予期される「追加フィールド」。**JSONBは妥協ではなく、適切な契約となる場合があります。**

指針: アプリケーションが既知のキーでドキュメントをフェッチし、検証/バージョン管理できると理解している場合、JSONBは優れた選択肢となる可能性があります。ビジネスがネストされたキーに関するリレーショナルな質問を繰り返すなら、そのフィールドはカラムになるべきです。

## 最も良いパターンは多くの場合ハイブリッド型です

多くの成熟したシステムはここに落ち着きます:

```sql
CREATE TABLE llm_requests (
  id UUID PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  config JSONB NOT NULL
);
```

これは極端などちらかよりも一般的に優れた設計です。

- `provider`、`model`、`status`、`created_at`は、フィルタリング、結合、集計、インデックス作成に使用されるため第一級のカラムです。
- `config`はJSONBのままにします。正確なオプションのインターフェースはモデルごと、プロバイダごとであり、進化し続ける可能性があります。

これは「正規化していない」という失敗ではありません。これは、適切な場所で境界を引いているのです。

### 大規模な場面で：オブジェクトバージョン > 正規化

ここで面白い点があります。十分に大規模な場面では、「正しい」解決策は正規化ではなく、オブジェクトバージョンです。

数十億行のデータと頻繁なスキーマ変化がある場合、カラムのマイグレーションはコストが高くなります。StripeやGitHub、Netflixなどの企業はすべてを正規化しません。代わりに次のようにします：

```sql
CREATE TABLE entities (
  id UUID PRIMARY KEY,
  version INT NOT NULL,
  data JSONB NOT NULL
);
```

アプリケーションは`version: 1`、`version: 2`、`version: 3`を読み取る方法を知っています。新しいフィールドのためのデータベースマイグレーションは不要です。コードが後方互換性を処理します。

これは怠惰ではなく、アーキテクチャ上の意思決定です。データベースの複雑さをアプリケーションの複雑さと交換しています。文書が自然にバージョン化され、アプリケーションが正規の解釈者である場合、これはまさに正しいトレードオフです。

失敗の形態は「JSONBを使用すること」ではありません。失敗の形態は、バージョン管理や検証、昇格ルール、ドキュメントデータとリレーショナルデータの明確な境界なしにJSONBを使用することです。

## 本当に重要になる質問

JSONBカラムを追加する前に、次のように尋ねるべきです：

1. `WHERE`、`JOIN`、`GROUP BY`、`ORDER BY`でネストされたフィールドをクエリする頻度は高いですか？
2. このスキーマは我々が管理していますか、それとも外部で定義され変動していますか？
3. レコード間で意図的に異質な形状を持っていますか？
4. アプリケーションレベルでの検証とバージョン管理がありますか？
5. どのフィールドが将来的に運用次元になる可能性が高いですか？

1番目の答えが「はい、常に」という場合、カラムが適切な選択肢である強いシグナルです。

2番目と3番目の答えが「はい」であれば、JSONBはおそらくあなたにとって重要な仕事をしています。

---  
## はめを抜け出す  

すでにこの穴にいるなら、掘り下げるのはやめよう。  

1. **監査**: `jsonb_object_keys`を実行し、実際に形状が変化しているのを確認する。仮定している形状ではなく、現実の形状を。  
2. **昇格**: フィルタリング、結合、ソート、レポートで最も頻繁に使用されるフィールドを特定する。それらを実際のカラムに昇格させる。  
3. **検証**: JSONBに残っているデータに対して、アプリケーションまたはデータベースレベルでの検証を追加する。  
4. **バージョン管理**: ブロブが本当にドメインデータである場合、それを明示的にバージョン管理する。  
5. **トリム**: 昇格されたカラムが確立されたら、ブロブから重複したキーを削除する。  

すべてのブロブが正規化されなければならないとは自分に言い聞かせず、ビジネスセマンティクスが永続的なブロブが「一時的」であるとも言わないでほしい。  

JSONBはドキュメントが本当にドキュメント型であるときに最適だ。リレーショナルスキーマが偽のヒゲをつけて現れるときに危険だ。  

## リソース  
---  
- [PostgreSQL JSONBドキュメント](../https://www.postgresql.org/docs/current/datatype-json.html)  
- [JSONBインデックス戦略](../https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)  
- [JSONBとリレーショナルカラムの使い分け](../https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)  
- [PostgreSQLスキーマ設計のベストプラクティス](../https://www.postgresql.org/docs/current/ddl.html)

- [PostgreSQL JSONBドキュメント](https://www.postgresql.org/docs/current/datatype-json.html)  
- [JSONBインデックス戦略](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)  
- [JSONBとリレーショナルカラムの使い分け](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)  
- [PostgreSQLスキーマ設計のベストプラクティス](https://www.postgresql.org/docs/current/ddl.html)
````
