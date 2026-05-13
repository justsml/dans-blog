# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/de/index.mdx
- Validation: passed
- Runtime seconds: 44.27
- Input tokens: 13341
- Output tokens: 8755
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.002096
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: 14 JavaScript‑Date‑Fragen'
subTitle: 'Lerne, bei Partys mit JS‑Trivia zu beeindrucken! ✨'
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

## Wie gut kennen Sie die `Date`‑Klasse?

> * **Beweisen Sie Ihre JavaScript‑Skills!** 🚀  
> * Kein Login oder Registrierung nötig. ✨  
> * Multiple‑Choice. 🤖 … _Wie schwer kann das schon sein, oder?_

### Überblick

Die `Date`‑Klasse in JavaScript hat ein berüchtigt umständliches API. Sie stammt aus Java und ich vermute, dass sie von uralten neolithischen Zeitmessmethoden inspiriert wurde.

Der Frust beim Umgang mit `Date` führt viele Entwickler dazu, ohne zu überlegen Bibliotheken von Drittanbietern zu verwenden. Obwohl das oft eine sichere und zuverlässige Wahl ist, werden diese Bibliotheken selten für reine Datumsformatierung oder Lokalisierung benötigt!

Dieses Quiz prüft (und vertieft) Ihr Wissen über das native `Date`‑API. Nutzen Sie die grünen Buttons für Hinweise & Erklärungen! Hoffentlich haben Sie am Ende der Aufgabe ein gefestigtes Verständnis von `Date` in JavaScript.

#### **HINWEIS:** Alle Beispiele gehen von der lokalen Zeitzone GMT‑7 aus.


