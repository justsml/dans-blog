# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 64.22
- Input tokens: 11873
- Output tokens: 10572
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003487
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/es/index.mdx reports/i18n/quiz-advanced-js-error-mastery/es
## Raw Output

````mdx
---
title: 'Cuestionario: Maestría en Errores de JS Avanzado'
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
```jsx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


### ¿Crees conocer los errores de JavaScript de arriba abajo?

* **¡Pon a prueba tu expertise en manejo de errores!** 💥
* No se requiere registro ni inicio de sesión. ✨
* Opción múltiple. 🤖 ... _¡Estas no son preguntas típicas de try-catch!_
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Sorpresas de serialización"
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
    Los objetos Error tienen propiedades no enumerables (`message`, `name`, `stack`), por lo que `JSON.stringify()` devuelve `{}`. Este es un error común al enviar errores en respuestas de API. Usa `JSON.stringify(error, Object.getOwnPropertyNames(error))` o crea un objeto plano en su lugar.
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
    ¿Cuál es la diferencia entre estos dos?
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` muestra el error con su mensaje y pila de seguimiento porque la consola tiene un manejo especial para los objetos Error. `JSON.stringify(err)` devuelve `'{}'` porque las propiedades de Error no son enumerables. Esta diferencia sorprende a muchos desarrolladores que depuran APIs.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Trucos de Verificación de Tipos"
  title="Herencia de instanceof"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuáles son los resultados de estas comprobaciones?
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
    Los tres devuelven `true`. `CustomError` extiende `Error`, que extiende `Object`. El operador `instanceof` verifica toda la cadena de prototipos, por lo que una instancia de `CustomError` también es una instancia de `Error` y `Object`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Trucos de comprobación de tipos"
  title="instanceof Error entre iframes"
  options={[
    {text: 'Siempre cierto'},
    {text: 'Siempre falso'},
    {text: 'Puede ser falso entre iframes', isAnswer: true},
    {text: 'Lanza un error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué sucede con `instanceof Error` entre iframes?
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
    El operador `instanceof` puede devolver `false` en diferentes contextos de ejecución (iframes, workers) porque cada contexto tiene su propia constructor `Error`. Usa `Object.prototype.toString.call(obj) === '[object Error]'` para una detección confiable de errores a través de contextos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Lanzamiento de No Errores"
  title="Lanzamiento de Cadenas"
  options={[
    {text: 'TypeError: la cadena no es un Error'},
    {text: 'false, "cadena"', isAnswer: true},
    {text: 'Crea automáticamente un objeto Error'},
    {text: 'Comportamiento indefinido'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué ocurre cuando lanzas una cadena?
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
    JavaScript permite lanzar cualquier valor. Aquí, `e instanceof Error` es `false` y `typeof e` es `"cadena"`. Esto puede romper código de manejo de errores que asuma que todas las excepciones capturadas son objetos Error. Siempre lanza instancias de Error para facilitar el depurado.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Errores personalizados"
  title="Propiedad del nombre del error"
  options={[
    {text: '«Error»'},
    {text: '«CustomError»', isAnswer: true},
    {text: 'indefinido'},
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
    `err.name` es `«CustomError»` porque `this.constructor.name` devuelve el nombre de la clase. Establecer `this.name = this.constructor.name` es un patrón común para asegurar que las clases de error personalizadas muestren el nombre correcto en rastros de pila y mensajes de error.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Errores personalizados"
  title="Trampa del nombre del constructor"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la salida sin establecer `name`?
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
    Sin establecer explícitamente `this.name`, el error hereda la propiedad `name` predeterminada de la clase `Error`, que es `"Error"`. Por eso, las clases de error personalizadas siempre deben establecer `this.name = this.constructor.name` en su constructor.
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
    {text: 'El error de envoltura'},
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
    `Error.cause` (ES2022) permite encadenar errores para preservar el contexto del error original. `wrapper.cause` hace referencia al error original, por lo tanto `wrapper.cause.message` devuelve `"Error original"`. Esto es útil para envolver errores de nivel inferior con contexto de nivel superior.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Rastros de pila"
  title="Manipulación de la pila"
  options={[
    {text: 'Elimina createError de la pila', isAnswer: true},
    {text: 'Limpia toda la pila'},
    {text: 'No hace nada'},
    {text: 'Lanza un TypeError'},
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
    `Error.captureStackTrace` (V8/Node.js) elimina la función especificada (`createError`) del rastro de pila, ocultando funciones de fábrica de errores a los usuarios finales. Esto genera rastros de pila más limpios que apuntan a dónde se llamó la fábrica, no a la fábrica misma.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Plantillas de mensajes"
  title="Literales de plantilla en errores"
  options={[
    {text: '"El valor ${value} es inválido"'},
    {text: '"El valor undefined es inválido"', isAnswer: true},
    {text: 'ReferenceError: value no está definido'},
    {text: '"El valor  es inválido"'},
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
    Los literales de plantilla convierten `undefined` en la cadena `"undefined"` durante la interpolación. El mensaje de error se convierte en `"Value undefined is invalid"`. Para mensajes más limpios, considere usar `value ?? 'null'` o comprobaciones similares antes de la interpolación.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Trampas de API"
  title="Error de respuesta de Express"
  options={[
    {text: 'Envía el objeto de error completo'},
    {text: 'Envía {"error":{}}', isAnswer: true},
    {text: 'Lanza un error de servidor'},
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
    `res.json()` usa `JSON.stringify()` internamente, por lo que el objeto Error se convierte en `{}`. El cliente recibe `{"error":{}}`. Para solucionarlo, usa `res.json({ error: error.message })` o `res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Errores asíncronos"
  title="Valores de rechazo de promesas"
  options={[
    {text: 'Siempre objetos Error'},
    {text: 'Cualquier valor puede ser un rechazo', isAnswer: true},
    {text: 'Solo cadenas y objetos Error'},
    {text: 'Automáticamente envueltos en Error'},
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
    Al igual que `throw`, `Promise.reject()` acepta cualquier valor: cadenas, objetos, números, etc. Esto imprime `"string"`, `404` y `42`. Siempre verifica el tipo de los valores capturados en cadenas de promesas, especialmente al trabajar con código de terceros que podría rechazar con valores no Error.
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
    {text: 'Deprecadas y eliminadas'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué tan confiables son `error.code` y `error.errno`?
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
    Propiedades como `code` y `errno` son específicas del entorno (Node.js en este caso) y no forman parte del objeto Error estándar. Los errores en navegadores no tendrán estas propiedades. Siempre verifica su existencia: `if (err.code === 'ENOENT')` en lugar de asumir que existen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Límites de Error"
  title="Objeto vs Detección de Error"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué devuelven estos controles?
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
    `instanceof Error` devuelve `false` porque el objeto no fue creado por el constructor Error. `Object.prototype.toString.call()` también devuelve `false` (devuelve `'[object Object]'`) porque verifica la ranura interna `[[Class]]`. Ambos métodos identifican correctamente esto como un objeto de error falso.
  </div>
  </slot>
</Challenge>

</QuizUI>

## Domina el arte del manejo de errores

Desde problemas de serialización hasta fallas de instanceof entre contextos, estos conceptos avanzados separan a los desarrolladores juniors de los ~experimentados~ profesionales dañados.

¿Listo para más desafíos? Consulta nuestra [colección completa de cuestionarios](../challenges/) para más acertijos sobre JavaScript, algoritmos y más.
````
