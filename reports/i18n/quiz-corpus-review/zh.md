# Chinese quiz translation review

Reviewed 2026-09-14: all **19 quizzes, 267 questions, 1,231 options**. This is a direct source/translation editorial review and static integrity check. Browser selection coverage is recorded by the parent task's corpus Playwright run; this ledger does not claim a separate browser run.

## Changes

- Restored literal program output across Bash, Rust, Destructuring, ESNext and Error.cause. Chinese explains the result; strings actually printed by unchanged code remain literal English, including wrong alternatives.
- Propagated corrected source semantics for SQL correlated subqueries and index eligibility; DynamoDB UpdateItem, capacity tradeoffs and S3 consistency; Node buffer initialization, chunked piping and object mode; DSA problem constraints; HTML dd/figure choices; CSS centering; Promise recovery; and destructuring defaults.
- Clarified cross-realm errors and the spoofability of Symbol.toStringTag. Scoped captureStackTrace to V8/Node.
- Fixed missing BigInt introduction, missing Destructuring quiz-collection link, and the image-only Promise Q9 explanation. The latter now has Chinese text before the retained illustration.
- Replaced generic DSA/ESNext hints with question-specific prompts. Completed the unfinished DynamoDB Streams hint. Corrected misleading Bash/Regex/array-destructuring question titles.
- Fixed timestamp precision question, removed duplicate timestamp explanation and speculative PostGIS/GEOS claim. Clarified regex lookahead direction/backtracking, Bash quote boundaries, and the original RefCell panic.
- Translated remaining prose-only options and badges while retaining technical API names, output text, and identifiers. Date questions that ask which date is represented use consistent Chinese year-month-day formatting.

## Terminology decisions

| Concept | Usage | Corpus comparison |
| --- | --- | --- |
| Lookahead / lookbehind | 前瞻断言 / 后顾断言, with 正向/负向 as needed | The Chinese regex tutorial (2024-12-29--from-zero-to-regex-hero-extract-url-like-strings) uses 前瞻/后顾; the quiz previously mixed 先行、后行、向后查找 and 后顾. |
| Greedy / lazy | 贪婪 / 非贪婪 | One consistent pair across all regex questions instead of alternating 懒惰 and 非贪婪. |
| CTE | 公用表表达式（CTE） | SQL fundamentals already uses 公用表表达式; PostgreSQL part2 now matches it. |
| Backpressure | 背压 | Retained existing Node quiz terminology, used consistently in piping and backpressure explanations. |
| Interior mutability | 内部可变性 | Retained consistent Rust Cell/RefCell terminology; panic remains a recognizable runtime term. |
| S3 read-after-write | 写后读强一致性 | Replaced the reversed phrase 强读后写一致性; limited the guarantee to the object operations in the source. |
| DynamoDB item | 项 | Avoided 项目 (project) in Streams, read capacity and TTL. |
| Literal output | Preserve literal characters | Do not turn Name/Age/Cost/Hi/Original error/fulfilled/Reference count into Chinese when code prints the English string. |

## Verification and limits

- Parsed all19 current Chinese files and compared all267 question indices, option counts and correct-option positions with current English. Every question has exactly one correct option; every option is nonblank; no question has duplicate option text.
- Compared fenced question code: all match source after whitespace normalization. The HTML figure example's sample image path was restored to source. One deliberate explanation-fence difference remains: Destructuring Q4 now contains only the literal TypeError diagnostic; the previously English explanatory prose is Chinese outside the fence.
- No external AI judge was called and no fresh model score is claimed. Existing sourceHash frontmatter is historical pipeline metadata, not silently rewritten to imply fresh judging.
- The source review and validators are being edited in parallel. Hashes below bind this review to the source bytes inspected. Recheck any file whose hash changes. Known heuristic findings (translated diagnostic prose, conceptual option lists and source inline-code parsing) were sent to the parent task rather than translating Chinese back into English merely to silence them.

## Question ledger

Correct options are one-based. Every row was reviewed for question meaning, selectable-answer meaning, explanation and existing hints. Code results were reasoned from the snippets; this ledger does not claim a live AWS/PostgreSQL deployment test.

