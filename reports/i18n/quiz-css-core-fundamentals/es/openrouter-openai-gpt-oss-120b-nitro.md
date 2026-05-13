# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/es/index.mdx
- Validation: passed
- Runtime seconds: 31.60
- Input tokens: 12559
- Output tokens: 7381
- Thinking tokens: unknown
- Cached input tokens: 3904
- Cache write tokens: 0
- Estimated cost: $0.001818
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: ¿Conoces los fundamentos de CSS? (2025)'
subTitle: ¿Eres lo suficientemente front‑end?
label: CSS Fundamentals
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
date: '2024-11-08'
modified: '2024-11-10'
tags:
  - quiz
  - intro
  - css
  - styles
  - beginner
  - intermediate
cover_full_width: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-wide.webp
cover_mobile: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
cover_icon: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Quiz: ¿Conoces CSS?

* CSS moderno? 🤔
* **¿Debería CSS estar en _tu_ currículum???** 🚀
* Opción múltiple. 🤖 … _¿Qué tan difícil puede ser, no?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Calentamiento: Fuentes"
  title="Unidad CSS inválida para tamaño de fuente"
  options={[
    {text: '10cx', isAnswer: true},
    {text: '10mm'},
    {text: '10pt'},
    {text: '10px'},
    {text: '10vmin'},
  ]}
