# Translation Candidate
- Slug: are-promises-broken
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-10-06--are-promises-broken/es/index.mdx
- Validation: passed
- Runtime seconds: 23.87
- Input tokens: 8759
- Output tokens: 9136
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.002893
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ¿Promesas incumplidas?
unlisted: true
subTitle: 'Ignorar errores, perder resultados...'
date: '2018-10-06'
modified: '2024-12-11'
tags:
  - promises
  - javascript
  - errors
  - programming
category: Code
subCategory: promises
cover: ../lennart-heim-766366-unsplash.webp
cover_mobile: ../w300_lennart-heim-766366-unsplash.webp
cover_icon: ../icon_lennart-heim-766366-unsplash.webp
---
## ¿Están rotas las Promesas de JavaScript?

### En los tiempos anteriores

Uno de los mitos más comunes sobre las Promesas es su presunta falta de manejo de errores.

**Hace muchos años** las Promesas _eran_ realmente terribles para manejar errores. **Se realizó mucho trabajo para corregirlo.**

> Y así lo fue, **se corrigió**, e incluso **se implementó ampliamente**.

#### La gente celebró

Y, desafortunadamente, algunos no lo notaron.

### La era actual

El mito persiste, lo veo por todas partes: [artículos populares en Medium](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9), [en DZone](#redacted) y [muchas](https://medium.com/@avaq/broken-promises-2ae92780f33) otras fuentes.

Admito que incluso los recursos y documentación "oficiales" ofrecen principalmente [ejemplos frágiles y malas prácticas](../promise-gotchas/). Estos suelen usarse para "demostrar" el caso contra las Promesas. Algunos incluso sugieren "soluciones" que empeoran las cosas aún más. (nota: enlace eliminado)

<!-- Uno de esos consejos que he visto múltiples veces es no usar nunca `.catch`, y en su lugar usar el evento global `"unhandledRejection"`. **NUNCA** hagas esto. `unhandledRejection` está diseñado para la limpieza de referencias globales, como conexiones a bases de datos, antes de un cierre inminente. -->

<br />
<br />

## Reglas para evitar problemas

1. [Las Promesas necesitan algo en lo que agarrarse](#1-promises-need-something-to-hang-on-to)  
    * **Siempre** `return` desde tus funciones.  
1. [Usa instancias reales de `Error`](#2-use-real-error-instances)  
    * **Siempre** usa instancias de `Error`.  
1. [Maneja errores donde tenga sentido](#3-handle-errors-where-it-makes-sense)  
    * **Siempre** usa `.catch()`, al menos una vez.  
1. [Agrega claridad con funciones nombradas 🦄✨](#4-add-clarity-with-named-functions-)  
    * __Prefiere__ funciones nombradas.  

-------------------------------------------  

#### #1 Las Promesas necesitan algo en lo que agarrarse  

Es crucial que **siempre devuelvas** desde tus funciones.  

Las funciones de callback de las Promesas siguen un patrón específico en `.then(callback)` y `.catch(callback)`.

Cada valor devuelto se pasa al callback del siguiente `.then()`.

```js
function addTen(number) {
  return number + 10;
}

Promise.resolve(10)  // 10
  .then(addTen)      // 20
  .then(addTen)      // 30
  .then(addTen)      // 40
  .then(console.log) // logs "40"
```

> Beneficio adicional de "siempre devolver": el código es mucho más fácil de probar unitariamente.

**Pregunta:** ¿Cuántos estados de Promesa distintos (resueltos y rechazados) se crearon?

**Pregunta:** ¿Cuántas promesas se crearon en el ejemplo anterior?

#### #2 Usa instancias reales de `Error`

JavaScript tiene un comportamiento interesante en torno a los errores (que se aplica tanto al código **asíncrono** como **sincrónico**).

<a href="https://repl.it/@justsml/throwing-errors-in-javascript" target="_blank">[<i>ver ejemplo en repl.it: `throwing errors in javascript`</i>]</a>
<img alt="lanzar errores en JavaScript" src="../throwing-errors-in-javascript.webp" />

Para **obtener detalles útiles sobre el número de línea** y la pila de llamadas, debes usar instancias de `Error`. Lanzar cadenas no funciona como en Python o Ruby.

Aunque JavaScript **parece** manejar `throw "string"`, ya que verás la cadena en tu manejador `catch`, los datos serán todo lo que veas*. No se incluirán marcos de pila anteriores.

Ejemplos correctos con `new Error`:

```js
throw new Error('message')           // ✅
Promise.reject(new Error('message')) // ✅
throw Error('message')               // ✅
Promise.reject(Error('message'))     // ✅
```

Estos son anti patrones comunes:

```js
throw 'error message'  // ❌
Promise.reject(-42)    // ❌
```

<iframe height="400px" width="100%" src="https://repl.it/@justsml/throwing-errors-in-javascript?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### #3 Manejar errores donde tenga sentido

Las Promesas proporcionan una forma elegante de manejar errores, utilizando `.catch()`. Es básicamente un tipo especial de `.then()` - donde cualquier error de los `.then()` anteriores se maneja. Veamos un ejemplo...

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('will not get hit'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('WILL get hit'))
```

Aunque `.catch()` pueda parecerse a un manejador de eventos DOM (es decir, `click`, `keypress`). Su posición es importante, ya que solo puede 'capturar' errores lanzados **por encima de él.**

**Sobrescribir errores es relativamente trivial** Devolver un valor no-error en su callback `.catch()`, la cadena de Promesas cambia a ejecutar los callbacks `.then()` en secuencia. (Efectivamente.)

Intente seguir la secuencia del siguiente ejemplo:

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(num => num + 1)
  .then(console.log) // salida esperada: 100
```

**La secuencia es lo importante que entender.**

Aunque el ejemplo parece tonto, está diseñado para **ilustrar cómo fluyen los errores y los datos** en las Promesas.

Aquí está el esquema de la secuencia:

1. 42 es el valor inicial.
1. `hello` es siempre devuelto por el siguiente método.
1. ignoramos el valor anterior y lanzamos un error con el mensaje `'totes fail'`.
1. `.catch()` intercepta el error, en lugar de eso devuelve `99` que será manejado por cualquier `.then()` posterior.
1. incrementamos `num`, devolviendo `100`
1. el método `console.log` recibe `100` y lo imprime! :tada:

**Pregunta:** ¿Qué ocurre cuando hay 2 `.catch()` en secuencia? ¿Puede ejecutarse el segundo? ¿Puedes pensar en un caso de uso?

**Pregunta:** ¿Cómo puede `.catch()` ignorar errores? ¿Cómo evitarías que los errores fueran una salida prematura de `Promise.all`?

#### #4 Añadir claridad con funciones nombradas 🦄✨

Compare la **legibilidad** de los siguientes 2 ejemplos:

**Anónimo:** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // salida esperada: "25.00"
```

**Nombrado:** ✅

```js
Promise.resolve(10) // 10
  .then(double)     // 20
  .then(quarter)    // 5
  .then(square)     // 25
  .then(format)     // "25.00"
  .then(log)        // salida esperada: "25.00"

const double = x => x * 2
const quarter = x => x / 4
const square = x => x * x
const format = x => x.toFixed(2)
const log = x => console.log(x)
```

**BONUS:** ✅

> Compatible con métodos de Array!!!

Puedes reutilizar tus funciones nombradas con nuestros amigos de `Array.prototype.`. Incluyendo `.map()`, `.filter()`, `.every()`, `.some()`, `.find()`!

Collection pipelines #FTW:

```js
// IT'S LIKE THE SAME THING :mindblown:

[10, 20]           // [ 10, 20 ]
  .map(double)     // [ 20, 40 ]
  .map(quarter)    // [ 5, 10 ]
  .map(square)     // [ 25, 100 ]
  .map(format)     // [ "25.00", "100.00" ]
  .map(log)        // expected 2 lines of output: "25.00", "100.00"

```

Y si no quieres hacer este tipo de programación lineal... Pues tienes funciones simples!

Puedes usarlas como necesites:

```js
// Nesting patern
// ❌ please don't do this, however

const result = format(square(quarter(double(10))))

log(result)
// expected output: "25.00"
```

**¿Por qué anidar funciones es un anti patrón?**

1. No es legible para tantas personas
2. Los cambios en git diffs no revelan fácilmente quién modificó qué
3. Es difícil depurar o registrar valores del medio de las funciones anidadas
````
