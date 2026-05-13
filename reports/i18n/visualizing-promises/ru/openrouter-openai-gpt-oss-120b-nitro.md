# Translation Candidate
- Slug: visualizing-promises
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 4.16
- Input tokens: 4620
- Output tokens: 1399
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000432
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug visualizing-promises --locale ru
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Визуализация промисов
subTitle: Прорывайся…
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
Чтобы увидеть, как работают Promise, определим новый метод `delay(millisecs)`.

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

Это вспомогательная функция, которая разрешится после истечения тайм‑аута.

Значение задержки в миллисекундах будет передано в колбэк `.then`.

Рассмотрим четыре примера (с анимированными тайм‑линиями).

## Пример #1/4

Показывает, как выполнение `console.log()` откладывается на время, заданное `delay(msec)`.

```js
delay(1000).then(() => console.log("done"));
```

![Timeline showing delay 1000 then console log running after one second](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## Пример #2/4

_Это демонстрирует типичную ошибку._

`console.log` срабатывает сразу, когда `delay(1000)` **начинается**. А не **после** задержки, как вы, вероятно, ожидали.

Поскольку `console.log` возвращает `undefined`, наш `.then()` тихо игнорируется.

Обратите внимание на разницу между `typeof console.log === 'function'` и `typeof console.log() === undefined`.

Как правило, правильное использование `console.log` показано в Примере #1. Убедитесь, что в `.then` и `.catch` передаются функции, а не результаты их вызова.

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

3 Promise выполняются одновременно.

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![Timeline showing three delay promises resolving after one two and three seconds](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## Пример #4/4

`Promise.all` с тремя промисами `delay`. Они будут выполняться одновременно.

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Timeline showing Promise all waiting for all three delay promises](../N_3000ms_PromiseAll.webp)

```
delay(1000) ---| [resolved]------------------v
delay(2000) ---|--------------| [resolved]---v
delay(3000) ---|--------------|--------------v [resolved]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1sec           2sec           3sec
```

> Благодарности:
> 
> - Анимированные асинхронные диаграммы от [Patrick Biffle](https://github.com/Piglacquer)
> - Вдохновение для этой статьи: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
````
