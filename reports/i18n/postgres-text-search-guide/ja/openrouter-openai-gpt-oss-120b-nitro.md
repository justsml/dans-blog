# Translation Candidate
- Slug: postgres-text-search-guide
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-02--postgres-text-search-guide/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 6.49
- Input tokens: 17012
- Output tokens: 8431
- Thinking tokens: unknown
- Cached input tokens: 5376
- Cache write tokens: 0
- Estimated cost: $0.002181
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2026-05-02--postgres-text-search-guide/ja/index.mdx reports/i18n/postgres-text-search-guide/ja
## Raw Output

````mdx
---
title: Postgres テキスト検索ガイド 2026
subTitle: データベース内の検索ツールと、それぞれが活躍するタイミング。
date: '2026-05-02'
modified: '2026-05-03'
tags:
  - postgres
  - postgresql
  - full-text-search
  - trigrams
  - pg_trgm
  - databases
  - search
  - sql
  - pg_search
category: Code
subCategory: Databases
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
ほとんどのチームは Postgres の検索ツールを 1 つだけ使います。3 つすべてを把握しているチームは、複雑さを抑えつつ優れた検索機能を提供でき、まだ必要のない専用検索サービスへの高コストな迂回を回避できます。

本ガイドでは Postgres がネイティブで提供する全検索オプションを網羅します。各オプションの機能、適切な利用シーン、そして組み合わせ方を解説します。

---

## 3 つのツール

**全文検索**（`tsvector` / `GIN` インデックス）は字句レベルの検索です。テキストを字句（lexeme）に分割し、語幹化してインデックスに格納し、クエリを照合します。たとえば “Running” と “runs” は同じ字句に統合されます。 “dog” と “dogs” も同様です。ランキング関数（`ts_rank`）は、クエリ語が頻繁に出現する、または目立つ位置にあるドキュメントに高得点を付けます。

**トリグラム**（`pg_trgm`）は文字列を 3 文字ずつ重なるスライスに分割し、2 つの文字列が共有するスライス数で類似度を測ります。 “Dan” → `" da"`, `"dan"`, `"an "`。 “Micheal” と “Michael” は多くのトリグラムを共有するため、類似度が高くなります。この特性により `pg_trgm` は曖昧な名前検索、タイプミス耐性、オートコンプリートに優れ、全文検索が苦手とする領域を補完します。

**完全一致インデックス**（B‑tree、hash）は主キー、メールアドレス、ID、SKU など、答えが二者択一になるケースを扱います。マッチすればヒット、しなければヒットしません。これらは「検索」らしく感じないかもしれませんが、正解が明確に存在する問題に対してあいまい検索やセマンティック検索を使うのが最悪のパターンです。

