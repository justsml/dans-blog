# Translation Candidate
- Slug: quiz-regex-or-wreckage
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-15--quiz-regex-or-wreckage/zh/index.mdx
- Validation: deferred
- Runtime seconds: 33.34
- Input tokens: 17728
- Output tokens: 10702
- Thinking tokens: unknown
- Cached input tokens: 5632
- Cache write tokens: 0
- Estimated cost: $0.003511
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：正则表达式精通
subTitle: 你能驯服一些野生正则表达式吗？
label: RegEx
social_image: ../desktop-social.webp
category: Quiz
subCategory: RegEx
date: '2024-11-15'
modified: '2024-11-16'
tags:
  - quiz
  - regex
  - javascript
  - intermediate
  - patterns
cover_full_width: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-wide.webp
cover_mobile: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-square-200.webp
cover_icon: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-square-200.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';

import Challenge from'../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">准备好和正则表达式一决高下了吗？ 🤼‍♂️</p>

Test your RegEx knowledge with questions covering basic patterns, quantifiers, groups, and those tricky look-around assertions. From simple string matching to complex pattern validation - can you spot the correct regex?

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身"
  title="区分大小写匹配"
  options={[
    {text: '["Cat"]'},
    {text: '["cat", "CAT", "Cat"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    匹配什么？
    ```js
        'cat CAT Cat'.match(/cat/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    此模式使用 `g`，但未使用 `i`：
    - `g` 查找所有匹配
    - 未使用 `i` 时，匹配区分大小写

    未使用 `i` 标志时，仅匹配小写的 "cat"。

    在处理用户输入或 HTML 时，大小写可能不同，这非常有用。

    [了解更多关于 RegExp 标志](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="热身"
  title="简单字符匹配"
  options={[
    {text: '["cat", "hat"]', isAnswer: true},
    {text: '["cat", "hat", "what"]'},
    {text: '["cat"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    这段代码会返回什么？
    ```js
        const words = ['cat', 'hat', 'what', 'bat'];
        words.filter(word => word.match(/^[ch]at/))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    模式 `/^[ch]at/` 匹配的字符串是：
    - 以 (`^`) `c` 或 `h` 开头（`[ch]` 表示匹配单个字符的字符类）
    - 紧跟着字面量 `at`

    因此，只有 "cat" 和 "hat" 能匹配此模式。`filter()` 方法会保留匹配的元素。

    [了解更多关于字符类的内容请访问 MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="基础匹配"
  title="贪婪 vs 非贪婪"
  options={[
    {text: '["<div>Hello</div>"]'},
    {text: '["<div>", "</div>"]'},
    {text: '["<div>Hello</div><div>World</div>"]'},
    {text: '["<div>Hello</div>", "<div>World</div>"]', isAnswer: true},
    {text: '["Hello", "World"]'},
  ]}
>
  <slot name="question">
  <div className="question">
    这将匹配什么？
    ```js
        '<div>Hello</div><div>World</div>'.match(/<div>.*?<\/div>/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    模式 `/<div>.*?<\/div>/g` 使用了非贪婪匹配 `*?`，其含义是：
    - 匹配 `<div>`
    - 匹配任意字符（`.*`），但尽可能少（`?`）
    - 直到找到 `</div>`
    - `g` 标志使其匹配所有出现

    如果去掉 `?`，贪婪的 `.*` 会从第一个 `<div>` 匹配到最后一个 `</div>`，得到一个大的匹配。加上 `?` 则会分别匹配每一对标签。

    [了解更多关于贪婪与惰性匹配](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="常见陷阱"
  title="点元字符"
  options={[
    {text: '["hello\nworld"]'},
    {text: '["hello", "world"]', isAnswer: true},
    {text: '["hello\n", "world"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    这将返回什么？
    ```js
        'hello\nworld'.match(/\w+/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `\w+` 模式匹配一个或多个单词字符。即使字符串中有换行符，`\w` 仍匹配：
    - 字母 (a-z, A-Z)
    - 数字 (0-9)
    - 下划线 (_)

    因此，换行符充当单词边界，我们得到两个匹配。如果使用 `.*`，默认情况下它不会匹配换行符（需要 `s` 标志）。

    [了解更多关于元字符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#types)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="前瞻"
  title="正向前瞻"
  options={[
    {text: '["$100", "€50"]'},
    {text: '["100", "50"]'},
    {text: '["$", "€"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    这会匹配什么？
    ```js
        '$100 and €50'.match(/\d+(?=[\$€])/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    这个模式不会匹配任何内容，因为前瞻是向后看的！如果你想匹配前面带有 `$` 或 `€` 的数字，请使用后顾断言：`/(?<=[\$€])\d+/g`。

    前瞻检查当前位置**之后**的内容。该模式实际上在寻找：
    - 一个或多个数字（`\d+`）
    - 紧跟着（`(?=...)`）美元或欧元符号（`[\$€]`）

    由于没有数字后面跟着货币符号（它们是前置的），所以没有匹配结果。

    [了解更多关于前瞻断言的内容](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="基础匹配"
  title="单词边界"
  options={[
    {text: '["cat", "cats"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '["cats"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    会匹配什么？
    ```js
        'cat cats category'.match(/\bcat\b/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `\b` 表示单词边界，匹配：
    - 单词字符与非单词字符之间
    - 如果字符串开头/结尾是单词字符，也匹配

    因此 `/\bcat\b/` 只在 "cat" 是完整单词时匹配，而不会匹配它是其他单词的一部分。
    - ✅ "cat"（被空格包围）
    - ❌ "cats"（"cat" 后没有边界）
    - ❌ "category"（"cat" 后没有边界）

    [了解更多关于单词边界](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#other_assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="常见陷阱"
  title="全局标志"
  options={[
    {text: 'null'},
    {text: '["a"]'},
    {text: '["a", "a", "a"]', isAnswer: true},
    {text: '["b", "n", "n"]'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出是什么？
    ```js
        'banana'.match(/a/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `g`（全局）标志会改变 `match()` 的行为：
    - 不带 `g`：返回第一个匹配及捕获组
    - 带 `g`：返回所有匹配字符串的数组

    在本例中，它会找到 "banana" 中所有的 "a"。

    注意：如果既需要所有匹配又需要捕获组，请使用 `matchAll()` 或在循环中使用 `exec()` 方法。

    [了解更多关于全局标志](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="后向断言"
  title="负向后向断言"
  options={[
    {text: '["123"]'},
    {text: '["123", "456"]'},
    {text: '["23", "456"]', isAnswer: true},
    {text: '["456"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    这个模式匹配什么？
    ```js
        'abc123 def456'.match(/(?<!abc)\d+/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    负向后向断言 `(?<!abc)` 确保数字前面没有出现 "abc":
    - ❌ "123"（前面是 "abc"）
    - ✅ "23"（前面是 "abc1"）
    - ✅ "456"（前面是 "def"）

    JavaScript 在现代引擎中支持后向断言。此示例使用固定长度的后向断言：`abc` 始终是三个字符。可变长度的后向断言则是更棘手、依赖引擎的特性。

    注意: 后向断言的支持在 JavaScript 中相对较新。如果需要兼容旧浏览器，请查看 [浏览器兼容性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#browser_compatibility)。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="基础匹配"
  title="捕获组"
  options={[
    {text: '["2029-12-31"]'},
    {text: '["2029", "12", "31"]', isAnswer: true},
    {text: '["20", "29", "12", "31"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    这将返回什么？
    ```js
        '2029-12-31'.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    该模式使用了三个捕获组：
    1. `(\d{4})` 捕获年份
    2. `(\d{2})` 捕获月份
    3. `(\d{2})` 捕获日期

    未使用 `g` 标志的 `match()` 返回：
    - 索引 0：完整匹配
    - 索引 1+：捕获组

    `slice(1)` 是获取仅捕获组的常用技巧。

    [了解更多关于组和捕获](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="前瞻"
  title="负向前瞻"
  options={[
    {text: '["password123"]'},
    {text: '["abc123"]'},
    {text: '["123aBc"]'},
    {text: '["12"]', isAnswer: true},
    {text: '["abc"]'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    这将得到什么结果？
    ```js
        "123aBc".match(/^\d+(?![a-z])/ig)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    负向前瞻 `(?![a-z])` 确保数字后面没有小写字母。因为 "3aBc" 部分在数字后面有小写字母，它的部分不匹配。所以只有开头的 "12" 匹配。

    [了解更多关于负向前瞻](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="向后查找"
  title="向后查找分割"
  options={[
    {text: '["a,", "b,", "c"]', isAnswer: true},
    {text: '["a,b,c"]'},
    {text: '["a", ",", "b", ",", "c"]'},
    {text: '["a,b,c", ""]'},
  ]}
>
  <slot name="question">
  <div className="question">
    返回什么？
    ```js
        'a,b,c'.split(/(?<=,)/)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `/(?<=,)/` 模式是一个向后查找，匹配逗号之后的位置：
    - `a,`（逗号后）
    - `b,`（逗号后）
    - `c`（后面没有逗号）

    向后查找不会消耗逗号，所以逗号仍然保留在分割结果的前一个片段中。

    当你想基于某个字符之前的内容进行分割且**不丢失分割字符**时，这很有用。

    [了解更多关于向后查找断言的内容](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="常见陷阱"
  title="转义特殊字符"
  options={[
    {text: '["$100"]'},
    {text: '["100"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    匹配什么？
    ```js
        '$100'.match(/$\d+/)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    特殊字符需要使用 `\\` 转义才能字面匹配：
    - `$` 是特殊字符（字符串结束）
    - 要匹配字面的美元符号，需要转义：`\\$`

    常见需要转义的字符：
    ```js
        . * + ? ^ $ [ ] \ ( ) { } |
    ```
    如果不进行转义，许多特殊字符会拥有正则表达式的含义，可能并非你想要的。

    [了解更多关于转义特殊字符的信息](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="后向断言"
  title="正向后向断言"
  options={[
    {text: '["$100"]'},
    {text: '["100"]', isAnswer: true},
    {text: '["$"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    匹配到了什么？
    ```js
        '$100'.match(/(?<=\$)\d+/)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    正向后向断言 `(?<=\$)` 确保数字前面有美元符号：
    - `(?<=\$)`: 查找美元符号的后向断言
    - `\d+`: 匹配一个或多个数字

    后向断言不会消耗字符，只是检查前面的内容。
    当你想基于前面的内容匹配而不把前面的部分包括进结果时，这非常有用。

    [了解更多关于向后查找断言的内容](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="基础匹配"
  title="惰性与贪婪量词"
  options={[
    {text: '["<b>bold</b>"]'},
    {text: '["bold"]', isAnswer: true},
    {text: '["<b>", "</b>"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    匹配到了什么？
    ```js
        '<b>bold</b>'.match(/<b>(.*?)<\/b>/).slice(1)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    该模式使用了带 `*?` 的惰性匹配：
    - `<b>`：匹配开始标签
    - `(.*?)`：捕获任意字符（惰性）
    - `</b>`：匹配结束标签

    `*` 后的 `?` 使其惰性，匹配尽可能少的字符。
    如果没有 `?`，则为贪婪，会匹配尽可能多的字符。

    `slice(1)` 只返回捕获的组。

    [了解更多关于贪婪与惰性匹配](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="基础匹配"
  title="Unicode 标志"
  options={[
    {text: '["🙂"]'},
    {text: '["😀", "🙂"]', isAnswer: true},
    {text: 'null'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    匹配什么？
    ```js
        '😀 🙂'.match(/\p{Emoji}/gu)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `u` 标志启用：
    - Unicode 属性转义 (`\\p{...}`)
    - 对代理对的正确处理

    如果没有 `u`，表情符号和其他 Unicode 字符可能匹配不正确。
    模式 `\\p{Emoji}` 匹配具有 Unicode `Emoji` 属性的字符。在此字符串中，指的是两个表情图标。

    注意：Unicode 属性转义需要 `u` 标志。

    [了解更多关于 Unicode 模式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="深入地狱"
  title="密码验证"
  options={[
    {text: '"sassword123"'},
    {text: '"Sass123!"', isAnswer: true},
    {text: '"SASSWORD123"'},
    {text: '"Sass word123"'},
  ]}
>
  <slot name="question">
  <div className="question">
    提前致歉！ 😈<br />
    哪个密码匹配此模式？
    ```js
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    别在生产环境中写这种东西！ 😅

    此模式使用多个正向前瞻来强制：
    - 至少一个大写字母：`(?=.*[A-Z])`
    - 至少一个小写字母：`(?=.*[a-z])`
    - 至少一个数字：`(?=.*\d)`
    - 至少一个特殊字符：`(?=.*[!@#$%^&*])`
    - 最小长度为 8：`.{8,}`

    正向前瞻非常适合密码验证，因为它们可以在不消耗字符的情况下检查多个条件。

    [了解更多关于密码验证模式的内容](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

</QuizUI>

<h2>你表现如何？ 🧐</h2>

正则表达式可能难以驯服，但一旦掌握（包括所有新语法）就非常强大。多练习，你很快就能成为正则大师！ 🧙‍♂️

<p class="inset">想在正则练习后休息一下吗？<br />哼，记住：技能提升后再休息！ <br /><br />前往[我的健身房]../challenges/继续挑战吧！ 💪</p>
````
