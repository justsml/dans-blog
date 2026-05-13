# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/ja/index.mdx
- Validation: deferred
- Runtime seconds: 67.39
- Input tokens: 8808
- Output tokens: 9071
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002882
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'クイズ: あなたのSQLスキルを証明してみよう！'
subTitle: ''
label: SQL 101
social_image: ../desktop-social.webp
category: Quiz
subCategory: Database
date: '2024-11-08'
modified: '2024-11-08'
tags:
  - quiz
  - intro
  - sql
  - core
  - fundamentals
  - beginner
  - intermediate
cover_full_width: ../peter-thomas-os14nsuXdI4-unsplash-wide.webp
cover_mobile: ../peter-thomas-os14nsuXdI4-unsplash-square.webp
cover_icon: ../peter-thomas-os14nsuXdI4-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## SQLクエリの基礎をテスト

ORMを使うことでスキルがおざなりになっていませんか？  
心配しないでください、多くの開発者が同じ経験をしています。  

さっそく始めてみましょう！👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="SQLの基礎"
  title="基本的なWHERE句"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下のSQLクエリのうち、名前が"John"である行を正しく取得するのはどれですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    SQLでは、`WHERE`句の等価比較に単一の等号(`=`)を使用します。`==`や`===`はJavaScriptの演算子であり、SQLでは使用しません。

    正しい構文は`SELECT * FROM users WHERE name = 'John';`です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="SQLの基礎"
  title="集計関数COUNT"
  options={[
    {text: 'NULL値を含むすべての行をカウントします'},
    {text: '列内のNULLでない値のみをカウントします', isAnswer: true},
    {text: 'NULL値を1つのユニーク値としてカウントします'},
    {text: '各NULL値をユニークと見なし、NaN !== NaNのように扱います'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLで`COUNT(column_name)`はどのような動作を行いますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)`は指定された列内のNULLでない値の数をカウントします。NULLを含むすべての行をカウントするには`COUNT(*)`を使用してください。

    `COALESCE`を用いてNULLを非NULL値にデフォルト設定することも可能です。たとえば：`COUNT(COALESCE(column_name, 0))`のように。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="SQL結合"
  title="LEFT JOINの基礎"
  options={[
    {text: '一致する行ごとに1行を返し、一致しない行は無視する'},
    {text: '左のテーブルのすべての行を返し、一致する右の行を追加する', isAnswer: true},
    {text: '一致したまたは一致しないすべての行を返し、NULLは一致なしを示す'},
    {text: '右のテーブルのすべての行を返し、一致する左の行を含める'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLで`LEFT JOIN`はどのような動作をするか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `LEFT JOIN`は左のテーブルのすべての行と、右のテーブルで一致した行を返し、右のテーブルで一致しない行はNULLになる。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="SQL結合"
  title="INNER JOINの使用"
  options={[
    {text: '両方のテーブルから一致しない行を返す'},
    {text: '両方のテーブルからすべての行を返し、一致しない行にはNULLを設定する'},
    {text: '結合条件を両方のテーブルで満たす行を返す', isAnswer: true},
    {text: '右側のテーブルから一致しない行を返す'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLで`INNER JOIN`はどのような動作を行いますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `INNER JOIN`は、結合条件が両方のテーブルの行と一致する行を返します。一致しない行は結果セットに含まれません。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="SQL サブクエリ"
  title="相関サブクエリ"
  options={[
    {text: '全体で一度だけ実行されるサブクエリ'},
    {text: 'JOIN 文でのみ使用されるサブクエリ'},
    {text: '複数の列のみを返すサブクエリ'},
    {text: '外部クエリの各行に対して一度実行されるサブクエリ', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLにおける相関サブクエリとは何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    相関サブクエリは、外部クエリの各行に対して1回ずつ評価されます。外部クエリの列を参照するため、各行に依存しています。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="SQL CTE"
  title="WITH句の構文"
  options={[
    {text: 'DELETE文でのみ使用可能'},
    {text: '集計関数に使用'},
    {text: 'ビュー定義専用'},
    {text: '大規模SQL文で使用する一時結果セットの定義', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLにおける`WITH`句（共通テーブル式）の目的は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `WITH`句（共通テーブル式）は、メインクエリ内で参照可能な一時結果セットを定義するために使われます。PostgreSQLでは`WITH`は`SELECT`、`INSERT`、`UPDATE`、`DELETE`、`MERGE`などの文に接続可能です。

    これにより複雑なクエリの可読性とメンテナビリティを向上させることができます。

    構文は次の通りです：
    ```sql
        WITH cte_name AS (
        SELECT column_name
        FROM table_name
        )
        SELECT *
        FROM cte_name;
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="SQLの基礎"
  title="IS NULL と IS NOT NULL の違い"
  options={[
    {text: '値がNULLかどうかを確認します', isAnswer: true},
    {text: '値が空かどうかを確認します'},
    {text: '値が文字列かどうかを確認します'},
    {text: '値が数値かどうかを確認します'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLで`IS NULL`演算子は何を行いますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IS NULL`は指定された列にNULL値が含まれているかどうかを確認します。`IS NOT NULL`は逆の確認を行います。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="SQL演算子"
  title="IN演算子の使用"
  options={[
    {text: '一意の行を返す'},
    {text: 'インデックス付きの列を必要とする'},
    {text: '数値列でのみ適用される'},
    {text: '指定されたリスト内の値に一致する行を返す', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLで`IN`演算子は何をするのか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IN`演算子は、指定されたリスト内の値に一致する行をフィルタリングするためのもので、複数の`OR`条件の代替としてよく使われます。

    「一意の行を返す」可能性はありますが（実際に返すことも多いです）、必ずしも主な目的ではありません。

    インデックスは必須ではありませんが、`IN`をインデックス付きの列（特に`UNIQUE`インデックス）に使用するとパフォーマンスが向上するため、ベストプラクティスです。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="SQL関数"
  title="COALESCE関数の使用"
  options={[
    {text: 'NULL値をカウントする'},
    {text: '最後のNULLでない引数を返す'},
    {text: '最初のNULLでない引数を返す', isAnswer: true},
    {text: 'IDENTITY列に限定される'},
    {text: 'プリンターコアレーションから来た'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLにおける`COALESCE`関数は何をするか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    COALESCE関数は指定されたリストで最初のNULLでない値を返し、NULLが見つかったときにデフォルト値を代入するのに便利です。

    たとえば、`COALESCE(column_name, 0)`は、`column_name`が`NULL`の場合に`0`を返します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="SQL集計関数"
  title="GROUP BYの用途"
  options={[
    {text: '重複を非表示にする'},
    {text: '結合時のみ使用される'},
    {text: '行を昇順に並べ替える'},
    {text: '指定された列で行をグループ化する', isAnswer: true},
    {text: 'GROUP WITH/USINGの構文が正しい'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLでGROUP BY句の目的は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    GROUP BY句は、指定された列に同じ値を持つ行をグループ化し、各グループに対して集計関数を適用できるようにします。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="SQL結合"
  title="FULL OUTER JOINの基本"
  options={[
    {text: '一致した行のみを返す'},
    {text: 'NULLでない値の行のみを返す'},
    {text: '左のテーブルから一致しない行のみを返す'},
    {text: '右のテーブルから一致しない行のみを返す'},
    {text: '両方のテーブルからすべての行を返し、一致しない行にはNULLを埋める', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLで`FULL OUTER JOIN`はどのような動作を行いますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    SQLで`FULL OUTER JOIN`は、両方のテーブルからすべての行を返し、不足している値にはNULLを埋めます。

    これは2つのテーブルを比較し、その違いを見つけるために役立ちます。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
