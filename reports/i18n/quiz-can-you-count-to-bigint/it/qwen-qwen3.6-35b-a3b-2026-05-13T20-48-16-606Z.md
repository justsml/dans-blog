# Translation Candidate
- Slug: quiz-can-you-count-to-bigint
- Locale: it
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/it/index.mdx
- Validation: deferred
- Runtime seconds: 232.36
- Input tokens: 13802
- Output tokens: 43929
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
title: 'Quiz: Puoi contare su JavaScript?'
subTitle: Sai distinguere `parseInt` da `parseFloat`?
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Riscaldamento"
  title="Parsing con `parseInt`"
  options={[
    {text: '123456', isAnswer: true},
    {text: '123'},
    {text: '12345600'},
    {text: '456.00'},
    {text: 'Errore'},
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
    La funzione `parseInt` ignora gli spazi e analizza la sequenza iniziale di cifre come un intero. Qui si ferma al punto decimale, restituendo quindi solo `123456`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Parsing"
  title="Gestione della virgola"
  options={[
    {text: '123', isAnswer: true},
    {text: '12345600'},
    {text: '123456.00'},
    {text: '456.00'},
    {text: 'Errore'},
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
    In generale, `parseInt` interrompe il parsing non appena incontra un carattere non numerico. In questo caso, si ferma alla virgola, restituendo quindi solo `123`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Matematica"
  title="Precisione con i numeri in virgola mobile"
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
    A causa degli errori di precisione nei numeri in virgola mobile, `0.1 + 0.2` non è esattamente uguale a `0.3`. Il modo in cui questi valori vengono memorizzati in memoria fa sì che il risultato sia `0.30000000000000004`. Lo standard IEEE 754 per l'aritmetica in virgola mobile è il colpevole: non riesce a rappresentare alcuni numeri con esattezza. Si tratta di un problema comune a tutti i linguaggi di programmazione. Prima o poi ti imbatterai in una frazione decimale infinitamente periodica e, non importa il linguaggio, il computer dovrà semplicemente smettere di inseguire cifre infinite.

    Alcuni linguaggi come Python e Java dispongono di classi come `Decimal` o `BigDecimal` per gestire il problema, ma non sono integrate nativamente in JavaScript. Puoi utilizzare librerie come `big.js` o `decimal.js` per questi casi.

    (Nota: alcuni linguaggi sono progettati per gestire frazioni, numeri complessi, ecc. a un livello logico più alto, preservando le espressioni letterali. Tuttavia, a livello hardware devono comunque affrontare le stesse limitazioni di precisione in virgola mobile.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Numeri in overflow"
  title="Gestione dell'Infinito"
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
    Poiché `Number.MAX_VALUE` è il numero regolare più grande **rappresentabile** in JavaScript, superare il suo limite causerà rapidamente un overflow - praticamente potresti ottenere risultati privi di senso. Moltiplicandolo per `2` si ottiene `Infinity`.

    *Sai com'è, a volte JavaScript fa così.*
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Formattazione"
  title="Conversione in stringa con `.toFixed()`"
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
    Che risultato produce?
    ```tsx
        5..toFixed(2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `.toFixed(2)` restituisce una rappresentazione in stringa di `5` con due cifre decimali, quindi il risultato è `"5.00"`.

    Il doppio punto (`5..toFixed(2)`) è un trucco per accedere al modello a oggetti dei letterali numerici.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Confronto tra tipi"
  title="Confronto di uguaglianza tra `parseInt` e `parseFloat`"
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
    In JavaScript, sia `parseInt` che `parseFloat` interpretano la stringa `"42"` come il numero `42`. Di conseguenza, il confronto `parseInt("42") === parseFloat("42")` restituisce `true`. Sebbene `parseInt` si fermi al primo carattere non numerico, `parseFloat` continua finché non incontra un carattere che non appartiene a un numero in virgola mobile. Tuttavia, dato che in `"42"` non sono presenti punti decimali o altri caratteri non numerici, entrambe le funzioni restituiscono lo stesso valore.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Uguaglianza"
  title="Confronto di uguaglianza con BigInt"
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
    [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) è un tipo diverso da `number`, quindi `parseInt("42")` (un numero normale) non è strettamente uguale a `BigInt("42")`. Per confrontarli, devi convertire entrambi nello stesso tipo: `BigInt(parseInt("42")) === BigInt("42")`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Basato"
  title="Parsing esadecimale"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
    {text: 'Deve essere in maiuscolo: 2A'},
    {text: 'Errore'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà il risultato?
    ```jsx
        parseInt("0x2A") === parseInt("2a", 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Qualsiasi stringa di input che inizia con `0x` viene trattata automaticamente come un numero esadecimale (base `16`).
    Di conseguenza, equivale a passare una base pari a 16. Quindi, `parseInt("0x2A")` è identico a `parseInt("2a", 16)`. (Non fa distinzione tra maiuscole e minuscole.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Di base"
  title="Parsing con base radice"
  options={[
    {text: '255', isAnswer: true},
    {text: '0'},
    {text: '16'},
    {text: '0.16'},
  ]}
>
  <slot name="question">
  <div className="question">
    Che ci salta fuori, esattamente?
    ```jsx
        parseInt('0xFF', 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` con una base esadecimale (`16`) converte `"FF"` in `255` in decimale. Potresti averlo visto nei codici colore RGB/Hex del CSS.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Number[]"
  title="Utilizzare `.map(parseInt)`"
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
    Il secondo argomento di `parseInt` (la base) corrisponde all'argomento `index` dei metodi array. Questo porta a risultati inaspettati, poiché `parseInt("One", 1)` restituisce `NaN` a causa dell'input non valido.

    Il primo elemento, `24`, viene analizzato come `24` in base 0 (rilevamento automatico), quindi rimane `24`. Il secondo elemento, `'One'`, viene analizzato come `NaN` in base 1. Il terzo elemento, `42`, viene analizzato in base 2. In base 2, `'42'` è `NaN`, quindi il risultato è `[24, NaN, NaN]`.

    Si tratta di una trappola comune con `parseInt` e `map`. Se vuoi convertire un array di stringhe in numeri, l'unico metodo "built-in" sicuro è `.map(Number)` oppure aggiungere una callback `.map(x => parseInt(x, 10))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Number[]"
  title="Utilizzo di `.map(Number)`"
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
    `Number` converte i valori in un tipo numerico in modo più rigoroso rispetto a `parseInt`. Qui, `'Twenty1'` diventa `NaN`, mentre `0o42` viene riconosciuto come un letterale ottale e convertito in `34`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Parsing"
  title="Gestione dei null"
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
    Qual è il risultato di questo codice?
    ```jsx
        console.log(parseInt(null), Number(null))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` converte l'input in una stringa, quindi `null` diventa `"null"`. Poiché `"null"` non contiene cifre valide in base 10 (numeri regolari), restituirà `NaN`.

    `Number(null)` restituisce `0`. Perché JavaScript ama tenerla sulla corda tesa.
    Il perché? Beh, potrei approfondire se c'è interesse.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Parsing"
  title="Parsing in base"
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
    Qual è il risultato di questo incantesimo?
    ```jsx
        parseInt(null, 36)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Poiché `parseInt` converte sempre l'input in una stringa, `null` diventa la stringa `"null"`.

    In base 36 (esatrigesimal, se state tenendo il conto), la stringa `"null"` rappresenta `1112745`.

    I valori consecutivi di `nulk`, `null` e `nulm` sono rispettivamente `1112744`, `1112745` e `1112746` in base 36.
  </div>
  </slot>
</Challenge>

</QuizUI>

---
<section className="scroll-x">
## Tabella di confronto

| Funzione | `parseInt` | `parseFloat` | `Number` | `BigInt` |
| --- | --- | --- | --- | --- |
| Ignora spazi bianchi | ✅ | ✅ | ✅ | ✅ |
| `.map(FN)`  | ❌ | ☑️ | ✅ | ✅ |
| Supporta argomento radix | ✅ | ❌ | ❌ | ❌ |
| Letterali binari/ottali/esadecimali | ✅ | ❌ | ✅ | ✅ |
| Caratteri non validi `42 oh no` | `42` | `42`  | `NaN` | `SyntaxError` |
</section>

<h2>Com'è andata? 🧐</h2>

{/* <h4>Stai bene?</h4> */}

<p class="inset">Cerchi una pausa dopo tutto questo binario?<br />Pftt, ricorda: la pausa viene *dopo* le competenze! <br /><br />Vai alla [palestra](../challenges/) per superare altre sfide! 💪</p>
---
````
