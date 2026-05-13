# Translation Candidate
- Slug: promise-gotchas
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-26--promise-gotchas/es/index.mdx
- Validation: passed
- Runtime seconds: 4.65
- Input tokens: 2557
- Output tokens: 1920
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000665
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: ''
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
### Las Promesas no funcionan como otros valores

No puedes imprimir su valor como la mayoría de los valores:

```js
// Esto no tiene sentido con promesas:
console.log(Promise.resolve(42));

// Debemos usar la interfaz .then:
Promise.resolve(42).then(value => console.log(value));
```

### Las Promesas no te advierten cuando cometes un error

Bueno, un error probable.

Por diversas razones, se decidió en TC39 que `.then` y `.catch` pueden recibir `null`. Por ejemplo, `.then(null, null)` es válido y el comportamiento requerido es omitir ese "paso" en la cadena.

La consecuencia desafortunada de esto es que es muy fácil estropear las cosas.

##### Por ejemplo

Veamos un pequeño desafío: ¿cuál de las siguientes opciones imprimirá `console.log` 42?

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

La respuesta es la opción #2, #3 y #4.

¿Por qué? Veamos los **tipos** de lo que se pasó a `.then()`:

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

¿Todavía te preguntas cómo funciona esa cuarta opción?

Esencialmente se ejecuta de esta manera:

```js
// Opción #4 - de forma efectiva
Promise.resolve(42)
  .then(undefined) // esto no tiene efecto en el valor, será pasado al siguiente `.then(fn)`
  .then(console.log);
```
````
