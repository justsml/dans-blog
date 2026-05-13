# Translation Candidate
- Slug: postgres-fts-vs-pgvector
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/ja/index.mdx
- Validation: deferred
- Runtime seconds: 68.39
- Input tokens: 30385
- Output tokens: 27942
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.009137
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'PostgreSQL検索: FTS、Trigrams、およびpgvector'
subTitle: 必要なツールはすでに揃っています。クエリに一致するものを選択してください。
date: '2026-05-08'
modified: '2026-05-08'
tags:
  - postgres
  - postgresql
  - pgvector
  - full-text-search
  - vector-search
  - trigrams
  - pg_trgm
  - databases
  - ai
  - search
category: Code
subCategory: Databases
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
AI機能を追加するチームは、しばしば最初に専用のベクトルデータベースに手を伸ばします。  
Pinecone、Weaviate、Qdrant、Chroma。新しいサービス、新しい依存関係、新しい接続プール、新しい請求書、そして今や2つの真実のソースを正直に保つ必要があります。  

一方で、すでにPostgreSQLを持っているチームも少なくありません。PostgreSQLにはすでに`pgvector`が搭載されています。また、2008年以来、優れたフルテキスト検索（FTS）も内蔵されていました。  

専用のベクトルストアは、大規模なデータ量や高頻度のクエリでその価値を発揮します。しかし多くのアプリケーションでは、最初の検索システムが十分に活用される前に、2番目の検索システムに手を出します。こうして未来のスケーリング問題が、今日の同期バグに変わってしまうのです。  

では、FTSはいつ使うべきで、pgvectorはいつ使うべきで、両方を使うのはいつでしょうか？  

---  

## 各ツールが実際に何をするか  

フルテキスト検索（`tsvector` / `GIN`インデックス）は語彙ベースです。テキストを語彙にトークン化し、語幹を抽出し、インデックスに対してクエリをマッチングします。"Running"と"runs"は同じ語彙に統一されます。"dog"と"dogs"も同様です。ランキング関数（`ts_rank`）は、クエリ語が頻繁に出現したり、目立つ位置にあったりするドキュメントに高得点を付与します。  

pgvectorはセマンティックです。埋め込みモデルが理解するチャンクの「意味」を表す密なベクトル（数値のリスト）を保存します。類似性検索はその高次元空間で近いベクトルを検出します。"dog"と"canine"は近い位置に配置されます。一方で、"running"（スポーツ）と"running"（プロセスの実行）は近い位置に来ないかもしれません。  

実際の違い：FTSは「これらの単語を含むドキュメントはどれか？」に答えます。ベクトル検索は「このこととほぼ同じ意味のドキュメントはどれか？」に答えます。

![検索ツールマップ。pg_trgmは短い曖昧な文字列、FTSは正確な文章クエリ、pgvectorはセマンティックマッチング、ハイブリッド検索は正確性とセマンティックシグナルの両方が必要な長いコンテンツに適する。](../search-tool-map.svg)

_最初の分岐は「従来検索 vs AI検索」ではありません。テキストの形状と、正しい答えの種類です。_

---

## FTSが適したケース

**正確な語句を検索しています。** 製品のSKU、エラーコード、モデル番号、ユーザー名、法律条文の参照番号などです。`SKU-AX-44192`はセマンティックに類似するものとはなりません。一致するかしないかだけです。ベクトル検索は自信を持って`SKU-AX-44193`を返すかもしれませんが、それは目的ではありません。

**クエリはキーワードベースです。** ユーザーが検索ボックスに文字を入力し、タグでフィルタリングする、またはキーワードでブログ投稿を検索する場合です。FTSはそのような意図の形状に設計されています。

**GPUや埋め込みインフラなしでランキング結果が必要です。** FTSのインデックスは高速で決定的であり、外部API呼び出しが必要ありません。`tsvector`列を追加し、GINインデックスを構築すれば完了です。

**検索とブールフィルタリングを併用しています。** `WHERE to_tsvector(body) @@ to_tsquery('postgres') AND category = 'tutorial' AND published_at > NOW() - INTERVAL '6 months'` — これは既存のクエリロジックと自然に組み合わせられます。

