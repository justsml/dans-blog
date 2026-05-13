# Translation Candidate
- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: es
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/es/index.mdx
- Validation: deferred
- Runtime seconds: 48.02
- Input tokens: 6180
- Output tokens: 7888
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.002986
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Cuestionario: Símbolos y Enumerables'
subTitle: ¿Conoces los aspectos menos conocidos de ES2015?
label: Symbols
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-10-31'
modified: '2024-11-07'
tags:
  - quiz
  - javascript
  - interfaces
  - symbols
  - enumerables
cover_full_width: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash.webp
cover_mobile: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash_w300.webp
cover_icon: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash_w300.webp
---
## Quiz: Interfaces de JavaScript, Símbolos y Enumerables

> * **¡Demuestra tus habilidades en JavaScript!** 🚀
> * No se requiere inicio de sesión ni registro. ✨
> * Opción múltiple. 🤖 ... _¿Qué tan difícil puede ser, eh?_

import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Interfaces Avanzadas"
  title="Getter vs Acceso Directo a Propiedades"
  options={[
    {text: 'Usar un bucle'},
    {text: 'Llamar a un método para acceder al valor'},
    {text: 'Acceder al valor directamente', isAnswer: true},
    {text: 'Lanzar un error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo deberías acceder a una propiedad de un objeto JavaScript que usa un método getter?
    ```js
        const obj = {
          get val() {
            return 'got it!';
          }
        };
        console.log(obj.val);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En JavaScript, un getter se puede acceder como una propiedad normal. No es necesario llamarlo como una función.
    En este ejemplo, acceder directamente a `obj.val` invoca el método getter y muestra `got it!`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Interfaces Avanzadas"
  title="Uso de Símbolos en Claves de Objetos"
  options={[
    {text: 'Usando un Symbol', isAnswer: true},
    {text: 'Usando un string'},
    {text: 'Usando un número'},
    {text: 'Usando un objeto como clave'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la forma correcta de crear una clave de propiedad verdaderamente única para un objeto de JavaScript?
    ```js
        const uniqueKey = Symbol('myUniqueKey');
        const obj = {
          [uniqueKey]: 'unique value'
        };
        console.log(obj[uniqueKey]);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los Symbols son un tipo primitivo único e inmutable que se puede usar como claves para propiedades de objetos. Esto ayuda a evitar colisiones de nombres, especialmente en bases de código grandes o al escribir bibliotecas reutilizables.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Interfaces Avanzadas"
  title="Propiedades Enumerables"
  options={[
    {text: 'Lanza un error'},
    {text: 'No, no se listará'},
    {text: 'Depende del tipo de valor'},
    {text: 'Sí, se listará', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Se listará la propiedad `age` durante una iteración `for...in`?
    ```js
        const person = {};
        Object.defineProperty(person, 'age', {
          value: 25,
          enumerable: true
        });
        for (let key in person) {
          console.log(key);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La propiedad `enumerable` en `Object.defineProperty()` controla si la propiedad aparecerá en métodos de enumeración como `for...in`. En este ejemplo, como `enumerable: true`, la propiedad `age` se listará durante la iteración.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Trabajando con objetos"
  title="Enumerabilidad predeterminada con Object.defineProperty()"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Depende del contexto'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la enumerabilidad predeterminada de una propiedad al usar `Object.defineProperty()` sin especificar `enumerable`?
    ```js
        const car = {};
        Object.defineProperty(car, 'make', {
          value: 'Toyota'
        });
        console.log(Object.keys(car));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Cuando usas `Object.defineProperty()` sin especificar `enumerable`, su valor predeterminado es `false`. Esto significa que la propiedad `make` no aparecerá en `Object.keys()` ni en otros métodos de enumeración.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Interfaces Avanzadas"
  title="Símbolos Únicos"
  options={[
    {text: 'Depende de sus descripciones'},
    {text: 'verdadero'},
    {text: 'falso', isAnswer: true},
    {text: 'Lanza un error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será el resultado de la siguiente comparación?
    ```js
        const sym1 = Symbol('id');
        const sym2 = Symbol('id');
        console.log(sym1 === sym2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Cada llamada a `Symbol()` crea un valor único e inmutable, incluso si la descripción es la misma. En este caso, `sym1` y `sym2` son símbolos diferentes, por lo que la comparación devuelve `false`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Interfaces Avanzadas"
  title="Símbolos como Claves No Enumerables"
  options={[
    {text: 'No, no se listará', isAnswer: true},
    {text: 'Sí, se listará'},
    {text: 'Depende del método de iteración'},
    {text: 'Lanza un error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Se listará la propiedad con clave Symbol durante una iteración `for...in`?
    ```js
        const sym = Symbol('uniqueKey');
        const obj = {
          [sym]: 'symbol value',
          regularKey: 'regular value'
        };
        for (let key in obj) {
          console.log(key);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las propiedades con clave Symbol pueden tener su propia bandera `enumerable`, pero `for...in` y `Object.keys()` solo visitan propiedades enumerables con clave de cadena. En este ejemplo, solo se listará `regularKey`, no la propiedad con clave Symbol.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Interfaces Avanzadas"
  title="Obtener todas las claves Symbol"
  options={[
    {text: 'Object.keys()'},
    {text: 'Symbol.keys()'},
    {text: 'Object.symbols()'},
    {text: 'Object.getOwnPropertySymbols()', isAnswer: true},
    {text: 'Object.entries()'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué método se puede usar para obtener todas las claves Symbol de un objeto?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El método `Object.getOwnPropertySymbols()` se utiliza para obtener las claves de propiedades Symbol propias de un objeto.
    ```js
        const sym1 = Symbol('id');
        const sym2 = Symbol('name');
        const obj = {
          [sym1]: 'symbol value',
          [sym2]: 'another symbol value'
        };
        console.log(Object.getOwnPropertySymbols(obj));
        // [Symbol(id), Symbol(name)]
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
