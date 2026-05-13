# Translation Candidate
- Slug: quiz-do-you-know-esnext
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-31--quiz-do-you-know-esnext/de/index.mdx
- Validation: passed
- Runtime seconds: 26.59
- Input tokens: 8675
- Output tokens: 8482
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002730
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: Beweise deine hervorragenden JavaScript-Fähigkeiten!
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


### Kennen Sie sich mit ES2015 bis ES2022 aus?

* **Beweisen Sie Ihre JavaScript-Kenntnisse!** 🚀
* Kein Login oder Anmeldung erforderlich. ✨
* Multiple-Choice. 🤖 ... _Wie schwer kann das schon sein, oder?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ES2020"
  title="Null-Koaleszenz"
  options={[
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Welchen Wert hat `result`?
    ```js
    console.log(null ?? 100);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Null-Koaleszenz-Operator (`??`) gibt das rechte Operand (`b`) zurück, wenn das linke Operand (`a`) `null` oder `undefined` ist. In diesem Fall ist `a` `null`, also ist `result` `100`.
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
    Welches Ergebnis liefert der folgende Code?
    ```js
    const value = false;
    const defaultVal = 42;
    console.log(value ?? defaultVal);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Null-Koaleszenz-Operator (`??`) betrachtet falsche Werte wie `false` als gültige Werte. Da `value` `false` ist, wird dieser als gültiger Wert betrachtet und zurückgegeben.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Optionale Chaining"
  title="Optionale Chaining"
  options={[
    {text: 'undefined', isAnswer: true},
    {text: 'Fehler: Cannot read property of undefined'},
    {text: 'null'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist die Ausgabe des folgenden Codes?
    ```js
    const obj = { foo: null };
    const result = obj.foo?.bar;
    console.log(result);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der optionale Chaining-Operator (`?.`) beendet die Auswertung, wenn die linke Seite `null` oder `undefined` ist. Da `obj.foo` `null` ist, ergibt `obj.foo?.bar` `undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="BigInt"
  title="Verwendung von BigInt"
  options={[
    {text: 'TypeError: Cannot mix BigInt and number'},
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
    BigInt-Werte werden erstellt, indem `n` an eine Zahl angehängt wird. BigInt-Werte können nicht mit regulären Zahlen in arithmetischen Operationen gemischt werden. Hier sind beide Werte BigInt, also funktioniert die Multiplikation, wodurch `84n` entsteht.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Dynamischer Import"
  title="Dynamischer Import-Syntax"
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
    Was wird hier geloggt?
    ```js
    const modulePromise = import('./myModule.js');
    console.log(typeof modulePromise);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `import()`-Funktion gibt eine `Promise` zurück, die sich auf das Modulobjekt auflöst. Da `Promise`-Instanzen Objekte sind, wird `typeof modulePromise` `'object'` ausgeben.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Promise.allSettled"
  title="Promise.allSettled"
  options={[
    {text: 'erfüllt: Erfolg', isAnswer: true},
    {text: 'Abgelehnt: Fehler'},
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
    `Promise.allSettled` gibt ein Array von Objekten zurück, die das Ergebnis jedes Versprechens beschreiben. Das erste Versprechen ist `erfüllt` mit dem Wert `'success'`, also wird die Log-Anweisung `erfüllt: Erfolg` ausgeben.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="String.matchAll"
  title="String.matchAll-Nutzung"
  options={[
    {text: 'Array mit Übereinstimmungen'},
    {text: 'Iterator mit Übereinstimmungen', isAnswer: true},
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
    `String.matchAll` gibt einen Iterator mit Übereinstimmungen zurück, nicht ein Array. Dieser Iterator kann verwendet werden, um alle übereinstimmenden Gruppen aus einer Zeichenkette zu erhalten.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Import-Meta"
  title="Verwendung von import.meta"
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
    `import.meta` ist ein Objekt, das Metadaten zum aktuellen Modul enthält. Die Eigenschaft `import.meta.url` stellt die URL des aktuellen Moduls dar, die verwendet werden kann, um Informationen darüber zu erhalten, wo das Skript ausgeführt wird.
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
    Welchen Wert hat `a` nach der logischen Zuweisung?
    ```js
    let a = null;
    a ||= 10;
    console.log(a);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die logische ODER-Zuweisung (`||=`) weist den rechten Wert zu, wenn der linke Wert falschwertig ist (`null`, `undefined`, `0`, `false` usw.). Da `a` `null` ist, wird ihm der Wert `10` zugewiesen.
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
    Welchen Wert hat `b` nach der Nullish-Zuweisung?
    ```js
    let b = null;
    b ??= 10;
    console.log(b);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Nullish-Coalescing-Zuweisung (`??=`) weist den rechten Wert zu, wenn der linke Wert `null` oder `undefined` ist. Da `b` `null` ist, wird ihm der Wert `10` zugewiesen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="WeakRef"
  title="Verwendung von WeakRef"
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
    `WeakRef` stellt eine schwache Referenz auf ein Objekt bereit, die es ermöglicht, dass das Objekt gesammelt wird, wenn keine weiteren starken Referenzen bestehen. Da `obj` hier immer noch stark referenziert wird, gibt `deref()` das ursprüngliche Objekt zurück. Wenn das Ziel bereits freigegeben worden wäre, würde `deref()` `undefined` zurückgeben.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
