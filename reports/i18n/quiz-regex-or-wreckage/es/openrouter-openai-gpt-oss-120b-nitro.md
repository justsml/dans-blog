# Translation Candidate
- Slug: quiz-regex-or-wreckage
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-15--quiz-regex-or-wreckage/es/index.mdx
- Validation: passed
- Runtime seconds: 36.49
- Input tokens: 15914
- Output tokens: 10485
- Thinking tokens: unknown
- Cached input tokens: 3904
- Cache write tokens: 0
- Estimated cost: $0.002508
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Dominio de Expresiones Regulares'
subTitle: ¿Dominas alguna expresión regular salvaje?
label: RegEx
social_image: ../desktop-social.webp
category: Quiz
subCategory: RegEx
date: '2024-11-15'
modified: '2024-11-16'
tags:
  - quiz
  - regex
  - javascript
  - intermediate
  - patterns
cover_full_width: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-wide.webp
cover_mobile: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-square-200.webp
cover_icon: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-square-200.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">¿Listo para enfrentarte a algunas expresiones regulares? 🤼‍♂️</p>

Pon a prueba tu conocimiento de RegEx con preguntas que cubren patrones básicos, cuantificadores, grupos y esas complicadas aserciones de look‑around. Desde la coincidencia de cadenas simples hasta la validación de patrones complejos, ¿puedes identificar la expresión regular correcta?

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Calentamiento"
  title="Coincidencia sensible a mayúsculas"
  options={[
    {text: '["Cat"]'},
    {text: '["cat", "CAT", "Cat"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué coincide?
    ```js
    'cat CAT Cat'.match(/cat/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Este patrón usa `g`, pero no `i`:
    - `g` encuentra todas las coincidencias
    - Sin `i`, la coincidencia distingue mayúsculas y minúsculas

    Sin la bandera `i`, solo coincide "cat" en minúsculas.

    Esto es particularmente útil al manejar entrada de usuario o HTML donde el caso puede variar.

    [Aprende más sobre las banderas de RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Calentamiento"
  title="Coincidencia Simple de Caracteres"
  options={[
    {text: '["cat", "hat"]', isAnswer: true},
    {text: '["cat", "hat", "what"]'},
    {text: '["cat"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué devolverá este código?
    ```js
    const words = ['cat', 'hat', 'what', 'bat'];
    words.filter(word => word.match(/^[ch]at/))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El patrón `/^[ch]at/` coincide con cadenas que:
    - Comienzan (`^`) con 'c' o 'h' (eso es lo que `[ch]` significa: una clase de caracteres que coincide con un carácter)
    - Seguidos literalmente de 'at'

    Por lo tanto, solo "cat" y "hat" coinciden con este patrón. El método `filter()` conserva solo los elementos que coinciden.

    [Aprende más sobre clases de caracteres en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Coincidencia básica"
  title="Codicioso vs No codicioso"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué coincidirá esto?
    ```js
    '<div>Hello</div><div>World</div>'.match(/<div>.*?<\/div>/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El patrón `/<div>.*?<\/div>/g` usa coincidencia no codiciosa con `*?`, lo que significa:
    - Coincidir `<div>`
    - Coincidir cualquier carácter (`.*`) pero el menor número posible (`?`)
    - Hasta encontrar `</div>`
    - La bandera `g` hace que coincida todas las ocurrencias

    Sin el `?`, el `.*` codicioso coincidiría todo desde el primer `<div>` hasta el último `</div>`, produciendo una única coincidencia grande. Con `?`, coincide cada par por separado.

    [Aprende más sobre coincidencia codiciosa vs perezosa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Errores Comunes"
  title="El Metacaracter Punto"
  options={[
    {text: '["hello\nworld"]'},
    {text: '["hello", "world"]', isAnswer: true},
    {text: '["hello\n", "world"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué devolverá esto?
    ```js
    'hello\nworld'.match(/\w+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El patrón `\w+` coincide con uno o más caracteres de palabra. Aunque la cadena contiene un salto de línea, `\w` coincide con:
    - Letras (a-z, A-Z)
    - Números (0-9)
    - Guion bajo (_)

    Así, el salto de línea actúa como un límite de palabra y obtenemos dos coincidencias. Si hubiéramos usado `.*`, no coincidiría con el salto de línea por defecto (necesitarías la bandera `s` para eso).

    [Aprende más sobre metacaracteres](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#types)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Look-ahead"
  title="Look-ahead positivo"
  options={[
    {text: '["$100", "€50"]'},
    {text: '["100", "50"]'},
    {text: '["$", "€"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué coincidirá esto?
    ```js
    '$100 and €50'.match(/\d+(?=[\$€])/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Este patrón no coincidirá con nada porque el look-ahead está al revés. Si quieres dígitos precedidos por `$` o `€`, usa un look-behind: `/(?<=[\$€])\d+/g`.

    Los look-aheads verifican lo que viene *después* de la posición actual. El patrón tal como está busca:
    - Uno o más dígitos (`\d+`)
    - Seguidos por (`(?=...)`) ya sea `$` o `€` (`[\$€]`)

    Como no hay números seguidos de símbolos de moneda (están precedidos por ellos), no obtenemos coincidencias.

    [Aprende más sobre aserciones look-ahead](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Coincidencia Básica"
  title="Límites de Palabra"
  options={[
    {text: '["cat", "cats"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '["cats"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué coincidirá?
    ```js
    'cat cats category'.match(/\bcat\b/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El `\b` representa un límite de palabra, que coincide:
    - Entre un carácter de palabra y un carácter no palabra
    - Al inicio o al final de la cadena si hay un carácter de palabra

    Así, `/\bcat\b/` coincide con "cat" solo cuando es una palabra completa, no parte de otra palabra.
    - ✅ "cat" (rodeado de espacios)
    - ❌ "cats" (no hay límite después de "cat")
    - ❌ "category" (no hay límite después de "cat")

    [Aprende más sobre los límites de palabra](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#other_assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Errores comunes"
  title="El modificador global"
  options={[
    {text: 'null'},
    {text: '["a"]'},
    {text: '["a", "a", "a"]', isAnswer: true},
    {text: '["b", "n", "n"]'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la salida?
    ```js
    'banana'.match(/a/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El modificador `g` (global) cambia cómo se comporta `match()`:
    - Sin `g`: devuelve la primera coincidencia con los grupos de captura
    - Con `g`: devuelve un array con todas las cadenas coincidentes

    En este caso, encuentra todas las ocurrencias de "a" en "banana".

    Nota: Si necesitas tanto todas las coincidencias COMO los grupos de captura, usa `matchAll()` o el método `exec()` en un bucle.

    [Aprende más sobre el modificador global](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Look-behind"
  title="Look-behind negativo"
  options={[
    {text: '["123"]'},
    {text: '["123", "456"]'},
    {text: '["23", "456"]', isAnswer: true},
    {text: '["456"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué coincide con este patrón?
    ```js
    'abc123 def456'.match(/(?<!abc)\d+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El look-behind negativo `(?<!abc)` asegura que los dígitos no estén precedidos por "abc":
    - ❌ "123" (precedido por "abc")
    - ✅ "23" (precedido por "abc1")
    - ✅ "456" (precedido por "def")

    JavaScript admite aserciones de look-behind en motores modernos. Este ejemplo usa un look-behind de longitud fija: `abc` siempre tiene tres caracteres. El look-behind de longitud variable es el caso más complicado y depende del motor.

    Nota: El soporte de look-behind es relativamente reciente en JavaScript. Consulta la [compatibilidad de navegadores](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#browser_compatibility) si necesitas soportar navegadores antiguos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Coincidencia básica"
  title="Grupos de captura"
  options={[
    {text: '["2029-12-31"]'},
    {text: '["2029", "12", "31"]', isAnswer: true},
    {text: '["20", "29", "12", "31"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué devolverá esto?
    ```js
    '2029-12-31'.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El patrón usa tres grupos de captura:
    1. `(\d{4})` captura el año
    2. `(\d{2})` captura el mes
    3. `(\d{2})` captura el día

    `match()` sin la bandera `g` devuelve:
    - Índice 0: Coincidencia completa
    - Índice 1+: Grupos de captura

    `slice(1)` es un truco común para obtener solo los grupos de captura.

    [Aprende más sobre grupos y capturas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Lookahead"
  title="Lookahead negativo"
  options={[
    {text: '["password123"]'},
    {text: '["abc123"]'},
    {text: '["123aBc"]'},
    {text: '["12"]', isAnswer: true},
    {text: '["abc"]'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál será el resultado de esto?
    ```js
    "123aBc".match(/^\d+(?![a-z])/ig)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El lookahead negativo `(?![a-z])` asegura que no haya letras minúsculas después de los dígitos. Como la parte "3aBc" contiene una letra minúscula después de los dígitos, esa porción no coincide. Por lo tanto, solo coincide el comienzo "12".

    [Aprende más sobre lookahead negativo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Look-behind"
  title="División con look-behind"
  options={[
    {text: '["a,", "b,", "c"]', isAnswer: true},
    {text: '["a,b,c"]'},
    {text: '["a", ",", "b", ",", "c"]'},
    {text: '["a,b,c", ""]'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué se devuelve?
    ```js
    'a,b,c'.split(/(?<=,)/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El patrón `/(?<=,)/` es un look-behind que coincide después de una coma:
    - `a,` (después de la coma)
    - `b,` (después de la coma)
    - `c` (sin coma después)

    El look-behind no consume la coma, por lo que la coma queda adherida al segmento anterior en el resultado del split.

    Esto es útil cuando quieres dividir una cadena basándote en lo que está antes **sin perder el(los) carácter(es) de división.**

    [Aprende más sobre aserciones look-behind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Errores comunes"
  title="Escapando caracteres especiales"
  options={[
    {text: '["$100"]'},
    {text: '["100"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué coincide?
    ```js
    '$100'.match(/$\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los caracteres especiales necesitan escaparse con `\\` para coincidir literalmente:
    - `$` es un carácter especial (fin de cadena)
    - Para coincidir con un signo de dólar literal, escápalo: `\\$`

    Caracteres comunes que requieren escape:
    ```js
    . * + ? ^ $ [ ] \ ( ) { } |
    ```
    Sin escapar, muchos caracteres especiales tienen significados de regex que pueden no ser lo que deseas.

    [Aprende más sobre cómo escapar caracteres especiales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Look-behind"
  title="Look-behind positivo"
  options={[
    {text: '["$100"]'},
    {text: '["100"]', isAnswer: true},
    {text: '["$"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué coincide?
    ```js
    '$100'.match(/(?<=\$)\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El look-behind positivo `(?<=\$)` asegura que los dígitos estén precedidos por un signo de dólar:
    - `(?<=\$)`: Look-behind para el signo de dólar
    - `\d+`: Coincide con uno o más dígitos

    Las aserciones look-behind no consumen caracteres; solo verifican lo que está antes.
    Esto es útil cuando quieres coincidir algo basándote en lo que lo precede sin incluir esa parte.

    [Aprende más sobre aserciones look-behind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Coincidencia básica"
  title="Cuantificadores perezosos vs codiciosos"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué coincide?
    ```js
    '<b>bold</b>'.match(/<b>(.*?)<\/b>/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El patrón usa coincidencia perezosa con `*?`:
    - `<b>`: Coincide la etiqueta de apertura
    - `(.*?)`: Captura cualquier carácter (perezoso)
    - `</b>`: Coincide la etiqueta de cierre

    El `?` después de `*` la hace perezosa, coincidiendo la menor cantidad de caracteres posible.
    Sin `?`, sería codicioso y coincidiría la mayor cantidad posible.

    `slice(1)` devuelve solo el grupo capturado.

    [Aprende más sobre coincidencia codiciosa vs perezosa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Coincidencia Básica"
  title="Bandera Unicode"
  options={[
    {text: '["🙂"]'},
    {text: '["😀", "🙂"]', isAnswer: true},
    {text: 'null'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué coincide?
    ```js
    '😀 🙂'.match(/\p{Emoji}/gu)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El flag `u` habilita:
    - escapes de propiedades Unicode (`\p{...}`)
    - manejo correcto de pares sustitutos

    Sin `u`, los emoji y otros caracteres Unicode podrían no coincidir correctamente.
    El patrón `\p{Emoji}` coincide con los caracteres que tienen la propiedad Unicode `Emoji`. En esta cadena, eso significa los dos pictogramas emoji.

    Nota: los escapes de propiedades Unicode requieren el flag `u`.

    [Aprende más sobre el modo Unicode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Mirar-al-infierno"
  title="Validación de Contraseña"
  options={[
    {text: '"sassword123"'},
    {text: '"Sass123!"', isAnswer: true},
    {text: '"SASSWORD123"'},
    {text: '"Sass word123"'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¡Disculpas de antemano! 😈<br />
    ¿Cuál contraseña coincide con este patrón?
    ```js
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    No escribas nada así en producción! 😅

    Este patrón usa múltiples look‑ahead positivos para imponer:
    - Al menos una letra mayúscula: `(?=.*[A-Z])`
    - Al menos una letra minúscula: `(?=.*[a-z])`
    - Al menos un dígito: `(?=.*\d)`
    - Al menos un carácter especial: `(?=.*[!@#$%^&*])`
    - Longitud mínima de 8: `.{8,}`

    Los look‑ahead son perfectos para la validación de contraseñas porque pueden comprobar varios criterios sin consumir caracteres.

    [Aprende más sobre patrones de validación de contraseñas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

</QuizUI>

<h2>¿Cómo te fue? 🧐</h2>

Las expresiones regulares pueden ser una bestia de domar, pero son increíblemente poderosas una vez que le agarras el truco (y toda la sintaxis nueva). Sigue practicando y serás un maestro del RegEx en nada de tiempo! 🧙‍♂️

<p class="inset">¿Buscas un descanso después de tanto RegEx?<br />Pftt, recuerda: ¡descanso *después* de las habilidades! <br /><br />Visita [mi gimnasio](/challenges/) para aplastar más desafíos! 💪</p>
````
