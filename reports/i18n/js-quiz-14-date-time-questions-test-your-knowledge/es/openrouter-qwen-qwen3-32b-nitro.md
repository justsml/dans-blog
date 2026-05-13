# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 5.28
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug js-quiz-14-date-time-questions-test-your-knowledge --locale es --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: 14 preguntas sobre JavaScript Date'
subTitle: ¡Sorprende en las fiestas con trivia de JS! ✨
label: Dates & Times
date: '2020-01-02'
modified: '2024-11-27'
tags:
  - quiz
  - javascript
  - date
  - date
  - gotchas
  - challenge
  - intermediate
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
cover: ../pocket-watch.webp
cover_mobile: ../w300_pocket-watch.webp
cover_icon: ../icon_pocket-watch.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';

import Challenge from'../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

## ¿Qué tan bien conoces la clase `Date`?

> * **¡Demuestra tu destreza en JavaScript!** 🚀
> * No se requiere iniciar sesión ni registrarse. ✨
> * Opción múltiple. 🤖 … _¿Qué tan difícil puede ser, no?_

### Esquema

La clase `Date` en JavaScript tiene una API notoriamente complicada. Fue heredada de Java, y supongo que se inspiró en los antiguos métodos neolíticos de medición del tiempo.

La lucha por dominar `Date` lleva a muchos desarrolladores a usar bibliotecas de terceros sin pensarlo. Aunque a menudo es una elección segura y fiable, ¡estas librerías rara vez son necesarias solo para formatear fechas o para la localización!

Este cuestionario está diseñado para poner a prueba (y profundizar) tu conocimiento de la API nativa de `Date`. ¡Usa los botones verdes para obtener pistas y explicaciones! Con suerte, al final del reto habrás consolidado tu comprensión de `Date` en JavaScript.

#### **NOTA:** Asume que todos los ejemplos usan la zona horaria local GMT‑7.


