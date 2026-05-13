# Translation Candidate
- Slug: intro-to-promises
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/ru/index.mdx
- Validation: deferred
- Runtime seconds: 7.48
- Input tokens: 3468
- Output tokens: 2869
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000966
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Введение в промисы
subTitle: Промисы JavaScript увлекательны!
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
## Promise... Чем они хороши?

Когда вы выполняете любой компьютерный код, существует два возможных исхода: **успех** или **ошибка**.

Если этот код асинхронный, то надежно опираться на результат может быть сложнее.

**`Promise`** предоставляет удобный способ справиться с этим.

```
                        +--Promise---+
                        |            |
                        | <-либо-> |
                        |            |
                <-------+            +-------->
                |Ошибка?             Успех?|
                |                             |
                v                             v
                (Отклонено)           (Исполнено)
```

> Боковая заметка: Хотя Promise должен быть исполнен или отклонён, он может не выполнить ни то, ни другое. Это приводит к зависанию приложений и может быть очень сложно отладить. 

### Откуда берутся Promise?

Часто вам не нужно будет создавать Promise самостоятельно. Встроенные API, такие как `fetch`, и популярные библиотеки, такие как `axios`, уже возвращают Promises.

Однако, если вы всё же должны создать Promise, существует два способа:

### Создание Promise #1/2:

Самый простой способ создания Promise — использовать вспомогательный метод: `Promise.resolve()`.

Вы можете обернуть (или "преобразовать") любое значение в Promise с помощью `Promise.resolve(value)`.

```js
// Без Promise:
function add10(num) {
  return num + 10
}

// С Promise:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Создание Promise #2/2:

Еще более гибкий метод: использование конструктора `Promise`.

`new Promise(callback)` принимает функцию `callback` со следующим интерфейсом:

```js
new Promise(function(resolve, reject) {
  // Аргументы `resolve` и `reject` являются функциями.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` должен быть выполнен, когда промис выполнен
  // `reject(Error)` должен быть выполнен, если промис отклонен
})
```

### API промисов

API промисов на самом деле состоит из небольшого количества методов.

2 метода экземпляра и 4 статических/вспомогательных функции.

#### Методы экземпляра Promise

Получение значений из промиса с помощью обычных методов (например, `console.log(promise)`) не сработает.

Все промисы завершаются либо успешно (через `.then(fn)`), либо с ошибкой (через `.catch(fn)`).

#### Вспомогательные методы промисов

* `Promise.resolve(значение)` - Преобразует любое значение в промис  
* `Promise.reject(Ошибка)` - Создаёт промис с ошибкой, вызывает последующий `.catch()`  
* `Promise.all([...промисы])` - Ждёт завершения всех промисов в массиве  
* `Promise.race([...промисы])` - Завершается при разрешении первого промиса
````
