# Translation Candidate
- Slug: intro-to-promises
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/es/index.mdx
- Validation: passed
- Runtime seconds: 8.38
- Input tokens: 3485
- Output tokens: 3321
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001076
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Introducción a Promesas
subTitle: ¡Las promesas de JavaScript son geniales!
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
## Promesas... ¿Cuál es su asunto?

Cada vez que ejecutas cualquier código informático, hay 2 resultados posibles: **éxito** o **fallo**.

Si ese código es asincrónico por naturaleza, puede ser más difícil depender de ese resultado de manera confiable.

**`Promises`** proporcionan una forma práctica de abordar esto.

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

> Nota al margen: Aunque las promesas deberían resolverse o rechazarse, podrían fallar al hacer cualquiera de las dos. Esto hace que las aplicaciones se atasquen y puede ser muy difícil de depurar.

### ¿De dónde vienen las promesas?

Muchas veces no necesitarás crear una promesa tú mismo. APIs nativas como `fetch` y bibliotecas populares como `axios` ya devuelven promesas.  

Sin embargo, si debes crear una promesa, hay 2 formas de hacerlo:  

### Creando promesas #1/2:  
La forma más sencilla de crear una Promise es con el método auxiliar: `Promise.resolve()`.  

Puedes envolver (o "convertir") cualquier valor en una Promise usando `Promise.resolve(value)`.  

```js
// Sin promesas:  
function add10(num) {  
  return num + 10  
}  

// Con promesas:  
function add10Promised(num) {  
  return Promise.resolve(num + 10)  
}  

console.log(add10(10)) //=> 20  

add10Promised(10)  
  .then(x => console.log(x)) //=> 20  
```  

### Creando promesas #2/2:

Otro método más flexible: usar el constructor `Promise`.

`new Promise(callback)` acepta una función `callback` con la siguiente interfaz:

```js
new Promise(function(resolve, reject) {
  // Los argumentos `resolve` y `reject` son ambos funciones.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` debe ejecutarse cuando la promesa se cumpla
  // `reject(Error)` debe ejecutarse si la promesa se rechaza
})
```

### API de Promises

La API de Promises en realidad consta de un número pequeño de métodos.

2 métodos de instancia y 4 funciones estáticas/utilidad.

#### Métodos de instancia de Promise

Acceder a los valores de una promesa no funcionará usando trucos habituales (es decir, `console.log(promise)`).

Todas las Promises devuelven éxito (a través de `.then(fn)`) o fracaso (a través de `.catch(fn)`).

#### Métodos de utilidad de Promise

* `Promise.resolve(value)` - Convierte cualquier valor en una Promise  
* `Promise.reject(Error)` - Crea un valor Promise de fallo, activa la subsiguiente `.catch()`  
* `Promise.all([...promises])` - Espera a que un array de Promises se complete TODO  
* `Promise.race([...promises])` - Se resuelve en cuanto la primera promesa se resuelva
````