選択肢は洗練度の問題ではなく、クエリの形状にツールを合わせることです。

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" role="img" aria-labelledby="stm-title stm-desc">
  <title id="stm-title">Postgres search tool map</title>
  <desc id="stm-desc">A comparison of pg_trgm, full-text search, pgvector, and hybrid search by input shape and query intent.</desc>
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#111827" flood-opacity="0.14"/>
    </filter>
    <linearGradient id="header" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#25324a"/>
    </linearGradient>
    <style>{`
      .stm-bg { fill: #f7f3ea; }
      .stm-card { fill: #fffdf8; stroke: #d9cdb6; stroke-width: 2; filter: url(#shadow); }
      .stm-title-text { font: 800 34px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; }
      .stm-subtitle { font: 500 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #4b5563; }
      .stm-label { font: 800 14px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing: .08em; text-transform: uppercase; fill: #ffffff; }
      .stm-tool { font: 800 27px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; }
      .stm-body { font: 500 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #374151; }
      .stm-small { font: 600 15px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #4b5563; }
      .stm-axis { font: 800 15px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; letter-spacing: .06em; text-transform: uppercase; }
      .stm-chip { font: 800 14px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #ffffff; }
      .stm-line { stroke: #9ca3af; stroke-width: 2; stroke-dasharray: 8 8; }
    `}</style>
  </defs>

  <rect class="stm-bg" width="1120" height="720" rx="0"/>
  <text class="stm-title-text" x="64" y="70">Pick the search primitive by input shape</text>
  <text class="stm-subtitle" x="64" y="103">The same Postgres table can support all four. The trick is matching the query to the text.</text>

  <line class="stm-line" x1="560" y1="150" x2="560" y2="640"/>
  <line class="stm-line" x1="76" y1="395" x2="1044" y2="395"/>

  <text class="stm-axis" x="360" y="142">Exact words matter</text>
  <text class="stm-axis" x="650" y="142">Meaning matters</text>
  <text class="stm-axis" x="78" y="388" transform="rotate(-90 78 388)">Short / structured text</text>
  <text class="stm-axis" x="78" y="628" transform="rotate(-90 78 628)">Long prose / chunks</text>

  <rect class="stm-card" x="112" y="168" width="408" height="186" rx="20"/>
  <rect x="136" y="192" width="100" height="28" rx="14" fill="#f59e0b"/>
  <text class="stm-label" x="154" y="212">fuzzy</text>
  <text class="stm-tool" x="136" y="256">pg_trgm</text>
  <text class="stm-body" x="136" y="294">Names, addresses, titles, typos,</text>
  <text class="stm-body" x="136" y="320">autocomplete, partial strings.</text>
  <text class="stm-small" x="136" y="344">Orthographic similarity: spelling distance.</text>

  <rect class="stm-card" x="600" y="168" width="408" height="186" rx="20"/>
  <rect x="624" y="192" width="116" height="28" rx="14" fill="#22c55e"/>
  <text class="stm-label" x="644" y="212">similar</text>
  <text class="stm-tool" x="624" y="256">pgvector</text>
  <text class="stm-body" x="624" y="294">Related items, duplicate tickets,</text>
  <text class="stm-body" x="624" y="320">recommendations from short descriptions.</text>
  <text class="stm-small" x="624" y="344">Embedding similarity: meaning distance.</text>

  <rect class="stm-card" x="112" y="436" width="408" height="186" rx="20"/>
  <rect x="136" y="460" width="102" height="28" rx="14" fill="#38bdf8"/>
  <text class="stm-label" x="158" y="480">lexical</text>
  <text class="stm-tool" x="136" y="524">Full-text search</text>
  <text class="stm-body" x="136" y="562">Articles, docs, logs, support content</text>
  <text class="stm-body" x="136" y="588">where query words should appear.</text>
  <text class="stm-small" x="136" y="612">Lexemes, stemming, ranking, boolean filters.</text>

  <rect class="stm-card" x="600" y="436" width="408" height="186" rx="20"/>
  <rect x="624" y="460" width="102" height="28" rx="14" fill="#f472b6"/>
  <text class="stm-label" x="645" y="480">hybrid</text>
  <text class="stm-tool" x="624" y="524">FTS + pgvector</text>
  <text class="stm-body" x="624" y="562">Technical docs and RAG where users ask</text>
  <text class="stm-body" x="624" y="588">conceptual questions plus exact symbols.</text>
  <text class="stm-small" x="624" y="612">Run both, fuse ranks with RRF.</text>

  <rect x="396" y="658" width="328" height="36" rx="18" fill="url(#header)"/>
  <text class="stm-chip" x="429" y="681">Start with query intent, then check text shape</text>
</svg>
<figcaption>クエリ意図（正確 vs. セマンティック）とテキスト形状（構造化 vs. 散文）でマッピングした 4 つの Postgres 検索プリミティブ。同一テーブルに 4 種類すべてのインデックスを保持できるが、選択はテーブル単位ではなくクエリ単位になる。</figcaption>
</figure>

---

## 全文検索が有効になるケース

**散文中のキーワード検索。** ブログ記事、ドキュメント、製品説明、サポートチケット、法的文書。FTS はこの種のコンテンツ向けに設計されており、自然言語テキストに対するインデックス化とランキング取得を提供します。

**キーワードベースのユーザークエリ。** ユーザーは検索語句を入力し、タグで絞り込み、またはキーワードで閲覧します。FTS は埋め込みインフラを構築せずにこの意図をネイティブに処理します。

**外部依存なしでのランク付け結果。** FTS インデックスは高速で決定論的であり、API 呼び出しは不要です。関連性シグナルはフィールド位置で重み付けされた単語頻度から算出されます。

**検索と併用したブールフィルタリング。** FTS は既存のクエリロジックと自然に組み合わせられます:

