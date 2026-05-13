# Translation Candidate
- Slug: quiz-do-you-know-esnext
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-do-you-know-esnext/de/index.mdx
- Validation: passed
- Runtime seconds: 13.13
- Input tokens: 9690
- Output tokens: 4923
- Thinking tokens: unknown
- Cached input tokens: 3840
- Cache write tokens: 0
- Estimated cost: $0.001264
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Quiz: Kennst du modernes JavaScript?'
subTitle: Beweise deine JavaScript‑Skills!
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


### Kennst du den Unterschied zwischen ES2015 und ES2022?

* **Zeig, was du in JavaScript drauf hast!** 🚀
* Kein Login oder Registrierung nötig. ✨
* Multiple‑Choice. 🤖 … _Wie schwer kann das schon sein, oder?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ES2020"
  title="Null‑Koaleszenz"
  options={[
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet der Wert von `result`?
    ```js
    console.log(null ?? 100);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Null‑Koaleszenz‑Operator (`??`) gibt den rechten Operanden (`b`) zurück, wenn der linke Operanden (`a`) `null` oder `undefined` ist. In diesem Fall ist `a` `null`, also ist `result` `100`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ES2020"
  title="Null-Koaleszenz"
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
    Was wird die Ausgabe des folgenden Codes sein?
    ```js
    const value = false;
    const defaultVal = 42;
    console.log(value ?? defaultVal);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Null‑Koaleszenz‑Operator (`??`) behandelt falsy‑Werte wie `false` als gültige Werte. Da `value` `false` ist, wird er als gültiger Wert angesehen und zurückgegeben.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Optionale Verkettung"
  title="Optionale Verkettung"
  options={[
    {text: 'undefined', isAnswer: true},
    {text: 'Error: Cannot read property of undefined'},
    {text: 'null'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was gibt der folgende Code aus?
    ```js
    const obj = { foo: null };
    const result = obj.foo?.bar;
    console.log(result);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der optionale Verkettungsoperator (`?.`) stoppt die Auswertung, wenn die linke Seite `null` oder `undefined` ist. Da `obj.foo` `null` ist, evaluiert `obj.foo?.bar` zu `undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="BigInt"
  title="BigInt-Verwendung"
  options={[
    {text: 'TypeError: BigInt und number dürfen nicht gemischt werden'},
    {text: '42n'},
    {text: '84n', isAnswer: true},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist die Ausgabe des folgenden Codes?
    ```js
    const a = 42n;
    const result = a * 2n;
    console.log(result);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    BigInt‑Werte werden erzeugt, indem man an eine Zahl `n` anhängt. Man kann BigInt nicht mit normalen Zahlen in arithmetischen Operationen mischen. Hier sind beide Werte BigInt, sodass die Multiplikation funktioniert und `84n` ergibt.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Dynamischer Import"
  title="Dynamische Import‑Syntax"
  options={[
    {text: 'SyntaxError'},
    {text: 'Promise'},
    {text: 'Module'},
    {text: 'Objekt', isAnswer: true},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird hier ausgegeben?
    ```js
    const modulePromise = import('./myModule.js');
    console.log(typeof modulePromise);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `import()`‑Funktion gibt ein `Promise` zurück, das zum Modul‑Objekt aufgelöst wird. Da `Promise`‑Instanzen Objekte sind, gibt `typeof modulePromise` `'object'` aus.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Promise.allSettled"
  title="Promise.allSettled"
  options={[
    {text: 'erfüllt: success', isAnswer: true},
    {text: 'Abgelehnt: error'},
    {text: 'Ausstehend'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird das Ergebnis des folgenden Codes sein?
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
    `Promise.allSettled` gibt ein Array von Objekten zurück, die das Ergebnis jeder Promise beschreiben. Die erste Promise ist `fulfilled` mit dem Wert `'success'`, daher wird die Log‑Anweisung `fulfilled: success` ausgeben.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="String.matchAll"
  title="String.matchAll Verwendung"
  options={[
    {text: 'Array von Treffern'},
    {text: 'Iterator von Treffern', isAnswer: true},
    {text: 'Fehler: Ungültiger Aufruf'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was gibt `str.matchAll()` zurück?
    ```js
    const str = 'foo1bar2baz3';
    const matches = str.matchAll(/\d/g);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `String.matchAll` gibt einen Iterator von Treffern zurück, nicht ein Array. Dieser Iterator kann verwendet werden, um alle passenden Gruppen aus einem String zu erhalten.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Import-Meta"
  title="Import-Meta-Verwendung"
  options={[
    {text: 'URL des aktuellen Moduls', isAnswer: true},
    {text: 'Aktueller Zeitstempel'},
    {text: 'undefined'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was stellt `import.meta.url` dar?
    ```js
    console.log(import.meta.url);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `import.meta` ist ein Objekt, das Metadaten über das aktuelle Modul enthält. Die Eigenschaft `import.meta.url` stellt die URL des aktuellen Moduls dar und kann verwendet werden, um Informationen darüber zu erhalten, wo das Skript ausgeführt wird.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Logische Zuweisung"
  title="Logische Zuweisung"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet der Wert von `a` nach der logischen Zuweisung?
    ```js
    let a = null;
    a ||= 10;
    console.log(a);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die logische ODER‑Zuweisung (`||=`) weist den rechten Wert zu, wenn der linke Wert falsy ist (`null`, `undefined`, `0`, `false` usw.). Da `a` `null` ist, wird ihr der Wert `10` zugewiesen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Logische Nullish-Zuweisung"
  title="Logische Nullish-Zuweisung"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet der Wert von `b` nach der Nullish‑Zuweisung?
    ```js
    let b = null;
    b ??= 10;
    console.log(b);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Nullish‑Coalescing‑Zuweisung (`??=`) weist den rechten Wert zu, wenn der linke Wert `null` oder `undefined` ist. Da `b` `null` ist, wird ihr der Wert `10` zugewiesen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="WeakRef"
  title="WeakRef-Verwendung"
  options={[
    {text: 'ReferenceError'},
    {text: '{ data: \'important\' }', isAnswer: true},
    {text: 'null'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was bietet `WeakRef`?
    ```js
    const obj = { data: 'important' };
    const ref = new WeakRef(obj);
    console.log(ref.deref());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `WeakRef` liefert eine schwache Referenz auf ein Objekt, wodurch das Objekt vom Garbage Collector freigegeben werden kann, wenn keine anderen Referenzen mehr existieren. Da `obj` hier noch stark referenziert wird, gibt `deref()` das ursprüngliche Objekt zurück. Wäre das Ziel bereits freigegeben, würde `deref()` `undefined` zurückgeben.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
