# Translation Candidate
- Slug: visualizing-promises
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 11.88
- Input tokens: 4646
- Output tokens: 4203
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001380
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug visualizing-promises --locale es
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Visualización de Promesas
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
Para visualizar cómo se ejecutan las Promises, definamos un nuevo método `delay(millisecs)`.

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

Este es un método utilitario que se resolverá una vez que se cumpla el tiempo de espera.

El retraso en milisegundos se pasará al callback de `.then`.

Veamos 4 ejemplos (con líneas de tiempo animadas).

## Ejemplo #1/4

Esto muestra cómo la ejecución de `console.log()` se retrasará por `delay(msec)`.

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

## Ejemplo #2/4

_Esto muestra un error común._

El `console.log` se ejecuta justo cuando el `delay(1000)` **comienza**. No **después** del retraso como probablemente querías.

Como `console.log` devuelve `undefined`, nuestro `.then()` se ignora silenciosamente.

Observe la diferencia entre `typeof console.log === 'function'` y `typeof console.log() === undefined`.

Normalmente el uso deseado de `console.log` se muestra en el Ejemplo #1. Asegúrese de pasar funciones a `.then` y `.catch`.

```js
delay(1000).then(console.log("done"));
```

![Línea de tiempo mostrando console.log ejecutándose inmediatamente antes de que finalice el retraso](../N_1000ms_!log.webp)

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

![Línea de tiempo mostrando tres promesas delay resolviéndose después de uno, dos y tres segundos](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1seg                 2seg                 3seg
``` -->

## Ejemplo #4/4

`Promise.all` con 3 promesas `delay`. Se ejecutarán simultáneamente.

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Línea de tiempo mostrando Promise all esperando a que se resuelvan las tres promesas delay](../N_3000ms_PromiseAll.webp)

<!-- ``` 
Promise.all([
  delay(1000),
  delay(2000),
  delay(3000)
]) -----------------|.then(console.log)
|-------------------|--------------------|--------------------|-------------------
|                   |                    |                    |
0msec             1seg                 2seg                 3seg
``` -->

```
delay(1000) ---| [resolved]------------------v
delay(2000) ---|--------------| [resolved]---v
delay(3000) ---|--------------|--------------v [resolved]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1seg           2seg           3seg
```

> Créditos:
>
> - Diagramas de async animados por [Patrick Biffle](https://github.com/Piglacquer)
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
````
