# Translation Candidate
- Slug: quiz-can-you-count-to-bigint
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 13.44
- Input tokens: 13128
- Output tokens: 8270
- Thinking tokens: unknown
- Cached input tokens: 4992
- Cache write tokens: 0
- Estimated cost: $0.002001
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/it/index.mdx reports/i18n/quiz-can-you-count-to-bigint/it
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Puoi contare su JavaScript?'
subTitle: Conosci la differenza tra `parseInt` e `parseFloat`?
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
    La funzione `parseInt` ignora gli spazi e analizza la sequenza iniziale di cifre come intero. Qui si ferma al punto decimale, quindi restituisce solo `123456`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Analisi"
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
    In generale, `parseInt` interrompe l'analisi quando incontra un carattere non numerico. Qui si ferma alla virgola, quindi restituisce solo `123`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Matematica"
  title="Precisione con i numeri a virgola mobile"
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
    A causa degli errori di precisione dei numeri a virgola mobile, `0.1 + 0.2` non è esattamente uguale a `0.3`. Per il modo in cui i numeri a virgola mobile sono memorizzati in memoria, il risultato è `0.30000000000000004`. Il colpevole è lo standard IEEE 754 per l'aritmetica a virgola mobile, che non può rappresentare alcuni numeri esattamente. Questo è un problema comune in tutti i linguaggi di programmazione. Alla fine ti imbatterai in una decimale periodica infinita e, indipendentemente dal linguaggio, il computer deve semplicemente smettere di inseguire cifre infinite.

    Alcuni linguaggi come Python e Java hanno `Decimal` o `BigDecimal` per gestire questo, ma non è integrato in JavaScript. Puoi usare librerie come `big.js` o `decimal.js` per affrontare questi casi.

    (Nota: alcuni linguaggi sono progettati per gestire frazioni, numeri immaginari, ecc. a un livello logico più alto, preservando le espressioni letterali. Tuttavia devono comunque affrontare gli stessi problemi di precisione dei numeri a virgola mobile a livello hardware.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Numeri in overflow"
  title="Gestire Infinity"
  options={[
    {text: 'Infinity', isAnswer: true},
    {text: 'NaN'},
    {text: 'Errore'},
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
    Poiché `Number.MAX_VALUE` è il più grande numero regolare **rappresentabile** in JavaScript, superare il suo limite provoca rapidamente overflow – sostanzialmente otterrai risultati senza senso. Moltiplicandolo per `2` ottieni `Infinity`.

    *Sai, JavaScript a volte è così.*
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Formattazione"
  title="Conversione di stringa con `.toFixed()`"
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
    Cosa potrebbe fare questo?
    ```tsx
        5..toFixed(2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `.toFixed(2)` restituisce una rappresentazione stringa di `5` con due cifre decimali, quindi il risultato è `"5.00"`.

    Il doppio punto (`5..toFixed(2)`) è un 'trucco' per accedere al modello oggetto dei letterali numerici.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Confronto dei tipi"
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
    In JavaScript, sia `parseInt` che `parseFloat` interpreteranno la stringa `"42"` come il numero `42`. Pertanto, il confronto `parseInt("42") === parseFloat("42")` restituisce `true`. Mentre `parseInt` interrompe l'analisi al primo carattere non numerico, `parseFloat` continua finché non incontra un carattere che non fa parte di un numero in virgola mobile. Tuttavia, poiché nella stringa `"42"` non ci sono punti decimali né altri caratteri non numerici, entrambe le funzioni restituiscono lo stesso valore.
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
    {text: 'vero', isAnswer: true},
    {text: 'falso'},
    {text: 'NaN'},
    {text: 'Deve essere maiuscolo: 2A'},
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
    Qualsiasi stringa di input che inizia con `0x` viene trattata automaticamente come esadecimale (radice `16`).
    È quindi equivalente a passare una radice di 16. Quindi, `parseInt("0x2A")` è lo stesso di `parseInt("2a", 16)`. (È case insensitive.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Basato"
  title="Parsing con base"
  options={[
    {text: '255', isAnswer: true},
    {text: '0'},
    {text: '16'},
    {text: '0.16'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è il problema qui?
    ```jsx
        parseInt('0xFF', 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` con una base esadecimale (`16`) converte `"FF"` in `255` decimale. Potresti averlo visto nei codici colore CSS RGB/Hex.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Number[]"
  title="Usare `.map(parseInt)`"
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
    Il secondo argomento di `parseInt` (il radix) coincide con l'argomento `index` dei metodi di array. Questo porta a risultati inattesi, poiché `parseInt("One", 1)` restituisce `NaN` a causa dell'input non valido.

    Il primo elemento, `24`, viene analizzato come `24` in base 0 (auto‑rilevamento), quindi rimane `24`. Il secondo elemento, `'One'`, viene analizzato come `NaN` in base 1. Il terzo elemento, `42`, viene analizzato usando la base 2. In base 2, `'42'` è `NaN`, quindi il risultato è `[24, NaN, NaN]`.

    Questo è un classico trabocchetto con `parseInt` e `map`. Se vuoi convertire un array di stringhe in numeri, l'unico metodo "built‑in" sicuro è `.map(Number)` o aggiungere una callback/chiusura `.map(x => parseInt(x, 10))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Number[]"
  title="Usare `.map(Number)`"
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
    `Number` converte i valori in un tipo numerico in modo più rigoroso rispetto a `parseInt`. Qui, `'Twenty1'` diventa `NaN`, mentre `0o42` è riconosciuto come un literal ottale e convertito in `34`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Parsing"
  title="Gestire i null"
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
    Quale sarà il risultato di questo codice?
    ```jsx
        console.log(parseInt(null), Number(null))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` converte l'input in una stringa, quindi `null` diventa `"null"`. Poiché `"null"` non contiene caratteri decimali validi (numeri normali) restituisce `NaN`.

    `Number(null)` restituisce `0`. perché JS ama tenerti sulle spine.
    Perché? Potrei approfondire se c'è interesse.
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
    Qual sarà il risultato di questo incantesimo?
    ```jsx
        parseInt(null, 36)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Poiché `parseInt` converte sempre l'input in una stringa, `null` diventa la stringa `"null"`.

    In base 36 (esadecatrigesimale, se tieni il conto), la stringa `"null"` rappresenta `1112745`.

    I valori sequenziali di `nulk`, `null` e `nulm` sono rispettivamente `1112744`, `1112745` e `1112746` in base 36.
  </div>
  </slot>
</Challenge>

</QuizUI>

<section className="scroll-x">
## Tabella di confronto

| Function | `parseInt` | `parseFloat` | `Number` | `BigInt` |
| --- | --- | --- | --- | --- |
| Ignores Whitespace | ✅ | ✅ | ✅ | ✅ |
| `.map(FN)`  | ❌ | ☑️ | ✅ | ✅ |
| Supports Radix Arg | ✅ | ❌ | ❌ | ❌ |
| Binary/Octal/Hex literals | ✅ | ❌ | ✅ | ✅ |
| Invalid chars `42 oh no` | `42` | `42`  | `NaN` | `SyntaxError` |
</section>

<h2>Come è andata? 🧐</h2>

{/* <h4>Are you ok?</h4> */}

<p class="inset">Stai cercando una pausa dopo così tanto binario?<br />Pftt, ricorda: fai una pausa *dopo* le competenze! <br /><br />Vai a [la mia palestra](../challenges/) per affrontare altre sfide! 💪</p>
````
