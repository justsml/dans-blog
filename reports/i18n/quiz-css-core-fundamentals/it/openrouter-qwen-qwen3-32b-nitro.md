# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 4.30
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-css-core-fundamentals --locale it --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Conosci i fondamenti CSS? (2025)'
subTitle: Sei abbastanza front‑end?
label: CSS Fundamentals
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
date: '2024-11-08'
modified: '2024-11-10'
tags:
  - quiz
  - intro
  - css
  - styles
  - beginner
  - intermediate
cover_full_width: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-wide.webp
cover_mobile: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
cover_icon: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Quiz: Conosci il CSS?

* CSS moderno? 🤔
* **Il CSS merita un posto nel _tuo_ curriculum???** 🚀
* Scelta multipla. 🤖 … _Quanto può essere difficile, vero?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Riscaldamento: Font"
  title="Unità CSS non valida per la dimensione del font"
  options={[
    {text: '10cx', isAnswer: true},
    {text: '10mm'},
    {text: '10pt'},
    {text: '10px'},
    {text: '10vmin'},
  ]}
>
  <slot name="question">
  <div className="question">
    Seleziona l'<em class="highlight">UNICO NON VALIDO</em> ❌ `font-size`:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `10cx` è errato perché `cx` non è un'unità CSS reale. (Almeno al momento della stesura.)

    Le unità più comuni includono le familiari `px`, `rem`, `em`.

    Le unità più recenti sono utili per layout dinamici e responsivi.

    - `ch` - larghezza del carattere `0`
    - `vmin` - minimo del viewport
    - `vmax` - massimo del viewport
    - `vh` - altezza del viewport
    - `vw` - larghezza del viewport

    Esistono anche diverse unità che sono sempre state disponibili ma sono raramente usate, come `cm` per centimetri, `mm`, `in` per pollici, `pt` per punti
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Riscaldamento: Colori"
  title="Codici Esadecimali"
  options={[
    {text: '#A'},
    {text: '#AB'},
    {text: '#ABCD', isAnswer: true},
    {text: '#ABCDE'},
  ]}
