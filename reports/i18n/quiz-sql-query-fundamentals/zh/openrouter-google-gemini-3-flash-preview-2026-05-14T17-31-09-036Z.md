# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/zh/index.mdx
- Validation: deferred
- Runtime seconds: 85.16
- Input tokens: 10073
- Output tokens: 5068
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.020241
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：证明你的 SQL 实力！
subTitle: 你是 SQL 派，还是 NoSQL 派？
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## SQL 查询基础挑战

天天用 ORM，是不是让你的 SQL 基本功退步了？
别担心，这是很多开发者的通病。

直接上手，测测你的 SQL 查询基本功！👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="SQL 基础"
  title="基础 WHERE 子句"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \'John\';', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    下列哪个 SQL 查询能正确检索出 name 为 "John" 的行？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在 SQL 中，`WHERE` 子句使用单个等号 (`=`) 进行等值检查，而不是 JavaScript 中使用的 `==` 或 `===` 运算符。

    正确的语法是 `SELECT * FROM users WHERE name = 'John';`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="SQL 基础"
  title="聚合函数 COUNT"
  options={[
    {text: '计算所有行，包括 NULL 值'},
    {text: '仅计算列中的非 NULL 值', isAnswer: true},
    {text: '将 NULL 值视为一个唯一的数值进行计算'},
    {text: '将每个 NULL 值视为唯一的，类似于 NaN !== NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 SQL 中，`COUNT(column_name)` 的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` 计算指定列中非 NULL 值的数量。如果要计算包括 NULL 在内的所有行，请使用 `COUNT(*)`。

    你也可以使用 `COALESCE` 来确保 NULL 值默认为一个非 NULL 值。例如：`COUNT(COALESCE(column_name, 0))`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="SQL 连接 (Joins)"
  title="LEFT JOIN 基础"
  options={[
    {text: '为每个匹配的行返回一行，忽略不匹配的行'},
    {text: '返回左表中的所有行，以及右表中匹配的行', isAnswer: true},
    {text: '返回所有匹配或不匹配的行，其中 NULL 表示没有匹配项'},
    {text: '返回右表中的所有行，以及左表中匹配的行'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中的 `LEFT JOIN` 到底是干什么的？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `LEFT JOIN` 会返回左表中的所有行以及右表中匹配的行。如果右表中没有匹配项，则结果中右表的列将显示为 NULL。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="SQL 连接 (Joins)"
  title="使用 INNER JOIN"
  options={[
    {text: '返回两张表中不匹配的行'},
    {text: '返回两张表中的所有行，不匹配的行用 NULL 填充'},
    {text: '返回在两张表中都满足连接条件的行', isAnswer: true},
    {text: '返回右表中不匹配的行'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中的 `INNER JOIN` 到底是干什么用的？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `INNER JOIN` 会返回连接条件在两张表中都能找到匹配项的行。任何不匹配的行都会被无情地排除在结果集之外。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="SQL 子查询"
  title="相关子查询"
  options={[
    {text: '在整个查询中只运行一次的子查询'},
    {text: '仅在 JOIN 语句中使用的子查询'},
    {text: '仅返回多列的子查询'},
    {text: '为外部查询的每一行都运行一次的子查询', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    在 SQL 中，什么是相关子查询（correlated subquery）？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    相关子查询会针对外部查询的每一行进行求值。它引用了外部查询中的列，因此它的执行依赖于每一行的数据。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="SQL CTEs"
  title="WITH 子句语法"
  options={[
    {text: '仅允许在 DELETE 语句中使用'},
    {text: '用于聚合函数'},
    {text: '仅用于定义视图'},
    {text: '定义一个临时结果集，供更大的 SQL 语句使用', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中 `WITH` 子句（公用表表达式，CTE）的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `WITH` 子句，即公用表表达式（CTE），用于定义一个可以在主查询中引用的临时结果集。在 PostgreSQL 中，`WITH` 可以附加到 `SELECT`、`INSERT`、`UPDATE`、`DELETE` 或 `MERGE` 等语句中。

    这有助于提高复杂查询的可读性和可维护性。

    其语法如下：
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
  group="SQL 基础"
  title="IS NULL 与 IS NOT NULL"
  options={[
    {text: '检查值是否为 NULL', isAnswer: true},
    {text: '检查值是否为空'},
    {text: '检查值是否为字符串'},
    {text: '检查值是否为数字'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中的 `IS NULL` 运算符是干什么用的？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` 用于检查指定列是否包含 NULL 值。而 `IS NOT NULL` 的作用正好相反。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="SQL 运算符"
  title="使用 IN 运算符"
  options={[
    {text: '返回唯一的行'},
    {text: '要求列必须有索引'},
    {text: '仅适用于数值列'},
    {text: '返回与指定列表中的值匹配的行', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中的 `IN` 运算符有什么作用？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `IN` 运算符用于过滤行，使其匹配指定列表中的任何值，通常作为多个 OR 条件的替代方案。

    虽然它*可能*返回“唯一的行”（而且通常确实如此），但这并不是它的主要目的。

    这里并不强制要求索引，尽管在带有索引（最好是 `UNIQUE` 索引）的列上使用 `IN` 绝对是最佳实践，因为这可以提高性能。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="SQL 函数"
  title="使用 COALESCE 函数"
  options={[
    {text: '统计 NULL 值的数量'},
    {text: '返回最后一个非 NULL 参数'},
    {text: '返回第一个非 NULL 参数', isAnswer: true},
    {text: '仅限于 IDENTITY 列'},
    {text: '起源于打印机联盟 (Printer Coalation)'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 SQL 中，`COALESCE` 函数的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `COALESCE` 函数返回参数列表中第一个非 NULL 的值。当遇到 NULL 值时，它对于替换默认值非常有用。

    例如，如果 `column_name` 为 `NULL`，则 `COALESCE(column_name, 0)` 将返回 `0`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="SQL 聚合函数"
  title="GROUP BY 的用法"
  options={[
    {text: '隐藏重复项'},
    {text: '仅用于连接查询'},
    {text: '按升序对行进行排序'},
    {text: '按指定的列对行进行分组', isAnswer: true},
    {text: '语法应该是 GROUP WITH/USING'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中 `GROUP BY` 子句的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `GROUP BY` 子句将指定列中具有相同值的行归为一组，从而允许对每个组执行聚合函数。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="SQL 连接 (Joins)"
  title="FULL OUTER JOIN 基础"
  options={[
    {text: '仅返回匹配的行'},
    {text: '仅返回具有非空 (non-NULL) 值的行'},
    {text: '仅返回左表中未匹配的行'},
    {text: '仅返回右表中未匹配的行'},
    {text: '返回两张表中的所有行，未匹配的行用 NULL 填充', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    在 SQL 中，`FULL OUTER JOIN` 的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `FULL OUTER JOIN` 会返回参与连接的两张表中的所有行。对于无法匹配的行，缺失的值将以 NULL 填充。

    这在比较两张表并查找它们之间的差异时非常有用。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
