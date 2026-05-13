# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/de/index.mdx
- Validation: passed
- Runtime seconds: 14.11
- Input tokens: 8491
- Output tokens: 5148
- Thinking tokens: unknown
- Cached input tokens: 256
- Cache write tokens: 0
- Estimated cost: $0.001258
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Quiz: 9 JavaScript‑Promise‑Fragen'
subTitle: Versprechen nie wieder fallen lassen!
label: Promise Gotchas
date: '2019-11-26'
modified: '2024-11-28'
tags:
  - promises
  - programming
  - async
  - javascript
  - guides
  - quiz
  - intermediate
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
category: Quiz
unlisted: false
subCategory: JavaScript
cover: ../olav-ahrens-rotne-jvBXiynINGE-resized.webp
cover_mobile: ../w300_olav-ahrens-rotne-jvBXiynINGE-resized.webp
cover_icon: ../icon_olav-ahrens-rotne-jvBXiynINGE-resized.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Kennst du JavaScript‑Promises?

> * **Beweise deine JavaScript‑Skills!** 🚀

1. **Hinweise prüfen** (großer Button, untere Ecke).
2. Probiere den Code in der Browser‑Konsole aus (Tastenkürzel `F12` oder Suche) oder nutze [repl.it](https://repl.it)*.
3. Gerne kannst du mir auf [Twitter @justsml](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/) schreiben. **Ich freue mich auf dein Feedback!**

### 👇 Löse die 9 Fragen unten 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Fehlerbehandlung"
  title="Mehrere `.catch`-Aufrufe #1"
  options={[
    {text: 'Nachricht einmal ausgeben'},
    {text: 'Nachricht zweimal ausgeben', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'Prozess beendet sich'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die Ausgabe des folgenden Codes?
    ```js
    var p = new Promise((resolve, reject) => {
      reject(Error('The Fails!'))
    })
    p.catch(error => console.log(error.message))
    p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Wir erstellen ein Promise mit der Konstruktor‑Methode und lösen sofort einen Fehler über den `reject`‑Callback aus.

    Dann funktionieren die `.catch`‑Handler ähnlich wie `.addEventListener(event, callback)` im DOM oder `.on(event, callback)` beim Event Emitter, wobei **mehrere Handler‑Callbacks hinzugefügt werden können**. Jeder wird mit denselben Argumenten aufgerufen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Fehler behandeln"
  title="Mehrere `.catch`'s #2"
  options={[
    {text: 'Nachricht einmal ausgeben'},
    {text: 'Nachricht zweimal ausgeben'},
    {text: 'unbehandelte abgelehnte Promise', isAnswer: true},
    {text: 'Prozess beendet sich'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die Ausgabe für den folgenden Code?
    ```js
    var p = new Promise((resolve, reject) => {
      return Promise.reject(Error('The Fails!'))
    })
    p.catch(error => console.log(error.message))
    p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Wenn du den Promise‑Konstruktor verwendest, musst du entweder die `resolve()`‑ oder die `reject()`‑Callbacks aufrufen. Der Promise‑Konstruktor ignoriert den Rückgabewert des Executors, sodass die zusätzlich mit `Promise.reject()` erstellte Promise nicht an `p` angehängt wird. Die beiden Handler werden an `p` angehängt, das im Pending‑Zustand bleibt, während die zurückgegebene abgelehnte Promise vom Host‑Umfeld als unbehandelt gemeldet wird.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="Fehlerbehandlung"
  title="Verkettung von `.then` und `.catch`"
  options={[
    {text: 'gibt Fehler und `undefined` aus', isAnswer: true},
    {text: 'gibt Fehler zweimal aus'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die Ausgabe des folgenden Codes?
    ```js
    var p = new Promise((resolve, reject) => {
      reject(Error('The Fails!'))
    })
    .catch(error => console.log(error))
    .then(error => console.log(error))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Beim Verketten von `.then`- und `.catch`-Aufrufen ist es hilfreich, sie als Reihe von Schritten zu betrachten. Jeder `.then` erhält den von dem vorherigen `.then` zurückgegebenen Wert (als Argument). Wenn jedoch dein „Schritt“ einen Fehler verursacht, werden alle nachfolgenden `.then`‑„Schritte“ übersprungen, bis ein `.catch` gefunden wird. Möchtest du einen Fehler überschreiben, musst du einfach einen Nicht‑Fehler‑Wert zurückgeben. Dieser kann dann in jedem nachfolgenden `.then` verwendet werden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="Fehlerbehandlung"
  title="Verkettung von `.catch`s"
  options={[
    {text: 'Fehlermeldung einmal ausgeben', isAnswer: true},
    {text: 'Fehlermeldung zweimal ausgeben'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'Prozess beendet sich'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die Ausgabe für den folgenden Code?
    ```js
    var p = new Promise((resolve, reject) => {
      reject(Error('The Fails!'))
    })
    .catch(error => console.log(error.message))
    .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Beim Verketten von `.catch`s behandelt jeder nur Fehler, die in vorherigen `.then`‑ oder `.catch`‑„Schritten“ geworfen wurden. In diesem Beispiel gibt der erste `.catch` das `console.log` zurück, das nur über ein nach beiden `.catch`s hinzugefügtes `.then()` zugänglich ist.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Fehlerbehandlung"
  title="Mehrere `.catch`s"
  options={[
    {text: 'Nachricht einmal ausgeben'},
    {text: 'Nachricht zweimal ausgeben'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'nichts wird ausgegeben', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die Ausgabe des folgenden Codes?
    ```js
    new Promise((resolve, reject) => {
        resolve('Success!')
      })
      .then(() => {
        throw Error('Oh noes!')
      })
      .catch(error => {
        return "actually, that worked"
      })
      .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Hinweis:** `.catch`s können verwendet werden, um Fehler zu ignorieren (oder zu überschreiben), indem einfach ein regulärer Wert zurückgegeben wird.

    Dieser Trick funktioniert nur, wenn ein nachfolgendes `.then` den Wert empfängt.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Daten verarbeiten"
  title="Ablauf zwischen `.then`s"
  options={[
    {text: 'gibt "Success!" und "SUCCESS!" aus'},
    {text: 'gibt "Success!" aus'},
    {text: 'gibt "SUCCESS!" aus', isAnswer: true},
    {text: 'nichts wird ausgegeben'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die Ausgabe für den folgenden Code?
    ```js
    Promise.resolve('Success!')
      .then(data => {
        return data.toUpperCase()
      })
      .then(data => {
        console.log(data)
      })
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Hinweis:** `.then`s geben Daten sequenziell weiter, vom `return value` zum nächsten `.then(value => /* handle value */)`.

    Ein `return` ist entscheidend, um einen Wert an den nächsten `.then` zu übergeben.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Daten verarbeiten"
  title="Ablauf zwischen `.then`'s"
  options={[
    {text: 'gib "SUCCESS!" aus'},
    {text: 'gib "Success!" aus'},
    {text: 'gib "SUCCESS!" und "SUCCESS!" aus', isAnswer: true},
    {text: 'es wird nichts ausgegeben'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die Ausgabe des folgenden Codes?
    ```js
    Promise.resolve('Success!')
      .then(data => {
        return data.toUpperCase()
      })
      .then(data => {
        console.log(data)
        return data
      })
      .then(console.log)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Es gibt 2 `console.log`‑Aufrufe, die ausgeführt werden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Daten verarbeiten"
  title="Ablauf zwischen `.then`-Aufrufen"
  options={[
    {text: 'gib "SUCCESS!" aus'},
    {text: 'gib "Success!" aus'},
    {text: 'gib "SUCCESS!" und "SUCCESS!" aus'},
    {text: 'gibt `undefined` aus', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die Ausgabe für den folgenden Code?
    ```js
    Promise.resolve('Success!')
      .then(data => {
        data.toUpperCase()
      })
      .then(data => {
        console.log(data)
      })
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Hinweis:** `.then`-Aufrufe geben Daten sequenziell weiter, von `return value` zum nächsten `.then(value => /* handle value */)`.

    Ein `return` ist entscheidend, um einen Wert an den nächsten `.then` zu übergeben.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Daten verarbeiten"
  title="Ablauf zwischen `.then`- und `.catch`-Blöcken"
  options={[
    {text: 'gib "Oh noes!" und "The fails!" aus'},
    {text: 'gib "Oh noes!" aus'},
    {text: 'gib "The fails!" aus', isAnswer: true},
    {text: 'gib "actually, that worked" aus'},
    {text: 'es wird nichts ausgegeben'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die Ausgabe des folgenden Codes?
    ```js
    Promise.resolve('Success!')
      .then(() => {
        throw Error('Oh noes!')
      })
      .catch(error => {
        return 'actually, that worked'
      })
      .then(data => {
        throw Error('The fails!')
      })
      .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ![annotated-code/question-9-4.webp](annotated-code/question-9-4.webp)
  </div>
  </slot>
</Challenge>

</QuizUI>
````