```sql
-- インデックスの作成
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- クエリ
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

`GENERATED ALWAYS AS`列はインデックスを自動的に更新します。`setweight`はタイトルマッチを本文マッチよりも高いランクに設定します。これで設定は完了です。

## トリグラムが勝つとき (pg_trgm)

PostgreSQLには見過ごされがちな3番目のツールがあります：`pg_trgm`。これは全文検索（FTS）でもベクトル検索でもありません。ファジー文字列マッチングを実現する仕組みであり、FTSとベクトル検索のどちらも扱いにくい中途半端な領域をカバーします。

**適用ケース：名前、住所、識別子、タイポを含む短い文字列**

FTSはテキストを語彙（lexeme）にトークン化し、語幹化します。これは文章向けですが、以下のケースでは不適です：
- 人名（"Dan Levy" → 語幹化で "dan levi", "leiv" など、言語設定に依存）
- 正確な綴りが重要な会社名、住所、商品タイトル
- タイポを含むクエリ（"Micheal Jordan", "Amaon", "javascipt"）
- オートコンプリート / プレフィックス検索
- 部分文字列マッチ（"son" が "Johnson", "Anderson" にヒット）

pgvectorもここでは不向きです。"Micheal Jordan"をベクトル化して最近傍を検索しても、埋め込み空間は意味で名前を組織化するので、近いベクトルは「バスケットボールの伝説」や「Michael B. Jordan」になり、タイポを含むユーザーレコードにはなりません。

`pg_trgm`は文字列を3文字の重複するスライスに分割し、2つの文字列が共有するトリグラム数を測定します。"Dan" → `" da"`, `"dan"`, `"an "`。"Micheal"と"Michael"は多くのトリグラムを共有するので、類似度が高くなります。

```sql
-- 拡張機能の有効化（通常は既に利用可能）
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 名前カラムのGINインデックス — トリグラム類似度検索を高速化
CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- ファジー名前検索：「Micheal Jordan」を「Michael Jordan」で検索
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % 演算子 = 類似度しきい値（デフォルト0.3）
ORDER BY score DESC
LIMIT 10;

-- トリグラムインデックスを活用したILIKEによる「含まれる」マッチ
SELECT id, name
FROM users
WHERE name ILIKE '%johnson%'   -- GINインデックスで高速化
LIMIT 10;
```

`%` 演算子は `pg_trgm.similarity_threshold`（デフォルト0.3、範囲0-1）を使用します。値を高くするとマッチ精度が厳しくなります。名前検索では0.3-0.4が通常適切：タイポをキャッチするには十分に広いしきい値でありながら、ノイズを防ぐには十分に厳格です。

**トリグラムはプレフィックス検索やオートコンプリートにも有効です。特にオートコンプリートにタイポ対応や「含まれる」マッチが必要な場合：**

```sql
-- オートコンプリート：プレフィックスマッチ。純粋な左アンカー付きプレフィックスでは、
-- トリグラムGINとB-treeパターンインデックスを比較してください。
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- より細かい制御：長文内での部分マッチにword_similarityを使用
-- （例：「Johnson」を「Andrew Johnson III」内で検索）
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name          -- <% 演算子 = word_similarityしきい値
ORDER BY score DESC
LIMIT 10;
```

**`pg_trgm`をFTSよりも選ぶべきシナリオ：**

| シナリオ | 使用するもの |
|---|---|
| タイポを含む人名/会社名検索 | `pg_trgm` |
| オートコンプリート / プレフィックス検索 | `pg_trgm`（またはFTSのプレフィックスクエリ） |
| 短い文字列、コード、識別子の検索 | `pg_trgm` |
| 記事やドキュメントの検索 | FTS |
| ログメッセージのキーワード検索 | FTS |
| 多言語名検索 | `pg_trgm`（言語非依存） |

`pg_trgm`はFTSと組み合わせて使用することもできます。トリグラムをファジーな事前フィルタとして使用し、`ts_rank`でランク付けする、またはトリグラムの類似度とベクトルスコアを組み合わせることもできます。

---

## pgvectorが適切なシナリオ

**RAGの構築**  
RAGは意味ベースの検索に依存します。ユーザーの質問と意味が最も近いドキュメントのチャンクを検索する必要がある場合、たとえ表現が異なる場合でも、ベクトル検索はこの目的に特化しています。FTSは類義語や概念的な一致を検出できません。

**ユーザーが検索する対象を直接記述しない**  
「夏の夕方に軽い何か」には明確なワインのキーワードが含まれていません。「新任マネージャー向けに自信を築く方法の記事」は、FTSでは提供できない意味理解を必要とします。

**類似するアイテムの検出**  
関連する製品、類似するサポートチケット、重複するバグ報告。「このチケットに類似した問題を検索してください」はベクトル演算です。新しい問題を埋め込み（embedding）し、最も近い近隣を検索します。

**多言語コンテンツ**  
多言語データでトレーニングされたベクトル埋め込みは、言語間の一致を検出できます。FTSは言語固有の設定を必要とし、クロス言語クエリを適切に処理できません。

```sql
-- セットアップ
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);
CREATE INDEX documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- クエリ: セマンティック検索
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

