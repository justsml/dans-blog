# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 10.34
- Input tokens: 10117
- Output tokens: 2913
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000919
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/it/index.mdx reports/i18n/upgrade-from-gatsby-to-astro/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Lezioni apprese aggiornando il mio blog
subTitle: 'Astro, Tailwind, MDX, Pagefind e altro!'
date: '2024-08-21'
modified: '2024-08-23'
category: Guides
tags:
  - astro
  - tailwind
  - mdx
  - pagefind
  - gatsby
cover: ../galaxy-contribution-mode.webp
cover_full_width: ../galaxy-contribution-banner.webp
cover_mobile: ../w300_galaxy-contribution-mode.webp
cover_icon: ../icon_galaxy-contribution-mode.webp
---
Recentemente, ho intrapreso un percorso per aggiornare il mio sito Gatsby v1, ormai vecchio di più di otto anni.

Questo post condividerà alcune lezioni apprese durante il processo e le tecnologie interessanti che ho sperimentato.

## Indice

- [Requisiti del progetto](#project-requirements)
- [Scelta della tecnologia giusta](#choosing-my-right-technology-stack)
- [Astro: curva di apprendimento e funzionalità chiave](#astro-learning-curve-and-key-features)
- [CSS moderno: wow](#modern-css-wow)
- [Ricerca: Pagefind](#search-pagefind)
- [Commenti: Utterances](#comments-utterances)
- [Tailwind: rimpianti](#tailwind-regrets)
- [Conclusione](#conclusion)

## Requisiti del progetto

Prima di immergermi nell'aggiornamento, ho definito un insieme di requisiti:

Poiché il mio blog registra un numero di visualizzazioni giornaliere molto variabile, ho ritenuto che un sito staticamente pre‑generato mi avrebbe garantito le prestazioni desiderate senza introdurre complessità aggiuntiva.

In più, dovevo mantenere i contenuti e le funzionalità esistenti del sito, tra cui:

- Evidenziazione del codice
- Commenti
- Ricerca interna
- Componenti React preesistenti: UI del quiz, embed di Gist
- Modulo di contatto
- Immagini responsive
- Tempo di caricamento inferiore a 1 secondo
- Compatibilità browser: 2018+
- Deploy automatizzati basati su PR

## Scelta della tecnologia giusta

Negli anni ho sperimentato numerosi strumenti per siti statici, da Jekyll, Hugo, Slate a Gatsby, oltre a una lunga lista di framework front‑end: Ember, Knockout, Angular, Vue e, ovviamente, React.

Di conseguenza mi trovavo con un eccesso di opzioni, che ho infine ristretto a **Remix**, **Next.js** e **Astro**.

Potrei scrivere un’intera serie di post sul mio processo di valutazione, ma ne riassumo i punti chiave qui:

<p class="breakout">Ho scelto [Astro](https://astro.build) perché mi permette di _fare cose significative_ molto rapidamente.</p>

Il loro design API è sorprendentemente semplice. È un [ottimo equilibrio tra flessibilità e buone opinioni di design.](https://docs.astro.build/en/concepts/why-astro/)

È stato rassicurante constatare che Astro non mostra alcun bias verso il cloud o un’agenda di framework.

Astro non è stata l’unica tecnologia impiegata; ecco la panoramica completa dello stack:

- [Astro](https://astro.build): Un generatore di siti statici moderno.  
- [ShadcnUI](https://ui.shadcn.com): Una collezione di componenti riutilizzabili.  
- [Tailwind CSS](https://tailwindcss.com): Un framework CSS utility‑first.  
- [MDX](https://mdxjs.com): Contenuto Markdown + componenti inline.  
- [Pagefind](https://pagefind.app): Libreria di ricerca veloce, statica e offline per il sito. Niente più Algolia!  
- [Utterances](https://utteranc.es): Sistema di commenti basato su issue di GitHub.  
- [Netlify](https://www.netlify.com): Deploy automatizzati, modulo di contatto con captcha.

## Astro: Curva di apprendimento e funzionalità chiave

<p class="breakout quote">Astro è rapidamente diventato il pilastro del mio upgrade.</p>

Ecco alcune funzionalità che ho trovato particolarmente utili:

- File `.astro`: a prima vista i componenti Astro possono sembrare componenti React JSX, ma sono molto diversi e perseguono un diverso insieme di obiettivi. (Vedi la tabella comparativa sotto.)
- Alimentato dai propri strumenti di build Golang e da Vite: funziona subito. Gestisce senza sforzo ESM/CJS, TypeScript, bundling del codice, stili, immagini, ecc.
- [Nessun bias di framework](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) o [bias di cloud.](https://docs.astro.build/en/guides/deploy/) (*toss* Next.js, OpenNext)
- Rendering [statico vs. ibrido](https://docs.astro.build/en/basics/rendering-modes/): Astro offre [flessibilità per puntare alla maggior parte delle piattaforme cloud](https://docs.astro.build/en/guides/deploy/): AWS, GCP, Firebase, Netlify, Vercel, Cloudflare Pages, Azure, Fly.io e molte altre.
- Collezioni di contenuti: l'API [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) semplifica il lavoro con file di contenuto come fonte dati.
- Routing basato su file: il sistema di routing basato su file di Astro, combinato con `getStaticPaths`, rende la generazione delle pagine una passeggiata.
- SEO: [Astro non ti intralcia](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63) e genera solo la minima quantità di ~~detriti~~ boilerplate (`astro-island`) quando necessario.

Alcune cose sono state un po' sorprendenti, come lo styling intorno al markup iniettato da Astro e l'effetto di `display:contents`.

```tsx
```

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

```

### Confronto tra componenti `.astro` e componenti client

I componenti Astro sono fondamentalmente template HTML con un potente pattern di componenti e props. Possono recuperare dati in fase di build, accedere a risorse backend e tenere nascoste informazioni sensibili.

Il modo migliore per capire i componenti `.astro` è confrontarli con i componenti lato client (React, Vue, Svelte, ecc.).

<section className="scroll-x">
| Cosa devi fare?                                                                     | Componente `.astro` | Componente client |
| ----------------------------------------------------------------------------------- | ------------------- | ----------------- |
| Generare HTML con potente pattern template+componente                               | ✅ | ❌ |
| Recuperare dati in fase di build                                                    | ✅ | ❌ |
| Accedere a risorse backend (direttamente)                                           | ✅ | ❌ |
| Tenere nascoste informazioni sensibili (token di accesso, chiavi API, ecc.)        | ✅ | ❌ |
| Ridurre il JavaScript lato client                                                   | ✅ | ❌ |
| Usare componenti client (React, Vue, Svelte, ecc.)                                   | ✅ | ✅ |
| Aggiungere interattività ed event listener (`onClick()`, `onChange()`, ecc.)        | ❌ | ✅ |
| Usare stato e effetti di ciclo di vita (`useState()`, `useReducer()`, `useEffect()`, ecc.) | ❌ | ✅ |
| Usare API disponibili solo nel browser                                             | ❌ | ✅ |
| Usare hook personalizzati che dipendono da stato, effetti o API solo browser        | ❌ | ✅ |
</section>

## CSS moderno: Wow

Tornando allo sviluppo frontend, sono rimasto entusiasta dei progressi nel CSS nativo:

- Variabili CSS: disponibili da tempo e abbastanza stabili su tutti i browser da circa il 202\*.
- Nesting: finalmente nella specifica, senza la sintassi goffa delle versioni precedenti. Ora è simile a Less o SCSS.
- Nuovi selettori: [`:is()`, `:where()` e `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) consentono un targeting più preciso degli elementi.
- Unità moderne come `ch`, `vw` e funzioni come `clamp()` offrono un controllo migliore su layout e tipografia.
- Imposta gli spazi in modo più naturale con gli attributi `-inline` e `-block`. Puoi definire padding o margin sull’asse orizzontale o verticale. Invece di `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`.
- Layout avanzati: rimettersi a studiare CSS Grid. Wow, c’è un sacco di roba lì dentro. Può risultare intimidatorio con le infinite varianti di utilizzo. Tieni presente che basta padroneggiarne una o due. Dai un’occhiata a queste risorse che mi hanno aiutato a fare trucchi con il grid: [video di Kevin Powell: Learn CSS Grid the easy way](https://www.youtube.com/watch?v=rg7Fvvl3taU), [Responsive w/o media queries](https://ardilamorin.com/responsive-no-media-queries/), [Ten modern layouts in one line of CSS](https://web.dev/articles/one-line-layouts).

## Search: Pagefind

Implementare una **ricerca sul sito** senza servizi di terze parti o hosting di database mi è sembrato una sfida divertente. Dopotutto, non ho ancora 10 000 post da indicizzare.

Navigando tra le [integrazioni della community di Astro](https://astro.build/integrations/?search=find) mi sono imbattuto in uno strumento fantastico che avrei voluto conoscere prima: [Pagefind](https://pagefind.app/).

<p class="breakout quote">Pochi strumenti risolvono un problema così bene come Pagefind risolve la ricerca locale sul sito.</p>

La semplicità di implementare Pagefind è una gioia. Può essere integrato con QUALSIASI contenuto statico e puoi decidere se utilizzare un’interfaccia predefinita oppure costruire qualcosa di personalizzato, se lo preferisci.

Ha risolto in modo pulito tutto ciò che mi serviva. L’integrazione è durata solo pochi minuti e il lavoro principale è stato aggiungere il tag `<div id="search"></div>` e qualche regola di stile!

## Commenti: Utterances

Sfortunatamente ho dovuto salutare Disqus e i commenti accumulati in anni di attività.

Volevo avere un controllo e una visibilità migliori sugli script di terze parti presenti sul sito.

In più, doveva rimanere semplice e manutenibile.

Questo mi ha portato a scegliere il fantastico servizio [Utterances](https://utteranc.es/). Il suo sistema di commenti basato su GitHub (issues) si sposa bene con il mio pubblico. Inoltre, è facile da configurare e gratuito.

## Tailwind: Rimpianti

C’è un solo elemento tecnologico di cui mi sto sempre più pentendo: Tailwind.

Col tempo avverto la differenza di costo tra scrivere e mantenere. Tailwind è rapidissimo da scrivere, ma una volta che il progetto diventa sufficientemente complesso può diventare tedioso da leggere e da estendere.

## Conclusione

Aggiornare il mio vecchio sito Gatsby v1 a uno stack moderno basato su Astro è stata un’esperienza divertente. 10/10 lo consiglierei.

Se stai valutando l’aggiornamento di un sito legacy o la creazione di un nuovo sito statico (o ibrido), ti consiglio vivamente di dare un’occhiata ad Astro. La curva di apprendimento può risultare ripida in alcuni punti, ma i vantaggi in termini di performance, esperienza dello sviluppatore e capacità di futuro‑proofing del progetto valgono ampiamente lo sforzo.
````
