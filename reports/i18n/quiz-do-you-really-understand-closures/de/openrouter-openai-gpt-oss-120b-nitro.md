# Translation Candidate
- Slug: quiz-do-you-really-understand-closures
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-05--quiz-do-you-really-understand-closures/de/index.mdx
- Validation: passed
- Runtime seconds: 14.30
- Input tokens: 10945
- Output tokens: 6727
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.001638
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Quiz: Verstehst du JavaScript‑Closures wirklich?'
subTitle: 'Die meisten Entwickler glauben, sie tun es – liegen aber falsch.'
date: '2026-05-01'
modified: '2026-05-05'
tags:
  - javascript
  - closures
  - quiz
  - fundamentals
  - scope
  - advanced
category: Quiz
subCategory: JavaScript
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.85
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">Closures sind eines dieser Konzepte, von denen jeder JavaScript‑Entwickler *glaubt*, sie zu verstehen – bis zum Moment, in dem das nicht mehr zutrifft. Dieses Quiz deckt die Ränder dessen auf, was du tatsächlich weißt.</p>

Closures tauchen in Event‑Handlern, Factory‑Funktionen, React‑Hooks, Modul‑Mustern und praktisch überall sonst auf. Sie sind nicht exotisch. Sie sind das Gewebe, aus dem JavaScript besteht.

