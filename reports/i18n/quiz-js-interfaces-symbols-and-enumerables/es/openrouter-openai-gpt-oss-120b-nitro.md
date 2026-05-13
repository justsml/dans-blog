# Translation Candidate
- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/es/index.mdx
- Validation: passed
- Runtime seconds: 12.22
- Input tokens: 6850
- Output tokens: 3246
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000851
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Cuestionario: Símbolos y Enumerables'
subTitle: ¿Dominaslos rincones menos conocidos de ES2015?
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
## Quiz: Interfaces de JavaScript, Symbols y Enumerables

> * **¡Demuestra tu dominio de JavaScript!** 🚀  
> * No se requiere iniciar sesión ni registrarse. ✨  
> * Opción múltiple. 🤖 … _¿Qué tan difícil puede ser, no?_

import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Interfaces Avanzadas"
  title="Getter vs Acceso Directo a la Propiedad"
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
    En este ejemplo, acceder a `obj.val` invoca directamente el método getter y muestra `got it!`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Interfaces avanzadas"
  title="Uso de Symbol en claves de objetos"
  options={[
    {text: 'Usar un Symbol', isAnswer: true},
    {text: 'Usar una cadena'},
    {text: 'Usar un número'},
    {text: 'Usar un objeto como clave'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la forma correcta de crear una clave de propiedad verdaderamente única para un objeto JavaScript?
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
    Los Symbols son un tipo primitivo único e inmutable que pueden usarse como claves para propiedades de objetos. Esto ayuda a evitar colisiones de nombres, especialmente en bases de código grandes o al escribir bibliotecas reutilizables.
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
    {text: 'No, no lo hará'},
    {text: 'Depende del tipo de valor'},
    {text: 'Sí, será listado', isAnswer: true},
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
  group="Trabajando con Objetos"
  title="Enumerabilidad predeterminada con Object.defineProperty()"
  options={[
    {text: 'verdadero'},
    {text: 'falso', isAnswer: true},
    {text: 'indefinido'},
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
    {text: 'true'},
    {text: 'false', isAnswer: true},
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
  group="Interfaces avanzadas"
  title="Símbolos como claves no enumerables"
  options={[
    {text: 'No, no lo hará', isAnswer: true},
    {text: 'Sí, aparecerá en la lista'},
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
    Las propiedades con clave Symbol pueden tener su propia bandera `enumerable`, pero `for...in` y `Object.keys()` solo recorren propiedades enumerables con clave de tipo string. En este ejemplo, solo se listará `regularKey`, no la propiedad con clave Symbol.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Interfaces avanzadas"
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
    El método `Object.getOwnPropertySymbols()` se usa para obtener las claves de propiedades Symbol propias de un objeto.
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