>
  <slot name="question">
  <div className="question">
    Selecciona el <em class="highlight">ÚNICO INVÁLIDO</em> ❌ `font-size`:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `10cx` es incorrecto porque `cx` no es una unidad CSS real. (Al menos al momento de escribir esto.)

    Las unidades populares incluyen las familiares `px`, `rem`, `em`.

    Las unidades más nuevas son útiles para diseños dinámicos y responsivos.

    - `ch` - ancho del carácter `0`
    - `vmin` - mínimo del viewport
    - `vmax` - máximo del viewport
    - `vh` - altura del viewport
    - `vw` - ancho del viewport

    También existen varias unidades que siempre han existido pero se usan rara vez, como `cm` para centímetros, `mm`, `in` para pulgadas, `pt` para puntos
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Calentamiento: Colores"
  title="Códigos Hexadecimales"
  options={[
    {text: '#A'},
    {text: '#AB'},
    {text: '#ABCD', isAnswer: true},
    {text: '#ABCDE'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Puedes encontrar el <em class="highlight">UN</em> código hex válido 👍?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los códigos hexadecimales pueden usarse para representar colores en CSS. Llevan el prefijo `#` y deben contener 3, 4, 6 u 8 dígitos hexadecimales.

    El código hex de 3 caracteres es una abreviatura del de 6 caracteres, donde cada carácter se repite. El código de 4 caracteres incluye un canal alfa para transparencia.

    Por ejemplo `#ABC` es lo mismo que `#AABBCC`, y `#ABCD` es lo mismo que `#AABBCCDD`. Para aprender más sobre el manejo de valores hex, echa un vistazo a mi [quiz de números de JavaScript.](/quiz-can-you-count-to-bigint/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Calentamiento: Unidades"
  title="¡Ups, todas las unidades!"
  options={[
    {text: 'em'},
    {text: 'rem'},
    {text: 'cm'},
    {text: 'mm'},
    {text: 'in'},
    {text: 'pt'},
    {text: 'pc'},
    {text: 'px'},
    {text: 'ex'},
    {text: 'ch'},
    {text: 'vmin'},
    {text: 'vmax'},
    {text: 'vh'},
    {text: 'rel', isAnswer: true},
    {text: 'vw'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estas unidades <em class="highlight">NO</em> es una unidad CSS válida ❌?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Nuevas unidades como `ch`, `vmin`, `vmax`, `vh`, `vw` son bastante útiles para diseños dinámicos/responsivos.

    También existen varias unidades que siempre han estado, pero se usan rara vez, como `cm` para centímetros, `mm`, `in` para pulgadas, `pt` para puntos, `pc`, `cap` para el tamaño de las letras mayúsculas, y `ex` que equivale a la altura de la letra `x`.

    Las unidades más populares incluyen el familiar `px` para píxeles, `em` relativo al tamaño de fuente del elemento, y `rem` que secretamente rinde homenaje a la olvidada banda de los 90 R.E.M. (vale, no en serio, es solo una unidad `em` relativa que referencia al elemento raíz).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Selector: Fundamentos"
  title="Emparejando selectores con elementos HTML"
  options={[
    {text: '#Home'},
    {text: 'a [id=\'home\']'},
    {text: 'a:contains(home)'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué selector coincide mejor con el siguiente HTML?
    ```html
    <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La respuesta correcta es `a#home[name='home']`, que coincide tanto con los atributos `id` como `name`. Los selectores CSS distinguen mayúsculas y minúsculas, por lo que `#Home` no funcionaría, y los espacios implican elementos hijos, lo que no aplica aquí.

    El selector `:contains()` no es un selector CSS estándar, aunque está disponible en algunas bibliotecas JS.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Selector: Fundamentos"
  title="Selector de atributo para un botón"
  options={[
    {text: 'button:link'},
    {text: 'button::click'},
    {text: 'button:focus'},
    {text: 'button[onclick]', isAnswer: true},
    {text: 'button[on-click]'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué selector coincide con el siguiente botón HTML?
    ```html
    <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La respuesta correcta es `button[onclick]`, que selecciona la existencia del atributo `onclick`.

    Nota que `:link` solo selecciona enlaces `href` no visitados, `::click` no es un pseudo‑elemento válido, y `:focus` solo selecciona el elemento enfocado.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Selector: Fundamentos"
  title="Selector CSS no válido"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estos selectores es inválido?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El selector `c > > d {}` es inválido porque el combinador de hijo se repite sin un selector entre los dos caracteres `>`.

    Los demás selectores son válidos. Un selector de tipo como `c {}` es sintácticamente CSS válido aunque `c` no sea un elemento HTML estándar.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Selector: Fundamentos"
  title="Seleccionando el último enlace"
  options={[
    {text: 'a :nth-child(3)'},
    {text: 'a:last-item'},
    {text: 'nav:last-of-type(a)'},
    {text: 'nav:nth-child(3)'},
    {text: 'a:last-child', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué selector coincide con el último enlace en el HTML siguiente?
    ```html
    <nav>
      <a name="home" href="/home">Home</a>
      <a name="login" href="/login">Login</a>
      <a name="help" href="/help">Help</a>
    </nav>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El selector correcto es `a:last-child`, que coincide con el último `<a>` cuando también es el último hijo de su contenedor. `nav:nth-child(3)` coincidiría con un elemento `<nav>` que es el tercer hijo de su propio contenedor.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Selector: Especificidad"
  title="Prioridad de selectores"
  options={[
    {text: 'main article section blockquote a'},
    {text: 'blockquote a'},
    {text: 'a#quote', isAnswer: true},
    {text: 'a.quote'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué selector tendrá prioridad?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El selector `a#quote` tiene prioridad porque el ID tiene una especificidad mayor que los selectores basados en etiquetas o clases.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Diseños: Centrando"
  title="Centrar texto en un elemento de bloque"
  options={[
    {text: 'align: center;'},
    {text: 'margin: 0 auto;'},
    {text: 'align-content: center;'},
    {text: 'text-align: center;', isAnswer: true},
    {text: 'text-content: center;'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo puedes centrar "shit" en una caja?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Usar `text-align: center;` es la forma correcta de centrar texto en un elemento de bloque. Las propiedades `align` se usan en diseños flexbox, y `margin: 0 auto;` se usa para centrar elementos de bloque horizontalmente.

    La propiedad `align-content` se usa en diseños grid, y `text-content` no es una propiedad CSS válida.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Diseños: Centrando"
  title="Centrar un elemento de bloque verticalmente"
  options={[
    {text: 'align-items: center;'},
    {text: 'justify-content: center;'},
    {text: 'align-content: center;', isAnswer: true},
    {text: 'margin: auto;'},
    {text: 'margin: 0 auto;'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo centras el contenido verticalmente dentro de un contenedor de bloque en el diseño de flujo moderno?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Usar `align-content` es la forma moderna de centrar verticalmente el contenido de un contenedor de bloque en el diseño de flujo.

    Las propiedades `align-items` y `justify-content` se usan para diseños flexbox y grid, pero no para flujo.

    Tanto `margin: 0 auto;` como `margin: auto;` centran un elemento de bloque horizontalmente, pero no verticalmente.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Diseños: Unidades"
  title="Calculando el tamaño en píxeles de fuentes anidadas"
  options={[
    {text: '!40px'},
    {text: '5px', isAnswer: true},
    {text: '20px'},
    {text: '25px'},
    {text: '40px'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el tamaño en píxeles del texto del enlace `<a>` en el siguiente HTML?
    ```html
    <body style="font-size: 40px !important;">
      <nav style="font-size: 50%;">
        <a style="font-size: 25%;">HOME</a>
      </nav>
    </body>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El `font-size` para `<a>` se calcula como 5px: 40px (body) * 50% (nav) = 20px, luego 20px * 25% = 5px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Unidades: REM"
  title="Calculando el tamaño en píxeles con REMs"
  options={[
    {text: '10px'},
    {text: '12px', isAnswer: true},
    {text: '14px'},
    {text: '20px'},
    {text: '24px'},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será el tamaño en píxeles de `1.2rem` para el enlace "HOME" en el siguiente HTML?
    ```html
    <html style="font-size: 10px;">
      <body style="font-size: 20px;">
        <a style="font-size: 1.2rem;">HOME</a>
      </body>
    </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2rem` se traduce a 12px porque las unidades `rem` hacen referencia al tamaño de fuente raíz o del `<html>`, establecido aquí en 10px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Unidades: EM"
  title="Calculando el tamaño en píxeles con EMs"
  options={[
    {text: '10px'},
    {text: '12px'},
    {text: '14px'},
    {text: '20px'},
    {text: '24px', isAnswer: true},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Similar a la pregunta anterior, ¿cuál será el tamaño en píxeles de `1.2em` para el enlace "HOME" en el siguiente HTML?
    ```html
    <html style="font-size: 10px;">
      <body style="font-size: 20px;">
        <a style="font-size: 1.2em;">HOME</a>
      </body>
    </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2em` se traduce a 24px porque las unidades `em` hacen referencia al tamaño de fuente heredado, establecido aquí en 20px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Selector: Especificidad"
  title="Selectores de Cero Especificidad"
  options={[
    {text: ':where(.card) .title', isAnswer: true},
    {text: '.card .title'},
    {text: ':is(.card) .title'},
    {text: '#card .title'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué selector tiene la menor especificidad?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `:where(.card) .title` tiene la menor especificidad. La pseudo‑clase `:where()` y todo lo que contiene aporta `0-0-0`, así que solo cuenta `.title`. `:is(.card) .title` mantiene la especificidad de `.card`, `.card .title` tiene dos clases, y `#card .title` incluye un ID.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
