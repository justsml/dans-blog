# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: it
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/it/index.mdx
- Validation: deferred
- Runtime seconds: 95.52
- Input tokens: 6522
- Output tokens: 9397
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.003439
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Lezioni apprese dall'aggiornamento del mio blog
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
Recentemente, ho intrapreso un percorso per aggiornare il mio sito Gatsby v1, vecchio di oltre 8 anni.

Questo post condividerà alcune lezioni apprese durante questo processo e le tecnologie interessanti che ho esplorato.

## Indice

- [Requisiti del progetto](#project-requirements)
- [Scelta dello stack tecnologico giusto](#choosing-my-right-technology-stack)
- [Astro: Curva di apprendimento e caratteristiche principali](#astro-learning-curve-and-key-features)
- [CSS moderno: Wow](#modern-css-wow)
- [Ricerca: Pagefind](#search-pagefind)
- [Commenti: Utterances](#comments-utterances)
- [Tailwind: Rimpianti](#tailwind-regrets)
- [Conclusione](#conclusion)

## Requisiti del progetto

Prima di immergermi nell'aggiornamento, ho stabilito una serie di requisiti:

Dato che il mio blog riceve un numero altamente variabile di visualizzazioni giornaliere, ho ritenuto che un sito pre-generato staticamente avrebbe fornito le prestazioni desiderate senza complessità aggiuntive.

Inoltre, dovevo mantenere i contenuti e le funzionalità esistenti del sito, tra cui:

- Evidenziazione del codice
- Commenti
- Ricerca nel sito
- Componenti React preesistenti: interfaccia quiz, incorporamenti Gist
- Modulo di contatto
- Immagini reattive
- Tempo di caricamento inferiore a 1 secondo
- Compatibilità browser: 2018+
- Deploy automatizzati e basati su PR

## Scelta dello stack tecnologico giusto

Negli anni ho lavorato con molti strumenti per siti statici, da Jekyll, Hugo, Slate e Gatsby. Oltre a molti framework front-end: Ember, Knockout, Angular, Vue e ovviamente React.

Quindi, ho esattamente troppe opzioni, che alla fine ho ristretto a **Remix**, **Next.js** e **Astro**.

Potrei scrivere un'intera serie di blog sul mio processo di valutazione, ma lo riassumo qui:

<p class="breakout">Ho scelto [Astro](https://astro.build) per la velocità con cui potevo _fare cose significative_.</p>

Il loro design API è piacevolmente semplice. È un [ottimo equilibrio tra flessibilità e buone opinioni di progettazione.](https://docs.astro.build/en/concepts/why-astro/)

È stato rassicurante che Astro non abbia alcun evidente pregiudizio verso il cloud o agenda di framework.

Astro non è stata l'unica tecnologia che ho usato, ecco una panoramica completa dello stack:

- [Astro](https://astro.build): Un moderno generatore di siti statici.
- [ShadcnUI](https://ui.shadcn.com): Una collezione di componenti riutilizzabili.
- [Tailwind CSS](https://tailwindcss.com): Un framework CSS utility-first.
- [MDX](https://mdxjs.com): Contenuti Markdown + componenti inline.
- [Pagefind](https://pagefind.app): Libreria di ricerca veloce, statica e offline per siti. Niente più Algolia!
- [Utterances](https://utteranc.es): Sistema di commenti basato su issue GitHub.
- [Netlify](https://www.netlify.com): Deploy automatizzati, modulo di contatto con captcha.

## Astro: Curva di apprendimento e caratteristiche principali

<p class="breakout quote">Astro è diventato rapidamente il pilastro del mio aggiornamento.</p>

Ecco alcune caratteristiche chiave che ho trovato particolarmente utili:

- File `.astro`: A prima vista, i componenti Astro possono sembrare componenti React JSX, ma in realtà sono piuttosto diversi e servono a obiettivi differenti. (Vedi tabella comparativa sotto.)
- Alimentato dai propri [strumenti di build](https://github.com/withastro/compiler) in Golang e da Vite: funziona e basta. Gestisce senza problemi ESM/CJS, TypeScript, bundling del codice, stili, immagini, ecc.
- [Nessun pregiudizio verso framework](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) o [cloud](https://docs.astro.build/en/guides/deploy/). (*Tosse* Next.js, OpenNext)
- [Rendering statico vs. ibrido](https://docs.astro.build/en/basics/rendering-modes/): Astro offre [flessibilità per targetizzare la maggior parte delle piattaforme cloud](https://docs.astro.build/en/guides/deploy/): AWS, GCP, Firebase, Netlify, Vercel, Cloudflare Pages, Azure, Fly.io e molte altre.
- Collezioni di contenuti: L'API [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) semplifica il lavoro con i file di contenuto come fonte di dati.
- Routing basato su file: Il sistema di routing basato su file di Astro, combinato con `getStaticPaths`, rende la generazione di pagine un gioco da ragazzi.
- SEO: [Astro non ti intralcia](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63) ed emette solo una quantità minima di ~~detriti~~ boilerplate (`astro-island`) quando necessario.

Alcune cose sono state un po' sorprendenti, come lo styling attorno al markup iniettato da Astro e l'effetto di `display:contents`.

```tsx

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

```

### Confronto tra `.astro` e componenti client

I componenti Astro sono fondamentalmente template HTML con un potente pattern di componenti e props. Possono recuperare dati in fase di build, accedere a risorse backend e mantenere nascoste alcune informazioni sensibili.

Il modo migliore per capire i componenti `.astro` di Astro è confrontarli con i componenti lato client (React, Vue, Svelte, ecc.).

<section className="scroll-x">
| Cosa devi fare?                                                            | Componente .astro    | Componente client    |
| ---------------------------------------------------------------------------------- | ------------------- | ------------------- |
| Generare HTML con un potente pattern di template e componenti                             | ✅ | ❌ |
| Recuperare dati in fase di build                                                           | ✅ | ❌ |
| Accedere a risorse backend (direttamente)                                                | ✅ | ❌ |
| Mantenere nascoste informazioni sensibili (token di accesso, chiavi API, ecc.)                   | ✅ | ❌ |
| Ridurre il JavaScript lato client                                                      | ✅ | ❌ |
| Usare componenti client (React, Vue, Svelte, ecc.)                                    | ✅ | ✅ |
| Aggiungere interattività e listener di eventi (`onClick()`, `onChange()`, ecc.)             | ❌ | ✅ |
| Usare State e Lifecycle Effects (`useState()`, `useReducer()`, `useEffect()`, ecc.) | ❌ | ✅ |
| Usare API solo browser                                                              | ❌ | ✅ |
| Usare custom hooks che dipendono da state, effetti o API solo browser               | ❌ | ✅ |
</section>

## CSS moderno: Wow

Tornando allo sviluppo frontend, sono stato entusiasta dei progressi del CSS nativo:

- Variabili CSS: Disponibili da un po' e piuttosto stabili nei browser dal 201\*.
- Nidificazione: Finalmente nella specifica, e senza la sintassi goffa di prima. Ora è simile a Less o SCSS.
- Nuovi selettori: [`:is()`, `:where()` e `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) offrono un targeting più preciso degli elementi.
- Unità moderne come `ch`, `vw` e funzioni come `clamp()` offrono un controllo migliore su layout e tipografia.
- Imposta la spaziatura in modo più naturale con gli attributi `-inline` e `-block`. Imposta padding o margin sull'asse orizzontale o verticale. Invece di `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`.
- Layout avanzati: Re-imparare CSS Grid. Wow, c'è un sacco di roba lì dentro. Può essere scoraggiante con modi apparentemente infiniti di usarlo. Tieni presente che puoi cavartela imparando 1 o 2 modi. Dai un'occhiata a queste ottime risorse che mi hanno aiutato a fare trucchi con grid: [Il video di Kevin Powell: Learn CSS Grid the easy way](https://www.youtube.com/watch?v=rg7Fvvl3taU), [Responsive senza media queries](https://ardilamorin.com/responsive-no-media-queries/), [Dieci layout moderni in una riga di CSS](https://web.dev/articles/one-line-layouts).

## Ricerca: Pagefind

Implementare una **ricerca nel sito** senza servizi di terze parti o hosting di database sembrava una sfida divertente. Dopotutto, non è che abbia 10.000 post da indicizzare (ancora).

Mentre esploravo le [integrazioni della community di Astro](https://astro.build/integrations/?search=find) mi sono imbattuto in uno strumento fantastico che avrei voluto conoscere prima: [Pagefind](https://pagefind.app/).

<p class="breakout quote">Pochi strumenti risolvono un problema bene quanto Pagefind risolve la ricerca locale nel sito.</p>

La semplicità di implementare Pagefind è una delizia. Può essere integrato con QUALSIASI contenuto di sito statico, e puoi scegliere se vuoi un'interfaccia predefinita o costruire qualcosa di personalizzato se lo desideri.

Ha risolto perfettamente tutto ciò che volevo. Ci sono voluti solo pochi minuti per integrarlo, e la maggior parte del lavoro è consistita nell'aggiungere un tag `<div id="search"></div>` e un po' di stile!

## Commenti: Utterances

Purtroppo, ho dovuto dire addio a Disqus e ai commenti che avevo accumulato in molti anni.

Volevo un migliore controllo/visibilità sugli script di terze parti del mio sito.

Inoltre, doveva essere semplice e manutenibile.

Questo mi ha portato a scegliere il fantastico servizio [Utterances](https://utteranc.es/). Il suo sistema di commenti basato su GitHub (issues) si allinea bene con il mio pubblico. Inoltre, è facile da configurare e gratuito.

## Tailwind: Rimpianti

C'è solo una tecnologia di cui mi pento sempre più di aver usato: Tailwind.

Col tempo, sento la differenza di costo tra scrivere e mantenere. Tailwind è molto veloce da scrivere, ma una volta che diventa abbastanza complesso, può diventare noioso da leggere ed estendere.

## Conclusione

Aggiornare il mio vecchio sito Gatsby v1 a uno stack moderno basato su Astro è stata un'esperienza divertente. 10/10 lo consiglierei.

Se stai pensando di aggiornare un vecchio sito o costruirne uno nuovo statico (o ibrido), ti consiglio vivamente di dare un'occhiata ad Astro. La curva di apprendimento può essere ripida a volte, ma i benefici in termini di prestazioni, esperienza sviluppatore e futuro-proofing del progetto valgono lo sforzo.
````
