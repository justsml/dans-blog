# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/de/index.mdx
- Validation: passed
- Runtime seconds: 40.92
- Input tokens: 12308
- Output tokens: 14696
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004512
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: ''
subTitle: ''
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

## Wie gut kennen Sie die `Date`-Klasse?

> * **Beweisen Sie Ihre JavaScript-Kenntnisse!** 🚀  
> * Keine Anmeldung erforderlich. ✨  
> * Multiple Choice. 🤖 ... _Wie schwer kann das schon sein, oder?_

### Gliederung

Die `Date`-Klasse in JavaScript hat eine besonders schwierige API. Sie wurde von Java übernommen, und ich kann nur annehmen, dass sie von alten, neolithischen Zeitmessmethoden inspiriert war.

Die Herausforderungen mit `Date` führen viele Entwickler dazu, ohne Zögern auf Bibliotheken von Drittanbietern zurückzugreifen. Während dies oft eine sichere und verlässliche Wahl ist, werden solche Bibliotheken selten benötigt, um Datumsformate oder Lokalisierung zu handhaben!

Dieser Quiz soll Ihr Wissen über die native `Date`-API testen (und vertiefen). Nutzen Sie die grünen Buttons für Hinweise & Erklärungen! Hoffentlich haben Sie am Ende der Herausforderung Ihr Verständnis der `Date`-Klasse in JavaScript gefestigt.

#### **HINWEIS:** Alle Beispiele gehen von der Zeitzone GMT-7 aus.

