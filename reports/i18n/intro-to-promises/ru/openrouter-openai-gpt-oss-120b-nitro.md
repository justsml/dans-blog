# Translation Candidate
- Slug: intro-to-promises
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/ru/index.mdx
- Validation: deferred
- Runtime seconds: 1.65
- Input tokens: 4224
- Output tokens: 779
- Thinking tokens: unknown
- Cached input tokens: 1920
- Cache write tokens: 0
- Estimated cost: $0.000305
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Введение в промисы
subTitle: JavaScript‑промисы — это весело!
date: '2018-08-01'
modified: '2024-07-31'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - javascript
  - composition
related:
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
cover: ../joe-yates-480485-unsplash.webp
cover_mobile: ../w300_joe-yates-480485-unsplash.webp
cover_icon: ../icon_joe-yates-480485-unsplash.webp
---
##Что такое Promises и зачем они нужны?

Когда вы запускаете любой код, существует 2 возможных результата: **успех** или **неудача**.

Если код асинхронный, полагаться на результат сложнее.

**`Promises`** предоставляют удобный способ справиться с этим.

```
                        +--Promise---+
                        |            |
                        | <-either-> |
                        |            |
                <-------+            +-------->
                |Failure?             Success?|
                |                             |
                v                             v
                (Rejected)           (Resolved)
```

> Замечание: хотя обещания должны либо разрешаться, либо отклоняться, они могут не сделать ни того, ни другого. Это приводит к зависанию приложений и трудно отлаживается.

### Откуда берутся Promises?

Много развам не придётся создавать обещание вручную. Встроенные API, такие как `fetch`, и популярные библиотеки вроде `axios` уже возвращают Promises.

Однако если всё же нужно создать обещание, существует 2 способа сделать это:

### Создание Promises #1/2:

Самый простой способ создать Promise — это вспомогательный метод `Promise.resolve()`.

Любое значение можно «обернуть» (или «преобразовать») в Promise с помощью `Promise.resolve(value)`.

```js
// Without Promises:
function add10(num) {
  return num + 10
}

// With Promises:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Создание Promises #2/2:

Другой, более гибкий способ: использовать конструктор `Promise`.

`new Promise(callback)` принимает функцию `callback` со следующим интерфейсом:

```js
new Promise(function(resolve, reject) {
  // Аргументы `resolve` и `reject` — обе функции.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` должен вызываться, когда промис выполнен успешно
  // `reject(Error)` должен вызываться, если промис отклонён
})
```

### API промисов

API промисов на самом деле состоит из небольшого набора методов.

2 методов экземпляра и 4 статических/утилитных функций.

#### Методы экземпляра Promise

Доступ к значениям промиса не получится получить обычными приёмами (например, `console.log(promise)`).

Все промисы завершаются либо успешно (через `.then(fn)`), либо с ошибкой (через `.catch(fn)`).

#### Утилитные методы Promise

* `Promise.resolve(value)` — преобразует любое значение в промис
* `Promise.reject(Error)` — создаёт промис‑ошибку, активирует последующий `.catch()`
* `Promise.all([...promises])` — ожидает, пока **все** промисы в массиве завершатся
* `Promise.race([...promises])` — завершается, как только первый промис из массива выполнится
````
