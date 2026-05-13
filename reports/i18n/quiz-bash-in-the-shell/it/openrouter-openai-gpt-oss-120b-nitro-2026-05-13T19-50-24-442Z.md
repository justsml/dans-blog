# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/it/index.mdx
- Validation: deferred
- Runtime seconds: 25.34
- Input tokens: 16698
- Output tokens: 11032
- Thinking tokens: unknown
- Cached input tokens: 7552
- Cache write tokens: 0
- Estimated cost: $0.002637
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Bash e Shell'
subTitle: 'Riesci a parlare con i computer? Tipo, bene?'
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">Metti alla prova le tue capacità di scripting Bash con queste 16 domande!</p>

Copre variabili, loop, condizionali, manipolazione di stringhe, funzioni e le insidie della sintassi, dal semplice al complicato.

Affina (o dimostra) le tue **abilità** di scripting shell!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Riscaldamento"
  title="Dichiarazione di Variabile"
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
    Come si definiscono le variabili in Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le variabili in Bash si dichiarano senza spazi intorno al segno `=`. Per esempio:
    ```bash
        name=Alice
    ```
    Questo assegna il valore `"Alice"` alla variabile `name`.

    Nota: `$name` è usato per **riferire** o leggere il valore di una variabile.

    Aggiungere spazi fa sì che la shell interpreti il comando come un programma da eseguire, il che non è quello che vuoi quando imposti una variabile.

    Inoltre, Bash è sensibile al maiuscolo/minuscolo, quindi `name`, `NAME` e `Name` sono variabili diverse.

    Infine, le variabili non possono contenere spazi o trattini (`-`) nei loro nomi. Usa underscore (`_`) o camelCase invece.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Riscaldamento: Escape"
  title="Escaping delle virgolette"
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
    _Cosa stamperà `It's 🔨 Time!`?_
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Lo so. È pazzesco quanto rapidamente l'escape renda difficile analizzare le stringhe. Immagina di fare l'escape di altri linguaggi nelle stringhe Bash - con tutte quelle virgolette, apostrofi e simboli `$` che ti incasinano. 🫠

    Le virgolette singole devono essere escape all'interno di stringhe delimitate da virgolette singole. La sequenza chiudi-virgoletta, escape-virgoletta, riapri-virgoletta (`'\''`) consente di produrre:
    ```plaintext
        It's 🔨 Time!
    ```
    Ci sono altri modi per gestirlo, ma questo è il più comune.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Riscaldamento: Espansione"
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
    Cosa stamperà questo comando?
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'espansione con parentesi graffe `{}` genera più versioni del suo contesto di stringa, una (o più) per ogni valore separato da virgola o modello.

    Qui, `c{a,b}t` si espande in:
    ```plaintext
        cat cbt
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Variabili"
  title="Escaping dei caratteri"
  options={[
    {text: 'Costo: $$100'},
    {text: 'Costo: $100'},
    {text: 'Costo: 100'},
    {text: 'Costo: 00', isAnswer: true},
    {text: 'Costo:'},
    {text: 'Errore'},
  ]}
