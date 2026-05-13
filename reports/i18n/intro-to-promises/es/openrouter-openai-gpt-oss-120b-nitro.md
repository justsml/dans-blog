# Translation Candidate
- Slug: intro-to-promises
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/es/index.mdx
- Validation: passed
- Runtime seconds: 1.30
- Input tokens: 3943
- Output tokens: 795
- Thinking tokens: unknown
- Cached input tokens: 1920
- Cache write tokens: 0
- Estimated cost: $0.000297
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Introducción a las Promesas
subTitle: ¡Las promesas de JavaScript son divertidas!
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
## Promises... ¿Cuál es su objetivo?

Cada vez que ejecutas código, hay 2 resultados posibles: **éxito** o **error**.

Si ese código es asíncrono, puede ser más difícil depender de forma fiable de ese resultado.

**`Promises`** ofrecen una forma práctica de manejar esto.

```
                        +--Promise---+
                        |            |
                        | <-either-> |
                        |            |
                <-------+            +-------->
                |Failure?             Success?|
                |                             |
                v                             v
                (Rejected)           (Resolved)
```

> Nota al margen: Aunque las Promises deberían resolverse o rechazarse, pueden no hacer ninguna de las dos cosas. Eso provoca que las aplicaciones se queden colgadas y puede ser muy difícil de depurar.

### ¿De dónde vienen las Promises?

Muchas veces no será necesario crear una promesa manualmente. Las API nativas como `fetch` y bibliotecas populares como `axios` ya devuelven Promises.

Sin embargo, si debe crear una promesa, existen 2 formas de hacerlo:

### Creando Promesas #1/2:

La forma más sencilla de crear una Promise es con el método auxiliar: `Promise.resolve()`.

Puede envolver (o “convertir”) cualquier valor en una Promise usando `Promise.resolve(valor)`.

```js
// Sin Promises:
function add10(num) {
  return num + 10
}

// Con Promises:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Creando Promesas #2/2:

Otro método más flexible: usar el constructor `Promise`.

`new Promise(callback)` acepta una función `callback` con la siguiente interfaz:

```js
new Promise(function(resolve, reject) {
  // Los argumentos `resolve` y `reject` son ambas funciones.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` debe ejecutarse cuando la promesa se cumple
  // `reject(Error)` debe ejecutarse si la promesa se rechaza
})
```

### API de Promesas

La API de Promesas en realidad consta de un número reducido de métodos.

2 funciones de instancia y 4 funciones estáticas/utilitarias.

#### Métodos de instancia de Promise

Acceder a los valores de una promesa no funcionará con trucos habituales (p. ej., `console.log(promise)`).

Todas las Promesas devuelven o éxito (a través de `.then(fn)`) o fallo (a través de `.catch(fn)`).

#### Métodos utilitarios de Promise

* `Promise.resolve(value)` – Convierte cualquier valor en una Promise  
* `Promise.reject(Error)` – Crea una Promise de fallo, dispara los `.catch()` subsecuentes  
* `Promise.all([...promises])` – Espera a que **todas** las Promesas del arreglo terminen  
* `Promise.race([...promises])` – Se resuelve tan pronto como la primera promesa se resuelva
````
