# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/it/index.mdx
- Validation: deferred
- Runtime seconds: 18.65
- Input tokens: 12996
- Output tokens: 10068
- Thinking tokens: unknown
- Cached input tokens: 4352
- Cache write tokens: 0
- Estimated cost: $0.002319
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: 14 domande su Date in JavaScript'
subTitle: Impressiona gli amici alle feste con i quiz su JS! ✨
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
import QuizUI from '../../../../../components/QuizUI/QuizUI';

## Quanto conosci la classe `Date`?

> * **Metti alla prova le tue abilità JavaScript!** 🚀  
> * Nessun login o registrazione richiesti. ✨  
> * Scelta multipla. 🤖 … _Quanto può essere difficile, vero?_

### Outline

La classe `Date` in JavaScript ha un'API notoriamente ostica. È stata ereditata da Java e, a quanto pare, si ispira a metodi di conteggio del tempo neolitici.

La difficoltà di gestire `Date` spinge molti sviluppatori a ricorrere a librerie di terze parti senza esitazione. Sebbene spesso siano una scelta sicura e affidabile, queste librerie sono raramente necessarie per formattare date o per la localizzazione!

Questo quiz è pensato per verificare (e approfondire) la tua conoscenza dell'API nativa `Date`. Usa i pulsanti verdi per suggerimenti e spiegazioni! Speriamo che, al termine della sfida, avrai consolidato la tua comprensione di `Date` in JavaScript.

#### **NOTE:** Supponi che tutti gli esempi usino il fuso orario locale GMT‑7.