```sql
SELECT * FROM posts
WHERE search_vector @@ to_tsquery('english', 'postgres & performance')
  AND category = 'tutorial'
  AND published_at > NOW() - INTERVAL '6 months';
```

### FTS のセットアップ

```sql
-- 生成列がインデックスを自動的に最新に保ちます
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body,  '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- クエリ
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

`setweight` は重要度を割り当てます: `A`（タイトル）が `B`（本文）より上位になります。これがほとんどのコンテンツ検索ユースケースにおける全体的な関連性モデルです。

### FTS が苦手とするケース

- クエリのタイプミス — 「javascipt」は「javascript」にマッチしない  
- 人名、住所、固有名詞でステミングが予測できないもの  
- 特別な設定なしでのプレフィックス/オートコンプリート  
- ユーザーが概念を説明しているが、名前で指定していないクエリ  

## Trigram が有利になるケース (`pg_trgm`)

`pg_trgm` は、FTS が一貫して苦手とする中間領域をカバーします。

FTS はテキストをレキシームに分割しステミングします。散文に対しては正しい動作ですが、名前や短い識別子に対してはしばしば不適切です。

- 人名（例: 「Dan Levy」→ 辞書や言語設定によりステミング結果が変わる）  
- 企業名、住所、製品名など、正確なスペルが重要なケース  
- タイプミスを含むクエリ — 「Micheal Jordan」「Amaon」「javascipt」  
- オートコンプリート／プレフィックス検索  
- 部分文字列マッチング（例: 「son」が「Johnson」や「Anderson」にマッチ）

`pg_trgm` は言語に依存しないため、さまざまな言語背景を持つ名前の検索で有利です。FTS は言語ごとに辞書設定が必要です。

### 曖昧な名前検索

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- 「Michael Jordan」で検索したときに「Micheal Jordan」を見つける
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % 演算子 = 類似度閾値（デフォルト 0.3）
ORDER BY score DESC
LIMIT 10;
```

`%` 演算子は `pg_trgm.similarity_threshold`（デフォルト 0.3、範囲 0–1）を使用します。名前検索では 0.3〜0.4 の閾値がタイプミスを捕捉しつつノイズを抑えます。

### オートコンプリート、プレフィックス、部分文字列検索

```sql
-- オートコンプリート用のプレフィックスマッチ。トリグラム GIN インデックスは有効ですが、
-- 純粋な左側アンカープレフィックスの場合は B-tree パターンインデックスの方が適しています。
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- 長い文字列中の部分一致に word_similarity を使用
-- （例: "Andrew Johnson III" 中の "Johnson"）
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name
ORDER BY score DESC
LIMIT 10;
```

トリグラム GIN インデックスは `ILIKE '%pattern%'` のような部分文字列検索やタイプミス耐性のマッチングで特に有効です。これらはトリグラムインデックスがない場合、通常は全表走査になります。

### FTS より pg_trgm を選択すべきタイミング


| シナリオ | 使用 |
|---|---|
| 人名・社名検索（タイプミスあり） | `pg_trgm` |
| オートコンプリート／プレフィックス検索 | `pg_trgm`（またはプレフィックスクエリを使った FTS） |
| 短い文字列、識別子、コード | `pg_trgm` |
| 本文記事、ドキュメント、チケット | FTS |
| キーワード検索用ログメッセージ | FTS |
| 多言語の名前検索 | `pg_trgm`（言語非依存） |

---

## 完全一致 SQL が有利になるケース

いわゆる「検索」問題の中には、実は検索ではないものがあります。

`dan@example.com` というメールアドレスのユーザーを探す、`ORD-12345` という注文を取得する、`tutorial` カテゴリの投稿を日付順に一覧表示するといった操作は、すべて等価比較または主キー検索、あるいはフィルタクエリです。これらは B‑tree またはハッシュインデックスで処理すべきです。

ここで FTS やトリグラムを使うと、正確性は向上せずに複雑さだけが増えます。特に完全一致が求められる識別子に対しては、近似一致は「一致なし」よりも誤った結果を返すリスクが高くなります。

```sql
CREATE INDEX users_email_idx ON users (email);

-- 正確な検索: 高速かつ一意
SELECT id, name FROM users WHERE email = $1;
```