注意: `ivfflat`は近似検索です—高速ですが、一部のリコールを速度のために犠牲にします。データセットが小さい場合（約100万行未満）、`hnsw`の方が適切なことが多いです:

```sql
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);
```

---

## 両方の必要性がある場合

技術文書では、単純な分割が機能しません。ユーザーは「タイムアウトの設定方法」を検索しますが、「`withRetry()`」のような関数名や「`ECONNRESET`」のようなエラーコードも検索します。

ベクタ検索は概念的なクエリを処理します。FTSは正確な語句を処理します。どちらも単独では両方のケースをうまく扱えません。

解決策はハイブリッド検索です。両方を実行して結果を統合します。

**逆数順位融合 (RRF)** がここでの標準アルゴリズムです。2つのシステムのスコアを正規化する必要はありません。順位の位置を統合します。

```sql
-- ハイブリッド検索と逆数順位融合 (RRF)
WITH fts_results AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM documents, to_tsquery('english', $1) query
  WHERE search_vector @@ query
  LIMIT 50
),
vector_results AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(f.id, v.id) AS id,
    COALESCE(1.0 / (60 + f.rank), 0) + COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM fts_results f
  FULL OUTER JOIN vector_results v ON f.id = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

分母の `60` はRRF定数です。値が大きいほど順位差の影響が小さくなり、小さいほど影響が大きくなります。60はほとんどのケースで良好に機能します。

このクエリは1つのリクエストで2つの検索を実行し、順位を統合し、キーワードとセマンティック信号が一致する結果を報酬します。

![フルテキスト検索とpgvectorの2つのリストにクエリを分岐させ、逆数順位融合で統合するハイブリッド検索パイプライン](../hybrid-rrf-pipeline.svg)

_RRFの価値は、`ts_rank`とコサイン距離を直接比較するのではなく、「各リストでこの結果がどの順位に現れたか？」という質問に焦点を当てる点にあります。_

---

## 実践的な決定ツリー

検索戦略を選ぶ際には、**入力の形状**から始め、**ユーザーがどのタイプのクエリを実行しているか**を尋ねます。「スペル変異のある短い文字列」と「正確な語が重要となる長い文章」は異なる問題であり、どちらも「ドキュメントチャンクに関する質問」とは異なります。

![テキストの形状とユーザーのクエリ方法に基づいて、pg_trgm、フルテキスト検索、pgvector、ハイブリッド検索、または専用ベクトルデータベースを選択する決定木](../search-decision-tree.svg)

決定木を言葉で表現すると以下の通りです：

- **名前、住所、タイトル、オートコンプリート、またはスペルミスの多い短い文字列** → `pg_trgm`
- **既知の語、エラーコード、SKU、関数名、タグ、カテゴリ、フィルター** → フルテキスト検索（FTS）
- **質問、言い換え、おすすめ、関連アイテム、多言語マッチング、RAGチャンク** → pgvector
- **正確なシンボルと概念的回答の両方が必要な技術的コンテンツ** → RRFを用いたハイブリッド検索
- **プライマリキー、正確なID、権限フィルター、日付範囲、ソートされたリスト** → 通常のSQLインデックス
- **ベクトルのボリュームが非常に大きく、非常に高い同時性、またはPostgreSQLのベンチマークで達成できないレイテンシーターゲット** → 専用ベクトルストアの評価

### フルテキスト検索 vs セマンティック検索：簡潔なバージョン

「FTSを使うべきかベクトル検索を使うべきか？」という質問は、通常次のように簡略化されます：**関連ドキュメントに現れる語が分かっているか？**

はいの場合 - ユーザーが既知の語、カテゴリ、関数名、製品コードで検索する場合、FTSはより高速で、コストが安く、予測可能です。どの結果がマッチしたのかを教えてくれます。

いいえの場合 - ユーザーが概念を説明し、質問をしたり、異なる言語で検索する場合、ベクトル検索が適切なツールです。語ではなく意味をマッチします。

難しい中間領域は、技術的コンテンツに対する自然言語クエリです。たとえば、「接続ドロップをどう処理するか」を検索するユーザーは、「ネットワーク障害のリトライロジックの実装」というタイトルの記事を必要とするかもしれません。語の重複はありませんが、セマンティックな関連性は高いです。これがベクトル検索が価値を発揮する場面です。

もう1つの難しいケースは**名前と固有名詞**です。FTSもベクトル検索もこれらを得意としていません：
- FTSは「Michael」で検索しても「Micheal」を見逃すことがあります — トークンが異なるため
- ベクトル検索はトレーニングデータに頻出しない名前を完全に見逃す可能性があります
- `pg_trgm`はこれを正しく処理します：語彙的またはセマンティックな類似性ではなく、表記の類似性を評価します

実際には、コンテンツ中心の検索ボックスはFTSを速度とキーワードのため必要とし、ユーザーが名前を検索するかどうかに応じてハイブリッドまたは`pg_trgm`が必要になる場合があります。真のセマンティック検索機能は通常、pgvectorを意味します。RAGは常にpgvectorを意味します。

---

## ベクターストアの専用ソリューションが必要な場合

一部のシステムは本当にpgvectorを超えて成長します。そのような場合、市場は騒音に満ちています。トップオプションの中で重要な点を以下に示します。

### 機能マトリクス

この表が意味を持つ前に、いくつかの列を解説する必要があります。

**ハイブリッド検索**とは、BM25キーワード検索とベクトル類似度を1つのクエリで実行し、逆数ランク融合（Reciprocal Rank Fusion）でマージすることを意味します。"withRetry timeout"は関数名を正確に一致させるだけでなく、「ネットワーク障害のリトライロジック」に関するドキュメントをセマンティックに一致させることも可能です。ハイブリッドでない場合、1つの検索モードを選択するか、2つのクエリを自分で統合する必要があります。pgvectorの「手動（RRF経由SQL）」は[上記のアプローチ](#when-you-need-both)です：動作しますが、自分で実装する必要があります。

**スパースベクトル**はBM25よりも進んでいます。SPLADEスパースベクトルは約30,000次元（語彙語の1つごとに1次元）、約98%がゼロです。非ゼロの位置はどの語が重要でその重みを示します。"dogs"のクエリは"canine"や"pet"も重み付けします：BM25レベルのキーワード精度に加えて、ベクトルインデックス内で語の拡張。この列がfalseの場合、正確な語のクエリには外部FTSレイヤーが必要です。

```python
# SPLADE: 約30,000次元、約60非ゼロ — 関連語彙位置のみ活性化
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQLライク**は本当にフィルタリングについてです。フィルタリングなしのベクタ検索はデモであり、アプリケーションではありません：テナントスコープ、日付範囲、権限、カテゴリなどが必要です。完全なSQL（pgvector）は既存の結合と併せてこれを表現します。専用DBはJSONフィルターオブジェクト（Qdrant、Pinecone）、クエリDSL（Elasticsearch、Milvus）、またはGraphQL（Weaviate）を使用します。これらは動作しますが、フィルタロジックが複雑になるほどSQLが魅力的になります。

