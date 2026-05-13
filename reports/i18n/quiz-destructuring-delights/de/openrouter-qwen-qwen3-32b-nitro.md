# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 4.61
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-destructuring-delights --locale de --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Destrukturierungsfreude'
subTitle: Bist du ein Destrukturierungs‑Meister?
label: Destructuring
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-11-12'
modified: '2024-11-16'
tags:
  - quiz
  - intro
  - javascript
  - es2015
  - destructuring
  - beginner
  - intermediate
cover_full_width: ../boxes-of-nesting-dolls.webp
cover_mobile: ../boxes-of-nesting-dolls-square.webp
cover_icon: ../boxes-of-nesting-dolls-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

{/* Bist du ein Meister des Destructuring?<br/> */}
<p class="inset">Oder ist es deine <em>Symphonie der Zerstörung?</em></p>

Dieses Quiz prüft dein Wissen über Destructuring in JavaScript: von der „einfachen“ Objektsyntax über verschachteltes Destructuring bis hin zu Default‑Werten. Zusätzlich gibt es Bonusfragen zu TypeScript und Inline‑Typen!

Leg gleich mit dem Aufwärmen los – zeig, dass du Destructuring beherrschst! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Aufwärmen: Objekte"
  title="Grundlegendes Objekt-Destructuring"
  options={[
    {text: 'Name: Dan Levy, Alter: 20'},
    {text: 'Name: Dan Levy, Alter: 40'},
    {text: 'Name: Dan Levy, Alter: Infinity'},
    {text: 'Name: Dan Levy, Alter: undefined', isAnswer: true},
    {text: 'Fehler: Cannot read property \'age\''},
    {text: 'Name: undefined, Alter: 40'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird dieser Code ausgeben?
    ```js
    const person = {
      name: 'Dan Levy',
      location: 'Cape Town',
    };
    const { name, age } = person;
    console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Eigenschaft `age` existiert nicht auf `person`, also wird `age` `undefined` sein. Auf keinen Fall `Infinity` 😅

    Das Ergebnis ist:
    ```plaintext
    Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Aufwärmen: Arrays"
  title="Standardwert bei Objekt-Destrukturierung"
  options={[
    {text: 'Name: Dan Levy, Alter: NaN'},
    {text: 'Name: Dan Levy, Alter: null'},
    {text: 'Name: Dan Levy, Alter: undefined', isAnswer: true},
    {text: 'Name: Dan Levy, Alter: 40'},
    {text: 'Fehler: Kann Eigenschaft \'age\' nicht destrukturieren'},
    {text: 'SyntaxError: Unerwartetes Token \',\''},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht dieser Code?
    ```js
    const person = [ 'Dan Levy', 'Cape Town' ];
    const [ name, origin, age ] = person;
    console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Variable `age` ist im `tuple`‑Array nicht vorhanden, also wird sie `undefined` sein.

    Das führt zu:
    ```plaintext
    Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Verschachteltes Destructuring"
  title="Verschachteltes Destructuring"
  options={[
    {text: 'Vorname: Dan, Stadt: Denver'},
    {text: 'Vorname: undefined, Stadt: Denver'},
    {text: 'Fehler: Kann Eigenschaft \'first\' nicht lesen'},
    {text: 'Vorname: Dan, Stadt: undefined'},
    {text: 'Fehler', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie wäre es mit etwas verschachteltem Destructuring?
    ```js
    'use strict';
    const person = {
      name: { first: 'Dan' },
      address: { city: 'Denver' },
    };
    const {
      name: { first },
      address: { city },
      birth: { place },
    } = person;
    console.log(
      `First: ${first}, City: ${place}`,
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Eigenschaft `birth: { place }` existiert nicht auf `person`, daher wird ein Fehler ausgelöst.
    Eine Lösung ist, Standardwerte für verschachtelte Eigenschaften anzugeben.

    Beim Zugriff auf verschachtelte Eigenschaften – sei vorsichtig – da die Fehler schwer zu erkennen sein können. Und Fehlermeldungen variieren zwischen Browsern und anderen Plattformen, was das Debuggen etwas schwieriger macht.

    In modernem Chrome: `TypeError: Cannot read properties of undefined (reading 'place')`

    In Node ist dies ebenfalls ein `TypeError`, weil JavaScript versucht, `place` aus `undefined` zu destrukturieren, bevor `place` überhaupt gelesen wird.

    Der genaue Wortlaut variiert zwischen Browsern und Laufzeiten.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Standardwerte"
  title="Standardwerte bei Objekt-Destrukturierung"
  options={[
    {text: 'Hallo Dan aus Unbekannt'},
    {text: 'Hallo Dan aus Denver'},
    {text: 'Hallo Unbekannt aus Unbekannt'},
    {text: 'Hallo Unbekannt aus Denver'},
    {text: 'Fehler', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Jetzt mit ein paar Standardwerten, was passiert?
    ```js
    'use strict';
    const person = {
      name: { first: 'Dan' },
      address: { city: 'Denver' },
    };
    const {
      name: { first = 'Unknown' },
      birth: { place = 'Unknown' },
    } = person;
    console.log(
      `Hi ${first} from ${place}`,
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `birth`‑Eigenschaft existiert nicht auf `person`, also benötigt das gesamte Objekt immer noch einen Standardwert, nicht nur die verschachtelte Eigenschaft. Im Grunde fehlt hier ein ` = {}`‑Standard.

    So wie das geschrieben ist, bedeutet es: "wenn `person.birth` `undefined` ist, dann ist `place` `Unknown`". Aber `person.birth` ist `undefined`, also versucht man, `undefined` zu destrukturieren, was zu einem Fehler führt.
    ```plaintext
    In modern Chrome: `TypeError: Cannot read properties of undefined (reading 'place')`

    In Node, this is also a `TypeError` because JavaScript tries to destructure `place` from `undefined`.

    Exact wording varies between browsers and runtimes.
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Standardwerte"
  title="Standardwerte bei Objekt-Destrukturierung"
  options={[
    {text: 'Hallo Dan aus Denver'},
    {text: 'Hallo Dan aus Johannesburg'},
    {text: 'Hallo Dan aus Unbekannt', isAnswer: true},
    {text: 'Hallo Unbekannt aus Unbekannt'},
    {text: 'Hallo Unbekannt aus Denver'},
    {text: 'Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was wird das tun?
    ```js
    const person = {
      name: { first: 'Dan' },
      address: { city: 'Denver' },
    };
    const {
      name: { first = 'Unknown' },
      birth: { place = 'Unknown' } = {},
    } = person;

    console.log(
      `Hi ${first} from ${place}`,
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Eigenschaft `birth` existiert nicht auf `person`, also wird auf ein leeres Objekt ` = {}` zurückgegriffen. Dadurch kann der Standardwert verwendet werden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Funktionsargumente"
  title="Destrukturieren von Funktionsparametern mit Standardwerten"
  options={[
    {text: 'Hallo Dan von undefined'},
    {text: 'Hallo Dan von Unknown'},
    {text: 'Hallo Dan von Denver'},
    {text: 'Hallo Unknown von Unknown'},
    {text: 'Hallo Unknown von Denver'},
    {text: 'Fehler', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht das jetzt als Funktionsparameter?
    ```js
    'use strict';
    function displayUser({
      name = "Unknown",
      age = -1,
    } = { place: "Unknown" }) {
      console.log(`Hi ${name} from ${place}`);
    }
    displayUser({ name: "Dan" });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Diese Funktion extrahiert die Eigenschaften `name` und `age` und verwendet bei Bedarf Standardwerte. In diesem Fall ist der Schlüssel `place` im Default‑Objekt nur Rauschen, er wird in `displayUser()` nicht verwendet.

    Der Strict‑Modus ändert daran nichts: Das Auslesen der nicht deklarierten Bindung `place` wirft einen `ReferenceError`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Funktionsargumente"
  title="Destrukturierung mit verschachtelten Standardwerten"
  options={[
    {text: 'Unbekannt, Unbekannt, Joburg'},
    {text: 'Unbekannt, Unbekannt, Unbekannt'},
    {text: 'Unbekannt, `undefined`, Joburg'},
    {text: 'k.A., `undefined`, Joburg'},
    {text: 'k.A., Unbekannt, Joburg'},
    {text: 'k.A., k.A., Joburg', isAnswer: true},
    {text: 'Unbekannt, k.A., Joburg'},
    {text: 'Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie werden `undefined`‑Werte behandelt?
    ```js
    'use strict';
    function displayPlace({
      name = "N/A",
      place = "N/A",
      age = -1,
    } = { place: "Unknown" }) {
      console.log(`${place}`);
    }
    displayPlace({ name: "Dan" });
    displayPlace({ name: "Dan", place: undefined });
    displayPlace({ name: "Dan", place: "Joburg" });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Funktion `displayPlace` verwendet NUR ein Standard‑Objekt, wenn kein Objekt übergeben wird. Das heißt, das einzige, was das Standard‑Objekt `{ place: "Unknown" }` liefert, ist ein Aufruf ohne Argumente `displayPlace()`.

    Ein weiteres bemerkenswertes Verhalten ist, dass das Übergeben von `undefined` für `place` dazu führt, dass der Standardwert verwendet wird – ein bisschen ähnlich wie bei `JSON.stringify` (ignoriert `undefined`, erkennt `null`).

    Das Ergebnis ist:
    ```js
    displayPlace() // Unknown
    displayPlace({ name: "Dan" }) // N/A
    displayPlace({ name: "Dan", place: undefined }) // N/A
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Funktionsargumente"
  title="Destrukturierung mit verschachtelten Standardwerten"
  options={[
    {text: 'k.A., k.A.'},
    {text: 'k.A., undefined'},
    {text: 'Unbekannt, k.A.'},
    {text: 'Unbekannt, Unbekannt'},
    {text: 'Unbekannt, undefined'},
    {text: 'null, k.A.', isAnswer: true},
    {text: 'null, Unbekannt'},
    {text: 'null, undefined'},
    {text: 'Fehler'},
  ]}
>
  <slot name="question">
  <div className="question">
    Ähnlich wie beim Vorherigen… Wie wird `null` behandelt?_
    ```js
    function displayPlace({
      name = "N/A",
      place = "N/A",
      age = -1,
    } = { place: "Unknown" }) {
      console.log(`${place}`);
    }
    displayPlace({ name: "Dan", place: null });
    displayPlace({ name: "Dan", place: undefined });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    In diesem Fall wird die Eigenschaft `place` beim ersten Aufruf auf `null` gesetzt und beim zweiten auf `undefined`. Der Standardwert für `place` wird nur verwendet, wenn das gesamte Objekt fehlt **oder** `undefined` ist. Null‑Werte bleiben `null`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="TypeScript Inline-Typen"
  title="Destrukturierung mit verschachtelten Standardwerten"
  options={[
    {text: 'N/A'},
    {text: 'undefined'},
    {text: 'Unbekannt'},
    {text: '\'null\''},
    {text: 'TypeScript-Fehler', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Jetzt in TypeScript... _Was wird das tun?_
    ```ts
    'use strict';
    function displayPlace(
      {
        name = 'N/A',
        place = 'N/A',
      }: {
        name: string;
        place: string;
        age: number;
      },
    ) {
      console.log(`${place}`);
    }
    displayPlace({ name: 'Dan', place: null });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    TypeScript meldet einen Fehler, weil `place` als `string` typisiert ist, aber der Aufruf `null` übergibt. Der Aufruf lässt außerdem die erforderliche Eigenschaft `age` weg.

    Wenn du Typfehler ignorierst, wird beim Ausführen des Codes `null` in die Konsole ausgegeben.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="TypeScript: Mit Zuweisung"
  title="Destrukturierung mit verschachtelten Standardwerten"
  options={[
    {text: 'undefiniert'},
    {text: 'null'},
    {text: 'k.A.'},
    {text: 'Unbekannt'},
    {text: 'Denver', isAnswer: true},
    {text: 'SyntaxError'},
    {text: 'Fehler: Ungültiger Typ'},
    {text: 'Fehler: Ungültige Argumente'},
  ]}
>
  <slot name="question">
  <div className="question">
    Versuchen wir mal etwas Umbenennen/Zuweisung...
    ```ts
    'use strict';
    function displayPlace({
      name = 'N/A',
      place: location = 'N/A',
    }: {
      name: string;
      place: string;
      age?: number;
    }) {
      console.log(`${location}`);
    }
    displayPlace({ name: 'Dan', place: 'Denver' });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dies gibt `Denver` in der Konsole aus. Die Eigenschaft `place` wird in der Funktionssignatur zu `location` umbenannt. Das ist ein gängiges Muster (Eigenschaften beim Destrukturieren umbenennen), wenn man Datenstrukturen von Drittanbietern anpasst.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Verschachtelte Destrukturierung in TS"
  title="Destrukturierung mit verschachtelten Standardwerten"
  options={[
    {text: 'Fehler: Eigenschaft \'first\' fehlt'},
    {text: 'Fehler: Eigenschaft \'last\' fehlt'},
    {text: 'Fehler: Eigenschaften \'birth\' und \'age\' fehlen', isAnswer: true},
    {text: 'Fehler: Eigenschaft \'place\' fehlt'},
    {text: 'Fehler: \'string\' hat keine Eigenschaften in {...}'},
  ]}
>
  <slot name="question">
  <div className="question">
    Finde den Typfehler:
    ```ts
    function greet({
      name: {first = "N/A", last = "N/A"},
      birth: {place = "N/A"} = {},
      age = -1,
    }: {
      name: {first?: string, last?: string};
      birth: {place?: string};
      age: number;
    }) {
      console.log(`Hi ${first} ${last} from ${place}`);
    }
    greet({ name: {first: 'Dan'} });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der Fehler liegt in der Signatur der `greet`‑Funktion. Die Eigenschaften `age` und `birth` fehlen im übergebenen Objekt, also sollten sie im Typdefinition optional sein.

    Auch wenn die Eigenschaft `birth` mit einem Standardwert destrukturiert wird, verlangt die Typdefinition, dass sie vorhanden ist. Um eine Eigenschaft in TypeScript optional zu machen, sollte man den `?`‑Operator verwenden.

    Hinweis: `birth?: { place?: string }` ist nicht dasselbe wie `birth: { place?: string } | undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="TypeScript + Zuweisung"
  title="Destrukturierung mit verschachtelten Werten, Zuweisung und Typen"
  options={[
    {text: 'Hallo Dan Levy aus N/A'},
    {text: 'Hallo Dan Levy aus Kapstadt'},
    {text: 'Hallo N/A N/A aus N/A'},
    {text: 'Hallo N/A N/A aus Kapstadt'},
    {text: 'Fehler', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Jetzt mit **Zuweisung** (beachte die Variablen `f`, `l` und `p`)
    ```ts
    'use strict';
    function greet(
      {
        name: {first: f = "N/A", last: l = "N/A"},
        birth: {place: p = "N/A"} = {},
        age = -1,
      }: {
        name: {first?: string, last?: string};
        birth?: {place?: string};
        age?: number;
      }
    ) {
      console.log(`Hi ${f} ${l} from ${place}`);
      // What will 👆 do?
    }
    greet({
      name: {first: 'Dan', last: 'Levy'},
      birth: {place: 'Cape Town'},
    });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ein weiterer Fehler! Du fängst an zu raten, oder?!

    Es ist schwer, mehrere Ebenen von Destrukturierung mit Defaults, Zuweisungen und Typen zu lesen!

    Sobald `place` der Variable `p` zugewiesen wird, ist sie im Scope der `console.log`‑Anweisung nicht mehr definiert.
    ```ts
    console.log(`Hi ${f} ${l} from ${place}`); // ❌
    // to:
    console.log(`Hi ${f} ${l} from ${p}`); // ✅
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
