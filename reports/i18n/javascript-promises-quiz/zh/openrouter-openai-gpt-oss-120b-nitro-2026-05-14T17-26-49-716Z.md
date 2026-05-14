# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/zh/index.mdx
- Validation: deferred
- Runtime seconds: 11.24
- Input tokens: 9358
- Output tokens: 4291
- Thinking tokens: unknown
- Cached input tokens: 1280
- Cache write tokens: 0
- Estimated cost: $0.001637
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 测验：9个 JavaScript Promise 问题
subTitle: 再也别丢失 Promise！
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


## 你了解 JavaScript Promise 吗？

> * **证明你的 JavaScript 实力！** 🚀

1. **查看提示**（大按钮，右下角）。
2. 在浏览器的 Console 中运行代码（快捷键 `F12` 或自行搜索）或使用 [repl.it](../https://repl.it)*。
3. 随时 [给我发推 @justsml](../https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/)。**期待看到你的反馈！**

### 👇 完成下面的 9 道题 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="错误处理"
  title="多个 `.catch` #1"
  options={[
    {text: '打印一次信息'},
    {text: '打印两次信息', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: '进程退出'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出会是什么？
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
    我们使用构造函数创建一个 Promise，并立即使用 `reject` 回调触发错误。

    然后 `.catch` 处理器的工作方式类似于 DOM 的 `.addEventListener(event, callback)` 或 Event Emitter 的 `.on(event, callback)`，**可以添加多个处理回调**。每个回调都会收到相同的参数。
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
    下面代码的输出会是什么？
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
    使用 Promise 构造函数时必须调用 `resolve()` 或 `reject()` 回调。构造函数会忽略执行函数的返回值，所以用 `Promise.reject()` 创建的额外 Promise 并没有被链到 `p` 上。两个处理器都附加在 `p` 上，而 `p` 仍处于 pending 状态，导致返回的被拒绝的 Promise 被宿主环境报告为未处理。
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="错误处理"
  title="链式 `.then` 与 `.catch`"
  client:only="react"
  options={[
    {text: '打印错误和 `undefined`', isAnswer: true},
    {text: '打印错误两次'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出会是什么？
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
    在链式调用 `.then` 和 `.catch` 时，最好把它们当作一系列步骤来思考。每个 `.then` 会收到前一个 `.then` 返回的值（作为参数）。但如果某个“步骤”抛出了错误，后续的 `.then` “步骤”都会被跳过，直到遇到 `.catch` 为止。若想覆盖错误，只需返回一个非错误值，后续的任何 `.then` 都可以获取到它。
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="错误处理"
  title="链式 `.catch`"
  client:only="react"
  options={[
    {text: '只打印一次错误信息', isAnswer: true},
    {text: '打印两次错误信息'},
    {text: '出现 UnhandledPromiseRejectionWarning'},
    {text: '进程退出'},
  ]}
>
  <slot name="question">
  <div className="question">
    下面的代码会输出什么？
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
    在链式 `.catch` 时，每个 `.catch` 只会处理前面的 `.then` 或 `.catch` “步骤”中抛出的错误。这个例子里，第一个 `.catch` 返回了 `console.log`，只有在两个 `.catch` 之后再加一个 `.then()` 才能访问到它。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="错误处理"
  title="多个 `.catch`"
  options={[
    {text: '打印一次信息'},
    {text: '打印两次信息'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: '什么也不打印', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出会是什么？
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
    **Hint:** `.catch`'s 可以通过返回普通值来忽略（或覆盖）错误。

    只有在后面有 `.then` 接收该值时，这个技巧才有效。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="处理数据"
  title="`.then` 之间的流动"
  options={[
    {text: '打印 "Success!" 和 "SUCCESS!"'},
    {text: '打印 "Success!"'},
    {text: '打印 "SUCCESS!"', isAnswer: true},
    {text: '什么也不打印'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出会是什么？
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
    **Hint:** `.then` 依次传递数据，从 `return value` 到下一个 `.then(value => /* handle value */)`。

    `return` 是将值传递给下一个 `.then` 的关键。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="处理数据"
  title="`.then` 之间的流动"
  options={[
    {text: '打印 "SUCCESS!"'},
    {text: '打印 "Success!"'},
    {text: '打印 "SUCCESS!" 和 "SUCCESS!"', isAnswer: true},
    {text: '什么也不打印'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出会是什么？
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
    会调用两次 `console.log`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="处理数据"
  title="`.then` 之间的流动"
  options={[
    {text: '打印 "SUCCESS!"'},
    {text: '打印 "Success!"'},
    {text: '打印 "SUCCESS!" 和 "SUCCESS!"'},
    {text: '打印 `undefined`', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    下面的代码会输出什么？
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
    **提示:** `.then` 会顺序传递数据，从 `return value` 到下一个 `.then(value => /* 处理 value */)`。

    `return` 是将值传递给下一个 `.then` 的关键。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="数据处理"
  title="`.then` 与 `.catch` 之间的流程"
  options={[
    {text: '打印 "Oh noes!" 和 "The fails!"'},
    {text: '打印 "Oh noes!"'},
    {text: '打印 "The fails!"', isAnswer: true},
    {text: '打印 "actually, that worked"'},
    {text: '什么也不打印'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出会是什么？
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