```sql
-- pgvector: ベクタ類似度はWHERE内の別の式
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2 AND category = ANY($3::text[]) AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1 LIMIT 10;
```

```python
# Qdrant: Pythonオブジェクトとしての同等フィルター — 機能的だが、儀礼的
results = client.query_points(
    collection_name="documents", query=query_embedding,
    query_filter=models.Filter(must=[
        models.FieldCondition(key="tenant_id", match=models.MatchValue(value=tenant_id)),
        models.FieldCondition(key="category",  match=models.MatchAny(any=categories)),
        models.FieldCondition(key="created_at", range=models.DatetimeRange(gte=cutoff)),
    ]),
    limit=10,
)
```

**マルチモーダルネイティブ**は「画像埋め込みを保存できる」という意味ではありません。すべてのデータベースは浮動小数点配列を保存します。これはデータベースが非テキストコンテンツ用の埋め込みモデルを提供することを意味し、生の画像URLを渡すとベクトル化を処理します。ここでのほとんどのデータベースは埋め込みに非依存なので、このパイプラインはあなたが所有します。MarqoとWeaviate（CLIP/ImageBindモジュール経由）はループを閉じます。

```python
# Marqo: ランダムな画像をPOSTし、テキストでクエリ — 外部の埋め込みステップは必要ない
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# キーワードのオーバーラップがゼロでもshoe-001を返す — CLIPがクロスモーダルマッチを処理
```

