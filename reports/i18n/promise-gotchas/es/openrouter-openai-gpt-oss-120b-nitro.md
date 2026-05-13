# Translation Candidate
- Slug: promise-gotchas
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-09-26--promise-gotchas/es/index.mdx
- Validation: passed
- Runtime seconds: 1.21
- Input tokens: 2732
- Output tokens: 499
- Thinking tokens: unknown
- Cached input tokens: 896
- Cache write tokens: 0
- Estimated cost: $0.000196
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Problemas con Promesas
subTitle: Evitar errores comunes
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
### Las promesas no funcionan como otros valores

No puedes imprimir su valor como la mayoría de los valores:

```js
// Esto no tiene sentido con promesas:
console.log(Promise.resolve(42));

// Debemos usar la interfaz `.then`:
Promise.resolve(42).then(value => console.log(value));
```

### Las promesas no te advierten cuando cometes un error

Bueno, un error probable.

Por diversas razones, TC39 decidió que `.then` y `.catch` pueden recibir `null`. Por ejemplo, `.then(null, null)` es válido y el comportamiento requerido es omitir ese “paso” en la cadena.

La consecuencia desafortunada de esto es que es muy fácil equivocarse.

##### Por ejemplo

Veamos un mini desafío: ¿cuál(es) de las siguientes opción(es) hará que `console.log` muestre 42?

```js
// Opción #1:
Promise.resolve(42).then(console.log());

// Opción #2:
Promise.resolve(42).then(console.log);

// Opción #3:
Promise.resolve(42).then(value => console.log(value));

// Opción #4:
Promise.resolve(42)
  .then(console.log())
  .then(console.log);
```

##### La respuesta

La respuesta es #2, #3 y #4.

¿Por qué? Veamos los **tipos** de lo que se pasó a `.then()`:

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

¿Sigues preguntándote cómo funciona la Opción 4?

Es efectivamente ejecutado así:

```js
// Option #4 - effectively
Promise.resolve(42)
  .then(undefined) // this has no affect on the value, it will be handed to following `.then(fn)`
  .then(console.log);
```
````
