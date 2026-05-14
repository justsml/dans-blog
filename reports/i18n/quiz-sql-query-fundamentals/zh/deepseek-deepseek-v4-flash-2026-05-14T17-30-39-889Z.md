# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/zh/index.mdx
- Validation: deferred
- Runtime seconds: 70.75
- Input tokens: 9825
- Output tokens: 9897
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.004127
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：展示你的SQL技能！
subTitle: 你是SQL派还是NoSQL派？
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## 测试你的 SQL 查询基本功

是不是用 ORM 用久了，感觉自己的技能有点生锈？  
别担心，很多开发者都这样。

快来证明你的 SQL 查询基本功吧！👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="SQL 基础"
  title="基本 WHERE 子句"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = "', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪个 SQL 查询能正确检索出 name 为 "John" 的行？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在 SQL 中，`WHERE` 子句使用单个等号（`=`）进行相等性检查，而不是 `==` 或 `===`，后者是 JavaScript 运算符。

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
    {text: '将 NULL 值计为一个唯一值'},
    {text: '将每个 NULL 值视为唯一，类似于 NaN !== NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    `COUNT(column_name)` 在 SQL 中有什么作用？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` 计算指定列中非 NULL 值的数量。要计算所有行（包括 NULL），请使用 `COUNT(*)`。

    你也可以使用 `COALESCE` 来确保 NULL 默认变为非 NULL 值。例如：`COUNT(COALESCE(column_name, 0))`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="SQL 连接"
  title="LEFT JOIN 基础"
  options={[
    {text: '返回每个匹配行的一行，忽略不匹配的行'},
    {text: '返回左表的所有行，以及匹配的右表行', isAnswer: true},
    {text: '返回所有匹配或不匹配的行，NULL 表示不匹配'},
    {text: '返回右表的所有行，以及任何匹配的左表行'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 SQL 中，`LEFT JOIN` 的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `LEFT JOIN` 返回左表的所有行以及右表中匹配的行，对于右表中不匹配的行，返回 NULL。
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
    {text: '返回两个表中的所有行，不匹配的行用 NULL 填充'},
    {text: '返回两个表中满足连接条件的行', isAnswer: true},
    {text: '返回右表中不匹配的行'},
  ]}
>
  <slot name="question">
  <div className="question">
    `INNER JOIN` 在 SQL 中做什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `INNER JOIN` 返回两个表中连接条件匹配的行。不匹配的行不会包含在结果集中。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="SQL 子查询"
  title="关联子查询"
  options={[
    {text: '一个只运行一次的子查询'},
    {text: '一个仅用于 JOIN 语句的子查询'},
    {text: '一个只返回多列的子查询'},
    {text: '一个对外部查询的每一行运行一次的子查询', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    什么是 SQL 中的关联子查询？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    关联子查询对外部查询的每一行计算一次。它引用了外部查询的列，因此依赖于每一行。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="SQL公用表表达式"
  title="WITH子句语法"
  options={[
    {text: '仅允许在DELETE语句中使用'},
    {text: '用于聚合函数'},
    {text: '仅用于定义视图'},
    {text: '定义一个临时结果集，用于更大的SQL语句中', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL中`WITH`子句（公用表表达式）的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `WITH`子句，即公用表表达式（CTE），用于定义一个临时结果集，可以在主查询中引用。在PostgreSQL中，`WITH`可以附加到诸如`SELECT`、`INSERT`、`UPDATE`、`DELETE`或`MERGE`等语句上。

    这有助于提高复杂查询的可读性和可维护性。

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
    {text: '检查值是否为数字'},
  ]}
>
  <slot name="question">
  <div className="question">
    SQL 中的 `IS NULL` 运算符是做什么的？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` 检查指定列是否包含 NULL 值。`IS NOT NULL` 则检查相反的情况。
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
    `IN` 运算符用于筛选出与指定列表中的任意值匹配的行，通常作为多个 OR 条件的替代方案。

    虽然它*可能*返回“唯一行”（而且通常确实如此），但这并非其主要目的。

    这里并不要求索引，但最佳实践是在有索引的列上使用 `IN`，最好是 `UNIQUE` 索引，因为这样可以提高性能。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="SQL 函数"
  title="使用 COALESCE 函数"
  options={[
    {text: '统计 NULL 值'},
    {text: '返回最后一个非 NULL 参数'},
    {text: '返回第一个非 NULL 参数', isAnswer: true},
    {text: '仅限于 IDENTITY 列'},
    {text: '最初来自打印机联合'},
  ]}
>
  <slot name="question">
  <div className="question">
    `COALESCE` 函数在 SQL 中有什么作用？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `COALESCE` 函数返回指定列表中的第一个非 NULL 值，用于在遇到 NULL 时替换默认值。

    例如，`COALESCE(column_name, 0)` 会在 `column_name` 为 `NULL` 时返回 `0`。
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
    {text: '仅用于连接'},
    {text: '按升序排列行'},
    {text: '按指定的列对行进行分组', isAnswer: true},
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
    `GROUP BY` 子句将具有相同指定列值的行分组，从而允许对每个组应用聚合函数。
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
    {text: '仅返回非 NULL 值的行'},
    {text: '仅返回左表中不匹配的行'},
    {text: '仅返回右表中不匹配的行'},
    {text: '返回两个表中的所有行，不匹配的行用 NULL 填充', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    在 SQL 中，`FULL OUTER JOIN` 的作用是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `FULL OUTER JOIN` 返回两个表中的所有行，不匹配的行用 NULL 填充缺失值。

    这对于比较两个表并找出它们之间的差异非常有用。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
