# Translation Candidate
- Slug: quiz-regex-or-wreckage
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-15--quiz-regex-or-wreckage/de/index.mdx
- Validation: deferred
- Runtime seconds: 127.47
- Input tokens: 14652
- Output tokens: 15856
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004978
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: ''
subTitle: ''
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

<p class="inset">Bereit, an einigen regulären Ausdrücken zu knobeln? 🤼‍♂️</p>

Testen Sie Ihr RegEx-Wissen mit Fragen zu Grundmuster, Quantifizierer, Gruppen und diesen tricky Look-around-Assertions. Von einfacher Zeichenkettenabstimmung bis hin zu komplexer Musterüberprüfung – können Sie den richtigen RegEx erkennen?

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Aufwärmen"
  title="Groß- und Kleinschreibung-sensitiver Abgleich"
  options={[
    {text: '["Cat"]'},
    {text: '["cat", "CAT", "Cat"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was passt?
    ```js
        'cat CAT Cat'.match(/cat/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dieser Muster verwendet `g`, aber nicht `i`:
    - `g` findet alle Übereinstimmungen
    - Ohne `i` ist der Abgleich großschreibungs-sensitiv

    Ohne den `i`-Flag passt nur Kleinbuchstaben "cat".

    Dies ist besonders nützlich, wenn man mit Benutzereingaben oder HTML umgeht, bei dem die Großschreibung variieren könnte.

    [Mehr über RegExp-Flags erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Erwärmung"
  title="Einfaches Zeichenabgleich"
  options={[
    {text: '["cat", "hat"]', isAnswer: true},
    {text: '["cat", "hat", "what"]'},
    {text: '["cat"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird dieser Code zurückgeben?
    ```js
        const words = ['cat', 'hat', 'what', 'bat'];
        words.filter(word => word.match(/^[ch]at/))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Muster `/^[ch]at/` passt zu Strings, die:
    - Mit `^` beginnen (d.h. entweder 'c' oder 'h' – `[ch]` ist eine Zeichenklasse, die ein einzelnes Zeichen darstellt)
    - Gefolgt von den Buchstaben 'at'

    Daher passen nur "cat" und "hat" zu diesem Muster. Die `filter()`-Methode behält nur die übereinstimmenden Elemente.

    [Erfahre mehr über Zeichenklassen auf MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Grundlegendes Matching"
  title="Gierige vs. nicht gierige"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird dies übereinstimmen?
    ```js
        '<div>Hello</div><div>World</div>'.match(/<div>.*?<\/div>/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Muster `/<div>.*?<\/div>/g` verwendet nicht gierige Übereinstimmung mit `*?`, was bedeutet:
    - `<div>` übereinstimmen
    - Jedes Zeichen (`.*`) übereinstimmen, aber so wenig wie möglich (`?`)
    - Bis `</div>` gefunden wird
    - Die `g`-Flagge sorgt dafür, dass alle Vorkommen übereinstimmen

    Ohne den `?` würde die gierige `.*` alles von dem ersten `<div>` bis zum letzten `</div>` übereinstimmen, was eine große Übereinstimmung ergeben würde. Mit `?` werden jeweils jedes Paar separat übereinstimmen.

    [Mehr erfahren zu gierigen vs. nicht gierigen Übereinstimmungen](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Häufige Fallstricke"
  title="Der Dot-Metazeichen"
  options={[
    {text: '["hello\nworld"]'},
    {text: '["hello", "world"]', isAnswer: true},
    {text: '["hello\n", "world"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird dies zurückgeben?
    ```js
        'hello\nworld'.match(/\w+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Muster `\w+` passt zu einem oder mehreren Wortzeichen. Obwohl es ein Neuzeilenzeichen in der Zeichenkette gibt, passt `\w` zu:
    - Buchstaben (a-z, A-Z)
    - Zahlen (0-9)
    - Unterstrich (_)

    Somit wirkt das Neuzeilenzeichen als Wortgrenze, und wir erhalten zwei Treffer. Hätten wir `.*` verwendet, würde es standardmäßig nicht das Neuzeilenzeichen匹配 (dazu bräuchte man das `s`-Flag).

    [Mehr über Metazeichen erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#types)
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
    {text: '["10.000", "50"]'},
    {text: '["$", "€"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird das hier finden?
    ```js
        '$100 and €50'.match(/\d+(?=[\$€])/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dieser Muster findet nichts, weil der Look-ahead falsch herum ist! Wenn Sie Ziffern haben, die von `$` oder `€` vorangegangen werden, verwenden Sie einen Look-behind: `/(?<=[\$€])\d+/g`.

    Look-aheads prüfen, was *nach* der aktuellen Position kommt. Das hier gesuchte Muster:
    - Eine oder mehrere Ziffern (`\d+`)
    - Gefolgt von (`(?=...)`) entweder $ oder € (`[\$€]`)

    Da es keine Zahlen gibt, die von Währungszeichen gefolgt werden (die Zeichen stehen davor), gibt es keine Treffer.

    [Mehr über Look-ahead-Assertions erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
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
    Was wird übereinstimmen?
    ```js
        'cat cats category'.match(/\bcat\b/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das `\b` repräsentiert eine Wortgrenze, die übereinstimmt:
    - Zwischen einem Wortzeichen und einem Nicht-Wortzeichen
    - Am Anfang/Ende der Zeichenkette, wenn ein Wortzeichen vorhanden ist

    Also wird `/\bcat\b/` nur dann "cat" übereinstimmen, wenn es ein vollständiges Wort ist, nicht als Teil eines anderen Wortes.
    - ✅ "cat" (durch Leerzeichen umgeben)
    - ❌ "cats" (keine Grenze nach "cat")
    - ❌ "category" (keine Grenze nach "cat")

    [Mehr über Wortgrenzen erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#other_assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Häufige Fallstricke"
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
    Das `g` (global) Flag ändert das Verhalten von `match()`:
    - Ohne `g`: Gibt den ersten Match mit Capture Groups zurück
    - Mit `g`: Gibt ein Array aller übereinstimmenden Strings zurück

    In diesem Fall werden alle Vorkommen von "a" in "banana" gefunden.

    Hinweis: Wenn Sie sowohl alle Matches als auch Capture Groups benötigen, verwenden Sie `matchAll()` oder die `exec()`-Methode in einer Schleife.

    [Mehr über das globale Flag erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Rückblick"
  title="Negativer Rückblick"
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
    Der negative Rückblick `(?<!abc)` stellt sicher, dass die Ziffern nicht von "abc" gefolgt werden:
    - ❌ "123" (von "abc" gefolgt)
    - ✅ "23" (von "abc1" gefolgt)
    - ✅ "456" (von "def" gefolgt)

    Moderne JavaScript-Engines unterstützen Rückblick-Assertions. Dieses Beispiel verwendet einen Rückblick mit fester Länge: `abc` besteht immer aus drei Zeichen. Rückblick mit variabler Länge ist die schwierigere, engine-spezifische Ausnahme.

    Hinweis: Rückblick-Unterstützung ist in JavaScript relativ neu. Prüfen Sie [Browserverträglichkeit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#browser_compatibility), wenn Sie ältere Browser unterstützen müssen.
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
    Was wird dies zurückgeben?
    ```js
        '2029-12-31'.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Muster verwendet drei erfassende Gruppen:
    1. `(\d{4})` erfasst das Jahr
    2. `(\d{2})` erfasst den Monat
    3. `(\d{2})` erfasst den Tag

    `match()` ohne den `g`-Flag gibt zurück:
    - Index 0: Vollständige Übereinstimmung
    - Index 1+: Erfassungsgruppen

    `slice(1)` ist ein gängiger Trick, um nur die Erfassungsgruppen zu erhalten.

    [Mehr über Gruppen und Erfassung erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Look-ahead"
  title="Negative Look-ahead"
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
    Welches Ergebnis wird erzielt?
    ```js
        "123aBc".match(/^\d+(?![a-z])/ig)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der negative Look-ahead `(?![a-z])` stellt sicher, dass nach den Ziffern keine Kleinbuchstaben folgen. Da der Teil "3aBc" einen Kleinbuchstaben nach den Ziffern hat, passt dieser Teil nicht. Nur der Anfang "12" passt.

    [Mehr über negative Look-ahead erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Look-behind"
  title="Aufteilung mit Look-behind"
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
    Der Muster `/(?<=,)/` ist ein Look-behind, der nach einem Komma passt:
    - `a,` (nach Komma)
    - `b,` (nach Komma)
    - `c` (kein Komma danach)

    Der Look-behind konsumiert das Komma nicht, daher bleibt das Komma am vorherigen Segment im Aufteilungsergebnis haften.

    Dies ist nützlich, wenn Sie eine Zeichenkette anhand dessen aufteilen möchten, was davor kommt, **ohne die Trennzeichen zu verlieren**.

    [Mehr über Look-behind-Assertions erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Häufige Fallstricke"
  title="Sonderzeichen escapen"
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
    Was wird gefunden?
    ```js
        '$100'.match(/$\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Sonderzeichen müssen mit `\` escaped werden, um wörtlich abzugleichen:
    - `$` ist ein Sonderzeichen (Ende der Zeichenkette)
    - Um ein wörtliches Dollarzeichen zu matchen, escapen Sie es: `\$`

    Häufige Zeichen, die escaped werden müssen:
    ```js
        . * + ? ^ $ [ ] \ ( ) { } |
    ```
    Ohne Escaping haben viele Sonderzeichen Regex-Bedeutungen, die nicht unbedingt Ihre Absicht widerspiegeln.

    [Mehr über das Escapen von Sonderzeichen erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
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
    Was wird erkannt?
    ```js
        '$100'.match(/(?<=\$)\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der positive Look-behind `(?<=$)` stellt sicher, dass die Ziffern durch ein Dollarzeichen gefolgt werden:
    - `(?<=$)`: Look-behind für Dollarzeichen
    - `\d+`: Eines oder mehrere Ziffern

    Look-behind-Assertions verbrauchen keine Zeichen; sie prüfen nur, was davor steht.
    Das ist nützlich, wenn man etwas anhand dessen, was davor steht, ohne den vorhergehenden Teil einzubeziehen, matchen möchte.

    [Mehr über Look-behind Assertions erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Grundlegende Übereinstimmung"
  title="Träge vs. gierige Quantoren"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird erfasst?
    ```js
        '<b>bold</b>'.match(/<b>(.*?)<\/b>/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Muster verwendet träge Übereinstimmung mit `*?`:
    - `<b>`: Öffnendes Tag erfassen
    - `(.*?)`: Beliebige Zeichen erfassen (träge)
    - `</b>`: Schließendes Tag erfassen

    Das `?` hinter `*` macht es träge, d. h. es passt so wenige Zeichen wie möglich.
    Ohne `?` wäre es gierig und würde so viel wie möglich erfassen.

    `slice(1)` gibt nur die erfasste Gruppe zurück.

    [Mehr über gierige vs. träge Übereinstimmung erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Grundlegende Übereinstimmung"
  title="Unicode-Flag"
  options={[
    {text: '["🙂"]'},
    {text: '["😀", "🙂"]', isAnswer: true},
    {text: 'null'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was passt?
    ```js
        '😀 🙂'.match(/\p{Emoji}/gu)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das `u`-Flag ermöglicht:
    - Unicode-Eigenschaftsescapes (`\p{...}`)
    - Korrekte Verarbeitung von Surrogatpaaren

    Ohne `u` werden Emojis und andere Unicode-Zeichen möglicherweise nicht korrekt erkannt.
    Der Muster `\p{Emoji}` passt zu Zeichen mit der Unicode-Eigenschaft `Emoji`. In diesem String bedeutet das die beiden Emoji-Piktogramme.

    Hinweis: Unicode-Eigenschaftsescapes benötigen das `u`-Flag.

    [Weitere Informationen zu Unicode-Modus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Blick in die Hölle"
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
    Tut uns leid im Voraus! 😈<br />
    Welches Passwort entspricht diesem Muster?
    ```js
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Schreiben Sie nichts Derartiges in der Produktion! 😅

    Dieses Muster verwendet mehrere positive Vorausschau-Assertions, um sicherzustellen:
    - Mindestens ein Großbuchstabe: `(?=.*[A-Z])`
    - Mindestens ein Kleinbuchstabe: `(?=.*[a-z])`
    - Mindestens eine Ziffer: `(?=.*\d)`
    - Mindestens ein Sonderzeichen: `(?=.*[!@#$%^&*])`
    - Mindestens 8 Zeichen: `.{8,}`

    Vorausschau-Assertions sind perfekt für Passwortvalidierung, da sie mehrere Kriterien überprüfen können, ohne Zeichen zu verbrauchen.

    [Mehr über Passwortvalidierungs-Muster erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

</QuizUI>

<h2>Wie hast du dich geschlagen? 🧐</h2>

Reguläre Ausdrücke können ein Biest sein, das man zähmen muss, aber sie sind unglaublich mächtig, sobald du den Dreh raus hast (und all die neuen Syntaxvarianten). Übe weiter, und schon bald wirst du Meister der RegEx sein! 🧙‍♂️

<p class="inset">Auf eine Pause nach all dem RegEx-Lernen?<br />Pftt, merk dir: Pause *nach* Fähigkeiten!<br /><br />Besuche [mein Fitnessstudio](/challenges/), um weitere Herausforderungen zu meistern! 💪</p>
````
