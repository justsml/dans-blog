# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: es
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/es/index.mdx
- Validation: deferred
- Runtime seconds: 413.11
- Input tokens: 16605
- Output tokens: 54807
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
title: 'Cuestionario: Dominio de Bash y Shell'
subTitle: ¿Sabes hablar con las computadoras? ¿De verdad?
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">¡Pon a prueba tus habilidades de scripting en Bash con estas 16 preguntas!</p>

Cubre variables, bucles, condicionales, manipulación de cadenas, funciones y trampas de sintaxis, desde lo básico hasta lo más retorcido.

¡Afila (o demuestra) tus **habilidades** de scripting en shell!
---

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
    Esto asigna el valor `"Alice"` a la variable `name`.

    Nota: `$name` se usa para **referenciar** o leer el valor de una variable.

    Poner espacios hace que el shell intente ejecutar el comando como un programa, lo cual no es lo que quieres al asignar un valor.

    Además, Bash distingue mayúsculas de minúsculas, así que `name`, `NAME` y `Name` son variables distintas.

    Por último, los nombres de las variables no pueden llevar espacios ni guiones (`-`). Usa guiones bajos (`_`) o camelCase en su lugar.
    ```bash
        name=Alice
    ```
    This assigns the value `"Alice"` to the variable `name`.

    Note: `$name` is used to **reference** or read a variable's value.

    Adding spaces causes the shell to interpret the command as a program to run, which is not what you want when setting a variable.

    Also, Bash is case-sensitive, so `name`, `NAME` and `Name` are different variables.

    Finally, variables can't have spaces or dashes (`-`) in their names. Use underscores (`_`) or camelCase instead.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Calentamiento: Escapar"
  title="Escapar comillas"
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
    Lo sé. Es alucinante lo rápido que el escapado vuelve las cadenas difíciles de analizar. Imagina meter mano a otros lenguajes dentro de cadenas de Bash: con todas esas comillas, apóstrofes y símbolos `$` conspirando en tu contra. 🫠

    Las comillas simples necesitan escapado dentro de cadenas entre comillas simples. La secuencia de cerrar comilla, comilla escapada y volver a abrir comilla (`'\''`) permite imprimir:
    ```plaintext
        It's 🔨 Time!
    ```
    Existen otras formas de manejarlo, pero esta es la más común.
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
    ¿Qué salida generará este comando?
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La expansión de llaves `{}` genera múltiples versiones de su contexto de cadena, una (o más) por cada valor o patrón separado por comas.

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
    ¿Qué imprimirá esto ahora?
    ```bash
        price="$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Las variables numeradas tienen un significado especial. En este caso, `$1` es una variable especial que almacena el primer argumento pasado al script o función.

    Como estamos ejecutando el script en un REPL, no hay argumentos, por lo que `$1` está vacío. El texto restante `00` se imprime tal cual.

    Para imprimir un carácter `$` literal, usa comillas simples o escápalo con una barra invertida (`\`):
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
    ¿Qué está pasando aquí?
    ```bash
        str="Bark bark"
        echo ${str/bark/meow}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintaxis `${var/pattern/replacement}` reemplaza la primera ocurrencia de `pattern` por `replacement`. Aquí, la salida es:
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
    ¿Cómo obtienes la longitud de una variable en Bash?
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

    La utilidad `wc` es un viejo chiste interno que significa "water closet" (o baño).
    ¡BROMEA! ¿De verdad alguien lee esto?

    En realidad, `wc` es un comando antiguo de POSIX (de la época de AT&T Unix). Es la abreviatura de "word count" y puede contar líneas, palabras y caracteres en un archivo o en un flujo de entrada.
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
    {text: 'El archivo no existe, tras un diagnóstico de prueba', isAnswer: true},
    {text: 'Solo error'},
    {text: 'Faltan los corchetes dobles'},
    {text: 'Nada'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué imprime este script si el archivo `cats.txt` EXISTE?
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
    ¿Te diste cuenta del espacio que falta antes del corchete de cierre?

    Bash es bastante quisquilloso aquí: se requieren espacios dentro de las expresiones entre corchetes.

    Al faltar el espacio, el comando `[` no encuentra un `]` de cierre, Bash imprime un diagnóstico, considera que la prueba falló y continúa hacia la rama `else`.

    La sintaxis correcta es:
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    Nota: Se **recomienda** usar corchetes dobles `[[ ]]` para expresiones condicionales. [Ver BashFAQ.](https://mywiki.wooledge.org/BashFAQ/031)
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
    {text: 'Gatos diferentes, tras un error de sintaxis en la prueba', isAnswer: true},
    {text: 'Zalgo'},
    {text: 'Solo error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cómo comparamos cadenas en Bash?
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
    ¡Otro error de sintaxis en la prueba!

    ¿Te percataste del operador `===` inválido?

    Seguramente estabas pensando en JavaScript...

    Con `[ ... ]`, Bash reporta un error y la condición se evalúa como falsa, así que la rama `else` imprime `Gatos diferentes`. En Bash, usa `=` o `==` para comparar igualdad.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Funciones"
  title="Declaración de funciones"
  options={[
    {text: 'Hola', isAnswer: true},
    {text: 'Dan'},
    {text: 'Hola Dan'},
    {text: 'greet'},
    {text: 'Error'},
    {text: 'Error de sintaxis'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué salida generará este script?
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
    Las funciones en Bash aceptan argumentos. La variable `$1` almacena el primer argumento pasado a la función.

    Ten en cuenta que `$0` es el nombre del script, `$1` el primer argumento, `$2` el segundo, y así sucesivamente. **Los espacios actúan como separadores de argumentos.** Por lo tanto, `greet Hi Dan` pasa `"Hi"` como primer argumento. Para pasar `"Hi Dan"` como un único argumento, deberás encerrarlo entre comillas: `greet "Hi Dan"`.
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
    ¿Qué operador conecta la **salida** de un comando con la **entrada** del siguiente?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El operador de tubería `|` conecta la salida de un comando con la entrada de otro. Por ejemplo:
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
    ¿Cómo funciona la aritmética en Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintaxis `(( ))` realiza operaciones con números enteros en Bash.

    Puedes usarla para cálculos simples:
    ```bash
        ((result = 2 + 2))
        echo $result # => 4
    ```
    O para evaluar expresiones condicionales:
    ```bash
        if (( 2 > 1 )); then
          echo "2 is greater than 1"
        fi
    ```
    Para aritmética de punto flotante, considera usar [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) o [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
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
    ¿Cuál de estas opciones multiplica correctamente 10 por 0.5 e imprime 5?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintaxis `(( ))` SOLO realiza aritmética **entera**. Ya sabes, números enteros, sin decimales.

    Bash (quizás sorprendentemente) carece de soporte **integrado** para aritmética de punto flotante.

    La solución más común es utilizar las utilidades de GNU [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) o [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Manipulación de cadenas"
  title="Extracción de subcadenas"
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
    La sintaxis `${var:offset}` extrae una subcadena que comienza en `offset`. Aquí, la salida es:
    ```plaintext
        good cat
    ```
    Para extraer una subcadena de una longitud específica, usa `${var:offset:length}`.

    Para extraer desde el final de la cadena, usa `${var: -offset}`. (¡Nota el espacio antes del `-`!)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Bucles"
  title="Bucles en Bash"
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
    ¿Cuál NO ❌ es una palabra clave para bucles en Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `each` no es una palabra clave para bucles en Bash. Las principales palabras clave para bucles son `for`, `while` y `until`.

    Aunque `do` no es técnicamente una palabra clave de bucle, es una parte fundamental de la sintaxis de los bucles.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Trampas"
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
    ¿Cuál de estas opciones ejecuta el comando `ls -l` y devuelve su salida?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintaxis `$(ls -l)` ejecuta el comando dentro de los **paréntesis** y sustituye la expresión con su salida. Por ejemplo:
    La 1ª opción usa comillas simples `'`, **no backticks.** Esto impide la expansión, por lo que `'$(date +%F)'` simplemente imprimirá la cadena literal `$(date +%F)`.

    Aunque todavía se admite el uso de backticks (`` `ls -l` ``) para ejecutar comandos, recientemente se ha convertido en un anti-patrón (en algunos contextos). La mayoría recomienda usar `$(comando)` para mejorar la legibilidad y la consistencia entre diferentes shells y versiones.

    Las llaves `${}` se usan para la expansión de variables, no para la sustitución de comandos.

    El carácter `%` no se utiliza para la sustitución de comandos.
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    The 1st option uses Single quotes `'`, **not backticks.** This prevents expansion, so `'$(date +%F)'` would simply print the literal string `$(date +%F)`.

    While it's still supported to use backticks (`` `ls -l` ``) for command execution, it's recently become somewhat of an anti-pattern (in some contexts.) Most recommend using `$(command)` for better readability & consistency with different shells & versions.

    Curly braces `${}` are used for variable expansion, not command substitution.

    The `%` character is not used for command substitution.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Entrada/Salida estándar"
  title="Valores por defecto"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué operador se usa para fusionar la salida de error con la salida estándar?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El operador `2>&1` redirige el error estándar (descriptor de archivo 2) a la salida estándar (descriptor de archivo 1). Esto es útil para capturar los mensajes de error en el mismo flujo de salida que la salida normal.

    El operador `1>&2` redirige la salida estándar al error estándar; sin embargo, la pregunta preguntaba cómo redirigir el error estándar a la salida estándar.

    Para aprender más sobre lo que ocurre bajo el capó, consulta [el excelente FAQ de redirección de Greg](https://mywiki.wooledge.org/BashFAQ/055).

    Además, gracias al usuario de Reddit [u/OneTurnMore](https://www.reddit.com/user/OneTurnMore/) por las sugerencias para mejorar el texto.
  </div>
  </slot>
</Challenge>

</QuizUI>

---
<p className="inset">¿Mi quiz de Bash te dejó hecho un desastre?</p>

¡Avísame en los comentarios de abajo!

### Lecturas adicionales

Refuerza tus habilidades en Bash con los siguientes recursos:

- [Guía de Bash](https://www.gnu.org/software/bash/manual/bash.html)
- [BashFAQ](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
- [Academia de Bash](https://guide.bash.academy/)
- [Tutorial de scripting en Bash](https://ryanstutorials.net/bash-scripting-tutorial/)
- [Manual de referencia de Bash](https://www.gnu.org/software/bash/manual/bash.html)
- [Wiki de Bash Hackers](http://wiki.bash-hackers.org/)
- [Guía de Bash para principiantes](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [Ficha de referencia de Bash](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
---
````
