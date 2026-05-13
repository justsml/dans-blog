# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 94.06
- Input tokens: 7859
- Output tokens: 7163
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002348
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2019-11-26--javascript-promises-quiz/it/index.mdx reports/i18n/javascript-promises-quiz/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Quiz: 9 Domande su JavaScript Promise'
subTitle: ''
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


## Conosci le Promises in JavaScript?

> * **Prova le tue skill in JavaScript!** 🚀

1. **Controlla gli indizi** (pulsante grande, angolo in basso).
2. Prova il codice nella Console del browser (usa il tasto `F12` o cerca la Console) o usa [repl.it](https://repl.it)*.
3. Sentiti libero di [inviare un tweet a @justsml](https://x.com/intent/tweet?text=Ciao%20Dan%2C%20stavo%20facendo%20il%20tuo%20quiz%20sulle%20Promises%2E%2E%2E&url=https://danlevy.net/). **Mi piacerebbe sapere i tuoi pensieri!**

### 👇 Completa le 9 domande qui sotto 👇

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
    Creiamo una Promise utilizzando il metodo costruttore, scatenando immediatamente un errore con il callback `reject`.

    I gestori `.catch` funzionano come il DOM's `.addEventListener(event, callback)` o l'Event Emitter's `.on(event, callback)` dove **è possibile aggiungere più callback gestori.** Ogni gestore verrà chiamato con gli stessi argomenti.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Gestione degli errori"
  title="Multipli `.catch` #2"
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
    Quando si utilizza il costruttore Promise, è necessario invocare uno tra i callback `resolve()` o `reject()`. Il costruttore Promise ignora il valore restituito dall'esecutore, quindi la Promise aggiuntiva creata con `Promise.reject()` non è collegata a `p`. I due handler sono attaccati a `p`, che rimane in sospeso, mentre la Promise rifiutata restituita viene segnalata come non gestita dall'ambiente host.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="Gestione degli errori"
  title="Concatenare `.then` e `.catch`"
  options={[
    {text: 'stampa errore e `undefined`', isAnswer: true},
    {text: 'stampa errore due volte'},
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
    Quando si concatenano `.then` e `.catch`, è utile pensare a loro come a una serie di passaggi. Ogni `.then` riceve il valore restituito dal `.then` precedente (come argomento). Tuttavia, se un "passaggio" incontra un errore, tutti i successivi `.then` vengono saltati fino all'incontro di un `.catch`. Se desideri sovrascrivere un errore, basta restituire un valore non-errore. Questo può essere accesso tramite qualsiasi `.then` successivo.
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
    Quando si catenano `.catch`, ciascuno gestisce solo gli errori generati nei `.then` o `.catch` precedenti. In questo esempio il primo `.catch` restituisce il `console.log` che sarebbe stato accessibile solo aggiungendo un `.then()` dopo entrambi i `.catch`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Gestione degli errori"
  title="Più `.catch`"
  options={[
    {text: 'Stampa il messaggio una volta'},
    {text: 'Stampa il messaggio due volte'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'Niente viene stampato', isAnswer: true},
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
    **Suggerimento:** Gli `.catch` possono essere utilizzati per ignorare (o sovrascrivere) gli errori semplicemente restituiscono un valore regolare.

    Questo trucco funziona solo quando c'è un `.then` successivo che riceve il valore.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Gestione Dati"
  title="Flusso tra gli `.then`"
  options={[
    {text: 'stampa "Success!" e "SUCCESS!"'},
    {text: 'stampa "Success!"'},
    {text: 'stampa "SUCCESS!"', isAnswer: true},
    {text: 'non viene stampato nulla'},
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
    **Suggerimento:** Gli `.then` passano i dati in sequenza, dal `return value` al successivo `.then(value => /* handle value */)`.

    Un `return` è fondamentale per passare il valore al `.then` successivo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gestione dei Dati"
  title="Flusso tra gli `.then`"
  options={[
    {text: 'stampa "SUCCESS!"'},
    {text: 'stampa "Success!"'},
    {text: 'stampa "SUCCESS!" e "SUCCESS!"', isAnswer: true},
    {text: 'non viene stampato niente'},
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
  title="Flusso tra gli `.then`"
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
    **Suggerimento:** gli `.then` passano i dati in sequenza, da `return value` al prossimo `.then(value => /* handle value */)`.

    Un `return` è fondamentale per passare un valore al prossimo `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Gestione dei dati"
  title="Flusso tra `.then` e `.catch`"
  options={[
    {text: 'stampa "Oh noes!" e "The fails!"'},
    {text: 'stampa "Oh noes!"'},
    {text: 'stampa "The fails!"', isAnswer: true},
    {text: 'stampa "actually, that worked"'},
    {text: 'niente stampa'},
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
