# Translation Candidate
- Slug: quiz-can-you-count-to-bigint
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/es/index.mdx
- Validation: passed
- Runtime seconds: 30.07
- Input tokens: 13323
- Output tokens: 7548
- Thinking tokens: unknown
- Cached input tokens: 4032
- Cache write tokens: 0
- Estimated cost: $0.001878
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: ¿Puedes contar con JavaScript?'
subTitle: ¿Conoces la diferencia entre `parseInt` y `parseFloat`?
label: Numbers
date: '2024-10-31'
modified: '2024-11-09'
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
tags:
  - quiz
  - data-structures
  - algorithms
cover: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
cover_full_width: ../victor-freitas-hOuJYX2K5DA-unsplash-wide.webp
cover_mobile: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
cover_icon: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


import Challenge from '../../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../../components/QuizUI/QuizUI';

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Calentamiento"
  title="Analizando con `parseInt`"
  options={[
    {text: '123456', isAnswer: true},
    {text: '123'},
    {text: '12345600'},
    {text: '456.00'},
    {text: 'Error'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
    parseInt(" 123456.00")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La función `parseInt` ignora los espacios y analiza la secuencia inicial de dígitos como un entero. Aquí, se detiene en el punto decimal, por lo que solo se devuelve `123456`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Análisis"
  title="Manejo de comas"
  options={[
    {text: '123', isAnswer: true},
    {text: '12345600'},
    {text: '123456.00'},
    {text: '456.00'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
    parseInt("123,456.00")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En términos generales, `parseInt` deja de analizar cuando encuentra un carácter no numérico. Aquí se detiene en la coma, por lo que solo se devuelve `123`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Matemáticas"
  title="Precisión con puntos flotantes"
  options={[
    {text: '0.1 + 0.2 === 0.3'},
    {text: 'false', isAnswer: true},
    {text: 'true'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
    0.1 + 0.2 === 0.3
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Debido a errores de precisión de punto flotante, `0.1 + 0.2` no es exactamente igual a `0.3`. Por la forma en que los números de punto flotante se almacenan en memoria, el resultado es `0.30000000000000004`. El estándar IEEE 754 para el manejo de aritmética de punto flotante es el culpable, no puede representar algunos números con exactitud. Este es un problema común en todos los lenguajes de programación. Eventualmente te encontrarás con un decimal que se repite infinitamente, y sin importar el lenguaje, la computadora simplemente tiene que dejar de perseguir dígitos infinitamente repetidos.

    Algunos lenguajes como Python y Java tienen `Decimal` o `BigDecimal` para manejar esto, pero no está incorporado en JavaScript. Puedes usar bibliotecas como `big.js` o `decimal.js` para tratar estos casos.

    (Nota: Algunos lenguajes están diseñados para manejar fracciones, números imaginarios, etc., a un nivel lógico más alto, preservando expresiones literales. Pero aún así deben lidiar con los mismos problemas de precisión de punto flotante a nivel de hardware.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Números desbordados"
  title="Manejo de Infinity"
  options={[
    {text: 'Infinity', isAnswer: true},
    {text: 'NaN'},
    {text: 'Error'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
    Number.MAX_VALUE * 2
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dado que `Number.MAX_VALUE` es el número regular **representable** más grande en JavaScript, superar su límite provocará un desbordamiento rápido, básicamente verás resultados sin sentido. Multiplicarlo por `2` da como resultado `Infinity`.

    *Ya sabes, JavaScript a veces es así.*
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Formato"
  title="Conversión de cadena con `.toFixed()`"
  options={[
    {text: 'TypeError'},
    {text: 'SyntaxError'},
    {text: '"5"'},
    {text: '5'},
    {text: '"5.00"', isAnswer: true},
    {text: '5.0'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué podría hacer esto?
    ```tsx
    5..toFixed(2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `.toFixed(2)` devuelve una representación en cadena de `5` con dos decimales, por lo que el resultado es `"5.00"`.

    El doble punto (`5..toFixed(2)`) es un 'truco' para acceder al modelo de objetos de los literales numéricos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Comparando tipos"
  title="Comparación de igualdad entre `parseInt` y `parseFloat`"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
    parseInt("42") === parseFloat("42")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En JavaScript, tanto `parseInt` como `parseFloat` interpretarán la cadena "42" como el número 42. Por lo tanto, la comparación `parseInt("42") === parseFloat("42")` evalúa a `true`. Mientras que `parseInt` deja de analizar en el primer carácter no numérico, `parseFloat` continúa analizando hasta encontrar un carácter que no forme parte de un número de punto flotante. Sin embargo, como no hay puntos decimales ni otros caracteres no numéricos en "42", ambas funciones devuelven el mismo valor.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Igualdad"
  title="Comparación de igualdad con BigInt"
  options={[
    {text: 'TypeError'},
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
    BigInt("42") === parseInt("42")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) es un tipo diferente de `number`, así que `parseInt("42")` (un número regular) no es estrictamente igual a `BigInt("42")`. Para comparar, debes convertir ambos al mismo tipo: `BigInt(parseInt("42")) === BigInt("42")`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Basado"
  title="Análisis Hexadecimal"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
    {text: 'Debe estar en mayúsculas: 2A'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué resultará esto?
    ```jsx
    parseInt("0x2A") === parseInt("2a", 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Cualquier cadena de entrada que empiece con `0x` se trata automáticamente como hexadecimal (radix `16`).
    Por lo tanto es equivalente a pasar un radix de 16. Así, `parseInt("0x2A")` es lo mismo que `parseInt("2a", 16)`. (No distingue mayúsculas de minúsculas.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Basado"
  title="Parseando con Radix"
  options={[
    {text: '255', isAnswer: true},
    {text: '0'},
    {text: '16'},
    {text: '0.16'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué pasa aquí?
    ```jsx
    parseInt('0xFF', 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` con una base hexadecimal (`16`) convierte `"FF"` a `255` en decimal. Puede que lo hayas visto en los códigos de color CSS RGB/Hex.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Number[]"
  title="Usando `.map(parseInt)`"
  options={[
    {text: '[24, NaN, NaN]', isAnswer: true},
    {text: '[24, NaN, 42]'},
    {text: '[24, 42]'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
    [24, 'One', 42].map(parseInt)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El segundo argumento de `parseInt` (el radix) coincide con el argumento `index` de los métodos de array. Esto produce resultados inesperados, ya que `parseInt("One", 1)` devuelve `NaN` por la entrada inválida.

    El primer elemento, `24`, se analiza como `24` en base 0 (detección automática), así que sigue siendo `24`. El segundo elemento, `'One'`, se analiza como `NaN` en base 1. El tercer elemento, `42`, se analiza usando base 2. En base 2, `'42'` es `NaN`, por lo que el resultado es `[24, NaN, NaN]`.

    Esto es una trampa frecuente con `parseInt` y `map`. Si quieres convertir un array de strings a números, el único método "incorporado" seguro es `.map(Number)` o añadir una función de callback `.map(x => parseInt(x, 10))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Number[]"
  title="Usando `.map(Number)`"
  options={[
    {text: '[24, NaN, 34]', isAnswer: true},
    {text: '[24, NaN, 42]'},
    {text: '[24, 1, 42]'},
    {text: '[24, 42]'},
    {text: 'NaN'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
    [24, 'Twenty1', 0o42].map(Number)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Number` convierte los valores a un tipo numérico de forma más estricta que `parseInt`. Aquí, `'Twenty1'` se vuelve `NaN`, mientras que `0o42` se reconoce como un literal octal y se convierte en `34`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Análisis"
  title="Manejo de nulls"
  options={[
    {text: '0 NaN'},
    {text: '0 0'},
    {text: 'NaN NaN'},
    {text: 'NaN 0', isAnswer: true},
    {text: 'null null'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será el resultado de este código?
    ```jsx
    console.log(parseInt(null), Number(null))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` coacciona la entrada a una cadena, así que `null` se convierte en `"null"`. Como `"null"` no tiene caracteres válidos en base‑10 (números normales) devolverá `NaN`.

    `Number(null)` devuelve `0`. porque a JS le gusta mantenerte alerta.
    ¿Por qué? Bueno, podría profundizar si hay interés.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Análisis"
  title="Análisis en base"
  options={[
    {text: 'NaN'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '36'},
    {text: '1112745', isAnswer: true},
    {text: '01001001'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será el resultado de este hechizo?
    ```jsx
    parseInt(null, 36)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dado que `parseInt` siempre coacciona la entrada a una cadena, `null` se convierte en la cadena `"null"`.

    En base 36 (hexatrigesimal, si llevas la cuenta), la cadena `"null"` representa `1112745`.

    Los valores secuenciales de `nulk`, `null` y `nulm` son respectivamente `1112744`, `1112745` y `1112746` en base 36.
  </div>
  </slot>
</Challenge>

</QuizUI>

<section className="scroll-x">
## Tabla de Comparación

| Function | `parseInt` | `parseFloat` | `Number` | `BigInt` |
| --- | --- | --- | --- | --- |
| Ignores Whitespace | ✅ | ✅ | ✅ | ✅ |
| `.map(FN)`  | ❌ | ☑️ | ✅ | ✅ |
| Supports Radix Arg | ✅ | ❌ | ❌ | ❌ |
| Binary/Octal/Hex literals | ✅ | ❌ | ✅ | ✅ |
| Invalid chars `42 oh no` | `42` | `42`  | `NaN` | `SyntaxError` |
</section>

<h2>¿Cómo lo hiciste? 🧐</h2>

{/* <h4>¿Estás bien?</h4> */}

<p class="inset">¿Necesitas un descanso después de tanto binario?<br />Pftt, recuerda: ¡rompe *después* de las habilidades! <br /><br />¡Entra en [mi gimnasio]("../challenges/") para aplastar más retos! 💪</p>
````
