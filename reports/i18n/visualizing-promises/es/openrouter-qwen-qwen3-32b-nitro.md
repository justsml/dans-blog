# Translation Candidate
- Slug: visualizing-promises
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 10.12
- Input tokens: 4539
- Output tokens: 4146
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001358
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug visualizing-promises --locale es
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Visualizando Promesas
subTitle: Rompe el muro...
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
Para visualizar cómo se ejecutan las Promises, definamos un nuevo método `delay(millisecs)`.

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

Este es un método utilitario que se resolverá una vez que se haya cumplido el tiempo de espera.

La demora en milisegundos se pasará al callback de `.then`.

Veamos 4 ejemplos (con timelines animados).

## Ejemplo #1/4

Esto muestra cómo la ejecución de `console.log()` se retrasará mediante `delay(msec)`.

```js
delay(1000).then(() => console.log("done"));
```

![Línea de tiempo mostrando delay 1000 seguido de console log ejecutándose después de un segundo](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## Ejemplo #2/4

_Este muestra un error común._

El `console.log` se ejecuta justo cuando `delay(1000)` **comienza**. No **después** de la demora como probablemente deseabas.

Porque `console.log` devuelve `undefined`, nuestro `.then()` se ignora silenciosamente.

Nota la diferencia entre `typeof console.log === 'function'` vs. `typeof console.log() === undefined`.

En general, el uso deseado para `console.log` se muestra en el Ejemplo #1. Asegúrate de pasar funciones a `.then` y `.catch`.

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

## Ejemplo #3/4

3 Promesas se ejecutan simultáneamente.

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

## Ejemplo #4/4

`Promise.all` con 3 promesas `delay`. Se ejecutarán simultáneamente.

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Timeline showing Promise all waiting for all three delay promises](../N_3000ms_PromiseAll.webp)

<!-- ```js
Promise.all([delay(1000), delay(2000), delay(3000)]) 
``` -->

```
delay(1000) ---| [resuelto]------------------v
delay(2000) ---|--------------| [resuelto]---v
delay(3000) ---|--------------|--------------v [resuelto]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1seg           2seg           3seg
```

> Créditos:
> 
> - Diagramas asincrónicos animados por [Patrick Biffle](https://github.com/Piglacquer)
> - Inspiración para este artículo: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="Pregunta #1: Significado de la vida:">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">¿Cuál es el significado de la vida?</div>

</div> -->
```
````