### 👇 14 Fragen unten 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Umgang mit Daten"
  title="Date‑Konstruktor Teil 1"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    const d1 = new Date(2020, 1, 1)
    console.log(d1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Monats‑Argument ist nullbasiert. Es hat einen Wertebereich von 0‑11 (bei westlichen Kalendern).

    'February' hat den Indexwert eins. (Stell dir das wie einen Array‑Lookup vor.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Datumsverarbeitung"
  title="Date-Konstruktor Teil 2"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    const d2 = new Date(2020, 0, 1)
    console.log(d2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das Monatsargument ist nullbasiert. Es hat einen Wertebereich von 0‑11 (bei westlichen Kalendern.)

    'Januar' hat den Indexwert null. (Stell dir das wie einen Array‑Lookup vor.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Datumsverarbeitung"
  title="Date-Konstruktor Teil 3"
  options={[
    {text: '01 Jan 1970'},
    {text: 'Unix-Epoch von 0'},
    {text: 'Aktuelles Datum, in UTC/GMT'},
    {text: 'Aktuelles Datum', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: Ungültiges Argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    const d3 = Date('Thu, 01 Jan 1970 00:00:00 GMT')
    console.log(d3)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Vergiss nicht das Schlüsselwort `new`! `Date` ist eine Klasse und sollte mit `new` aufgerufen werden.

    `Date('...')` ohne `new` ignoriert das, was du übergibst. Es scheint immer das aktuelle Datum & Uhrzeit zu erzeugen, wenn du `new Date()` (ohne Argumente) benutzt.

    Das ist ein **häufiges Stolperstück**, das **leicht übersehen werden kann**, selbst bei Code‑Reviews.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Umgang mit Daten"
  title="Date-Konstruktor Teil 4"
  options={[
    {text: '1969', isAnswer: true},
    {text: '1970'},
    {text: '2019'},
    {text: '2020'},
    {text: '2021'},
    {text: 'RangeError: Ungültiges Argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    const date = new Date(2020)
    console.log(date.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Eine mit einem einzelnen Ganzzahl‑Argument erstellte Date‑Instanz wird als Unix `Epoch`‑Wert interpretiert. `Epoch` ist die Anzahl der Millisekunden seit dem 1. Januar 1970.

    Ein Wert von `2020` (Millisekunden) entspricht 2 Sekunden nach dem 1. Januar 1970.

    Da unsere lokale Zeitzone einen negativen Offset von ‑7 Stunden hat, erhalten wir `Wed Dec 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)`.

    Du kannst den lokalen Zeitzonen‑Offset umgehen, indem du [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) nutzt.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Datumsverarbeitung"
  title="Datumszeichenfolgen-Parsing"
  options={[
    {text: '2019 2020', isAnswer: true},
    {text: '2020 2021'},
    {text: '2020 2020'},
    {text: '2020 2019'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher Wert wird in der Konsole ausgegeben?
    ```js
    const d1 = new Date('2020-01-01')
    const d2 = new Date('2020-01-01T00:00')
    console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der String ohne einen `T`‑Zeitwert könnte wie der 1. Jan 2020 aussehen – aber datums‑nur‑Strings werden als UTC interpretiert, und wenn sie in unsere lokale Zeitzone (GMT‑7) umgerechnet werden, liegen wir noch im Jahr 2019.

    Datums‑Zeit‑Strings ohne explizite Zeitzone werden in lokaler Zeit interpretiert.

    Die `T00:00`‑Form bewirkt, dass der zweite Wert als lokaler Mitternacht interpretiert wird.

    Das erste Datum wird interpretiert als `Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)`.
    Das zweite Datum wird interpretiert als `Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Datumsverarbeitung"
  title="Formatierung Teil 1"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wähle eine _inkorrekte_ Formatierungsmethode:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Methode `toLocaleFormat()` ist nicht standardisiert! Sie könnte bekannt wirken, weil sie aus einer uralten Drittanbieter‑Bibliothek stammt.

    Sieh dir die [`toLocaleDateString`‑Dokumentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) Methode an. Ihr Verhalten ist unter [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) dokumentiert.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Datumsverarbeitung"
  title="UTC-Daten Teil 1"
  options={[
    {text: 'Wed, 01 Jan 2020 00:00:00 GMT'},
    {text: 'Thu, 02 Jan 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    var date = Date.UTC('2020-01-02T00:00')
    console.log(date.toUTCString())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Du bekommst `TypeError: date.toUTCString is not a function`, weil [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) einen Integer in Millisekunden zurückgibt, nicht eine Date‑Instanz.

    {/* Die [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)‑Methode verwendet deinen lokalen Offset (für diese Fragen gehen wir von GMT‑07:00 aus.)
    Das bedeutet, sie liefert das Vorjahr (Silvester -7 Stunden).
    Die [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear)‑Methode gibt das Jahr zurück, das wir `Date.UTC()` übergeben haben, also 2020.
    */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Datumsverarbeitung"
  title="UTC-Daten Teil 2"
  options={[
    {text: 'Eine UTC-basierte Datumsinstanz'},
    {text: 'Eine Datumsinstanz, die an die lokale Zeitzone angepasst ist'},
    {text: 'Millisekunden seit dem 1. Januar 1970 GMT', isAnswer: true},
    {text: 'Ein Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    const d = Date.UTC(2020, 0, 1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Hilfsmethode [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) gibt keine Datumsinstanz zurück. Sie liefert einen Ganzzahlwert in Millisekunden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Datumsverarbeitung"
  title="UTC-Daten Teil 3"
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
    Was wird die Ausgabe enthalten?
    ```js
    // Assume local TZ is -07:00
    const d = new Date(Date.UTC(2020, 0, 1))
    console.log(d.getTimezoneOffset())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dates werden implizit in lokaler Zeit dargestellt, mit einem (praktisch) unveränderten [.getTimezoneOffset()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset).

    `Date`-Instanzen speichern keine Zeitzonendaten. Sie speichern die Anzahl Millisekunden seit dem Unix‑Epoch (1. Jan 1970). Die Zeitzone wird beim Parsen und Rendern von Datums‑Strings berücksichtigt. Das Standard‑Anzeigeverhalten wird automatisch anhand der System‑ oder Browsereinstellungen für das Locale bestimmt.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Datumsverarbeitung"
  title="Datums-Setter Teil 1"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Ungültiges Argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    const d = new Date(2020, 0, 1)
    d.setDate(1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)‑Methode setzt den Tag des Monats, basierend auf dem aktuellen Monat der jeweiligen Instanz.

    Wenn ein Wert außerhalb der verfügbaren Tage angegeben wird, wird der Monatswert der Datumsinstanz angepasst (z. B. berechnet `setDate(32)` im Januar den 1. Februar.)

    <aside class="hint">`setDate` setzt den Tag des Monats, typischerweise im Bereich 1‑31.</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Datumsverarbeitung"
  title="Datums-Setter Teil 2"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Ungültiges Argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) Methode setzt den Monat der angegebenen Date‑Instanz.

    Der Monats‑Parameter ist nullbasiert und liegt im Bereich 0‑11 (nach westlichen Kalendern.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Datumsverarbeitung"
  title="Datums-Setter Teil 3"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Jan 01 2021', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Ungültiges Argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(12)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) Methode setzt den Monat des angegebenen Datumsobjekts.

    Das Argument `month` ist nullbasiert und hat 12 Werte im Bereich 0‑11 (nach westlichen Kalendern).

    Hier wird das Jahr auf 2021 angepasst, weil `setMonth(12)` um 1 größer ist als 11 (Dezember).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Datumsverarbeitung"
  title="Datums-Setter Teil 4"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2021'},
    {text: 'Feb 01 2021', isAnswer: true},
    {text: 'RangeError: Ungültiges Argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(13)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die [.setMonth()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) Methode setzt den Monat der angegebenen Date‑Instanz.

    Der Monats‑Parameter ist nullbasiert und hat den Wertebereich 0‑11 (nach westlichen Kalendern).

    Hier wird Monat und Jahr auf Februar 2021 angepasst, weil `setMonth(13)` um 2 größer ist als 11 (Dezember).

    <aside class="hint">`setMonth` setzt den Monat per Index, die 12 Monate werden von 0‑11 indiziert. </aside>
    <aside class="hint">
    Zahlen außerhalb des Bereichs 0‑11 führen zu einem Über‑ oder Unterlauf des Jahres. Zum Beispiel wird `setMonth(13)` das Jahr auf 2021 anpassen (im Februar, weil 13 um 2 größer ist als 11).
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Datumsverarbeitung"
  title="Datums-Setter Teil 5"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2019'},
    {text: 'Dec 01 2019', isAnswer: true},
    {text: 'RangeError: Ungültiges Argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird die Ausgabe enthalten?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(-1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)‑Methode setzt den Monat des angegebenen Date‑Objekts.

    Der Monats‑Parameter ist nullbasiert und liegt im Bereich 0‑11 (nach westlichen Kalendern).

    Hier sehen wir, dass Monat und Jahr auf Dezember 2019 zurückspringen, weil `setMonth(-1)` kleiner als 0 (Januar) ist.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
