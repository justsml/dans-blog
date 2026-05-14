# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/zh/index.mdx
- Validation: deferred
- Runtime seconds: 180.03
- Input tokens: 13557
- Output tokens: 27020
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.009167
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：14个JavaScript日期问题
subTitle: 学会用JS冷知识在派对上惊艳全场！✨
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

## 你对 `Date` 类的掌握程度如何？

> * **证明你的 JavaScript 技能！** 🚀
> * 无需登录或注册。 ✨
> * 选择题。 🤖 ... _能有多难呢，嗯？_

### 概述

JavaScript 中的 `Date` 类拥有一个出了名难用的 API。它继承自 Java，我只能猜测其灵感来源于远古新石器时代的计时方法。

为了搞定 `Date`，许多开发者不加思考地使用第三方库。虽然这些库通常是安全可靠的选择，但在格式化日期或本地化时，它们很少是必需的！

本测验旨在测试（并加深）你对原生 `Date` API 的理解。使用绿色按钮获取提示和解释！希望完成挑战后，你能巩固对 JavaScript 中 `Date` 的理解。

#### **注意：** 所有示例均假设本地时区为 GMT-7。

### 👇 以下 14 道题 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="处理日期"
  title="日期构造函数 第一部分"
  options={[
    {text: '2020年1月1日'},
    {text: '2020年2月1日', isAnswer: true},
    {text: 'RangeError: 无效参数。'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出将包含什么？
    ```js
        const d1 = new Date(2020, 1, 1)
        console.log(d1)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    月份参数是从零开始的。范围是0-11（使用西方日历）。

    '二月' 的索引值为1。（可以把它想象成数组查找。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="处理日期"
  title="Date 构造函数 第二部分"
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
    月份参数是从零开始的。范围是0-11（使用西方历法）。

    '一月' 的索引值为零。（可以把它想象成数组查找。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="处理日期"
  title="Date 构造函数 第三部分"
  options={[
    {text: '1970年1月1日'},
    {text: 'Unix 纪元 0'},
    {text: '当前日期（UTC/GMT）'},
    {text: '当前日期', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: 无效参数。'},
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
    别忘了 `new` 关键字！`Date` 是一个类，应该用 `new` 来调用。

    `Date('...')` 不带 `new` 会忽略你传入的参数。它似乎总是产生当前日期和时间，就像 `new Date()`（无参数）一样。

    这是一个**常见的陷阱**，在代码审查中**很容易被忽视**。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="处理日期"
  title="日期构造函数 第4部分"
  options={[
    {text: '1969', isAnswer: true},
    {text: '1970'},
    {text: '2019'},
    {text: '2020'},
    {text: '2021'},
    {text: 'RangeError: 无效参数。'},
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
    使用单个整数参数创建的 Date 实例会被解释为 Unix `Epoch` 值。`Epoch` 是从 1970 年 1 月 1 日开始的毫秒数。

    `2020`（毫秒）的值表示 1970 年 1 月 1 日之后的 2 秒。

    由于我们的本地时区是负偏移 -7 小时，最终得到 `Wed Dec 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)`。

    你可以通过使用 [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) 来避开本地时区偏移。
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
    没有 `T` 时间值的字符串可能看起来像是 2020 年 1 月 1 日 - 但仅包含日期的字符串会被解释为 UTC 时间，当调整到我们的本地时区（GMT-7）时，我们发现仍然处于 2019 年。

    Date-time strings without an explicit timezone are interpreted in local time.

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
    选择一个 _不正确_ 的格式化方法：
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    方法 `toLocaleFormat()` 不是标准方法！它可能看起来很眼熟，因为它来自一个古老的第三方库。

    查看 [`toLocaleDateString` 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) 方法。它的行为在 [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) 中有文档说明。
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
    输出会包含什么？
    ```js
          var date = Date.UTC('2020-01-02T00:00')
          console.log(date.toUTCString())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    你会得到 `TypeError: date.toUTCString is not a function`，因为 [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) 返回的是毫秒整数，而不是日期实例。

    {/* [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) 方法使用你的本地偏移（假设这些问题的时区为 GMT-07:00）。
    这意味着它会给出前一年（新年前夜减7小时）。
    [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) 方法会给出我们提供给 `Date.UTC()` 的年份，即2020。
    */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="处理日期"
  title="UTC 日期 第二部分"
  options={[
    {text: '一个基于 UTC 的日期实例'},
    {text: '一个调整为本地时区的日期实例'},
    {text: '自 1970 年 1 月 1 日 GMT 以来的毫秒数', isAnswer: true},
    {text: '一个错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出将包含什么？
    ```js
          const d = Date.UTC(2020, 0, 1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    辅助方法 [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) 不返回日期实例。它返回一个以毫秒为单位的整数。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="处理日期"
  title="UTC 日期 第3部分"
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
    Date 实例会隐式地以本地时间呈现，并带有（实际上）不变的 [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)。

    `Date` 实例不存储时区数据。它们存储自 Unix 纪元（1970年1月1日）以来的毫秒数。时区在日期字符串解析和渲染时被考虑。默认显示行为由系统或浏览器的区域设置自动决定。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="处理日期"
  title="日期设置器 第1部分"
  options={[
    {text: '2020年1月1日', isAnswer: true},
    {text: '2020年2月1日'},
    {text: 'RangeError: 无效参数。'},
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
    The [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) 方法根据当前实例的月份设置日期（一个月中的第几天）。

    如果提供的值超出了该月的天数范围，日期实例的月份值会被调整（例如，在1月调用 `setDate(32)` 会计算出2月1日）。

    <aside class="hint">`setDate` 设置月份中的日期，通常范围是1-31。</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="处理日期"
  title="日期设置器 第二部分"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: 无效参数。'},
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
    [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) 方法设置给定日期实例的月份。

    月份参数是从零开始的，范围是0-11（使用西方日历。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="处理日期"
  title="日期设置器 第3部分"
  options={[
    {text: '一月 01 2020'},
    {text: '一月 01 2021', isAnswer: true},
    {text: '二月 01 2020'},
    {text: 'RangeError: 无效参数。'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出将包含什么？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(12)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) 方法设置给定日期实例的月份。

    `month` 参数是从零开始的，范围是0-11（使用西方日历）。

    这里我们看到年份被调整为2021，因为 `setMonth(12)` 比11（十二月）多1。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="处理日期"
  title="日期设置器 第4部分"
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
    The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) 方法用于设置给定日期实例的月份。

    月份参数是从零开始的，范围是0-11（使用西方日历）。

    这里我们看到月份和年份被调整为2021年2月，因为 `setMonth(13)` 比11（12月）多2。

    <aside class="hint">`setMonth` 通过索引设置月份，12个月份的索引为0-11。 </aside>
    <aside class="hint">
    超出0-11范围的数字会导致年份溢出或下溢。例如，`setMonth(13)` 会将年份调整为2021年（2月，因为13比11多2）。
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
    <aside class="hint">月份的天数不统一，范围在28到31天之间。</aside>
    <aside class="hint">`setDate` 设置月份中的日期，通常范围是1-31。负数或大于31的数字会导致日期和月份调整，有时会以令人惊讶的方式。</aside>
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) 方法设置给定日期实例的月份。

    月份参数是从零开始的，范围是0-11（使用西方日历）。

    这里我们看到月份和年份回滚到2019年12月，因为 `setMonth(-1)` 小于0（一月）。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