>
  <slot name="question">
  <div className="question">
    Riesci a individuare il <em class="highlight">UNICO</em> codice esadecimale valido 👍?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    I codici esadecimali possono essere usati per rappresentare colori in CSS. Sono preceduti da `#` e devono contenere 3, 4, 6 o 8 cifre esadecimali.

    Il codice esadecimale a 3 caratteri è una forma abbreviata del codice a 6 caratteri, dove ogni carattere è ripetuto. Il codice a 4 caratteri include un canale alfa per la trasparenza.

    Ad esempio `#ABC` è lo stesso di `#AABBCC`, e `#ABCD` è lo stesso di `#AABBCCDD`. Per saperne di più su come gestire i valori esadecimali, dai un'occhiata al mio [quiz sui numeri JavaScript.](/quiz-can-you-count-to-bigint/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Riscaldamento: Unità"
  title="Ops, tutte le unità!"
  options={[
    {text: 'em'},
    {text: 'rem'},
    {text: 'cm'},
    {text: 'mm'},
    {text: 'in'},
    {text: 'pt'},
    {text: 'pc'},
    {text: 'px'},
    {text: 'ex'},
    {text: 'ch'},
    {text: 'vmin'},
    {text: 'vmax'},
    {text: 'vh'},
    {text: 'rel', isAnswer: true},
    {text: 'vw'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale di queste unità <em class="highlight">NON</em> è una valida unità CSS ❌?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le nuove unità come `ch`, `vmin`, `vmax`, `vh`, `vw` sono molto utili per layout dinamici/responsive.

    Ci sono anche diverse unità che esistono da sempre ma sono raramente usate, come `cm` per i centimetri, `mm`, `in` per i pollici, `pt` per i punti, `pc`, `cap` per la dimensione delle lettere maiuscole, e `ex` che è pari all’altezza della lettera `x`.

    Le unità più popolari includono il familiare `px` per i pixel, `em` relativo alla dimensione del font dell'elemento, e `rem` è in realtà un omaggio segreto al gruppo degli anni '90 R.E.M. (ok, non è vero, è semplicemente un'unità `em` relativa che fa riferimento all'elemento radice).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Selettore: Fondamentali"
  title="Abbinare i selettori agli elementi HTML"
  options={[
    {text: '#Home'},
    {text: 'a [id=\'home\']'},
    {text: 'a:contains(home)'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale selettore corrisponde meglio al seguente HTML?
    ```html
          <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La risposta corretta è `a#home[name='home']`, che corrisponde sia all'attributo `id` sia a quello `name`. I selettori CSS distinguono maiuscole e minuscole, quindi `#Home` non funzionerebbe, e gli spazi implicano elementi figli, cosa non applicabile qui.

    Il selettore `:contains()` non è un selettore CSS standard, ma è disponibile in alcune librerie JS.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Selettore: Fondamentali"
  title="Selettore di attributo per un pulsante"
  options={[
    {text: 'button:link'},
    {text: 'button::click'},
    {text: 'button:focus'},
    {text: 'button[onclick]', isAnswer: true},
    {text: 'button[on-click]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale selettore corrisponde al seguente pulsante HTML?
    ```html
          <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La risposta corretta è `button[onclick]`, che seleziona la presenza dell'attributo `onclick`.

    Nota che `:link` seleziona solo i link `href` non visitati, `::click` non è un pseudo‑elemento valido, e `:focus` seleziona solo l'elemento focalizzato.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Selettore: Fondamentali"
  title="Selettore CSS non valido"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Quale di questi selettori è invalido?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il selettore `c > > d {}` è non valido perché il combinatore figlio è ripetuto senza un selettore tra i due caratteri `>`.

    Gli altri selettori sono validi. Un selettore di tipo come `c {}` è sintatticamente valido CSS anche se `c` non è un elemento HTML standard.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Selettore: Fondamentali"
  title="Selezionare l'ultimo link"
  options={[
    {text: 'a :nth-child(3)'},
    {text: 'a:last-item'},
    {text: 'nav:last-of-type(a)'},
    {text: 'nav:nth-child(3)'},
    {text: 'a:last-child', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale selettore corrisponde all'ultimo link nel seguente HTML?
    ```html
          <nav>
            <a name="home" href="/home">Home</a>
            <a name="login" href="/login">Login</a>
            <a name="help" href="/help">Help</a>
          </nav>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il selettore corretto è `a:last-child`, che corrisponde all'ultimo `<a>` quando è anche l'ultimo figlio del suo genitore. `nav:nth-child(3)` corrisponderebbe a un elemento `<nav>` che è il terzo figlio del suo genitore.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Selettore: Specificità"
  title="Priorità del selettore"
  options={[
    {text: 'main article section blockquote a'},
    {text: 'blockquote a'},
    {text: 'a#quote', isAnswer: true},
    {text: 'a.quote'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale selettore avrà la priorità?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il selettore `a#quote` ha la priorità perché l'ID ha una specificità più alta rispetto ai selettori basati su tag o classe.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Layout: Centratura"
  title="Centrare il testo in un elemento blocco"
  options={[
    {text: 'align: center;'},
    {text: 'margin: 0 auto;'},
    {text: 'align-content: center;'},
    {text: 'text-align: center;', isAnswer: true},
    {text: 'text-content: center;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Come puoi centrare "shit" in una scatola?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Usare `text-align: center;` è il modo corretto per centrare il testo in un elemento blocco. Le proprietà `align` sono usate per i layout flexbox, e `margin: 0 auto;` serve a centrare gli elementi blocco orizzontalmente.

    La proprietà `align-content` è usata per i layout grid, e `text-content` non è una proprietà CSS valida.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Layout: Centratura"
  title="Centrare verticalmente un elemento block"
  options={[
    {text: 'align-items: center;'},
    {text: 'justify-content: center;'},
    {text: 'align-content: center;', isAnswer: true},
    {text: 'margin: auto;'},
    {text: 'margin: 0 auto;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Come centri il contenuto verticalmente all'interno di un contenitore block nel layout di flusso moderno?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Usare `align-content` è il modo moderno per centrare verticalmente i contenuti di un contenitore block nel layout di flusso.

    Le proprietà `align-items` e `justify-content` sono usate per layout flexbox e grid, ma non per il flusso.

    Sia `margin: 0 auto;` che `margin: auto;` centrano un elemento block orizzontalmente, ma non verticalmente.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Layout: Unità"
  title="Calcolare la dimensione in pixel dei font nidificati"
  options={[
    {text: '!40px'},
    {text: '5px', isAnswer: true},
    {text: '20px'},
    {text: '25px'},
    {text: '40px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è la dimensione in pixel del testo del link `<a>` nel seguente HTML?
    ```html
          <body style="font-size: 40px !important;">
            <nav style="font-size: 50%;">
              <a style="font-size: 25%;">HOME</a>
            </nav>
          </body>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La `font-size` per `<a>` si calcola come 5px: 40px (body) * 50% (nav) = 20px, poi 20px * 25% = 5px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Unità: REM"
  title="Calcolare la dimensione in pixel con i REM"
  options={[
    {text: '10px'},
    {text: '12px', isAnswer: true},
    {text: '14px'},
    {text: '20px'},
    {text: '24px'},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual sarà la dimensione in pixel di `1.2rem` per il link "HOME" nel seguente HTML?
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2rem;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2rem` si traduce in 12px perché le unità `rem` fanno riferimento alla dimensione del font radice o `<html>`, impostata qui a 10px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Unità: EM"
  title="Calcolare la dimensione in pixel con EM"
  options={[
    {text: '10px'},
    {text: '12px'},
    {text: '14px'},
    {text: '20px'},
    {text: '24px', isAnswer: true},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Simile alla domanda precedente, qual è la dimensione in pixel di `1.2em` per il link "HOME" nel seguente HTML?
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2em;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2em` corrisponde a 24px perché le unità `em` fanno riferimento alla dimensione del font ereditata, impostata qui a 20px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Selettore: Specificità"
  title="Selettori a Specificità Zero"
  options={[
    {text: ':where(.card) .title', isAnswer: true},
    {text: '.card .title'},
    {text: ':is(.card) .title'},
    {text: '#card .title'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale selettore ha la specificità più bassa?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `:where(.card) .title` ha la specificità più bassa. La pseudo‑classe `:where()` e tutto ciò che contiene contribuisce `0-0-0`, quindi conta solo `.title`. `:is(.card) .title` mantiene la specificità di `.card`, `.card .title` ha due classi, e `#card .title` include un ID.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
