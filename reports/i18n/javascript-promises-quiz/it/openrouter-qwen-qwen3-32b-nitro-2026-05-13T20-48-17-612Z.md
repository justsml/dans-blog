# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/it/index.mdx
- Validation: deferred
- Runtime seconds: 46.45
- Input tokens: 8149
- Output tokens: 7776
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002518
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Quiz: 9 Domande sulle Promise JavaScript'
subTitle: Non abbandonare mai più una promessa
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';



import Challenge from '../components/QuizUI/Challenge';
import QuizUI from '../components/QuizUI/QuizUI';


## Conosci le Promises JavaScript?

> * **Dimostra le tue skill in JavaScript!** 🚀

1. **Controlla gli indizi** (Pulsante grande, angolo in basso).
2. Prova il codice nella Console del tuo browser (usa il tasto `F12` o cerca) o usa [repl.it](https://repl.it)*.
3. Non esitare a [Tweetare @justsml](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/). **Mi piacerebbe sentire i tuoi pensieri!**

### 👇 Completa le 9 Domande Sotto 👇
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Gestione degli errori"
  title="Più `.catch` #1"
  options={[
    {text: 'Stampa il messaggio una volta'},
    {text: 'Stampa il messaggio due volte', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'Il processo termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del seguente codice?
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
    Creiamo una Promise utilizzando il metodo costruttore, attivando immediatamente un errore con il callback `reject`.

    Gli handler `.catch` funzionano come il DOM's `.addEventListener(event, callback)` o gli Event Emitter's `.on(event, callback)` dove **è possibile aggiungere più callback di gestione.** Ogni handler verrà chiamato con gli stessi argomenti.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Gestione degli errori"
  title="Multiplo `.catch` #2"
  options={[
    {text: 'stampa il messaggio una volta'},
    {text: 'stampa il messaggio due volte'},
    {text: 'promessa rifiutata non gestita', isAnswer: true},
    {text: 'il processo termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del seguente codice?
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
    Quando si utilizza il costruttore Promise, è necessario chiamare uno dei callback `resolve()` o `reject()`. Il costruttore Promise ignora il valore restituito dall'esecutore, quindi la promessa aggiuntiva creata con `Promise.reject()` non è collegata a `p`. I due gestori sono collegati a `p`, che rimane in sospeso, mentre la promessa rifiutata restituita viene segnalata come non gestita dall'ambiente host.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="Gestione degli errori"
  title="Catena di `.then` e `.catch`"
  options={[
    {text: 'stampa l\'errore e `undefined`', isAnswer: true},
    {text: 'stampa l\'errore due volte', hint: 'L\'errore viene catturato e viene restituito `undefined`.'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del seguente codice?
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
    Quando si catenano `.then` e `.catch`, è utile pensare a loro come a una serie di passi. Ogni `.then` riceve il valore restituito dal `.then` precedente (come argomento). Tuttavia, se il tuo "passo" incontra un errore, tutti i `.then` successivi vengono saltati fino a quando non si incontra un `.catch`. Se desideri sovrascrivere un errore, basta restituire un valore non-errore. Può essere accesso da qualsiasi `.then` successivo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="Gestione degli errori"
  title="Catena di `.catch`"
  options={[
    {text: 'Stampa il messaggio di errore una volta', isAnswer: true},
    {text: 'Stampa il messaggio di errore due volte'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'Il processo termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del seguente codice?
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
    Quando si catenano `.catch`, ciascuno gestisce solo gli errori generati nei `.then` o `.catch` precedenti. In questo esempio, il primo `.catch` restituisce `console.log`, che sarebbe stato accessibile solo aggiungendo un `.then()` dopo entrambi i `.catch`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Gestione degli errori"
  title="Più `.catch`"
  options={[
    {text: 'stampa il messaggio una volta'},
    {text: 'stampa il messaggio due volte'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'non stampa nulla', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del seguente codice?
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
    **Suggerimento:** `.catch` può essere utilizzato per ignorare (o sovrascrivere) gli errori semplicemente restituendo un valore regolare.

    Questo trucco funziona solo quando c'è un `.then` successivo per ricevere il valore.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Gestione dei Dati"
  title="Flusso tra `.then`"
  options={[
    {text: 'stampa \'Success!\' e \'SUCCESS!\''},
    {text: 'stampa \'Success!\''},
    {text: 'stampa \'SUCCESS!\'', isAnswer: true},
    {text: 'niente stampa'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del seguente codice?
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
    **Suggerimento:** I `.then` passano i dati in sequenza, dal `return value` al successivo `.then(value => /* handle value */)`.

    Un `return` è fondamentale per passare un valore al successivo `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gestione dei Dati"
  title="Flusso tra `.then`"
  options={[
    {text: 'stampa "SUCCESS!"'},
    {text: 'stampa "Success!"'},
    {text: 'stampa "SUCCESS!" e "SUCCESS!"', isAnswer: true},
    {text: 'niente stampa'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del seguente codice?
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
    Ci sono 2 chiamate a `console.log` che verranno eseguite.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Gestione dei Dati"
  title="Flusso tra `.then`"
  options={[
    {text: 'stampa "SUCCESS!"'},
    {text: 'stampa "Success!"'},
    {text: 'stampa "SUCCESS!" e "SUCCESS!"'},
    {text: 'stampa `undefined`', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del seguente codice?
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
    **Suggerimento:** I `.then` passano i dati in sequenza, da `return value` al prossimo `.then(value => /* handle value */)`.

    Un `return` è fondamentale per passare un valore al `.then` successivo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Gestione dei Dati"
  title="Flusso tra .then e .catch"
  options={[
    {text: 'stampa "Oh noes!" e "The fails!"'},
    {text: 'stampa "Oh noes!"'},
    {text: 'stampa "The fails!"', isAnswer: true},
    {text: 'stampa "actually, that worked"'},
    {text: 'niente viene stampato'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del seguente codice?
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
