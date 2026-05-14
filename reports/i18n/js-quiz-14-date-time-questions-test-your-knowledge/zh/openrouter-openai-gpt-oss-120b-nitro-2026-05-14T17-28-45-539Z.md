# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/zh/index.mdx
- Validation: deferred
- Runtime seconds: 29.72
- Input tokens: 14578
- Output tokens: 7810
- Thinking tokens: unknown
- Cached input tokens: 2944
- Cache write tokens: 0
- Estimated cost: $0.002543
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：14 道 JavaScript 日期题目
subTitle: 在聚会中用 JavaScript 小知识赢得赞叹！ ✨
label: Dates & Times
date: '2020-01-02'
modified: '2024-11-27'
tags:
  - quiz
  - javascript
  - date
  - date
  - gotchas
  - challenge
  - intermediate
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
cover: ../pocket-watch.webp
cover_mobile: ../w300_pocket-watch.webp
cover_icon: ../icon_pocket-watch.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

## 你对 `Date` 类了解多少？

> * **证明你的 JavaScript 实力！** 🚀  
> * 无需登录或注册。 ✨  
> * 多项选择。 🤖 … _这能有多难呢？_

### 大纲

JavaScript 中的 `Date` 类 API 众所周知地难以使用。它是从 Java 继承而来，我只能猜测它的灵感来源于古代新石器时代的计时方法。

对 `Date` 的困惑让许多开发者理所当然地去使用第三方库。虽然这些库往往安全可靠，但在日期格式化或本地化方面其实很少真的必需！

本测验旨在检验（并加深）你对原生 `Date` API 的掌握。使用绿色按钮获取提示与解释！希望在挑战结束时，你已经对 JavaScript 中的 `Date` 有了扎实的认识。

#### **注意：** 所有示例均假设本地时区为 GMT‑7。

