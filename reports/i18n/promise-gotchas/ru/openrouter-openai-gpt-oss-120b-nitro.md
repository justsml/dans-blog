# Translation Candidate
- Slug: promise-gotchas
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-09-26--promise-gotchas/ru/index.mdx
- Validation: deferred
- Runtime seconds: 0.85
- Input tokens: 2732
- Output tokens: 584
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000212
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Ловушки Promise
subTitle: Избегание типичных ошибок
date: '2018-09-26'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - debugging
  - errors
  - javascript
  - composition
related:
  - intro-to-promises
  - visualizing-promises
  - are-promises-broken
  - javascript-promises-quiz
cover: ../michal-parzuchowski-224092-unsplash.webp
cover_mobile: ../w300_michal-parzuchowski-224092-unsplash.webp
cover_icon: ../icon_michal-parzuchowski-224092-unsplash.webp
---
### Промисы работают не так, как обычные значения

Вы не можете вывести их значение, как большинство значений:

```js
// Это не имеет смысла для промисов:
console.log(Promise.resolve(42));

// Нужно использовать интерфейс `.then`:
Promise.resolve(42).then(value => console.log(value));
```

### Промисы не предупреждают вас об ошибке

Ну, типичная ошибка.

По ряду причин TC39 решил, что в `.then` и `.catch` можно передавать `null`. Например, вызов `.then(null, null)` допустим, а требуемое поведение — пропустить этот «шаг» в цепочке.

К несчастью, это делает очень простым допустить ошибку.

##### На примере

Посмотрим на небольшую задачу: какие из перечисленных вариантов выведут в `console.log` число 42?

```js
// Option #1:
Promise.resolve(42).then(console.log());

// Option #2:
Promise.resolve(42).then(console.log);

// Option #3:
Promise.resolve(42).then(value => console.log(value));

// Option #4:
Promise.resolve(42)
  .then(console.log())
  .then(console.log);
```

##### Ответ

Ответ — #2, #3 и #4.

Почему? Рассмотрим **типы** того, что передано в `.then()`:

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

Все ещё интересно, как работает четвертый вариант?

Это фактически эквивалентно следующему коду:

```js
// Option #4 - effectively
Promise.resolve(42)
  .then(undefined) // это не влияет на значение, оно будет передано следующему `.then(fn)`
  .then(console.log);
```
````
