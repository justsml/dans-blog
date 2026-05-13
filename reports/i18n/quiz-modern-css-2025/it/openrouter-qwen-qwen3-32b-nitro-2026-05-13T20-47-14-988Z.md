# Translation Candidate
- Slug: quiz-modern-css-2025
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-07--quiz-modern-css-2025/it/index.mdx
- Validation: deferred
- Runtime seconds: 82.83
- Input tokens: 9939
- Output tokens: 9996
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.003194
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Conosci il CSS moderno? (per 2025)'
subTitle: Sei abbastanza front-end?
label: Advanced CSS
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
minReleaseDate: '2024-10-31'
date: '2024-10-31'
modified: '2024-11-09'
tags:
  - quiz
  - css
  - advanced
  - intermediate
cover_full_width: ../dan-levy-downtown-denver-at-night-wide.webp
cover_mobile: ../dan-levy-downtown-denver-at-night-square-200.webp
cover_icon: ../dan-levy-downtown-denver-at-night-square-200.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## Quiz: Conosci il CSS?

* CSS moderno? 🤔
* **Il CSS dovrebbe stare sul _tuo_ CV???** 🚀
* Domande a scelta multipla. 🤖 ... _Quanto può essere difficile, eh?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Riscaldamento"
  title="Utilizzo delle variabili CSS"
  options={[
    {text: 'background-color: blue;'},
    {text: 'background-color: --main-color;'},
    {text: 'background-color: var(--main-color);', isAnswer: true},
    {text: 'background-color: $main-color;'},
    {text: 'background-color: @main-color;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è il modo corretto per utilizzare una variabile CSS chiamata `--main-color` per impostare il colore di sfondo di un elemento?
    ```css
        :root {
          --main-color: blue;
        }
        div {
          /* How do we use --main-color here? */
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le variabili CSS vengono utilizzate con la funzione `var`, quindi la risposta corretta è `background-color: var(--main-color);`. Questa sintassi recupera il valore di `--main-color` e lo applica.

    Le altre opzioni potrebbero essere familiari da altri linguaggi o sintassi di preprocessori, come Sass o Less.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Funzioni CSS"
  title="Funzione min() CSS"
  options={[
    {text: 'larghezza: 50%;'},
    {text: 'larghezza: 200px;', isAnswer: true},
    {text: 'larghezza: 250px;'},
    {text: 'larghezza: 500px;'},
    {text: 'larghezza: max(50%, 200px);'},
    {text: 'Sintassi non valida'},
  ]}
>
  <slot name="question">
  <div className="question">
    Se la larghezza del genitore/contenitore è 400px, qual sarà la larghezza calcolata dell'elemento seguente?
    ```css
        div {
          width: min(250px, 50%);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La funzione `min()` sceglierà il valore più piccolo tra 250px e il 50% della larghezza del genitore.

    Per capire il valore calcolato, dobbiamo convertire le unità relative in pixel:

    - `50%` di `400px` è `200px`
    - `250px` è già in pixel
    ```css
        /* This gets computed to */
        width: min(250px, 200px);
        /* -> 200px wins */
    ```
    La funzione `min()` è particolarmente utile nel design rispondente, dove puoi assicurarti che un componente (o una dimensione del font) non superi un certo limite.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Funzioni CSS"
  title="Funzione max() CSS"
  options={[
    {text: 'width: 6em;'},
    {text: 'width: 10%;'},
    {text: 'width: 10px;'},
    {text: 'width: 50px;'},
    {text: 'width: 96px;', isAnswer: true},
    {text: 'Sintassi non valida'},
  ]}
>
  <slot name="question">
  <div className="question">
    Dato un contenitore con una larghezza di 200px, qual sarebbe la larghezza calcolata del `<div>`?
    ```css
        div {
          width: max(50px, 10%, 6rem);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La funzione `max()` accetta 2 o più input e utilizzerà automaticamente il valore più grande. Assumendo che la dimensione del font radice sia il valore predefinito del browser `16px`, la larghezza risulta essere `96px`.

    Per comprendere il valore calcolato, dobbiamo convertire le unità relative in pixel:

    - `50px` è già in pixel
    - `10%` di `200px` è `20px`
    - `6rem` è `6 * 16px` (la dimensione del font predefinita) che equivale a `96px`
    ```css
        /* This gets computed to */
        width: max(50px, 20px, 96px);
        /* -> 96px wins */
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Funzioni CSS Grid"
  title="Funzione CSS minmax()"
  options={[
    {text: 'Tutte le larghezze delle colonne tra 100px e 200px'},
    {text: 'Imposta le colonne a 100px, le righe a 200px'},
    {text: 'La colonna uno sarà tra 100px e 200px', isAnswer: true},
    {text: 'Applica l\'intervallo ricorsivamente, incluso sottogrid'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è l'effetto dell'uso di `minmax(100px, 200px)` su una traccia della griglia CSS?
    ```css
        grid-template-columns: minmax(100px, 200px);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Usare `minmax(100px, 200px)` permette alla traccia della griglia di ridimensionarsi tra `100px` e `200px`, adattandosi allo spazio disponibile ma mai scendendo sotto `100px` o superando `200px`.

    Puoi creare layout automaticamente adattivi dove il contenitore e i suoi elementi contribuiscono al calcolo del layout. Questo è potente quando combinato con `repeat()` e `auto-fill` o `auto-fit`, che creeranno tante tracce quante necessarie rispettando i vincoli.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Variabili CSS"
  title="Fallback delle variabili CSS"
  options={[
    {text: 'blu'},
    {text: 'rosso'},
    {text: 'predefinito del sistema'},
    {text: '#6b8e23', isAnswer: true},
    {text: 'var(--secondary-color)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Che colore avrà lo sfondo nel seguente CSS?
    ```css
        div {
          background: var(--primary, olivedrab);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La funzione `var()` permette di impostare un valore di fallback se la variabile non è definita. In questo caso, lo sfondo sarà `olivedrab` (`#6b8e23`) perché `--primary` non è definita.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Funzioni CSS"
  title="Utilizzo di clamp() per il design rispondente"
  options={[
    {text: 'Fallback per unità non supportate'},
    {text: 'Assicurare che le unità `vw` siano comprese tra 20px e 50px'},
    {text: 'Scala lineare tra 200px e 500px', isAnswer: true},
    {text: 'Scala log₂ tra 200px e 500px'},
    {text: 'Fallisci! Nessun supporto per IE 11'},
  ]}
>
  <slot name="question">
  <div className="question">
    Che cosa fa la funzione `clamp()`?
    ```css
        .card {
          width: clamp(200px, 50vw, 500px);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La funzione `clamp()` permette alla larghezza di scalare in base a `50vw`, ma la mantiene entro un intervallo di 200px a 500px.

    Questo significa che la larghezza sarà 200px quando 50vw sarebbe inferiore a 200px, 500px quando 50vw sarebbe superiore a 500px, e lineare tra quei limiti.

    Ti permette di essere rispondente in modo automatico! La cosa da sapere su `clamp` è che combina **unità fisse** con **unità rispondenti o calcolate**.

    Normalmente non vorresti usare unità viewport per le dimensioni del testo, ma con `clamp()` possiamo assicurarci che le dimensioni del testo non diventino troppo piccole o troppo grandi.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Nesting CSS"
  title="Nesting CSS nativo"
  options={[
    {text: 'Solo con SCSS'},
    {text: 'Tecnicamente con PostCSS'},
    {text: 'Sì', isAnswer: true},
    {text: 'No'},
  ]}
>
  <slot name="question">
  <div className="question">
    Il CSS supporta il nesting in modo nativo?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Sì! Ora abbiamo finalmente il nesting CSS nativo! CSS ha introdotto la sintassi di nesting nativo negli anni recenti (2023), permettendo di stilare gerarchicamente direttamente nel CSS.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Nesting CSS"
  title="Nesting CSS"
  options={[
    {text: 'Il nome del file deve terminare con .scss'},
    {text: '`.title` deve precedere proprietà come `color`'},
    {text: 'Solo con PostCSS'},
    {text: 'Perfetto. Nessuna nota.', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Questo è un utilizzo corretto del nesting CSS nativo?
    ```css
        .container {
          color: black;
          .title {
            color: white;
            background: black;
          }
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La classe `.title` è annidata all'interno della classe `.container`, e le proprietà vengono applicate come previsto.

    Questo è un modo ottimo per tenere insieme stili correlati e evitare selettori lunghi.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="CSS Nesting"
  title="Selettore Figlio Diretto con Annidamento"
  options={[
    {text: 'background-color: red'},
    {text: 'background-color: white', isAnswer: true},
    {text: 'background-color: blue'},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    Che colore di sfondo verrà applicato ai `div` figli diretti di `.container`?
    ```css
        .container {
          background-color: red;
          > div {
            background-color: white;
          }
          background-color: blue !important;
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il selettore `>` nella regola annidata applica `background-color: white` solo ai `div` figli diretti all'interno di `.container`.

    L'ultima regola, `background-color: blue !important;`, è un po' di distrazione. È **fuori dalla regola annidata** e verrà applicata a tutti gli elementi `.container`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Variabili CSS"
  title="Modificare una variabile CSS in esecuzione"
  options={[
    {text: 'Le variabili CSS sono immutabili'},
    {text: 'Utilizzando JavaScript', isAnswer: true},
    {text: 'Solo con SCSS'},
    {text: 'Solo con stili inline'},
    {text: 'Utilizzando unità responsive'},
  ]}
>
  <slot name="question">
  <div className="question">
    Come si può modificare il valore di una variabile CSS in esecuzione?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le variabili CSS possono essere impostate utilizzando classi e JavaScript. Possono addirittura essere definite 'dopo' che vengono tecnicamente utilizzate.
    ```js
        document.documentElement.style.setProperty('--main-color', 'blue');
    ```
    Questo cambierà il valore di `--main-color` in `blue` per l'intero documento.

    Le variabili CSS sono mutevoli e possono essere modificate in esecuzione utilizzando JavaScript.

    Possono essere modificate anche aggiungendo o rimuovendo classi, un modello comune per i temi.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Variabili CSS"
  title="Utilizzo di calc() con le variabili CSS"
  options={[
    {text: 'Width: 50px'},
    {text: 'Width: 100px'},
    {text: 'Width: 110px', isAnswer: true, hint: 'Corretto: calcolo corretto con calc()'},
    {text: 'Width: 120px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà la larghezza calcolata dell'elemento?
    ```css
        :root {
          --base-width: 100px;
        }
        div {
          width: calc(var(--base-width) + 10px);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La funzione `calc()` combina il valore di `--base-width` (100px) con un ulteriore 10px, risultando in una larghezza di 110px.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
