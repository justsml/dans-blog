# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 8.96
- Input tokens: 8511
- Output tokens: 5150
- Thinking tokens: unknown
- Cached input tokens: 2688
- Cache write tokens: 0
- Estimated cost: $0.001259
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2019-11-26--javascript-promises-quiz/it/index.mdx reports/i18n/javascript-promises-quiz/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Quiz:9 domande su Promise JavaScript'
subTitle: Mai più perdere una promise!
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


## Conosci le JavaScript Promise?

> * **Metti alla prova le tue abilità JavaScript!** 🚀

1. **Controlla gli Hint** (Grande pulsante, angolo in basso).
2. Prova il codice nella Console del browser (usa la scorciatoia `F12` o cercala) o utilizza [repl.it](https://repl.it)*.
3. Sentiti libero di [twittare a me @justsml](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/). **Mi piacerebbe conoscere il tuo parere!**

### 👇 Completa le 9 domande qui sotto👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Gestione degli errori"
  title="Multipli`.catch`'s #1"
  options={[
    {text: 'stampa il messaggio una volta'},
    {text: 'stampa il messaggio due volte', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'il processo termina'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del codice seguente?
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
    Creiamo una Promise usando il metodo costruttore, generando un errore immediatamente con la callback `reject`.

    Poi i gestori `.catch` funzionano come `.addEventListener(event, callback)` del DOM o `.on(event, callback)` di Event Emitter, dove **possono essere aggiunti più callback gestori**. Ognuno verrà chiamato con gli stessi argomenti.
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
    Qual sarà l'output del codice seguente?
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
    Quando si usa il costruttore `Promise` è necessario invocare una delle callback `resolve()` o `reject()`. Il costruttore `Promise` ignora il valore di ritorno dell'esecutore, quindi la Promise aggiuntiva creata con `Promise.reject()` non è concatenata a `p`. I due handler sono collegati a `p`, che rimane in stato pending, mentre la Promise rifiutata restituita viene segnalata come non gestita dall'ambiente host.
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="Gestione degli errori"
  title="Catena di `.then` e `.catch`'s"
  options={[
    {text: 'stampa l\'errore e `undefined`', isAnswer: true},
    {text: 'stampa l\'errore due volte'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del codice seguente?
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
    Quando si concatenano `.then` e `.catch` è utile pensarli come una serie di passaggi. Ogni `.then` riceve il valore restituito dal `.then` precedente (come suo argomento). Tuttavia, se il tuo "passaggio" ha generato un errore, tutti i successivi "passaggi" `.then` verranno saltati fino a incontrare un `.catch`. Se vuoi sovrascrivere un errore, basta restituire un valore non di errore. Può essere accessibile da qualsiasi `.then` successivo.
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
    Qual sarà l'output del codice seguente?
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
    Quando si concatenano i `.catch`, ognuno gestisce solo gli errori lanciati nei precedenti "passaggi" di `.then` o `.catch`. In questo esempio il primo `.catch` restituisce il `console.log`, che può essere raggiunto solo aggiungendo un `.then()` dopo entrambi i `.catch`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Gestione degli errori"
  title="Multipli `.catch`"
  options={[
    {text: 'stampa il messaggio una volta'},
    {text: 'stampa il messaggio due volte'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'nulla viene stampato', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà l'output del codice seguente?
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
    **Suggerimento:** `.catch` può essere usato per ignorare (o sovrascrivere) gli errori semplicemente restituendo un valore normale.

    Questo trucco funziona solo quando c'è un `.then` successivo a ricevere il valore.
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
    Qual sarà l'output del codice seguente?
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
    **Hint:** `.then` passano i dati in sequenza, dal `return value` al successivo `.then(value => /* gestisci il valore */)`.

    Un `return` è fondamentale per passare un valore al prossimo `.then`.
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
    Qual sarà l'output del codice seguente?
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
    Qual sarà l'output del codice seguente?
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
    **Suggerimento:** i `.then` passano i dati in sequenza, dal `return value` al successivo `.then(value => /* gestisci il valore */)`.

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
    {text: 'non stampa nulla'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà l'output del codice seguente?
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
