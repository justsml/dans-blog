# Translation Candidate
- Slug: stop-trying-to-make-async-await-happen
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/ru/index.mdx
- Validation: deferred
- Runtime seconds: 27.79
- Input tokens: 10059
- Output tokens: 8648
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.002880
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Не пытайтесь заставить работать async/await
subTitle: Промисы в тренде
date: '2018-10-03'
modified: '2024-08-03'
category: Guides
subCategory: promises
tags:
  - promises
  - async
  - await
  - async-await
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - you-may-not-need-axios
cover: ../matt-nelson-414464-unsplash.webp
cover_mobile: ../w300_matt-nelson-414464-unsplash.webp
cover_icon: ../icon_matt-nelson-414464-unsplash.webp
---
С тех пор, как мир существует, разработчики ведут множество глупых споров. От классического спора «Табуляторы против пробелов» до вечного «Mac против PC» мы мастеримся находти отвлекающие аргументы.  

<br />  
<small>_Ответы:_ Linux и пробелы.</small>  

<!-- Мы рассмотрим 2 правила, которые улучшат ваш опыт работы с Помисами. -->  

## Спор...?  

### Помисы против Async/Await!  

Подождите, это спор? Наверное, да? Мы уже давно не обсуждаем колбэки?

Нет, это не битва. В конечном итоге это еще один потенциальный инструмент в вашем наборе. Однако, поскольку `async`/`await` не заменяет всю функциональность Promise (в частности `Promise.all`, `.race`) **представлять его как замену вводит в заблуждение.**