### 👇 14 Domande qui sotto 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Gestione delle Date"
  title="Costruttore Date Parte 1"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa conterrà l'output?
    ```js
        const d1 = new Date(2020, 1, 1)
        console.log(d1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'argomento month è basato su zero. Con un intervallo da 0 a 11 (usando i calendari occidentali).

    'Febbraio' ha un valore indice pari a uno. (Pensalo come una ricerca in un array.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Gestione delle Date"
  title="Costruttore Date Parte 2"
  options={[
    {text: 'Gen 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Argomento non valido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa includerà l'output?
    ```js
        const d2 = new Date(2020, 0, 1)
        console.log(d2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'argomento Month è basato su zero. Con un intervallo da 0 a 11 (usando i calendari occidentali).

    'Gennaio' ha un valore indice zero. (Pensalo come una ricerca in un array.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Gestione delle Date"
  title="Costruttore Date Parte 3"
  options={[
    {text: '01 Jan 1970'},
    {text: 'Epoch Unix di 0'},
    {text: 'Data corrente, in UTC/GMT'},
    {text: 'Data corrente', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: Argomento non valido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa includerà l'output?
    ```js
        const d3 = Date('Thu, 01 Jan 1970 00:00:00 GMT')
        console.log(d3)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Non dimenticare la parola chiave `new`! `Date` è una classe e deve essere invocata con `new`.

    `Date('...')` senza `new` ignora ciò che gli passi. Sembra produrre sempre la data e l'ora correnti con `new Date()` (senza argomenti).

    Questo è un **trappola comune** che è **facile da trascurare**, anche in una revisione del codice.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Gestione delle Date"
  title="Costruttore Date Parte 4"
  options={[
    {text: '1969', isAnswer: true},
    {text: '1970'},
    {text: '2019'},
    {text: '2020'},
    {text: '2021'},
    {text: 'RangeError: Argomento non valido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa conterrà l'output?
    ```js
          const date = new Date(2020)
          console.log(date.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un'istanza di Date creata con un singolo argomento intero viene interpretata come valore Unix `Epoch`. `Epoch` è il conteggio dei millisecondi dal 1 gennaio 1970.

    Un valore di `2020` (millisecondi) corrisponde a 2 secondi dopo il 1 gennaio 1970.

    Poiché il nostro fuso orario locale ha uno scostamento negativo di -7 ore, otteniamo `Wed Dec 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)`.

    Puoi aggirare lo scostamento del fuso locale usando [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Gestione Date"
  title="Parsing di Stringhe Data"
  options={[
    {text: '2019 2020', isAnswer: true},
    {text: '2020 2021'},
    {text: '2020 2020'},
    {text: '2020 2019'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale valore verrà stampato nella console?
    ```js
          const d1 = new Date('2020-01-01')
          const d2 = new Date('2020-01-01T00:00')
          console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La stringa senza valore di tempo `T` può sembrare il 1 gen 2020, ma le stringhe contenenti solo la data vengono interpretate come UTC e, una volta convertite nel nostro fuso orario locale (GMT‑7), scopriamo di essere ancora nel 2019.

    Le stringhe data‑ora senza fuso orario esplicito sono interpretate in ora locale.

    La forma `T00:00` fa sì che il secondo valore sia interpretato come mezzanotte locale.

    La prima data è interpretata come `Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)`.
    La seconda data è interpretata come `Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Gestione Date"
  title="Formattazione Parte 1"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    Seleziona un metodo di formattazione _non corretto_:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il metodo `toLocaleFormat()` non è standard! Potrebbe sembrare familiare perché proviene da una antica libreria di terze parti.

    Consulta la [`toLocaleDateString` documentazione](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) method. Il suo comportamento è documentato in [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gestione delle Date"
  title="Date UTC Parte 1"
  options={[
    {text: 'Wed, 01 Jan 2020 00:00:00 GMT'},
    {text: 'Thu, 02 Jan 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa conterrà l'output?
    ```js
          var date = Date.UTC('2020-01-02T00:00')
          console.log(date.toUTCString())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Otterrai `TypeError: date.toUTCString is not a function`, poiché [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) restituisce un intero in millisecondi, non un'istanza di Date.

    {/* Il metodo [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) utilizza il tuo offset locale (assumi GMT-07:00 per queste domande.)
    Ciò significa che restituirà l'anno precedente (Capodanno -7 ore).
    Il metodo [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) restituirà l'anno così come lo abbiamo fornito a `Date.UTC()`, 2020.
    */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Gestione delle Date"
  title="Date UTC Parte 2"
  options={[
    {text: 'Un\'istanza di data basata su UTC'},
    {text: 'Un\'istanza di data regolata per il fuso orario locale'},
    {text: 'Millisecondi dal 1° gennaio 1970 GMT', isAnswer: true},
    {text: 'Un errore'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa includerà l'output?
    ```js
          const d = Date.UTC(2020, 0, 1)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il metodo di supporto [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) non restituisce un'istanza di data. Restituisce un intero in millisecondi.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Gestione Date"
  title="Date UTC Parte 3"
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
    Cosa includerà l'output?
    ```js
          // Assume local TZ is -07:00
          const d = new Date(Date.UTC(2020, 0, 1))
          console.log(d.getTimezoneOffset())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le Date verranno presentate implicitamente in ora locale, con un (effettivamente) invariabile [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset).

    `Date` non memorizza dati di fuso orario. Conserva il numero di millisecondi trascorsi dall'Epoch Unix (1 gen 1970). Il fuso orario viene considerato durante il parsing e il rendering delle stringhe di data. Il comportamento di visualizzazione predefinito è determinato automaticamente in base alle impostazioni locali del sistema o del browser.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Gestione delle Date"
  title="Impostatori di Data Parte 1"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Argomento non valido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa includerà l'output?
    ```js
          const d = new Date(2020, 0, 1)
          d.setDate(1)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il metodo [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) imposta il giorno del mese, in base al mese corrente dell'istanza fornita.

    Se viene fornito un valore al di fuori del numero di giorni disponibili, il valore del mese dell'istanza verrà aggiustato (ad es. `setDate(32)` a gennaio verrà calcolato come 1 febbraio.)

    <aside class="hint">`setDate` imposta il giorno del mese, tipicamente nell'intervallo 1‑31.</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Gestione Date"
  title="Impostazioni Data Parte 2"
  options={[
    {text: '01 gen 2020'},
    {text: '01 feb 2020', isAnswer: true},
    {text: 'RangeError: argomento non valido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa conterrà l'output?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(1)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il metodo [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) imposta il mese dell'istanza di data fornita.

    L'argomento month è basato su zero, con un intervallo da 0 a 11 (usando i calendari occidentali).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Gestione delle Date"
  title="Impostatori di Data Parte 3"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Jan 01 2021', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Argomento non valido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa includerà l'output?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(12)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il metodo [.setMonth()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) imposta il mese dell'istanza di data fornita.

    L'argomento `month` è indicizzato da zero, con 12 valori nell'intervallo 0‑11 (usando i calendari occidentali).

    Qui vediamo che l'anno viene regolato a 2021, perché `setMonth(12)` è 1 più di 11 (dicembre).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Gestione delle Date"
  title="Settaggi della Data Parte 4"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2021'},
    {text: 'Feb 01 2021', isAnswer: true},
    {text: 'RangeError: Argomento non valido.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa conterrà l'output?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(13)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il metodo [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) imposta il mese dell'istanza di data fornita.

    Il parametro month è indicizzato a zero, con un intervallo 0-11 (usando i calendari occidentali).

    Qui vediamo che mese e anno vengono regolati a febbraio 2021, perché `setMonth(13)` è 2 in più rispetto a 11 (dicembre).

    <aside class="hint">`setMonth` imposta il mese per indice, i 12 mesi sono indicizzati da 0 a 11. </aside>
    <aside class="hint">
    I numeri fuori dall'intervallo 0-11 provocheranno un overflow o underflow dell'anno. Per esempio, `setMonth(13)` regolerà l'anno a 2021 (a febbraio perché 13 è 2 in più rispetto a 11).
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Gestione delle Date"
  title="Impostatori di Data Parte 5"
  options={[
    {text: 'Gen 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Gen 01 2019'},
    {text: 'Dic 01 2019', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa conterrà l'output?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(-1)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il metodo [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) imposta il mese dell'istanza di data fornita.

    L'argomento month è basato su zero, con un intervallo da 0 a 11 (con i calendari occidentali.)

    Qui vediamo che mese e anno tornano a dicembre 2019, perché `setMonth(-1)` è inferiore a 0 (gennaio).
  </div>
  </slot>
</Challenge>

</QuizUI>
````
