# Translation Candidate
- Slug: intro-to-promises
- Locale: ru
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2018-08-01--intro-to-promises/ru/index.mdx
- Validation: deferred
- Runtime seconds: 60.68
- Input tokens: 3983
- Output tokens: 12639
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
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
## Promises... в чём их суть?

При выполнении любого программного кода возможны два исхода: **успешное завершение** или **сбой**.

Если код выполняется асинхронно, надёжно опираться на его результат становится сложнее.

**`Promises`** предоставляют удобный способ управления этими состояниями.

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

> Примечание: Хотя `Promise` должен завершиться через `resolve` или `reject`, он может зависнуть в промежуточном состоянии. Это приводит к зависанию приложения, а такие случаи крайне сложно отлаживать.

### Откуда берутся Promises?

В большинстве случаев вам не придётся создавать промисы самостоятельно. Нативные API вроде `fetch` и популярные библиотеки вроде `axios` уже возвращают промисы.

Однако если вам всё же нужно создать промис, есть два способа сделать это:

### Создание промисов #1/2:

Самый простой способ создать промис — использовать вспомогательный метод `Promise.resolve()`.

С помощью `Promise.resolve(value)` можно обернуть (или «конвертировать») любое значение в промис.

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

Более гибкий подход: использование конструктора `Promise`.

`new Promise(callback)` принимает функцию обратного вызова (`callback`) со следующим интерфейсом:

```js
new Promise(function(resolve, reject) {
  // The arguments `resolve` and `reject` are both functions.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` must get executed when the promise is fulfilled
  // `reject(Error)` must get executed if the promise is rejected
})
```

### API промисов

API промисов на самом деле включает лишь небольшой набор методов.

2 метода экземпляра и 4 статических/вспомогательных функции.

#### Методы экземпляра Promise

Извлечь значение из промиса обычными способами (например, `console.log(promise)`) не получится.

Все промисы возвращают либо успех (через `.then(fn)`), либо ошибку (через `.catch(fn)`).

#### Вспомогательные методы Promise

* `Promise.resolve(value)` — преобразует любое значение в промис
* `Promise.reject(Error)` — создаёт промис с ошибкой, запускает последующий `.catch()`
* `Promise.all([...promises])` — ждёт, пока ВСЕ промисы в массиве завершатся
* `Promise.race([...promises])` — разрешается сразу, как только первый промис разрешится
````