### 👇 14 preguntas a continuación 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Manejo de Fechas"
  title="Constructor de Date Parte 1"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    const d1 = new Date(2020, 1, 1)
    console.log(d1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El argumento month es base cero. Con un rango de 0-11 (usando calendarios occidentales.)

    'February' tiene un valor de índice de uno. (Piénsalo como una búsqueda en un array.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Manejo de Fechas"
  title="Constructor de Date Parte 2"
  options={[
    {text: '01 ene 2020', isAnswer: true},
    {text: '01 feb 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    const d2 = new Date(2020, 0, 1)
    console.log(d2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El argumento month es base cero. Con un rango de 0‑11 (usando calendarios occidentales).

    'Enero' tiene un valor de índice cero. (Piénsalo como una búsqueda en un array.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Manejo de Fechas"
  title="Constructor de Date Parte 3"
  options={[
    {text: '01 Jan 1970'},
    {text: 'Época Unix de 0'},
    {text: 'Fecha actual, en UTC/GMT'},
    {text: 'Fecha actual', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: Argumento inválido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    const d3 = Date('Thu, 01 Jan 1970 00:00:00 GMT')
    console.log(d3)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ¡No olvides la palabra clave `new`! `Date` es una clase y debe llamarse con `new`.

    `Date('...')` sin `new` ignora lo que le pasas. Parece que siempre produce la fecha y hora actuales con `new Date()` (sin argumentos).

    Esto es un **error común** que es **fácil pasar por alto**, incluso en la revisión de código.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Manejo de Fechas"
  title="Constructor de Date Parte 4"
  options={[
    {text: '1969', isAnswer: true},
    {text: '1970'},
    {text: '2019'},
    {text: '2020'},
    {text: '2021'},
    {text: 'RangeError: Argumento inválido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    const date = new Date(2020)
    console.log(date.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Una instancia de Date creada con un solo argumento entero se interpreta como un valor Unix `Epoch`. `Epoch` es un recuento de milisegundos desde el 1 de enero de 1970.

    Un valor de `2020` (milisegundos) se traduce a 2 segundos después del 1 de enero de 1970.

    Luego, como nuestra zona horaria local tiene un desfase negativo de -7 horas, terminamos con `Wed Dec 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)`.

    Puedes evitar el desfase de la zona horaria local usando [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Manejo de Fechas"
  title="Análisis de Cadenas de Fecha"
  options={[
    {text: '2019 2020', isAnswer: true},
    {text: '2020 2021'},
    {text: '2020 2020'},
    {text: '2020 2019'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué valor se imprimirá en la consola?
    ```js
    const d1 = new Date('2020-01-01')
    const d2 = new Date('2020-01-01T00:00')
    console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El string sin un valor de tiempo `T` puede parecer el 1 de enero de 2020, pero las cadenas solo de fecha se interpretan como UTC, y al ajustarlas a nuestra zona horaria local (GMT-7) vemos que todavía estamos en 2019.

    Las cadenas de fecha y hora sin zona horaria explícita se interpretan en hora local.

    La forma `T00:00` hace que el segundo valor se interprete como medianoche local.

    La primera fecha se interpreta como `Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)`.
    La segunda fecha se interpreta como `Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Manejo de Fechas"
  title="Formato Parte 1"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    Selecciona un método de formato _incorrecto_:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ¡El método `toLocaleFormat()` no es estándar! Puede parecer familiar porque proviene de una antigua biblioteca de terceros.

    Consulta la [`toLocaleDateString` documentación](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) del método. Su comportamiento está documentado bajo [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Manejo de Fechas"
  title="Fechas UTC Parte 1"
  options={[
    {text: 'Wed, 01 Jan 2020 00:00:00 GMT'},
    {text: 'Thu, 02 Jan 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    var date = Date.UTC('2020-01-02T00:00')
    console.log(date.toUTCString())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Obtendrás `TypeError: date.toUTCString is not a function`, ya que [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) devuelve un entero en milisegundos, no una instancia de fecha.

    {/* El método [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) usa tu desfase local (asume GMT-07:00 para estas preguntas.) Lo que significa que devolverá el año anterior (Año Nuevo -7 horas). El método [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) devolverá el año que suministramos a `Date.UTC()`, 2020. */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Manejo de Fechas"
  title="Fechas UTC Parte 2"
  options={[
    {text: 'Una instancia de fecha basada en UTC'},
    {text: 'Una instancia de fecha ajustada a la zona horaria local'},
    {text: 'Milisegundos desde el 1 de enero de 1970 GMT', isAnswer: true},
    {text: 'Un error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    const d = Date.UTC(2020, 0, 1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El método auxiliar [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) no devuelve una instancia de fecha. Devuelve un entero en milisegundos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Manejo de Fechas"
  title="Fechas UTC Parte 3"
  options={[
    {text: '0'},
    {text: '420', isAnswer: true},
    {text: '700'},
    {text: '1400'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    // Assume local TZ is -07:00
    const d = new Date(Date.UTC(2020, 0, 1))
    console.log(d.getTimezoneOffset())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las fechas se presentarán implícitamente en hora local, con un [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) (efectivamente) inmutable.

    `Date` no almacena datos de zona horaria. Guarda el número de milisegundos transcurridos desde la época Unix (1 de enero de 1970). La zona horaria se tiene en cuenta al analizar y renderizar cadenas de fecha. El comportamiento de visualización predeterminado se determina automáticamente según la configuración regional del sistema o del navegador.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Manejo de Fechas"
  title="Establecedores de Fecha Parte 1"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Argumento inválido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    const d = new Date(2020, 0, 1)
    d.setDate(1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El método [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) establece el día del mes, basado en el mes actual de la instancia dada.

    Si se proporciona un valor fuera del número de días disponibles, el valor del mes de la instancia de fecha se ajustará (p. ej., un `setDate(32)` en enero se calculará como el 1 de febrero.)

    <aside class="hint">`setDate` establece el día del mes, típicamente en el rango 1‑31.</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Manejo de Fechas"
  title="Establecedores de Fecha Parte 2"
  options={[
    {text: 'Ene 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El método [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) establece el mes de la instancia de fecha dada.

    El argumento month es cero‑basado, con un rango de 0‑11 (usando calendarios occidentales.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Manipulación de Fechas"
  title="Setters de Date Parte 3"
  options={[
    {text: '01 de enero de 2020'},
    {text: '01 de enero de 2021', isAnswer: true},
    {text: '01 de febrero de 2020'},
    {text: 'RangeError: Argumento no válido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(12)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El método `.setMonth()` establece el mes de la instancia de fecha proporcionada.

    El argumento `month` es base cero, con 12 valores en el rango 0‑11 (usando calendarios occidentales).

    Aquí vemos que el año se ajusta a 2021, porque `setMonth(12)` es 1 más que 11 (diciembre).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Manejo de Fechas"
  title="Establecedores de Fecha Parte 4"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2021'},
    {text: 'Feb 01 2021', isAnswer: true},
    {text: 'RangeError: Argumento inválido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(13)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El método [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) establece el mes de la instancia de fecha dada.

    El argumento month es basado en cero, con un rango de 0-11 (usando calendarios occidentales).

    Aquí vemos que el mes y el año se ajustan a febrero de 2021, porque `setMonth(13)` es 2 más que 11 (diciembre).

    <aside class="hint">`setMonth` establece el mes por índice, los 12 meses están indexados de 0-11. </aside>
    <aside class="hint">
    Los números fuera del rango de 0-11 provocarán que el año se desborde hacia adelante o atrás. Por ejemplo, `setMonth(13)` ajustará el año a 2021 (en febrero porque 13 es 2 más que 11).
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Manejo de Fechas"
  title="Establecedores de Fecha Parte 5"
  options={[
    {text: '01 ene 2020'},
    {text: '01 feb 2020'},
    {text: '01 ene 2019'},
    {text: '01 dic 2019', isAnswer: true},
    {text: 'RangeError: Argumento inválido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué incluirá la salida?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(-1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El método [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) establece el mes de la instancia de fecha dada.

    El argumento month es base cero, con un rango de 0-11 (usando calendarios occidentales.)

    Aquí vemos que el mes y el año retroceden a diciembre de 2019, porque `setMonth(-1)` es menor que 0 (enero).
  </div>
  </slot>
</Challenge>

</QuizUI>
````
