# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/zh/index.mdx
- Validation: deferred
- Runtime seconds: 124.43
- Input tokens: 8735
- Output tokens: 4241
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.017091
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 测验：9 道 JavaScript Promise 题目
subTitle: 别再遗漏任何 Promise。
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## 你真的懂 JavaScript Promise 吗？

> * **来秀出你的 JavaScript 实力！** 🚀

1. **查看提示**（右下角的大按钮）。
2. 在浏览器的控制台中尝试运行代码（快捷键 `F12`）或使用 [repl.it](https://repl.it)*。
3. 欢迎随时 [在 Twitter/X 上 @justsml 联系我](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/)。**我很想听听你的想法！**

### 👇 完成以下 9 道题目 👇
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="错误处理"
  title="多个 `.catch` #1"
  options={[
    {text: '打印一次消息'},
    {text: '打印两次消息', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: '进程退出'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出结果是什么？
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

    随后，`.catch` 处理程序的行为类似于 DOM 的 `.addEventListener(event, callback)` 或 Event Emitter 的 `.on(event, callback)`，即**可以添加多个处理程序回调**。每个回调都会接收到相同的参数并被调用。
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
    {text: '未处理的被拒绝的 Promise', isAnswer: true},
    {text: '进程退出'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出结果是什么？
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
    在使用 Promise 构造函数时，你必须调用 `resolve()` 或 `reject()` 回调。Promise 构造函数会忽略执行器（executor）的返回值，因此通过 `Promise.reject()` 创建的额外 Promise 并未链接到 `p`。这两个处理程序被附加到了 `p` 上，而 `p` 仍处于 pending 状态，与此同时，返回的那个被拒绝的 Promise 会被宿主环境报告为未处理。
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
    {text: '打印 error 和 `undefined`', isAnswer: true},
    {text: '打印两次 error'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出结果是什么？
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
    在链式调用 `.then` 和 `.catch` 时，将它们想象成一系列步骤会很有帮助。每个 `.then` 都会接收上一个 `.then` 返回的值（作为其参数）。但是，如果你的某个“步骤”遇到了错误，后续的所有 `.then` 步骤都将被跳过，直到遇到 `.catch`。如果你想覆盖错误并继续执行，只需返回一个非错误值即可。该值可以通过后续的任何 `.then` 访问。
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
    以下代码的输出结果是什么？
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
    在链式调用 `.catch` 时，每个 `.catch` 只负责处理在其之前的 `.then` 或 `.catch` “步骤”中抛出的错误。在这个例子中，第一个 `.catch` 执行了 `console.log` 并返回了其结果，而这个结果只能通过在两个 `.catch` 之后添加 `.then()` 来获取。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="错误处理"
  title="多个 `.catch` 链式调用"
  options={[
    {text: '打印一次消息'},
    {text: '打印两次消息'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: '没有任何输出', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出结果是什么？
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
    **提示：** `.catch` 可以通过返回一个普通值来忽略（或覆盖）错误。

    这个技巧只有在后面跟着一个 `.then` 来接收该值时才有效。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="处理数据"
  title="`.then` 之间的数据流"
  options={[
    {text: '打印 "Success!" 和 "SUCCESS!"'},
    {text: '打印 "Success!"'},
    {text: '打印 "SUCCESS!"', isAnswer: true},
    {text: '什么都不打印'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出结果是什么？
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
    **提示：** `.then` 会按顺序传递数据，从 `return value` 传递到下一个 `.then(value => /* 处理 value */)`。

    为了将值传递给下一个 `.then`，`return` 关键字是必不可少的。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="处理数据"
  title=".then 链式调用中的流转"
  options={[
    {text: '打印 "SUCCESS!"'},
    {text: '打印 "Success!"'},
    {text: '打印 "SUCCESS!" 和 "SUCCESS!"', isAnswer: true},
    {text: '无输出'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出结果是什么？
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
    代码中会有两次 `console.log` 调用被执行。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="处理数据"
  title="`.then` 链式调用中的数据流"
  options={[
    {text: '打印 "SUCCESS!"'},
    {text: '打印 "Success!"'},
    {text: '打印 "SUCCESS!" 和 "SUCCESS!"'},
    {text: '打印 `undefined`', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出结果是什么？
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
    **提示：** `.then` 会按顺序传递数据，从 `return value` 传递到下一个 `.then(value => /* 处理 value */)`。

    为了将值传递给下一个 `.then`，`return` 语句是关键。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="处理数据"
  title=".then 和 .catch 之间的流转"
  options={[
    {text: '打印 "Oh noes!" 和 "The fails!"'},
    {text: '打印 "Oh noes!"'},
    {text: '打印 "The fails!"', isAnswer: true},
    {text: '打印 "actually, that worked"'},
    {text: '什么都不打印'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出结果是什么？
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
