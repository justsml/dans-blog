# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/de/index.mdx
- Validation: passed
- Runtime seconds: 145.08
- Input tokens: 15926
- Output tokens: 10386
- Thinking tokens: unknown
- Cached input tokens: 3971
- Cache write tokens: 0
- Estimated cost: $0.002491
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Bash‑ und Shell‑Meisterschaft'
subTitle: Kannst du mit Computern reden? So etwa?
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

<p class="inset">Testen Sie Ihre Bash‑Skript‑Kenntnisse mit diesen 16 Fragen!</p>

Variablen, Schleifen, Bedingungen, Zeichenkettenmanipulation, Funktionen und von einfach bis knifflig auftretende Syntax‑Fallstricke.

Schärfen (oder beweisen) Sie Ihre Shell‑Skript‑**Fähigkeiten**!

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
    Variablen in Bash werden ohne Leerzeichen um das `=`‑Zeichen deklariert. Zum Beispiel:
    ```bash
    name=Alice
    ```
    Dies weist der Variable `name` den Wert `"Alice"` zu.

    Hinweis: `$name` wird verwendet, um den Wert einer Variable **referenzieren** oder zu lesen.

    Leerzeichen führen dazu, dass die Shell den Befehl als auszuführendes Programm interpretiert, was beim Setzen einer Variable nicht gewünscht ist.

    Außerdem ist Bash case‑sensitive, daher sind `name`, `NAME` und `Name` unterschiedliche Variablen.

    Schließlich dürfen Variablennamen keine Leerzeichen oder Bindestriche (`-`) enthalten. Verwenden Sie Unterstriche (`_`) oder camelCase stattdessen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Aufwärmen: Escaping"
  title="Escaping von Anführungszeichen"
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
    _Was wird `It's 🔨 Time!` ausgeben?_
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ich weiß. Es ist verrückt, wie schnell Escaping Strings schwer lesbar macht. Stell dir vor, du musst andere Sprachen in Bash-Strings escapen – mit all den Anführungszeichen, Apostrophen und `$`‑Symbolen, die dich verarschen. 🫠

    Einzelne Anführungszeichen müssen innerhalb von einfach‑gequoteten Strings escaped werden. Die Sequenz Schließen‑Quote, escaped‑Quote, Wieder‑öffnen‑Quote (`'\''`) ermöglicht die Ausgabe von:
    ```plaintext
    It's 🔨 Time!
    ```
    Es gibt andere Wege, das zu lösen, aber das ist der gängigste.
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
    Was gibt dieser Befehl aus?
    ```bash
    echo c{a,b}t
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `{}`-Klammererweiterung erzeugt mehrere Varianten ihres Zeichenkettenkontexts, jeweils eine (oder mehrere) für jeden kommagetrennten Wert oder jedes Muster.

    Hier expandiert `c{a,b}t` zu:
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
    Was wird das jetzt ausgeben?
    ```bash
    price="$100"
    echo "Cost: $price"
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Nummerierte Variablen haben eine besondere Bedeutung. In diesem Fall ist `$1` eine Spezialvariable, die das erste an das Skript oder die Funktion übergebene Argument enthält.

    Da wir das Skript in einem REPL ausführen, gibt es keine Argumente, sodass `$1` leer ist. Der restliche Text `00` wird unverändert ausgegeben.

    Um ein wörtliches `$`‑Zeichen auszugeben, verwendet man einfache Anführungszeichen oder escaped es mit einem Backslash (`\\`):
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
  group="Teilstrings ersetzen"
  title="Teilstring ersetzen"
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
    Sie ist case-sensitive. Um sowohl `bark` als auch `Bark` zu behandeln, verwende ein Muster wie `${var/[Bb]ark/Bark}` oder normalisiere den String vor dem Ersetzen.

    Um alle Vorkommen zu ersetzen, verwende `${var//pattern/replacement}`.

    Um ab Anfang des Strings zu ersetzen, verwende `${var/#pattern/replacement}`.

    Um vom Ende des Strings zu ersetzen, verwende `${var/%pattern/replacement}`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="String-Länge"
  title="String-Länge"
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
    Wie kann man die Länge einer Variable in Bash erhalten?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `${#username}`‑Syntax gibt die Länge von `username` zurück.

    Zum Beispiel:
    ```bash
    username="@justsml"
    echo ${#username} # => 8
    ```
    Obwohl `wc` funktionieren würde, ist es technisch gesehen kein Teil von Bash.

    Das Dienstprogramm `wc` ist ein alter Insider‑Witz, der sich auf „water closet“ bzw. Toilette bezieht.
    SPASS BEISEITE! Liest das überhaupt jemand?

    In Wirklichkeit ist `wc` ein uralter Befehl aus POSIX (und den AT&T‑Unix‑Tagen). Es ist die Abkürzung für „word count“ und kann Zeilen, Wörter und Zeichen in einer Datei oder einem Eingabestrom zählen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Bedingungen"
  title="Grundlegendes If-Else"
  options={[
    {text: 'Datei existiert'},
    {text: 'Datei existiert nicht, nach einer Testdiagnose', isAnswer: true},
    {text: 'Nur Fehler'},
    {text: 'Fehlende doppelte eckige Klammern'},
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

    Bash ist hier ziemlich pingelig: In Klammerausdrücken sind Leerzeichen erforderlich.

    Da das fehlende Leerzeichen den `[`‑Befehl kein schließendes `]` sehen lässt, gibt Bash eine Diagnose aus, behandelt den Test als fehlgeschlagen und springt zum `else`‑Zweig.

    Die korrekte Syntax ist:
    ```bash
    if [ -e example.txt ]; then
      echo "File exists"
    else
      echo "File does not exist"
    fi
    ```
    Hinweis: Doppelte eckige Klammern `[[ ]]` sind **empfohlen** für Bedingungsausdrücke. [Siehe BashFAQ.](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Bedingungen"
  title="String-Vergleich"
  options={[
    {text: 'Gleiche Katze'},
    {text: 'Verschiedene Katzen, nach einem Test‑Syntaxfehler', isAnswer: true},
    {text: 'Zalgo'},
    {text: 'Nur Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie kann man Strings in Bash vergleichen?
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
    Ein weiterer Test‑Syntaxfehler!

    Hast du den ungültigen `===`‑Operator bemerkt?

    Vielleicht hast du an JavaScript gedacht...

    Mit `[ ... ]` gibt Bash eine Diagnose aus und die Bedingung ist falsch, sodass der `else`‑Zweig `Different cats` ausgibt. In Bash verwendet man `=` oder `==` für Gleichheitsvergleiche.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Funktionen"
  title="Funktionsdeklaration"
  options={[
    {text: 'Hallo', isAnswer: true},
    {text: 'Dan'},
    {text: 'Hallo Dan'},
    {text: 'grüßen'},
    {text: 'Fehler'},
    {text: 'Syntaxfehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was gibt dieses Skript aus?
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
    Funktionen in Bash können Argumente entgegennehmen. Die Variable `$1` enthält das erste an die Funktion übergebene Argument.

    Denke daran, `$0` ist der Skriptname, `$1` das erste Argument, `$2` das zweite usw. **Leerzeichen trennen Argumente.** Also übergibt `greet Hi Dan` `"Hi"` als erstes Argument. Um `"Hi Dan"` als ein einziges Argument zu übergeben, muss man es quoten: `greet "Hi Dan"`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Komposition"
  title="Verwendung von Pipes"
  options={[
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
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie funktioniert Mathematik in Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `(( ))`‑Syntax führt Ganzzahl‑Mathematik in Bash aus.

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
    Für Fließkomma‑Arithmetik solltest du [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) oder [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html) verwenden.
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
    Welches davon multipliziert 10 und 0,5 korrekt und gibt 5 aus?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `(( ))`‑Syntax führt NUR **Ganzzahl**‑Arithmetik aus. Also ganze Zahlen, ohne Gleitkomma!

    Bash (vielleicht überraschend) hat keine **eingebaute** Unterstützung für Gleitkomma‑Arithmetik.

    Die gängigste Lösung ist die Verwendung der GNU‑Werkzeuge [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) oder [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Zeichenketten-Manipulation"
  title="Teilstring-Extraktion"
  options={[
    {text: 'Schlechte Katze'},
    {text: 'Schlechte Katze, gute Katze:9'},
    {text: 'gute Katze', isAnswer: true},
    {text: 'Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was bewirkt das `:` in diesem Skript?
    ```bash
    rosie="Bad cat, good cat"
    echo ${rosie:9}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Syntax `${var:offset}` extrahiert einen Teilstring, beginnend bei `offset`. Hier ist die Ausgabe:
    ```plaintext
    good cat
    ```
    Um einen Teilstring mit einer bestimmten Länge zu extrahieren, verwende `${var:offset:length}`.

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
    `each` ist kein Schleifen‑Schlüsselwort in Bash. Die wichtigsten Schleifen‑Schlüsselwörter sind `for`, `while` und `until`.

    Obwohl `do` technisch gesehen kein Schleifen‑Schlüsselwort ist, ist es ein wesentlicher Teil der Schleifensyntax.
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
    Die Syntax `$(ls -l)` führt den Befehl innerhalb der **Klammern** aus und ersetzt ihn durch die Ausgabe. Zum Beispiel:
    ```bash
    echo "Today is $(date +%F)"
    # => Today is 2029-12-31
    ```
    Die erste Option verwendet einfache Anführungszeichen `'`, **keine Backticks**. Das verhindert die Expansion, sodass `'$(date +%F)'` einfach die wörtliche Zeichenkette `$(date +%F)` ausgeben würde.

    Obwohl die Verwendung von Backticks (`` `ls -l` ``) zur Befehlsausführung noch unterstützt wird, gilt das inzwischen in vielen Kontexten als Anti‑Pattern. Die meisten empfehlen `$(command)` für bessere Lesbarkeit und Konsistenz über verschiedene Shells und Versionen hinweg.

    Geschweifte Klammern `${}` dienen der Variablenexpansion, nicht der Befehlsersetzung.

    Das `%`‑Zeichen wird nicht für Befehlsersetzung verwendet.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Standard Ein/Aus"
  title="Standardwerte"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher Operator wird verwendet, um die Fehlermeldungsausgabe mit der Standardausgabe zu kombinieren?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Operator `2>&1` leitet die Standardfehlerausgabe (Dateideskriptor 2) zur Standardausgabe (Dateideskriptor 1) um. Das ist nützlich, um Fehlermeldungen im selben Ausgabestrom wie die reguläre Ausgabe zu erfassen.
  </div>
  </slot>
</Challenge>

</QuizUI>

<p className="inset">Hat mein Bash‑Quiz dich in die Knie gezwungen?</p>

Lass es mich in den Kommentaren unten wissen!

### Weiterführende Literatur

Frische deine Bash‑Kenntnisse mit den folgenden Ressourcen auf:

- [Bash Guide](https://www.gnu.org/software/bash/manual/bash.html)
- [BashFAQ](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
- [Bash Academy](https://guide.bash.academy/)
- [Bash Scripting Tutorial](https://ryanstutorials.net/bash-scripting-tutorial/)
- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Bash Hackers Wiki](http://wiki.bash-hackers.org/)
- [Bash Guide for Beginners](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [Bash Reference Card](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
````
