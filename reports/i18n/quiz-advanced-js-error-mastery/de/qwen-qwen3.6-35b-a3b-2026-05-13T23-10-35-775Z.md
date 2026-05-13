# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: de
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/de/index.mdx
- Validation: deferred
- Runtime seconds: 271.24
- Input tokens: 13509
- Output tokens: 49673
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.051470
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Quiz: Fortgeschrittenes JS-Fehlerhandling'
subTitle: Sind Ihre Ausnahmen wirklich die Ausnahme?
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


### Glaubst du, JavaScript-Fehler wirklich zu beherrschen?

* **Teste dein Expertenwissen in der Fehlerbehandlung!** 💥
* Kein Login oder Registrierung nötig. ✨
* Multiple Choice. 🤖 ... _Das sind keine typischen try-catch-Fragen!_
---

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
    Error-Objekte besitzen nicht-auflistbare Eigenschaften (`message`, `name`, `stack`), weshalb `JSON.stringify()` `{}` zurückgibt. Das ist ein häufiger Stolperstein beim Serialisieren von Fehlern in API-Antworten. Verwende stattdessen `JSON.stringify(error, Object.getOwnPropertyNames(error))` oder erstelle ein plain Object.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Serialisierungs-Überraschungen"
  title="Console vs. JSON"
  options={[
    {text: 'Beide zeigen die gleiche Ausgabe'},
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
    `console.log(err)` gibt den Fehler samt Nachricht und Stack-Trace aus, weil die Konsole Error-Objekte speziell behandelt. `JSON.stringify(err)` liefert `'{}'` zurück, da die Eigenschaften von Error-Objekten nicht aufzählbar sind. Dieser Unterschied bringt viele Entwickler beim Debuggen von APIs ins Straucheln.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Kniffe beim Typ-Check"
  title="instanceof-Vererbung"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche Ergebnisse liefern diese Checks?
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
    Alle drei liefern `true`. `CustomError` erbt von `Error`, das seinerseits von `Object` erbt. Der `instanceof`-Operator durchsucht die gesamte Prototypenkette, daher ist eine `CustomError`-Instanz auch eine Instanz von `Error` und `Object`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Typ-Check-Tricks"
  title="iframe-übergreifendes instanceof"
  options={[
    {text: 'Immer wahr'},
    {text: 'Immer falsch'},
    {text: 'Kann rahmenübergreifend falsch sein', isAnswer: true},
    {text: 'Wirft einen Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was passiert, wenn du `instanceof Error` über iframes hinweg testest?
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
    `instanceof` kann über verschiedene Ausführungskontexte (iframes, Web Workers) hinweg `false` zurückgeben, da jeder Kontext seinen eigenen `Error`-Konstruktor besitzt. Nutze `Object.prototype.toString.call(obj) === '[object Error]'`, um Fehler kontextübergreifend zuverlässig zu erkennen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Nicht-Fehler werfen"
  title="Strings werfen"
  options={[
    {text: 'TypeError: string is not an Error'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'Erstellt automatisch ein Error-Objekt'},
    {text: 'Undefiniertes Verhalten'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was passiert, wenn du einfach einen String wirfst?
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
    JavaScript erlaubt dir, theoretisch jeden beliebigen Wert zu werfen. In diesem Fall ist `e instanceof Error` `false` und `typeof e` `"string"`. Das kann deine Fehlerbehandlungslogik komplett sprengen, die stillschweigend davon ausgeht, dass jeder gefangene Exception ein Error-Objekt ist. Wirf immer Error-Instanzen – dein Debugger und deine Kollegen werden es dir danken.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Benutzerdefinierte Fehler"
  title="Die `name`-Eigenschaft von Fehlern"
  options={[
    {text: '"Error"'},
    {text: '"CustomError"', isAnswer: true},
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
    `err.name` ist `"CustomError"`, weil `this.constructor.name` den Klassennamen zurückgibt. Die Zuweisung `this.name = this.constructor.name` ist ein gängiges Muster, um sicherzustellen, dass benutzerdefinierte Fehlerklassen ihren korrekten Namen in Stack-Traces und Fehlermeldungen anzeigen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Benutzerdefinierte Fehler"
  title="Die Konstruktor-Namen-Falle"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist die Ausgabe, wenn `name` nicht gesetzt wird?
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
    Ohne `this.name` explizit zu setzen, erbt das Error-Objekt die Standard-`name`-Eigenschaft der `Error`-Klasse, also `"Error"`. Deshalb sollten benutzerdefinierte Fehlerklassen in ihrem Konstruktor immer `this.name = this.constructor.name` setzen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Fehlerursache"
  title="Modernes Error.cause"
  options={[
    {text: '"Originaler Fehler"', isAnswer: true},
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
    `Error.cause` (ES2022) ermöglicht das Verkettung von Fehlern, um den ursprünglichen Kontext nicht zu verlieren. `wrapper.cause` verweist auf den ursprünglichen Fehler, daher gibt `wrapper.cause.message` `"Originaler Fehler"` zurück. Das ist praktisch, um tiefere Fehler mit einem übergeordneten Kontext zu umschließen, ohne die Fehlerkette zu unterbrechen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Stack-Traces"
  title="Stack-Manipulation"
  options={[
    {text: 'Entfernt `createError` aus dem Stack', isAnswer: true},
    {text: 'Löscht den gesamten Stack'},
    {text: 'Tut nichts'},
    {text: 'Wirft einen TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht `Error.captureStackTrace` eigentlich?
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
    `Error.captureStackTrace` (V8/Node.js) entfernt die angegebene Funktion (`createError`) aus dem Stack-Trace, sodass Fehler-Fabriken für Endnutzer unsichtbar bleiben. Das sorgt für sauberere Stack-Traces, die genau dorthin zeigen, wo die Fabrik aufgerufen wurde – und nicht in die Fabrik selbst.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Meldungsvorlagen"
  title="Template-Literale in Fehlermeldungen"
  options={[
    {text: '"Value ${value} is invalid"'},
    {text: '"Value undefined is invalid"', isAnswer: true},
    {text: 'ReferenceError: value is not defined'},
    {text: '"Value  is invalid"'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die Fehlermeldung?
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
    Template-Literale konvertieren `undefined` bei der Interpolation in den String `"undefined"`. Die Fehlermeldung lautet dann `"Value undefined is invalid"`. Für präzisere Meldungen empfiehlt sich `value ?? 'null'` oder ein ähnlicher Check vor der Interpolation.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="API-Tücken"
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
    Was landet beim Client?
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
    `res.json()` verwendet intern `JSON.stringify()`, wodurch das Error-Objekt zu `{}` wird. Der Client erhält `{"error":{}}`. Um das zu beheben, nutze `res.json({ error: error.message })` oder `res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Asynchrone Fehler"
  title="Promise-Rejection-Werte"
  options={[
    {text: 'Immer Error-Objekte'},
    {text: 'Jeder Wert kann eine Ablehnung sein', isAnswer: true},
    {text: 'Nur Strings und Error-Objekte'},
    {text: 'Automatisch in Error verpackt'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was kann `Promise.reject()` eigentlich annehmen?
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
    Genau wie `throw` akzeptiert `Promise.reject()` jeden beliebigen Wert – Strings, Objekte, Zahlen usw. Das gibt `"string"`, `404` und `42` aus. Prüfe den Typ abgefangener Werte in Promise-Chains immer genau, besonders wenn du mit Drittanbieter-Code arbeitest, der möglicherweise mit Nicht-Error-Werten ablehnt.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Fehler-Eigenschaften"
  title="Nicht-Standard-Eigenschaften"
  options={[
    {text: 'Immer verfügbar'},
    {text: 'Existiert möglicherweise nicht in allen Umgebungen', isAnswer: true},
    {text: 'Nur in Node.js verfügbar'},
    {text: 'Veraltet und entfernt'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie verlässlich sind `error.code` und `error.errno` wirklich?
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
    Eigenschaften wie `code` und `errno` sind umgebungsspezifisch (hier Node.js) und nicht Teil des standardisierten Error-Objekts. Browser-Fehler besitzen diese Eigenschaften einfach nicht. Prüfe daher immer auf ihre Existenz, bevor du sie auswertest: `if (err.code === 'ENOENT')`. Sonst fliegt dir dein Code um die Ohren, weil du auf Annahmen statt auf Fakten setzt.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Fehlergrenzen"
  title="Objekt- vs. Fehlererkennung"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was liefern diese Checks zurück?
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
    `instanceof Error` liefert `false`, weil das Objekt nicht mit dem Error-Konstruktor erstellt wurde. `Object.prototype.toString.call()` gibt ebenfalls `false` zurück (es liefert `'[object Object]'`), da es den internen `[[Class]]`-Slot prüft. Beide Ansätze identifizieren korrekt, dass es sich um ein gefälschtes Fehlerobjekt handelt.
  </div>
  </slot>
</Challenge>

</QuizUI>

## Die Kunst der Fehlerbehandlung meistern

Von Serialization-Fallen bis zu instanceof-Checks über Kontextgrenzen hinweg: Diese fortgeschrittenen Konzepte trennen Junior-Entwickler von ~erfahrenen~ leicht ramponierten Profis.

Bereit für weitere Herausforderungen? Schaut in unsere [vollständige Quiz-Sammlung](../challenges/) für zusätzliche Denkaufgaben zu JavaScript, Algorithmen und mehr!
````
