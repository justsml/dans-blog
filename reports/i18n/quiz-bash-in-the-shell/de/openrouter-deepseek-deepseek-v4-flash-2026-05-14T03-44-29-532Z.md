# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: de
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/de/index.mdx
- Validation: passed: local checks only
- Runtime seconds: 295.42
- Input tokens: 16421
- Output tokens: 28523
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.010447
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Bash & Shell-Beherrschung'
subTitle: Kannst du mit Computern sprechen? Und zwar richtig?
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

<p class="inset">Teste deine Bash-Scripting-Fähigkeiten mit diesen 16 Fragen!</p>

Abdeckung von Variablen, Schleifen, Bedingungen, String-Manipulation, Funktionen und grundlegenden bis kniffligen Syntaxfallen.

Schärfe (oder beweise) deine Shell-Scripting-**Fähigkeiten**!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Aufwärmen"
  title="Variablendeklaration"
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
    Wie werden Variablen in Bash definiert?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Variablen in Bash werden ohne Leerzeichen um das `=`-Zeichen deklariert. Zum Beispiel:
    ```bash
        name=Alice
    ```
    Dies weist den Wert `"Alice"` der Variable `name` zu.

    Hinweis: `$name` wird verwendet, um auf den Wert einer Variable zu **verweisen** oder ihn auszulesen.

    Das Hinzufügen von Leerzeichen führt dazu, dass die Shell den Befehl als auszuführendes Programm interpretiert, was nicht gewünscht ist, wenn man eine Variable setzt.

    Außerdem ist Bash case-sensitive, daher sind `name`, `NAME` und `Name` unterschiedliche Variablen.

    Schließlich dürfen Variablennamen keine Leerzeichen oder Bindestriche (`-`) enthalten. Verwende stattdessen Unterstriche (`_`) oder camelCase.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Aufwärmen: Escapen"
  title="Anführungszeichen escapen"
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
    _Was wird `It's 🔨 Time!` ausgegeben?_
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Ich weiß. Es ist verrückt, wie schnell Escaping Strings schwer zu parsen macht. Stell dir vor, du escapst andere Sprachen in Bash-Strings – mit all diesen Anführungszeichen, Apostrophen und `$`-Symbolen, die dich verwirren. 🫠

    Einfache Anführungszeichen müssen innerhalb von einfachen Anführungszeichen escaped werden. Die Sequenz aus schließendem Anführungszeichen, escapedem Anführungszeichen und öffnendem Anführungszeichen (`'\''`) ermöglicht die Ausgabe von:
    ```plaintext
        It's 🔨 Time!
    ```
    Es gibt andere Möglichkeiten, dies zu handhaben, aber dies ist die gebräuchlichste.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Aufwärmen: Expansion"
  title="Echo-Befehl"
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
    Was wird dieser Befehl ausgeben?
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Die `{}`-Klammererweiterung erzeugt mehrere Versionen seines String-Kontexts, eine (oder mehr) für jeden kommagetrennten Wert oder jedes Muster.

    Hier erweitert sich `c{a,b}t` zu:
    ```plaintext
        cat cbt
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Variablen"
  title="Zeichen escapen"
  options={[
    {text: 'Kosten: $$100'},
    {text: 'Kosten: $100'},
    {text: 'Kosten: 100'},
    {text: 'Kosten: 00', isAnswer: true},
    {text: 'Kosten:'},
    {text: 'Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird das nun ausgeben?
    ```bash
        price="$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Nummerierte Variablen haben eine besondere Bedeutung. In diesem Fall ist `$1` eine spezielle Variable, die das erste an das Skript oder die Funktion übergebene Argument enthält.

    Da wir das Skript in einer REPL ausführen, gibt es keine Argumente, also ist `$1` leer. Der verbleibende Text `00` wird unverändert ausgegeben.

    Um ein literales `$`-Zeichen auszugeben, verwende einfache Anführungszeichen oder escapen es mit einem Backslash (`\`):
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
  group="Substrings ersetzen"
  title="Substring ersetzen"
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
    Was passiert hier?
    ```bash
        str="Bark bark"
        echo ${str/bark/meow}
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Die Syntax `${var/pattern/replacement}` ersetzt das erste Vorkommen von `pattern` durch `replacement`. Hier ist die Ausgabe:
    ```plaintext
        Bark meow
    ```
    Es wird zwischen Groß- und Kleinschreibung unterschieden. Um sowohl `bark` als auch `Bark` zu behandeln, verwende ein Muster wie `${var/[Bb]ark/Bark}` oder normalisiere den String vor der Ersetzung.

    Um alle Vorkommen zu ersetzen, verwende `${var//pattern/replacement}`.

    Um vom Anfang des Strings zu ersetzen, verwende `${var/#pattern/replacement}`.

    Um vom Ende des Strings zu ersetzen, verwende `${var/%pattern/replacement}`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Zeichenkettenlänge"
  title="Zeichenkettenlänge"
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
    Wie ermittelt man die Länge einer Variable in Bash?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Die Syntax `${#username}` gibt die Länge von `username` zurück.

    Zum Beispiel:
    ```bash
        username="@justsml"
        echo ${#username} # => 8
    ```
    Obwohl `wc` funktionieren würde, ist es technisch gesehen kein Teil von Bash.

    Das Dienstprogramm `wc` ist ein alter Insider-Witz, der sich auf "water closet" oder Toilette bezieht.
    SPASS! Liest das überhaupt jemand?

    In Wirklichkeit ist `wc` ein uralter Befehl aus Posix (und den AT&T Unix-Tagen). Es ist die Abkürzung für "word count" und kann Zeilen, Wörter und Zeichen in einer Datei oder einem Eingabestrom zählen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Bedingungen"
  title="Einfaches If-Else"
  options={[
    {text: 'Datei existiert'},
    {text: 'Datei existiert nicht, nach einer Testdiagnose', isAnswer: true},
    {text: 'Nur Fehler'},
    {text: 'Fehlende doppelte Klammern'},
    {text: 'Nichts'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was gibt dieses Skript aus, wenn die Datei `cats.txt` EXISTIERT?
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
    Hast du das fehlende Leerzeichen vor der schließenden Klammer bemerkt?

    Bash ist hier sehr empfindlich: Leerzeichen sind innerhalb von Klammerausdrücken erforderlich.

    Weil das fehlende Leerzeichen dazu führt, dass der `[`-Befehl keine schließende `]` sieht, gibt Bash eine Diagnose aus, behandelt den Test als fehlgeschlagen und fährt mit dem `else`-Zweig fort.

    Die korrekte Syntax lautet:
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    Hinweis: Doppelte Klammern `[[ ]]` werden **empfohlen** für Bedingungsausdrücke. [Siehe BashFAQ.](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Bedingte Anweisungen"
  title="String-Vergleich"
  options={[
    {text: 'Gleiche Katze'},
    {text: 'Verschiedene Katzen, nach einem Test-Syntaxfehler', isAnswer: true},
    {text: 'Zalgo'},
    {text: 'Nur Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie vergleichen wir Strings in Bash?
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
    Noch ein Test-Syntaxfehler!

    Hast du den ungültigen `===` Operator bemerkt?

    Du hast vielleicht an JavaScript gedacht...

    Mit `[ ... ]` meldet Bash eine Diagnose und die Bedingung ist falsch, daher gibt der `else`-Zweig `Different cats` aus. In Bash verwende `=` oder `==` für Gleichheitsvergleiche.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Funktionen"
  title="Funktionsdeklaration"
  options={[
    {text: 'Hi', isAnswer: true},
    {text: 'Dan'},
    {text: 'Hi Dan'},
    {text: 'greet'},
    {text: 'Error'},
    {text: 'Syntax Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird dieses Skript ausgeben?
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
    Funktionen in Bash können Argumente akzeptieren. Die Variable `$1` enthält das erste Argument, das der Funktion übergeben wird.

    Denk daran: `$0` ist der Skriptname, `$1` ist das erste Argument, `$2` das zweite und so weiter. **Leerzeichen trennen Argumente.** Also übergibt `greet Hi Dan` `"Hi"` als erstes Argument. Um `"Hi Dan"` als einzelnes Argument zu übergeben, müsstest du es in Anführungszeichen setzen: `greet "Hi Dan"`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Komposition"
  title="Piping verwenden"
  options={[
    {text: '>'},
    {text: '>>'},
    {text: '|', isAnswer: true},
    {text: '||'},
    {text: '|>'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher Operator verbindet die **Ausgabe** eines Befehls mit der **Eingabe** des nächsten Befehls?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Der `|` Pipe-Operator verbindet die Ausgabe eines Befehls mit der Eingabe eines anderen. Zum Beispiel:
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
  group="Arithmetik"
  title="Grundlegende Arithmetik"
  options={[
    {text: 'echo 2 + 2'},
    {text: 'echo ${2 + 2}'},
    {text: 'echo %(2 + 2)'},
    {text: 'echo $(( 2 + 2 ))', isAnswer: true},
    {text: 'Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie funktioniert Mathematik in Bash?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Die `(( ))`-Syntax führt Ganzzahlarithmetik in Bash aus.

    Sie kann für einfache Berechnungen verwendet werden:
    ```bash
        ((result = 2 + 2))
        echo $result # => 4
    ```
    Oder für bedingte Ausdrücke:
    ```bash
        if (( 2 > 1 )); then
          echo "2 is greater than 1"
        fi
    ```
    Für Gleitkommaarithmetik solltest du [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) oder [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html) in Betracht ziehen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Multiplikation"
  title="Grundlegende Arithmetik"
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
    Welcher dieser Befehle multipliziert 10 und 0,5 korrekt und gibt 5 aus?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Die `(( ))`-Syntax führt NUR **Ganzzahl**-Arithmetik aus. Du weißt schon, ganze Zahlen, ohne Fließkommazahlen!

    Bash (vielleicht überraschenderweise) hat **keine eingebaute** Unterstützung für Fließkomma-Arithmetik.

    Die gängigste Lösung ist die Verwendung der GNU-Werkzeuge [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) oder [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Zeichenkettenmanipulation"
  title="Substring-Extraktion"
  options={[
    {text: 'Bad cat'},
    {text: 'Bad cat, good cat:9'},
    {text: 'good cat', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht der `:` in diesem Skript?
    ```bash
        rosie="Bad cat, good cat"
        echo ${rosie:9}
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Die `${var:offset}`-Syntax extrahiert eine Teilzeichenkette, die bei `offset` beginnt. Hier ist die Ausgabe:
    ```plaintext
        good cat
    ```
    Um eine Teilzeichenkette einer bestimmten Länge zu extrahieren, verwende `${var:offset:length}`.

    Um vom Ende der Zeichenkette zu extrahieren, verwende `${var: -offset}`. (Beachte das Leerzeichen vor dem `-`!)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Schleifen"
  title="Schleifen in Bash"
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
    Was ist KEIN ❌ Schlüsselwort für Schleifen in Bash?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `each` ist kein Schleifenschlüsselwort in Bash. Die wichtigsten Schleifenschlüsselwörter sind `for`, `while` und `until`.

    Obwohl `do` technisch gesehen kein Schleifenschlüsselwort ist, ist es ein wesentlicher Bestandteil der Schleifensyntax.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Fallstricke"
  title="Befehlsersetzung"
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
    Welche Option führt den Befehl `ls -l` aus und gibt die Ausgabe zurück?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Die `$(ls -l)`-Syntax führt den Befehl innerhalb der **Klammern** aus und ersetzt ihn durch die Ausgabe. Zum Beispiel:
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    Die erste Option verwendet einfache Anführungszeichen `'`, **nicht Backticks.** Dies verhindert die Expansion, sodass `'$(date +%F)'` einfach den literal String `$(date +%F)` ausgeben würde.

    Obwohl es weiterhin unterstützt wird, Backticks (`` `ls -l` ``) zur Befehlsausführung zu verwenden, ist dies in letzter Zeit in manchen Kontexten etwas zum Anti-Pattern geworden. Die meisten empfehlen die Verwendung von `$(command)` für bessere Lesbarkeit und Konsistenz zwischen verschiedenen Shells und Versionen.

    Geschweifte Klammern `${}` werden für die Variablenexpansion verwendet, nicht für die Befehlsersetzung.

    Das `%`-Zeichen wird nicht für die Befehlsersetzung verwendet.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Standard Ein-/Ausgabe"
  title="Standardwerte"
  options={[
    {text: '1>&2'},
    {text: '&2>&1'},
    {text: '2>&1', isAnswer: true},
    {text: '2>1'},
    {text: '&2>1'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher Operator wird verwendet, um die Fehlerausgabe in die Standardausgabe umzuleiten?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Der Operator `2>&1` leitet die Standardfehlerausgabe (Dateideskriptor 2) in die Standardausgabe (Dateideskriptor 1) um. Dies ist nützlich, um Fehlermeldungen im selben Ausgabestrom wie die normale Ausgabe zu erfassen.

    Der Operator `1>&2` leitet die Standardausgabe in die Standardfehlerausgabe um, aber die Frage war, wie man die Standardfehlerausgabe in die Standardausgabe umleitet.

    Um mehr darüber zu erfahren, was unter der Haube passiert, schau dir [Gregs exzellentes Redirection FAQ](https://mywiki.wooledge.org/BashFAQ/055) an.

    Außerdem danke an den Reddit-Benutzer [u/OneTurnMore](https://www.reddit.com/user/OneTurnMore/) für die vorgeschlagenen Verbesserungen des Textes.
  </div>
  </slot>
</Challenge>

</QuizUI>

<p className="inset">Hat mein Bash-Quiz dich völlig zerlegt?</p>

Lass es mich in den Kommentaren unten wissen!

### Weiterführende Lektüre

Frische deine Bash-Kenntnisse mit den folgenden Ressourcen auf:

- [Bash-Handbuch](https://www.gnu.org/software/bash/manual/bash.html)
- [BashFAQ](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
- [Bash-Akademie](https://guide.bash.academy/)
- [Bash-Scripting-Tutorial](https://ryanstutorials.net/bash-scripting-tutorial/)
- [Bash-Referenzhandbuch](https://www.gnu.org/software/bash/manual/bash.html)
- [Bash-Hackers-Wiki](http://wiki.bash-hackers.org/)
- [Bash-Leitfaden für Einsteiger](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [Bash-Referenzkarte](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
````