広い視点で見ると、正解が明確に存在する問題に対して近似検索を適用するのはカテゴリーミスです。何かしらの結果は返りますが、**自信を持って誤った結果**になる可能性があります。

---

## これらのツールを組み合わせる

これらのツールは相互にうまく組み合わせられます。どれか一つだけを選ぶ必要はありません。

**FTS + pg_trgm を使って、キーワードのタイプミスを許容する検索ボックスを実装する例:**

```sql
-- タイトルのトリグラム類似度でタイプミスを捕捉し、ts_rank が本文の関連度を評価
SELECT id, title,
  ts_rank(search_vector, to_tsquery('simple', $1)) AS fts_rank,
  similarity(title, $1) AS trgm_score
FROM posts
WHERE search_vector @@ to_tsquery('simple', $1)
   OR title % $1
ORDER BY (ts_rank(search_vector, to_tsquery('simple', $1)) + similarity(title, $1)) DESC
LIMIT 10;
```

**FTS + `unaccent` を使って国際化コンテンツに対応する例:**

```sql
-- Strip diacritical marks so "José" matches "Jose"
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TEXT SEARCH CONFIGURATION public.simple_unaccent (COPY = pg_catalog.simple);

ALTER TEXT SEARCH CONFIGURATION public.simple_unaccent
  ALTER MAPPING FOR hword, hword_part, word
  WITH unaccent, simple;

ALTER TABLE posts ADD COLUMN search_vector tsvector;

CREATE TRIGGER posts_search_vector_refresh
BEFORE INSERT OR UPDATE OF title, body ON posts
FOR EACH ROW EXECUTE FUNCTION
  tsvector_update_trigger(search_vector, 'public.simple_unaccent', title, body);
```

**`unaccent` + `pg_trgm` を使った国際的な名前検索:**

```sql
ALTER TABLE users ADD COLUMN name_search text;

CREATE FUNCTION users_name_search_refresh()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.name_search := unaccent(coalesce(NEW.name, ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER users_name_search_refresh
BEFORE INSERT OR UPDATE OF name ON users
FOR EACH ROW EXECUTE FUNCTION users_name_search_refresh();

CREATE INDEX users_name_search_trgm_idx
  ON users USING GIN (name_search gin_trgm_ops);

SELECT id, name
FROM users
WHERE name_search % unaccent($1)
ORDER BY similarity(name_search, unaccent($1)) DESC
LIMIT 10;
```

トリガー例は、`unaccent()` を生成列やインデックス式の中で直接使用しないようにしています。PostgreSQL の不変性ルールが関係するためです。`unaccent()` を自前の不変関数でラップする場合は、アップグレードや設定変更に伴うリスクを受け入れる旨を明示してください。

---

## 注目すべき拡張機能

**`pg_trgm`** はほとんどの PostgreSQL ディストリビューションに同梱されていますが、明示的に有効化する必要があります。PostgreSQL におけるあいまい文字列マッチングの基礎です。

**`unaccent`** はインデックス作成やクエリ実行前に濁点・アクセントなどのダイアクリティカルマークを除去します。欧州言語コンテンツに対して `pg_trgm` および全文検索（FTS）と組み合わせて使用するのに適しています。PostgreSQL に同梱されています。

**`pg_bigm`** は trigram 手法を bigram（2 文字スライス）に拡張し、`pg_trgm` が性能を発揮しにくい CJK（中国語・日本語・韓国語）環境で結果を大幅に向上させます。別途インストールが必要で、標準パッケージには含まれません。

