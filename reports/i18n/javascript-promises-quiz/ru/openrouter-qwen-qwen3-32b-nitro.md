# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/ru/index.mdx
- Validation: deferred
- Runtime seconds: 65.78
- Input tokens: 7755
- Output tokens: 7210
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002351
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Тест: 9 вопросов по JavaScript Promise'
subTitle: ''
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
```jsx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Знаете ли вы JavaScript Promises?

> * **Проверьте свои навыки JavaScript!** 🚀

1. **Посмотрите подсказки** (крупная кнопка в углу).
2. Попробуйте код в консоли браузера (нажмите `F12` или найдите её) или воспользуйтесь [repl.it](https://repl.it)*.
3. Не стесняйтесь [написать мне в Твиттер @justsml](https://x.com/intent/tweet?text=Привет%2C%20Дэн%2C%20я%20делаю%20ваш%20тест%20по%20промисам…&url=https://danlevy.net/). **Буду рад услышать ваши мысли!**

### 👇 Завершите 9 вопросов ниже👇
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Обработка ошибок"
  title="Несколько `.catch` #1"
  options={[
    {text: 'вывести сообщение один раз'},
    {text: 'вывести сообщение два раза', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'процесс завершается'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каким будет вывод следующего кода?
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
    Мы создаём Promise с помощью конструктора, сразу вызывая ошибку через callback `reject`.

    Далее `.catch` обработчики работают как `.addEventListener(event, callback)` в DOM или `.on(event, callback)` у Event Emitter, где **можно добавить несколько обработчиков.** Каждый будет вызван с одинаковыми аргументами.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Обработка ошибок"
  title="Несколько `.catch` #2"
  options={[
    {text: 'вывести сообщение один раз'},
    {text: 'вывести сообщение дважды'},
    {text: 'незавершенное отклоненное обещание', isAnswer: true},
    {text: 'процесс завершается'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каким будет вывод следующего кода?
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
    При использовании конструктора Promise вы должны вызвать либо `resolve()`, либо `reject()`. Конструктор Promise игнорирует возвращаемое значение исполнителя, поэтому дополнительное обещание, созданное с `Promise.reject()`, не связано с `p`. Два обработчика прикреплены к `p`, которое остается в состоянии ожидания, а возвращенное отклоненное обещание отображается как незавершенное окружением хоста.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="Обработка ошибок"
  title="Цепочка `.then` и `.catch`"
  options={[
    {text: 'вывести ошибку и `undefined`', isAnswer: true},
    {text: 'вывести ошибку дважды'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каким будет вывод следующего кода?
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
    При цепочке `.then` и `.catch` полезно думать о них как о ряде шагов. Каждый `.then` получает значение, возвращённое предыдущим `.then` (в виде аргумента). Однако, если "шаг" столкнулся с ошибкой, все последующие `.then` "шаги" будут пропущены до тех пор, пока не будет найдён `.catch`. Если вы хотите переопределить ошибку, просто верните неошибочное значение. Оно будет доступно через любой последующий `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="Обработка ошибок"
  title="Цепочка .catch"
  options={[
    {text: 'Вывести сообщение об ошибке один раз', isAnswer: true},
    {text: 'Вывести сообщение об ошибке дважды'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'Процесс завершается'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каким будет вывод следующего кода?
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
    При цепочке .catch каждый обрабатывает только ошибки, возникшие в предыдущих .then или .catch "шагах". В данном примере первый .catch возвращает console.log, который можно было бы использовать только при добавлении .then() после обоих .catch.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Обработка ошибок"
  title="Несколько `.catch`"
  options={[
    {text: 'вывести сообщение один раз'},
    {text: 'вывести сообщение дважды'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'ничего не выведет', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Каким будет вывод следующего кода?
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
    **Подсказка:** `.catch` можно использовать для игнорирования (или переопределения) ошибок, просто вернув обычное значение.

    Этот трюк работает только в том случае, если есть последующий `.then`, который получит значение.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Обработка данных"
  title="Поток между `.then`"
  options={[
    {text: 'вывести \'Success!\' и \'SUCCESS!\''},
    {text: 'вывести \'Success!\''},
    {text: 'вывести \'SUCCESS!\'', isAnswer: true},
    {text: 'ничего не выводит'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой будет вывод следующего кода?
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
    **Подсказка:** `.then` последовательно передают данные, от `return value` к следующему `.then(value => /* handle value */)`.

    Возвращаемое значение ключево для передачи данных следующему `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Обработка данных"
  title="Поток между `.then`"
  options={[
    {text: 'вывести "SUCCESS!"'},
    {text: 'вывести "Success!"'},
    {text: 'вывести "SUCCESS!" и "SUCCESS!"', isAnswer: true},
    {text: 'ничего не вывести'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каким будет вывод следующего кода?
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
    Есть 2 вызова `console.log`, которые будут выполнены.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Обработка данных"
  title="Поток между `.then`"
  options={[
    {text: 'вывести "SUCCESS!"'},
    {text: 'вывести "Success!"'},
    {text: 'вывести "SUCCESS!" и "SUCCESS!"'},
    {text: 'вывести `undefined`', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой будет результат выполнения следующего кода?
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
    **Подсказка:** `.then` последовательно передают данные, от `return value` к следующему `.then(value => /* handle value */)`.

    Ключевое значение имеет `return`, чтобы передать значение следующему `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Обработка данных"
  title="Поток между .then и .catch"
  options={[
    {text: 'выведет \'Oh noes!\' и \'The fails!\''},
    {text: 'выведет \'Oh noes!\''},
    {text: 'выведет \'The fails!\'', isAnswer: true},
    {text: 'выведет \'actually, that worked\''},
    {text: 'ничего не выведет'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой будет вывод следующего кода?
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
