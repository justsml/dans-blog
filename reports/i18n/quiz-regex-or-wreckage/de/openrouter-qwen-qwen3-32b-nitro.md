# Translation Candidate
- Slug: quiz-regex-or-wreckage
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-15--quiz-regex-or-wreckage/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 4.27
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-regex-or-wreckage --locale de --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Reguläre Ausdrücke – Meisterkurs'
subTitle: Kannst du wilde RegEx zähmen?
label: RegEx
social_image: ../desktop-social.webp
category: Quiz
subCategory: RegEx
date: '2024-11-15'
modified: '2024-11-16'
tags:
  - quiz
  - regex
  - javascript
  - intermediate
  - patterns
cover_full_width: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-wide.webp
cover_mobile: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-square-200.webp
cover_icon: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-square-200.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">Bereit, sich mit Regular Expressions zu messen? 🤼‍♂️</p>

Testen Sie Ihr RegEx‑Wissen mit Fragen zu Grundmustern, Quantifizierern, Gruppen und den kniffligen Look‑Around‑Assertions. Von einfacher Zeichenketten‑Suche bis hin zur komplexen Muster‑Validierung – finden Sie den richtigen Regex?

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Aufwärmen"
  title="Groß-/Kleinschreibung beachten"
  options={[
    {text: '["Cat"]'},
    {text: '["cat", "CAT", "Cat"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird gematcht?
    ```js
    'cat CAT Cat'.match(/cat/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dieses Muster verwendet `g`, aber nicht `i`:
    - `g` findet alle Treffer
    - Ohne `i` ist die Suche case‑sensitive

    Ohne das `i`‑Flag wird nur das kleingeschriebene „cat“ gefunden.

    Das ist besonders nützlich bei Benutzereingaben oder HTML, wo die Groß‑Kleinschreibung variieren kann.

    [Mehr über RegExp‑Flags erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Aufwärmen"
  title="Einfaches Zeichen-Matching"
  options={[
    {text: '["cat", "hat"]', isAnswer: true},
    {text: '["cat", "hat", "what"]'},
    {text: '["cat"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was gibt dieser Code zurück?
    ```js
    const words = ['cat', 'hat', 'what', 'bat'];
    words.filter(word => word.match(/^[ch]at/))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Muster `/^[ch]at/` findet Zeichenketten, die:
    - Am Anfang (`^`) entweder ein 'c' oder ein 'h' haben (das bedeutet `[ch]` – eine Zeichenklasse, die ein einzelnes Zeichen matcht)
    - Gefolgt von exakt 'at'

    Deshalb passen nur "cat" und "hat" zu diesem Muster. Die `filter()`‑Methode behält nur die passenden Elemente.

    [Mehr zu Zeichenklassen auf MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Grundlegende Übereinstimmung"
  title="Gierig vs Nicht-gierig"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird das matchen?
    ```js
    '<div>Hello</div><div>World</div>'.match(/<div>.*?<\/div>/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Muster `/<div>.*?<\/div>/g` verwendet nicht-gieriges Matching mit `*?`, das bedeutet:
    - `<div>` matchen
    - Beliebiges Zeichen (`.*`) matchen, aber so wenig wie möglich (`?`)
    - Bis `</div>` gefunden ist
    - Das `g`‑Flag sorgt dafür, dass alle Vorkommen gematcht werden

    Ohne das `?` würde das gierige `.*` alles vom ersten `<div>` bis zum letzten `</div>` erfassen und einen einzigen großen Treffer ergeben. Mit `?` wird jedes Paar separat gematcht.

    [Erfahren Sie mehr über gieriges vs lazy Matching](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Häufige Stolperfallen"
  title="Der Punkt-Metazeichen"
  options={[
    {text: '["hello\nworld"]'},
    {text: '["hello", "world"]', isAnswer: true},
    {text: '["hello\n", "world"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird das zurückgeben?
    ```js
    'hello\nworld'.match(/\w+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Muster `\w+` entspricht einem oder mehreren Wortzeichen. Obwohl im String ein Zeilenumbruch vorkommt, matcht `\w`:
    - Buchstaben (a‑z, A‑Z)
    - Zahlen (0‑9)
    - Unterstrich (_)

    Der Zeilenumbruch wirkt also als Wortgrenze, und wir erhalten zwei Treffer. Hätten wir `.*` verwendet, würde es standardmäßig den Zeilenumbruch nicht matchen (dafür bräuchte man das `s`‑Flag).

    [Erfahren Sie mehr über Metazeichen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#types)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Look-ahead"
  title="Positiver Look-ahead"
  options={[
    {text: '["$100", "€50"]'},
    {text: '["100", "50"]'},
    {text: '["$", "€"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird das matchen?
    ```js
    '$100 and €50'.match(/\d+(?=[\$€])/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dieses Muster liefert keinen Treffer, weil das Look-ahead rückwärts gerichtet ist! Wenn du Ziffern möchtest, die von `$` oder `€` vorausgehen, verwende ein Look-behind: `/(?<=[\$€])\d+/g`.

    Look-aheads prüfen, was *nach* der aktuellen Position kommt. Das hier geschriebene Muster sucht nach:
    - Einer oder mehreren Ziffern (`\d+`)
    - Gefolgt von (`(?=...)`) entweder $ oder € (`[\$€]`)

    Da es keine Zahlen gibt, die von Währungssymbolen gefolgt werden (sie stehen davor), gibt es keine Treffer.

    [Erfahre mehr über Look-ahead Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Grundlegende Übereinstimmung"
  title="Wortgrenzen"
  options={[
    {text: '["cat", "cats"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '["cats"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird passen?
    ```js
    'cat cats category'.match(/\bcat\b/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das `\b` steht für einen Wortgrenzen‑Marker, der folgendes matcht:
    - Zwischen einem Wortzeichen und einem Nicht‑Wortzeichen
    - Am Anfang/Ende des Strings, wenn dort ein Wortzeichen steht

    Also matcht `/\bcat\b/` das Wort "cat" nur, wenn es ein vollständiges Wort ist und nicht Teil eines anderen Wortes.
    - ✅ "cat" (von Leerzeichen umgeben)
    - ❌ "cats" (keine Grenze nach "cat")
    - ❌ "category" (keine Grenze nach "cat")

    [Mehr über Wortgrenzen erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#other_assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Häufige Stolperfallen"
  title="Das globale Flag"
  options={[
    {text: 'null'},
    {text: '["a"]'},
    {text: '["a", "a", "a"]', isAnswer: true},
    {text: '["b", "n", "n"]'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist die Ausgabe?
    ```js
    'banana'.match(/a/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das `g`‑Flag (global) ändert das Verhalten von `match()`:
    - Ohne `g`: Gibt die erste Übereinstimmung mit Capture‑Gruppen zurück
    - Mit `g`: Gibt ein Array aller passenden Zeichenketten zurück

    In diesem Fall findet es alle Vorkommen von "a" in "banana".

    Hinweis: Wenn du sowohl alle Treffer ALS auch Capture‑Gruppen brauchst, verwende `matchAll()` oder die `exec()`‑Methode in einer Schleife.

    [Erfahre mehr über das globale Flag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Look-behind"
  title="Negatives Look-behind"
  options={[
    {text: '["123"]'},
    {text: '["123", "456"]'},
    {text: '["23", "456"]', isAnswer: true},
    {text: '["456"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was passt zu diesem Muster?
    ```js
    'abc123 def456'.match(/(?<!abc)\d+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der negative Look-behind `(?<!abc)` stellt sicher, dass den Ziffern nicht "abc" vorausgeht:
    - ❌ "123" (vorgestellt von "abc")
    - ✅ "23" (vorgestellt von "abc1")
    - ✅ "456" (vorgestellt von "def")

    JavaScript unterstützt Look-behind‑Assertions in modernen Engines. Dieses Beispiel verwendet ein Look-behind fester Länge: `abc` ist immer drei Zeichen. Look-behind variabler Länge ist die kniffligere, engine‑spezifische Ecke.

    Hinweis: Look-behind‑Unterstützung ist in JavaScript relativ neu. Prüfe die [Browser‑Kompatibilität](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#browser_compatibility), falls du ältere Browser unterstützen musst.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Grundlegende Übereinstimmung"
  title="Erfassende Gruppen"
  options={[
    {text: '["2029-12-31"]'},
    {text: '["2029", "12", "31"]', isAnswer: true},
    {text: '["20", "29", "12", "31"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird das zurückgeben?
    ```js
    '2029-12-31'.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Muster verwendet drei Erfassungsgruppen:
    1. `(\d{4})` erfasst das Jahr
    2. `(\d{2})` erfasst den Monat
    3. `(\d{2})` erfasst den Tag

    `match()` ohne das `g`‑Flag gibt zurück:
    - Index 0: Gesamte Übereinstimmung
    - Index 1+: Erfassungsgruppen

    `slice(1)` ist ein gängiger Trick, um nur die Erfassungsgruppen zu erhalten.

    [Erfahren Sie mehr über Gruppen und Erfassung](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Look-ahead"
  title="Negatives Look-ahead"
  options={[
    {text: '["password123"]'},
    {text: '["abc123"]'},
    {text: '["123aBc"]'},
    {text: '["12"]', isAnswer: true},
    {text: '["abc"]'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird das Ergebnis sein?
    ```js
    "123aBc".match(/^\d+(?![a-z])/ig)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das negative Look-ahead `(?![a-z])` stellt sicher, dass nach den Ziffern keine Kleinbuchstaben folgen. Da der Teil „3aBc“ einen Kleinbuchstaben nach den Ziffern enthält, wird er nicht gematcht. Deshalb wird nur der Anfang „12“ gematcht.

    [Mehr erfahren über negatives Look-ahead](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Look-behind"
  title="Look-behind Aufteilung"
  options={[
    {text: '["a,", "b,", "c"]', isAnswer: true},
    {text: '["a,b,c"]'},
    {text: '["a", ",", "b", ",", "c"]'},
    {text: '["a,b,c", ""]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird zurückgegeben?
    ```js
    'a,b,c'.split(/(?<=,)/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Muster `/(?<=,)/` ist ein Look-behind, das nach einem Komma matcht:
    - `a,` (nach Komma)
    - `b,` (nach Komma)
    - `c` (kein Komma danach)

    Das Look-behind verbraucht das Komma nicht, daher bleibt das Komma am vorherigen Segment im Split‑Ergebnis angehängt.

    Das ist praktisch, wenn du einen String basierend auf dem, was ihm vorausgeht, aufteilen willst **ohne das Trennzeichen zu verlieren.**

    [Erfahre mehr über Look-behind Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Häufige Stolperfallen"
  title="Escapen von Sonderzeichen"
  options={[
    {text: '["$100"]'},
    {text: '["100"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird gematcht?
    ```js
    '$100'.match(/$\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Sonderzeichen müssen mit `\\` escaped werden, um sie wörtlich zu matchen:
    - `$` ist ein Sonderzeichen (Ende des Strings)
    - Um ein wörtliches Dollarzeichen zu matchen, escapen Sie es: `\\$`

    Häufige Zeichen, die escaped werden müssen:
    ```js
    . * + ? ^ $ [ ] \ ( ) { } |
    ```
    Ohne Escaping haben viele Sonderzeichen Regex‑Bedeutungen, die möglicherweise nicht das gewünschte Verhalten erzeugen.

    [Erfahren Sie mehr über das Escapen von Sonderzeichen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Look-behind"
  title="Positiver Look-behind"
  options={[
    {text: '["$100"]'},
    {text: '["100"]', isAnswer: true},
    {text: '["$"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird gematcht?
    ```js
    '$100'.match(/(?<=\$)\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der positive Look-behind `(?<=\$)` stellt sicher, dass die Ziffern von einem Dollarzeichen vorausgegangen werden:
    - `(?<=\$)`: Look-behind für Dollarzeichen
    - `\d+`: Ein oder mehrere Ziffern matchen

    Look-behind‑Assertions verbrauchen keine Zeichen; sie prüfen nur, was davor steht.
    Das ist nützlich, wenn man etwas basierend auf dem Vorgänger matchen möchte, ohne den vorherigen Teil einzuschließen.

    [Erfahren Sie mehr über Look-behind‑Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Grundlegende Übereinstimmung"
  title="Lazy‑ vs Greedy‑Quantifier"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird gematcht?
    ```js
    '<b>bold</b>'.match(/<b>(.*?)<\/b>/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Muster verwendet lazy Matching mit `*?`:
    - `<b>`: Öffnendes Tag matchen
    - `(.*?)`: Beliebige Zeichen erfassen (lazy)
    - `</b>`: Schließendes Tag matchen

    Das `?` nach `*` macht das Matching lazy und sorgt dafür, dass so wenige Zeichen wie möglich erfasst werden.
    Ohne `?` wäre es greedy und würde so viel wie möglich erfassen.

    `slice(1)` gibt nur die erfasste Gruppe zurück.

    [Mehr erfahren über greedy vs lazy matching](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Grundlegende Übereinstimmung"
  title="Unicode‑Flagge"
  options={[
    {text: '["🙂"]'},
    {text: '["😀", "🙂"]', isAnswer: true},
    {text: 'null'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird gematcht?
    ```js
    '😀 🙂'.match(/\p{Emoji}/gu)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der `u`‑Flag aktiviert:
    - Unicode‑Property‑Escapes (`\\p{...}`)
    - Korrekte Behandlung von Surrogat‑Paaren

    Ohne `u` könnten Emoji‑ und andere Unicode‑Zeichen nicht korrekt gematcht werden.
    Das Muster `\\p{Emoji}` matcht Zeichen mit der Unicode‑Property `Emoji`. In diesem String bedeutet das die beiden Emoji‑Piktogramme.

    Hinweis: Unicode‑Property‑Escapes benötigen den `u`‑Flag.

    [Mehr erfahren über den Unicode‑Modus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Blick-ins-Dieb"
  title="Passwortvalidierung"
  options={[
    {text: '"sassword123"'},
    {text: '"Sass123!"', isAnswer: true},
    {text: '"SASSWORD123"'},
    {text: '"Sass word123"'},
  ]}
>
  <slot name="question">
  <div className="question">
    Entschuldigung im Voraus! 😈<br />
    Welches Passwort entspricht diesem Muster?
    ```js
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Schreiben Sie so etwas niemals in die Produktion! 😅

    Dieses Muster verwendet mehrere positive Look‑aheads, um durchzusetzen:
    - Mindestens einen Großbuchstaben: `(?=.*[A-Z])`
    - Mindestens einen Kleinbuchstaben: `(?=.*[a-z])`
    - Mindestens eine Ziffer: `(?=.*\d)`
    - Mindestens ein Sonderzeichen: `(?=.*[!@#$%^&*])`
    - Mindestlänge von 8: `.{8,}`

    Look‑aheads sind ideal für Passwortvalidierung, weil sie mehrere Kriterien prüfen können, ohne Zeichen zu verbrauchen.

    [Erfahren Sie mehr über Passwortvalidierungsmuster](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

</QuizUI>

<h2>Wie hast du abgeschnitten? 🧐</h2>

Reguläre Ausdrücke können ein Biest sein, aber sie sind unglaublich mächtig, sobald man sie (und die neueren Syntax‑Erweiterungen) beherrscht. Weiter üben und du bist im Handumdrehen ein RegEx‑Meister! 🧙‍♂️

<p class="inset">Braucht du nach all dem RegEx eine Pause?<br />Pftt, denk dran: Pause *nach* den Skills! <br /><br />Schau bei [meinem Gym](/challenges/) vorbei, um noch mehr Challenges zu meistern! 💪</p>
````
