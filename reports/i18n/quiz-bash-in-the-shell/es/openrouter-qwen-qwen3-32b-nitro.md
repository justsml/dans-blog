# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 215.01
- Input tokens: 14130
- Output tokens: 18258
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.005512
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-20--quiz-bash-in-the-shell/es/index.mdx reports/i18n/quiz-bash-in-the-shell/es
## Raw Output

````mdx
---
unlisted: false
title: 'Cuestionario: Bash y Dominio del Shell'
subTitle: ¿Puedes hablar con computadoras? ¿De verdad?
label: Bash
category: Quiz
subCategory: Bash
date: '2024-11-20'
modified: '2024-11-21'
tags:
  - quiz
  - bash
  - scripting
  - shell
  - linux
  - beginner
  - intermediate
  - advanced
social_image: ../desktop-social.webp
cover_full_width: ../psychedelic-shell-wide.webp
cover_mobile: ../psychedelic-shell-square-200.webp
cover_icon: ../psychedelic-shell-square-200.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">Pon a prueba tus habilidades de scripting en Bash con estas 16 preguntas!</p>

Temas: variables, bucles, condicionales, manipulación de cadenas, funciones y trampas de sintaxis desde lo básico hasta lo complicado.

Afinar (o demostrar) tus habilidades de scripting en shell!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Calentamiento"
  title="Declaración de variables"
  options={[
    {text: '$name=Dan'},
    {text: 'name=Dan', isAnswer: true},
    {text: 'name =Dan'},
    {text: 'name == Dan'},
    {text: 'name : Dan'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo se definen las variables en Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las variables en Bash se declaran sin espacios alrededor del signo `=`. Por ejemplo:
    ```bash
        name=Alice
    ```
    Esto asigna el valor `"Alice"` a la variable `name`.

    Nota: `$name` se utiliza para **referenciar** o leer el valor de una variable.

    Agregar espacios hace que la shell interprete el comando como un programa a ejecutar, lo cual no es lo que quieres al definir una variable.

    Además, Bash es sensible a mayúsculas y minúsculas, por lo que `name`, `NAME` y `Name` son variables diferentes.

    Finalmente, las variables no pueden tener espacios ni guiones (`-`) en sus nombres. Usa guiones bajos (`_`) o camelCase en su lugar.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Calentamiento: Escapar"
  title="Escapar Comillas"
  options={[
    {text: 'echo \'It\'s 🔨 Time!\''},
    {text: 'echo \'It\\\'s 🔨 Time!\''},
    {text: 'echo \'It\'\\\'\'s 🔨 Time!\'', isAnswer: true},
    {text: 'echo \'It\'\'s 🔨 Time!\''},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    _¿Qué imprimirá `It's 🔨 Time!`?_
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Lo sé. Es loco cómo rápidamente el escapado de caracteres vuelve a las cadenas difíciles de leer. Imagina escapar otros lenguajes en cadenas de Bash - con todos esos comillas, apóstrofes y símbolos `$` que te f*ckan. 🫠

    Las comillas simples necesitan escaparse dentro de cadenas entre comillas simples. La secuencia de cerrar comilla, escapar comilla, abrir comilla de nuevo (`'\''`) permite imprimir:
    ```plaintext
        It's 🔨 Time!
    ```
    Hay otras formas de manejar esto, pero esta es la más común.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Calentamiento: Expansión"
  title="Comando echo"
  options={[
    {text: 'cat cab'},
    {text: 'cat cbt', isAnswer: true},
    {text: 'ca bt'},
    {text: 'cat'},
    {text: 'cbd'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué salida producirá este comando?
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La expansión de llaves `{}` genera múltiples versiones de su contexto de cadena, una (o más) para cada valor o patrón separado por comas.

    Aquí, `c{a,b}t` se expande a:
    ```plaintext
        cat cbt
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Variables"
  title="Caracteres de escape"
  options={[
    {text: 'Costo: $$100'},
    {text: 'Costo: $100'},
    {text: 'Costo: 100'},
    {text: 'Costo: 00', isAnswer: true},
    {text: 'Costo:'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Ahora, ¿qué imprimirá esto?
    ```bash
        price="$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las variables numeradas tienen un significado especial. En este caso, `$1` es una variable especial que almacena el primer argumento pasado al script o función.

    Dado que estamos ejecutando el script en un REPL, no hay argumentos, por lo que `$1` está vacío. El texto restante `00` se imprime tal cual.

    Para imprimir un carácter `$` literal, use comillas simples o escápelo con una barra invertida (`\`):
    ```bash
        price="\$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Reemplazo de subcadenas"
  title="Reemplazar subcadena"
  options={[
    {text: 'meow meow'},
    {text: 'Meow meow'},
    {text: 'Bark meow', isAnswer: true},
    {text: 'Bark bark'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué está sucediendo aquí?
    ```bash
        str="Bark bark"
        echo ${str/bark/meow}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintaxis `${var/pattern/replacement}` reemplaza la primera ocurrencia de `pattern` con `replacement`. Aquí, la salida es:
    ```plaintext
        Bark meow
    ```
    Es sensible a mayúsculas y minúsculas. Para manejar tanto `bark` como `Bark`, usa un patrón como `${var/[Bb]ark/Bark}` o normaliza la cadena antes del reemplazo.

    Para reemplazar todas las ocurrencias, usa `${var//pattern/replacement}`.

    Para reemplazar desde el inicio de la cadena, usa `${var/#pattern/replacement}`.

    Para reemplazar desde el final de la cadena, usa `${var/%pattern/replacement}`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Longitud de cadena"
  title="Longitud de cadena"
  options={[
    {text: '$#username'},
    {text: '#$username'},
    {text: '${#username}', isAnswer: true},
    {text: '${username#}'},
    {text: 'echo $username | wc -c'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo puedes obtener la longitud de una variable en Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintaxis `${#username}` devuelve la longitud de `username`.

    Por ejemplo:
    ```bash
        username="@justsml"
        echo ${#username} # => 8
    ```
    Aunque `wc` funcionaría, técnicamente no es parte de Bash.

    El comando `wc` es un antiguo comando de Posix (y los días de Unix de AT&T). Es un acrónimo de "cuenta de palabras" y puede contar líneas, palabras y caracteres en un archivo o flujo de entrada.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Condicionales"
  title="If-Else básico"
  options={[
    {text: 'El archivo existe'},
    {text: 'El archivo no existe, después de un diagnóstico de prueba', isAnswer: true},
    {text: 'Solo error'},
    {text: 'Faltan corchetes dobles'},
    {text: 'Nada'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué salida produce este script si el archivo `cats.txt` EXISTE?
    ```bash
        if [ -e cats.txt]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ¿Captaste el espacio faltante antes del corchete de cierre?

    Bash es bastante exigente aquí: se requieren espacios dentro de las expresiones entre corchetes.

    Debido al espacio faltante, el comando `[` no ve el corchete de cierre `]`, Bash imprime un diagnóstico, trata la prueba como fallida y continúa al bloque `else`.

    La sintaxis correcta es:
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    Nota: Los corchetes dobles `[[ ]]` son **recomendados** para expresiones condicionales. [Ver BashFAQ.](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Condicionales"
  title="Comparación de cadenas"
  options={[
    {text: 'Mismo gato'},
    {text: 'Gatos diferentes, después de un error de sintaxis', isAnswer: true},
    {text: 'Zalgo'},
    {text: 'Solo error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo se comparan cadenas en Bash?
    ```bash
        cat1="Rosie"
        cat2="Sunflower"
        if [ "$cat1" === "$cat2" ]; then
          echo "Same cat"
        else
          echo "Different cats"
        fi
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ¡Otro error de sintaxis de prueba!

    ¿Notaste el operador `===` inválido?

    ¡Tal vez estabas pensando en JavaScript...

    Con `[ ... ]`, Bash reporta un mensaje de diagnóstico y la condición es falsa, por lo que la rama `else` imprime `Different cats`. En Bash, usa `=` o `==` para comparaciones de igualdad.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Funciones"
  title="Declaración de función"
  options={[
    {text: 'Hi', isAnswer: true},
    {text: 'Dan'},
    {text: 'Hi Dan'},
    {text: 'greet'},
    {text: 'Error'},
    {text: 'Error de sintaxis'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué salida producirá este script?
    ```bash
        function greet () {
          echo "$1"
        }
        greet Hi Dan
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las funciones en Bash pueden aceptar argumentos. La variable `$1` almacena el primer argumento pasado a la función.

    Recuerda, `$0` es el nombre del script, `$1` es el primer argumento, `$2` es el segundo, y así sucesivamente. **Los espacios separan los argumentos.** Por lo tanto, `greet Hi Dan` pasa `"Hi"` como el primer argumento. Para pasar `"Hi Dan"` como un solo argumento, necesitarías ponerlo entre comillas: `greet "Hi Dan"`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Composición"
  title="Uso de tuberías"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué operador conecta la **salida** de un comando a la **entrada** del siguiente comando?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El operador `|` conecta la salida de un comando a la entrada de otro. Por ejemplo:
    ```bash
        echo "Mr. Levy 👨🏻‍🔬" | wc -m
        # => 14
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Aritmética"
  title="Aritmética básica"
  options={[
    {text: 'echo 2 + 2'},
    {text: 'echo ${2 + 2}'},
    {text: 'echo %(2 + 2)'},
    {text: 'echo $(( 2 + 2 ))', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo funciona la matemática en Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintaxis `(( ))` realiza matemáticas enteras en Bash.

    Se puede usar para cálculos simples:
    ```bash
        ((result = 2 + 2))
        echo $result # => 4
    ```
    O para expresiones condicionales:
    ```bash
        if (( 2 > 1 )); then
          echo "2 is greater than 1"
        fi
    ```
    Para aritmética de punto flotante, considere usar [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) o [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Multiplicación"
  title="Aritmética básica"
  options={[
    {text: 'echo 10 * 0.5'},
    {text: 'echo (10 * 0.5)'},
    {text: 'echo ${ 10 * 0.5 }'},
    {text: 'echo %( 10 * 0.5 )'},
    {text: 'echo $(( 10 * 0.5 ))'},
    {text: 'echo \'10 * 0.5\' | bc', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estas multiplica correctamente 10 y 0.5, imprimiendo 5?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintaxis `(( ))` SOLO realiza **aritmética de enteros**. Es decir, números enteros sin punto decimal.

    Bash (quizás sorprendentemente) no tiene **soporte integrado** para aritmética de punto flotante.

    La solución más común es usar las utilidades de GNU [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) o [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Manipulación de cadenas"
  title="Extracción de subcadena"
  options={[
    {text: 'Gato malo'},
    {text: 'Gato malo, gato bueno:9'},
    {text: 'gato bueno', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace el `:` en este script?
    ```bash
        rosie="Bad cat, good cat"
        echo ${rosie:9}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintaxis `${var:offset}` extrae una subcadena comenzando desde `offset`. Aquí, la salida es:
    ```plaintext
        good cat
    ```
    Para extraer una subcadena de longitud específica, usa `${var:offset:length}`.

    Para extraer desde el final de la cadena, usa `${var: -offset}`. (¡Nota el espacio antes del `-`!)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Ciclos"
  title="Ciclos en Bash"
  options={[
    {text: 'do'},
    {text: 'each', isAnswer: true},
    {text: 'for'},
    {text: 'until'},
    {text: 'while'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué palabra clave NO ❌ es utilizada para ciclos en Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `each` no es una palabra clave de ciclo en Bash. Las palabras clave principales para ciclos son `for`, `while` y `until`.

    Aunque `do` no es técnicamente una palabra clave de ciclo, es un elemento esencial de la sintaxis de los ciclos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Casos especiales"
  title="Sustitución de comandos"
  options={[
    {text: '\'ls -l\''},
    {text: '% ls -l'},
    {text: '$ ls -l'},
    {text: '$(ls -l)', isAnswer: true},
    {text: '${ls -l}'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál opción ejecutará el comando `ls -l` y devolverá la salida?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintaxis `$(ls -l)` ejecuta el comando dentro de los **paréntesis** y sustituye la salida. Por ejemplo:
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    La primera opción usa comillas simples `'`, **no backticks.** Esto impide la expansión, por lo tanto `'$(date +%F)'` simplemente imprimiría la cadena literal `$(date +%F)`.

    Aunque aún se admite el uso de backticks (`` `ls -l` ``) para la ejecución de comandos, últimamente se ha convertido en algo de un patrón anti (en algunos contextos). La mayoría recomienda usar `$(comando)` para una mejor legibilidad y consistencia con diferentes shells y versiones.

    Las llaves `${}` se usan para la expansión de variables, no para la sustitución de comandos.

    El carácter `%` no se usa para la sustitución de comandos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Entrada/Salida estándar"
  title="Valores predeterminados"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué operador se utiliza para combinar la salida de error en la salida estándar?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El operador `2>&1` redirige el error estándar (descriptor de archivo 2) a la salida estándar (descriptor de archivo 1). Esto es útil para capturar mensajes de error en el mismo flujo de salida que la salida regular.

    El operador `1>&2` redirige la salida estándar al error estándar, pero la pregunta pedía cómo redirigir el error estándar a la salida estándar.

    Para aprender más sobre lo que ocurre bajo el capó, consulta [la excelente FAQ de redirección de Greg](https://mywiki.wooledge.org/BashFAQ/055).

    También, gracias al usuario de Reddit [u/OneTurnMore](https://www.reddit.com/user/OneTurnMore/) por las sugerencias de mejora del texto.
  </div>
  </slot>
</Challenge>

</QuizUI>

<p className="inset">¿Te dejó mi cuestionario de Bash en un desastre?</p>

¡Háganmelo saber en los comentarios a continuación!

### Lectura adicional

Refresca tus conocimientos de Bash con los siguientes recursos:

- [Guía de Bash](https://www.gnu.org/software/bash/manual/bash.html)
- [BashFAQ](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
- [Academia de Bash](https://guide.bash.academy/)
- [Tutorial de Scripting en Bash](https://ryanstutorials.net/bash-scripting-tutorial/)
- [Manual de Referencia de Bash](https://www.gnu.org/software/bash/manual/bash.html)
- [Wiki de Bash Hackers](http://wiki.bash-hackers.org/)
- [Guía de Bash para Principiantes](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [Tarjeta de Referencia de Bash](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
````
