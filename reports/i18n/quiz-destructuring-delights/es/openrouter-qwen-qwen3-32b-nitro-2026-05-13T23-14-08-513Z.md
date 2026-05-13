# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/es/index.mdx
- Validation: deferred
- Runtime seconds: 43.72
- Input tokens: 10444
- Output tokens: 11919
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003696
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Cuestionario: Destructuring Placeres'
subTitle: ¿Eres un maestro de la Destructuración?
label: Destructuring
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-11-12'
modified: '2024-11-16'
tags:
  - quiz
  - intro
  - javascript
  - es2015
  - destructuring
  - beginner
  - intermediate
cover_full_width: ../boxes-of-nesting-dolls.webp
cover_mobile: ../boxes-of-nesting-dolls-square.webp
cover_icon: ../boxes-of-nesting-dolls-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

{/* Are you a maestero of Destructuring?<br/> */}
<p class="inset">¿O es tu <em>Sinfonía de la Destrucción?</em></p>

Este cuestionario evaluará tus conocimientos sobre desestructuración en JavaScript: desde la sintaxis básica de objetos hasta la desestructuración anidada y los valores predeterminados. ¡Y preguntas adicionales sobre TypeScript y tipos en línea!

Vamos al calentamiento - ¡demuestra tus habilidades de desestructuración! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Calentamiento: Objetos"
  title="Desestructuración básica de objetos"
  options={[
    {text: 'Nombre: Dan Levy, Edad: 20'},
    {text: 'Nombre: Dan Levy, Edad: 40'},
    {text: 'Nombre: Dan Levy, Edad: Infinity'},
    {text: 'Nombre: Dan Levy, Edad: undefined', isAnswer: true},
    {text: 'Error: No se puede leer la propiedad \'age\''},
    {text: 'Nombre: undefined, Edad: 40'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué imprimirá este código?
    ```js
        const person = {
          name: 'Dan Levy',
          location: 'Cape Town',
        };
        const { name, age } = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La propiedad `age` no existe en `person`, por lo que `age` será `undefined`. Definitivamente no `Infinity` 😅

    Esto resulta en:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Calentamiento: Arrays"
  title="Valor predeterminado en la desestructuración de objetos"
  options={[
    {text: 'Nombre: Dan Levy, Edad: NaN'},
    {text: 'Nombre: Dan Levy, Edad: null'},
    {text: 'Nombre: Dan Levy, Edad: undefined', isAnswer: true},
    {text: 'Nombre: Dan Levy, Edad: 40'},
    {text: 'Error: No se puede desestructurar la propiedad \'age\''},
    {text: 'Error de sintaxis: Token inesperado \',\''},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hará este código?
    ```js
        const person = [ 'Dan Levy', 'Cape Town' ];
        const [ name, origin, age ] = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La variable `age` no está presente en el array `tuple`, por lo que será `undefined`.

    Esto da como resultado:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Desestructuración Anidada"
  title="Desestructuración Anidada"
  options={[
    {text: 'Primero: Dan, Ciudad: Denver'},
    {text: 'Primero: undefined, Ciudad: Denver'},
    {text: 'Error: Cannot read property \'first\''},
    {text: 'Primero: Dan, Ciudad: undefined'},
    {text: 'Error', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué tal un poco de desestructuración anidada?
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first },
          address: { city },
          birth: { place },
        } = person;
        console.log(
          `First: ${first}, City: ${place}`,
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La propiedad `birth: { place }` no existe en `person`, por lo que lanzará un error.
    Una solución es proporcionar valores predeterminados para propiedades anidadas.

    Al acceder a propiedades anidadas, ten cuidado, ya que los errores pueden ser difíciles de detectar. Y los mensajes de error varían entre navegadores y otras plataformas, lo que hace que sea un poco más complicado de depurar.

    En Chrome moderno: `TypeError: Cannot read properties of undefined (reading 'place')`

    En Node, también es un `TypeError` porque JavaScript intenta desestructurar `place` de `undefined` antes de que `place` se lea alguna vez.

    La redacción exacta varía entre navegadores y entornos de ejecución.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Valores predeterminados"
  title="Valores predeterminados en el desestructuramiento de objetos"
  options={[
    {text: 'Hola Dan desde Desconocido'},
    {text: 'Hola Dan desde Denver'},
    {text: 'Hola Desconocido desde Desconocido'},
    {text: 'Hola Desconocido desde Denver'},
    {text: 'Error', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hará esto ahora con algunos valores predeterminados?
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' },
        } = person;
        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La propiedad `birth` no existe en `person`, así que todo el objeto aún necesita un valor predeterminado, no solo la propiedad anidada. Básicamente, le falta un ` = {}` como valor predeterminado.

    De esta forma, se está diciendo: "si `person.birth` es `undefined`, entonces `place` es `Unknown". Pero `person.birth` es `undefined`, así que intenta desestructurar `undefined`, lo que resulta en un error.
    ```plaintext
        In modern Chrome: `TypeError: Cannot read properties of undefined (reading 'place')`

        In Node, this is also a `TypeError` because JavaScript tries to destructure `place` from `undefined`.

        Exact wording varies between browsers and runtimes.
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Valores predeterminados"
  title="Valores predeterminados en el desestructuramiento de objetos"
  options={[
    {text: 'Hola Dan de Denver'},
    {text: 'Hola Dan de Johannesburgo'},
    {text: 'Hola Dan de Desconocido', isAnswer: true},
    {text: 'Hola Desconocido de Desconocido'},
    {text: 'Hola Desconocido de Denver'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hará esto?
    ```js
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' } = {},
        } = person;

        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La propiedad `birth` no existe en `person`, por lo que se recurre a un objeto vacío ` = {}`. Esto permite usar el valor predeterminado.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Argumentos de función"
  title="Parámetros de función con valores predeterminados"
  options={[
    {text: 'Hola Dan desde undefined'},
    {text: 'Hola Dan desde Unknown'},
    {text: 'Hola Dan desde Denver'},
    {text: 'Hola Unknown desde Unknown'},
    {text: 'Hola Unknown desde Denver'},
    {text: 'Error', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Ahora, como parámetros de función, ¿qué hará esto?
    ```js
        'use strict';
        function displayUser({
          name = "Unknown",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`Hi ${name} from ${place}`);
        }
        displayUser({ name: "Dan" });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Esta función extrae las propiedades `name` y `age`, usando valores predeterminados si es necesario. En este caso, la clave `place` en el objeto predeterminado es solo ruido, no se usa dentro de `displayUser()`.

    El modo estricto no cambia esto: leer la variable no declarada `place` lanza un `ReferenceError`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Argumentos de Función"
  title="Desestructuración con Valores Predeterminados Anidados"
  options={[
    {text: 'Desconocido, Desconocido, Joburg'},
    {text: 'Desconocido, Desconocido, Desconocido'},
    {text: 'Desconocido, `undefined`, Joburg'},
    {text: 'N/A, `undefined`, Joburg'},
    {text: 'N/A, Desconocido, Joburg'},
    {text: 'N/A, N/A, Joburg', isAnswer: true},
    {text: 'Desconocido, N/A, Joburg'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo se manejan los valores `undefined`?
    ```js
        'use strict';
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan" });
        displayPlace({ name: "Dan", place: undefined });
        displayPlace({ name: "Dan", place: "Joburg" });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La función `displayPlace` USARÁ UN OBJETO POR DEFECTO SOLO SI NO SE PASA NINGÚN OBJETO. Por lo tanto, el único modo de obtener `{ place: "Unknown" }` es llamando a `displayPlace()` sin argumentos.

    Un comportamiento destacable aquí es que pasar `undefined` para `place` hará que se use el valor por defecto, similar al comportamiento de `JSON.stringify` (ignorar `undefined`, reconocer `null`).

    Esto resulta en:
    ```js
        displayPlace() // Unknown
        displayPlace({ name: "Dan" }) // N/A
        displayPlace({ name: "Dan", place: undefined }) // N/A
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Argumentos de Función"
  title="Desestructuración con Valores Predeterminados Anidados"
  options={[
    {text: 'N/A, N/A'},
    {text: 'N/A, undefined'},
    {text: 'Unknown, N/A'},
    {text: 'Unknown, Unknown'},
    {text: 'Unknown, undefined'},
    {text: 'null, N/A', isAnswer: true},
    {text: 'null, Unknown'},
    {text: 'null, undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Similar al anterior... ¿cómo se maneja el `null`?_
    ```js
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan", place: null });
        displayPlace({ name: "Dan", place: undefined });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En este caso, la propiedad `place` se establece en `null` en la primera llamada y en `undefined` en la segunda. El valor predeterminado para `place` solo se usa si el objeto completo está ausente **o** es `undefined`. Los valores `null` se mantendrán como `null`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Tipos en Línea de TypeScript"
  title="Destructuración con Valores Predeterminados Anidados"
  options={[
    {text: 'N/A'},
    {text: 'undefined'},
    {text: 'Unknown'},
    {text: '\'null\''},
    {text: 'Error de TypeScript', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Ahora en TypeScript... _¿qué hará esto?_
    ```ts
        'use strict';
        function displayPlace(
          {
            name = 'N/A',
            place = 'N/A',
          }: {
            name: string;
            place: string;
            age: number;
          },
        ) {
          console.log(`${place}`);
        }
        displayPlace({ name: 'Dan', place: null });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    TypeScript reporta un error porque `place` está tipado como `string`, pero la llamada pasa `null`. La llamada también omite la propiedad requerida `age`.

    Si ignoras los errores de tipo, ejecutar el código imprimirá `null` en la consola.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="TypeScript: Con asignación"
  title="Desestructuración con valores predeterminados anidados"
  options={[
    {text: 'undefined'},
    {text: 'null'},
    {text: 'No aplica'},
    {text: 'Desconocido'},
    {text: 'Denver', isAnswer: true},
    {text: 'SyntaxError'},
    {text: 'Error: Tipo no válido'},
    {text: 'Error: Argumentos no válidos'},
  ]}
>
  <slot name="question">
  <div className="question">
    Vamos a probar un poco de renombrado/asignación...
    ```ts
        'use strict';
        function displayPlace({
          name = 'N/A',
          place: location = 'N/A',
        }: {
          name: string;
          place: string;
          age?: number;
        }) {
          console.log(`${location}`);
        }
        displayPlace({ name: 'Dan', place: 'Denver' });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Esto imprimirá `Denver` en la consola. La propiedad `place` se renombra a `location` en la firma de la función. Este es un patrón común (renombrar propiedades durante la desestructuración) al adaptar estructuras de datos de terceros.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Desestructuración anidada en TS"
  title="Desestructuración con valores predeterminados anidados"
  options={[
    {text: 'Error: La propiedad \'first\' está faltando'},
    {text: 'Error: La propiedad \'last\' está faltando'},
    {text: 'Error: Las propiedades \'birth\' y \'age\' están faltando', isAnswer: true},
    {text: 'Error: La propiedad \'place\' está faltando'},
    {text: 'Error: \'string\' no tiene propiedades en {...}'},
  ]}
>
  <slot name="question">
  <div className="question">
    Encuentra el error de tipo:
    ```ts
        function greet({
          name: {first = "N/A", last = "N/A"},
          birth: {place = "N/A"} = {},
          age = -1,
        }: {
          name: {first?: string, last?: string};
          birth: {place?: string};
          age: number;
        }) {
          console.log(`Hi ${first} ${last} from ${place}`);
        }
        greet({ name: {first: 'Dan'} });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El error está en la firma de la función `greet`. Las propiedades `age` y `birth` faltan en el objeto pasado, por lo que deberían ser opcionales en la definición de tipo.

    Aunque la propiedad `birth` se desestructura con un valor predeterminado, la definición de tipo requiere que esté presente. Para marcar una propiedad como opcional en TypeScript, debes usar el operador `?`.

    Nota que `birth?: { place?: string }` no es lo mismo que `birth: { place?: string } | undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="TypeScript + Asignación"
  title="Desestructuración con Valores Anidados, Asignación y Tipos"
  options={[
    {text: 'Hola Dan Levy desde N/A'},
    {text: 'Hola Dan Levy desde Ciudad del Cabo'},
    {text: 'Hola N/A N/A desde N/A'},
    {text: 'Hola N/A N/A desde Ciudad del Cabo'},
    {text: 'Error', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Ahora con **asignación** (observe las variables `f`, `l` y `p`)
    ```ts
        'use strict';
        function greet(
          {
            name: {first: f = "N/A", last: l = "N/A"},
            birth: {place: p = "N/A"} = {},
            age = -1,
          }: {
            name: {first?: string, last?: string};
            birth?: {place?: string};
            age?: number;
          }
        ) {
          console.log(`Hi ${f} ${l} from ${place}`);
          // What will 👆 do?
        }
        greet({
          name: {first: 'Dan', last: 'Levy'},
          birth: {place: 'Cape Town'},
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ¡Otro error! ¿Ya estás adivinando, no?!

    Es difícil leer capas de desestructuración con valores predeterminados, asignación y tipos.

    Tan pronto como `place` se reasigna a la variable `p`, deja de estar definido en el ámbito de la sentencia `console.log`.
    ```ts
        console.log(`Hi ${f} ${l} from ${place}`); // ❌
        // to:
        console.log(`Hi ${f} ${l} from ${p}`); // ✅
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
