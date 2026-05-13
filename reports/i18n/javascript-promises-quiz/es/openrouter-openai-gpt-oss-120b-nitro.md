# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/es/index.mdx
- Validation: passed
- Runtime seconds: 27.12
- Input tokens: 8731
- Output tokens: 4863
- Thinking tokens: unknown
- Cached input tokens: 128
- Cache write tokens: 0
- Estimated cost: $0.001216
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Quiz: 9 preguntas sobre Promesas de JavaScript'
subTitle: ¡Nunca vuelvas a romper una promesa!
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

> * **¡Demuestra tu dominio de JavaScript!** 🚀

1. **Busca Pistas** (Botón grande, esquina inferior).
2. Prueba el código en la Consola de tu navegador (usa el atajo `F12` o búscalo) o utiliza [repl.it](https://repl.it)*.
3. Siéntete libre de [twittearme @justsml](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/). **¡Me encantaría conocer tu opinión!**

### 👇 Completa las 9 preguntas abajo 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Manejo de errores"
  title="Múltiples `.catch`'s #1"
  options={[
    {text: 'imprimir mensaje una vez'},
    {text: 'imprimir mensaje dos veces', isAnswer: true},
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
    Creemos una Promise usando el método constructor, provocando un error inmediatamente con el callback `reject`.

    Luego los manejadores `.catch` funcionan como `.addEventListener(event, callback)` del DOM o `.on(event, callback)` de Event Emitter, donde **se pueden añadir múltiples callbacks de manejador**. Cada uno será llamado con los mismos argumentos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Manejo de errores"
  title="Múltiples `.catch`'s #2"
  options={[
    {text: 'imprimir mensaje una vez'},
    {text: 'imprimir mensaje dos veces'},
    {text: 'promesa rechazada sin manejar', isAnswer: true},
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
    Cuando se usa el constructor Promise debes invocar ya sea los callbacks `resolve()` o `reject()`. El constructor Promise ignora el valor de retorno del ejecutor, por lo que la Promise adicional creada con `Promise.reject()` no se encadena a `p`. Los dos manejadores se adjuntan a `p`, que queda pendiente, mientras que la Promise rechazada devuelta se informa como no manejada por el entorno host.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="Manejo de errores"
  title="Encadenando `.then` y `.catch`"
  options={[
    {text: 'imprimir error y `undefined`', isAnswer: true},
    {text: 'imprimir error dos veces'},
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
    Al encadenar `.then` y `.catch` es útil pensar en ellos como una serie de pasos. Cada `.then` recibe el valor devuelto por el `.then` anterior (como su argumento). Sin embargo, si tu "paso" encontró un error, cualquier "paso" `.then` posterior se omitirá hasta que se encuentre un `.catch`. Si deseas sobrescribir un error, solo necesitas devolver un valor que no sea un error. Ese valor puede ser accedido en cualquier `.then` posterior.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="Manejo de Errores"
  title="Encadenando `.catch`'s"
  options={[
    {text: 'imprimir mensaje de error una vez', isAnswer: true},
    {text: 'imprimir mensaje de error dos veces'},
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
    Al encadenar `.catch`'s, cada uno solo maneja los errores lanzados en los pasos anteriores de `.then` o `.catch`. En este ejemplo el primer `.catch` devuelve el `console.log`, que solo se puede acceder añadiendo un `.then()` después de ambos `.catch`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Manejo de errores"
  title="Múltiples `.catch`'s"
  options={[
    {text: 'imprimir mensaje una vez'},
    {text: 'imprimir mensaje dos veces'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'no se imprime nada', isAnswer: true},
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
    **Hint:** `.catch`'s pueden usarse para ignorar (o sobrescribir) errores simplemente devolviendo un valor regular.

    Este truco funciona solo cuando hay un `.then` posterior que reciba el valor.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Manejo de datos"
  title="Flujo entre `.then`'s"
  options={[
    {text: 'imprimir "Success!" y "SUCCESS!"'},
    {text: 'imprimir "Success!"'},
    {text: 'imprimir "SUCCESS!"', isAnswer: true},
    {text: 'no se imprime nada'},
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
    **Hint:** `.then`'s pasan datos secuencialmente, desde `return value` al siguiente `.then(value => /* handle value */)`.

    Un `return` es clave para pasar un valor al siguiente `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Manejo de datos"
  title="Flujo entre `.then`'s"
  options={[
    {text: 'imprimir "SUCCESS!"'},
    {text: 'imprimir "Success!"'},
    {text: 'imprimir "SUCCESS!" y "SUCCESS!"', isAnswer: true},
    {text: 'no se imprime nada'},
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
    {text: 'imprimir "SUCCESS!"'},
    {text: 'imprimir "Success!"'},
    {text: 'imprimir "SUCCESS!" y "SUCCESS!"'},
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
    **Hint:** `.then`'s pasan datos secuencialmente, desde `return value` al siguiente `.then(value => /* handle value */)`.

    Un `return` es clave para pasar un valor al siguiente `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Manejo de datos"
  title="Flujo entre `.then` y `.catch`"
  options={[
    {text: 'imprimir "¡Oh noes!" y "¡The fails!"'},
    {text: 'imprimir "¡Oh noes!"'},
    {text: 'imprimir "¡The fails!"', isAnswer: true},
    {text: 'imprimir "en realidad, eso funcionó"'},
    {text: 'no se imprime nada'},
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