**ディスクベースのインデックス**はコストの問題です。生のベクトル、グラフオーバーヘッド、メタデータを含めると、RAMに駐留するHNSWは100万個の1536次元ベクトルあたり数GBのRAMを必要とします。ディスクネイティブな代替案（Milvus DiskANN、Elasticsearch DiskBBQ、LanceDBのLance形式、Turbopufferのオブジェクトストレージ階層）は、クエリのレイテンシを多少犠牲にしてインフラコストを抑えます。モデルのレイテンシがすでに支配的なRAGワークロードでは、ベンチマークを取ることがよくあります。Redis VSSはハードな制約です：RAM専用で、ディスクパスはありません。

**最大次元数**は今日の選択に潜む明日のマイグレーションです。`text-embedding-3-large`は3072次元を使用し、Jina v3はより大きな埋め込みを出力し、研究モデルはさらに高次元を押し進めています。一部のマネージドサービスは厳密な次元上限を公開しています。他のサービスは高次元上限または実用的な上限なしを文書化しています。コミットする前に現在のドキュメントを確認してください。余裕があるものを選んでください。ベクトルインデックスを次元上限に達したためにマイグレートすることは、地獄のようなスプリントです。

_2026年5月8日に公開プロジェクトドキュメントと製品ページで最終確認。マトリクスをスナップショットとして扱ってください：マネージドサービスの制限、価格、ハイブリッド検索機能、ディスクインデックスオプションは急速に変化します。_

