# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/de/index.mdx
- Validation: passed
- Runtime seconds: 23.11
- Input tokens: 12844
- Output tokens: 6712
- Thinking tokens: unknown
- Cached input tokens: 4160
- Cache write tokens: 0
- Estimated cost: $0.001709
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Gehört HTML noch inIhren Lebenslauf?'
subTitle: Beweise dich!
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
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Also, du glaubst, du hast HTML5‑Kenntnisse?

Nachdem du doch deinen `<div>` von deinem `<span>` unterscheiden kannst, oder? Aber wie gut kennst du die fortgeschritteneren, semantischen Elemente in HTML5?

> Hinweis: Wenn du diesen Test nicht bestehst, musst du `HTML Skills` aus deinem Lebenslauf entfernen.

### Los!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Aufwärmen"
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
    Das `<ul>`-Tag erzeugt eine ungeordnete Liste, wobei die Elemente typischerweise durch Aufzählungszeichen markiert werden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Fortgeschrittenes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Wofür steht das `<dd>`‑Element in HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<dd>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) definiert eine Beschreibung, Definition oder einen Wert in einer Beschreibungs‑Liste und wird innerhalb von `<dl>`‑Tags verwendet, um mit `<dt>` (_Description Term_) zu paaren.

    Das ist nützlich, wenn Schlüssel‑Wert‑Daten angezeigt werden. Profilinformationen, Einstellungen und Statistiken sind gängige Beispiele.
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
  group="Fortgeschrittenes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Wann sollten die `<figure>`- und `<figcaption>`-Elemente verwendet werden?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) Tag wird typischerweise verwendet, um eigenständige (Medien‑)Inhalte, wie ein Bild oder Diagramm, zusammen mit [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) zu umschließen, um eine Bildunterschrift bereitzustellen.

    Das ist nützlich für Bilder, Diagramme, Code‑Snippets und mehr.
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
  group="Fortgeschrittenes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist der Zweck des `<article>`‑Elements in HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<article>` Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) wird verwendet, um ein eigenständiges Inhaltselement zu definieren, das unabhängig verteilt oder wiederverwendet werden kann.

    Es wird häufig für Blog‑Beiträge, Nachrichtenartikel, Forumsbeiträge oder Benutzerkommentare verwendet.

    Man kann mehrere Articles auf einer Seite einsetzen (z. B. für unendlich scrollende Seiten). Oder man verschachtelt sie, um eine Hierarchie von „eigenständigem Inhalt“ zu erzeugen.
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
  group="Fortgeschrittenes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist der Zweck der `<fieldset>`- und `<legend>`-Elemente in einem Formular?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) wird verwendet, um verwandte Formularelemente zu gruppieren, und `<legend>` liefert einen Titel/Bezeichnung für die Gruppe, was die Barrierefreiheit verbessert.

    Das ist nützlich, um verwandte Formularelemente zu gruppieren, etwa einen Abschnitt für die Lieferadresse oder Zahlungsdetails.
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
  group="Fortgeschrittenes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist der Zweck des `<meter>`‑Elements?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<meter>`‑Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) wird verwendet, um eine skalare (einzelne) Messung innerhalb eines festgelegten Bereichs darzustellen, z. B. Temperatur, Festplattenauslastung oder ein Abstimmungsergebnis.

    Es mag einem [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)‑Balken ähneln, jedoch beginnen Fortschrittsbalken **IMMER** bei null. Deshalb zeigen `<progress>`‑Elemente einen `Prozentsatz der Fertigstellung`, während ein `<meter>` jeden Wert innerhalb eines definierbaren Bereichs anzeigt.
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
  group="Semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Warum wird das `<source>`-Element verwendet?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<source>`-Element wird verwendet, um verfügbare Medienformate anzugeben](https://developer.mozilla.org/en-us/docs/web/html/element/source).

    Wird speziell mit [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video), [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) und [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) Elementen verwendet, sodass der Browser das am besten geeignete Format auswählen kann.
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
  group="Fortgeschrittenes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Wie sollten Sie das `<hgroup>`‑Element verwenden?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup)‑Element gruppiert eine Überschrift mit zugehörigem sekundärem Inhalt, üblicherweise einem oder mehreren `<p>`‑Elementen.

    Es kann nützlich sein, wenn eine Überschrift einen Untertitel, Slogan oder alternativen Titel hat, der nicht als weitere Überschrift in der Dokumenten‑Gliederung erscheinen soll.
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
  group="Fortgeschrittenes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Wofür wird das `<menu>`‑Element in HTML verwendet?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) stellt eine Liste von Befehlen oder interaktiven Steuerelementen dar.

    Wenn deine Liste Navigationslinks enthält, verwende `<nav>` mit einem `<ul>`. Verwende `<menu>` für toolbar‑ähnliche Steuerelemente oder Befehlslisten.
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
  group="Fortgeschrittenes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Welche Rolle spielen `<details>` und `<summary>` in HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) ermöglicht zusammenklappbaren Inhalt, und [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) gibt einen sichtbaren Titel für den Inhalt an.

    Das ist nützlich für FAQs, zusammenklappbare Abschnitte oder jeglichen Inhalt, der umgeschaltet werden kann.
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
  group="Fortgeschrittenes semantisches HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Warum sollten Sie ein `<dialog>`‑Element verwenden?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)‑Element wird für Pop‑Ups oder Modale verwendet und liefert semantisches Markup, erweitertes CSS und eine native API für diese Interaktionen.

    Verwenden Sie JavaScript, um es mit `.showModal()` für modale Dialoge oder `.show()` für nicht‑modale Dialoge zu öffnen und es mit `.close()` oder einer Formularübermittlung mittels `method="dialog"` zu schließen.
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
  group="Fortgeschrittenes semantisches HTML"
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
    Das `<time>`-Element wird für Daten, Zeiten oder Zeitspannen verwendet. Es kann menschenlesbaren Inhalt und ein maschinenlesbares `datetime`-Attribut enthalten. HTML hat kein `<date>`-Element.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Fortgeschrittenes semantisches HTML"
  title="Zweck von ARIA-Attributen"
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
    ARIA‑Attribute (Accessible Rich Internet Applications) verbessern die Web‑Barrierefreiheit, indem sie Screen‑Readern und anderen Hilfstechnologien zusätzlichen Kontext bieten.

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
  group="Fortgeschrittenes semantisches HTML"
  title="Verwendung des `role`-Attributs"
  options={[
    {text: 'Zum Definieren des Komponentenverhaltens'},
    {text: 'Um den Zweck eines Elements zu beschreiben', isAnswer: true},
    {text: 'Zugriff auf Elemente einschränken'},
    {text: 'Nur für Web Components'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wofür wird das `role`-Attribut in HTML verwendet?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Das `role`-Attribut beschreibt

    den Zweck eines Elements für unterstützende Technologien und trägt so zur Verbesserung der Barrierefreiheit bei.
  </div>
  </slot>
</Challenge>

</QuizUI>

Also, wie lief’s? Bist du gespannt, in deinem nächsten Projekt mehr semantische HTML‑Elemente zu verwenden? 🚀

Oder bist du für immer mit `<div>` und `<span>` zufrieden? 😅

Schreib mir deine Meinung in die Kommentare unten! 👇
````
