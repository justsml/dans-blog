# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/zh/index.mdx
- Validation: deferred
- Runtime seconds: 51.66
- Input tokens: 14004
- Output tokens: 6208
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.025626
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: JavaScript Date 测验：14 道挑战题
subTitle: 学会这些 JS 冷知识，让你在聚会中脱颖而出！✨
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
> * 无需登录或注册。✨
> * 多选题。🤖 ... _能有多难，对吧？_

### 概览

JavaScript 的 `Date` 类 API 之难用是出了名的。它继承自 Java，我只能推测它的灵感大概源自新石器时代的计时方法。

处理 `Date` 时的痛苦让许多开发者不假思索地转向第三方库。虽然这通常是个稳妥且可靠的选择，但在处理日期格式化或本地化时，这些库其实很少是必需的！

本测试旨在检验（并加深）你对原生 `Date` API 的理解。点击绿色按钮查看提示和解析！希望在挑战结束时，你能彻底掌握 JavaScript 中的 `Date`。

#### **注意：** 假设所有示例均处于 GMT-7 本地时区。


### 👇 下方共有 14 道题 👇
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="处理日期"
  title="Date 构造函数第一部分"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出结果会包含什么？
    ```js
        const d1 = new Date(2020, 1, 1)
        console.log(d1)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    月份参数是从零开始计数的。在使用西历的情况下，范围是 0-11。

    “二月”的索引值是 1。（你可以把它想象成数组查找。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="处理日期"
  title="Date 构造函数第 2 部分"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出结果会包含什么？
    ```js
        const d2 = new Date(2020, 0, 1)
        console.log(d2)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    月份参数是从零开始计数的。在西方历法中，取值范围是 0-11。

    “一月”的索引值为零。（把它想象成数组查找即可。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="处理日期"
  title="Date 构造函数第三部分"
  options={[
    {text: '01 Jan 1970'},
    {text: 'Unix 时间戳 0'},
    {text: '当前日期，UTC/GMT 时区'},
    {text: '当前日期', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出结果会包含什么？
    ```js
        const d3 = Date('Thu, 01 Jan 1970 00:00:00 GMT')
        console.log(d3)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    别忘了 `new` 关键字！`Date` 是一个类，应该使用 `new` 来调用。

    不带 `new` 的 `Date('...')` 会忽略你传入的任何参数。它的表现就像是不带参数调用 `new Date()` 一样，总是返回当前日期和时间的字符串形式。

    这是一个**非常经典且容易被忽视的坑**，即便是在代码审查（code review）中也经常会漏掉。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="处理日期"
  title="Date 构造函数第四部分"
  options={[
    {text: '1969', isAnswer: true},
    {text: '1970'},
    {text: '2019'},
    {text: '2020'},
    {text: '2021'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出结果将包含什么？
    ```js
          const date = new Date(2020)
          console.log(date.getFullYear())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    使用单个整数参数创建的 `Date` 实例会被解释为 Unix `Epoch`（纪元）值。`Epoch` 是指自 1970 年 1 月 1 日以来的毫秒数。

    `2020`（毫秒）这个值会被转换为 1970 年 1 月 1 日之后 2 秒。

    由于我们的本地时区是 -7 小时的负偏移量，最终结果会变成 `Wed Dec 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)`。

    你可以通过使用 [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) 来避开本地时区偏移的影响。
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
    控制台会打印出什么值？
    ```js
          const d1 = new Date('2020-01-01')
          const d2 = new Date('2020-01-01T00:00')
          console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    不包含 `T` 时间值的字符串看起来像是 2020 年 1 月 1 日 —— 但仅包含日期的字符串会被解释为 UTC 时间。当调整到本地时区（例如 GMT-7）时，我们会发现时间仍然停留在 2019 年。

    不带显式时区的日期时间字符串会被解释为本地时间。

    `T00:00` 这种形式会导致第二个值被解释为本地时间的午夜。

    第一个日期被解释为 `Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)`。
    第二个日期被解释为 `Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="处理日期"
  title="格式化 第一部分"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    选择一个 **错误** 的格式化方法：
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `toLocaleFormat()` 方法并不是标准方法！它看起来可能有点眼熟，因为它源自一个古老的第三方库。

    查看 [`toLocaleDateString` 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) 方法。它的行为在 [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) 中有详细说明。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="处理日期"
  title="UTC 日期 第一部分"
  options={[
    {text: 'Wed, 01 Jan 2020 00:00:00 GMT'},
    {text: 'Thu, 02 Jan 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出结果会包含什么？
    ```js
          var date = Date.UTC('2020-01-02T00:00')
          console.log(date.toUTCString())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    你会得到 `TypeError: date.toUTCString is not a function`，因为 [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) 返回的是一个以毫秒为单位的整数，而不是一个日期实例。

    {/* [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) 方法使用的是你的本地偏移量（假设这些问题中本地时区为 GMT-07:00）。
    这意味着它会返回前一年（除夕夜减去 7 小时）。
    而 [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) 方法则会返回我们提供给 `Date.UTC()` 的年份，即 2020。 */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="处理日期"
  title="UTC 日期第 2 部分"
  options={[
    {text: '一个基于 UTC 的日期实例'},
    {text: '一个根据本地时区调整后的日期实例'},
    {text: '自 1970 年 1 月 1 日 GMT 以来的毫秒数', isAnswer: true},
    {text: '一个错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出结果会包含什么？
    ```js
          const d = Date.UTC(2020, 0, 1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    辅助方法 [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) 并不返回日期实例。它返回的是一个表示毫秒数的整数。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="处理日期"
  title="UTC 日期第三部分"
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
    输出结果会包含什么？
    ```js
          // Assume local TZ is -07:00
          const d = new Date(Date.UTC(2020, 0, 1))
          console.log(d.getTimezoneOffset())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Date 对象会隐式地以本地时间呈现，并带有一个（实际上）不会改变的 [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)。

    `Date` 实例并不存储时区数据。它们存储的是自 Unix 纪元（1970 年 1 月 1 日）以来的毫秒数。时区仅在解析日期字符串和渲染时被考虑。默认的显示行为是根据系统或浏览器的区域设置自动确定的。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="处理日期"
  title="Date 设置方法（第一部分）"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出结果会包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setDate(1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) 方法会根据给定实例的当前月份来设置月份中的某一天。

    如果提供的数值超出了该月可用的天数范围，日期实例的月份值将自动调整（例如：在 1 月份执行 `setDate(32)` 将计算为 2 月 1 日）。

    <aside class="hint">`setDate` 用于设置月份中的天数，通常范围在 1-31 之间。</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="处理日期"
  title="Date 设置方法（第二部分）"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出结果会包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) 方法用于设置指定日期实例的月份。

    月份参数是从零开始计数的，取值范围为 0-11（在使用公历的情况下）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="处理日期"
  title="Date 设置方法第三部分"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Jan 01 2021', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出结果会包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(12)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) 方法用于设置指定日期实例的月份。

    `month` 参数是从零开始计数的，在公历中取值范围为 0-11。

    在这里我们可以看到年份被调整到了 2021 年，因为 `setMonth(12)` 比 11（十二月）多出了 1，导致了进位。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="处理日期"
  title="Date 设置方法第四部分"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2021'},
    {text: 'Feb 01 2021', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出结果会包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(13)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) 方法用于设置指定日期实例的月份。

    月份参数是从零开始计算的，范围是 0-11（使用公历）。

    在这里我们可以看到月份和年份被调整到了 2021 年 2 月，因为 `setMonth(13)` 比 11（12月）多了 2。

    <aside class="hint">`setMonth` 通过索引设置月份，12 个月的索引范围是 0-11。</aside>
    <aside class="hint">
    超出 0-11 范围的数字会导致年份向上或向下溢出。例如，`setMonth(13)` 会将年份调整为 2021 年（在 2 月，因为 13 比 11 多了 2）。
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="处理日期"
  title="Date 设置方法第五部分"
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
    输出结果会包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(-1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    <aside class="hint">每个月的天数并不统一，通常在 28 到 31 天之间。</aside>
    <aside class="hint">`setDate` 用于设置月份中的某一天，通常范围是 1-31。负数或任何大于 `31` 的数字都会导致日期和月份发生进位或退位调整，有时结果会出人意料。</aside>
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) 方法用于设置指定日期实例的月份。

    月份参数是从零开始的，范围是 0-11（使用公历）。

    在这里，我们看到月份和年份回退到了 2019 年 12 月，因为 `setMonth(-1)` 小于 0（即 1 月之前的一个月）。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