>
  <slot name="question">
  <div className="question">
    Ora, cosa stamperà questo?
    ```bash
        price="$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le variabili numerate hanno un significato speciale. In questo caso, `$1` è una variabile speciale che contiene il primo argomento passato allo script o alla funzione.

    Poiché stiamo eseguendo lo script in una REPL, non ci sono argomenti, quindi `$1` è vuoto. Il testo rimanente `00` viene stampato così com'è.

    Per stampare un carattere `$` letterale, usa gli apici singoli o escapalalo con una barra rovesciata (`\\`):
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
  group="Sostituzione di Sottostringhe"
  title="Sostituire Sottostringa"
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
    Cosa sta succedendo qui?
    ```bash
        str="Bark bark"
        echo ${str/bark/meow}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintassi `${var/pattern/replacement}` sostituisce la prima occorrenza di `pattern` con `replacement`. Qui, l'output è:
    ```plaintext
        Bark meow
    ```
    È sensibile al maiuscolo/minuscolo. Per gestire sia `bark` che `Bark`, usa un pattern come `${var/[Bb]ark/Bark}` o normalizza la stringa prima della sostituzione.

    Per sostituire tutte le occorrenze, usa `${var//pattern/replacement}`.

    Per sostituire dall'inizio della stringa, usa `${var/#pattern/replacement}`.

    Per sostituire dalla fine della stringa, usa `${var/%pattern/replacement}`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Lunghezza della stringa"
  title="Lunghezza della stringa"
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
    Come puoi ottenere la lunghezza di una variabile in Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintassi `${#username}` restituisce la lunghezza di `username`.

    Per esempio:
    ```bash
        username="@justsml"
        echo ${#username} # => 8
    ```
    Mentre `wc` funzionerebbe, tecnicamente non fa parte di Bash.

    L'utilità `wc` è una vecchia battuta interna che si riferisce a "water closet", ovvero il bagno.
    SCHERZO! Qualcuno legge queste cose?

    In realtà `wc` è un comando antico di POSIX (e dei giorni AT&T Unix). È l'abbreviazione di "word count" e può contare linee, parole e caratteri in un file o flusso di input.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Condizionali"
  title="If-Else di Base"
  options={[
    {text: 'Il file esiste'},
    {text: 'Il file non esiste, dopo una diagnostica di test', isAnswer: true},
    {text: 'Solo errore'},
    {text: 'Mancano doppi parentesi quadre'},
    {text: 'Niente'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa stampa questo script se il file `cats.txt` ESISTE?
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
    Hai notato lo spazio mancante prima della parentesi di chiusura?

    Bash è piuttosto esigente qui: gli spazi sono obbligatori dentro le espressioni tra parentesi.

    Poiché lo spazio mancante fa sì che il comando `[` non veda la parentesi chiusa `]`, Bash stampa una diagnostica, considera il test fallito e passa al ramo `else`.

    La sintassi corretta è:
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    Nota: le doppie parentesi quadre `[[ ]]` sono **raccomandate** per le espressioni condizionali. [Vedi BashFAQ.](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Condizionali"
  title="Confronto di stringhe"
  options={[
    {text: 'Stesso gatto'},
    {text: 'Gatti diversi, dopo un errore di sintassi di test', isAnswer: true},
    {text: 'Zalgo'},
    {text: 'Solo errore'},
  ]}
>
  <slot name="question">
  <div className="question">
    Come possiamo confrontare le stringhe in Bash?
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
    Un altro errore di sintassi di test!

    Hai notato l'operatore `===` non valido?

    Potresti aver pensato a JavaScript...

    Con `[ ... ]`, Bash segnala una diagnostica e la condizione è falsa, quindi il ramo `else` stampa `Different cats`. In Bash, usa `=` o `==` per i confronti di uguaglianza.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Funzioni"
  title="Dichiarazione diFunzione"
  options={[
    {text: 'Ciao', isAnswer: true},
    {text: 'Dan'},
    {text: 'Ciao Dan'},
    {text: 'greet'},
    {text: 'Errore'},
    {text: 'Errore di Sintassi'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa stamperà questo script?
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
    Le funzioni in Bash possono accettare argomenti. La variabile `$1` contiene il primo argomento passato alla funzione.

    Ricorda, `$0` è il nome dello script, `$1` è il primo argomento, `$2` è il secondo, e così via. **Gli spazi separano gli argomenti.** Quindi, `greet Hi Dan` passa `"Hi"` come primo argomento. Per passare `"Hi Dan"` come unico argomento, devi racchiuderlo tra virgolette: `greet "Hi Dan"`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Composizione"
  title="Uso del piping"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quale operatore collega l'**output** di un comando all'**input** del comando successivo?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'operatore `|` pipe collega l'output di un comando all'input di un altro. Per esempio:
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
  group="Aritmetica"
  title="Aritmetica di Base"
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
    Come funziona la matematica in Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintassi `(( ))` esegue calcoli interi in Bash.

    Può essere usata per calcoli semplici:
    ```bash
        ((result = 2 + 2))
        echo $result # => 4
    ```
    O per espressioni condizionali:
    ```bash
        if (( 2 > 1 )); then
          echo "2 is greater than 1"
        fi
    ```
    Per l'aritmetica a virgola mobile, considera l'uso di [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) o [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Moltiplicazione"
  title="Aritmetica di Base"
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
    Quale di questi moltiplica correttamente 10 per 0.5, stampando 5?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintassi `(( ))` Esegue SOLO aritmetica **intera**. Sai, numeri interi, senza virgola mobile!

    Bash (forse sorprendentemente) non ha supporto **integrato** per l'aritmetica a virgola mobile.

    La soluzione più comune è usare gli utility GNU [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) o [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Manipolazione di Stringhe"
  title="Estrazione di Sottostringa"
  options={[
    {text: 'Gatto cattivo'},
    {text: 'Gatto cattivo, gatto buono:9'},
    {text: 'gatto buono', isAnswer: true},
    {text: 'Errore'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa fa il `:` in questo script?
    ```bash
        rosie="Bad cat, good cat"
        echo ${rosie:9}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintassi `${var:offset}` estrae una sottostringa a partire da `offset`. Qui, l'output è:
    ```plaintext
        good cat
    ```
    Per estrarre una sottostringa di lunghezza specifica, usa `${var:offset:length}`.

    Per estrarre dalla fine della stringa, usa `${var: -offset}`. (Nota lo spazio prima del `-`!)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Cicli"
  title="Cicli in Bash"
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
    Qual è NON ❌ una parola chiave per i cicli in Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `each` non è una parola chiave di ciclo in Bash. Le principali parole chiave di ciclo sono `for`, `while` e `until`.

    Sebbene `do` non sia tecnicamente una parola chiave di ciclo, è una parte fondamentale della sintassi del ciclo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Trappole"
  title="Sostituzione di Comando"
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
    Quale opzione eseguirà il comando `ls -l` e restituirà l'output?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La sintassi `$(ls -l)` esegue il comando all'interno delle **parentesi** e sostituisce l'output. Per esempio:
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    La prima opzione usa gli apici singoli `'`, **non backticks**. Questo impedisce l'espansione, quindi `'$(date +%F)'` stamperebbe semplicemente la stringa letterale `$(date +%F)`.

    Sebbene sia ancora supportato usare i backticks (`` `ls -l` ``) per l'esecuzione di comandi, è recentemente diventato un po' un anti-pattern (in alcuni contesti). La maggior parte raccomanda di usare `$(command)` per una migliore leggibilità e coerenza con diverse shell e versioni.

    Le parentesi graffe `${}` sono usate per l'espansione di variabili, non per la sostituzione di comandi.

    Il carattere `%` non è usato per la sostituzione di comandi.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Ingresso/Uscita Standard"
  title="Valori Predefiniti"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quale operatore viene usato per combinare l'output di errore con l'output standard?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'operatore `2>&1` reindirizza lo standard error (descrittore di file 2) allo standard output (descrittore di file 1). Questo è utile per catturare i messaggi di errore nello stesso flusso di output dei normali output.
  </div>
  </slot>
</Challenge>

</QuizUI>

<p className="inset">Il mio Quiz su Bash ti ha lasciato in frantumi?</p>

Fammi sapere nei commenti qui sotto!

### Approfondimenti

Rafforza le tue competenze su Bash con le seguenti risorse:

- [Guida Bash](https://www.gnu.org/software/bash/manual/bash.html)
- [BashFAQ](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
- [Accademia Bash](https://guide.bash.academy/)
- [Tutorial di Scripting Bash](https://ryanstutorials.net/bash-scripting-tutorial/)
- [Manuale di Riferimento Bash](https://www.gnu.org/software/bash/manual/bash.html)
- [Wiki Bash Hackers](http://wiki.bash-hackers.org/)
- [Guida Bash per Principianti](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [Scheda di Riferimento Bash](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
````
