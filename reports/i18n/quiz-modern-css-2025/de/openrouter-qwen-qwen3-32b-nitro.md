# Translation Candidate
- Slug: quiz-modern-css-2025
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-07--quiz-modern-css-2025/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 32.36
- Input tokens: 9416
- Output tokens: 11047
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003405
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug quiz-modern-css-2025 --locale de
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Kennen Sie Modernes CSS? (für 2025)'
subTitle: Bist du Frontend genug?
label: Advanced CSS
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
minReleaseDate: '2024-10-31'
date: '2024-10-31'
modified: '2024-11-09'
tags:
  - quiz
  - css
  - advanced
  - intermediate
cover_full_width: ../dan-levy-downtown-denver-at-night-wide.webp
cover_mobile: ../dan-levy-downtown-denver-at-night-square-200.webp
cover_icon: ../dan-levy-downtown-denver-at-night-square-200.webp
---
```mdx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Quiz: Kennen Sie CSS?

* Moderne CSS?  🤔
* **Sollte CSS auf _Ihrem_ Lebenslauf stehen???** 🚀
* Multiple Choice. 🤖 ... _Wie schwer kann es sein, hm?_
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Aufwärmen"
  title="CSS-Variablen verwenden"
  options={[
    {text: 'background-color: blue;'},
    {text: 'background-color: --main-color;'},
    {text: 'background-color: var(--main-color);', isAnswer: true},
    {text: 'background-color: $main-color;'},
    {text: 'background-color: @main-color;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie lautet die korrekte Methode, um eine CSS-Variabel namens `--main-color` zu verwenden, um die Hintergrundfarbe eines Elements zu setzen?
    ```css
    :root {
      --main-color: blue;
    }
    div {
      /* How do we use --main-color here? */
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    CSS-Variablen werden mit der `var`-Funktion verwendet, also lautet die korrekte Antwort `background-color: var(--main-color);`. Diese Syntax ruft den Wert von `--main-color` ab und wendet ihn an.

    Die anderen Optionen könnten aus anderen Sprachen oder Präprozessorsyntaxen bekannt sein, insbesondere aus Sass oder Less.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="CSS-Funktionen"
  title="CSS min()-Funktion"
  options={[
    {text: 'width: 50%;'},
    {text: 'width: 200px;', isAnswer: true},
    {text: 'width: 250px;'},
    {text: 'width: 500px;'},
    {text: 'width: max(50%, 200px);'},
    {text: 'Ungültige Syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wenn die Breite des Eltern-/Container-Elements 400px beträgt, welche Breite wird für das folgende Element berechnet?
    ```css
    div {
      width: min(250px, 50%);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `min()`-Funktion wählt den kleinsten Wert zwischen 250px und 50 % der Breite ihres Eltern-Elements aus.

    Um den berechneten Wert zu verstehen, müssen wir die relativen Einheiten in Pixel umrechnen:

    – 50 % von 400px sind 200px
    – 250px sind bereits in Pixel angegeben
    ```css
    /* This gets computed to */
    width: min(250px, 200px);
    /* -> 200px wins */
    ```
    Die `min()`-Funktion ist besonders nützlich für responsives Design, bei dem Sie sicherstellen können, dass ein Komponenten- (oder Schriftgrad-) nicht einen bestimmten Grenzwert überschreitet.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="CSS-Funktionen"
  title="CSS max()-Funktion"
  options={[
    {text: 'width: 6em;'},
    {text: 'width: 10%;'},
    {text: 'width: 10px;'},
    {text: 'width: 50px;'},
    {text: 'width: 96px;', isAnswer: true},
    {text: 'Ungültige Syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    Gegeben ein Container mit einer Breite von 200px, welche Breite würde sich für das `<div>` berechnen?
    ```css
    div {
      width: max(50px, 10%, 6rem);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `max()`-Funktion akzeptiert 2 oder mehr Eingaben und nutzt automatisch den größten Wert. Angenommen, die Schriftgröße der Wurzel entspricht dem Browserstandard `16px`, ergibt sich eine Breite von `96px`.

    Um den berechneten Wert zu verstehen, müssen wir die relativen Einheiten in Pixel umrechnen:

    - `50px` sind bereits in Pixel
    - `10%` von `200px` sind `20px`
    - `6rem` sind `6 * 16px` (die Standard-Schriftgröße), also `96px`
    ```css
    /* This gets computed to */
    width: max(50px, 20px, 96px);
    /* -> 96px wins */
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="CSS Grid-Funktionen"
  title="CSS minmax()-Funktion"
  options={[
    {text: 'Alle Spaltenbreiten zwischen 100px und 200px'},
    {text: 'Spalten auf 100px, Zeilen auf 200px einstellen'},
    {text: 'Spalte 1 wird zwischen 100px und 200px liegen', isAnswer: true},
    {text: 'Bereich rekursiv anwenden, einschließlich Untergitter'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher Effekt entsteht durch die Verwendung von `minmax(100px, 200px)` für eine CSS-Grid-Spur?
    ```css
    grid-template-columns: minmax(100px, 200px);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die Verwendung von `minmax(100px, 200px)` ermöglicht es der Grid-Spur, sich zwischen `100px` und `200px` zu skalieren, wobei sie sich an den verfügbaren Platz anpasst, aber nie unter `100px` oder über `200px` geht.

    Sie können automatisch anpassende Layouts erstellen, bei denen Container und Kinder jeweils eine Rolle bei der Berechnung der Layouts spielen. Dies ist besonders mächtig, wenn es mit `repeat()` und `auto-fill` oder `auto-fit` kombiniert wird, die so viele Spuren wie möglich innerhalb der Einschränkungen erstellen.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="CSS-Variablen"
  title="CSS-Variablen-Standardwerte"
  options={[
    {text: 'blau'},
    {text: 'rot'},
    {text: 'Systemstandard'},
    {text: '#6b8e23', isAnswer: true},
    {text: 'var(--secondary-color)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche Farbe hat der Hintergrund für den folgenden CSS-Code?
    ```css
    div {
      background: var(--primary, olivedrab);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `var()`-Funktion ermöglicht es, einen Standardwert festzulegen, wenn die Variable nicht definiert ist. In diesem Fall wird der Hintergrund `olivedrab` (`#6b8e23`) sein, da `--primary` nicht definiert ist.

    Das ist eine großartige Methode, um sicherzustellen, dass Ihre Styles nicht zusammenbrechen, wenn eine Variable fehlt oder nicht unterstützt wird.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="CSS-Funktionen"
  title="clamp() für responsives Design verwenden"
  options={[
    {text: 'Fallback für möglicherweise nicht unterstützte Einheiten'},
    {text: 'Stellen Sie sicher, dass `vw`-Einheiten zwischen 20px und 50px liegen'},
    {text: 'Lineare Skala zwischen 200px und 500px', isAnswer: true},
    {text: 'Log₂-Skala zwischen 200px und 500px'},
    {text: 'Fehlschlag! Keine Unterstützung für IE 11'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was bewirkt die `clamp()`-Funktion?
    ```css
    .card {
      width: clamp(200px, 50vw, 500px);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `clamp()`-Funktion ermöglicht es der Breite, sich anhand von `50vw` zu skalieren, hält sie aber im Bereich von 200px bis 500px.

    Das bedeutet, dass die Breite 200px beträgt, wenn `50vw` weniger als 200px wäre, 500px, wenn `50vw` mehr als 500px wäre, und linear zwischen diesen Grenzen skaliert.

    Es ermöglicht Ihnen, automatisch responsiv zu sein! Wichtig zu wissen über `clamp` ist, dass sie **feste Einheiten** mit **responsiven oder berechneten Einheiten** kombiniert.

    Normalerweise möchte man viewport-basierte Einheiten für Schriftgrößen nicht verwenden, aber mit `clamp()` können wir sicherstellen, dass die Schriftgröße nicht zu klein oder zu groß wird.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="CSS-Verschachtelung"
  title="Native CSS-Verschachtelung"
  options={[
    {text: 'Nur mit SCSS'},
    {text: 'Technisch mit PostCSS'},
    {text: 'Ja', isAnswer: true},
    {text: 'Nein'},
  ]}
>
  <slot name="question">
  <div className="question">
    Unterstützt CSS Verschachtelung native?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ja! Wir haben endlich native CSS-Verschachtelung! CSS hat in den letzten Jahren (2023) eine native Verschachtelungssyntax eingeführt, die eine hierarchische Formatierung direkt in CSS ermöglicht.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="CSS-Verschachtelung"
  title="CSS-Verschachtelung"
  options={[
    {text: 'Dateiname muss mit .scss enden'},
    {text: '`.title` muss Eigenschaften wie `color` vorangehen'},
    {text: 'Nur mit PostCSS'},
    {text: 'Perfekt. Keine Notizen.', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Ist dies eine korrekte Verwendung der nativen CSS-Verschachtelung?
    ```css
    .container {
      color: black;
      .title {
        color: white;
        background: black;
      }
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `.title`-Klasse ist in der `.container`-Klasse verschachtelt, und die Eigenschaften werden wie erwartet angewandt.

    Dies ist eine großartige Möglichkeit, verwandte Stile zusammenzuhalten und lange Selektoren zu vermeiden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="CSS-Verschachtelung"
  title="Direkter Kindselektor mit Verschachtelung"
  options={[
    {text: 'background-color: red'},
    {text: 'background-color: white', isAnswer: true},
    {text: 'background-color: blue'},
    {text: 'Ungültige Syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche Hintergrundfarbe wird auf direkte Kind-`div`s von `.container` angewendet?
    ```css
    .container {
      background-color: red;
      > div {
        background-color: white;
      }
      background-color: blue !important;
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der `>`-Selektor in der verschachtelten Regel wendet `background-color: white` nur auf direkte Kind-`div`-Elemente innerhalb von `.container` an.

    Die letzte Regel, `background-color: blue !important;`, ist etwas Ablenkung. Sie ist **außerhalb der verschachtelten Regel** und wird auf alle `.container`-Elemente angewendet.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="CSS-Variablen"
  title="Ändern von CSS-Variablen zur Laufzeit"
  options={[
    {text: 'CSS-Variablen sind unveränderlich'},
    {text: 'Mithilfe von JavaScript', isAnswer: true},
    {text: 'Nur mit SCSS'},
    {text: 'Nur mit Inline-Stilen'},
    {text: 'Mithilfe responsiver Einheiten'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie können Sie den Wert einer CSS-Variablen zur Laufzeit ändern?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    CSS-Variablen können mithilfe von Klassen & JavaScript festgelegt werden. Sie können sogar 'nach' definiert werden, als wären sie technisch gesehen bereits verwendet worden.
    ```js
    document.documentElement.style.setProperty('--main-color', 'blue');
    ```
    Dies ändert den Wert von `--main-color` auf `blue` für das gesamte Dokument.

    CSS-Variablen sind veränderlich und können zur Laufzeit mithilfe von JavaScript geändert werden.

    Sie können auch durch Hinzufügen oder Entfernen von Klassen geändert werden, was ein gängiges Muster für das Theming ist.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="CSS-Variablen"
  title="Verwendung von calc() mit CSS-Variablen"
  options={[
    {text: 'Breite: 50px'},
    {text: 'Breite: 100px'},
    {text: 'Breite: 110px', isAnswer: true},
    {text: 'Breite: 120px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche berechnete Breite hat das Element?
    ```css
    :root {
      --base-width: 100px;
    }
    div {
      width: calc(var(--base-width) + 10px);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `calc()`-Funktion kombiniert den Wert von `--base-width` (100px) mit zusätzlichen 10px, was zu einer Breite von 110px führt.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