### 👇 以下 14 道题 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="日期处理"
  title="Date 构造函数 第 1 部分"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么内容？
    ```js
        const d1 = new Date(2020, 1, 1)
        console.log(d1)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    月份参数是从零开始计数的，范围为 0‑11（使用西方日历）。

    “February”的索引值是 1。（把它想象成数组查找。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="日期处理"
  title="日期构造函数 第2 部分"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
        const d2 = new Date(2020, 0, 1)
        console.log(d2)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    月份参数是从零开始计数的，范围为 0-11（使用西方日历）。

    “January”的索引值是零。（把它想象成数组查找。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="日期处理"
  title="Date 构造函数 第三部分"
  options={[
    {text: '1970年1月1日'},
    {text: 'Unix 纪元 0'},
    {text: '当前日期（UTC/GMT）'},
    {text: '当前日期', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: 参数无效。'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
        const d3 = Date('Thu, 01 Jan 1970 00:00:00 GMT')
        console.log(d3)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    别忘了 `new` 关键字！`Date` 是一个类，应该使用 `new` 来调用。

    `Date('...')` 如果不加 `new` 会忽略你传入的内容。它看起来总是会产生 `new Date()`（不带参数）的当前日期和时间。

    这是一种 **常见的陷阱**，**很容易被忽视**，即使在代码审查时也是如此。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="处理日期"
  title="Date 构造函数 第4部分"
  options={[
    {text: '1969', isAnswer: true},
    {text: '1970'},
    {text: '2019'},
    {text: '2020'},
    {text: '2021'},
    {text: 'RangeError: 参数无效。'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
          const date = new Date(2020)
          console.log(date.getFullYear())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    使用单个整数参数创建的 Date 实例会被解释为 Unix `Epoch` 值。`Epoch` 是自 1970 年 1 月 1 日起的毫秒计数。

    `2020`（毫秒）对应于 1970 年 1 月 1 日后 2 秒。

    由于我们的本地时区是 -7 小时的负偏移，最终得到 `Wed Dec 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)`。

    你可以通过使用 [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) 来规避本地时区偏移。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="处理日期"
  title="日期字符串解析"
  options={[
    {text: '2019 2020', isAnswer: true},
    {text: '2020 2021'},
    {text: '2020 2020'},
    {text: '2020 2019'},
  ]}
>
  <slot name="question">
  <div className="question">
    控制台会打印什么值？
    ```js
          const d1 = new Date('2020-01-01')
          const d2 = new Date('2020-01-01T00:00')
          console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    没有 `T` 时间值的字符串看起来像是 2020 年 1 月 1 日——但仅日期字符串会被解释为 UTC，转换到我们的本地时区（GMT-7）后仍然是 2019 年。

    没有显式时区的日期时间字符串会按本地时间解释。

    `T00:00` 形式会导致第二个值被解释为本地午夜。

    第一个日期被解释为 `Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)`。
    第二个日期被解释为 `Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="处理日期"
  title="格式化 第1部分"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    选择一个 _不正确_ 的格式化方法：
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    方法 `toLocaleFormat()` 并非标准！它可能看起来很熟悉，因为它来自古老的第三方库。

    查看 [`toLocaleDateString` 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) 方法。它的行为在 [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) 中有文档说明。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="处理日期"
  title="UTC 日期 第1部分"
  options={[
    {text: 'Wed, 01 Jan 2020 00:00:00 GMT'},
    {text: 'Thu, 02 Jan 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
          var date = Date.UTC('2020-01-02T00:00')
          console.log(date.toUTCString())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    你会得到 `TypeError: date.toUTCString is not a function`，因为 [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) 返回的是毫秒数的整数，而不是 Date 实例。

    {/* `getFullYear()` 方法使用本地时区偏移（这些题目假设为 GMT-07:00），因此会返回前一年（新年夜提前 7 小时）。`getUTCFullYear()` 方法会返回我们传给 `Date.UTC()` 的年份，即 2020。 */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="日期处理"
  title="UTC 日期（第二部分）"
  options={[
    {text: '基于 UTC 的日期实例'},
    {text: '已根据本地时区调整的日期实例'},
    {text: '自 1970 年 1 月 1 日 GMT 起的毫秒数', isAnswer: true},
    {text: '一个错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
          const d = Date.UTC(2020, 0, 1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    辅助方法 [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) 并不返回日期实例，而是返回以毫秒为单位的整数。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="处理日期"
  title="UTC 日期 第三部分"
  options={[
    {text: '0'},
    {text: '420', isAnswer: true},
    {text: '700'},
    {text: '1400'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
          // Assume local TZ is -07:00
          const d = new Date(Date.UTC(2020, 0, 1))
          console.log(d.getTimezoneOffset())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Date 会隐式地以本地时间呈现，且 [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) 基本保持不变。

    `Date` 实例不存储时区数据。它们存储自 Unix 纪元（Jan 1, 1970）以来的毫秒数。时区在 Date String 解析与渲染时被考虑。默认的显示行为会根据系统或浏览器的语言/地区设置自动确定。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="处理日期"
  title="日期设置器 第1部分"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setDate(1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `.setDate()` 方法会根据给定实例当前的月份设置月份中的天数。

    如果提供的值超出了该月的天数范围，日期实例的月份会相应调整（例如，在一月调用 `setDate(32)` 会被计算为二月 1 日）。

    <aside class="hint">`setDate` 设置月份中的天数，通常取值范围为 1‑31。</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="处理日期"
  title="日期设置器（第二部分）"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) 方法设置给定日期实例的月份。

    月份参数是从零开始的，取值范围为 0-11（使用西方日历）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="处理日期"
  title="日期设置器 第三部分"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Jan 01 2021', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(12)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) 方法用于设置给定日期实例的月份。

    `month` 参数是从零开始的，取值范围为 0-11（使用西方日历）。

    这里可以看到年份被调整为 2021，因为 `setMonth(12)` 超过了 11（即 12 月）1。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="处理日期"
  title="日期设置器 第4部分"
  options={[
    {text: '2020年1月01日'},
    {text: '2020年2月01日'},
    {text: '2021年1月01日'},
    {text: '2021年2月01日', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(13)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `.setMonth()` 方法会设置给定 Date 实例的月份。

    月份参数是从 0 开始计数的，取值范围为 0‑11（使用西方日历）。

    这里我们看到月份和年份被调整为 2021 年 2 月，因为 `setMonth(13)` 超过了 11（12 月）两个月。

    <aside class="hint">`setMonth` 按索引设置月份，12 个月的索引范围是 0‑11。</aside>
    <aside class="hint">
    超出 0‑11 范围的数字会导致年份溢出或下溢。例如，`setMonth(13)` 会把年份调到 2021 年（因为 13 比 11 多 2，指向 2 月）。
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="处理日期"
  title="日期设置器 第5部分"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2019'},
    {text: 'Dec 01 2019', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出会包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(-1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    <aside class="hint">月份长度不统一，范围在 28 到 31 天之间。</aside>
    <aside class="hint">`setDate` 设置月份中的天数，通常在 1‑31 范围内。负数以及大于 `31` 的数字会导致日期和月份自动调整，有时会出乎意料。</aside>
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `.setMonth()` 方法设置给定 Date 实例的月份。

    月份参数是从零开始的，取值范围为 0‑11（使用西方历法）。

    这里可以看到月份和年份回滚到 2019 年 12 月，因为 `setMonth(-1)` 小于 0（即在一月之前）。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
