# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/es/index.mdx
- Validation: passed
- Runtime seconds: 23.93
- Input tokens: 7634
- Output tokens: 7476
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002405
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Cuestionario: 9 preguntas sobre Promesas de JavaScript'
subTitle: ''
label: Promise Gotchas
date: '2019-11-26'
modified: '2024-11-28'
tags:
  - promises
  - programming
  - async
  - javascript
  - guides
  - quiz
  - intermediate
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
category: Quiz
unlisted: false
subCategory: JavaScript
cover: ../olav-ahrens-rotne-jvBXiynINGE-resized.webp
cover_mobile: ../w300_olav-ahrens-rotne-jvBXiynINGE-resized.webp
cover_icon: ../icon_olav-ahrens-rotne-jvBXiynINGE-resized.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## ¿Conoces las Promesas de JavaScript?

> * **¡Demuestra tus habilidades en JavaScript!** 🚀

1. **Revisa las pistas** (botón grande, esquina inferior).
2. Prueba el código en la Consola de tu navegador (usa el atajo `F12` o búscalo) o usa [repl.it](https://repl.it)*.
3. ¡No dudes en [mandarme un tuit @justsml](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/). **¡Me encantaría escuchar tus comentarios!**

### 👇 Completa las 9 Preguntas de Abajo 👇
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Manejo de Errores"
  title="Múltiples `.catch` #1"
  options={[
    {text: 'imprimir el mensaje una vez'},
    {text: 'imprimir el mensaje dos veces', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'el proceso termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será la salida del siguiente código?
    ```js
    var p = new Promise((resolve, reject) => {
      reject(Error('The Fails!'))
    })
    p.catch(error => console.log(error.message))
    p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Creamos una Promise usando el método constructor, disparando un error inmediatamente con el callback `reject`.

    Luego, los manejadores `.catch` funcionan como el DOM's `.addEventListener(event, callback)` o el Event Emitter's `.on(event, callback)` donde **se pueden agregar múltiples callbacks de manejador.** Cada uno será llamado con los mismos argumentos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Manejo de Errores"
  title="Múltiples .catch #2"
  options={[
    {text: 'imprimir mensaje una vez'},
    {text: 'imprimir mensaje dos veces'},
    {text: 'promesa rechazada no manejada', isAnswer: true},
    {text: 'el proceso termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será la salida del siguiente código?
    ```js
    var p = new Promise((resolve, reject) => {
      return Promise.reject(Error('The Fails!'))
    })
    p.catch(error => console.log(error.message))
    p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Al usar el constructor Promise, debes invocar `resolve()` o `reject()`. El constructor Promise ignora el valor devuelto por el executor, por lo que la promesa adicional creada con `Promise.reject()` no está encadenada a `p`. Los dos manejadores están adjuntos a `p`, que permanece pendiente, mientras que la promesa rechazada devuelta se reporta como no manejada por el entorno anfitrión.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="Manejo de Errores"
  title="Encadenar `.then` y `.catch`"
  options={[
    {text: 'imprimir el error y `undefined`', isAnswer: true},
    {text: 'imprimir el error dos veces'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será la salida del siguiente código?
    ```js
    var p = new Promise((resolve, reject) => {
      reject(Error('The Fails!'))
    })
    .catch(error => console.log(error))
    .then(error => console.log(error))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Al encadenar `.then` y `.catch`, es útil pensar en ellos como una serie de pasos. Cada `.then` recibe el valor devuelto por el `.then` anterior (como argumento). Sin embargo, si un "paso" encuentra un error, se omitirán todos los siguientes `.then` hasta que se encuentre un `.catch`. Si deseas sobrescribir un error, solo necesitas devolver un valor no de error. Este valor será accesible en cualquier `.then` posterior.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="Manejo de Errores"
  title="Encadenamiento de `.catch`"
  options={[
    {text: 'imprimir el mensaje de error una vez', isAnswer: true},
    {text: 'imprimir el mensaje de error dos veces'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'el proceso termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será la salida del siguiente código?
    ```js
    var p = new Promise((resolve, reject) => {
      reject(Error('The Fails!'))
    })
    .catch(error => console.log(error.message))
    .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Al encadenar `.catch`, cada uno solo maneja los errores lanzados en el `.then` o `.catch` anterior. En este ejemplo, el primer `.catch` devuelve el `console.log`, que solo podría ser accesible añadiendo un `.then()` después de ambos `.catch`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Manejo de Errores"
  title="Múltiples `.catch`"
  options={[
    {text: 'imprimir el mensaje una vez'},
    {text: 'imprimir el mensaje dos veces'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'nada se imprime', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será la salida del siguiente código?
    ```js
    new Promise((resolve, reject) => {
        resolve('Success!')
      })
      .then(() => {
        throw Error('Oh noes!')
      })
      .catch(error => {
        return "actually, that worked"
      })
      .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Sugerencia:** Los `.catch` se pueden usar para ignorar (o anular) errores simplemente devolviendo un valor normal.

    Este truco funciona solo cuando hay un `.then` posterior para recibir el valor.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Manejo de Datos"
  title="Flujo entre `.then`"
  options={[
    {text: 'imprime "¡Éxito!" y "¡ÉXITO!"'},
    {text: 'imprime "¡Éxito!"'},
    {text: 'imprime "¡ÉXITO!"', isAnswer: true},
    {text: 'nada imprime'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será la salida del siguiente código?
    ```js
    Promise.resolve('Success!')
      .then(data => {
        return data.toUpperCase()
      })
      .then(data => {
        console.log(data)
      })
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Sugerencia:** los `.then` pasan datos de forma secuencial, desde el `return value` hasta el siguiente `.then(value => /* handle value */)`.

    Un `return` es clave para pasar un valor al siguiente `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Manejo de Datos"
  title="Flujo entre `.then`"
  options={[
    {text: 'imprimir "SUCCESS!"'},
    {text: 'imprimir "Success!"'},
    {text: 'imprimir "SUCCESS!" y "SUCCESS!"', isAnswer: true},
    {text: 'nada se imprime'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será la salida del siguiente código?
    ```js
    Promise.resolve('Success!')
      .then(data => {
        return data.toUpperCase()
      })
      .then(data => {
        console.log(data)
        return data
      })
      .then(console.log)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Hay 2 llamadas a `console.log` que se ejecutarán.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Manejo de datos"
  title="Flujo entre `.then`'s"
  options={[
    {text: 'imprime "¡ÉXITO!"'},
    {text: 'imprime "¡Éxito!"'},
    {text: 'imprime "¡ÉXITO!" y "¡ÉXITO!"'},
    {text: 'imprime `undefined`', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será la salida del siguiente código?
    ```js
    Promise.resolve('Success!')
      .then(data => {
        data.toUpperCase()
      })
      .then(data => {
        console.log(data)
      })
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Sugerencia:** Los `.then` pasan datos secuencialmente, desde el valor devuelto hasta el siguiente `.then(value => /* manejar valor */)`.

    Un `return` es clave para pasar un valor al siguiente `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Manejo de Datos"
  title="Flujo entre `.then` y `.catch`"
  options={[
    {text: 'imprimir \'Oh noes!\' y \'The fails!\''},
    {text: 'imprimir \'Oh noes!\''},
    {text: 'imprimir \'The fails!\'', isAnswer: true},
    {text: 'imprimir \'actually, that worked\''},
    {text: 'nada se imprime'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será la salida del siguiente código?
    ```js
    Promise.resolve('Success!')
      .then(() => {
        throw Error('Oh noes!')
      })
      .catch(error => {
        return 'actually, that worked'
      })
      .then(data => {
        throw Error('The fails!')
      })
      .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ![annotated-code/question-9-4.webp](annotated-code/question-9-4.webp)
  </div>
  </slot>
</Challenge>

</QuizUI>
````
