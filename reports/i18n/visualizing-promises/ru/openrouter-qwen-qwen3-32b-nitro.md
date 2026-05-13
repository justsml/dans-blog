# Translation Candidate
- Slug: visualizing-promises
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 9.37
- Input tokens: 4469
- Output tokens: 3807
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001271
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug visualizing-promises --locale ru
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Визуализация промисов
subTitle: ''
date: '2018-09-30'
modified: '2024-07-30'
category: Guides
subCategory: promises
cover: ../junior-ferreira-735237-unsplash.webp
cover_mobile: ../w300_junior-ferreira-735237-unsplash.webp
cover_icon: ../icon_junior-ferreira-735237-unsplash.webp
tags:
  - promises
  - async
  - visualizing
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
---
Для визуализации того, как выполняются Promise, определим новую функцию `delay(millisecs)`.

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

Это вспомогательный метод, который разрешается после завершения таймера.

Задержка в миллисекундах будет передана в колбэк `.then`.

Рассмотрим 4 примера (с анимированными временными шкалами).

## Пример #1/4

Это показывает, как выполнение `console.log()` будет задерживаться на `delay(msec)`.

```js
delay(1000).then(() => console.log("done"));
```

![Временная шкала: задержка 1000, затем console log выполняется через 1 секунду](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## Пример #2/4

_Это показывает распространенную ошибку._

`console.log` запускается сразу, как только начинается `delay(1000)`. Не **после** задержки, как вы, возможно, хотели.

Потому что `console.log` возвращает `undefined`, наш `.then()` тихо игнорируется.

Обратите внимание на разницу между `typeof console.log === 'function'` и `typeof console.log() === undefined`.

В общем случае правильное использование `console.log` показано в Примере #1. Убедитесь, что вы передаете функции в `.then` и `.catch`.

```js
delay(1000).then(console.log("done"));
```

![Timeline showing console log running immediately before the delay finishes](../N_1000ms_!log.webp)

<!-- ```
delay(1000) --------|.then(null)
console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## Пример #3/4

3 промиса выполняются одновременно.

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![Временная шкала, показывающая три промиса delay, разрешающихся через одну, две и три секунды](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## Пример #4/4

`Promise.all` с 3 промисами `delay`. Они будут выполняться одновременно.

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Временная шкала, показывающая Promise all, ожидающего все три промиса delay](../N_3000ms_PromiseAll.webp)

<!-- ```
delay(1000) ------|-------------------
delay(2000) ------|-------------------
delay(3000) ------|-------------------
Promise.all       ------------------|.then(console.log)
|-----------------|-------------------|--------------------|-------------------
|                 |                   |                    |
0msec           1sec              2sec                 3sec
``` -->

```
delay(1000) ---| [resolved]------------------v
delay(2000) ---|--------------| [resolved]---v
delay(3000) ---|--------------|--------------v [resolved]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1sec           2sec           3sec
```

>

Благодарности:
>
> - Анимированные асинхронные диаграммы от [Patrick Biffle](https://github.com/Piglacquer)
> - Вдохновение для этой статьи: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="Вопрос #1: Значение жизни:">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">Какое значение жизни?</div>

</div> -->
````
