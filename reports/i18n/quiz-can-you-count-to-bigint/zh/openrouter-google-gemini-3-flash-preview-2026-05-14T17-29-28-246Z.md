# Translation Candidate
- Slug: quiz-can-you-count-to-bigint
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/zh/index.mdx
- Validation: deferred
- Runtime seconds: 137.26
- Input tokens: 13732
- Output tokens: 7192
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.028442
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：JavaScript 计数，你真的算得清吗？
subTitle: 分得清 `parseInt` 和 `parseFloat` 吗？
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

<Challenge
  index={0}
  client:visible
  group='类型转换'
  title='数值解析'
  options={[
    { text: '10, 10.5, 10', isAnswer: true },
    { text: 'NaN, NaN, 10', isAnswer: false },
    { text: '10, 10.5, NaN', isAnswer: false },
    { text: '10, 10, 10', isAnswer: false }
  ]}
>
  <slot name="question">
    这段代码会输出什么？

    ```js
    const a = parseInt(' 10px ');
    const b = parseFloat(' 10.5rem ');
    const c = Number(' 10 ');

    console.log(a, b, c);
    ```
  </slot>
  <slot name="explanation">
    `parseInt` 和 `parseFloat` 的容错性较高。它们会修剪前导空格，并从左向右解析，直到遇到第一个非数字字符为止。因此，`parseInt` 在遇到 'p' 时停止，`parseFloat` 在遇到 'r' 时停止。

    相比之下，`Number()` 构造函数更加严格。虽然它也会修剪前导和尾随空格，但如果字符串中包含任何非数字字符（正负号、小数点或科学计数法符号除外），它将直接返回 `NaN`。在本例中，`Number(' 10 ')` 被修剪为 `'10'` 并成功转换。
  </slot>
</Challenge>

<Challenge
  index={1}
  client:visible
  group='类型转换'
  title='进制与基数'
  options={[
    { text: '16, 2, 8', isAnswer: true },
    { text: '0, 10, 10', isAnswer: false },
    { text: '16, 10, 10', isAnswer: false },
    { text: 'NaN, 2, 8', isAnswer: false }
  ]}
>
  <slot name="question">
    这段代码会输出什么？

    ```js
    const x = parseInt('0x10');
    const y = parseInt('10', 2);
    const z = parseInt('10', 8);

    console.log(x, y, z);
    ```
  </slot>
  <slot name="explanation">
    `parseInt` 的行为取决于基数（radix）。
    - 对于 `x`：当字符串以 `0x` 开头且未指定基数时，`parseInt` 会自动将其视为十六进制（base 16）。十六进制的 `10` 等于十进制的 `16`。
    - 对于 `y`：显式指定基数为 `2`（二进制），二进制的 `10` 等于十进制的 `2`。
    - 对于 `z`：显式指定基数为 `8`（八进制），八进制的 `10` 等于十进制的 `8`。

    最佳实践：始终显式传递基数参数，以避免在处理不同格式的输入字符串时产生歧义。
  </slot>
</Challenge>

<Challenge
  index={2}
  client:visible
  group='类型转换'
  title='BigInt 转换'
  options={[
    { text: 'BigInt(10)', isAnswer: false },
    { text: "BigInt('10')", isAnswer: false },
    { text: 'BigInt(null)', isAnswer: true },
    { text: 'BigInt(undefined)', isAnswer: true }
  ]}
>
  <slot name="question">
    以下哪些调用会抛出 `TypeError`？（多选）
  </slot>
  <slot name="explanation">
    `BigInt` 在类型转换方面比 `Number` 更加挑剔。
    - `Number(null)` 会返回 `0`，但 `BigInt(null)` 会抛出 `TypeError`。
    - `Number(undefined)` 会返回 `NaN`，但 `BigInt(undefined)` 同样会抛出 `TypeError`。

    `BigInt` 构造函数要求输入必须能够被清晰地转换为整数。它支持数字和符合整数格式的字符串，但拒绝 `null`、`undefined` 或包含小数点的数字/字符串。
  </slot>
