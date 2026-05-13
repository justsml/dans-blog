# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 79.43
- Input tokens: 11751
- Output tokens: 11019
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003585
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/de/index.mdx reports/i18n/quiz-advanced-js-error-mastery/de
## Raw Output

````mdx
---
title: 'Quiz: Fortgeschrittene JS-Fehlerbeherrschung'
subTitle: ''
label: Errors
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2025-11-03'
modified: '2025-11-04'
tags:
  - quiz
  - javascript
  - error-handling
  - debugging
  - advanced
cover_full_width: ../ahmed-slimene-c09hZthLq_s-unsplash-wide.webp
cover_mobile: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_icon: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@assl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ahmed
  Slimene</a> on <a
  href="https://unsplash.com/photos/a-tall-white-building-with-balconies-on-top-of-it-c09hZthLq_s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---
```jsx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


### Denken Sie, dass Sie JavaScript-Fehler bis ins Detail kennen?

* **Testen Sie Ihre Fehlerbehandlungsexpertise!** 💥
* Kein Login oder Registrierung erforderlich. ✨
* Multiple Choice. 🤖 ... _Diese sind keine herkömmlichen try-catch-Fragen!_
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Serialisierungs-Überraschungen"
  title="Das Rätsel des leeren Objekts"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was gibt `JSON.stringify(error)` zurück?
    ```js
        const error = new Error('Oops');
        console.log(JSON.stringify(error));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Error-Objekte haben nicht-enumerable Eigenschaften (`message`, `name`, `stack`), weshalb `JSON.stringify()` `{}` zurückgibt. Dies ist eine gängige Falle beim Senden von Fehlern in API-Antworten. Nutzen Sie `JSON.stringify(error, Object.getOwnPropertyNames(error))` oder erstellen Sie stattdessen ein einfaches Objekt.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Serialisierungsfallen"
  title="Konsolenausgabe vs. JSON"
  options={[
    {text: 'Beide zeigen das gleiche Ergebnis'},
    {text: 'console.log zeigt mehr Informationen', isAnswer: true},
    {text: 'JSON.stringify zeigt mehr Informationen'},
    {text: 'Beide zeigen leere Objekte'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist der Unterschied zwischen diesen beiden?
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` zeigt den Fehler mit seiner Nachricht und Stacktrace, da die Konsole spezielle Behandlung für Error-Objekte hat. `JSON.stringify(err)` gibt `'{}'` zurück, weil Fehler-Eigenschaften nicht aufzählbar sind. Dieser Unterschied verursacht vielen Entwicklern Kopfschmerzen, die APIs debuggen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Typprüfung-Tricks"
  title="instanceof-Erbung"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was sind die Ergebnisse dieser Prüfungen?
    ```js
        class CustomError extends Error {}
        const err = new CustomError('test');
    
        console.log(err instanceof CustomError);
        console.log(err instanceof Error);
        console.log(err instanceof Object);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Alle drei geben `true` zurück. `CustomError` erbt von `Error`, was von `Object` erbt. Der `instanceof`-Operator prüft die gesamte Prototypenkette, daher ist eine `CustomError`-Instanz auch eine Instanz von `Error` und `Object`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Typprüfungstricks"
  title="Querverweis-Frame instanceof"
  options={[
    {text: 'Immer wahr'},
    {text: 'Immer falsch'},
    {text: 'Kann in verschiedenen Frames falsch sein', isAnswer: true},
    {text: 'Wirft einen Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was passiert mit `instanceof Error` in verschiedenen Iframes?
    ```js
        // In iframe:
        const iframeError = new Error('test');
        // In parent window:
        console.log(iframeError instanceof Error);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `instanceof` kann `false` zurückgeben, weil jeder Kontext seine eigene `Error`-Konstruktor hat. Verwenden Sie `Object.prototype.toString.call(obj) === '[object Error]'` für zuverlässige Fehlererkennung über Kontexte hinweg.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Werfen von Nicht-Fehlern"
  title="Zeichenfolgen werfen"
  options={[
    {text: 'TypeError: Zeichenfolge ist keine Fehler'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'Erstellt automatisch ein Fehlerobjekt'},
    {text: 'Undefiniertes Verhalten'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was passiert, wenn Sie eine Zeichenfolge werfen?
    ```js
        try {
          throw "Oops!";
        } catch (e) {
          console.log(e instanceof Error);
          console.log(typeof e);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    JavaScript erlaubt das Werfen jedes Werts. Hier ist `e instanceof Error` `false` und `typeof e` ist `"string"`. Dies kann Fehlerbehandlungscode brechen, der davon ausgeht, dass alle gefangenen Ausnahmen Fehlerobjekte sind. Werfen Sie immer Fehlerinstanzen für besseres Debugging.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Benutzerdefinierte Fehler"
  title="Eigenschaft 'name' von Fehlern"
  options={[
    {text: '„Error“'},
    {text: '„CustomError“', isAnswer: true},
    {text: 'undefined'},
    {text: 'Hängt vom Browser ab'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welchen Wert hat `err.name`?
    ```js
        class CustomError extends Error {
          constructor(message) {
            super(message);
            this.name = this.constructor.name;
          }
        }
        const err = new CustomError('test');
        console.log(err.name);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `err.name` ist `"CustomError"`, weil `this.constructor.name` den Klassennamen zurückgibt. Das Setzen von `this.name = this.constructor.name` ist ein verbreiteter Muster, um sicherzustellen, dass benutzerdefinierte Fehlerklassen den richtigen Namen in Stack-Traces und Fehlermeldungen anzeigen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Benutzerdefinierte Fehler"
  title="Konstruktornamen-Falle"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist die Ausgabe, ohne `name` zu setzen?
    ```js
        class MyError extends Error {
          // No constructor or name setting
        }
        const err = new MyError('test');
        console.log(err.name);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ohne explizites Setzen von `this.name` erbt der Fehler die Standard-`name`-Eigenschaft von der `Error`-Klasse, die `"Error"` ist. Deshalb sollten benutzerdefinierte Fehlerklassen immer `this.name = this.constructor.name` in ihrem Konstruktor setzen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Fehlerursache"
  title="Moderne Error.cause"
  options={[
    {text: '"Originalfehler"', isAnswer: true},
    {text: 'undefined'},
    {text: 'Der umschließende Fehler'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was gibt `wrapper.cause.message` zurück?
    ```js
        const original = new Error('Original error');
        const wrapper = new Error('Wrapper', 
          { cause: original }
        );
        console.log(wrapper.cause.message);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Error.cause` (ES2022) ermöglicht das Kettchen von Fehlern, um den ursprünglichen Kontext zu bewahren. `wrapper.cause` verweist auf den ursprünglichen Fehler, weshalb `wrapper.cause.message` `"Originalfehler"` zurückgibt. Dies ist nützlich, um tiefere Fehler mit höherer Kontextinformation zu verpacken.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Stack-Traces"
  title="Stack-Manipulation"
  options={[
    {text: 'Entfernt createError aus dem Stack', isAnswer: true},
    {text: 'Löscht den gesamten Stack'},
    {text: 'Tut nichts'},
    {text: 'Wirft einen TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht `Error.captureStackTrace`?
    ```js
        function createError(msg) {
          const err = new Error(msg);
          Error.captureStackTrace(err, createError);
          return err;
        }
        const error = createError('test');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Error.captureStackTrace` (V8/Node.js) entfernt die angegebene Funktion (`createError`) aus dem Stack-Trace, wodurch Fehler-Fabrikfunktionen für Endbenutzer unsichtbar werden. Dies erzeugt sauberere Stack-Traces, die auf den Ort zeigen, an dem die Fabrik aufgerufen wurde, nicht auf die Fabrik selbst.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Nachrichtenvorlagen"
  title="Vorlagenliterale in Fehlern"
  options={[
    {text: '"Wert ${value} ist ungültig"'},
    {text: '"Wert undefined ist ungültig"', isAnswer: true},
    {text: 'ReferenceError: value ist nicht definiert'},
    {text: '"Wert  ist ungültig"'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche Fehlermeldung wird angezeigt?
    ```js
        function validate(value) {
          if (!value) {
            throw new Error(
              `Value ${value} is invalid`
            );
          }
        }
        try {
          validate(undefined);
        } catch (e) {
          console.log(e.message);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Vorlagenliterale konvertieren `undefined` in den String `"undefined"` während der Interpolation. Die Fehlermeldung wird `"Wert undefined ist ungültig"`. Für sauberere Nachrichten sollten Sie `value ?? 'null'` oder ähnliche Checks vor der Interpolation verwenden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="API-Fallen"
  title="Express-Antwortfehler"
  options={[
    {text: 'Sendet das vollständige Fehlerobjekt'},
    {text: 'Sendet {"error":{}}', isAnswer: true},
    {text: 'Löst einen Serverfehler aus'},
    {text: 'Sendet nur die Fehlermeldung'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird an den Client gesendet?
    ```js
        // Express.js route
        app.get('/api/data', (req, res) => {
          const error = new Error('Database failed');
          res.json({ error });
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `res.json()` nutzt intern `JSON.stringify()`, wodurch das Error-Objekt zu `{}` wird. Der Client erhält `{"error":{}}`. Um dies zu beheben, verwenden Sie `res.json({ error: error.message })` oder `res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Asynchrone Fehler"
  title="Promise-Ablehnungswerte"
  options={[
    {text: 'Immer Fehlerobjekte'},
    {text: 'Jeder Wert kann eine Ablehnung sein', isAnswer: true},
    {text: 'Nur Zeichenketten und Fehlerobjekte'},
    {text: 'Automatisch in Error eingepackt'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was akzeptiert `Promise.reject()`?
    ```js
        Promise.reject('string').catch(e => 
          console.log(typeof e)
        );
        Promise.reject({code: 404}).catch(e => 
          console.log(e.code)
        );
        Promise.reject(42).catch(e => 
          console.log(e)
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Wie bei `throw` akzeptiert `Promise.reject()` jeden beliebigen Wert – Zeichenketten, Objekte, Zahlen usw. Dies gibt `"string"`, `404` und `42` aus. Prüfe immer den Typ gefangener Werte in Promise-Ketten, besonders wenn du mit drittanbietercode umgehst, der möglicherweise mit nicht-Fehler-Werten ablehnt.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Fehlereigenschaften"
  title="Nicht-standardisierte Eigenschaften"
  options={[
    {text: 'Stets verfügbar'},
    {text: 'Können in einigen Umgebungen nicht existieren', isAnswer: true},
    {text: 'Nur in Node.js'},
    {text: 'Veraltet und entfernt'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie zuverlässig sind `error.code` und `error.errno`?
    ```js
        const fs = require('fs');
        fs.readFile('missing.txt', (err, data) => {
          if (err) {
            console.log(err.code);    // 'ENOENT'
            console.log(err.errno);   // -2
          }
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Eigenschaften wie `code` und `errno` sind umgebungsspezifisch (hier z. B. Node.js) und gehören nicht zur standardisierten Error-Objektdefinition. Browser-Fehler besitzen diese Eigenschaften nicht. Prüfen Sie immer, ob sie existieren: `if (err.code === 'ENOENT')` anstelle davon, dies vorauszusetzen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Fehlergrenzen"
  title="Objekt vs. Fehlererkennung"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was geben diese Prüfungen zurück?
    ```js
        const fakeError = {
          name: 'Error',
          message: 'Fake error',
          stack: 'fake stack'
        };
    
        console.log(fakeError instanceof Error);
        console.log(Object.prototype.toString.call(
          fakeError
        ) === '[object Error]');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `instanceof Error` gibt `false` zurück, weil das Objekt nicht durch den Error-Konstruktor erstellt wurde. `Object.prototype.toString.call()` gibt ebenfalls `false` zurück (es liefert `'[object Object]'`), da es den internen `[[Class]]`-Speicherplatz prüft. Beide Methoden identifizieren dieses Objekt korrekt als gefälschten Fehler.
  </div>
  </slot>
</Challenge>

</QuizUI>

## Meistern Sie die Kunst der Fehlerbehandlung

Von Serialisierungsfallen bis hin zu kontextübergreifenden instanceof-Fehlern – diese fortgeschrittenen Konzepte trennen Anfänger-Entwickler von ~erfahrenen~ gebeutelten Profis.

Bereit für weitere Herausforderungen? Besuchen Sie unsere [komplette Quiz-Sammlung](/challenges/) für weitere Denksportaufgaben zu JavaScript, Algorithmen und mehr!
````
