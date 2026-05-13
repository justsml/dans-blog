# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/es/index.mdx
- Validation: passed
- Runtime seconds: 20.57
- Input tokens: 12620
- Output tokens: 6633
- Thinking tokens: unknown
- Cached input tokens: 4928
- Cache write tokens: 0
- Estimated cost: $0.001686
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: ¿El HTML sigue en tu currículum?'
subTitle: ¡Demuestra tu valía!
label: Semantic HTML5
social_image: ../desktop-social.webp
category: Quiz
subCategory: HTML
date: '2024-10-31'
modified: '2024-11-06'
tags:
  - quiz
  - web
  - quiz
  - semantic
  - html5
  - web
  - beginner
  - intermediate
cover_full_width: ../jakob-owens-FBih1nqPi0w-unsplash-wide.webp
cover_mobile: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
cover_icon: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Entonces, ¿crees que dominas HTML5?

Al fin y al cabo, sabes diferenciar un `<div>` de un `<span>`, ¿no? Pero, ¿qué tan bien conoces los elementos semánticos más avanzados de HTML5?

> Nota: Si no superas esta prueba, deberás eliminar `HTML Skills` de tu currículum.

### ¡Comenzar!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Calentamiento"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la función principal del elemento `<ul>` en HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La etiqueta `<ul>` crea una lista desordenada, con elementos normalmente marcados con viñetas.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="HTML Semántico Avanzado"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué representa el elemento `<dd>` en HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El elemento [`<dd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) define una descripción, definición o valor en una lista de descripción, usado dentro de etiquetas `<dl>` para emparejarse con `<dt>` (_Description Term_).

    Esto es útil al mostrar datos de pares clave‑valor. La información de perfil, configuraciones y estadísticas son ejemplos comunes.
    ```html
    <dl>
    <dt>JS</dt>
    <dd>Client-side</dd>
    <dd>Server-side</dd>

    <dt>HTML</dt>
    <dd>Client-side</dd>
    </dl>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="HTML Semántico Avanzado"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuándo se deben usar los elementos `<figure>` y `<figcaption>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La etiqueta [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) se usa típicamente para envolver contenido autocontenido (media), como una imagen o un gráfico, junto con [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) para proporcionar una leyenda.

    Esto es útil para imágenes, diagramas, fragmentos de código y más.
    ```html
    <figure>
    <img src="image.jpg" alt="Description of image">
    <figcaption>Image caption</figcaption>
    </figure>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="HTML Semántico Avanzado"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el propósito del elemento `<article>` en HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El [`<article>` elemento](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) se usa para definir un bloque de contenido independiente que puede distribuirse o reutilizarse de forma autónoma.

    Se suele usar para entradas de blog, artículos de noticias, publicaciones en foros o comentarios de usuarios.

    Puedes usar varios `<article>` en una página (por ejemplo, en páginas con desplazamiento infinito). O bien, puedes anidarlos entre sí para crear una jerarquía de "contenido independiente".
    ```html
    <article>
    <h2>Article Title</h2>
    <p>Article content...</p>
    <article class="discussion">
    <h3>Comment by User</h3>
    <p>Comment content...</p>
    </article>
    </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="HTML semántico avanzado"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el propósito de los elementos `<fieldset>` y `<legend>` en un formulario?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) se usa para agrupar controles de formulario relacionados, y `<legend>` proporciona un título/etiqueta para el grupo, mejorando la accesibilidad.

    Esto es útil para agrupar elementos de formulario relacionados, como una sección para la dirección de envío o los detalles de pago.
    ```html
    <fieldset>
    <legend>Shipping Address</legend>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    ...
    </fieldset>
    <fieldset>
    <legend>Payment Details</legend>
    <label for="card">Card Number:</label>
    <input type="text" id="card" name="card">
    ...
    </fieldset>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="HTML Semántico Avanzado"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el propósito del elemento `<meter>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El elemento [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) se usa para representar una medida escalar (única) dentro de un rango definido, como temperatura, uso de disco o el recuento de votos.

    Puede parecer similar a una barra [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress), sin embargo las barras de progreso **SIEMPRE** comienzan en cero. Por lo tanto los elementos `<progress>` muestran un `porcentaje de finalización`, mientras que un `<meter>` muestra cualquier valor dentro de un rango definible.
    ```html
    <meter min="-60" max="130" value="75" /> 75°F
    <meter min="0" max="100" value="75" /> 75%
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="HTML semántico"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Por qué se usa el elemento `<source>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [El elemento `<source>` se usa para especificar los formatos de medios disponibles](https://developer.mozilla.org/en-us/docs/web/html/element/source).

    Se usa específicamente con [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video), [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) y [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture), permitiendo que el navegador elija el formato más adecuado.
    ```html
    <video controls>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    </video>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="HTML Semántico Avanzado"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo debes usar el elemento `<hgroup>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El elemento [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup) agrupa un encabezado con contenido secundario relacionado, usualmente uno o más elementos `<p>`.

    Puede ser útil cuando un encabezado tiene un subtítulo, eslogan o título alternativo que no debería convertirse en otro encabezado en el esquema del documento.
    ```html
    <article>
    <hgroup>
    <h1>Frankenstein</h1>
    <p>Or: The Modern Prometheus</p>
    </hgroup>
    <section>
    <h2>Chapter 1</h2>
    <p>...</p>
    </section>
    </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="HTML Semántico Avanzado"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Para qué se usa el elemento `<menu>` en HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) representa una lista de comandos o controles interactivos.

    Si tu lista son enlaces de navegación, usa `<nav>` con un `<ul>`. Usa `<menu>` para controles tipo barra de herramientas o listas de comandos.
    ```html
    <menu>
    <li><button type="button">Copy</button></li>
    <li><button type="button">Paste</button></li>
    </menu>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="HTML Semántico Avanzado"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué función tienen `<details>` y `<summary>` en HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) permite contenido colapsable, y [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) especifica un título visible para el contenido.

    Esto es útil para preguntas frecuentes, secciones colapsables o cualquier contenido que pueda alternarse.
    ```html
    <details>
    <summary>Click to expand 🤯</summary>
    <p>Hidden content! 💥</p>
    </details>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="HTML Semántico Avanzado"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Por qué deberías usar un elemento `<dialog>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El elemento [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) se usa para ventanas emergentes o modales, y proporciona marcado semántico, CSS ampliado y una API nativa para estas interacciones.

    Usa JavaScript para abrirlo con `.showModal()` para diálogos modales o `.show()` para diálogos no modales, y ciérralo con `.close()` o mediante el envío de un formulario usando `method="dialog"`.
    ```html
    <dialog>
    <h2>Modal Title</h2>
    <p>Modal content...</p>
    <button>Close</button>
    </dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="HTML Semántico Avanzado"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo se usa el elemento `<time>` en HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El elemento `<time>` se usa para fechas, horas o duraciones. Puede incluir contenido legible por humanos y un atributo `datetime` legible por máquinas. HTML no tiene un elemento `<date>`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="HTML semántico avanzado"
  title="Propósito de los atributos ARIA"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el propósito de los atributos ARIA?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los atributos ARIA (Accessible Rich Internet Applications) mejoran la accesibilidad web al proporcionar contexto adicional para lectores de pantalla y otras tecnologías de asistencia.

    Existen roles, estados y propiedades que pueden usarse para describir elementos.
    ```html
    <button aria-label="Close" aria-expanded="true">X</button>
    <main aria-live="polite">...</main>
    <dialog
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="dialog_label"
    aria-describedby="dialog_desc"
    ></dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="HTML semántico avanzado"
  title="Uso del atributo `role`"
  options={[
    {text: 'Para definir el comportamiento del componente'},
    {text: 'Para describir el propósito del elemento', isAnswer: true},
    {text: 'Restringir el acceso a los elementos'},
    {text: 'Solo para Web Components'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el uso del atributo `role` en HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El atributo `role` describe

    el propósito de un elemento a las tecnologías de asistencia, ayudando a mejorar la accesibilidad.
  </div>
  </slot>
</Challenge>

</QuizUI>

¿Y cómo te fue? ¿Entusiasmado por usar más elementos semánticos de HTML en tu próximo proyecto? 🚀

¿O resignado a `<div>` y `<span>` para siempre? 😅

¡Déjame tu respuesta en los comentarios! 👇
````
