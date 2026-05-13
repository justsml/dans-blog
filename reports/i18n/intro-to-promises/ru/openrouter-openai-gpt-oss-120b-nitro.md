# Translation Candidate
- Slug: intro-to-promises
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.59
- Input tokens: 3923
- Output tokens: 787
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000295
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-08-01--intro-to-promises/ru/index.mdx reports/i18n/intro-to-promises/ru
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Введение в промисы
subTitle: Промисы в JavaScript — это весело!
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
## Promises... Что это такое?

Когда вы запускаете любой код, существует 2 возможных результата: **успех** или **неудача**.

Если этот код асинхронный, надёжно полагаться на результат сложнее.

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

> Пояснение: хотя промисы должны либо разрешаться, либо отклоняться, они могут не сделать ни того, ни другого. Это приводит к зависанию приложений и трудно отлаживается.

### Откуда берутся Promises?

Много раз вам не понадобится создавать промис вручную. Встроенные API, такие как `fetch`, и популярные библиотеки, например `axios`, уже возвращают промисы.

Однако если всё же нужно создать промис, существует 2 способа:

### Создание промисов #1/2:

Самый простой способ создать промис — воспользоваться вспомогательным методом `Promise.resolve()`.

Любое значение можно «обернуть» (или «преобразовать») в промис с помощью `Promise.resolve(value)`.

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

### Создание промисов #2/2:

Другой, более гибкий способ: использовать конструктор `Promise`.

`new Promise(callback)` принимает функцию `callback` со следующим интерфейсом:

```js
new Promise(function(resolve, reject) {
  // Аргументы `resolve` и `reject` — обе функции.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` должен быть вызван, когда промис выполнен успешно
  // `reject(Error)` должен быть вызван, если промис отклонён
})
```

### API промисов

API промисов на самом деле состоит из небольшого набора методов.

2 методов экземпляра и 4 статических/утилитарных функций.

#### Методы экземпляра Promise

Получить значение из промиса обычными приёмами (например, `console.log(promise)`) не получится.

Все промисы завершаются либо успешно (через `.then(fn)`), либо с ошибкой (через `.catch(fn)`).

#### Утилитарные методы Promise

* `Promise.resolve(value)` — преобразует любое значение в промис
* `Promise.reject(Error)` — создаёт промис‑отклонение, активирует последующий `.catch()`
* `Promise.all([...promises])` — ожидает, пока **все** промисы в массиве завершатся
* `Promise.race([...promises])` — разрешается, как только первый промис завершится успешно
````
