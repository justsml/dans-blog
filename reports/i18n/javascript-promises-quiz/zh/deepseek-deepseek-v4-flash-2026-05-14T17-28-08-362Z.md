# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/zh/index.mdx
- Validation: deferred
- Runtime seconds: 89.83
- Input tokens: 8624
- Output tokens: 13557
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.005048
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 测验：9道JavaScript Promise题
subTitle: 永不食言！
label: Promise Gotchas
date: '2019-11-26'
modified: '2024-11-28'
tags:
  - promises
  - programming
  - async
  - javascript
  - guides
  - quiz
  - intermediate
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
category: Quiz
unlisted: false
subCategory: JavaScript
cover: ../olav-ahrens-rotne-jvBXiynINGE-resized.webp
cover_mobile: ../w300_olav-ahrens-rotne-jvBXiynINGE-resized.webp
cover_icon: ../icon_olav-ahrens-rotne-jvBXiynINGE-resized.webp
---
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## 你了解 JavaScript Promises 吗？

> * **证明你的 JavaScript 实力！** 🚀

1. **查看提示**（大按钮，底部角落）。
2. 在浏览器控制台中尝试代码（试试快捷键 `F12` 或搜索它），或使用 [repl.it](https://repl.it)*。
3. 欢迎随时 [在 Twitter 上 @我 @justsml](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/)。**我很想听听你的想法！**

### 👇 完成以下 9 道题👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="错误处理"
  title="多个 `.catch` 的用法 #1"
  options={[
    {text: '打印一次消息'},
    {text: '打印两次消息', isAnswer: true},
    {text: '未处理的 Promise 拒绝警告'},
    {text: '进程退出'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        var p = new Promise((resolve, reject) => {
          reject(Error('The Fails!'))
        })
        p.catch(error => console.log(error.message))
        p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    我们使用构造函数方法创建了一个 Promise，并通过 `reject` 回调立即触发了一个错误。

    然后，`.catch` 处理程序的工作方式类似于 DOM 的 `.addEventListener(event, callback)` 或事件发射器的 `.on(event, callback)`，**可以添加多个处理程序回调。** 每个回调都会被调用，并传入相同的参数。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="错误处理"
  title="多个 `.catch` #2"
  options={[
    {text: '打印一次消息'},
    {text: '打印两次消息'},
    {text: '未处理的拒绝的 Promise', isAnswer: true},
    {text: '进程退出'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        var p = new Promise((resolve, reject) => {
          return Promise.reject(Error('The Fails!'))
        })
        p.catch(error => console.log(error.message))
        p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    使用 Promise 构造函数时，必须调用 `resolve()` 或 `reject()` 回调。Promise 构造函数会忽略执行器（executor）的返回值，因此通过 `Promise.reject()` 创建的额外 Promise 并未链接到 `p`。两个处理程序都附加到了 `p` 上，而 `p` 仍处于 pending 状态，同时返回的 rejected Promise 被宿主环境报告为未处理。
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="错误处理"
  title="链式调用 `.then` 和 `.catch`"
  client:only="react"
  options={[
    {text: '打印错误和 `undefined`', isAnswer: true},
    {text: '打印两次错误'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        var p = new Promise((resolve, reject) => {
          reject(Error('The Fails!'))
        })
        .catch(error => console.log(error))
        .then(error => console.log(error))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在链式调用 `.then` 和 `.catch` 时，将它们视为一系列步骤会很有帮助。每个 `.then` 接收前一个 `.then` 返回的值（作为其参数）。但是，如果你的“步骤”遇到错误，任何后续的 `.then` “步骤”将被跳过，直到遇到 `.catch`。如果你想覆盖错误，你只需要返回一个非错误值。它可以通过任何后续的 `.then` 访问。
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="错误处理"
  title="链式调用 `.catch`"
  client:only="react"
  options={[
    {text: '打印一次错误信息', isAnswer: true},
    {text: '打印两次错误信息'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: '进程退出'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        var p = new Promise((resolve, reject) => {
          reject(Error('The Fails!'))
        })
        .catch(error => console.log(error.message))
        .catch(error => console.log(error.message))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    当链式调用 `.catch` 时，每个 `.catch` 只处理前一个 `.then` 或 `.catch` "步骤"中抛出的错误。在这个例子中，第一个 `.catch` 返回了 `console.log`，这只能通过在这两个 `.catch` 之后添加一个 `.then()` 来访问。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="错误处理"
  title="多个 `.catch`"
  options={[
    {text: '打印一次消息'},
    {text: '打印两次消息'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: '什么也不打印', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        new Promise((resolve, reject) => {
            resolve('Success!')
          })
          .then(() => {
            throw Error('Oh noes!')
          })
          .catch(error => {
            return "actually, that worked"
          })
          .catch(error => console.log(error.message))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    **提示：** 可以通过返回一个普通值来忽略（或覆盖）错误。

    这个技巧仅在存在后续的 `.then` 来接收该值时有效。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="数据处理"
  title="`.then` 之间的数据流"
  options={[
    {text: '打印 "Success!" 和 "SUCCESS!"'},
    {text: '打印 "Success!"'},
    {text: '打印 "SUCCESS!"', isAnswer: true},
    {text: '什么也不打印'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        Promise.resolve('Success!')
          .then(data => {
            return data.toUpperCase()
          })
          .then(data => {
            console.log(data)
          })
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    **提示：** `.then` 按顺序传递数据，从 `return value` 到下一个 `.then(value => /* handle value */)`。

    `return` 是将值传递到下一个 `.then` 的关键。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="数据处理"
  title="`.then` 之间的流程"
  options={[
    {text: 'print "SUCCESS!"'},
    {text: 'print "Success!"'},
    {text: 'print "SUCCESS!" and "SUCCESS!"', isAnswer: true},
    {text: 'nothing prints'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        Promise.resolve('Success!')
          .then(data => {
            return data.toUpperCase()
          })
          .then(data => {
            console.log(data)
            return data
          })
          .then(console.log)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    有 2 个 `console.log` 调用会被执行。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="数据处理"
  title="`.then` 之间的流程"
  options={[
    {text: '打印 "SUCCESS!"'},
    {text: '打印 "Success!"'},
    {text: '打印 "SUCCESS!" 和 "SUCCESS!"'},
    {text: '打印 `undefined`', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        Promise.resolve('Success!')
          .then(data => {
            data.toUpperCase()
          })
          .then(data => {
            console.log(data)
          })
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    **提示：** `.then`'s 按顺序传递数据，从 `return value` 到下一个 `.then(value => /* handle value */)`。

    `return` 是将值传递给下一个 `.then` 的关键。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="数据处理"
  title="`.then` 和 `.catch` 之间的流程"
  options={[
    {text: '打印 "哦不！" 和 "失败了！"'},
    {text: '打印 "哦不！"'},
    {text: '打印 "失败了！"', isAnswer: true},
    {text: '打印 "实际上，成功了"'},
    {text: '不打印任何内容'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        Promise.resolve('Success!')
          .then(() => {
            throw Error('Oh noes!')
          })
          .catch(error => {
            return 'actually, that worked'
          })
          .then(data => {
            throw Error('The fails!')
          })
          .catch(error => console.log(error.message))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ![annotated-code/question-9-4.webp](annotated-code/question-9-4.webp)
  </div>
  </slot>
</Challenge>

</QuizUI>
````