| データベース | デプロイ | ライセンス | ハイブリッド検索 | 疎ベクトル | SQL / SQLライク | マルチモーダル | ディスクインデックス | 最大次元数 | 最適な用途 |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | 自ホスト/マネージド（Supabase、Neon、RDS） | OSS（PostgreSQL） | 手動（SQL経由のRRF） | ❌ | ✅ 完全SQL | ❌ | ✅ ディスク上のHNSW | 16,000保存；2,000インデックス`vector` | すでにPostgres上；中規模ベクトル数 |
| **[Qdrant](https://github.com/qdrant/qdrant)** | 自ホスト/クラウド | Apache 2.0 | ✅ ネイティブBM25 | ✅ 成熟したサポート | ❌（REST/gRPC） | ❌ | ✅ | 65,535 | 大規模フィルタクエリ；複雑なメタデータ |
| **[Weaviate](https://github.com/weaviate/weaviate)** | 自ホスト/クラウド | BSD 3 | ✅ ネイティブBM25 + RRF | ✅ | ❌（GraphQL / gRPC） | ✅ モジュール経由 | ✅ | 65,535 | GraphQLアクセスパターン；内蔵ベクトル化 |
| **[Pinecone](https://www.pinecone.io/)** | クラウド専用 | 専有権 | ✅（2024年追加） | ✅ | ❌ | ❌ | ✅（サーバーレス） | 20,000 | マネージドシンプル；オペレーションチームなし |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | 自ホスト/クラウド（Zilliz） | Apache 2.0 | ✅ ネイティブ | ✅ | ✅ SQLライク（Milvus Query Language） | ✅ | ✅ DiskANN | 32,768 | ビルリオンスケール；オンプレミス企業向け |
| **[Chroma](https://github.com/chroma-core/chroma)** | 埋め込み/自ホスト | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | ローカル開発とプロトタイピングのみ |
| **[LanceDB](https://github.com/lancedb/lancedb)** | 埋め込み/クラウド | Apache 2.0 | ✅ | ❌ | ✅ DataFusion経由のSQL | ✅ ネイティブ | ✅（Lance形式） | 無制限 | エッジ/サーバーレス；マルチモーダルレイクハウス |
| **[Orama](https://github.com/oramasearch/orama)** | 埋め込み/クラウド | Apache 2.0 | ✅ フルテキスト + ベクトル | ❌ | ❌ | ❌ | ❌ | 変動 | JS/エッジアプリ；軽量サイト/アプリ検索 |
| **[Turbopuffer](https://turbopuffer.com/)** | クラウド専用（サーバーレス） | 専有権 | ✅ BM25 + ベクトル | ❌ | ❌ | ❌ | ✅（オブジェクトストレージ） | 16,000 | マルチテナントSaaS；ミリオンネームスペース |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | 自ホスト/Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER疎 | ✅（ELSER） | ✅ クエリDSL | ❌ | ✅ DiskBBQ | 4,096 | すでにElasticスタック上；ハイブリッド企業検索 |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | 自ホスト/AWSマネージド | Apache 2.0 | ✅ RRF + ニューロン検索 | ✅ | ✅ クエリDSL | ❌ | ✅ FAISS + HNSW | 16,000 | AWSネイティブ；オープンソースElastic代替 |
| **[Vespa](https://github.com/vespa-engine/vespa)** | 自ホスト/クラウド | Apache 2.0 | ✅ ネイティブ | ✅ テンソル/辞書順ランク | ✅ YQL | ✅ テンソル | ✅ | 実質無制限 | 検索 + ランキング + おすすめシステム |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | 自ホスト/クラウド | Apache 2.0 | 手動 | ❌ | ✅ 完全SQL | ❌ | ✅ カラム + HNSW | 変動 | OLAPとベクトル検索を伴う分析/ログ |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | クラウド/自ホスト | SSPL | ✅ 内蔵 | ❌ | ✅ MQL + エイグレーション | ❌ | ✅ HNSW | 8,192 | すでにMongoDB上；ドキュメント + ベクトル統合 |
| **[Redis (VSS)](https://github.com/redis/redis)** | 自ホスト/Redis Cloud | RSALv2 / SSPL | ✅（RediSearch） | ✅ | ❌ | ❌ | ❌ RAM専用 | 32,768 | 超低レイテンシ；キャッシュレイヤベクトル検索 |
| **[Marqo](https://github.com/marqo-ai/marqo)** | クラウド/自ホスト | Apache 2.0 | ✅ | ❌ | ❌ | ✅ ネイティブ焦点 | ✅ | 変動 | エンドツーエンドマルチモーダル：画像 + テキスト + 動画 |

### マトリクスの読み方

いくつかの点は表にうまく収まりません。

**疎ベクトル**は、ベクトルインデックス内でBM25品質のキーワードマッチングを実現する方法であり、別途のフルテキストエンジンは必要ありません。QdrantとElasticsearchは特に成熟した実装を持っています。WeaviateはBM25F経由でサポートしています。ハイブリッド検索が重要な場合で、2つのシステムを動かせない場合は、疎ベクトルのサポートを探してください。

**ディスクベースのインデックス**はコストのレバーであり、実装の詳細ではありません。RAMに駐留するHNSWインデックスは高速ですが、ベクトル数、次元数、メタデータ、グラフオーバーヘッドが増えるにつれて費用が高くなります。Milvus DiskANN、Elasticsearch DiskBBQ、Turbopufferオブジェクトストレージ、LanceDBのLance形式などの代替案は、クエリのレイテンシを犠牲にしてインフラコストを下げます。大規模なRAGインデックスでは、このトレードオフをテストする価値があります。

**Turbopufferのマルチテナント**は非常に高いネームスペース数を基盤としています。その公開されたポジショニングと顧客ストーリーは、Notionのような大規模でネームスペースが多いたぐいのワークロードを強調しています。各ユーザーまたは組織が隔離されたベクトル検索を必要とする場合、このアーキテクチャは経済性に変化をもたらすかもしれませんが、それでも自社のテナント形状をベンチマークしてください。

**LanceDBの埋め込みモード**は「ベクトル検索のSQLite」に最も近いものです。インプロセスで動作し、サーバーを必要とせず、Lambda、Cloudflare Workers、エッジ環境で動作します。Lanceのカラム形式により、埋め込み操作を実際のスケールで実現可能です。

**Oramaは検索UXインフラであり、データウェアハウスではありません。** JavaScriptアプリケーション内、エッジ環境、またはマネージドサイト/アプリ検索レイヤーに小型の全文検索/ベクトル検索/ハイブリッド検索エンジンが必要な場合に優れています。10億ベクトルの取得、重い分析、複雑なフィルタリング結合には私はこのツールを選ばないでしょう。

**Vespaは「取得が製品の半分に過ぎない」場合に選ぶべきものです。** これはレキシカル取得、最近隣探索、テンソル、ランキング式、グルーピング、オンラインサーブを組み合わせます。その強力さは実在しますが、運用とモデリングの複雑さも同様です。これは「CRUDアプリにセマンティック検索を追加する」チームよりも、検索/レコメンデーションチーム向けです。

**ClickHouseは分析と検索が結びついた場合に議論に値します。** あなたの信頼ソースがイベント、ログ、トレース、メトリクス、または大規模なファクトテーブルである場合、ClickHouseはベクトル距離、フィルタリング、集約、そして今や本格的な全文索引を単一のSQLエンジンで処理できます。これは目的別に設計されたベクトルデータベースではありませんが、分析的取得においては最も単純な答えとして最適かもしれません。

**Chromaは開発/テストと小規模アプリのデプロイに最も強力です。** 非常に大規模なコレクション、HA、ディスク中心の運用、またはハイブリッド検索の第一級サポートが必要な場合、プロトタイプをインフラに昇格させる前に生産向けストアを評価してください。

### 簡略化された決定

PostgreSQLのpgvectorで本当に限界を超えている場合（通常はベンチマークでベクトル数、フィルタリング、書き込みレート、または高並列性の遅延がPostgresの限界を超えている場合）は、制約に基づいて選択してください：

- **テナントごとの隔離を備えたSaaS製品** → Turbopuffer
- **Rustレベルのパフォーマンス + 複雑なメタデータフィルタリングが必要** → Qdrant
- **Elastic/ELKスタックを使用中** → DiskBBQ付きElasticsearch
- **AWS環境でオープンソースを望む** → OpenSearch
- **ランキング要件が厳密な検索/レコメンデーションプラットフォーム** → Vespa
- **分析、オブザーバビリティ、ログ/イベント検索** → ClickHouse
- **オンプレミス/セルフホストで10億規模** → Milvus
- **エッジ/サーバーレス/マルチモーダル** → LanceDB
- **小規模JSアプリ、ドキュメントサイト、またはエッジネイティブ検索UX** → Orama
- **運用コストを最小限に抑え、コストは二の次** → Pinecone
- **マルチモーダルファースト（画像、動画、音声）** → Marqo
- **MongoDBを使用中** → Atlas Vector Search
- **PostgreSQLを使用中でさらに性能向上が必要** → Supabase VectorまたはNeon（どちらもpgvectorをマネージドで提供し、ツールが充実）

---

## 行ってはいけないこと一件

正解があるものに対してベクトル検索をファジーなテキスト検索として使用しないでください。

`dan@example.com`というメールアドレスを持つユーザーを検索することはベクトル検索の問題ではありません。`ORD-12345`というIDを持つ注文を検索することも同様です。`ORD-12345`を埋め込み化して注文テーブルに対してコサイン類似度を計算しても、結果は*何か*は返ってきますが、それは正確ではありません。これらは完全一致の問題です。主キーまたは通常のインデックスを使用してください。

ベクトル検索は、データセット内の*最も類似している*ものだけを返します。関連性のないデータが存在しても、それが判別できません。関連ドキュメント検索には問題ありませんが、特定のレコード検索においては、誤った近似が空の結果よりもはるかに悪影響を及ぼします。

各ツールが適した用途を理解してください。これらはすでにPostgreSQLのインストールに含まれているものばかりです。それぞれが適した場面で活用しましょう。
````
