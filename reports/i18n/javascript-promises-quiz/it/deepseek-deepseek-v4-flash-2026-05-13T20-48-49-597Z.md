# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: it
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/it/index.mdx
- Validation: deferred
- Runtime seconds: 149.05
- Input tokens: 7901
- Output tokens: 8295
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003429
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Quiz: 9 domande sulle Promise in JavaScript'
subTitle: Non infrangere mai più una promessa!
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

## Conosci le Promise di JavaScript?

> * **Metti alla prova le tue abilità JavaScript!** 🚀

1. **Controlla i Suggerimenti** (Grande pulsante, angolo in basso).
2. Prova il codice nella Console del tuo browser (prova la scorciatoia `F12` o cercala) o usa [repl.it](https://repl.it)*.
3. Sentiti libero di [twittarmi @justsml](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/). **Mi piacerebbe sentire la tua opinione!**

### 👇 Completa 9 Domande Qui Sotto👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Gestione degli errori"
  title="Molteplici `.catch` #1"
  options={[
    {text: 'stampa il messaggio una volta'},
    {text: 'stampa il messaggio due volte', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'il processo termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà l'output del seguente codice?
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
    Creiamo una Promise usando il costruttore, attivando immediatamente un errore con la callback `reject`.

    Poi i gestori `.catch` funzionano come `.addEventListener(event, callback)` del DOM o `.on(event, callback)` di Event Emitter, dove **possono essere aggiunte più callback di gestione.** Ognuna verrà chiamata con gli stessi argomenti.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Gestione degli Errori"
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
    Quale sarà l'output del seguente codice?
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
    Quando si utilizza il costruttore Promise, è necessario invocare i callback `resolve()` o `reject()`. Il costruttore Promise ignora il valore di ritorno dell'esecutore, quindi la Promise aggiuntiva creata con `Promise.reject()` non è concatenata a `p`. I due gestori sono allegati a `p`, che rimane in sospeso, mentre la Promise rifiutata restituita viene segnalata come non gestita dall'ambiente host.
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
    Quale sarà l'output per il seguente codice?
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
    Quando si concatenano `.then` e `.catch`, è utile pensarli come una serie di passaggi. Ogni `.then` riceve il valore restituito dal `.then` precedente (come suo argomento). Tuttavia, se il tuo "passaggio" incontra un errore, tutti i `.then` successivi verranno saltati fino a quando non si incontra un `.catch`. Se vuoi sovrascrivere un errore, tutto ciò che devi fare è restituire un valore non di errore. Può essere accessibile tramite qualsiasi `.then` successivo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="Gestione degli errori"
  title="Concatenare i `.catch`"
  options={[
    {text: 'stampa il messaggio di errore una volta', isAnswer: true},
    {text: 'stampa il messaggio di errore due volte'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'il processo termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà l'output del seguente codice?
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
    Quando si concatenano i `.catch`, ognuno gestisce solo gli errori lanciati nei precedenti passaggi `.then` o `.catch`. In questo esempio, il primo `.catch` restituisce il `console.log` che potrebbe essere accessibile solo aggiungendo un `.then()` dopo entrambi i `.catch`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Gestione degli errori"
  title="Più `.catch`'s"
  options={[
    {text: 'stampa il messaggio una volta'},
    {text: 'stampa il messaggio due volte'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'non stampa nulla', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà l'output del seguente codice?
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
    **Suggerimento:** I `.catch`'s possono essere usati per ignorare (o sovrascrivere) gli errori semplicemente restituendo un valore normale.

    Questo trucco funziona solo quando c'è un successivo `.then` per ricevere il valore.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Gestione dei Dati"
  title="Flusso tra i `.then`"
  options={[
    {text: 'stampa "Success!" e "SUCCESS!"'},
    {text: 'stampa "Success!"'},
    {text: 'stampa "SUCCESS!"', isAnswer: true},
    {text: 'non stampa nulla'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà l'output del seguente codice?
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
    **Suggerimento:** i `.then` passano i dati in sequenza, da `return value` al successivo `.then(value => /* handle value */)`.

    Un `return` è fondamentale per passare un valore al successivo `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Gestione dei Dati"
  title="Flusso tra i `.then`"
  options={[
    {text: 'print "SUCCESS!"'},
    {text: 'print "Success!"'},
    {text: 'print "SUCCESS!" and "SUCCESS!"', isAnswer: true},
    {text: 'non stampa nulla'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà l'output del seguente codice?
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
    {text: 'print "SUCCESS!"'},
    {text: 'print "Success!"'},
    {text: 'print "SUCCESS!" and "SUCCESS!"'},
    {text: 'prints `undefined`', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà l'output del seguente codice?
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
    **Suggerimento:** `.then` passa i dati in sequenza, dal `return value` al successivo `.then(value => /* gestisci value */)`.

    Un `return` è fondamentale per passare un valore al successivo `.then`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Gestione dei Dati"
  title="Flusso tra `.then` e `.catch`"
  options={[
    {text: 'stampa "Oh no!" e "I fallimenti!"'},
    {text: 'stampa "Oh no!"'},
    {text: 'stampa "I fallimenti!"', isAnswer: true},
    {text: 'stampa "in realtà, ha funzionato"'},
    {text: 'non stampa nulla'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà l'output del seguente codice?
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