</Challenge>

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身练习"
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
    `parseInt` 函数会忽略空格，并将初始数字序列解析为整数。在本例中，它在遇到小数点时停止解析，因此仅返回 `123456`。
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
    通常情况下，`parseInt` 在遇到非数字字符时会停止解析。在这里，它在逗号处停止，因此仅返回 `123`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="数学"
  title="浮点数的精度问题"
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
    由于浮点数精度误差，`0.1 + 0.2` 并不完全等于 `0.3`。受限于浮点数在内存中的存储方式，计算结果实际上是 `0.30000000000000004`。罪魁祸首是处理浮点运算的 IEEE 754 标准，它无法精确表示某些数字。这是所有编程语言中的常见问题。你最终会遇到无限循环小数，无论使用哪种语言，计算机都必须在某个点停止追踪无限循环的数字。

    某些语言（如 Python 和 Java）提供了 `Decimal` 或 `BigDecimal` 来处理这种情况，但 JavaScript 并没有内置此类功能。你可以使用 `big.js` 或 `decimal.js` 等库来处理这些场景。

    （注：某些语言在设计上可以在更高的逻辑层级处理分数、虚数等，从而保留字面量表达式。但在硬件层面，它们仍然需要面对同样的浮点数精度问题。）
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
    由于 `Number.MAX_VALUE` 是 JavaScript 中所能**表示**的最大常规数值，超出这个限制会迅速导致溢出 —— 基本上你会得到一些毫无意义的结果。将其乘以 `2` 的结果为 `Infinity`。

    *没办法，JavaScript 有时候就是这么任性。*
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
    这段代码的执行结果是什么？
    ```tsx
        5..toFixed(2)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `.toFixed(2)` 返回数字 `5` 保留两位小数后的字符串表示，因此结果是 `"5.00"`。

    双点号（`5..toFixed(2)`）是一种访问数字字面量对象模型的“技巧”，它可以防止解析器将第一个点误认为是小数点。
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
    在 JavaScript 中，`parseInt` 和 `parseFloat` 都会将字符串 `"42"` 解析为数字 `42`。因此，表达式 `parseInt("42") === parseFloat("42")` 的计算结果为 `true`。虽然 `parseInt` 在遇到第一个非数字字符时就会停止解析，而 `parseFloat` 会持续解析直到遇到不属于浮点数组成部分的字符，但由于 `"42"` 中没有小数点或其他非数字字符，这两个函数最终返回了相同的值。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="相等性"
  title="BigInt 的相等性比较"
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
    [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 与 `number` 是不同的类型，因此 `parseInt("42")`（一个常规数字）与 `BigInt("42")` 并不全等。要进行比较，你必须将两者转换为相同的类型：`BigInt(parseInt("42")) === BigInt("42")`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="进制基础"
  title="十六进制解析"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
    {text: '必须是大写：2A'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    这段代码的运行结果是什么？
    ```jsx
        parseInt("0x2A") === parseInt("2a", 16)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    任何以 `0x` 开头的输入字符串都会被“自动魔法”地视为十六进制（基数为 `16`）。因此，它等同于传入基数 16。所以，`parseInt("0x2A")` 与 `parseInt("2a", 16)` 是完全一样的。（它是大小写不敏感的。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="进制基础"
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
    这里是什么情况？
    ```jsx
        parseInt('0xFF', 16)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    使用十六进制（`16`）作为基数的 `parseInt` 会将 `"FF"` 转换为十进制的 `255`。你可能在 CSS 的 RGB/十六进制颜色代码中见过这种用法。
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
    `parseInt` 的第二个参数（基数 radix）恰好与数组方法的 `index` 参数对齐。这会导致意想不到的结果，例如 `parseInt("One", 1)` 会因为无效输入而返回 `NaN`。

    第一个元素 `24` 在基数为 0（自动检测）时被解析为 `24`。第二个元素 `'One'` 在基数为 1 时被解析为 `NaN`。第三个元素 `42` 使用基数 2 进行解析。在二进制（基数 2）中，`'42'` 是无效的，因此结果是 `NaN`。最终结果为 `[24, NaN, NaN]`。

    这是 `parseInt` 和 `map` 结合使用时一个常见的坑。如果你想将字符串数组安全地转换为数字，唯一安全的“内置”方法是使用 `.map(Number)`，或者添加一个回调函数/闭包：`.map(x => parseInt(x, 10))`。
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
    `Number` 在将值转换为数值类型时比 `parseInt` 更严格。在这里，`'Twenty1'` 会变成 `NaN`，而 `0o42` 被识别为八进制字面量并转换为 `34`。
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
    这段代码的执行结果是什么？
    ```jsx
        console.log(parseInt(null), Number(null))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `parseInt` 会将输入强制转换为字符串，因此 `null` 变成了 `"null"`。由于 `"null"` 中不包含任何有效的 10 进制字符（常规数字），它将返回 `NaN`。

    `Number(null)` 则返回 `0`。没办法，JS 就喜欢让你捉摸不透。
    至于为什么？如果大家感兴趣，我以后可能会深入讲解。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="解析"
  title="进制转换的奥秘"
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
    这段代码执行后的结果是什么？
    ```jsx
        parseInt(null, 36)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    由于 `parseInt` 总是会将其输入强制转换为字符串，因此 `null` 会变成字符串 `"null"`。

    在 36 进制（如果你感兴趣的话，这叫 hexatrigesimal）中，字符串 `"null"` 代表数值 `1112745`。

    在 36 进制下，`nulk`、`null` 和 `nulm` 的连续值分别为 `1112744`、`1112745` 和 `1112746`。
  </div>
  </slot>
</Challenge>

</QuizUI>

<section className="scroll-x">
## 对比表

| 功能 | `parseInt` | `parseFloat` | `Number` | `BigInt` |
| --- | --- | --- | --- | --- |
| 忽略空白字符 | ✅ | ✅ | ✅ | ✅ |
| `.map(FN)` 兼容性 | ❌ | ☑️ | ✅ | ✅ |
| 支持进制参数 (Radix) | ✅ | ❌ | ❌ | ❌ |
| 二进制/八进制/十六进制字面量 | ✅ | ❌ | ✅ | ✅ |
| 处理非法字符 `42 oh no` | `42` | `42`  | `NaN` | `SyntaxError` |
</section>

<h2>战况如何？🧐</h2>

{/* <h4>Are you ok?</h4> */}

<p class="inset">被二进制搞晕了想休息一下？<br />别逗了，记住：练完再歇！<br /><br />来 [我的练习场](../challenges/) 挑战更多硬核题目！💪</p>
````
