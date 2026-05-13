# Translation Candidate
- Slug: quiz-do-you-know-esnext
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-31--quiz-do-you-know-esnext/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 5.46
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-do-you-know-esnext --locale it --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
title: 'Quiz: Conosci ilJavaScript Moderno?'
subTitle: Dimostra le tue abilità JavaScript!
label: ES2019+ Features
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2024-10-31'
modified: '2024-11-08'
tags:
  - quiz
  - javascript
  - intro
  - esnext
  - features
  - intermediate
cover_full_width: ../christopher-burns-8KfCR12oeUM-unsplash-wide.webp
cover_mobile: ../christopher-burns-8KfCR12oeUM-unsplash-square.webp
cover_icon: ../christopher-burns-8KfCR12oeUM-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


### Conosci la differenza tra ES2015 e ES2022?

* **Dimostra le tue abilità JavaScript!** 🚀
* Nessun login o registrazione richiesti. ✨
* Scelta multipla. 🤖 … _Quanto può essere difficile, eh?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ES2020"
  title="Coalescenza Null"
  options={[
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è il valore di `result`?
    ```js
        console.log(null ?? 100);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'operatore di null coalescing (`??`) restituisce l'operando a destra (`b`) se quello a sinistra (`a`) è `null` o `undefined`. In questo caso, `a` è `null`, quindi `result` è `100`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ES2020"
  title="Coalescenza Null"
  options={[
    {text: 'false', isAnswer: true},
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà l'output del codice seguente?
    ```js
        const value = false;
        const defaultVal = 42;
        console.log(value ?? defaultVal);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'operatore di coalescenza null (`??`) considera i valori falsy come `false` come valori validi. Poiché `value` è `false`, viene considerato un valore valido e restituito.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Chaining Opzionale"
  title="Chaining Opzionale"
  options={[
    {text: 'undefined', isAnswer: true},
    {text: 'Errore: Impossibile leggere la proprietà di undefined'},
    {text: 'null'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è l'output del seguente codice?
    ```js
        const obj = { foo: null };
        const result = obj.foo?.bar;
        console.log(result);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'operatore di optional chaining (`?.`) interrompe la valutazione se il lato sinistro è `null` o `undefined`. Poiché `obj.foo` è `null`, `obj.foo?.bar` valuta a `undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="BigInt"
  title="Uso di BigInt"
  options={[
    {text: 'TypeError: Impossibile mescolare BigInt e number'},
    {text: '42n'},
    {text: '84n', isAnswer: true},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è l'output del codice seguente?
    ```js
        const a = 42n;
        const result = a * 2n;
        console.log(result);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    I valori BigInt si creano aggiungendo `n` a un numero. Non puoi mescolare BigInt con numeri normali nelle operazioni aritmetiche. Qui entrambi i valori sono BigInt, quindi la moltiplicazione funziona, restituendo `84n`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Import Dinamico"
  title="Sintassi di Import Dinamico"
  options={[
    {text: 'SyntaxError'},
    {text: 'Promise'},
    {text: 'Module'},
    {text: 'object', isAnswer: true},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa stampa questo?
    ```js
        const modulePromise = import('./myModule.js');
        console.log(typeof modulePromise);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La funzione `import()` restituisce una `Promise` che si risolve nell'oggetto modulo. Poiché le istanze di `Promise` sono oggetti, `typeof modulePromise` stampa `'object'`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Promise.allSettled"
  title="Promise.allSettled"
  options={[
    {text: 'risolto: success', isAnswer: true},
    {text: 'Rifiutato: error'},
    {text: 'In attesa'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà il risultato del codice seguente?
    ```js
        const promises = [
          Promise.resolve('success'),
          Promise.reject('error')
        ];
        Promise.allSettled(promises).then(results => {
          console.log(results[0].status + ': ' + results[0].value);
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Promise.allSettled` restituisce un array di oggetti che descrivono l'esito di ciascuna promessa. La prima promessa è `fulfilled` con il valore `'success'`, quindi l'istruzione di log stamperà `fulfilled: success`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="String.matchAll"
  title="Uso di String.matchAll"
  options={[
    {text: 'Array di corrispondenze'},
    {text: 'Iteratore di corrispondenze', isAnswer: true},
    {text: 'Errore: chiamata non valida'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa restituisce `str.matchAll()`?
    ```js
        const str = 'foo1bar2baz3';
        const matches = str.matchAll(/\d/g);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `String.matchAll` restituisce un iteratore di corrispondenze, non un array. Questo iteratore può essere usato per ottenere tutti i gruppi corrispondenti da una stringa.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Import Meta"
  title="Uso di Import Meta"
  options={[
    {text: 'URL del modulo corrente', isAnswer: true},
    {text: 'Timestamp corrente'},
    {text: 'undefined'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa rappresenta `import.meta.url`?
    ```js
        console.log(import.meta.url);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `import.meta` è un oggetto che contiene i metadati del modulo corrente. La proprietà `import.meta.url` rappresenta l'URL del modulo corrente, che può essere usata per ottenere informazioni su dove viene eseguito lo script.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Assegnazione Logica"
  title="Assegnazione Logica"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è il valore di `a` dopo l'assegnazione logica?
    ```js
        let a = null;
        a ||= 10;
        console.log(a);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'operatore di assegnazione OR logico (`||=`) assegna il valore a destra se quello a sinistra è falsy (`null`, `undefined`, `0`, `false`, ecc.). Poiché `a` è `null`, gli viene assegnato il valore `10`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Assegnazione Nullish Logica"
  title="Assegnazione Nullish Logica"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è il valore di `b` dopo l'assegnazione nullish?
    ```js
        let b = null;
        b ??= 10;
        console.log(b);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'assegnazione di coalescenza nullish (`??=`) assegna il valore a destra se quello a sinistra è `null` o `undefined`. Poiché `b` è `null`, gli viene assegnato il valore `10`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="WeakRef"
  title="Uso di WeakRef"
  options={[
    {text: 'ReferenceError'},
    {text: '{ data: \'important\' }', isAnswer: true},
    {text: 'null'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa fornisce `WeakRef`?
    ```js
        const obj = { data: 'important' };
        const ref = new WeakRef(obj);
        console.log(ref.deref());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `WeakRef` fornisce un riferimento debole a un oggetto, il che permette al garbage collector di liberarlo se non esistono altre referenze. Poiché `obj` è ancora fortemente referenziato qui, `deref()` restituisce l'oggetto originale. Se il target fosse stato recuperato, `deref()` restituirebbe `undefined`.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
