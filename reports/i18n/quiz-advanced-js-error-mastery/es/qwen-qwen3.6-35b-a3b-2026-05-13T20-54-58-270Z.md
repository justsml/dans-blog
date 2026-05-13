# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: es
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/es/index.mdx
- Validation: deferred
- Runtime seconds: 296.64
- Input tokens: 13431
- Output tokens: 47190
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Quiz: Dominio avanzado de errores en JS'
subTitle: ¿Son tus excepciones realmente excepcionales?
label: Errors
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2025-11-03'
modified: '2025-11-04'
tags:
  - quiz
  - javascript
  - error-handling
  - debugging
  - advanced
cover_full_width: ../ahmed-slimene-c09hZthLq_s-unsplash-wide.webp
cover_mobile: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_icon: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@assl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ahmed
  Slimene</a> on <a
  href="https://unsplash.com/photos/a-tall-white-building-with-balconies-on-top-of-it-c09hZthLq_s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


### ¿Crees que dominas los errores de JavaScript al detalle?

* **¡Pon a prueba tu experiencia en el manejo de errores!** 💥
* Sin necesidad de iniciar sesión ni registrarte. ✨
* Opción múltiple. 🤖 ... _Estas no son las típicas preguntas de try-catch._
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Sorpresas de la serialización"
  title="El misterio del objeto vacío"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué devuelve `JSON.stringify(error)`?
    ```js
        const error = new Error('Oops');
        console.log(JSON.stringify(error));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los objetos `Error` tienen propiedades no enumerables (`message`, `name`, `stack`), por lo que `JSON.stringify()` devuelve `{}`. Este es un error común al enviar errores en respuestas de API. Usa `JSON.stringify(error, Object.getOwnPropertyNames(error))` o crea un objeto plano en su lugar.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Sorpresas de serialización"
  title="Consola vs JSON"
  options={[
    {text: 'Ambos muestran la misma salida'},
    {text: 'console.log muestra más información', isAnswer: true},
    {text: 'JSON.stringify muestra más información'},
    {text: 'Ambos muestran objetos vacíos'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué diferencia hay entre estas dos?
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` muestra el error con su mensaje y traza de pila porque la consola tiene un manejo especial para objetos Error. `JSON.stringify(err)` devuelve `'{}'` porque las propiedades de Error no son enumerables. Esta diferencia suele despistar a muchos desarrolladores al depurar APIs.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Trucos de verificación de tipos"
  title="Herencia con instanceof"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué devuelven estas comprobaciones?
    ```js
        class CustomError extends Error {}
        const err = new CustomError('test');
    
        console.log(err instanceof CustomError);
        console.log(err instanceof Error);
        console.log(err instanceof Object);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las tres devuelven `true`. `CustomError` extiende a `Error`, que a su vez extiende a `Object`. El operador `instanceof` revisa toda la cadena de prototipos, por lo que una instancia de `CustomError` también es una instancia de `Error` y de `Object`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Trucos de verificación de tipos"
  title="instanceof entre iframes"
  options={[
    {text: 'Siempre verdadero'},
    {text: 'Siempre falso'},
    {text: 'Puede ser falso entre iframes', isAnswer: true},
    {text: 'Lanza un error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué pasa con `instanceof Error` al cruzar iframes?
    ```js
        // In iframe:
        const iframeError = new Error('test');
        // In parent window:
        console.log(iframeError instanceof Error);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `instanceof` puede devolver `false` en distintos contextos de ejecución (iframes, workers) porque cada uno tiene su propio constructor `Error`. Usa `Object.prototype.toString.call(obj) === '[object Error]'` para detectar errores de forma fiable entre contextos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Lanzar valores no-Error"
  title="Lanzar strings"
  options={[
    {text: 'TypeError: string no es un Error'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'Crea un objeto Error automáticamente'},
    {text: 'comportamiento indefinido'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué pasa cuando lanzas un string?
    ```js
        try {
          throw "Oops!";
        } catch (e) {
          console.log(e instanceof Error);
          console.log(typeof e);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    JavaScript permite lanzar cualquier valor. Aquí, `e instanceof Error` es `false` y `typeof e` es `"string"`. Esto puede romper el código de manejo de errores que asume que todas las excepciones capturadas son objetos Error. Siempre lanza instancias de Error para facilitar la depuración.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Errores personalizados"
  title="Propiedad `name` de Error"
  options={[
    {text: '"Error"'},
    {text: '"CustomError"', isAnswer: true},
    {text: 'undefined'},
    {text: 'Depende del navegador'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el valor de `err.name`?
    ```js
        class CustomError extends Error {
          constructor(message) {
            super(message);
            this.name = this.constructor.name;
          }
        }
        const err = new CustomError('test');
        console.log(err.name);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `err.name` es `"CustomError"` porque `this.constructor.name` devuelve el nombre de la clase. Asignar `this.name = this.constructor.name` es un patrón común para garantizar que las clases de error personalizadas muestren el nombre correcto en los rastros de pila y los mensajes de error.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Errores personalizados"
  title="La trampa del nombre del constructor"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la salida si no configuras `name`?
    ```js
        class MyError extends Error {
          // No constructor or name setting
        }
        const err = new MyError('test');
        console.log(err.name);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Si no asignas explícitamente `this.name`, el error hereda la propiedad `name` predeterminada de la clase `Error`, que es `"Error"`. Ahí está la razón por la que las clases de errores personalizados siempre deben configurar `this.name = this.constructor.name` en su constructor.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Causa del error"
  title="Error.cause moderno"
  options={[
    {text: '"Error original"', isAnswer: true},
    {text: 'undefined'},
    {text: '"El error que envuelve"'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué devuelve `wrapper.cause.message`?
    ```js
        const original = new Error('Original error');
        const wrapper = new Error('Wrapper', 
          { cause: original }
        );
        console.log(wrapper.cause.message);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Error.cause` (ES2022) permite encadenar errores para preservar el contexto original. `wrapper.cause` apunta al error inicial, así que `wrapper.cause.message` devuelve `"Error original"`. Esto es útil para envolver errores de bajo nivel con contexto de nivel superior sin perder el rastro de la causa raíz.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Seguimientos de pila"
  title="Manipulación de la pila"
  options={[
    {text: 'Elimina `createError` del stack', isAnswer: true},
    {text: 'Limpia todo el stack'},
    {text: 'No hace nada'},
    {text: 'Lanza un `TypeError`'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace `Error.captureStackTrace`?
    ```js
        function createError(msg) {
          const err = new Error(msg);
          Error.captureStackTrace(err, createError);
          return err;
        }
        const error = createError('test');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Error.captureStackTrace` (V8/Node.js) elimina la función especificada (`createError`) del seguimiento de pila, haciendo que las funciones factoría de errores sean invisibles para los usuarios finales. Esto genera seguimientos de pila más limpios que apuntan a dónde se llamó a la factoría, no a la factoría en sí.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Plantillas de mensaje"
  title="Literales de plantilla en errores"
  options={[
    {text: '"El valor ${value} no es válido"'},
    {text: '"El valor undefined no es válido"', isAnswer: true},
    {text: 'ReferenceError: value no está definido'},
    {text: '"El valor  no es válido"'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el mensaje de error?
    ```js
        function validate(value) {
          if (!value) {
            throw new Error(
              `Value ${value} is invalid`
            );
          }
        }
        try {
          validate(undefined);
        } catch (e) {
          console.log(e.message);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los literales de plantilla transforman `undefined` en la cadena `"undefined"` durante la interpolación. Por eso, el mensaje de error queda como `"Value undefined is invalid"`. Para evitar esto y obtener mensajes más limpios, usa `value ?? 'null'` o validaciones similares antes de interpolar.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Trampas de la API"
  title="Error en la respuesta de Express"
  options={[
    {text: 'Envía el objeto de error completo'},
    {text: 'Envía {"error":{}}', isAnswer: true},
    {text: 'Lanza un error del servidor'},
    {text: 'Envía solo el mensaje de error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué se envía al cliente?
    ```js
        // Express.js route
        app.get('/api/data', (req, res) => {
          const error = new Error('Database failed');
          res.json({ error });
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `res.json()` llama a `JSON.stringify()` por debajo, así que el objeto Error se vacía y termina siendo `{}`. El cliente recibe `{"error":{}}`. Para arreglarlo, extrae los datos manualmente: `res.json({ error: error.message })` o `res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Errores asíncronos"
  title="Valores de rechazo de Promise"
  options={[
    {text: 'Siempre objetos Error'},
    {text: 'Cualquier valor puede ser un rechazo', isAnswer: true},
    {text: 'Solo strings y objetos Error'},
    {text: 'Se envuelve automáticamente en Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué puede aceptar `Promise.reject()`?
    ```js
        Promise.reject('string').catch(e => 
          console.log(typeof e)
        );
        Promise.reject({code: 404}).catch(e => 
          console.log(e.code)
        );
        Promise.reject(42).catch(e => 
          console.log(e)
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Al igual que `throw`, `Promise.reject()` acepta cualquier valor: strings, objetos, números, etc. Esto imprime `"string"`, `404` y `42`. Siempre verifica el tipo de los valores capturados en las cadenas de promesas, sobre todo cuando trabajas con código de terceros que podría rechazar con valores que no sean `Error`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Propiedades de Error"
  title="Propiedades no estándar"
  options={[
    {text: 'Siempre disponibles'},
    {text: 'Pueden no existir en todos los entornos', isAnswer: true},
    {text: 'Solo en Node.js'},
    {text: 'Descontinuadas y eliminadas'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué tan confiables son realmente `error.code` y `error.errno`?
    ```js
        const fs = require('fs');
        fs.readFile('missing.txt', (err, data) => {
          if (err) {
            console.log(err.code);    // 'ENOENT'
            console.log(err.errno);   // -2
          }
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Propiedades como `code` y `errno` son específicas del entorno (Node.js, en este caso) y no forman parte del objeto `Error` estándar. Los errores en el navegador no las tendrán. Siempre verifica su existencia antes de usarlas: `if (err.code === 'ENOENT')`, en lugar de asumir que están ahí por defecto.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Límites de error"
  title="Detección de objetos vs errores"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué devuelven estas comprobaciones?
    ```js
        const fakeError = {
          name: 'Error',
          message: 'Fake error',
          stack: 'fake stack'
        };
    
        console.log(fakeError instanceof Error);
        console.log(Object.prototype.toString.call(
          fakeError
        ) === '[object Error]');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `instanceof Error` retorna `false` porque el objeto no fue instanciado mediante el constructor `Error`. `Object.prototype.toString.call()` también retorna `false` (devuelve `'[object Object]'`) porque inspecciona el slot interno `[[Class]]`. Ambas formas detectan correctamente que se trata de un objeto de error falso.
  </div>
  </slot>
</Challenge>

</QuizUI>

## Domina el arte del manejo de errores

Desde las trampas de serialización hasta los fallos de instanceof entre contextos, estos conceptos avanzados separan a los desarrolladores junior de los profesionales ~veteranos~ dañados.

¿Listo para más desafíos? Consulta nuestra [colección completa de cuestionarios](../challenges/) para seguir poniendo a prueba tu mente con acertijos sobre JavaScript, algoritmos y más.
````
