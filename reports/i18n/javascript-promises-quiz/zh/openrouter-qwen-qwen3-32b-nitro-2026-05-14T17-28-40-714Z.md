# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/zh/index.mdx
- Validation: deferred
- Runtime seconds: 25.79
- Input tokens: 8723
- Output tokens: 7298
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002983
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 测验：9 个 JavaScript Promise 问题
subTitle: 再也不会遗漏Promise
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


## 你了解 JavaScript 的 Promise 吗？🚀

> * **证明你的 JavaScript 技能！🚀**

1. **查看提示**（底部角落的大按钮）。
2. 在浏览器的控制台中尝试代码（快捷键 `F12` 或搜索它）或使用 [repl.it](https://repl.it)*。
3. 请随时 [在 X 上给我发推文 @justsml](https://x.com/intent/tweet?text=嘿%20Dan%2C%20我%20正在参加你的 promises 测验&url=https://danlevy.net/)。**我非常想听听你的想法！**

### 👇 完成下面的 9 个问题 👇
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="处理错误"
  title="多个 `.catch` #1"
  options={[
    {text: '打印消息一次'},
    {text: '打印消息两次', isAnswer: true},
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
        p.catch(error => console.log(error.message))
        p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    我们使用构造函数方法创建一个Promise，通过`reject`回调立即触发错误。

    然后`.catch`处理器的工作方式类似于DOM的`.addEventListener(event, callback)`或Event Emitter的`.on(event, callback)`，**可以添加多个处理回调函数**。每个回调都会收到相同的参数。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="错误处理"
  title="多个 `.catch` 的情况 #2"
  options={[
    {text: '打印消息一次'},
    {text: '打印消息两次'},
    {text: '未处理的被拒绝的Promise', isAnswer: true},
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
    使用 Promise 构造函数时，必须调用 `resolve()` 或 `reject()` 回调。Promise 构造函数会忽略执行器的返回值，因此通过 `Promise.reject()` 创建的额外 Promise 并未链接到 `p`。两个处理程序附加到 `p` 上，而 `p` 保持挂起状态，返回的被拒绝的 Promise 会被主机环境报告为未处理。
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="处理错误"
  title="链接`.then`和`.catch`"
  client:only="react"
  options={[
    {text: '打印错误和`undefined`', isAnswer: true},
    {text: '打印错误两次'},
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
    在链接`.then`和`.catch`时，可以将它们视为一系列步骤。每个`.then`会接收前一个`.then`返回的值（作为其参数）。然而，如果某个“步骤”遇到错误，后续的所有`.then`“步骤”都会被跳过，直到遇到`.catch`。如果想覆盖错误，只需返回一个非错误值，该值可以通过后续的任何`.then`访问。
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="处理错误"
  title="链式`.catch`"
  client:only="react"
  options={[
    {text: '打印错误信息一次', isAnswer: true},
    {text: '打印错误信息两次'},
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
    当链式使用`.catch`时，每个`.catch`只会处理前一个`.then`或`.catch`步骤中抛出的错误。在这个例子中，第一个`.catch`返回了`console.log`，但必须通过在两个`.catch`之后添加`.then()`才能访问到它。
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
    {text: '不打印任何内容', isAnswer: true},
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
    **提示：** `.catch` 可以通过返回普通值来忽略（或覆盖）错误。

    这个技巧只有在后续有 `.then` 接收返回值时才有效。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="处理数据"
  title="`.then`之间的流程"
  options={[
    {text: '打印 "Success!" 和 "SUCCESS!"'},
    {text: '打印 "Success!"'},
    {text: '打印 "SUCCESS!"', isAnswer: true},
    {text: '不打印任何内容'},
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
    **提示：** `.then` 依次传递数据，从 `return value` 到下一个 `.then(value => /* handle value */)`。

    `return` 是关键，以便将值传递给下一个 `.then`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="数据处理"
  title="`.then`之间的流程"
  options={[
    {text: '打印 "SUCCESS!"'},
    {text: '打印 "Success!"'},
    {text: '打印 "SUCCESS!" 和 "SUCCESS!"', isAnswer: true},
    {text: '没有输出'},
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
    有两个 `console.log` 调用将被执行。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="数据处理"
  title="`.then`之间的流程"
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
    **提示：** `.then` 会按顺序传递数据，从 `return value` 到下一个 `.then(value => /* handle value */)`。

    要传递值到下一个 `.then`，`return` 是关键。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="处理数据"
  title="`.then`和`.catch`之间的流程"
  options={[
    {text: '打印“Oh noes!”和“The fails!”'},
    {text: '打印“Oh noes!”'},
    {text: '打印“The fails!”', isAnswer: true},
    {text: '打印“actually, that worked”'},
    {text: '没有任何输出'},
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
