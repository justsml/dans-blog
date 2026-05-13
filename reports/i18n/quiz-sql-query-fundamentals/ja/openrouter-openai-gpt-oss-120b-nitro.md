# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/ja/index.mdx
- Validation: deferred
- Runtime seconds: 17.09
- Input tokens: 9891
- Output tokens: 6940
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.001635
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'クイズ: SQLスキルを証明しよう！'
subTitle: SQL派ですか？それともNoSQL派ですか？
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


## SQLクエリ基礎をテストしよう

ORMを使いすぎてスキルが鈍っていませんか？  
心配はいりません。多くの開発者が同じ状況です。

さっそくSQLクエリ基礎を証明してみましょう！ 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="SQL 基礎"
  title="基本的な WHERE 句"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    次の SQL クエリのうち、名前が "John" の行を正しく取得するものはどれですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    SQL では、等価比較にはシングルイコール (`=`) を `WHERE` 句で使用し、`==` や `===` は JavaScript の演算子であり使用しません。

    正しい構文は `SELECT * FROM users WHERE name = 'John';` です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="SQL 基礎"
  title="集計関数 COUNT"
  options={[
    {text: 'NULL 値を含むすべての行をカウントする'},
    {text: '列の非 NULL 値のみをカウントする', isAnswer: true},
    {text: 'NULL 値を 1 つのユニークな値としてカウントする'},
    {text: '各 NULL 値をユニークとみなし、NaN !== NaN と同様に扱う'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL で `COUNT(column_name)` は何を行いますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` は指定された列の非 NULL 値の数をカウントします。NULL を含むすべての行をカウントしたい場合は `COUNT(*)` を使用します。

    また、`COALESCE` を使って NULL を非 NULL 値にデフォルトさせることもできます。例えば: `COUNT(COALESCE(column_name, 0))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="SQL 結合"
  title="LEFT JOIN の基本"
  options={[
    {text: '一致する行ごとに1行を返し、マッチしない行は無視します'},
    {text: '左テーブルのすべての行と、マッチする右テーブルの行を返します', isAnswer: true},
    {text: 'マッチした行もマッチしなかった行もすべて返し、NULL は一致なしを示します'},
    {text: '右テーブルのすべての行と、マッチする左テーブルの行を返します'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLで `LEFT JOIN` は何を行いますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `LEFT JOIN` は左テーブルのすべての行と、右テーブルのマッチする行を返し、右テーブルでマッチしない行には NULL が入ります。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="SQL 結合"
  title="INNER JOIN の使用"
  options={[
    {text: '両方のテーブルで一致しない行を返す'},
    {text: '両方のテーブルのすべての行を返し、一致しない行には NULL を入れる'},
    {text: '結合条件を満たす両テーブルの行を返す', isAnswer: true},
    {text: '右側テーブルで一致しない行を返す'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL で `INNER JOIN` は何を行いますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `INNER JOIN` は結合条件が両テーブルの行と一致する行だけを返します。条件に合わない行は結果セットに含まれません。
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
    {text: '複数列のみを返すサブクエリ'},
    {text: '外部クエリの各行に対して一度実行されるサブクエリ', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL における相関サブクエリとは何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    相関サブクエリは外部クエリの各行ごとに一度評価されます。外部クエリの列を参照するため、各行に依存します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="SQL CTE（共通テーブル式）"
  title="WITH句の構文"
  options={[
    {text: 'DELETE文でのみ使用可能'},
    {text: '集計関数で使用される'},
    {text: 'ビュー定義専用'},
    {text: '大きなSQL文で使用する一時的な結果セットを定義する', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    `WITH`句（共通テーブル式）の目的は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `WITH`句、または共通テーブル式（CTE）は、メインクエリ内で参照できる一時的な結果セットを定義するために使用されます。PostgreSQLでは、`WITH`は`SELECT`、`INSERT`、`UPDATE`、`DELETE`、`MERGE`などの文に付けることができます。

    これにより、複雑なクエリの可読性と保守性が向上します。

    構文は次のとおりです:
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
  group="SQL 基礎"
  title="IS NULL と IS NOT NULL"
  options={[
    {text: '値が NULL かどうかをチェックする', isAnswer: true},
    {text: '値が空かどうかをチェックする'},
    {text: '値が文字列かどうかをチェックする'},
    {text: '値が数値かどうかをチェックする'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL で `IS NULL` 演算子は何をしますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` は指定した列に NULL 値が含まれているかをチェックします。`IS NOT NULL` はその逆をチェックします。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="SQL 演算子"
  title="IN 演算子の使用"
  options={[
    {text: 'ユニークな行を返す'},
    {text: 'インデックス付き列が必要'},
    {text: '数値列にのみ適用される'},
    {text: '指定リストの値に一致する行を返す', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQLで `IN` 演算子は何をしますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IN` 演算子は、指定されたリスト内のいずれかの値に一致する行をフィルタリングします。複数の OR 条件の代替としてよく使われます。

    *かもしれません* "ユニークな行" を返すこともあります（実際にそうなることが多いですが）、それが主目的というわけではありません。

    インデックスは必須ではありませんが、インデックス付き列（できれば `UNIQUE` インデックス）で `IN` を使うのがベストプラクティスです。パフォーマンス向上につながります。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="SQL 関数"
  title="COALESCE 関数の使用"
  options={[
    {text: 'NULL 値をカウントする'},
    {text: '最後の非 NULL 引数を返す'},
    {text: '最初の非 NULL 引数を返す', isAnswer: true},
    {text: 'IDENTITY 列に限定される'},
    {text: '元は Printer Coalation から'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL で `COALESCE` 関数は何をしますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `COALESCE` 関数は指定されたリストの最初の非 NULL 値を返します。NULL に遭遇したときにデフォルト値を代入するのに便利です。

    例として、 `COALESCE(column_name, 0)` は `column_name` が `NULL` の場合 `0` を返します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="SQL 集計関数"
  title="GROUP BY の使い方"
  options={[
    {text: '重複を隠す'},
    {text: '結合でのみ使用される'},
    {text: '行を昇順にソートする'},
    {text: '指定した列で行をグループ化する', isAnswer: true},
    {text: '構文は GROUP WITH/USING であるべき'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL の `GROUP BY` 句の目的は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `GROUP BY` 句は、指定した列で同じ値を持つ行をグループ化し、各グループに集計関数を適用できるようにします。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="SQL 結合"
  title="FULL OUTER JOIN の基礎"
  options={[
    {text: '一致した行のみを返す'},
    {text: 'NULL でない値を持つ行のみを返す'},
    {text: '左テーブルの一致しない行のみを返す'},
    {text: '右テーブルの一致しない行のみを返す'},
    {text: '両テーブルのすべての行を返し、一致しない行には NULL を入れる', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL で `FULL OUTER JOIN` は何を行いますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `FULL OUTER JOIN` は両テーブルのすべての行を返し、一致しない行には欠損値として NULL を入れます。

    これは 2 つのテーブルを比較し、差分を見つけるのに便利です。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
