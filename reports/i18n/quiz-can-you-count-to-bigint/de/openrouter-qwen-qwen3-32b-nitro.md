# Translation Candidate
- Slug: quiz-can-you-count-to-bigint
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 5.35
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-can-you-count-to-bigint --locale de --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Können Sie auf JavaScript zählen?'
subTitle: Kennst du den Unterschied zwischen `parseInt` und `parseFloat`?
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
  group="Aufwärmen"
  title="Parsing mit `parseInt`"
  options={[
    {text: '123456', isAnswer: true},
    {text: '123'},
    {text: '12345600'},
    {text: '456.00'},
    {text: 'Error'},
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
    Die `parseInt`‑Funktion ignoriert Leerzeichen und liest die anfängliche Ziffernfolge als Ganzzahl ein. Hier stoppt sie beim Dezimalpunkt, sodass nur `123456` zurückgegeben wird.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Parsing"
  title="Umgang mit Komma"
  options={[
    {text: '123', isAnswer: true},
    {text: '12345600'},
    {text: '123456.00'},
    {text: '456.00'},
    {text: 'Fehler'},
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
    Im Allgemeinen stoppt `parseInt` die Verarbeitung, sobald es ein nicht‑numerisches Zeichen trifft. Hier stoppt es beim Komma, sodass nur `123` zurückgegeben wird.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Mathe"
  title="Präzision bei Gleitkommazahlen"
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
    Wegen Präzisionsfehlern bei Gleitkommazahlen ist `0.1 + 0.2` nicht exakt gleich `0.3`. Durch die Art, wie Gleitkommazahlen im Speicher abgelegt werden, ergibt sich `0.30000000000000004`. Der IEEE‑754‑Standard für die Behandlung von Gleitkommaarithmetik ist schuld, er kann manche Zahlen nicht exakt darstellen. Das ist ein verbreitetes Problem in allen Programmiersprachen. Irgendwann stößt man auf eine unendlich wiederholende Dezimalzahl, und egal welche Sprache man nutzt – der Computer muss einfach aufhören, unendlich viele Stellen zu verfolgen.

    Einige Sprachen wie Python und Java bieten `Decimal` oder `BigDecimal`, um das zu lösen, aber JavaScript hat das nicht eingebaut. Man kann Bibliotheken wie `big.js` oder `decimal.js` verwenden, um solche Fälle zu behandeln.

    (Hinweis: Manche Sprachen sind darauf ausgelegt, Brüche, imaginäre Zahlen usw. auf einer höheren logischen Ebene zu handhaben und literale Ausdrücke zu bewahren. Trotzdem müssen sie auf der Hardware‑Ebene dieselben Präzisionsprobleme mit Gleitkommazahlen bewältigen.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Überlaufende Zahlen"
  title="Umgang mit Infinity"
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
    Da `Number.MAX_VALUE` die größte **darstellbare** reguläre Zahl in JavaScript ist, führt das Überschreiten seiner Grenze schnell zu einem Überlauf – im Grunde bekommst du sinnlose Ergebnisse. Das Multiplizieren mit `2` ergibt `Infinity`.

    *Weißt du, JavaScript ist manchmal so.*
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Formatierung"
  title="String-Konvertierung mit `.toFixed()`"
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
    Was könnte das tun?
    ```tsx
    5..toFixed(2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `.toFixed(2)` gibt eine String‑Darstellung von `5` mit zwei Dezimalstellen zurück, also ist das Ergebnis `"5.00"`.

    Der doppelte Punkt (`5..toFixed(2)`) ist ein 'Trick', um auf das Objektmodell von Zahlen‑Literalien zuzugreifen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Typen vergleichen"
  title="Gleichheitsvergleich zwischen `parseInt` und `parseFloat`"
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
    In JavaScript interpretieren sowohl `parseInt` als auch `parseFloat` den String `"42"` als die Zahl `42`. Deshalb ergibt der Vergleich `parseInt("42") === parseFloat("42")` `true`. Während `parseInt` das Parsen beim ersten Nicht‑Ziffer‑Zeichen stoppt, fährt `parseFloat` fort, bis es ein Zeichen trifft, das nicht zu einer Fließkommazahl gehört. Da im String `"42"` jedoch weder Dezimalpunkt noch andere nicht‑numerische Zeichen vorkommen, geben beide Funktionen denselben Wert zurück.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gleichheit"
  title="Gleichheitsvergleich mit BigInt"
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
    [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) ist ein anderer Typ als `number`, daher ist `parseInt("42")` (eine reguläre Zahl) nicht streng gleich `BigInt("42")`. Zum Vergleich musst du beide in denselben Typ konvertieren: `BigInt(parseInt("42")) === BigInt("42")`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Basierend"
  title="Hexadezimal‑Parsing"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
    {text: 'Muss Großbuchstaben sein: 2A'},
    {text: 'Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ergibt das?
    ```jsx
    parseInt("0x2A") === parseInt("2a", 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Jeder Eingabestring, der mit `0x` beginnt, wird automatisch als Hexadezimal (Radix `16`) behandelt.
    Er ist daher äquivalent dazu, einen Radix von 16 zu übergeben. Also ist `parseInt("0x2A")` dasselbe wie `parseInt("2a", 16)`. (Groß‑ und Kleinschreibung ist egal.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Grundlage"
  title="Parsen mit Basis"
  options={[
    {text: '255', isAnswer: true},
    {text: '0'},
    {text: '16'},
    {text: '0.16'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist hier los?
    ```jsx
    parseInt('0xFF', 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` mit einer hexadezimalen (`16`) Basis konvertiert `"FF"` zu `255` im Dezimalsystem. Vielleicht hast du das schon bei CSS‑RGB/Hex‑Farbwerten gesehen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Number[]"
  title="Verwendung von `.map(parseInt)`"
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
    Das zweite Argument von `parseInt` (die Basis) stimmt mit dem `index`‑Argument der Array‑Methoden überein. Das führt zu unerwarteten Ergebnissen, da `parseInt("One", 1)` wegen der ungültigen Eingabe `NaN` zurückgibt.

    Das erste Element, `24`, wird in Basis 0 (automatische Erkennung) als `24` geparst, also bleibt es `24`. Das zweite Element, `'One'`, wird in Basis 1 zu `NaN` geparst. Das dritte Element, `42`, wird mit Basis 2 geparst. In Basis 2 ist `'42'` kein gültiger Wert, also ergibt das Ergebnis `[24, NaN, NaN]`.

    Das ist ein häufiger Stolperstein bei `parseInt` und `map`. Wenn du ein Array von Strings in Zahlen umwandeln willst, ist die einzige sichere „eingebaute“ Methode `.map(Number)` oder ein Callback/Wrapper wie `.map(x => parseInt(x, 10))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Number[]"
  title="Verwendung von `.map(Number)`"
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
    `Number` konvertiert Werte strenger in einen numerischen Typ als `parseInt`. Hier wird `'Twenty1'` zu `NaN`, während `0o42` als oktales Literal erkannt und zu `34` konvertiert wird.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Parsing"
  title="Umgang mit null"
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
    Was wird das Ergebnis dieses Codes sein?
    ```jsx
    console.log(parseInt(null), Number(null))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` wandelt die Eingabe in einen String um, sodass `null` zu `"null"` wird. Da `"null"` keine gültigen dezimalen Zeichen enthält, liefert es `NaN`.

    `Number(null)` liefert `0`. weil JS dich gerne auf Trab hält.
    Warum? Nun, ich könnte tiefer gehen, falls Interesse besteht.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Parsing"
  title="Parsing mit Basis"
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
    Was wird das Ergebnis dieses Zaubers sein?
    ```jsx
    parseInt(null, 36)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Da `parseInt` die Eingabe immer in einen String umwandelt, wird `null` zu dem String `"null"`.

    In Basis 36 (hexatrigesimal, falls du mitzählst), stellt der String `"null"` die Zahl `1112745` dar.

    Die aufeinanderfolgenden Werte von `nulk`, `null` und `nulm` sind jeweils `1112744`, `1112745` und `1112746` in Basis 36.
  </div>
  </slot>
</Challenge>

</QuizUI>

<section className="scroll-x">
## Vergleichstabelle

| Function | `parseInt` | `parseFloat` | `Number` | `BigInt` |
| --- | --- | --- | --- | --- |
| Ignoriert Whitespace | ✅ | ✅ | ✅ | ✅ |
| `.map(FN)`  | ❌ | ☑️ | ✅ | ✅ |
| Unterstützt Radix‑Argument | ✅ | ❌ | ❌ | ❌ |
| Binär/Octal/Hex‑Literale | ✅ | ❌ | ✅ | ✅ |
| Ungültige Zeichen `42 oh no` | `42` | `42`  | `NaN` | `SyntaxError` |
</section>

<h2>Wie hast du abgeschnitten? 🧐</h2>

{/* <h4>Are you ok?</h4> */}

<p class="inset">Brauchst du nach all dem Binärcode eine Pause?<br />Pftt, denk dran: Pause *nach* den Skills! <br /><br />Geh zu [my gym](/challenges/) und knack noch ein paar Challenges! 💪</p>
````
