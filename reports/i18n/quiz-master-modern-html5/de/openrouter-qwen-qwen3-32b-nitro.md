# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 41.09
- Input tokens: 10959
- Output tokens: 11437
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003622
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug quiz-master-modern-html5 --locale de
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Gehört HTML noch auf deinen Lebenslauf?'
subTitle: 'Zeig, was du drauf hast!'
label: Semantic HTML5
social_image: ../desktop-social.webp
category: Quiz
subCategory: HTML
date: '2024-10-31'
modified: '2024-11-06'
tags:
  - quiz
  - web
  - quiz
  - semantic
  - html5
  - web
  - beginner
  - intermediate
cover_full_width: ../jakob-owens-FBih1nqPi0w-unsplash-wide.webp
cover_mobile: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
cover_icon: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
---
```mdx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Also, du denkst, du hast HTML5-Kenntnisse?

Schließlich kannst du ja `<div>` von `<span>` unterscheiden, oder? Aber wie gut kennst du die fortgeschrittenen, semantischen Elemente in HTML5?

> Hinweis: Wenn du diesen Test nicht bestehst, musst du `HTML Skills` rechtmäßig von deinem Lebenslauf streichen.

### Los geht's!
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Erwärmung"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist die Hauptfunktion des `<ul>`-Elements in HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das `<ul>`-Tag erstellt eine ungeordnete Liste, wobei die Elemente typischerweise durch Aufzählungszeichen gekennzeichnet sind.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Fortgeschrittene semantische HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Was repräsentiert das `<dd>`-Element in HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<dd>`-Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) definiert eine Beschreibung, Definition oder Wert in einer Beschreibungsaufzählung, die innerhalb von `<dl>`-Tags verwendet wird, um mit `<dt>` (_Beschreibungsterm_) gepaart zu werden.

    Das ist nützlich, um Schlüssel-Wert-Daten anzuzeigen. Profilinformationen, Einstellungen und Statistiken sind gängige Beispiele.
    ```html
    <dl>
    <dt>JS</dt>
    <dd>Client-side</dd>
    <dd>Server-side</dd>

    <dt>HTML</dt>
    <dd>Client-side</dd>
    </dl>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Fortgeschrittene semantische HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Wann sollten die Elemente `<figure>` und `<figcaption>` verwendet werden?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)-Tag wird typischerweise verwendet, um selbstständige (Medien-)Inhalte wie Bilder oder Diagramme zu umschließen, zusammen mit dem [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption)-Element für eine Bildunterschrift.

    Das ist nützlich für Bilder, Diagramme, Codeausschnitte und mehr.
    ```html
    <figure>
    <img src="image.jpg" alt="Description of image">
    <figcaption>Image caption</figcaption>
    </figure>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Fortgeschrittene semantische HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Welchem Zweck dient das `<article>`-Element in HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<article>`-Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) wird verwendet, um ein selbstständiges Inhaltsstück zu definieren, das unabhängig verteilt oder wiederverwendet werden kann.

    Es wird häufig für Blogbeiträge, Nachrichtenartikel, Forumseinträge oder Benutzerkommentare verwendet.

    Sie können mehrere Artikel auf einer Seite verwenden (z. B. für unendlich scrollende Seiten). Oder Sie können sie ineinander verschachteln, um eine Hierarchie von "selbstständigem Inhalt" zu erstellen.
    ```html
    <article>
    <h2>Article Title</h2>
    <p>Article content...</p>
    <article class="discussion">
    <h3>Comment by User</h3>
    <p>Comment content...</p>
    </article>
    </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Erweitertes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Welchen Zweck erfüllen die Elemente `<fieldset>` und `<legend>` in einem Formular?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) wird verwendet, um verwandte Formularsteuerelemente zu gruppieren, und `<legend>` bietet eine Bezeichnung für die Gruppe, wodurch die Barrierefreiheit verbessert wird.

    Das ist nützlich, um verwandte Formularelemente zu gruppieren, wie z. B. eine Abschnitt für die Lieferadresse oder Zahlungsdetails.
    ```html
    <fieldset>
    <legend>Shipping Address</legend>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    ...
    </fieldset>
    <fieldset>
    <legend>Payment Details</legend>
    <label for="card">Card Number:</label>
    <input type="text" id="card" name="card">
    ...
    </fieldset>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Fortgeschrittene semantische HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Welchem Zweck dient das `<meter>`-Element?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<meter>`-Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) wird verwendet, um eine skalare (einzelne) Messung innerhalb eines definierten Bereichs darzustellen, z. B. Temperatur, Speicherbelegung oder eine Abstimmung.

    Es ähnelt auf den ersten Blick dem [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)-Balken, Fortschrittsbalken **BEGINNEN IMMER** jedoch bei null. `<progress>`-Elemente zeigen also einen `Prozentwert des Abschlusses`, während `<meter>`-Elemente **jeden Wert** innerhalb eines definierbaren Bereichs anzeigen.
    ```html
    <meter min="-60" max="130" value="75" /> 75°F
    <meter min="0" max="100" value="75" /> 75%
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Semantischer HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Wofür wird das `<source>`-Element verwendet?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<source>`-Element wird verwendet, um verfügbare Mediendarstellungen anzugeben](https://developer.mozilla.org/en-us/docs/web/html/element/source).

    Speziell in Kombination mit den Elementen [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video), [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) und [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture), damit der Browser das beste verfügbare Format auswählen kann.
    ```html
    <video controls>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    </video>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Erweitertes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Wie sollten Sie das `<hgroup>`-Element verwenden?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup)-Element gruppiert einen Überschriftentext mit zugehörigem sekundären Inhalt, üblicherweise einen oder mehrere `<p>`-Elemente.

    Es kann nützlich sein, wenn eine Überschrift eine Untertitel, Werbetext oder alternative Überschrift hat, die nicht als weiterer Überschriftentitel in die Dokumentstruktur aufgenommen werden soll.
    ```html
    <article>
    <hgroup>
    <h1>Frankenstein</h1>
    <p>Or: The Modern Prometheus</p>
    </hgroup>
    <section>
    <h2>Chapter 1</h2>
    <p>...</p>
    </section>
    </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Erweitertes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Wofür wird das `<menu>`-Element in HTML verwendet?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) stellt eine Liste von Befehlen oder interaktiven Steuerelementen dar.

    Wenn Ihre Liste Navigationslinks enthält, verwenden Sie `<nav>` mit einem `<ul>`. Verwenden Sie `<menu>` für toolbarenähnliche Steuerelemente oder Befehlslisten.
    ```html
    <menu>
    <li><button type="button">Copy</button></li>
    <li><button type="button">Paste</button></li>
    </menu>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Erweiterte semantische HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Welche Rolle spielen die Elemente `<details>` und `<summary>` im HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) ermöglicht zusammenklappbaren Inhalt, und [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) definiert einen sichtbaren Titel für diesen.

    Das ist nützlich für FAQs, zusammenklappbare Abschnitte oder beliebigen Inhalt, den man umschalten kann.
    ```html
    <details>
    <summary>Click to expand 🤯</summary>
    <p>Hidden content! 💥</p>
    </details>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Erweitertes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Warum sollten Sie ein `<dialog>`-Element verwenden?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)-Element wird für Pop-ups oder Modale verwendet und bietet semantische Markierung, erweiterte CSS-Funktionen und eine native API für diese Interaktionen.

    Verwenden Sie JavaScript, um es mit `.showModal()` für modale Dialoge oder `.show()` für nicht-modale Dialoge zu öffnen, und schließen Sie es mit `.close()` oder einer Formulareingabe mit `method="dialog"`.
    ```html
    <dialog>
    <h2>Modal Title</h2>
    <p>Modal content...</p>
    <button>Close</button>
    </dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Erweitertes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Wie wird das `<time>`-Element in HTML verwendet?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das `<time>`-Element wird für Datumsangaben, Zeiten oder Dauern verwendet. Es kann menschenlesbaren Inhalt und ein maschinenlesbares `datetime`-Attribut enthalten. HTML hat kein `<date>`-Element.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Fortgeschrittene semantische HTML"
  title="Zweck der ARIA-Attribute"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist der Zweck von ARIA-Attributen?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ARIA (Accessible Rich Internet Applications) Attribute verbessern die Webbarrierefreiheit, indem sie zusätzlichen Kontext für Screenreader und andere Assistivtechnologien bereitstellen.

    Es gibt Rollen, Zustände und Eigenschaften, die verwendet werden können, um Elemente zu beschreiben.
    ```html
    <button aria-label="Close" aria-expanded="true">X</button>
    <main aria-live="polite">...</main>
    <dialog
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="dialog_label"
    aria-describedby="dialog_desc"
    ></dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Erweitertes semantisches HTML"
  title="Verwendung des `role`-Attributs"
  options={[
    {text: 'Zur Definition des Komponentenverhaltens'},
    {text: 'Um die Zweck eines Elements zu beschreiben', isAnswer: true},
    {text: 'Zugriff auf Elemente beschränken'},
    {text: 'Nur für Web Components'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche Verwendung hat das `role`-Attribut in HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das `role`-Attribut beschreibt
  </div>
  </slot>
</Challenge>

</QuizUI>

Wie lief's? Aufgeregt, in deinem nächsten Projekt mehr semantische HTML-Elemente zu verwenden? 🚀  
Oder festgelegt auf `<div>` und `<span>` für immer? 😅  
Lass es mich in den Kommentaren unten wissen! 👇
````
