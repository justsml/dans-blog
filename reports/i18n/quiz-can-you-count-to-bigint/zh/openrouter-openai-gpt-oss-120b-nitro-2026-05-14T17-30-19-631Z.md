# Translation Candidate
- Slug: quiz-can-you-count-to-bigint
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/zh/index.mdx
- Validation: deferred
- Runtime seconds: 28.13
- Input tokens: 14615
- Output tokens: 6292
- Thinking tokens: unknown
- Cached input tokens: 5376
- Cache write tokens: 0
- Estimated cost: $0.002657
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：你能指望 JavaScript 吗？
subTitle: 了解 `parseInt` 与 `parseFloat` 的区别吗？
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
  group="Warm-up"
  title="Parsing with `parseInt`"
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
    `parseInt` 函数会忽略空格，并将最初的数字序列解析为整数。在这里，它在小数点处停止，所以只返回 `123456`。
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
    {text: '错误'},
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
    一般来说，`parseInt` 在遇到非数字字符时会停止解析。在这里，它在逗号处停止，因此只返回 `123`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="数学"
  title="浮点数精度"
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
    由于浮点数精度误差，`0.1 + 0.2` 并不等于 `0.3`。因为浮点数在内存中的存储方式，结果实际上是 `0.30000000000000004`。导致这一现象的是 IEEE 754 标准，它无法精确表示某些数字。这是所有编程语言都会遇到的常见问题。最终会出现无限循环小数，而无论语言如何，计算机只能在某个点停止追踪无限循环的位数。

    一些语言如 Python 和 Java 提供 `Decimal` 或 `BigDecimal` 来处理这种情况，但 JavaScript 并未内置此功能。可以使用 `big.js` 或 `decimal.js` 等库来解决此类问题。

    （注：某些语言在更高层次上设计了分数、虚数等的处理，能够保留字面表达式。但它们在硬件层面仍然要面对相同的浮点数精度问题。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="数值溢出"
  title="处理 Infinity"
  options={[
    {text: 'Infinity', isAnswer: true},
    {text: 'NaN'},
    {text: '错误'},
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
    因为 `Number.MAX_VALUE` 是 JavaScript 中可表示的最大**常规**数字，超出它的上限会迅速溢出——结果往往毫无意义。将它乘以 `2` 会得到 `Infinity`。

    *你知道的，JavaScript 有时候就是这么玩儿的。*
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
    这段代码会有什么效果？
    ```tsx
        5..toFixed(2)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `.toFixed(2)` 会返回 `5` 的字符串表示，保留两位小数，所以结果是 `"5.00"`。

    双点写法 (`5..toFixed(2)`) 是一种“技巧”，用于访问数字字面量的对象模型。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="比较类型"
  title="`parseInt` 与 `parseFloat` 的相等比较"
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
    在 JavaScript 中，`parseInt` 和 `parseFloat` 都会把字符串 `"42"` 解释为数字 `42`。因此比较 `parseInt("42") === parseFloat("42")` 的结果是 `true`。`parseInt` 会在遇到第一个非数字字符时停止解析，而 `parseFloat` 会一直解析直到遇到不是浮点数一部分的字符。不过因为 `"42"` 中既没有小数点也没有其他非数字字符，两者返回的值完全相同。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="相等性"
  title="使用 BigInt 的相等比较"
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
    `BigInt` 是一种不同于 `number` 的类型，所以 `parseInt("42")`（普通数字）并不严格等于 `BigInt("42")`。要比较，你必须把两者转换到相同类型：`BigInt(parseInt("42")) === BigInt("42")`。
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
    {text: '必须大写: 2A'},
    {text: '错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    这将得到什么结果？
    ```jsx
        parseInt("0x2A") === parseInt("2a", 16)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    任何以 `0x` 开头的输入字符串都会自动被视为十六进制（基数 `16`）。
    因此等同于传入基数 16。所以，`parseInt("0x2A")` 与 `parseInt("2a", 16)` 是一样的。（它不区分大小写。）
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
    这到底是怎么回事？
    ```jsx
        parseInt('0xFF', 16)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `parseInt` 使用十六进制（`16`）基数将 `"FF"` 转换为十进制的 `255`。你可能在 CSS 的 RGB/Hex 颜色代码中见过它。
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
    parseInt 的第二个参数（基数）对应数组方法的 `index` 参数。这会导致意外结果，因为 `parseInt("One", 1)` 因输入无效返回 `NaN`。

    第一个元素 `24` 在基数 0（自动检测）下解析为 `24`，保持不变。第二个元素 `'One'` 在基数 1 下解析为 `NaN`。第三个元素 `42` 使用基数 2 解析。在二进制中，`'42'` 是 `NaN`，所以结果是 `[24, NaN, NaN]`。

    这是 `parseInt` 与 `map` 的常见陷阱。如果想把字符串数组解析为数字，唯一安全的“内置”方法是 `.map(Number)`，或者使用回调 `.map(x => parseInt(x, 10))`。
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
    `Number` 将值转换为数值类型，比 `parseInt` 更严格。在这里，`'Twenty1'` 会变成 `NaN`，而 `0o42` 被识别为八进制字面量，转换为 `34`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="解析"
  title="处理 null"
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
    这段代码的结果会是什么？
    ```jsx
        console.log(parseInt(null), Number(null))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `parseInt` 会先把输入强制转换为字符串，所以 `null` 变成了 `"null"`。由于 `"null"` 中没有有效的十进制字符（普通数字），它会返回 `NaN`。

    `Number(null)` 返回 `0`。因为 JavaScript 总是喜欢让你保持警惕。

    为什么会这样？如果大家感兴趣，我可以进一步深入解释。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="解析"
  title="基数解析"
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
    这个咒语会返回什么结果？
    ```jsx
        parseInt(null, 36)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    由于 `parseInt` 总是将输入强制转换为字符串，`null` 会变成字符串 `"null"`。

    在 36 进制（如果你在意的话，称为 hexatrigesimal）中，字符串 `"null"` 代表 `1112745`。

    `nulk`、`null` 和 `nulm` 的连续值在 36 进制下分别是 `1112744`、`1112745` 和 `1112746`。
  </div>
  </slot>
</Challenge>

</QuizUI>

<section className="scroll-x">
## 比较表

| Function | `parseInt` | `parseFloat` | `Number` | `BigInt` |
| --- | --- | --- | --- | --- |
| Ignores Whitespace | ✅ | ✅ | ✅ | ✅ |
| `.map(FN)`  | ❌ | ☑️ | ✅ | ✅ |
| Supports Radix Arg | ✅ | ❌ | ❌ | ❌ |
| Binary/Octal/Hex literals | ✅ | ❌ | ✅ | ✅ |
| Invalid chars `42 oh no` | `42` | `42`  | `NaN` | `SyntaxError` |
</section>

<h2>你表现如何？ 🧐</h2>

{/* <h4>你还好吗？</h4> */}

<p class="inset">在这么多二进制之后想休息一下吗？<br />噗，记住：技能要先 *休息*！ <br /><br />点击 [我的健身房](/challenges/) 再来挑战几个！ 💪</p>
````