### quiz-postgres-sql-mastery-pt1

Source SHA-256: `8cb97e01f93954cd744f660f427ef83528e228aef5df6c5bdeae527f140c09b6`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 内置聚合函数 | 4 | MEDIAN |
| 2 | 类型转换语法变体 | 3 | CAST('95', INTEGER) |
| 3 | UNIQUE约束与NULL | 3 | 允许多个NULL |
| 4 | 日期运算 | 4 | 2024-11-28 00:00:00 |
| 5 | timestamptz 与 timestamp 对比 | 1 | 它们都占用 8 字节，但表示不同的时间戳语义 |
| 6 | 识别无效类型 | 4 | STRING(100) |
| 7 | 识别无效类型 | 6 | decimal128 |
| 8 | 识别无效类型 | 3 | ipv4 |
| 9 | 识别无效类型 | 4 | currency |
| 10 | 识别无效类型 | 6 | triangle |
| 11 | 整数溢出 | 2 | 错误：整数超出范围 |
| 12 | 时间戳精度 | 4 | 2024-01-08 13:30:00.1234567 |
| 13 | 识别无效类型 | 5 | tsrank |
| 14 | 检查约束时机 | 1 | 对新行或更改的行立即检查 |

### quiz-is-your-memory-rusty

Source SHA-256: `e31e6449bc819ea5691b0d41998b3052afe28378c4dbe0bab4551abe753c2f9c`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 基础移动语义 | 5 | 编译错误：移动后借用了值 |
| 2 | 函数中的移动语义 | 3 | 编译错误 |
| 3 | 可变引用 | 2 | 错误：不能多次可变借用 \`wisdom\` |
| 4 | 隐式生命周期 | 1 | 编译成功 |
| 5 | Box 智能指针 | 3 | 编译错误 |
| 6 | Rc 智能指针 | 3 | Reference count: 3 |
| 7 | 结构体生命周期 | 2 | 错误：缺少生命周期说明符 |
| 8 | 生命周期标注 | 2 | 错误：缺少生命周期标注 |
| 9 | RefCell 行为 | 2 | 运行时 panic：RefCell 已被借用 |
| 10 | Cell 与 RefCell | 1 | 输出：42, 43 |
| 11 | 理解 Rc | 1 | Rc 用于单线程环境 |
| 12 | RefCell与线程 | 4 | RefCell 不实现 Sync；RwLock 提供同步共享 |
| 13 | Arc 和 Mutex | 5 | 死锁或 panic |
| 14 | 弱引用 | 2 | 输出: None |
| 15 | RAII 模式 | 1 | 资源在作用域结束后被释放 |
| 16 | 复制与克隆 | 2 | 创建深拷贝 |
| 17 | 内存优化 | 3 | 32 字节 |
| 18 | 零成本抽象 | 2 | 迭代器代码可以与手写循环一样高效 |

### quiz-bash-in-the-shell

Source SHA-256: `ea4b4440293b28444b461e783c6f33db1a9d797e64fa8a5987034d8dada9f631`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 变量声明 | 2 | name=Dan |
| 2 | 转义引号 | 3 | echo 'It'\''s 🔨 Time!' |
| 3 | Echo 命令 | 2 | cat cbt |
| 4 | 转义字符 | 4 | Cost: 00 |
| 5 | 替换子串 | 3 | Bark meow |
| 6 | 字符串长度 | 3 | ${#username} |
| 7 | 基础 if-else | 2 | File does not exist，并输出测试诊断信息 |
| 8 | 字符串比较 | 2 | 先输出测试语法诊断，再打印 Different cats |
| 9 | 函数声明 | 1 | Hi |
| 10 | 使用管道 | 3 | \| |
| 11 | 基本算术 | 4 | echo $(( 2 + 2 )) |
| 12 | 基础算术 | 6 | echo '10 * 0.5' \| bc |
| 13 | 子串提取 | 3 | good cat |
| 14 | Bash 循环 | 2 | each |
| 15 | 命令替换 | 4 | $(ls -l) |
| 16 | 合并标准错误与标准输出 | 3 | 2>&1 |

### quiz-regex-or-wreckage

Source SHA-256: `10ac88ad77540507d3992e3b6500e5cc1e13152dd22a82a20d0adce4ac8b4a25`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 区分大小写的匹配 | 3 | ["cat"] |
| 2 | 简单字符匹配 | 1 | ["cat", "hat"] |
| 3 | 贪婪匹配与非贪婪匹配 | 4 | ["<div>Hello</div>", "<div>World</div>"] |
| 4 | 单词字符与换行符 | 2 | ["hello", "world"] |
| 5 | 正向前瞻断言 | 5 | null |
| 6 | 单词边界 | 2 | ["cat"] |
| 7 | 全局标志 | 3 | ["a", "a", "a"] |
| 8 | 负向后顾断言 | 3 | ["23", "456"] |
| 9 | 捕获组 | 2 | ["2029", "12", "31"] |
| 10 | 负向前瞻 | 4 | ["12"] |
| 11 | 后顾分割 | 1 | ["a,", "b,", "c"] |
| 12 | 转义特殊字符 | 4 | null |
| 13 | 正向后顾断言 | 2 | ["100"] |
| 14 | 非贪婪与贪婪量词 | 2 | ["bold"] |
| 15 | Unicode 标志 | 2 | ["😀", "🙂"] |
| 16 | 密码验证 | 2 | "Sass123!" |

### quiz-css-core-fundamentals

Source SHA-256: `2788fc04e78db4ccdb705b06b915c55e4c625810b09885221f455cf12e3edaaf`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 无效的 CSS 字体大小单位 | 1 | 10cx |
| 2 | 十六进制代码 | 3 | #ABCD |
| 3 | 哎呀，都是单位！ | 14 | rel |
| 4 | 匹配选择器与 HTML 元素 | 4 | a#home[name='home'] |
| 5 | 按钮的属性选择器 | 4 | button[onclick] |
| 6 | 无效的 CSS 选择器 | 3 | c > > d {} |
| 7 | 选择最后一个链接 | 5 | a:last-child |
| 8 | 选择器优先级 | 3 | a#quote |
| 9 | 在块级元素中居中文本 | 4 | text-align: center; |
| 10 | 垂直居中块级元素 | 3 | align-content: center; |
| 11 | 计算嵌套字体大小的像素尺寸 | 2 | 5px |
| 12 | 使用 REM 计算像素大小 | 2 | 12px |
| 13 | 使用 EM 计算像素大小 | 5 | 24px |
| 14 | 零特异性选择器 | 1 | :where(.card) .title |

### quiz-modern-css-2025

Source SHA-256: `7f302e5782ff1d262f8af1bb22cfe184f7490015bc2bf8e7becc3fc5936fdd2e`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 使用CSS变量 | 3 | background-color: var(--main-color); |
| 2 | CSS min() 函数 | 2 | width: 200px; |
| 3 | CSS max() 函数 | 5 | width: 96px; |
| 4 | CSS minmax() 函数 | 3 | 第一列将在 100px 到 200px 之间 |
| 5 | CSS 变量回退值 | 4 | #6b8e23 |
| 6 | 使用 clamp() 实现响应式设计 | 3 | 在 200px 到 500px 之间线性缩放 |
| 7 | 原生CSS嵌套 | 3 | 是 |
| 8 | CSS 嵌套 | 4 | 完美，无需备注。 |
| 9 | 嵌套中的直接子选择器 | 2 | background-color: white |
| 10 | 在运行时更改CSS变量 | 2 | 使用JavaScript |
| 11 | 使用 calc() 与 CSS 变量 | 3 | 宽度：110px |

### quiz-postgres-sql-mastery-pt2

Source SHA-256: `b97ed535e3eced922287f21009e9b99a8a074cc2ea569e7d9e52c8572ac06cce`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | PostgreSQL 的众多 JOIN | 1 | JOIN ALL |
| 2 | 现代自增方式 | 5 | id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY |
| 3 | 标准合规性 | 4 | RETURNING |
| 4 | 自动回滚 | 2 | 回滚所有语句 |
| 5 | 哈希连接的适用条件 | 1 | ON a.id = b.id |
| 6 | 多列索引顺序 | 1 | CREATE INDEX ON students(grade_level, last_name); |
| 7 | 正确的引用方式 | 2 | 必须使用双引号 |
| 8 | 列名引用 | 2 | "first.name" |
| 9 | TABLESAMPLE 语法 | 8 | WHERE RANDOM() >= 0.9 |
| 10 | 部分索引 | 3 | 仅为活跃学生建立索引 |
| 11 | COUNT 与 NULL | 4 | 1 |
| 12 | EXPLAIN ANALYZE 陷阱 | 3 | 修改数据并输出计划 |

### quiz-sql-query-fundamentals

Source SHA-256: `4788ec9e33c53b4fb819c0e7e472f3a737b497b83add5049de127d7dcc4b32ad`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 基础 WHERE 子句 | 2 | SELECT * FROM users WHERE name = 'John'; |
| 2 | 聚合函数 COUNT | 2 | 仅计算列中的非 NULL 值 |
| 3 | LEFT JOIN 基础 | 2 | 返回左表中的所有行，以及右表中匹配的行 |
| 4 | 使用 INNER JOIN | 3 | 返回在两张表中都满足连接条件的行 |
| 5 | 相关子查询 | 4 | 引用外层查询中的列的子查询 |
| 6 | WITH 子句语法 | 4 | 定义一个临时结果集，供更大的 SQL 语句使用 |
| 7 | IS NULL 与 IS NOT NULL | 1 | 检查值是否为 NULL |
| 8 | 使用 IN 运算符 | 4 | 返回与指定列表中的值匹配的行 |
| 9 | 使用 COALESCE 函数 | 3 | 返回第一个非 NULL 参数 |
| 10 | GROUP BY 的用法 | 4 | 按指定的列对行进行分组 |
| 11 | FULL OUTER JOIN 基础 | 5 | 返回两张表中的所有行，未匹配的行用 NULL 填充 |

### javascript-promises-quiz

Source SHA-256: `ead6cb486ce9cef02d253b30715e77820dde44c9a310546a0532e7164078dd5a`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 多个 \`.catch\` #1 | 2 | 打印两次消息 |
| 2 | 多个 \`.catch\` #2 | 3 | 未处理的被拒绝的 Promise |
| 3 | 链式调用 \`.then\` 和 \`.catch\` | 1 | 打印 error 和 \`undefined\` |
| 4 | 链式调用 \`.catch\` | 1 | 打印一次错误信息 |
| 5 | 多个 \`.catch\` 链式调用 | 4 | 没有任何输出 |
| 6 | \`.then\` 之间的数据流 | 3 | 打印 "SUCCESS!" |
| 7 | .then 链式调用中的流转 | 3 | 打印 "SUCCESS!" 和 "SUCCESS!" |
| 8 | \`.then\` 链式调用中的数据流 | 4 | 打印 \`undefined\` |
| 9 | .then 和 .catch 之间的流转 | 3 | 打印 "The fails!" |

### quiz-nodejs-files-streams-buffers-oh-my

Source SHA-256: `77b0246b9c8275d11d3ca3108732512ae203d0d5f45f379aeb5166c248928930`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 缓冲区分配 | 1 | 创建一个大小为5的缓冲区，填充零 |
| 2 | 缓冲区到字符串的转换 | 1 | A |
| 3 | 异步文件操作 | 2 | 先打印"Done"，再打印文件内容 |
| 4 | 同步读取文件 | 1 | 返回一个 Buffer |
| 5 | 流事件 | 1 | 'data', 'end', 'error', 'close' |
| 6 | 流管道 | 2 | 分块复制文件，无需缓冲整个文件 |
| 7 | 目录操作 | 1 | 根据需要创建嵌套目录 |
| 8 | 转换流 | 2 | HELLO WORLD |
| 9 | 文件监视 | 2 | 不保证；可能触发多次 |
| 10 | 缓冲区比较 | 2 | false |
| 11 | 流背压 | 1 | 防止内存溢出 |
| 12 | 符号链接 | 3 | 创建符号链接 |
| 13 | 流模式 | 3 | 两种模式 |
| 14 | 文件描述符 | 1 | 一个数字 |
| 15 | 缓冲区编码 | 5 | 10 |

### quiz-do-you-know-esnext

Source SHA-256: `63cd3ddef63907f8281b7060db5b8004bf7bac2067f84fcdf01ca8bd8b18c3fb`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 空值合并运算符 | 4 | 100 |
| 2 | 空值合并 | 1 | false |
| 3 | 可选链 | 1 | undefined |
| 4 | BigInt 用法 | 3 | 84n |
| 5 | 动态导入语法 | 4 | object |
| 6 | Promise.allSettled | 1 | fulfilled: success |
| 7 | String.matchAll 用法 | 2 | 匹配的迭代器 |
| 8 | Import Meta 用法 | 1 | 当前模块的 URL |
| 9 | 逻辑赋值 | 2 | 10 |
| 10 | 逻辑空值赋值 | 2 | 10 |
| 11 | WeakRef 用法 | 2 | { data: 'important' } |

### quiz-advanced-js-error-mastery

Source SHA-256: `f0ef81ef5c1727d2a8a11e8a819b501a09ccb4f36e8014f758f36aa09b22961a`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 空对象之谜 | 2 | {} |
| 2 | 控制台与JSON | 2 | console.log 显示更多信息 |
| 3 | instanceof 继承 | 1 | true, true, true |
| 4 | 跨执行环境的 instanceof | 3 | 跨执行环境时可能为假 |
| 5 | 字符串抛出 | 2 | false, "string" |
| 6 | 错误名称属性 | 2 | "CustomError" |
| 7 | 构造函数名称陷阱 | 2 | "Error" |
| 8 | 现代 Error.cause | 1 | "Original error" |
| 9 | 堆栈操作 | 1 | 从堆栈中移除 createError |
| 10 | 错误中的模板字面量 | 2 | "Value undefined is invalid" |
| 11 | Express 响应错误 | 2 | 发送 {"error":{}} |
| 12 | Promise 拒绝值 | 2 | 任何值都可以作为拒绝原因 |
| 13 | 非标准属性 | 2 | 可能并非在所有环境中存在 |
| 14 | 对象与错误检测 | 2 | false, false |

### quiz-data-structures-algorithms

Source SHA-256: `f258c619229805a1a020c8a04e43e9e2c1a98845a967429d069e1b53648bd1b9`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 栈与队列 | 3 | 栈 |
| 2 | 大O表示法 | 1 | O(1) |
| 3 | 计算链表长度 | 4 | O(n) |
| 4 | 二叉搜索树查找 | 2 | O(log n) |
| 5 | 归并排序复杂度 | 3 | O(n log n) |
| 6 | DFS 与 BFS | 1 | 队列 |
| 7 | 图中的环检测 | 4 | 深度优先搜索 |
| 8 | 堆排序复杂度 | 2 | O(n log n) |
| 9 | 哈希表时间复杂度 | 3 | O(1) |
| 10 | 栈操作 | 1 | 压栈、出栈、查看栈顶 |
| 11 | 最短路径算法 | 4 | 迪杰斯特拉算法 |
| 12 | 自平衡二叉搜索树 | 2 | AVL树和红黑树 |
| 13 | 递归基例 | 3 | 基例 |
| 14 | 队列操作 | 1 | 入队和出队 |
| 15 | 拓扑排序 | 4 | 图必须是有向无环的 |
| 16 | 斐波那契递归复杂度 | 2 | O(2^n) |
| 17 | 优先队列的实现 | 3 | 堆 |
| 18 | 二叉树遍历 | 1 | 中序、前序、后序 |
| 19 | 堆的性质 | 4 | 根节点是最小的元素，高度为 O(log n) |
| 20 | 冒泡排序的稳定性 | 2 | 稳定 |

### quiz-destructuring-delights

Source SHA-256: `467e43bad93a2cacd7b0996c571584dcceb98969f924aa31ef9ba672a077ef90`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 基本对象解构 | 4 | Name: Dan Levy, Age: undefined |
| 2 | 数组解构与缺失元素 | 3 | Name: Dan Levy, Age: undefined |
| 3 | 嵌套解构 | 5 | 错误 |
| 4 | 对象解构中的默认值 | 5 | 错误 |
| 5 | 对象解构中的默认值 | 3 | Hi Dan from Unknown |
| 6 | 使用默认值的函数参数解构 | 6 | 错误 |
| 7 | 带有嵌套默认值的解构 | 6 | N/A, N/A, Joburg |
| 8 | 带有嵌套默认值的解构 | 6 | null, N/A |
| 9 | 带有嵌套默认值的解构 | 5 | TypeScript 错误 |
| 10 | 带有嵌套默认值的解构 | 5 | Denver |
| 11 | 带有嵌套默认值的解构 | 3 | 错误：缺少属性 'birth' 和 'age' |
| 12 | 带嵌套值、赋值和类型的解构 | 5 | 错误 |

### js-quiz-14-date-time-questions-test-your-knowledge

Source SHA-256: `fcef89818a405467abb8281315473a211b41b4e815d14835c8264d8fc8804f29`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 日期构造函数 第1部分 | 2 | 2020年2月1日 |
| 2 | 日期构造函数 第二部分 | 1 | 2020年1月1日 |
| 3 | 日期构造函数 第3部分 | 4 | 当前日期 |
| 4 | 日期构造函数 第4部分 | 1 | 1969 |
| 5 | 日期字符串解析 | 1 | 2019 2020 |
| 6 | 格式化 第1部分 | 2 | date.toLocaleFormat('en-US') |
| 7 | UTC日期 第1部分 | 3 | TypeError |
| 8 | UTC日期第二部分 | 3 | 自1970年1月1日GMT以来的毫秒数 |
| 9 | UTC 日期 第3部分 | 2 | 420 |
| 10 | 日期设置器 第1部分 | 1 | 2020年1月1日 |
| 11 | 日期设置器 第2部分 | 2 | 2020年2月1日 |
| 12 | 日期设置器 第3部分 | 2 | 2021年1月1日 |
| 13 | 日期设置器 第4部分 | 4 | 2021年2月1日 |
| 14 | 日期设定方法第五部分 | 4 | 2019年12月1日 |

### quiz-can-you-count-to-bigint

Source SHA-256: `15d65ba75475634f5d393dbf2afecb70b7496d8a0b56b7fe7f36a9f0b32726d1`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | 使用 \`parseInt\` 进行解析 | 1 | 123456 |
| 2 | 逗号处理 | 1 | 123 |
| 3 | 浮点数的精度 | 2 | false |
| 4 | 处理 Infinity | 1 | Infinity |
| 5 | 使用 \`.toFixed()\` 进行字符串转换 | 5 | "5.00" |
| 6 | \`parseInt\` 与 \`parseFloat\` 的相等性比较 | 1 | true |
| 7 | BigInt 的相等比较 | 3 | false |
| 8 | 十六进制解析 | 1 | true |
| 9 | 带基数的解析 | 1 | 255 |
| 10 | 使用 \`.map(parseInt)\` | 1 | [24, NaN, NaN] |
| 11 | 使用 \`.map(Number)\` | 1 | [24, NaN, 34] |
| 12 | 处理 null 值 | 4 | NaN 0 |
| 13 | 基于基数的解析 | 5 | 1112745 |

### quiz-js-interfaces-symbols-and-enumerables

Source SHA-256: `c31ed61019199a9690cb1c1f02182365a0ddb2c7c99eb9ad49da340c96dd83f9`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | Getter 与直接属性访问 | 3 | 直接访问该值 |
| 2 | 在对象键中使用 Symbol | 1 | 使用 Symbol |
| 3 | 可枚举属性 | 4 | 是的，它会被列出 |
| 4 | 使用 Object.defineProperty() 时的默认可枚举性 | 2 | false |
| 5 | 唯一 Symbol | 3 | false |
| 6 | Symbol 键与枚举 | 1 | 不，它不会被列出 |
| 7 | 获取所有 Symbol 键名 | 4 | Object.getOwnPropertySymbols() |

### quiz-in-the-aws-cloud

Source SHA-256: `9690cc0b49efc10047045e06bd765e746a16b0bb5456fa9cf8d786a3cfdc7e30`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | S3 趣味问答 | 3 | 简单存储服务 |
| 2 | DynamoDB | 1 | 存储任意属性 |
| 3 | DynamoDB | 4 | UpdateItem |
| 4 | 高级搜索功能 | 2 | OpenSearch |
| 5 | 多可用区部署 | 3 | 提供自动故障转移 |
| 6 | WebSocket 巫术 | 1 | API Gateway |
| 7 | S3 存储桶策略 | 4 | 使用最小权限原则 |
| 8 | Aurora Serverless | 2 | 自动扩展计算容量 |
| 9 | BatchGetItem 限制 | 3 | 100 |
| 10 | 批量操作 | 1 | 1 |
| 11 | 预置容量 vs 按需容量 | 4 | 零星、不可预测的流量无需预先配置容量 |
| 12 | S3 性能优化 | 2 | 使用逻辑前缀；不需要随机化 |
| 13 | RDS 备份策略 | 3 | 自动备份并支持时间点恢复 |
| 14 | Redis 与 Memcached | 1 | Redis 支持更多的数据结构和操作 |
| 15 | 全局二级索引 | 4 | 允许对非主键属性进行查询 |
| 16 | S3 生命周期管理 | 2 | 自动在存储类别之间转换对象 |
| 17 | 使用 Amazon Aurora 扩展读取 | 3 | 支持最多 15 个只读副本 |
| 18 | RDS 加密 | 1 | 对静止和传输中的数据进行加密 |
| 19 | DynamoDB Streams 的用途 | 4 | 捕获项级别的更改以用于事件驱动架构 |
| 20 | 大文件传输 | 2 | 对大文件使用分段上传 |
| 21 | 存储成本分析 | 3 | 根据访问模式混合存储类别 |
| 22 | 一致性模型 | 1 | 每秒 100 次读取 |
| 23 | Aurora 故障转移机制 | 4 | 基于故障转移优先级层自动提升 |
| 24 | S3 强一致性 | 2 | 对象写入、删除和列表查询具有写后读强一致性 |
| 25 | 生存时间 (TTL) | 3 | 后台删除，尽力而为的时间安排 |
| 26 | 扩展行为 | 1 | 扩展速度取决于当前容量和配置的容量 |

### quiz-master-modern-html5

Source SHA-256: `9320d673f59fafb3da0b9c01736b3b54a103301210b176a3e5c5c78e771b7b74`

| Q | Reviewed title | Correct option | Chinese answer |
| --- | --- | --- | --- |
| 1 | HTML中\`<ul>\`的作用 | 1 | 无序列表 |
| 2 | \`<dd>\` 的用法 | 4 | 描述列表中某个术语的描述、定义或值 |
| 3 | \`<figure>/<figcaption>\` 的使用 | 2 | 将自包含的内容及其说明文字分组 |
| 4 | \`<article>\` 的用途 | 2 | 独立内容部分 |
| 5 | 使用 \`<fieldset>/<legend>\` | 1 | 在标题下分组表单元素 |
| 6 | <meter> 的用途 | 2 | 表示范围内的数值 |
| 7 | \`<source>\`的用途 | 2 | 声明可用的媒体文件格式 |
| 8 | 如何使用 \`<hgroup>\` | 4 | 将标题与其副标题分组 |
| 9 | HTML中\`<menu>\`的用途 | 2 | 列出命令或工具栏控件 |
| 10 | <details>/<summary> 的作用 | 1 | 原生可折叠内容 |
| 11 | <dialog> 的用途 | 2 | 声明模态框或弹出窗口 |
| 12 | <time> 的使用 | 1 | 表示日期和时间 |
| 13 | ARIA 属性的作用 | 2 | 提高可访问性 |
| 14 | \`role\`属性的用途 | 2 | 描述元素的目的 |
