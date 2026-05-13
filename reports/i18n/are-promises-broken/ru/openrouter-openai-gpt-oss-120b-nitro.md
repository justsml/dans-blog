# Translation Candidate
- Slug: are-promises-broken
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-06--are-promises-broken/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 5.07
- Input tokens: 9492
- Output tokens: 2683
- Thinking tokens: unknown
- Cached input tokens: 5248
- Cache write tokens: 0
- Estimated cost: $0.000853
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-10-06--are-promises-broken/ru/index.mdx reports/i18n/are-promises-broken/ru
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Нарушенные обещания?
unlisted: true
subTitle: 'Пропуск ошибок, потеря результатов…'
date: '2018-10-06'
modified: '2024-12-11'
tags:
  - promises
  - javascript
  - errors
  - programming
category: Code
subCategory: promises
cover: ../lennart-heim-766366-unsplash.webp
cover_mobile: ../w300_lennart-heim-766366-unsplash.webp
cover_icon: ../icon_lennart-heim-766366-unsplash.webp
---
## JavaScript‑промисы сломаны?

### В старые времена

Один из самых распространённых мифов о промисах — это **якобы** их недостатки в обработке ошибок.

**Много лет назад** промисы _были_ действительно ужасны в работе с ошибками. **Много усилий было вложено в их исправление.**

> И вот, **это было исправлено**, даже **широко развернуто**.

#### Люди ликовали

И,к сожалению, некоторые этого не заметили.

### Современные времена

