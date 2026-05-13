# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: it
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/it/index.mdx
- Validation: deferred
- Runtime seconds: 184.82
- Input tokens: 8739
- Output tokens: 31151
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Quiz: 9 domande sui Promise JavaScript'
subTitle: Non perdere più una promise!
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## Conosci le Promise di JavaScript?

> * **Mettiti alla prova con JavaScript!** 🚀

1. **Controlla i Suggerimenti** (Pulsante grande, in basso).
2. Esegui il codice nella Console del browser (prova la scorciatoia `F12` o cercala) oppure usa [repl.it](https://repl.it)*.
3. Sentiti libero di [Twittarmi a @justsml](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/). **Mi farebbe piacere sapere cosa ne pensi!**

### 👇 Completa le 9 Domande Qui Sotto👇
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Gestione degli errori"
  title="Più `.catch` #1"
  options={[
    {text: 'stampare il messaggio una volta'},
    {text: 'stampare il messaggio due volte', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'il processo termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa stamperà il codice qui sotto?
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
    Creiamo un Promise tramite il costruttore, innescando un errore subito con il callback `reject`.

    I gestori `.catch` si comportano poi come il `.addEventListener(event, callback)` del DOM o il `.on(event, callback)` dell'Event Emitter: **è possibile registrare più callback di gestione.** Ognuno verrà invocato con gli stessi argomenti.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Gestione degli errori"
  title="Più `.catch` #2"
  options={[
    {text: 'stampa il messaggio una volta'},
    {text: 'stampa il messaggio due volte'},
    {text: 'promise rifiutata non gestita', isAnswer: true},
    {text: 'il processo termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa produce il codice qui sotto?
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
    Quando utilizzi il costruttore `Promise`, devi invocare i callback `resolve()` o `reject()`. Il costruttore `Promise` ignora il valore restituito dall'esecutore, quindi la Promise aggiuntiva creata con `Promise.reject()` non viene concatenata a `p`. I due handler sono agganciati a `p`, che rimane in stato pending, mentre la promise rifiutata restituita viene segnalata come non gestita dall'ambiente host.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="Gestione degli errori"
  title="Concatenare `.then` e `.catch`"
  options={[
    {text: 'stampa l\'errore e `undefined`', isAnswer: true},
    {text: 'stampa l\'errore due volte'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Che output produrrà il codice qui sotto?
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
    Quando concateni `.then` e `.catch`, è utile pensarli come una sequenza di passaggi. Ogni `.then` riceve il valore restituito dal `.then` precedente (come argomento). Tuttavia, se il tuo "passaggio" genera un errore, tutti i `.then` successivi verranno saltati fino a quando non si incontra un `.catch`. Se vuoi sovrascrivere un errore, ti basta restituire un valore che non sia un errore. Questo valore potrà essere recuperato da qualsiasi `.then` successivo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="Gestione degli errori"
  title="Concatenare i `.catch`"
  options={[
    {text: 'stampare il messaggio di errore una volta', isAnswer: true},
    {text: 'stampare il messaggio di errore due volte'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'il processo termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale output genererà il codice qui sotto?
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
    Quando si concatenano i `.catch`, ciascuno intercetta solo gli errori lanciati nei passaggi `.then` o `.catch` precedenti. In questo esempio, il primo `.catch` restituisce il `console.log`, che verrebbe gestito solo se si aggiungesse un `.then()` dopo la catena dei `.catch`.
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
    Cosa stamperà il codice qui sotto?
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
    **Suggerimento:** i `.catch` possono essere usati per ignorare (o sovrascrivere) gli errori semplicemente restituendo un valore qualsiasi.

    Questo trucco funziona solo se c'è un `.then` successivo pronto a ricevere il valore.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Gestione dei dati"
  title="Flusso tra `.then`"
  options={[
    {text: 'stampa "Success!" e "SUCCESS!"'},
    {text: 'stampa "Success!"'},
    {text: 'stampa "SUCCESS!"', isAnswer: true},
    {text: 'non stampa nulla'},
  ]}
>
  <slot name="question">
  <div className="question">
    Che output genera il codice seguente?
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
    **Suggerimento:** i `.then` passano i dati in sequenza, dal `return value` al successivo `.then(value => /* handle value */)`.

    Il `return` è la chiave per passare un valore al `.then` successivo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gestione dei dati"
  title="Flusso tra i `.then`"
  options={[
    {text: 'stampa "SUCCESS!"'},
    {text: 'stampa "Success!"'},
    {text: 'stampa "SUCCESS!" e "SUCCESS!"', isAnswer: true},
    {text: 'non stampa nulla'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è l'output del codice seguente?
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
    Il codice contiene 2 chiamate a `console.log`, quindi entrambe verranno eseguite.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Gestione dei dati"
  title="Flusso tra i `.then`"
  options={[
    {text: 'stampa "SUCCESS!"'},
    {text: 'stampa "Success!"'},
    {text: 'stampa "SUCCESS!" e "SUCCESS!"'},
    {text: 'stampa `undefined`', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è l'output del codice seguente?
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
    **Suggerimento:** I `.then` passano i dati in sequenza, da `return value` al successivo `.then(value => /* handle value */)`.

    Il `return` è fondamentale per passare un valore al `.then` successivo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Gestione dei dati"
  title="Il flusso tra `.then` e `.catch`"
  options={[
    {text: 'stampare "Oh noes!" e "The fails!"'},
    {text: 'stampare "Oh noes!"'},
    {text: 'stampare "The fails!"', isAnswer: true},
    {text: 'stampare "actually, that worked"'},
    {text: 'non stampa nulla'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa stamperà il codice qui sotto?
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
