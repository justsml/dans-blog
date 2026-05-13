# Translation Candidate
- Slug: quiz-modern-css-2025
- Locale: es
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2024-11-07--quiz-modern-css-2025/es/index.mdx
- Validation: deferred
- Runtime seconds: 192.02
- Input tokens: 10759
- Output tokens: 35189
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: ¿Conoces CSS moderno? (para 2025)'
subTitle: ¿Eres suficientemente front-end?
label: Advanced CSS
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
minReleaseDate: '2024-10-31'
date: '2024-10-31'
modified: '2024-11-09'
tags:
  - quiz
  - css
  - advanced
  - intermediate
cover_full_width: ../dan-levy-downtown-denver-at-night-wide.webp
cover_mobile: ../dan-levy-downtown-denver-at-night-square-200.webp
cover_icon: ../dan-levy-downtown-denver-at-night-square-200.webp
---
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## Quiz: ¿Sabes CSS?

* ¿CSS moderno?  🤔
* **¿El CSS pertenece a _tu_ currículum???** 🚀
* Opción múltiple. 🤖 ... _¿Qué tan difícil puede ser, eh?_
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Calentamiento"
  title="Uso de variables CSS"
  options={[
    {text: 'background-color: blue;'},
    {text: 'background-color: --main-color;'},
    {text: 'background-color: var(--main-color);', isAnswer: true},
    {text: 'background-color: $main-color;'},
    {text: 'background-color: @main-color;'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la forma correcta de usar una variable CSS llamada `--main-color` para establecer el color de fondo de un elemento?
    ```css
        :root {
          --main-color: blue;
        }
        div {
          /* How do we use --main-color here? */
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las variables CSS se utilizan con la función `var`, por lo que la respuesta correcta es `background-color: var(--main-color);`. Esta sintaxis recupera el valor de `--main-color` y lo aplica.

    Las otras opciones pueden resultarte familiares por otros lenguajes o sintaxis de preprocesadores, como Sass o Less.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Funciones de CSS"
  title="Función min() de CSS"
  options={[
    {text: 'width: 50%;'},
    {text: 'width: 200px;', isAnswer: true},
    {text: 'width: 250px;'},
    {text: 'width: 500px;'},
    {text: 'width: max(50%, 200px);'},
    {text: 'Sintaxis inválida'},
  ]}
>
  <slot name="question">
  <div className="question">
    Si el contenedor mide 400px de ancho, ¿cuál será el ancho calculado de este elemento?
    ```css
        div {
          width: min(250px, 50%);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La función `min()` seleccionará el valor más pequeño entre `250px` y el `50%` del ancho de su contenedor.

    Para entender el valor calculado, debemos convertir las unidades relativas a píxeles:

    - El `50%` de `400px` es `200px`
    - `250px` ya está en píxeles
    ```css
        /* This gets computed to */
        width: min(250px, 200px);
        /* -> 200px wins */
    ```
    La función `min()` es especialmente útil en el diseño responsivo, ya que te permite garantizar que un componente (o el tamaño de una fuente) no supere un límite determinado.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Funciones de CSS"
  title="Función `max()` de CSS"
  options={[
    {text: 'width: 6em;'},
    {text: 'width: 10%;'},
    {text: 'width: 10px;'},
    {text: 'width: 50px;'},
    {text: 'width: 96px;', isAnswer: true},
    {text: 'Sintaxis inválida'},
  ]}
>
  <slot name="question">
  <div className="question">
    Dado un contenedor con un ancho de 200px, ¿cuál sería el ancho calculado del `<div>`?
    ```css
        div {
          width: max(50px, 10%, 6rem);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La función `max()` acepta 2 o más valores y automáticamente utiliza el mayor. Suponiendo que el tamaño de fuente raíz sea el predeterminado del navegador (`16px`), el ancho resulta ser `96px`.

    Para entender el valor calculado, debemos convertir las unidades relativas a píxeles:

    - `50px` ya está en píxeles
    - `10%` de `200px` es `20px`
    - `6rem` equivale a `6 * 16px` (el tamaño de fuente predeterminado), lo que da `96px`
    ```css
        /* This gets computed to */
        width: max(50px, 20px, 96px);
        /* -> 96px wins */
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Funciones de CSS Grid"
  title="Función minmax() de CSS"
  options={[
    {text: 'Todos los anchos de columna entre 100px y 200px'},
    {text: 'Establece las columnas en 100px y las filas en 200px'},
    {text: 'La primera columna estará entre 100px y 200px', isAnswer: true},
    {text: 'Aplica el rango de forma recursiva, incluidas las subcuadrículas'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué efecto tiene usar `minmax(100px, 200px)` en una pista de CSS Grid?
    ```css
        grid-template-columns: minmax(100px, 200px);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Usar `minmax(100px, 200px)` permite que la pista de la cuadrícula se redimensione entre `100px` y `200px`, adaptándose al espacio disponible sin bajar nunca de `100px` ni superar `200px`.

    Puedes crear diseños que se ajusten automáticamente donde el contenedor y los elementos hijos colaboran en el cálculo del layout. Esto es muy potente cuando se combina con `repeat()` y `auto-fill` o `auto-fit`, ya que generará tantas pistas como sea posible dentro de esas restricciones.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Variables CSS"
  title="Fallbacks de variables CSS"
  options={[
    {text: 'azul'},
    {text: 'rojo'},
    {text: 'predeterminado del sistema'},
    {text: '#6b8e23', isAnswer: true},
    {text: 'var(--secondary-color)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué color tendrá el fondo con el siguiente CSS?
    ```css
        div {
          background: var(--primary, olivedrab);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La función `var()` te permite establecer un valor de respaldo si la variable no está definida. En este caso, el fondo será `olivedrab` (`#6b8e23`) porque `--primary` no está definida.

    Esta es una excelente manera de asegurarte de que tus estilos no se rompan si falta una variable o no es compatible.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Funciones de CSS"
  title="Usar clamp() para diseño responsivo"
  options={[
    {text: 'Valor de respaldo para unidades posiblemente no compatibles'},
    {text: 'Asegurar que las unidades `vw` estén entre 20px y 50px'},
    {text: 'Escala lineal entre 200px y 500px', isAnswer: true},
    {text: 'Escala Log₂ entre 200px y 500px'},
    {text: '¡Fallaste! Sin soporte para IE 11'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace `clamp()`?
    ```css
        .card {
          width: clamp(200px, 50vw, 500px);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La función `clamp()` permite que el ancho se escale en función de `50vw`, pero lo mantiene dentro de un rango de 200px a 500px.

    Esto significa que el ancho será de 200px cuando `50vw` sea menor a 200px, de 500px cuando `50vw` sea mayor a 500px, y lineal entre esos límites.

    ¡Te permite ser responsivo de forma automática! Lo que debes saber sobre `clamp` es que combina **unidades fijas** con **unidades responsivas o calculadas.**

    Normalmente no querrías usar unidades de viewport para tamaños de fuente, pero con `clamp()` podemos asegurarnos de que el tamaño de fuente no sea ni demasiado pequeño ni demasiado grande.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Anidación de CSS"
  title="Anidación nativa de CSS"
  options={[
    {text: 'Solo con SCSS'},
    {text: 'Técnicamente con PostCSS'},
    {text: 'Sí', isAnswer: true},
    {text: 'No'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿El CSS admite anidación de forma nativa?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ¡Sí! Por fin tenemos anidación nativa en CSS. El estándar introdujo esta sintaxis en 2023, lo que permite aplicar estilos jerárquicos directamente en el CSS sin necesidad de preprocesadores.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Anidamiento en CSS"
  title="Anidamiento en CSS"
  options={[
    {text: 'El nombre del archivo debe terminar en .scss'},
    {text: '`.title` debe preceder a propiedades como `color`'},
    {text: 'Solo con PostCSS'},
    {text: 'Perfecto. Sin observaciones.', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Es este un uso correcto del anidamiento nativo de CSS?
    ```css
        .container {
          color: black;
          .title {
            color: white;
            background: black;
          }
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La clase `.title` está anidada dentro de la clase `.container`, y las propiedades se aplican tal como se espera.

    Esta es una excelente manera de mantener los estilos relacionados juntos y evitar selectores largos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Anidamiento de CSS"
  title="Selector de hijo directo con anidamiento"
  options={[
    {text: 'background-color: red'},
    {text: 'background-color: white', isAnswer: true},
    {text: 'background-color: blue'},
    {text: 'Sintaxis inválida'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué color de fondo se aplicará a los `div`s hijos directos de `.container`?
    ```css
        .container {
          background-color: red;
          > div {
            background-color: white;
          }
          background-color: blue !important;
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El selector `>` en la regla anidada aplica `background-color: white` solo a los elementos `div` hijos directos dentro de `.container`.

    La última regla, `background-color: blue !important;`, es una pequeña distracción. Está **fuera de la regla anidada** y se aplicará a todos los elementos `.container`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Variables CSS"
  title="Cambiar una variable CSS en tiempo de ejecución"
  options={[
    {text: 'Las variables CSS son inmutables'},
    {text: 'Usando JavaScript', isAnswer: true},
    {text: 'Solo con SCSS'},
    {text: 'Solo con estilos en línea'},
    {text: 'Usando unidades responsivas'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo modificas el valor de una variable CSS en tiempo de ejecución?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las variables CSS se pueden definir usando clases y JavaScript. Incluso puedes establecerlas 'después' de que técnicamente se usen.
    ```js
        document.documentElement.style.setProperty('--main-color', 'blue');
    ```
    Esto cambiará el valor de `--main-color` a `blue` en todo el documento.

    Las variables CSS son mutables y se pueden modificar en tiempo de ejecución usando JavaScript.

    También puedes cambiarlas agregando o quitando clases, un patrón muy común para implementar temas.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Variables CSS"
  title="Uso de calc() con variables CSS"
  options={[
    {text: 'Ancho: 50px'},
    {text: 'Ancho: 100px'},
    {text: 'Ancho: 110px', isAnswer: true},
    {text: 'Ancho: 120px'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será el ancho calculado del elemento?
    ```css
        :root {
          --base-width: 100px;
        }
        div {
          width: calc(var(--base-width) + 10px);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La función `calc()` combina el valor de `--base-width` (100px) con 10px adicionales, lo que da como resultado un ancho de 110px.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