Миф всё ещё жив, я вижу его повсюду: [популярные статьи на Medium](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9), [на DZone](#redacted) и [многие](https://medium.com/@avaq/broken-promises-2ae92780f33) другие источники.

Признаюсь, даже «официальные» ресурсы и документация часто приводят [хлипкие примеры и плохие привычки](../promise-gotchas/). Их используют, чтобы «доказать» аргументы против промисов. Некоторые даже предлагают «лекарства», которые только ухудшают ситуацию. (примечание: ссылка удалена)

<!-- One such tip I've seen multiple times: is to never use `.catch`, and instead use an `"unhandledRejection"` global event. **NEVER** do this. unhandledRejection is designed for cleanup of global references, like database connections, before an impending shutdown.) -->

<br />
<br />

## Правила, чтобы не попасть в беду

1. [Промисам нужно, за что держаться](#1-promises-need-something-to-hang-on-to)
    * **Всегда** `return` из ваших функций.
1. [Используйте реальные экземпляры `Error`](#2-use-real-error-instances)
    * **Всегда** используйте экземпляры `Error`.
1. [Обрабатывайте ошибки там, где это имеет смысл](#3-handle-errors-where-it-makes-sense)
    * **Всегда** используйте `.catch()`, хотя бы один раз.
1. [Добавляйте ясность с именованными функциями 🦄✨](#4-add-clarity-with-named-functions-)
    * __Предпочитайте__ именованные функции.

-------------------------------------------

#### #1 Промисам нужно, за что держаться

Крайне важно, чтобы вы **всегда `return`** из своих функций.

Функции‑обратные вызовы промиса следуют определённому шаблону в `.then(callback)` и `.catch(callback)`.

Каждое возвращённое значение передаётся в колбэк следующего `.then()`.

```js
function addTen(number) {
  return number + 10;
}

Promise.resolve(10)  // 10
  .then(addTen)      // 20
  .then(addTen)      // 30
  .then(addTen)      // 40
  .then(console.log) // logs "40"
```

> Плюс «всегда возвращать»: код становится гораздо проще тестировать.

**Вопрос:** Сколько различных состояний Promise (resolved & rejected) было создано?

**Вопрос:** Сколько промисов было создано в предыдущем примере?

#### #2 Используйте реальные экземпляры `Error`

В JavaScript существует интересное поведение вокруг ошибок (которое относится как к асинхронному, **так и** к синхронному коду).

<a href="https://repl.it/@justsml/throwing-errors-in-javascript" target="_blank">[<i>см. пример на repl.it: `throwing errors in javascript`</i>]</a>
<img alt="throwing errors in javascript" src="../throwing-errors-in-javascript.webp" />

Чтобы **получить полезные детали о номере строки** и стеке вызовов, необходимо использовать экземпляры `Error`. Бросать строки не работает так, как в Python или Ruby.

Хотя JavaScript **кажется** обрабатывает `throw "string"`, вы увидите эту строку в обработчике `catch`. Однако это будет всё, что вы получите*. Ни один предыдущий [stack frame](https://en.wikipedia.org/wiki/Call_stack#Stack_and_frame_pointers) не будет включён.

Корректные примеры с `new Error`:

```js
throw new Error('message')           // ✅
Promise.reject(new Error('message')) // ✅
throw Error('message')               // ✅
Promise.reject(Error('message'))     // ✅
```

Ниже — типичные анти‑шаблоны:

```js
throw 'error message'  // ❌
Promise.reject(-42)    // ❌
```

<iframe height="400px" width="100%" src="https://repl.it/@justsml/throwing-errors-in-javascript?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### #3 Обрабатывайтеошибки там, где это имеет смысл

Promise дают удобный способ обработки ошибок через `.catch()`. По сути это особый вариант `.then()` — где любые ошибки из предыдущих `.then()` перехватываются. Рассмотрим пример…

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('will not get hit'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('WILL get hit'))
```

Хотя `.catch()` может напоминать обработчик DOM‑события (например, `click`, `keypress`), его позиция важна, потому что он может «поймать» только ошибки, выброшенные **выше него**.

**Перезаписать ошибку довольно просто** – верните не‑ошибочное значение в колбэке `.catch()`, и цепочка Promise переключится на выполнение последующих `.then()`‑колбэков последовательно. (Фактически.)

Попробуйте проследить последовательность в следующем примере:

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(num => num + 1)
  .then(console.log) // expected output: 100
```

**Важно понять именно последовательность выполнения.**

Хотя примерглупый, он предназначен **проиллюстрировать, как ошибки и данные проходят** через цепочки Promise.

Ниже схематично последовательность:

1. `42` — начальное значение.  
2. `hello` — всегда возвращается следующим методом.  
3. Мы игнорируем предыдущее значение и бросаем ошибку с сообщением `'totes fail'`.  
4. `.catch()` перехватывает ошибку и вместо неё возвращает `99`, которое будет обработано любыми последующими `.then()`.  
5. Инкрементируем `num`, получаем `100`.  
6. Метод `console.log` получает `100` и выводит его! :tada:

**Вопрос:** Что происходит, когда в цепочке находятся два `.catch()` подряд? Может ли второй когда‑нибудь выполниться? Придумайте сценарий использования.

**Вопрос:** Как `.catch()` может игнорировать ошибки? Как предотвратить преждевременный выход из `Promise.all` из‑за ошибок?

#### #4 Добавьте ясность с именованными функциями 🦄✨

Сравните **читаемость** двух примеров:

**Анонимные:** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // expected output: "25.00"
```

**Именованные:** ✅

```js
Promise.resolve(10) // 10
  .then(double)     // 20
  .then(quarter)    // 5
  .then(square)     // 25
  .then(format)     // "25.00"
  .then(log)        // expected output: "25.00"

const double = x => x * 2
const quarter = x => x / 4
const square = x => x * x
const format = x => x.toFixed(2)
const log = x => console.log(x)

```

**БОНУС:** ✅

> Совместимо с методами массива!!!

Именованные функции можно переиспользовать с нашими друзьями из `Array.prototype.` — включая `.map()`, `.filter()`, `.every()`, `.some()`, `.find()`!

Коллекционные конвейеры #FTW:

```js
// IT'S LIKE THE SAME THING :mindblown:

[10, 20]           // [ 10, 20 ]
  .map(double)     // [ 20, 40 ]
  .map(quarter)    // [ 5, 10 ]
  .map(square)     // [ 25, 100 ]
  .map(format)     // [ "25.00", "100.00" ]
  .map(log)        // expected 2 lines of output: "25.00", "100.00"

```

А если вам не нравится линейный стиль… У вас всё равно есть простые функции!

Их можно применять как угодно:

```js
// Nesting patern
// ❌ please don't do this, however

const result = format(square(quarter(double(10))))

log(result)
// expected output: "25.00"
```

**Почему вложение функций считается анти‑паттерном?**

1. Сложно читается большинством разработчиков  
2. `git diff` не показывает сразу, кто что изменил  
3. Трудно отлаживать или логировать из середины вложенных вызовов
````