Die Fragen beginnen vernünftig und entfernen dann nach und nach die Dielen.

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Aufwärmen"
  title="Klassischer Zähler"
  options={[
    {text: '0, 0, 0'},
    {text: '0, 1, 2'},
    {text: '1, 2, 3', isAnswer: true},
    {text: 'ReferenceError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird hier ausgegeben?
    ```javascript
    function makeCounter() {
      let count = 0;
      return () => ++count;
    }
    const tick = makeCounter();
    console.log(tick(), tick(), tick());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `tick` schließt `count` ein. Jeder Aufruf erhöht und gibt die *gleiche* `count`‑Variable zurück. Die drei Aufrufe erzeugen `1, 2, 3`.

    Das Schlüsselwort: *gleiche*. `count` wird nicht in die Closure kopiert. Die Closure hält eine **lebende Referenz** auf die Variablenbindung. Das ist das ganze Ding.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Aufwärmen"
  title="Getrennte Closures"
  options={[
    {text: '1, 1', isAnswer: true},
    {text: '1, 2'},
    {text: '2, 2'},
    {text: '0, 0'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird hier ausgegeben?
    ```javascript
    function makeCounter() {
      let count = 0;
      return () => ++count;
    }
    const a = makeCounter();
    const b = makeCounter();
    console.log(a(), b());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Jeder Aufruf von `makeCounter()` erzeugt einen **neuen Ausführungskontext** mit einem eigenen frischen `count`. `a` und `b` schließen über *verschiedene* `count`‑Bindungen. Sie teilen keinen Zustand.

    Ergebnis: `1, 1`

    Deshalb werden Closures verwendet, um privaten Zustand aufzubauen – jede „Instanz“ ist unabhängig.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Die klassische Falle"
  title="var in einer Schleife"
  options={[
    {text: '0, 1, 2, 3, 4'},
    {text: '5, 5, 5, 5, 5', isAnswer: true},
    {text: '1, 2, 3, 4, 5'},
    {text: 'undefined x5'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird nach 100 ms geloggt?
    ```javascript
    for (var i = 0; i < 5; i++) {
      setTimeout(() => console.log(i), 100);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `var` ist funktionsbezogen. Es gibt exakt **ein** `i` — alle fünf Callbacks schließen über dieselbe Bindung. Wenn die Timeouts feuern, ist die Schleife beendet und `i` ist `5`.

    Fünf Callbacks. Ein `i`. Wert: `5`. Fünfmal geloggt.

    Die Lösung ist `let` (blockbezogen, neue Bindung pro Iteration) oder das Einwickeln in ein IIFE, um den aktuellen Wert zu erfassen:
    ```javascript
    for (let i = 0; i < 5; i++) {
      setTimeout(() => console.log(i), 100); // 0, 1, 2, 3, 4 ✓
    }
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Die klassische Falle"
  title="let behebt es (oder nicht?)"
  options={[
    {text: '0, 1, 2, 3, 4', isAnswer: true},
    {text: '5, 5, 5, 5, 5'},
    {text: '4, 4, 4, 4, 4'},
    {text: 'ReferenceError: i is not defined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Gleiche Schleife, anderes Schlüsselwort. Was wird geloggt?
    ```javascript
    for (let i = 0; i < 5; i++) {
      setTimeout(() => console.log(i), 100);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `let` in einer `for`-Schleife ist speziell. Die Spezifikation besagt: Jede Iteration erhält ihre eigene **neue Bindung** von `i`. Es ist, als würde die Schleife heimlich Folgendes tun:
    ```javascript
    { let i = 0; setTimeout(() => console.log(i), 100) }
    { let i = 1; setTimeout(() => console.log(i), 100) }
    // ...
    ```
    So schließen die fünf Callbacks über fünf unterschiedliche Variablen. Ergebnis: `0, 1, 2, 3, 4`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Closures & Objekte"
  title="Objektmutation"
  options={[
    {text: '{ x: 1 }, { x: 1 }'},
    {text: '{ x: 1 }, { x: 99 }'},
    {text: '{ x: 99 }, { x: 99 }', isAnswer: true},
    {text: '{ x: 99 }, { x: 1 }'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was gibt das aus?
    ```javascript
    function wrap() {
      const obj = { x: 1 };
      const getObj = () => obj;
      obj.x = 99;
      return getObj;
    }
    const get = wrap();
    console.log(get(), get());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Closure erfasst die **Bindung** `obj`, nicht einen Schnappschuss des Objekts. Das Objekt selbst wird nach der Erstellung der Closure mutiert – aber `obj` verweist weiterhin auf dieselbe Referenz. Beide Aufrufe geben dasselbe mutierte Objekt zurück: `{ x: 99 }`.

    Das überrascht Leute, die annehmen, Closures „einfrieren“ Werte. Tun sie nicht. Sie erfassen **Referenzen**.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Fortgeschritten"
  title="Veraltete Closure in React"
  options={[
    {text: 'Protokolliert den aktuellen Zähler bei jedem Klick'},
    {text: 'Protokolliert immer 0', isAnswer: true},
    {text: 'Protokolliert NaN'},
    {text: 'Das lässt sich nicht kompilieren'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welches Verhalten zeigt diese React-Komponente, wenn der Button mehrfach geklickt wird?
    ```jsx
    function Counter() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        const id = setInterval(() => {
          console.log('count is', count);
        }, 1000);
        return () => clearInterval(id);
      }, []); // empty deps

      return <button onClick={() => setCount(c => c + 1)}>
        Click ({count})
      </button>;
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Klassische veraltete Closure. Der `useEffect` läuft einmal (leeres Abhängigkeits‑Array) und erstellt ein Intervall, das über `count` schließt, wie er beim Mounten war: `0`. Egal wie oft du klickst, die Closure des Intervalls sieht nie den aktualisierten Wert.

    Der Button‑Label wird korrekt aktualisiert – das ist ein frischer Render. Aber `console.log` ist für immer bei `0` gefangen.

    Behebe das, indem du `count` zum Abhängigkeits‑Array hinzufügst (das Intervall neu erstellt) oder ein Ref benutzt:
    ```jsx
    const countRef = useRef(count);
    useEffect(() => { countRef.current = count; }, [count]);
    // then use countRef.current inside the interval
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Fortgeschritten"
  title="Modulmuster"
  options={[
    {text: '60', isAnswer: true},
    {text: 'TypeError: balance ist nicht definiert'},
    {text: '-40'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    Warte — lies genau. Was passiert eigentlich?
    ```javascript
    const bank = (() => {
      let balance = 0;
      return {
        deposit: (n) => (balance += n),
        withdraw: (n) => (balance -= n),
        getBalance: () => balance,
      };
    })();

    bank.deposit(100);
    bank.withdraw(40);
    console.log(bank.getBalance());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Antwort ist `60`.

    Das ist das **Modulmuster** — ein IIFE, das ein Objekt von Closures zurückgibt. Alle drei Methoden schließen über dieselbe `balance`‑Bindung. Es ist wirklich privat: Man kann von außen nicht auf `balance` zugreifen.
    ```javascript
    console.log(bank.balance); // undefined
    ```
    Vor Klassen war das *die* Methode, um Zustand in JavaScript zu kapseln. Du wirst es noch in alten Codebasen und Hilfsbibliotheken finden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Experte"
  title="Closure Speicherleck"
  options={[
    {text: 'Es gibt die Länge des Daten-Arrays aus'},
    {text: 'Es erzeugt ein Speicherleck', isAnswer: true},
    {text: 'Es wirft einen RangeError'},
    {text: 'Nichts Ungewöhnliches – das ist in Ordnung'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist das Problem bei diesem Code?
    ```javascript
    function attachHandler(element) {
      const data = new Array(100_000).fill('🔥');
      element.addEventListener('click', () => {
        console.log('clicked!', data.length);
      });
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Event‑Listener schließt `data` ein, sodass das Array so lange erreichbar bleibt, wie der Listener erreichbar ist. Wenn `element` langlebig ist und der Listener nie entfernt wird, bleibt auch dieses große Array erhalten.

    `element` befindet sich im DOM. Der Listener hält `data`. Der GC kann es nicht sammeln.

    Lösung: Erfasse große Daten nicht in langlebigen Listenern, es sei denn, du brauchst sie wirklich, und entferne Listener, wenn die zugehörige UI abgebaut wird:
    ```javascript
    function attachHandler(element) {
      const data = new Array(100_000).fill('🔥');
      // do something with data...

      const onClick = () => {
        console.log('clicked!');
      };

      element.addEventListener('click', onClick);
      return () => element.removeEventListener('click', onClick);
    }
    ```
    Modernes V8 ist dabei besser als früher. Aber in langlebigen SPAs mit vielen Event‑Listenern beißt dieses Muster immer noch Leute.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Experte"
  title="Die this-Falle"
  options={[
    {text: 'Dan, Dan'},
    {text: 'Dan, undefined'},
    {text: 'undefined, Dan'},
    {text: 'undefined, undefined', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird hier geloggt?
    ```javascript
    const user = {
      name: 'Dan',
      greetArrow: () => console.log(this?.name),
      greetRegular() {
        const inner = () => console.log(this?.name);
        inner();
      },
    };

    user.greetArrow();
    const fn = user.greetRegular;
    fn();
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Zwei subtile Fallen:

    **`greetArrow`**: Pfeilfunktionen besitzen kein eigenes `this`. Sie übernehmen `this` aus dem umgebenden lexikalischen Scope – hier also dem Modul-/Global‑Scope, nicht `user`. Deshalb ist `this?.name` `undefined`.

    **`fn()`**: `greetRegular` wird ohne Empfänger aufgerufen (`fn()` statt `user.greetRegular()`). Im Strict‑Mode ist `this` `undefined`. Im sloppy‑Mode ist es das globale Objekt. In beiden Fällen ist `this?.name` `undefined`.

    Hättest du `user.greetRegular()` direkt aufgerufen, würdest du `'Dan'` erhalten – weil dann `this` an `user` gebunden ist.

    Ergebnis: `undefined, undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Bonus"
  title="Memoisierung mittels Closure"
  options={[
    {text: 'Ruft expensive() 3 mal auf'},
    {text: 'Ruft expensive() 1 mal auf', isAnswer: true},
    {text: 'Ruft expensive() 2 mal auf'},
    {text: 'Wirft: Maximum call stack exceeded'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie oft wird `expensive()` tatsächlich aufgerufen?
    ```javascript
    function memoize(fn) {
      const cache = new Map();
      return (arg) => {
        if (cache.has(arg)) return cache.get(arg);
        const result = fn(arg);
        cache.set(arg, result);
        return result;
      };
    }

    let calls = 0;
    const expensive = (n) => { calls++; return n * 2; };
    const fast = memoize(expensive);

    fast(5);
    fast(5);
    fast(5);
    console.log(calls);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die memoisierten Funktion schließt `cache` ein. Der erste Aufruf (`fast(5)`) verfehlt den Cache, ruft `expensive` auf und speichert das Ergebnis. Der zweite und dritte Aufruf treffen den Cache und geben sofort zurück.

    `calls` ist `1`.

    Das ist Closure‑Arbeit. `cache` ist privat (kann von außen `memoize` nicht erreicht werden), persistent (existiert solange `fast` existiert) und wird über alle Aufrufe von `fast` hinweg geteilt.
  </div>
  </slot>
</Challenge>

</QuizUI>

Wie hast du abgeschnitten?

- **9–10**: Du kennst Closures wirklich gut. Wahrscheinlich ein gruseliger Pair‑Programming‑Partner.
- **6–8**: Solide. Die Fragen zu stale Closures und `this` haben dich ins Stolpern gebracht – das ist ehrlich.
- **3–5**: Du verstehst das Grundkonzept, aber die Randfälle sind noch unscharf. Lies dir die MDN‑Dokumentation zur Scope‑Kette durch.
- **0–2**: Du dachtest, du wüsstest etwas über Closures. Jetzt weißt du es wirklich. Genau das ist das Ziel.

Der stale Closure in React (#6) und die `this`‑Falle (#8) sind die, die echte Produktionsbugs auslösen. Wenn dir das unbekannt war, solltest du sie noch einmal anschauen – sie tauchen in Code‑Reviews häufiger auf als jedes andere Closure‑Problem.
````
