# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/es/index.mdx
- Validation: deferred
- Runtime seconds: 123.83
- Input tokens: 12865
- Output tokens: 12210
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004562
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Cuestionario: 14 preguntas sobre JavaScript Date'
subTitle: Aprende a destacar en reuniones con curiosidades de JavaScript! ✨
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

## ¿Qué tan bien conoces la clase `Date`?

> * **¡Demuestra tus habilidades en JavaScript!** 🚀
> * No se requiere iniciar sesión ni registrarse. ✨
> * Opción múltiple. 🤖 ... _¿Qué difícil puede ser, eh?_

### Esquema

La clase `Date` en JavaScript tiene una API notoriamente difícil. Fue heredada de Java, y solo puedo asumir que fue inspirada por métodos antiguos neolíticos de medición del tiempo.

La lucha por manejar `Date` lleva a muchos desarrolladores a usar bibliotecas de terceros sin dudar. Aunque a menudo es una elección segura y confiable, rara vez son necesarias para formatear fechas o localización.

Este cuestionario está diseñado para probar (y profundizar) tus conocimientos sobre la API nativa `Date`. ¡Usa los botones verdes para pistas y explicaciones! Espero que al final del desafío hayas consolidado tu comprensión de `Date` en JavaScript.

#### **NOTA:** Supongamos que todos los ejemplos asumen una zona horaria local de GMT-7.

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Manejo de fechas"
  title="Constructor de Date Parte 1"
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
        const d1 = new Date(2020, 1, 1)
        console.log(d1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El argumento Mes es cero basado. Con un rango de 0-11 (usando calendarios occidentales). 'February' tiene un valor de índice de uno. (Piénsalo como una búsqueda de array.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Manejo de Fechas"
  title="Constructor de Date Parte 2"
  options={[
    {text: 'Ene 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
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
    El argumento de mes es cero basado. Con un rango de 0-11 (usando calendarios occidentales).

    'Enero' tiene un valor de índice de cero. (Piénsalo como una búsqueda de array.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Manejo de Fechas"
  title="Constructor de Date Parte 3"
  options={[
    {text: '01 Ene 1970'},
    {text: 'Época Unix de 0'},
    {text: 'Fecha actual, en UTC/GMT'},
    {text: 'Fecha actual', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: Argumento inválido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué contendrá la salida?
    ```js
        const d3 = Date('Thu, 01 Jan 1970 00:00:00 GMT')
        console.log(d3)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ¡No olvides la palabra clave `new`! `Date` es una clase y debe llamarse con `new`.

    `Date('...')` sin `new` ignora lo que le das. Parece que siempre produce la fecha y hora actuales con `new Date()` (sin argumentos).

    Este es un **problema común** que es **fácil de ignorar**, incluso en revisiones de código.
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
    {text: 'RangeError: Argumento no válido.'},
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
    Una instancia de Date creada con un solo argumento entero se interpreta como un valor de `Época` Unix. `Epoch` es un contador de milisegundos desde el 1 de enero de 1970.

    Un valor de `2020` (milisegundos) se traduce en 2 segundos después del 1 de enero de 1970.

    Luego, dado que nuestra zona horaria local tiene un desplazamiento negativo de -7 horas, terminamos con `mié abr 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)`.

    Puedes evitar el desplazamiento de la zona horaria local usando [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Manejo de fechas"
  title="Análisis de cadenas de fecha"
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
    La cadena sin el valor de tiempo `T` podría parecer ser el 1 de enero de 2020, pero las cadenas solo de fecha se interpretan como UTC. Al ajustarla a nuestra zona horaria local (GMT-7), nos damos cuenta de que aún estamos en 2019.

    Las cadenas de fecha-hora sin una zona horaria explícita se interpretan en hora local.

    La forma `T00:00` hace que el segundo valor se interprete como medianoche local.

    La primera fecha se interpreta como `mar. 31 dic. 2019 17:00:00 GMT-0700 (hora estándar de montaña)`.
    La segunda fecha se interpreta como `mié. 01 ene. 2020 00:00:00 GMT-0700 (hora estándar de montaña)`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Manejo de Fechas"
  title="Formateo Parte 1"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    Selecciona un método de formateo _incorrecto_:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El método `toLocaleFormat()` ¡no es estándar! Puede parecer familiar porque proviene de una antigua biblioteca de terceros.

    Revisa las [documentaciones de `toLocaleDateString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString). Su comportamiento está documentado bajo [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Manejo de Fechas"
  title="Fechas UTC Parte 1"
  options={[
    {text: 'Mié, 01 Ene 2020 00:00:00 GMT'},
    {text: 'Jue, 02 Ene 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué contendrá la salida?
    ```js
          var date = Date.UTC('2020-01-02T00:00')
          console.log(date.toUTCString())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Obtendrás `TypeError: date.toUTCString no es una función`, ya que [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) devuelve un entero en milisegundos, no una instancia de fecha.

    {/* El método [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) usa tu offset local (asumamos GMT-07:00 para estas preguntas), lo que significa que dará el año anterior (NYE -7 horas).
    El método [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) dará el año que pasamos a `Date.UTC()`, 2020.
    */}
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
    ¿Qué contendrá la salida?
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
  title="UTC Dates Parte 3"
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
    Las fechas se presentarán implícitamente en hora local, con un [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) (efectivamente) invariable.

    Las instancias `Date` no almacenan datos de zona horaria. Almacenan el número de milisegundos desde la Época Unix (1 de enero de 1970). La zona horaria se tiene en cuenta al analizar y representar cadenas de fecha. El comportamiento de visualización predeterminado se determina automáticamente según la configuración regional del sistema o navegador.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Manejo de Fechas"
  title="Setters de Fecha Parte 1"
  options={[
    {text: 'Ene 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
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

    Si se proporciona un valor fuera del rango de días disponibles, el valor del mes de la instancia de fecha se ajustará (por ejemplo, un `setDate(32)` en enero calculará como el 1 de febrero).

    <aside class="hint">`setDate` establece el día del mes, generalmente en el rango 1-31.</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Manejo de Fechas"
  title="Date Setters Parte 2"
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

    El argumento del mes es cero basado, con un rango de 0-11 (usando calendarios occidentales).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Manejo de fechas"
  title="Setter de fechas Parte 3"
  options={[
    {text: 'Ene 01 2020'},
    {text: 'Ene 01 2021', isAnswer: true},
    {text: 'Feb 01 2020'},
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
    El método [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) establece el mes de la instancia de fecha dada.

    El argumento `month` es basado en 0, con 12 valores en el rango de 0-11 (usando calendarios occidentales).

    Aquí vemos que el año se ajusta a 2021, porque `setMonth(12)` es 1 más que 11 (diciembre).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Manejo de fechas"
  title="Setter de fechas parte 4"
  options={[
    {text: 'Ene 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Ene 01 2021'},
    {text: 'Feb 01 2021', isAnswer: true},
    {text: 'RangeError: Argumento no válido.'},
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

    El argumento de mes es cero-based, con un rango de 0-11 (usando calendarios occidentales).

    Aquí vemos que el mes y el año se ajustan a Febrero 2021, porque `setMonth(13)` es 2 más de 11 (Diciembre).

    <aside class="hint">`setMonth` establece el mes por índice, 12 meses están indexados del 0 al 11. </aside>
    <aside class="hint">
    Números fuera del rango de 0-11 causarán que el año se desborde. Por ejemplo, `setMonth(13)` ajustará el año a 2021 (en Febrero porque 13 es 2 más que 11).
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Manejo de Fechas"
  title="Date Setters Parte 5"
  options={[
    {text: 'Ene 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Ene 01 2019'},
    {text: 'Dic 01 2019', isAnswer: true},
    {text: 'RangeError: Argumento no válido.'},
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

    El argumento de mes es cero-indexado, con un rango de 0-11 (usando calendarios occidentales).

    Aquí vemos que el mes y el año vuelven a Diciembre 2019, porque `setMonth(-1)` es menor que 0 (Enero).
  </div>
  </slot>
</Challenge>

</QuizUI>
````
