# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/zh/index.mdx
- Validation: deferred
- Runtime seconds: 27.85
- Input tokens: 10743
- Output tokens: 5361
- Thinking tokens: unknown
- Cached input tokens: 3456
- Cache write tokens: 0
- Estimated cost: $0.001867
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：证明你的 SQL 技能！
subTitle: 你是 SQL 队还是 NoSQL 队？
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


## 测试你的 SQL 查询基础

使用 ORM 让你的技能变软了吗？  
别担心，这在很多开发者身上都会发生。

直接上手，证明你的 SQL 查询基础！👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="SQL 基础"
  title="基本 WHERE 子句"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪个 SQL 查询能够正确检索 name 为 "John" 的行？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在 SQL 中，单个等号（`=`）用于 `WHERE` 子句中的相等比较，而不是 `==` 或 `===`，后者是 JavaScript 运算符。

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
    {text: '计数所有行，包括 NULL 值'},
    {text: '仅计数列中非 NULL 的值', isAnswer: true},
    {text: '将 NULL 值计为一个唯一值'},
    {text: '把每个 NULL 值视为唯一的，类似于 NaN !== NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    `COUNT(column_name)` 在 SQL 中的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` 统计指定列中非 NULL 值的数量。若想计数所有行（包括 NULL），请使用 `COUNT(*)`。

    您也可以使用 `COALESCE` 将 NULL 转换为非 NULL 值，例如：`COUNT(COALESCE(column_name, 0))`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="SQL 连接"
  title="LEFT JOIN 基础"
  options={[
    {text: '对每个匹配的行返回一行，忽略不匹配的行'},
    {text: '返回左表的所有行，以及匹配的右表行', isAnswer: true},
    {text: '返回所有匹配或不匹配的行，NULL 表示没有匹配'},
    {text: '返回右表的所有行，以及任何匹配的左表行'},
  ]}
>
  <slot name="question">
  <div className="question">
    `LEFT JOIN` 在 SQL 中有什么作用？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `LEFT JOIN` 返回左表的所有行以及右表中匹配的行，对右表中未匹配的行返回 NULL。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="SQL 连接"
  title="使用 INNER JOIN"
  options={[
    {text: '返回两个表中不匹配的行'},
    {text: '返回两个表的所有行，对不匹配的行使用 NULL'},
    {text: '返回满足连接条件的两表行', isAnswer: true},
    {text: '返回右表中不匹配的行'},
  ]}
>
  <slot name="question">
  <div className="question">
    `INNER JOIN` 在 SQL 中有什么作用？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `INNER JOIN` 返回连接条件在两个表中匹配的行。未匹配的行不会出现在结果集中。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="SQL 子查询"
  title="关联子查询"
  options={[
    {text: '子查询整体只运行一次'},
    {text: '仅在 JOIN 语句中使用的子查询'},
    {text: '仅返回多列的子查询'},
    {text: '子查询为外部查询的每一行运行一次', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中的关联子查询是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    关联子查询会针对外部查询的每一行评估一次。它引用外部查询的列，因此依赖于每一行。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="SQL 公共表表达式"
  title="WITH 子句语法"
  options={[
    {text: '仅在 DELETE 语句中允许使用'},
    {text: '用于聚合函数'},
    {text: '仅用于定义视图'},
    {text: '为更大的 SQL 语句定义临时结果集', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中的 `WITH` 子句（公共表表达式）有什么作用？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `WITH` 子句，也称为公共表表达式（CTE），用于定义一个可以在主查询中引用的临时结果集。在 PostgreSQL 中，`WITH` 可以附加到 `SELECT`、`INSERT`、`UPDATE`、`DELETE` 或 `MERGE` 等语句上。

    这有助于提升复杂查询的可读性和可维护性。

    语法如下：
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
    {text: '检查值是否为数值'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中 `IS NULL` 运算符有什么作用？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` 检查指定列是否包含 NULL 值。`IS NOT NULL` 检查相反的情况。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="SQL 运算符"
  title="使用 IN 运算符"
  options={[
    {text: '返回唯一行'},
    {text: '需要索引列'},
    {text: '仅适用于数值列'},
    {text: '返回匹配指定列表中值的行', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中的 `IN` 运算符有什么作用？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `IN` 运算符过滤行，使其匹配指定列表中的任意值，通常可替代多个 OR 条件。

    虽然它 *可能* 返回“唯一行”（且常常如此），但这并非其主要目的。

    这里并不要求对列建立索引，尽管在带索引的列上使用 `IN`（最好是 `UNIQUE` 索引）是最佳实践，因为它可以提升性能。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="SQL 函数"
  title="使用 COALESCE 函数"
  options={[
    {text: '计数 NULL 值'},
    {text: '返回最后一个非 NULL 参数'},
    {text: '返回第一个非 NULL 参数', isAnswer: true},
    {text: '仅限于 IDENTITY 列'},
    {text: '最初来源于 Printer Coalation'},
  ]}
>
  <slot name="question">
  <div className="question">
    `COALESCE` 函数在 SQL 中有什么作用？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `COALESCE` 函数返回指定列表中的第一个非 NULL 值，可用于在遇到 NULL 时替代默认值。

    例如，`COALESCE(column_name, 0)` 如果 `column_name` 为 `NULL` 则返回 `0`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="SQL 聚合函数"
  title="GROUP BY 用法"
  options={[
    {text: '隐藏重复项'},
    {text: '仅用于连接'},
    {text: '按升序排序行'},
    {text: '按指定列对行进行分组', isAnswer: true},
    {text: '语法应为 GROUP WITH/USING'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中 `GROUP BY` 子句的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `GROUP BY` 子句会将具有相同指定列值的行分组，从而可以对每个组应用聚合函数。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="SQL 连接"
  title="FULL OUTER JOIN 基础"
  options={[
    {text: '仅返回匹配的行'},
    {text: '仅返回具有非 NULL 值的行'},
    {text: '仅返回左表中未匹配的行'},
    {text: '仅返回右表中未匹配的行'},
    {text: '返回两个表的所有行，对未匹配的行用 NULL 填充', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    在 SQL 中，`FULL OUTER JOIN` 是做什么的？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `FULL OUTER JOIN` 返回两个表的所有行，对缺失值的未匹配行填充为 NULL。

    这对于比较两个表并找出它们之间的差异非常有用。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
