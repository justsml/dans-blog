# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/it/index.mdx
- Validation: deferred
- Runtime seconds: 9.32
- Input tokens: 13024
- Output tokens: 7707
- Thinking tokens: unknown
- Cached input tokens: 3968
- Cache write tokens: 0
- Estimated cost: $0.001895
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Quiz: Padronanza Avanzata degli Errori JS'
subTitle: Le tue eccezioni sono davvero eccezionali?
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


### Pensi di conoscere a fondo gli errori JavaScript?

* **Metti alla prova la tua esperienza nella gestione degli errori!** 💥
* Nessun login o registrazione richiesti. ✨
* Scelta multipla. 🤖 … _Queste non sono le solite domande su try‑catch!_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Sorprese di serializzazione"
  title="Il mistero dell'oggetto vuoto"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa restituisce `JSON.stringify(error)`?
    ```js
        const error = new Error('Oops');
        console.log(JSON.stringify(error));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Gli oggetti Error hanno proprietà non enumerabili (`message`, `name`, `stack`), quindi `JSON.stringify()` restituisce `{}`. Questo è un inconveniente comune quando si inviano errori nelle risposte API. Usa `JSON.stringify(error, Object.getOwnPropertyNames(error))` o crea invece un oggetto semplice.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Sorprese di Serializzazione"
  title="Console vs JSON"
  options={[
    {text: 'Entrambi mostrano lo stesso output'},
    {text: 'console.log mostra più informazioni', isAnswer: true},
    {text: 'JSON.stringify mostra più informazioni'},
    {text: 'Entrambi mostrano oggetti vuoti'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è la differenza tra questi due?
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` mostra l'errore con il suo messaggio e lo stack trace perché la console ha una gestione speciale per gli oggetti Error. `JSON.stringify(err)` restituisce `'{}'` perché le proprietà di Error non sono enumerabili. Questa differenza mette in difficoltà molti sviluppatori che debugano le API.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Trucchi per il controllo dei tipi"
  title="Ereditarietàdi instanceof"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quali sono i risultati di questi controlli?
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
    Tutte e tre restituiscono `true`. `CustomError` estende `Error`, che estende `Object`. L'operatore `instanceof` controlla l'intera catena di prototipi, quindi un'istanza di `CustomError` è anche un'istanza di `Error` e `Object`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Trucchi per il controllo dei tipi"
  title="instanceof tra frame"
  options={[
    {text: 'Sempre vero'},
    {text: 'Sempre falso'},
    {text: 'Può essere falso tra frame', isAnswer: true},
    {text: 'Genera un errore'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa succede con `instanceof Error` tra iframe?
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
    `instanceof` può restituire `false` tra diversi contesti di esecuzione (iframe, worker) perché ogni contesto ha il proprio costruttore `Error`. Usa `Object.prototype.toString.call(obj) === '[object Error]'` per una rilevazione affidabile degli errori tra contesti.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Lanciare non-Error"
  title="Stringhe Lanciati"
  options={[
    {text: 'TypeError: la stringa non è un Error'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'Crea automaticamente un oggetto Error'},
    {text: 'comportamento indefinito'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa succede quando lanci una stringa?
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
    JavaScript consente di lanciare qualsiasi valore. Qui, `e instanceof Error` è `false` e `typeof e` è `"string"`. Questo può rompere il codice di gestione degli errori che presume che tutte le eccezioni catturate siano oggetti Error. Lancia sempre istanze di Error per un debug migliore.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Errori Personalizzati"
  title="Proprietà name dell'Errore"
  options={[
    {text: '"Error"'},
    {text: '"CustomError"', isAnswer: true},
    {text: 'undefined'},
    {text: 'Dipende dal browser'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è il valore di `err.name`?
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
    `err.name` è `"CustomError"` perché `this.constructor.name` restituisce il nome della classe. Impostare `this.name = this.constructor.name` è un pattern comune per garantire che le classi di errore personalizzate mostrino il nome corretto nelle tracce di stack e nei messaggi di errore.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Errori Personalizzati"
  title="Trappola del Nome del Costruttore"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è l'output senza impostare `name`?
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
    Se non imposti esplicitamente `this.name`, l'errore eredita la proprietà `name` predefinita dalla classe `Error`, che è `"Error"`. Per questo le classi di errore personalizzate dovrebbero sempre impostare `this.name = this.constructor.name` nel loro costruttore.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Causa dell'Errore"
  title="Error.cause Moderno"
  options={[
    {text: '"Errore originale"', isAnswer: true},
    {text: 'undefined'},
    {text: 'L\'errore di incapsulamento'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa restituisce `wrapper.cause.message`?
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
    `Error.cause` (ES2022) consente di concatenare errori per preservare il contesto dell'errore originale. `wrapper.cause` fa riferimento all'errore originale, quindi `wrapper.cause.message` restituisce `"Original error"`. Questo è utile per avvolgere errori di livello inferiore con un contesto di livello superiore.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Tracce dello Stack"
  title="Manipolazione dello Stack"
  options={[
    {text: 'Rimuove createError dallo stack', isAnswer: true},
    {text: 'Cancella l\'intero stack'},
    {text: 'Non fa nulla'},
    {text: 'Lancia un TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa fa `Error.captureStackTrace`?
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
    `Error.captureStackTrace` (V8/Node.js) rimuove la funzione specificata (`createError`) dalla traccia dello stack, rendendo le funzioni factory di errore invisibili agli utenti finali. Questo genera tracce dello stack più pulite che indicano il punto in cui la factory è stata chiamata, non la factory stessa.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Modelli di Messaggi"
  title="Letterali Template negli Errori"
  options={[
    {text: '"Value ${value} è non valido"'},
    {text: '"Value undefined è non valido"', isAnswer: true},
    {text: 'ReferenceError: value non è definito'},
    {text: '"Value  è non valido"'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è il messaggio di errore?
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
    I letterali template convertono `undefined` nella stringa `"undefined"` durante l'interpolazione. Il messaggio di errore diventa `"Value undefined is invalid"`. Per messaggi più puliti, considera di usare `value ?? 'null'` o controlli simili prima dell'interpolazione.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Trappole API"
  title="Errore di risposta Express"
  options={[
    {text: 'Invia l\'intero oggetto errore'},
    {text: 'Invia {"error":{}}', isAnswer: true},
    {text: 'Genera un errore del server'},
    {text: 'Invia solo il messaggio di errore'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa viene inviato al client?
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
    `res.json()` usa internamente `JSON.stringify()`, quindi l'oggetto Error diventa `{}`. Il client riceve `{"error":{}}`. Per risolvere, usa `res.json({ error: error.message })` oppure `res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Errori Asincroni"
  title="Valori di Rifiuto della Promise"
  options={[
    {text: 'Sempre oggetti Error'},
    {text: 'Qualsiasi valore può essere un rifiuto', isAnswer: true},
    {text: 'Solo stringhe e oggetti Error'},
    {text: 'Avvolto automaticamente in Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa può accettare `Promise.reject()`?
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
    Come `throw`, `Promise.reject()` accetta qualsiasi valore – stringhe, oggetti, numeri, ecc. Questo stampa `"string"`, `404` e `42`. Controlla sempre il tipo dei valori catturati nelle catene di promise, soprattutto quando lavori con codice di terze parti che potrebbe rifiutare con valori non‑Error.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Proprietà dell'errore"
  title="Proprietà non standard"
  options={[
    {text: 'Sempre disponibile'},
    {text: 'Potrebbe non esistere in tutti gli ambienti', isAnswer: true},
    {text: 'Solo in Node.js'},
    {text: 'Deprecata e rimossa'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quanto sono affidabili `error.code` e `error.errno`?
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
    Proprietà come `code` e `errno` sono specifiche dell'ambiente (Node.js in questo caso) e non fanno parte dell'oggetto Error standard. Gli errori del browser non avranno queste proprietà. Controlla sempre la loro esistenza: `if (err.code === 'ENOENT')` invece di presumere che esistano.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Confini di Errore"
  title="Rilevamento Oggetto vs Errore"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa restituiscono questi controlli?
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
    `instanceof Error` restituisce `false` perché l'oggetto non è stato creato dal costruttore Error. `Object.prototype.toString.call()` restituisce anch'esso `false` (restituisce `'[object Object]'`) perché controlla lo slot interno `[[Class]]`. Entrambi i metodi identificano correttamente questo come un oggetto errore falsificato.
  </div>
  </slot>
</Challenge>

</QuizUI>

## Padroneggia l’Arte della Gestione degli Errori

Dalle trappole della serializzazione ai fallimenti di `instanceof` tra contesti diversi, questi concetti avanzati distinguono i junior dai professionisti davvero provati.

Pronto per altre sfide? Dai un’occhiata alla nostra [raccolta completa di quiz](/challenges/) per altri rompicapi su JavaScript, algoritmi e molto altro!
````