**`pg_search`**（[ParadeDB](https://www.paradedb.com/) 提供）は標準の `GIN` / `tsvector` スタックを Tantivy ベースの BM25 インデックスに置き換えます。これにより BM25 スコアリング（`ts_rank` より優れることが多い）、FTS クエリ内でのあいまいマッチ、ファセット検索、そして大規模テーブルでのインデックス作成が劇的に高速化されます。標準 FTS がランキングやパフォーマンスの限界に達したときのドロップインアップグレードパスです。

```sql
-- pg_search: BM25 full-text search with fuzzy matching
CREATE INDEX posts_bm25_idx ON posts
  USING bm25 (id, title, body)
  WITH (key_field = 'id', text_fields = '{"title": {}, "body": {}}');

-- Query with BM25 scoring + fuzzy matching (catches "javascipt")
SELECT id, title, paradedb.score(id) AS rank
FROM posts
WHERE posts @@@ paradedb.fuzzy_phrase(field => 'title', value => 'postgres performnce')
ORDER BY rank DESC
LIMIT 10;
```

**`pgvector`** は密なベクトルの保存と類似度検索を提供します。ユーザーが名前ではなく「何を求めているか」を記述するケース、すなわちセマンティック検索、RAG、関連コンテンツ推薦、多言語クエリに最適です。詳細は [Semantic Vector Search and Hybrid Strategies](/semantic-vector-search-landscape) を参照してください。

---

## Decision Table

| What you're searching | Recommended |
|---|---|
| Prose articles, docs, tickets | FTS |
| Person/company names with typos | `pg_trgm` |
| Autocomplete, prefix search | `pg_trgm` |
| Short codes, identifiers | `pg_trgm` |
| Log messages for keywords | FTS |
| International names | `pg_trgm` + `unaccent` |
| Large content, better ranking | `pg_search` (ParadeDB BM25) |
| Primary keys, exact emails, IDs | B-tree index |
| Dates, ranges, sorted lists | B-tree index |
| Permissions, categories, filters | Regular WHERE clause |
| Questions, paraphrases, concepts | pgvector (see next article) |

疑問があるときは: スペル変化がある短い文字列 → trigram。キーワード検索の長文 → FTS。構造化された識別子 → 通常インデックス。概念的または自然言語のクエリ → pgvector。

---

## ハイブリッド検索: 2 つのシグナル、1 つのランク

`"withRetry timeout errors"` のようなクエリが検索ボックスに入力されると、2 種類の意図が含まれます。ユーザーが知っている正確なシンボル名 (`withRetry`) と、概念的な説明 (`timeout errors`) です。どちらもカバーできる単一のプリミティブは存在しません。FTS とベクトル検索を並行して実行し、結果のランク付きリストを Reciprocal Rank Fusion (RRF) でマージすれば、両方を扱えます。

RRF は各リストで `1 / (60 + rank)` とスコア付けし、リスト間で合算します。定数 60 は上位ランクの優位性を緩和し、両方のリストで 2 位に入った結果が、片方で 1 位に入ってもう片方に全く現れない結果を上回ることを可能にします。重要なのは、RRF が生のスコアを平均しない点です。FTS のランクとコサイン距離は異なる通貨であり、算術的に直接結合できません。

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 660" role="img" aria-labelledby="rrf-title rrf-desc">
  <title id="rrf-title">Hybrid search with Reciprocal Rank Fusion</title>
  <desc id="rrf-desc">A query fans out to full-text search and vector search, each produces ranks, and Reciprocal Rank Fusion combines them into one result list.</desc>
  <defs>
    <marker id="rrf-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
      <path d="M2,2 L10,6 L2,10 Z" fill="#334155"/>
    </marker>
    <filter id="rrf-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="11" flood-color="#0f172a" flood-opacity="0.13"/>
    </filter>
    <style>{`
      .rrf-bg { fill: #f8fafc; }
      .rrf-title-text { font: 800 34px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #0f172a; }
      .rrf-subtitle { font: 500 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #475569; }
      .rrf-box { fill: #ffffff; stroke: #cbd5e1; stroke-width: 2; filter: url(#rrf-shadow); }
      .rrf-query { fill: #fff7ed; stroke: #fdba74; }
      .rrf-fts { fill: #eff6ff; stroke: #60a5fa; }
      .rrf-vector { fill: #f0fdf4; stroke: #86efac; }
      .rrf-merge { fill: #fdf2f8; stroke: #f9a8d4; }
      .rrf-result { fill: #ecfeff; stroke: #67e8f9; }
      .rrf-head { font: 800 24px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; }
      .rrf-body { font: 550 17px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #334155; }
      .rrf-mono { font: 800 17px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; fill: #0f172a; }
      .rrf-rank { font: 800 16px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #475569; }
      .rrf-arrow-line { stroke: #334155; stroke-width: 3; fill: none; marker-end: url(#rrf-arrow); }
      .rrf-thin { stroke: #94a3b8; stroke-width: 2; fill: none; marker-end: url(#rrf-arrow); }
    `}</style>
  </defs>

  <rect class="rrf-bg" width="1120" height="660"/>
  <text class="rrf-title-text" x="64" y="68">Hybrid search is two honest signals, then one merged rank</text>
  <text class="rrf-subtitle" x="64" y="102">Do not average raw scores. FTS rank and cosine distance are different currencies.</text>

  <rect class="rrf-box rrf-query" x="72" y="238" width="214" height="132" rx="20"/>
  <text class="rrf-head" x="104" y="288">User query</text>
  <text class="rrf-mono" x="104" y="324">"withRetry</text>
  <text class="rrf-mono" x="104" y="350">timeout errors"</text>

  <path class="rrf-arrow-line" d="M286 270 C350 270 350 188 418 188"/>
  <path class="rrf-arrow-line" d="M286 338 C350 338 350 440 418 440"/>

  <rect class="rrf-box rrf-fts" x="418" y="142" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="188">FTS / BM25</text>
  <text class="rrf-body" x="450" y="224">Exact symbols and words</text>
  <text class="rrf-rank" x="450" y="256">1. API reference</text>
  <text class="rrf-rank" x="578" y="256">2. Retry guide</text>

  <rect class="rrf-box rrf-vector" x="418" y="394" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="440">pgvector</text>
  <text class="rrf-body" x="450" y="476">Conceptual neighbors</text>
  <text class="rrf-rank" x="450" y="508">1. Network failures</text>
  <text class="rrf-rank" x="594" y="508">2. Retry guide</text>

  <path class="rrf-thin" d="M684 214 C734 214 734 294 778 294"/>
  <path class="rrf-thin" d="M684 466 C734 466 734 366 778 366"/>

  <rect class="rrf-box rrf-merge" x="778" y="260" width="258" height="166" rx="22"/>
  <text class="rrf-head" x="810" y="306">RRF merge</text>
  <text class="rrf-body" x="810" y="342">Give each result credit for</text>
  <text class="rrf-body" x="810" y="368">where it ranked in each list.</text>
  <text class="rrf-mono" x="810" y="402">1 / (60 + rank)</text>

  <path class="rrf-arrow-line" d="M907 426 L907 492"/>

  <rect class="rrf-box rrf-result" x="736" y="492" width="342" height="110" rx="20"/>
  <text class="rrf-head" x="768" y="538">Final results</text>
  <text class="rrf-body" x="768" y="574">The top hit is where exact terms</text>
  <text class="rrf-body" x="768" y="598">and semantic meaning agree.</text>
</svg>
<figcaption>A query fans out to FTS and pgvector in parallel. Each produces its own ranked list. RRF scores every document by its position in each list and sums the scores — the result surfaces documents that both signals agree on.</figcaption>
</figure>

```sql
-- Hybridsearch: FTS + pgvector merged with RRF
WITH fts AS (
  SELECT id, ts_rank(search_vector, query) AS score,
         ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM docs, to_tsquery('english', 'withRetry & timeout') query
  WHERE search_vector @@ query
  LIMIT 60
),
vec AS (
  SELECT id,
         ROW_NUMBER() OVER (ORDER BY embedding <=> $embedding) AS rank
  FROM docs
  ORDER BY embedding <=> $embedding
  LIMIT 60
)
SELECT COALESCE(fts.id, vec.id) AS id,
       (COALESCE(1.0 / (60 + fts.rank), 0) +
        COALESCE(1.0 / (60 + vec.rank), 0)) AS rrf_score
FROM fts FULL JOIN vec ON fts.id = vec.id
ORDER BY rrf_score DESC
LIMIT 10;
```

各ブランチで 60 件の候補プール（`LIMIT 60`）は 일반적인 시작점です。リコールが低い場合は拡大し、速度重視なら縮小してください。

---

## 次にすべきこと

Postgres の全文検索は多くのケースをカバーしますが、限界があります。ユーザーが欲しいものを具体的に名前で指定せずに説明する場合――「フライトで眠りを助けてくれるもの」や「新米エンジニアとしてデバッグへの自信に関する記事」――では、字句検索も trigram 検索も機能しません。

ここがベクトル埋め込み、セマンティック検索、ハイブリッドアーキテクチャの出番です。詳しくは [セマンティックベクトル検索とハイブリッド戦略](/semantic-vector-search-landscape) を参照してください。
````
