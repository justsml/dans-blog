# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/it/index.mdx
- Validation: deferred
- Runtime seconds: 2.77
- Input tokens: 6703
- Output tokens: 3120
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.000823
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Lezioni apprese aggiornando il mio blog
subTitle: 'Astro, Tailwind, MDX, Pagefind e altro ancora!'
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
Recentemente, ho intrapreso un percorso per aggiornare il mio sito Gatsby v1, nato più di otto anni fa.

Questo post condividerà alcune lezioni apprese durante il processo e le tecnologie divertenti che ho esplorato.

## Indice

- [Requisiti del progetto](#project-requirements)
- [Scelta della tecnologia giusta](#choosing-my-right-technology-stack)
- [Astro: curva di apprendimento e funzionalità chiave](#astro-learning-curve-and-key-features)
- [CSS moderno: Wow](#modern-css-wow)
- [Ricerca: Pagefind](#search-pagefind)
- [Commenti: Utterances](#comments-utterances)
- [Tailwind: Rimpianti](#tailwind-regrets)
- [Conclusione](#conclusion)

## Requisiti del progetto

Prima di immergermi nell'aggiornamento, ho definito una serie di requisiti:

Poiché il mio blog registra un numero di visualizzazioni giornaliere molto variabile, ho ritenuto che un sito staticamente pre-generato potesse offrire le prestazioni desiderate senza introdurre complessità aggiuntiva.

Inoltre, dovevo mantenere i contenuti e le funzionalità esistenti del sito, tra cui:

- Evidenziazione del codice
- Commenti
- Ricerca interna
- Componenti React preesistenti: UI del quiz, embed di Gist
- Modulo di contatto
- Immagini responsive
- Tempo di caricamento inferiore a 1 secondo
- Compatibilità browser: 2018+
- Deploy automatizzati + basati su PR

## Scelta della tecnologia giusta


Negli anni ho sperimentato numerosi strumenti per siti statici, da Jekyll, Hugo, Slate e Gatsby, fino a molti framework front‑end: Ember, Knockout, Angular, Vue e, ovviamente, React.

Quindi ho avuto più opzioni di quante ne potessi gestire, e alla fine le ho ridotte a **Remix**, **Next.js** e **Astro**.

Potrei scrivere un’intera serie di articoli sul mio processo di valutazione, ma qui ne faccio un riassunto:

<p class="breakout">Ho scelto [Astro](https://astro.build) perché potevo _fare cose significative_ rapidamente.</p>

Il loro design API è sorprendentemente semplice. È un [ottimo equilibrio tra flessibilità e buone decisioni di design.](https://docs.astro.build/en/concepts/why-astro/)

È stato rassicurante constatare che Astro non mostra alcun bias verso il cloud o un’agenda di framework.

Astro non è stata l’unica tecnologia che ho usato; ecco una panoramica completa dello stack:

- [Astro](https://astro.build): Un generatore di siti statici moderno.  
- [ShadcnUI](https://ui.shadcn.com): Una collezione di componenti riutilizzabili.  
- [Tailwind CSS](https://tailwindcss.com): Un framework CSS utility‑first.  
- [MDX](https://mdxjs.com): Contenuto Markdown + componenti inline.  
- [Pagefind](https://pagefind.app): Libreria di ricerca veloce, statica e offline. Nessun bisogno di Algolia!  
- [Utterances](https://utteranc.es): Sistema di commenti basato su issue di GitHub.  
- [Netlify](https://www.netlify.com): Deploy automatizzati, modulo di contatto con captcha.

## Astro: Curva di apprendimento e funzionalità chiave

<p class="breakout quote">Astro è diventato rapidamente la pietra angolare del mio aggiornamento.</p>

Ecco alcune funzionalità chiave che ho trovato particolarmente utili:

- **File `.astro`**: a prima vista i componenti Astro possono ricordare i componenti JSX di React, ma sono molto diversi e perseguono obiettivi differenti. (Vedi la tabella comparativa sotto.)
- **Alimentato dai propri strumenti Golang** [build tools](https://github.com/withastro/compiler) e da Vite: funziona subito. Gestisce in modo trasparente ESM/CJS, TypeScript, bundling del codice, stili, immagini, ecc.
- **[Nessun bias di framework](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations)** o **[bias di cloud](https://docs.astro.build/en/guides/deploy/)** (*tosse* Next.js, OpenNext)
- **[Statico vs. ibrido](https://docs.astro.build/en/basics/rendering-modes/)** rendering: Astro offre la [flessibilità di puntare alla maggior parte delle piattaforme cloud](https://docs.astro.build/en/guides/deploy/): AWS, GCP, Firebase, Netlify, Vercel, Cloudflare Pages, Azure, Fly.io e molte altre.
- **Collezioni di contenuti**: l’API [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) semplifica il lavoro con file di contenuto come sorgente dati.
- **Routing basato su file**: il sistema di routing basato su file di Astro, combinato con `getStaticPaths`, rende la generazione delle pagine una passeggiata.
- **SEO**: [Astro non si mette tra te e il risultato](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63) e genera solo la minima quantità di ~~detriti~~ boilerplate (`astro-island`) quando è necessario.

Alcune cose sono state un po’ inaspettate, come lo styling intorno al markup iniettato da Astro e l’effetto di `display:contents`.

```tsx

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

```

### Confronto tra `.astro` e Componenti Client

I componenti Astro sono fondamentalmente template HTML con un potente modello di componenti e props. Possono recuperare dati a build‑time, accedere a risorse di backend e tenere nascoste informazioni sensibili.

Il modo migliore per capire i componenti `.astro` di Astro è confrontarli con i componenti client‑side (React, Vue, Svelte, ecc.).

<section className="scroll-x">
| Cosa ti serve fare?                                                                | Component `.astro` | Component Client |
| ---------------------------------------------------------------------------------- | ------------------- | ----------------- |
| Generare HTML con modello+componente potente                                      | ✅ | ❌ |
| Recuperare dati a build‑time                                                       | ✅ | ❌ |
| Accedere a risorse di backend (direttamente)                                      | ✅ | ❌ |
| Tenere nascoste informazioni sensibili (token, chiavi API, ecc.)                  | ✅ | ❌ |
| Ridurre JavaScript lato client                                                     | ✅ | ❌ |
| Usare componenti client (React, Vue, Svelte, ecc.)                                 | ✅ | ✅ |
| Aggiungere interattività e listener di eventi (`onClick()`, `onChange()`, ecc.)   | ❌ | ✅ |
| Usare State e Lifecycle Effects (`useState()`, `useReducer()`, `useEffect()`, ecc.)| ❌ | ✅ |
| Usare API disponibili solo nel browser                                            | ❌ | ✅ |
| Usare hook personalizzati che dipendono da state, effects o API browser‑only      | ❌ | ✅ |
</section>

## Modern CSS: Wow

Tornando allo sviluppo frontend, sono rimasto entusiasta dei progressi del CSS nativo:

- Variabili CSS: disponibili da tempo e abbastanza stabili su tutti i browser dal 202*.
- Nesting: finalmente nella specifica, senza la sintassi scomoda delle versioni precedenti. Ora è simile a Less o SCSS.
- Nuovi selettori: [`:is()`, `:where()` e `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) consentono un targeting più preciso degli elementi.
- Unità moderne come `ch`, `vw` e funzioni come `clamp()` offrono un controllo migliore su layout e tipografia.
- Imposta spaziatura in modo più naturale con gli attributi `-inline` e `-block`. Definisci padding o margin sull’asse orizzontale o verticale. Invece di `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`.
- Layout avanzati: riscoprire CSS Grid. Wow, c’è un sacco di roba lì. Può risultare intimidatorio con le infinite modalità di utilizzo. Tieni presente che basta capire una o due modalità. Dai un’occhiata a queste risorse che mi hanno aiutato a fare trucchi con Grid: [video di Kevin Powell: Learn CSS Grid the easy way](https://www.youtube.com/watch?v=rg7Fvvl3taU), [Responsive senza media queries](https://ardilamorin.com/responsive-no-media-queries/), [Dieci layout moderni in una riga di CSS](https://web.dev/articles/one-line-layouts).

## Ricerca: Pagefind

Implementare una **ricerca sul sito** senza servizi di terze parti o hosting di database mi sembrava una sfida divertente. Dopotutto, non ho ancora 10.000 post da indicizzare.

Navigando tra le [integrazioni della community di Astro](https://astro.build/integrations/?search=find) mi sono imbattuto in uno strumento fantastico che avrei voluto conoscere prima: [Pagefind](https://pagefind.app/).

<p class="breakout quote">Pochi strumenti risolvono un problema così bene come Pagefind risolve la ricerca locale sul sito.</p>

La semplicità di implementazione di Pagefind è una gioia. Può integrarsi con QUALSIASI contenuto statico, e puoi scegliere se utilizzare un’interfaccia UI predefinita o costruire qualcosa di personalizzato.

Ha risolto perfettamente tutto ciò che volevo. Ho impiegato solo pochi minuti per l’integrazione, e la maggior parte del lavoro consisteva nell’aggiungere un tag `<div id="search"></div>` e qualche regola di stile!

## Commenti: Utterances

Sfortunatamente, ho dovuto salutare Disqus e i commenti accumulati in tutti questi anni.

Volevo avere un controllo e una visibilità migliori sugli script di terze parti presenti sul mio sito.

In più, doveva rimanere semplice da gestire.

Questo mi ha portato a scegliere il fantastico servizio [Utterances](https://utteranc.es/). Il suo sistema di commenti basato su GitHub (issues) si sposa bene con il mio pubblico. Inoltre, è facile da configurare e gratuito.

## Tailwind: Rimpianti

C’è un solo elemento tecnologico di cui mi sto sempre più pentendo: Tailwind.

Con il tempo avverto la differenza di costo tra scrittura e manutenzione. Tailwind è rapidissimo da scrivere, ma una volta che il progetto diventa abbastanza complesso può risultare noioso da leggere e da estendere.

## Conclusione

Aggiornare il mio vecchio sito Gatsby v1 a una stack moderna basata su Astro è stata un’esperienza divertente. 10/10 lo consiglierei.

Se stai valutando di aggiornare un sito legacy o di costruire un nuovo sito statico (o ibrido), ti raccomando vivamente di dare un’occhiata ad Astro. Il percorso di apprendimento può risultare ripido in alcuni punti, ma i vantaggi in termini di performance, esperienza di sviluppo e futuro del progetto valgono ampiamente lo sforzo.
````
