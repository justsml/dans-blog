# Translation Candidate
- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 29.87
- Input tokens: 5840
- Output tokens: 5527
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001794
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/es/index.mdx reports/i18n/quiz-js-interfaces-symbols-and-enumerables/es
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
## Cuestionario: Interfaces, Símbolos y Enumerables en JavaScript

> * ¡Demuestra tus habilidades en JavaScript! 🚀  
> * No se requiere iniciar sesión ni registrarse. ✨  
> * Preguntas de opción múltiple. 🤖 ... _¿Qué tan difícil puede ser, eh?_  

import Challenge from '../../../../../components/QuizUI/Challenge';  
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Interfaces Avanzadas"
  title="Getter vs Acceso Directo a Propiedad"
  options={[
    {text: 'Usar un bucle'},
    {text: 'Llamar a un método para acceder al valor'},
    {text: 'Acceder al valor directamente', isAnswer: true},
    {text: 'Lanzar un error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo debes acceder a una propiedad de un objeto JavaScript que utiliza un método getter?
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
    En JavaScript, un getter se accede como una propiedad normal. No es necesario llamarlo como una función.
    En este ejemplo, acceder a `obj.val` directamente invoca al método getter y muestra `got it!`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Interfaces Avanzadas"
  title="Uso de Símbolos en Claves de Objetos"
  options={[
    {text: 'Usando un Símbolo', isAnswer: true},
    {text: 'Usando una cadena'},
    {text: 'Usando un número'},
    {text: 'Usando un objeto como clave'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la forma correcta de crear una clave de propiedad verdaderamente única para un objeto en JavaScript?
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
    Los símbolos son un tipo primitivo único e inmutable que se pueden usar como claves para propiedades de objetos. Esto ayuda a evitar colisiones de nombres, especialmente en grandes bases de código o al escribir bibliotecas reutilizables.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Interfaces Avanzadas"
  title="Propiedades Enumerable"
  options={[
    {text: 'Lanza un error'},
    {text: 'No, no lo hará'},
    {text: 'Depende del tipo de valor'},
    {text: 'Sí, se incluirá en la lista', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Se incluirá la propiedad `age` en una iteración `for...in`?
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
    La propiedad `enumerable` en `Object.defineProperty()` controla si la propiedad aparecerá en métodos de enumeración como `for...in`. En este ejemplo, como `enumerable: true`, la propiedad `age` se incluirá en la iteración.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Trabajando con objetos"
  title="Enumerabilidad por defecto con Object.defineProperty()"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Depende del contexto'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la enumerabilidad por defecto de una propiedad al usar `Object.defineProperty()` sin especificar `enumerable`?
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
    Cuando usas `Object.defineProperty()` sin especificar `enumerable`, su valor predeterminado es `false`. Esto significa que la propiedad `make` no aparecerá en `Object.keys()` u otros métodos de enumeración.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Interfaces avanzadas"
  title="Símbolos únicos"
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
  group="Interfaces Avanzadas"
  title="Símbolos como claves no enumerables"
  options={[
    {text: 'No, no se listará', isAnswer: true},
    {text: 'Sí, se listará'},
    {text: 'Depende del método de iteración'},
    {text: 'Lanza un error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Se listará la propiedad con clave Símbolo durante una iteración `for...in`?
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
    Las propiedades con claves Símbolo pueden tener su propia bandera `enumerable`, pero `for...in` y `Object.keys()` solo visitan las propiedades enumerables con claves de cadena. En este ejemplo, solo se listará `regularKey`, no la propiedad con clave Símbolo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Interfaces Avanzadas"
  title="Recuperar todas las claves de Símbolo"
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
    ¿Qué método se puede utilizar para recuperar todas las claves de Símbolo de un objeto?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El método `Object.getOwnPropertySymbols()` se utiliza para recuperar las propias claves de propiedad de Símbolo de un objeto.
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
