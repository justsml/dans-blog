# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 4.28
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-advanced-js-error-mastery --locale de --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
title: 'Quiz:Fortgeschrittene JS‑Fehlerbeherrschung'
subTitle: Sind Ihre Ausnahmen wirklich außergewöhnlich?
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
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


### Glaubst du, du kennst JavaScript‑Fehler in- und auswendig?

* **Teste dein Know‑how im Fehler‑Handling!** 💥
* Kein Login oder Registrierung nötig. ✨
* Multiple‑Choice. 🤖 … _Das sind keine gewöhnlichen try‑catch‑Fragen!_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Serialisierungsüberraschungen"
  title="Das Geheimnis des leeren Objekts"
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
    Error-Objekte haben nicht aufzählbare Eigenschaften (`message`, `name`, `stack`), daher gibt `JSON.stringify()` `{}` zurück. Das ist ein häufiger Stolperstein beim Senden von Fehlern in API‑Antworten. Verwende `JSON.stringify(error, Object.getOwnPropertyNames(error))` oder erstelle stattdessen ein einfaches Objekt.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Serialisierungsüberraschungen"
  title="Konsolevs JSON"
  options={[
    {text: 'Beide zeigen die gleiche Ausgabe'},
    {text: '`console.log` zeigt mehr Infos', isAnswer: true},
    {text: '`JSON.stringify` zeigt mehr Infos'},
    {text: 'Beide zeigen leere Objekte'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist der Unterschied zwischen den beiden?
    ```js
    const err = new Error('Test');
    console.log(err);
    console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` zeigt den Fehler mit seiner Nachricht und dem Stack‑Trace, weil die Konsole eine spezielle Behandlung für Error‑Objekte hat. `JSON.stringify(err)` liefert `'{}'`, weil Error‑Eigenschaften nicht aufzählbar sind. Dieser Unterschied bringt viele Entwickler beim Debuggen von APIs durcheinander.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Typprüfungs-Tricks"
  title="instanceof Vererbung"
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
    Alle drei geben `true` zurück. `CustomError` erweitert `Error`, das wiederum `Object` erweitert. Der `instanceof`‑Operator prüft die gesamte Prototypkette, sodass eine `CustomError`‑Instanz auch eine Instanz von `Error` und `Object` ist.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Typprüfungs-Tricks"
  title="Cross-Frame instanceof"
  options={[
    {text: 'Immer wahr'},
    {text: 'Immer falsch'},
    {text: 'Kann über Frames hinweg falsch sein', isAnswer: true},
    {text: 'Wirft einen Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was passiert mit `instanceof Error` über iframes hinweg?
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
    `instanceof` kann über verschiedene Ausführungskontexte (iframes, Workers) `false` zurückgeben, weil jeder Kontext seinen eigenen `Error`‑Konstruktor hat. Verwende `Object.prototype.toString.call(obj) === '[object Error]'` für zuverlässige Fehlererkennung über Kontextgrenzen hinweg.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Werfen von Nicht-Error-Objekten"
  title="String-Ausnahmen"
  options={[
    {text: 'TypeError: Zeichenkette ist kein Error'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'Erzeugt automatisch ein Error-Objekt'},
    {text: 'undefiniertes Verhalten'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was passiert, wenn du eine Zeichenkette wirfst?
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
    JavaScript erlaubt das Werfen beliebiger Werte. Hier ist `e instanceof Error` `false` und `typeof e` ist `"string"`. Das kann Fehlerbehandlungscode zum Absturz bringen, der annimmt, dass alle gefangenen Ausnahmen Error‑Objekte sind. Wirf immer Error‑Instanzen für bessere Debug‑Informationen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Benutzerdefinierte Fehler"
  title="Fehlername-Eigenschaft"
  options={[
    {text: '"Error"'},
    {text: '"CustomError"', isAnswer: true},
    {text: 'undefined'},
    {text: 'Depends on the browser'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet der Wert von `err.name`?
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
    `err.name` ist `"CustomError"`, weil `this.constructor.name` den Klassennamen zurückgibt. Das Setzen von `this.name = this.constructor.name` ist ein gängiges Muster, um sicherzustellen, dass benutzerdefinierte Fehlerklassen den korrekten Namen in Stack‑Traces und Fehlermeldungen anzeigen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Benutzerdefinierte Fehler"
  title="Konstruktor-Name-Falle"
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
    Wenn `this.name` nicht explizit gesetzt wird, erbt der Fehler die Standard‑`name`‑Eigenschaft der `Error`‑Klasse, die `"Error"` ist. Deshalb sollten benutzerdefinierte Fehlerklassen immer `this.name = this.constructor.name` im Konstruktor setzen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Error-Ursache"
  title="Modernes Error.cause"
  options={[
    {text: '"Ursprünglicher Fehler"', isAnswer: true},
    {text: 'undefined'},
    {text: 'Der umhüllende Fehler'},
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
    `Error.cause` (ES2022) ermöglicht das Ketten von Errors, um den ursprünglichen Fehlerkontext zu bewahren. `wrapper.cause` verweist auf den ursprünglichen Fehler, daher gibt `wrapper.cause.message` `"Original error"` zurück. Das ist nützlich, um niedrigere Fehler mit höherem Kontext zu umhüllen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Stack-Trace"
  title="Stapelmanipulation"
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
    `Error.captureStackTrace` (V8/Node.js) entfernt die angegebene Funktion (`createError`) aus dem Stack‑Trace, sodass Fehler‑Factory‑Funktionen für End‑Benutzer unsichtbar werden. Das erzeugt sauberere Stack‑Traces, die auf die Aufrufstelle der Factory zeigen, nicht auf die Factory selbst.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Nachrichtenvorlagen"
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
    Template‑Literals wandeln `undefined` beim Einsetzen in den String `"undefined"` um. Die Fehlermeldung wird zu `"Value undefined is invalid"`. Für sauberere Meldungen solltest du `value ?? 'null'` oder ähnliche Prüfungen vor der Interpolation verwenden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="API-Fallen"
  title="Express-Antwortfehler"
  options={[
    {text: 'Sendet das komplette Fehlerobjekt'},
    {text: 'Sendet {"error":{}}', isAnswer: true},
    {text: 'Wirft einen Serverfehler'},
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
    `res.json()` verwendet intern `JSON.stringify()`, sodass das Error‑Objekt zu `{}` wird. Der Client erhält `{"error":{}}`. Um das zu beheben, benutze `res.json({ error: error.message })` oder `res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Asynchrone Fehler"
  title="Promise‑Ablehnungswerte"
  options={[
    {text: 'Immer Error‑Objekte'},
    {text: 'Jeder Wert kann eine Ablehnung sein', isAnswer: true},
    {text: 'Nur Strings und Error‑Objekte'},
    {text: 'Automatisch in Error gewrappt'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was kann `Promise.reject()` akzeptieren?
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
    Wie `throw` akzeptiert `Promise.reject()` jeden beliebigen Wert – Strings, Objekte, Zahlen usw. Das gibt `"string"`, `404` und `42` aus. Prüfe immer den Typ der abgefangenen Werte in Promise‑Ketten, besonders wenn du mit Drittanbieter‑Code arbeitest, der mit Nicht‑Error‑Werten ablehnen könnte.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Fehler‑Eigenschaften"
  title="Nicht‑standardmäßige Eigenschaften"
  options={[
    {text: 'Immer verfügbar'},
    {text: 'Möglicherweise nicht in allen Umgebungen vorhanden', isAnswer: true},
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
    Eigenschaften wie `code` und `errno` sind umgebungsspezifisch (hier Node.js) und gehören nicht zum standardmäßigen Error‑Objekt. Browser‑Fehler besitzen diese Eigenschaften nicht. Prüfe immer, ob sie existieren: `if (err.code === 'ENOENT')` anstatt anzunehmen, dass sie vorhanden sind.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Fehlergrenzen"
  title="Objekt‑vs‑Fehler‑Erkennung"
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
    `instanceof Error` gibt `false` zurück, weil das Objekt nicht vom Error‑Konstruktor erstellt wurde. `Object.prototype.toString.call()` liefert ebenfalls `false` (es gibt `'[object Object]'` zurück), weil es den internen `[[Class]]`‑Slot prüft. Beide Methoden erkennen korrekt, dass es sich um ein gefälschtes Fehlerobjekt handelt.
  </div>
  </slot>
</Challenge>

</QuizUI>

## Beherrsche die Kunst der Fehlerbehandlung

Von Serialisierungs-Fallen bis zu instanceof‑Problemen über Kontextgrenzen – diese fortgeschrittenen Konzepte trennen Junior‑Entwickler von erfahrenen Profis.

Bereit für weitere Herausforderungen? Sieh dir unsere [komplette Quiz‑Sammlung](/challenges/) für zusätzliche Denksportaufgaben zu JavaScript, Algorithmen und mehr an!
````