Много влиятельных людей продвигают эту ошибочную идею, утверждая, что `async`/`await` — это [замена](https://developers.google.com/web/fundamentals/primers/async-functions) [для всех](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) [пользователей](https://x.com/umaar/status/1045655069478334464) [Promises](http://2ality.com/2017/08/promise-try.html#why-not-just-use-async-functions) [сейчас](https://dzone.com/articles/javascript-promises-and-why-asyncawait-wins-the-ba).

> **Подсказка: Нет, нет и совсем не немного.**

Недавнее обновление VS Code усиливает этот предвзятый взгляд. Как написал [@umaar](https://x.com/umaar) в твиттере:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Visual Studio Code теперь может преобразовывать длинные цепочки Promise.then() в async/await! 🎊 Работает отлично как в JavaScript, так и в TypeScript файлах. .catch() также корректно преобразуется в try/catch ✅ <a href="https://t.co/xb39Lsp84V">pic.x.com/xb39Lsp84V</a></p>&mdash; Umar Hansa (@umaar) <a href="https://x.com/umaar/status/1045655069478334464?ref_src=twsrc%5Etfw">28 сентября 2018</a></blockquote>

<!-- Конечно, это впечатляющее дополнение к уже потрясающему списку функций. -->

Если вы не любите Promises и хотите эту функцию рефакторинга, я вас не виню.  

<br />  

_Я сопереживаю. Я понимаю._  

<br />  

Я был на этом месте. 🤗  

<br />

Я ненавидел промисы. Сегодня я полностью изменил мнение. **Промисы потрясающие.** Они позволяют эффективно использовать **композицию функций**.  

Существует два направления, на которые я рекомендую сначала обратить внимание, чтобы улучшить ваше использование промисов.  

1. [Именованные функции (без анонимных)](#rule-1)  
1. [Функции с единственной ответственностью](#rule-2)  

<h2 id="rule-1">#1: Именованные функции!</h2>  

Уничтожайте анонимные методы. Использование **именованных функций** делает код похожим на поэзию ваших требований.  

Рассмотрим распространённый пример:

Выполнение HTTP-запроса GET с помощью `fetch`:

<!-- спецификация fetch утверждает, что [коды состояния HTTP](https://http.cat/) свыше 400 или 500 **не вызывают ошибку автоматически.** Это поведение по умолчанию во многих библиотеках AJAX (jQuery, axios). -->

<!-- Перед тем как перейти к решению, рассмотрите распространённую "рекомендуемую" реализацию: -->

### Антипаттерн

```js
// ❌ Использование анонимных встроенных функций 💩
fetch(url)
  .then(response => response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus)))
  .then(response => response.text())
```

### Решение: Именованные методы

```js
// ✅ Появляется ясность: именованные функции
fetch(url)
  .then(checkResponse)
  .then(getText)


// Воспользуемся повторно обобщёнными функциями
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
function getText(response) {
  return response.text()
}
```

> Преимущества этого подхода становятся всё очевиднее по мере того, как ваш код становится более DRY.

**Дополнительные ресурсы:** Посмотрите мои **видео на 1 минуту** о [базовом логировании](https://youtu.be/xR_MZE1SIkk) и [продвинутой отладке](https://youtu.be/P_tghqWj72M), где используется этот подход.

<h2 id="rule-2">#2: Единая цель (функции)</h2>

Звучит _обманчиво точно_: Единая цель.

Однако это субъективно, произвольно и да, иногда даже бессмысленно.

<!-- Вместо споров о том, насколько функция фокусирована.

Я придумал приблизительную меру для этого: `Purpose Cost`. Чем выше оценка, тем вероятнее, что функция делает слишком много.

```js
// 1 балл: возврат и тернарный оператор фактически представляют собой однолинейное выражение
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
// 1 балл: возврат и выражение также фактически представляют собой однолинейное выражение
function getText(response) {
  return response.text()
}
```

Для кода функции добавьте 1 балл за каждую строку, содержащую любой из следующих элементов: `if`, `return`, тернарный оператор, `for`, `const`, `let`, `var`, `switch`, `while`, `[].map/filter/reduce/etc`. Добавьте 1 балл за каждую инструкцию (игнорируйте лишние строки из-за пробелов). Цепочка выражений или методов учитывается как 1 балл.

О, это было немного жаргона.
 -->

Интересно, что большинство разработчиков утверждают, что они _очень даже неплохи_ в соблюдении **Единой Цели**. Как и неудивительно, они же отчаянно уверены, что они лучшие водители!

<!-- Это **не уникальная проблема для Promises**, массивные методы и все остальные API на основе HoF (Higher Order Function) имеют те же эргономические особенности. -->

Давайте посмотрим на пример, который (весьма талантливый) [Джейк Арчибальд](https://x.com/jaffathecake) использует в своей статье по async/await для Google Developers (примечание: 2024, ссылка удалена).

<!-- 
Давайте рассмотрим один из так называемых примеров "❌ Не рекомендуется" для Promises. (Описание: "предположим, мы хотим получить серию URL и вывести их как можно скорее, в правильном порядке.") -->

```js
// source: https://developers.google.com/web/fundamentals/primers/async-functions
function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

### Единая цель?

Я бы ответил — нет. Что делает `logInOrder`?

1. Перебирает список `urls`
1. Применяет к ним inline HTTP GET:
  1. HTTP `fetch`
  1. Возвращает текстовое тело ответа
1. Добавляет `.then(text => console.log(text))` после каждого promise в `textPromise`
  1. Выводит результаты последовательно

В одной функции определено 5 анонимных методов. Как отмечает Джейк, `.reduce` слишком сложен. Нет смысла вручную писать сложные механизмы по всему коду. Другой пример: мы не пишем код создания DOM с бесконечным количеством `document.createElement()`, `element.setAttribute()` и т.д. Вместо этого мы выбираем лучший инструмент из доступных вариантов: вспомогательные/утилитарные функции, библиотеки или фреймворки.

<!-- Нам нужно изолировать каждый 'шаг', который происходит: есть HTTP-запрос, преобразование списка URL в список результатов. Также нужен `console.log`. -->

<!-- > 🤔 Почему `Promises` заставляют разработчиков отказываться от практик, которые мы используем в других местах? -->

**Примечание:** Если целью было _инициировать запросы_ последовательно, а не просто выводить результаты в порядке, этот код этого не делает. Мы скорректируем его соответствующим образом.

#### Решение: Функции с единственной целью

### Начните с **извлечения методов**...

![VS Code рефакторинг извлечения асинхронных методов из кода Promise](../async-refactor-google-extract-methods-resized-75.webp "Извлечение методов")

### Продолжите, заменив `.reduce()` и `logPromise()` на `Promise.all` и `..map()`...

![Переработанная цепочка Promise с использованием Promise all и map для улучшения читаемости](../async-refactor-google-chain-methods-resized-75.webp "Улучшение читаемости")

### Выводы

Попробуйте применить эти техники в своем коде! Если хотите, [отправьте мне твит](https://x.com/justsml) и расскажите, как у вас получилось. Или, если у вас есть вопросы или комментарии, не стесняйтесь, свяжитесь со мной!

Помогите распространить #PromiseTruth и поделитесь этой статьей. ❤️

![кредит: matt-nelson-414464-unsplash.webp](matt-nelson-414464-unsplash.webp)

#### См. также

* [Дэниэл Брайн](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
* [Эрик Эллиотт](https://x.com/_ericelliott?lang=en)
````