### 👇 14 Fragen unten 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Datumsverwaltung"
  title="Datumskonstruktor Teil 1"
  options={[
    {text: '1. Januar 2020'},
    {text: '1. Februar 2020', isAnswer: true},
    {text: 'RangeError: Ungültiges Argument.'},
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
    Der Monatsparameter ist nullbasiert. Mit einem Bereich von 0-11 (bei westlichen Kalendern).

    Der 'Februar' hat den Indexwert 1. (Denke daran, wie bei einem Array-Zugriff.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Umgang mit Datumsangaben"
  title="Datumskonstruktor Teil 2"
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
    const d2 = new Date(2020, 0, 1)
    console.log(d2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Monatsparameter ist nullbasiert. Mit einem Bereich von 0-11 (bei westlichen Kalendern.)

    'Januar' hat den Indexwert 0. (Denke daran wie eine Array-Suche.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Umgang mit Datumsangaben"
  title="Datumskonstruktor Teil 3"
  options={[
    {text: '01 Jan 1970'},
    {text: 'Unix-Epoche von 0'},
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
    Vergiss nicht, das Schlüsselwort `new` zu verwenden! `Date` ist eine Klasse und sollte mit `new` aufgerufen werden.

    `Date('...')` ohne `new` ignoriert, was du übermittelst. Es scheint immer das aktuelle Datum und die Uhrzeit mit `new Date()` (keine Argumente) zu erzeugen.

    Dies ist ein **häufiges Problem**, das **leicht übersehen wird**, selbst bei Code-Reviews.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Umgang mit Datumsangaben"
  title="Datumskonstruktor Teil 4"
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
    Welche Ausgabe wird enthalten sein?
    ```js
    const date = new Date(2020)
    console.log(date.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ein `Date`-Objekt, das mit einem einzelnen ganzzahligen Argument erstellt wird, wird als Unix `Epoch`-Wert interpretiert. `Epoch` ist eine Zählung der Millisekunden seit dem 1. Januar 1970.

    Ein Wert von `2020` (Millisekunden) entspricht 2 Sekunden nach dem 1. Januar 1970.

    Da unsere lokale Zeitzone einen negativen Offset von -7 Stunden hat, erhalten wir `Wed Dec 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)`.

    Um den lokalen Zeitzone-Offset zu umgehen, kann man [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) verwenden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Datumsverwaltung"
  title="Datumszeichenkettenanalyse"
  options={[
    {text: '2019 2020', isAnswer: true},
    {text: '2020 2021'},
    {text: '2020 2020'},
    {text: '2020 2019'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher Wert wird in die Konsole gedruckt?
    ```js
    const d1 = new Date('2020-01-01')
    const d2 = new Date('2020-01-01T00:00')
    console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Zeichenkettenwert ohne `T`-Zeitangabe könnte auf den ersten Blick als 1. Januar 2020 interpretiert werden – Datumszeichenketten ohne Uhrzeit werden jedoch als UTC interpretiert. Bei Anpassung an unsere lokale Zeitzone (GMT-7) stellen wir fest, dass wir immer noch im Jahr 2019 sind.

    Datumszeitzeichenketten ohne explizite Zeitzone werden in lokaler Zeit interpretiert.

    Die `T00:00`-Form führt dazu, dass der zweite Wert als lokale Mitternacht interpretiert wird.

    Der erste Datumsstring wird als `Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)` interpretiert.
    Der zweite Datumsstring wird als `Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)` interpretiert.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Datumsverwaltung"
  title="Formatierung Teil 1"
  options={[
    {text: 'new Intl.DateTimeFormat(\', hint: 'Korrekt: Verwendet Intl-API für Lokalisierung.'},
    {text: 'date.toLocaleFormat(\', isAnswer: true, hint: 'Falsch: Nicht standardisiert! Bekannt aus alten Bibliotheken.'},
    {text: 'date.toLocaleString(\', hint: 'Korrekt: Standardmethode für lokale Zeichenketten.'},
    {text: 'date.toLocaleDateString(\', hint: 'Korrekt: Standardmethode für datumsbasierte Formatierung.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wähle eine _falsche_ Formatiermethode aus:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Methode `toLocaleFormat()` ist nicht standardisiert! Sie erinnert an eine alte 3rd-party-Bibliothek.

    Schau dir die [`toLocaleDateString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)-Dokumentation an. Ihr Verhalten ist unter [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) dokumentiert.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Datumsverwaltung"
  title="UTC-Datumsangaben Teil 1"
  options={[
    {text: 'Mi, 01. Jan 2020 00:00:00 GMT'},
    {text: 'Do, 02. Jan 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche Ausgabe wird enthalten sein?
    ```js
    var date = Date.UTC('2020-01-02T00:00')
    console.log(date.toUTCString())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Es wird `TypeError: date.toUTCString ist keine Funktion` auftreten, da [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) eine ganze Zahl in Millisekunden zurückgibt, nicht eine Datumsinstanz.

    {/* Die [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) Methode verwendet Ihren lokalen Offset (angenommen GMT-07:00 für diese Fragen).
    Das bedeutet, sie gibt das vorherige Jahr zurück (Silvester -7 Stunden).
    Die [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) Methode gibt das Jahr zurück, das wir Date.UTC() übergeben haben, 2020.
    */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Datumsverwaltung"
  title="UTC-Datumsangabe Teil 2"
  options={[
    {text: 'Ein UTC-basiertes Datumsobjekt'},
    {text: 'Ein für die lokale Zeitzone angepasstes Datumsobjekt'},
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
    Die Hilfsmethode [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) gibt kein Datumsobjekt zurück. Sie gibt eine ganze Zahl in Millisekunden zurück.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Umgang mit Datumsangaben"
  title="UTC-Datums Part 3"
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
    Datumsangaben werden implizit in lokaler Zeit angezeigt, wobei der [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) (effektiv) konstant bleibt.

    `Date`-Instanzen speichern keine Zeitzone-Daten. Sie speichern die Anzahl der Millisekunden seit dem Unix-Äon (1. Januar 1970). Die Zeitzone wird bei der Datumszeichenkette-Parsing und -Darstellung berücksichtigt. Das Standard-Anzeige-Verhalten wird automatisch basierend auf den System- oder Browser-Lokalisierungseinstellungen bestimmt.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Datumsverwaltung"
  title="Datum-Setter Teil 1"
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
    const d = new Date(2020, 0, 1)
    d.setDate(1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)-Methode setzt den Tag des Monats basierend auf dem aktuellen Monat der Instanz.

    Wenn ein Wert außerhalb der verfügbaren Tage angegeben wird, wird der Monatswert der Datumsinstanz angepasst (z. B. ergibt `setDate(32)` im Januar den 1. Februar).

    <aside class="hint">`setDate` setzt den Tag des Monats, typischerweise im Bereich 1-31.</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Umgang mit Datumsangaben"
  title="Datum-Setter Teil 2"
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
    Die Methode [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) setzt den Monat der gegebenen Datumsinstanz.

    Der Monatsparameter ist nullbasiert, mit einem Bereich von 0-11 (bei Verwendung von westlichen Kalendern.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Datumsverwaltung"
  title="Datums-Setter Teil 3"
  options={[
    {text: 'Januar 01 2020'},
    {text: 'Januar 01 2021', isAnswer: true},
    {text: 'Februar 01 2020'},
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
    Die Methode [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) setzt den Monat der gegebenen Datumsinstanz.

    Der `Monatsparameter` ist nullbasiert und hat 12 Werte im Bereich 0–11 (bei der Verwendung westlicher Kalender).

    Hier sehen wir, dass das Jahr auf 2021 angepasst wird, weil `setMonth(12)` um 1 größer als 11 (Dezember) ist.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Datumsverwaltung"
  title="Datums-Setter Teil 4"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2021'},
    {text: 'Feb 01 2021', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche Ausgabe wird angezeigt?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(13)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Methode [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) setzt den Monat der gegebenen Datumsinstanz.

    Der Monat-Parameter ist nullbasiert, mit einem Bereich von 0-11 (bei der Verwendung westlicher Kalender).

    Hier wird der Monat und das Jahr auf Februar 2021 angepasst, da `setMonth(13)` um 2 größer ist als 11 (Dezember).

    <aside class="hint">`setMonth` setzt den Monat über den Index, 12 Monate sind von 0-11 indiziert.</aside>
    <aside class="hint">
    Zahlen außerhalb des Bereichs 0-11 führen dazu, dass das Jahr über- oder unterläuft. Zum Beispiel wird `setMonth(13)` das Jahr auf 2021 anpassen (im Februar, da 13 um 2 größer ist als 11).
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Datumsverwaltung"
  title="Datums-Setter Teil 5"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2019'},
    {text: 'Dec 01 2019', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
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
    Die Methode [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) setzt den Monat der gegebenen Datumsinstanz.

    Der Monatsparameter ist nullbasiert, mit einem Bereich von 0-11 (bei westlichen Kalendern). Hier sehen wir, dass Monat und Jahr auf Dezember 2019 zurücklaufen, weil `setMonth(-1)` kleiner als 0 (Januar) ist.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
