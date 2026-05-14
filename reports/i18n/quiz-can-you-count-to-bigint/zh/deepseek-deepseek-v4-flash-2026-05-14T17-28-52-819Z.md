# Translation Candidate
- Slug: quiz-can-you-count-to-bigint
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/zh/index.mdx
- Validation: deferred
- Runtime seconds: 141.70
- Input tokens: 13072
- Output tokens: 20713
- Thinking tokens: unknown
- Cached input tokens: 1664
- Cache write tokens: 0
- Estimated cost: $0.007659
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: JavaScript计数，你靠得住吗？
subTitle: 分清 `parseInt` 和 `parseFloat`？
label: Numbers
date: '2024-10-31'
modified: '2024-11-09'
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
tags:
  - quiz
  - data-structures
  - algorithms
cover: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
cover_full_width: ../victor-freitas-hOuJYX2K5DA-unsplash-wide.webp
cover_mobile: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
cover_icon: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身"
  title="使用 `parseInt` 进行解析"
  options={[
    {text: '123456', isAnswer: true},
    {text: '123'},
    {text: '12345600'},
    {text: '456.00'},
    {text: 'Error'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        parseInt(" 123456.00")
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `parseInt` 函数会忽略空格，并将初始的数字序列解析为整数。在这里，它在小数点处停止，因此只返回 `123456`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="解析"
  title="逗号处理"
  options={[
    {text: '123', isAnswer: true},
    {text: '12345600'},
    {text: '123456.00'},
    {text: '456.00'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        parseInt("123,456.00")
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    一般来说，`parseInt` 在遇到非数字字符时会停止解析。这里，它在逗号处停止，因此只返回 `123`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="数学"
  title="浮点数的精度"
  options={[
    {text: '0.1 + 0.2 === 0.3'},
    {text: 'false', isAnswer: true},
    {text: 'true'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        0.1 + 0.2 === 0.3
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    由于浮点数精度误差，`0.1 + 0.2` 并不完全等于 `0.3`。由于浮点数在内存中的存储方式，结果是 `0.30000000000000004`。处理浮点运算的 IEEE 754 标准是罪魁祸首，它无法精确表示某些数字。这是所有编程语言中的常见问题。最终你会遇到无限循环小数，无论哪种语言——计算机都只能停止追逐无限重复的数字。

    一些语言如 Python 和 Java 提供了 `Decimal` 或 `BigDecimal` 来处理这个问题，但 JavaScript 没有内置这样的功能。你可以使用像 `big.js` 或 `decimal.js` 这样的库来处理这些情况。

    （注意：有些语言被设计为在更高的逻辑层面上处理分数、虚数等，保留字面表达式。但它们仍然需要在硬件层面处理相同的浮点精度问题。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="数字溢出"
  title="处理 Infinity"
  options={[
    {text: 'Infinity', isAnswer: true},
    {text: 'NaN'},
    {text: 'Error'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        Number.MAX_VALUE * 2
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    由于 `Number.MAX_VALUE` 是 JavaScript 中最大的**可表示**常规数字，超过其限制会迅速溢出——基本上你会看到无意义的结果。将其乘以 `2` 会得到 `Infinity`。

    *你知道的，JavaScript 有时候就是这样。*
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="格式化"
  title="使用 `.toFixed()` 进行字符串转换"
  options={[
    {text: 'TypeError'},
    {text: 'SyntaxError'},
    {text: '"5"'},
    {text: '5'},
    {text: '"5.00"', isAnswer: true},
    {text: '5.0'},
  ]}
>
  <slot name="question">
  <div className="question">
    这段代码会输出什么？
    ```tsx
        5..toFixed(2)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `.toFixed(2)` 返回 `5` 的字符串表示，保留两位小数，因此结果是 `"5.00"`。

    双点（`5..toFixed(2)`）是一种“技巧”，用于访问数字字面量的对象模型。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="类型比较"
  title="`parseInt` 与 `parseFloat` 的相等性比较"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        parseInt("42") === parseFloat("42")
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在 JavaScript 中，`parseInt` 和 `parseFloat` 都会将字符串 `"42"` 解释为数字 `42`。因此，`parseInt("42") === parseFloat("42")` 的比较结果为 `true`。`parseInt` 在遇到第一个非数字字符时停止解析，而 `parseFloat` 会继续解析直到遇到不属于浮点数的字符。但由于 `"42"` 中没有小数点或其他非数字字符，两个函数返回了相同的值。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="相等性"
  title="BigInt 的相等比较"
  options={[
    {text: 'TypeError'},
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        BigInt("42") === parseInt("42")
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 是与 `number` 不同的类型，因此 `parseInt("42")`（一个常规数字）与 `BigInt("42")` 并不严格相等。要进行比较，必须将两者转换为相同类型：`BigInt(parseInt("42")) === BigInt("42")`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="基础"
  title="十六进制解析"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
    {text: '必须是大写: 2A'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    这将得出什么结果？
    ```jsx
        parseInt("0x2A") === parseInt("2a", 16)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    任何以 `0x` 开头的输入字符串都会自动被视为十六进制（基数 `16`）。
    因此，这相当于传递基数 16。所以，`parseInt("0x2A")` 等同于 `parseInt("2a", 16)`。（不区分大小写。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="基础"
  title="带基数的解析"
  options={[
    {text: '255', isAnswer: true},
    {text: '0'},
    {text: '16'},
    {text: '0.16'},
  ]}
>
  <slot name="question">
  <div className="question">
    这里是怎么回事？
    ```jsx
        parseInt('0xFF', 16)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `parseInt` 使用十六进制（`16`）基数将 `\"FF\"` 转换为十进制 `255`。你可能在 CSS RGB/十六进制颜色代码中见过这个。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Number[]"
  title="使用 `.map(parseInt)`"
  options={[
    {text: '[24, NaN, NaN]', isAnswer: true},
    {text: '[24, NaN, 42]'},
    {text: '[24, 42]'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        [24, 'One', 42].map(parseInt)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `parseInt` 的第二个参数（基数）与数组方法的 `index` 参数对齐。这会导致意外的结果，因为 `parseInt("One", 1)` 由于输入无效而返回 `NaN`。

    第一个元素 `24` 在基数为 0（自动检测）时被解析为 `24`，因此保持为 `24`。第二个元素 `'One'` 在基数为 1 时被解析为 `NaN`。第三个元素 `42` 使用基数 2 进行解析。在基数 2 中，`'42'` 是 `NaN`，因此结果是 `[24, NaN, NaN]`。

    这是 `parseInt` 和 `map` 的一个常见陷阱。如果你想将字符串数组解析为数字，唯一安全的“内置”方法是 `.map(Number)` 或添加回调/闭包 `.map(x => parseInt(x, 10))`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Number[]"
  title="使用 `.map(Number)`"
  options={[
    {text: '[24, NaN, 34]', isAnswer: true},
    {text: '[24, NaN, 42]'},
    {text: '[24, 1, 42]'},
    {text: '[24, 42]'},
    {text: 'NaN'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        [24, 'Twenty1', 0o42].map(Number)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Number` 将值转换为数字类型比 `parseInt` 更严格。这里，`'Twenty1'` 变成 `NaN`，而 `0o42` 被识别为八进制字面量并转换为 `34`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="解析"
  title="处理 null 值"
  options={[
    {text: '0 NaN'},
    {text: '0 0'},
    {text: 'NaN NaN'},
    {text: 'NaN 0', isAnswer: true},
    {text: 'null null'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    这段代码的结果是什么？
    ```jsx
        console.log(parseInt(null), Number(null))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `parseInt` 会将输入强制转换为字符串，因此 `null` 变成 `"null"`。由于 `"null"` 没有有效的十进制字符（常规数字），所以它会返回 `NaN`。

    `Number(null)` 返回 `0`，因为 JavaScript 就是喜欢让你措手不及。
    为什么？嗯，如果有兴趣的话，我可以深入讲解。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="解析"
  title="基于基数的解析"
  options={[
    {text: 'NaN'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '36'},
    {text: '1112745', isAnswer: true},
    {text: '01001001'},
  ]}
>
  <slot name="question">
  <div className="question">
    这个咒语的结果是什么？
    ```jsx
        parseInt(null, 36)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    由于 `parseInt` 总是将输入强制转换为字符串，`null` 变成了字符串 `"null"`。

    在三十六进制（hexatrigesimal，如果你还记得的话）中，字符串 `"null"` 表示 `1112745`。

    `nulk`、`null` 和 `nulm` 的连续值在三十六进制中分别是 `1112744`、`1112745` 和 `1112746`。
  </div>
  </slot>
</Challenge>

</QuizUI>

<section className="scroll-x">
## 比较表格

| 函数 | `parseInt` | `parseFloat` | `Number` | `BigInt` |
| --- | --- | --- | --- | --- |
| 忽略空白 | ✅ | ✅ | ✅ | ✅ |
| `.map(FN)`  | ❌ | ☑️ | ✅ | ✅ |
| 支持基数参数 | ✅ | ❌ | ❌ | ❌ |
| 二进制/八进制/十六进制字面量 | ✅ | ❌ | ✅ | ✅ |
| 无效字符 `42 oh no` | `42` | `42`  | `NaN` | `SyntaxError` |
</section>

<h2>你做得怎么样？🧐</h2>

{/* <h4>你还好吗？</h4> */}

<p class="inset">在这么多二进制之后，你需要休息一下吗？<br />切，记住：技能*之后*再休息！<br /><br />点击[我的健身房](/challenges/)去挑战更多吧！💪</p>
````
