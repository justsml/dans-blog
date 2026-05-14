# Translation Candidate
- Slug: quiz-postgres-sql-mastery-pt1
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/zh/index.mdx
- Validation: deferred
- Runtime seconds: 28.64
- Input tokens: 15551
- Output tokens: 8913
- Thinking tokens: unknown
- Cached input tokens: 5888
- Cache write tokens: 0
- Estimated cost: $0.003220
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
social_image: ../mobile.webp
title: 测验：深入 PostgreSQL：第 1 部分
subTitle: SQL 会让你惊呼吗？
label: 'Deep PostgreSQL #1'
category: Quiz
subCategory: Database
date: '2024-11-27'
modified: '2024-12-03'
tags:
  - quiz
  - postgresql
  - sql
  - database
  - intermediate
  - advanced
cover_full_width: ../elephant-synthwave-gym-wide.webp
cover_mobile: ../elephant-synthwave-gym-square-200.webp
cover_icon: ../elephant-synthwave-gym-square-200.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

> **第 1 部分，共 2 部分。** [前往第 2 部分](/quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 毫无疑问是我最爱的数据库！我总是能发现新的技巧和坑点，于是决定把它们做成一个新测验！</p>

本测验涵盖了常见和鲜为人知的 PostgreSQL 特性与坑点：从内置聚合函数到类型转换、约束等。

祝你好运！ 🍀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身：函数"
  title="内置聚合函数"
  options={[
    {text: 'MIN'},
    {text: 'MAX'},
    {text: 'AVG'},
    {text: 'MEDIAN', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪项不是 PostgreSQL 的内置聚合函数？
    ```sql
        SELECT 
          MIN(grade) as lowest,
          MAX(grade) as highest,
          AVG(grade) as average,
          MEDIAN(grade) as middle
        FROM grades;
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `MEDIAN` 不是内置的！你需要：
    ```sql
        PERCENTILE_CONT(0.5) 
        WITHIN GROUP (ORDER BY grade)
    ```
    常见的内置聚合函数：
    - `MIN`, `MAX`, `COUNT`
    - `AVG`, `SUM`
    - `ARRAY_AGG`, `STRING_AGG`
    - 各种统计函数
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="热身：类型转换"
  title="强制转换语法变体"
  options={[
    {text: '\'95\'::INTEGER'},
    {text: 'INTEGER \'95\''},
    {text: 'CAST(\'95\', INTEGER)', isAnswer: true},
    {text: 'CAST(\'95\' AS INTEGER)'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪种类型转换是 **无效** ❌？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL 支持三种强制转换语法：

    1. ANSI SQL: `CAST(expression AS type)`。
    2. PostgreSQL: `expression::type`。
    3. 类型函数: `type 'literal'`。

    它们在功能上等价，但：
    - `CAST()` 最具可移植性。
    - `::` 是 PostgreSQL 特有的，但使用广泛。
    - 中缀式 `type 'literal'` 较少见，但仍然有效。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="约束"
  title="UNIQUE 约束与 NULL"
  options={[
    {text: '不允许 NULL'},
    {text: '允许一个 NULL'},
    {text: '允许多个 NULL', isAnswer: true},
    {text: '取决于 PostgreSQL 版本'},
  ]}
>
  <slot name="question">
  <div className="question">
    这里允许多少个 NULL 值？
    ```sql
        CREATE TABLE student_emails (
          student_id INTEGER,
          email VARCHAR(255),
          UNIQUE(email)
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL 中的 UNIQUE 约束：
    - 允许多个 NULL 值。
    - 在唯一性检查中 `NULL` ≠ `NULL`。

    若要阻止 `NULL` 值，添加 `NOT NULL`：
    ```sql
        CREATE TABLE student_emails (
          student_id INTEGER,
          email VARCHAR(255) NOT NULL,
          UNIQUE(email)
        );
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="日期/时间"
  title="日期算术"
  options={[
    {text: '2024-11-27'},
    {text: '2024-11-27 00:00:00'},
    {text: '2024-11-28'},
    {text: '2024-11-28 00:00:00', isAnswer: true},
    {text: '错误：无效时间'},
  ]}
>
  <slot name="question">
  <div className="question">
    这会返回什么？
    ```sql
        SELECT '2024-11-27'::date + interval '24 hours';
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    间隔是简化日期范围操作的强大工具！

    PostgreSQL 中的日期算术：
    - `+ interval '24 hours'` 添加 24 小时
    - `+ interval '1 day'` 添加 1 天
    - `+ interval '1 month'` 添加 1 个月
    - `+ interval '1 year'` 添加 1 年

    结果是 `2024-11-28 00:00:00`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="时间戳"
  title="timestamptz 与 timestamp 的区别"
  options={[
    {text: '它们都占用 8 字节，但表示不同的时间戳语义', isAnswer: true},
    {text: 'They\'},
    {text: 'timestamptz 会保留任何输入的时区'},
    {text: 'timestamptz 会存储原始的时区名称或偏移量'},
    {text: 'timestamptz 为时区存储 2 字节的值'},
    {text: 'timestamptz 是 timestamp 的继任者'},
  ]}
>
  <slot name="question">
  <div className="question">
    关于 `timestamptz` 与 `timestamp`，哪条说法最**准确**？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    它们都是 8 字节，但存储的值类型不同。

    那么区别在哪里？在于输入解析。

    **`timestamptz`**
    - 将输入规范化为绝对时间点。
    - 在解析没有显式偏移的输入以及显示输出时，会考虑服务器/连接的 `TimeZone` 设置。

    **`timestamp`**
    - 存储日期和时间，不进行时区转换。
    - 不会保留或规范化时区信息。


    **`timestamp`**

    - 存储不含时区信息的日期和时间。
    - 适用于显式存储标准化日期，无论是 UTC 还是特定时区。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Postgres 类型"
  title="识别无效类型"
  options={[
    {text: 'VARCHAR(100)'},
    {text: 'CHAR(100)'},
    {text: 'TEXT'},
    {text: 'STRING(100)', isAnswer: true},
    {text: 'CHARACTER VARYING(100)'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪项不是 ❌ 有效的 PostgreSQL 类型？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL 拥有丰富的数据类型，但 `STRING(100)` 并不在其中。

    正确的字符串类型包括：
    - `VARCHAR(100)`（可变长度字符串）
    - `CHAR(100)`（固定长度字符串）
    - `TEXT`（无限长度）
    - `CHARACTER VARYING(100)`（等同于 `VARCHAR(100)`）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Postgres 类型"
  title="识别无效类型"
  options={[
    {text: 'int'},
    {text: 'real'},
    {text: 'bigint'},
    {text: 'bigserial'},
    {text: 'smallserial'},
    {text: 'decimal128', isAnswer: true},
    {text: 'double precision'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪项 ❌ 不是有效的 PostgreSQL 类型？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    它看起来很熟悉，因为 `decimal128` 在很多地方都有（包括 Mongo 和 Java）。但它不是有效的 PostgreSQL 类型，PostgreSQL 使用 `decimal`。

    正确的数值类型包括：
    - `int`（4 字节整数）
    - `bigint`（8 字节整数）
    - `real`（4 字节浮点数）
    - `double precision`（8 字节浮点数）
    - `bigserial`（自动递增的 8 字节整数）
    - `smallserial`（自动递增的 2 字节整数）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Postgres 类型"
  title="识别无效类型"
  options={[
    {text: 'cidr'},
    {text: 'inet'},
    {text: 'ipv4', isAnswer: true},
    {text: 'macaddr'},
    {text: 'macaddr8'},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪项不是 ❌ 有效的 PostgreSQL 类型？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    这让你感到沮丧，甚至 _愤怒_ 吗？你并不孤单！正如一位未署名的 “核心” 数据库贡献者所说：“what the hell, Dan?! 我在类型题上崩溃了！这太暴力了，先生！不分享我的分数，哈哈。” 😈 不客气。

    PostgreSQL 丰富的网络类型中并不包含 `ipv4`。每次我不查资料就尝试使用它时，总是出错。也许 `macaddr8` 让我觉得一定会有 `ipv4` 和 `ipv6` 类型。其实不然，`inet` 已经覆盖了两者。`cidr` 也同时支持网络掩码。

    有效的网络类型包括：
    - `cidr`（IPv4/IPv6 网络地址）
    - `inet`（IPv4/IPv6 主机地址）
    - `macaddr`（MAC 地址）
    - `macaddr8`（EUI-64 MAC 地址）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Postgres 类型"
  title="识别无效类型"
  options={[
    {text: 'xml'},
    {text: 'uuid'},
    {text: 'money'},
    {text: 'currency', isAnswer: true},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪项不是 ❌ 有效的 PostgreSQL 类型？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL 拥有丰富的专用类型集合，但 `currency` 并不是其中之一！

    有效的类型包括：
    - `xml`（XML 数据）
    - `uuid`（UUID）
    - `money`（货币金额）
    - `interval`（时间间隔）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Postgres 类型"
  title="识别无效类型"
  options={[
    {text: 'box'},
    {text: 'line'},
    {text: 'point'},
    {text: 'circle'},
    {text: 'polygon'},
    {text: 'triangle', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪项 ❌ 不是有效的 PostgreSQL 类型？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL 拥有丰富的专用类型集合，但 `triangle` 并不在其中。

    我相信即将发布的 [GEOS](https://libgeos.org/) 版本会加入 `Triangle` 的 OGC/WKT 支持，这意味着它最终可能会被包含在 PostGIS 中。（基本上，这个答案将来可能会出错。）

    正确的专用类型包括：
    - `box`（矩形盒）
    - `line`（无限直线）
    - `point`（二维点）
    - `circle`（二维圆）
    - `polygon`（二维多边形）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="整数算术"
  title="整数溢出"
  options={[
    {text: '4294967296'},
    {text: '错误：整数超出范围', isAnswer: true},
    {text: '0'},
    {text: '2147483647'},
  ]}
>
  <slot name="question">
  <div className="question">
    计算学生 ID 的总可能数会怎样？
    ```sql
        SELECT 256 * 256 * 256 * 256;
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL的 `integer` 类型是 32 位有符号，范围从 `-2,147,483,648` 到 `2,147,483,647`。

    计算 `256^4` = `4,294,967,296` 超出了此范围。

    要处理更大的数字：
    ```sql
        -- Use BIGINT
        SELECT 256::bigint * 256 * 256 * 256;

        -- Or numeric for arbitrary precision
        SELECT 256::numeric * 256 * 256 * 256;
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="日期/时间"
  title="时间戳精度"
  options={[
    {text: '2024-01-08 13:30:00+00'},
    {text: '2024-01-08 13:30:00.123456+00'},
    {text: '2024-01-08 13:30:00.123456789+00'},
    {text: '2024-01-08 13:30:00.1234567', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    哪个 `timestamp` 字面量是最小的、能够超出 Postgres 最大 `time` 精度的？
    ```sql
        CREATE TABLE class_sessions (
          id INT GENERATED BY DEFAULT AS IDENTITY,
          start_time timestamptz,
          end_time timestamptz
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL 的时间戳精度为微秒（6 位小数）。

    - 最大精度：`.123456`（6 位）
    - 纳秒（9 位）会被四舍五入或截断到支持的精度
    - 对于 `timestamptz` 可以接受时区偏移，但不是必需的

    **不常见的坑点：** 有些语言/框架会发送纳秒精度，但 PostgreSQL 只能以微秒精度存储时间戳。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Postgres 类型"
  title="识别无效类型"
  options={[
    {text: 'lseg'},
    {text: 'bytea'},
    {text: 'tsquery'},
    {text: 'tsvector'},
    {text: 'tsrank', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪项不是 ❌ 有效的 PostgreSQL 类型？

    （说真的，这些（大多数）都是真实的类型。）
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL 内置了多种几何和全文搜索类型，但 `tsrank` 并不是其中之一。

    正确的几何和全文搜索类型包括：
    - `lseg`（线段）
    - `bytea`（二进制数据）
    - `tsquery`（全文搜索查询）
    - `tsvector`（全文搜索文档）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="约束"
  title="检查约束的时机"
  options={[
    {text: '对新插入或修改的行立即检查', isAnswer: true},
    {text: '在事务提交时'},
    {text: '在下一个查询时'},
    {text: '永不——约束仅在 INSERT 时检查'},
  ]}
>
  <slot name="question">
  <div className="question">
    何时检查此 grade 约束？
    ```sql
        ALTER TABLE students 
        ADD CONSTRAINT valid_grade 
        CHECK (
          (grade >= 0 AND grade <= 100) OR 
          grade IS NULL
        ) NOT VALID;
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `NOT VALID` 约束：
    - 对新插入和更新的行立即检查
    - 不会验证已有行
    - 可以稍后使用 `VALIDATE CONSTRAINT` 验证已有行
    - 对大表很有用

    没有 `NOT VALID` 时：
    - 约束立即检查
    - 所有已有行都会被验证
    - 在大表上可能很慢
  </div>
  </slot>
</Challenge>

</QuizUI>

做得好！你已经深入探索了 PostgreSQL 的多个领域！🐘  

希望你学到新东西，或者至少拿到一个可以炫耀的分数！🏆  

<p class="inset">查看 <a href="../quiz-postgres-sql-mastery-pt2/">第 2 部分</a>，获取更多 Postgres 乐趣！🚀</p>  

想要生活更刺激？查看我的 <a href="../challenges/">测验合集</a>，享受无尽的*乐趣！
````
