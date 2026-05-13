# Translation Candidate
- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 3.94
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-js-interfaces-symbols-and-enumerables --locale it --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Simboli e Enumerabili'
subTitle: Conosci le parti meno famose di ES2015?
label: Symbols
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-10-31'
modified: '2024-11-07'
tags:
  - quiz
  - javascript
  - interfaces
  - symbols
  - enumerables
cover_full_width: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash.webp
cover_mobile: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash_w300.webp
cover_icon: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash_w300.webp
---
## Quiz: Interfacce JavaScript, Symbol e Enumerabili

> * **Metti alla prova le tue abilità JavaScript!** 🚀  
> * Nessun login o registrazione richiesti. ✨  
> * Scelta multipla. 🤖 … _Quanto può essere difficile, vero?_  

import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Interfacce Avanzate"
  title="Getter vs Accesso Diretto alla Proprietà"
  options={[
    {text: 'Usa un ciclo'},
    {text: 'Chiama un metodo per accedere al valore'},
    {text: 'Accedi al valore direttamente', isAnswer: true},
    {text: 'Genera un errore'},
  ]}
>
  <slot name="question">
  <div className="question">
    Come dovresti accedere a una proprietà di un oggetto JavaScript che utilizza un metodo getter?
    ```js
        const obj = {
          get val() {
            return 'got it!';
          }
        };
        console.log(obj.val);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    In JavaScript, un getter può essere accesso come una proprietà normale. Non è necessario chiamarlo come una funzione.
    In questo esempio, accedere a `obj.val` direttamente invoca il metodo getter e restituisce `got it!`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Interfacce Avanzate"
  title="Uso dei Symbol nelle Chiavi degli Oggetti"
  options={[
    {text: 'Usare un Symbol', isAnswer: true},
    {text: 'Usare una stringa'},
    {text: 'Usare un numero'},
    {text: 'Usare un oggetto come chiave'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è il modo corretto per creare una chiave di proprietà veramente unica per un oggetto JavaScript?
    ```js
        const uniqueKey = Symbol('myUniqueKey');
        const obj = {
          [uniqueKey]: 'unique value'
        };
        console.log(obj[uniqueKey]);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    I Symbol sono un tipo primitivo unico e immutabile che può essere usato come chiave per le proprietà degli oggetti. Questo aiuta a evitare collisioni di nomi, soprattutto in grandi codebase o quando si scrivono librerie riutilizzabili.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Interfacce Avanzate"
  title="Proprietà Enumerabili"
  options={[
    {text: 'Genera un errore'},
    {text: 'No, non lo farà'},
    {text: 'Dipende dal tipo di valore'},
    {text: 'Sì, verrà elencata', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    La proprietà `age` verrà elencata durante un'iterazione `for...in`?
    ```js
        const person = {};
        Object.defineProperty(person, 'age', {
          value: 25,
          enumerable: true
        });
        for (let key in person) {
          console.log(key);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La proprietà `enumerable` in `Object.defineProperty()` controlla se la proprietà apparirà nei metodi di enumerazione come `for...in`. In questo esempio, poiché `enumerable: true`, la proprietà `age` verrà elencata durante l'iterazione.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Lavorare con gli oggetti"
  title="Enumerabilità predefinita con Object.defineProperty()"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Depends on context'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è l'enumerabilità predefinita di una proprietà quando si usa `Object.defineProperty()` senza specificare `enumerable`?
    ```js
        const car = {};
        Object.defineProperty(car, 'make', {
          value: 'Toyota'
        });
        console.log(Object.keys(car));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Quando usi `Object.defineProperty()` senza specificare `enumerable`, il valore predefinito è `false`. Ciò significa che la proprietà `make` non comparirà in `Object.keys()` né in altri metodi di enumerazione.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Interfacce Avanzate"
  title="Simboli Unici"
  options={[
    {text: 'Dipende dalle loro descrizioni'},
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'Genera un errore'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale sarà il risultato del confronto seguente?
    ```js
        const sym1 = Symbol('id');
        const sym2 = Symbol('id');
        console.log(sym1 === sym2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ogni chiamata a `Symbol()` crea un valore unico e immutabile, anche se la descrizione è identica. In questo caso, `sym1` e `sym2` sono simboli diversi, quindi il confronto restituisce `false`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Interfacce avanzate"
  title="Simboli come chiavi non enumerabili"
  options={[
    {text: 'No, non lo farà', isAnswer: true},
    {text: 'Sì, verrà elencata'},
    {text: 'Dipende dal metodo di iterazione'},
    {text: 'Genera un errore'},
  ]}
>
  <slot name="question">
  <div className="question">
    La proprietà indicizzata da Symbol verrà elencata durante un'iterazione `for...in`?
    ```js
        const sym = Symbol('uniqueKey');
        const obj = {
          [sym]: 'symbol value',
          regularKey: 'regular value'
        };
        for (let key in obj) {
          console.log(key);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le proprietà indicizzate da Symbol possono avere il proprio flag `enumerable`, ma `for...in` e `Object.keys()` visitano solo le proprietà enumerabili con chiave stringa. In questo esempio, verrà elencata solo `regularKey`, non la proprietà indicizzata da Symbol.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Interfacce Avanzate"
  title="Recupera tutte le chiavi Symbol"
  options={[
    {text: 'Object.keys()'},
    {text: 'Symbol.keys()'},
    {text: 'Object.symbols()'},
    {text: 'Object.getOwnPropertySymbols()', isAnswer: true},
    {text: 'Object.entries()'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale metodo può essere usato per recuperare tutte le chiavi Symbol di un oggetto?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il metodo `Object.getOwnPropertySymbols()` viene usato per recuperare le chiavi di proprietà Symbol proprie di un oggetto.
    ```js
        const sym1 = Symbol('id');
        const sym2 = Symbol('name');
        const obj = {
          [sym1]: 'symbol value',
          [sym2]: 'another symbol value'
        };
        console.log(Object.getOwnPropertySymbols(obj));
        // [Symbol(id), Symbol(name)]
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
